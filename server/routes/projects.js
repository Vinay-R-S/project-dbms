import express from 'express';
import { auth } from '../middleware/auth.js';
import { isManager } from '../middleware/roleCheck.js';
import { Project } from '../models/Project.js';
import { User } from '../models/User.js';
import { Task } from '../models/Task.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        let projects;
        const populateOptions = {
            path: 'tasks',
            populate: [
                { path: 'assignedTo', select: 'firstName lastName email' },
                { path: 'project', select: 'title status' }
            ]
        };

        if (req.user.role === 'Manager') {
            projects = await Project.find({ manager: req.user.id })
                .populate('manager', 'firstName lastName email')
                .populate('employees', 'firstName lastName email')
                .populate(populateOptions)
                .sort({ createdAt: -1 });
        } else {
            projects = await Project.find({
                $or: [
                    { employees: req.user.id },
                    { manager: req.user.id }
                ]
            })
            .populate('manager', 'firstName lastName email')
            .populate('employees', 'firstName lastName email')
            .populate(populateOptions)
            .sort({ createdAt: -1 });
        }

        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/', [auth, isManager], async (req, res) => {
    try {
        const { title, description, employees, deadline, priority, budget, tags } = req.body;

        // Find users by email
        const employeeDocs = await User.find({ email: { $in: employees } });
        const employeeIds = employeeDocs.map(user => user._id);

        const project = new Project({
            title,
            description,
            manager: req.user.id,
            employees: employeeIds,
            deadline,
            priority,
            budget,
            tags: tags || [],
            tasks: [],
            status: 'Planning',
            progress: 0,
            startDate: new Date()
        });

        await project.save();

        if (employeeIds.length > 0) {
            await User.updateMany(
                { _id: { $in: employeeIds } },
                { $push: { projects: project._id } }
            );
        }

        const populatedProject = await Project.findById(project._id)
            .populate('manager', 'firstName lastName email')
            .populate('employees', 'firstName lastName email')
            .populate({
                path: 'tasks',
                populate: [
                    { path: 'assignedTo', select: 'firstName lastName email' },
                    { path: 'project', select: 'title status' }
                ]
            });

        res.status(201).json(populatedProject);
    } catch (error) {
        console.error('Project creation error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation Error', 
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', [auth, isManager], async (req, res) => {
    try {
        const { title, description, employees, status, deadline, priority, budget, tags } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.manager.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (title) project.title = title;
        if (description) project.description = description;
        if (status) {
            project.status = status;
            if (status === 'Completed') {
                project.completionDate = new Date();
            }
        }
        if (deadline) project.deadline = deadline;
        if (priority) project.priority = priority;
        if (budget) project.budget = budget;
        if (tags) project.tags = tags;

        if (employees) {
            await User.updateMany(
                { _id: { $in: project.employees } },
                { $pull: { projects: project._id } }
            );

            await User.updateMany(
                { _id: { $in: employees } },
                { $push: { projects: project._id } }
            );

            project.employees = employees;
        }

        await project.save();

        project.progress = await project.calculateProgress();
        await project.save();

        const updatedProject = await Project.findById(project._id)
            .populate('manager', 'firstName lastName email')
            .populate('employees', 'firstName lastName email')
            .populate({
                path: 'tasks',
                populate: { path: 'assignedTo', select: 'firstName lastName' }
            });

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store',
            'ETag': false
        });

        res.json(updatedProject);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', [auth, isManager], async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.manager.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await User.updateMany(
            { _id: { $in: project.employees } },
            { $pull: { projects: project._id } }
        );

        await Task.deleteMany({ project: project._id });

        await project.deleteOne();

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store',
            'ETag': false
        });

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id/tasks', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const tasks = await Task.find({ project: req.params.id })
            .populate('assignedTo', 'firstName lastName email')
            .sort({ createdAt: -1 });

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store',
            'ETag': false
        });

        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;