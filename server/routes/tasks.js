import express from 'express';
import { auth } from '../middleware/auth.js';
import { isManager } from '../middleware/roleCheck.js';
import { Task } from '../models/Task.js';
import { Project } from '../models/Project.js';
import { User } from '../models/User.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        let tasks;
        console.log('Fetching tasks for user:', req.user.id);
        
        if (req.user.role === 'Manager') {
            const managedProjects = await Project.find({ manager: req.user.id }).select('_id');
            const projectIds = managedProjects.map(project => project._id);
            
            tasks = await Task.find({ project: { $in: projectIds } })
                .populate('project', 'title status')
                .populate('assignedTo', 'firstName lastName email')
                .populate('dependencies.task', 'title status')
                .sort({ createdAt: -1 });
                
            console.log('Found tasks for manager:', tasks.length);
        } else {
            tasks = await Task.find({ assignedTo: req.user.id })
                .populate('project', 'title status')
                .populate('assignedTo', 'firstName lastName email')
                .populate('dependencies.task', 'title status')
                .sort({ createdAt: -1 });
                
            console.log('Found tasks for employee:', tasks.length);
        }

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', [auth, isManager], async (req, res) => {
    try {
        const {
            title,
            description,
            projectId,
            assignedTo,
            priority,
            deadline,
            estimatedHours,
            dependencies
        } = req.body;

        console.log('Creating task with data:', {
            title,
            description,
            projectId,
            assignedTo,
            priority,
            deadline
        });

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find users by email
        let assignedUsers = [];
        if (assignedTo && assignedTo.length > 0) {
            assignedUsers = await User.find({ 
                email: { $in: Array.isArray(assignedTo) ? assignedTo : [assignedTo] }
            });
            
            if (assignedUsers.length === 0) {
                return res.status(400).json({ message: 'No valid users found for the provided email(s)' });
            }
        }

        const task = new Task({
            title,
            description,
            project: projectId,
            assignedTo: assignedUsers.map(user => user._id),
            priority: priority || 'Medium',
            deadline,
            estimatedHours,
            dependencies: dependencies || [],
            status: 'Todo'
        });

        const savedTask = await task.save();

        // Update project with the new task
        project.tasks.push(savedTask._id);
        await project.save();

        // Update assigned users
        if (assignedUsers.length > 0) {
            await User.updateMany(
                { _id: { $in: assignedUsers.map(user => user._id) } },
                { $push: { assignedTasks: savedTask._id } }
            );
        }

        const populatedTask = await Task.findById(savedTask._id)
            .populate('project', 'title status')
            .populate('assignedTo', 'firstName lastName email')
            .populate('dependencies.task', 'title status');

        res.status(201).json(populatedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const {
            title,
            description,
            assignedTo,
            status,
            priority,
            deadline,
            estimatedHours,
            actualHours,
            dependencies
        } = req.body;

        const task = await Task.findById(req.params.id)
            .populate('project', 'manager');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const isProjectManager = task.project.manager.toString() === req.user.id;
        const isAssigned = task.assignedTo.includes(req.user.id);

        if (!isProjectManager && !isAssigned) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (!isProjectManager) {
            const allowedUpdates = ['actualHours', 'status'];
            const requestedUpdates = Object.keys(req.body);
            const isValidOperation = requestedUpdates.every(update => allowedUpdates.includes(update));

            if (!isValidOperation) {
                return res.status(403).json({ message: 'Not authorized to update these fields' });
            }
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) {
            task.status = status;
            if (status === 'Completed') {
                task.completionDate = new Date();
                task.stage = 3;
            }
        }
        if (priority) task.priority = priority;
        if (deadline) task.deadline = deadline;
        if (estimatedHours) task.estimatedHours = estimatedHours;
        if (actualHours) task.actualHours = actualHours;
        if (dependencies) task.dependencies = dependencies;

        if (isProjectManager && assignedTo) {
            await User.updateMany(
                { _id: { $in: task.assignedTo } },
                { $pull: { assignedTasks: task._id } }
            );

            await User.updateMany(
                { _id: { $in: assignedTo } },
                { $push: { assignedTasks: task._id } }
            );

            task.assignedTo = assignedTo;
        }

        task.history.push({
            field: 'status',
            oldValue: task.status,
            newValue: status,
            changedBy: req.user.id
        });

        await task.save();

        const updatedTask = await Task.findById(task._id)
            .populate('project', 'title status')
            .populate('assignedTo', 'firstName lastName email')
            .populate('dependencies.task', 'title status');

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store',
            'ETag': false
        });

        res.json(updatedTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', [auth, isManager], async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('project', 'manager');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.project.manager.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Project.findByIdAndUpdate(task.project._id, {
            $pull: { tasks: task._id }
        });

        await User.updateMany(
            { _id: { $in: task.assignedTo } },
            { $pull: { assignedTasks: task._id } }
        );

        await task.remove();

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store',
            'ETag': false
        });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:id/comment', auth, async (req, res) => {
    try {
        const { content } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.comments.push({
            user: req.user.id,
            content
        });

        await task.save();

        const updatedTask = await Task.findById(task._id)
            .populate('comments.user', 'firstName lastName');

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store',
            'ETag': false
        });

        res.json(updatedTask.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;