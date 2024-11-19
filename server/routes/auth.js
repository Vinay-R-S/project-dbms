import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { isManager } from '../middleware/roleCheck.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            firstName,
            lastName,
            email,
            password,
            role: role || 'Employee'
        });

        await user.save();

        const payload = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('projects', 'title status')
            .populate('assignedTasks', 'title status');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;