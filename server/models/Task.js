import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Project reference is required']
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : false
    }],
    status: {
        type: String,
        enum: ['Todo', 'In Progress', 'Completed'],
        default: 'Todo'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    deadline: Date,
    estimatedHours: Number,
    actualHours: Number,
    dependencies: [{
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    }],
    stage: {
        type: Number,
        default: 0
    },
    history: [{
        field: String,
        oldValue: String,
        newValue: String,
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        changedAt: {
            type: Date,
            default: Date.now
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

taskSchema.index({ project: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ deadline: 1 });

taskSchema.virtual('isOverdue').get(function() {
    return this.deadline < new Date() && this.status !== 'Completed';
});

taskSchema.virtual('remainingTime').get(function() {
    if (!this.deadline) return null;
    return this.deadline - new Date();
});

taskSchema.post('save', async function(doc) {
    try {
        const Project = mongoose.model('Project');
        const project = await Project.findById(doc.project);
        if (project) {
            await project.updateProgress();
        }
    } catch (error) {
        console.error('Error updating project progress:', error);
    }
});

taskSchema.pre('remove', async function(next) {
    try {
        const Project = mongoose.model('Project');
        const User = mongoose.model('User');
        
        await Project.findByIdAndUpdate(this.project, {
            $pull: { tasks: this._id }
        });
        
        await User.updateMany(
            { _id: { $in: this.assignedTo } },
            { $pull: { assignedTasks: this._id } }
        );
        
        next();
    } catch (error) {
        next(error);
    }
});

export const Task = mongoose.model('Task', taskSchema);