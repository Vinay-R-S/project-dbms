import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        minlength: [3, 'Project title must be at least 3 characters long'],
        maxlength: [100, 'Project title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Project manager is required']
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    status: {
        type: String,
        enum: ['Planning', 'Ongoing', 'Completed', 'On Hold', 'Cancelled'],
        default: 'Planning'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: [true, 'Project deadline is required']
    },
    completionDate: {
        type: Date
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    budget: {
        type: Number,
        min: 0
    },
    tags: [{
        type: String,
        trim: true
    }],
    attachments: [{
        name: String,
        url: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Calculate project progress based on completed tasks
projectSchema.methods.calculateProgress = async function() {
    const totalTasks = this.tasks.length;
    if (totalTasks === 0) return 0;

    const Task = mongoose.model('Task');
    const completedTasks = await Task.countDocuments({
        _id: { $in: this.tasks },
        status: 'Completed'
    });

    return Math.round((completedTasks / totalTasks) * 100);
};

projectSchema.methods.updateProgress = async function() {
    try {
        const Task = mongoose.model('Task');
        const totalTasks = this.tasks.length;
        if (totalTasks === 0) {
            this.progress = 0;
            return;
        }

        const completedTasks = await Task.countDocuments({
            _id: { $in: this.tasks },
            status: 'Completed'
        });

        this.progress = Math.round((completedTasks / totalTasks) * 100);
        await this.save();
    } catch (error) {
        console.error('Error updating project progress:', error);
    }
};

// Get remaining days until deadline
projectSchema.virtual('remainingDays').get(function() {
    if (!this.deadline) return null;
    const today = new Date();
    const diffTime = this.deadline - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to update progress
projectSchema.pre('save', async function(next) {
    if (this.isModified('tasks')) {
        this.progress = await this.calculateProgress();
    }
    next();
});

// Create indexes
projectSchema.index({ manager: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ deadline: 1 });

export const Project = mongoose.model('Project', projectSchema);