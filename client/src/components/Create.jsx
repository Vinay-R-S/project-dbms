import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';

const Create = () => {
    const navigate = useNavigate();
    const { createProject } = useProject();
    const { user, isManager } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        deadline: '',
        employees: '', // Change to a string to accept comma-separated emails
        tasks: []
    });

    const [currentTask, setCurrentTask] = useState({
        title: '',
        description: '',
        deadline: '',
        assignedTo: ''
    });

    // Add a new task to the project
    const handleAddTask = () => {
        if (!currentTask.title || !currentTask.description || !currentTask.deadline) {
            setError('Please fill all task fields');
            return;
        }
        setProjectData(prev => ({
            ...prev,
            tasks: [...prev.tasks, { ...currentTask }]
        }));
        setCurrentTask({
            title: '',
            description: '',
            deadline: '',
            assignedTo: ''
        });
        setError('');
    };

    // Remove a task from the project
    const handleRemoveTask = (index) => {
        setProjectData(prev => ({
            ...prev,
            tasks: prev.tasks.filter((_, i) => i !== index)
        }));
    };

    // Handle project submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!projectData.title || !projectData.description || !projectData.deadline) {
            setError('Please fill all project fields');
            return;
        }
    
        try {
            // Create project first
            const createdProject = await createProject({
                ...projectData,
                employees: projectData.employees.split(',').map(email => email.trim()),
                manager: user._id,
                status: 'Planning'
            });
    
            // Create tasks for the project
            if (projectData.tasks.length > 0) {
                const taskPromises = projectData.tasks.map(task => {
                    return fetch('/api/tasks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            title: task.title,
                            description: task.description,
                            projectId: createdProject._id,
                            deadline: task.deadline,
                            assignedTo: userData._id,
                            status: 'Todo'
                        })  
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to create task');
                        }
                        return res.json();
                    });
                });
    
                await Promise.all(taskPromises);
            }
    
            setSuccess('Project and tasks created successfully!');
            setTimeout(() => navigate('/deck'), 1500);
        } catch (err) {
            setError(err.message || 'Failed to create project');
        }
    };

    if (!isManager) {
        return (
            <div className="mt-32 text-center text-red-500">
                Only managers can create projects.
            </div>
        );
    }

    return (
        <div className="mt-32 container mx-auto px-4 mb-8">
            <div className="max-w-3xl mx-auto bg-zinc-800 rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Create New Project</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Project Details */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4 text-white">Project Details</h3>
                        <input
                            type="text"
                            placeholder="Project Title"
                            value={projectData.title}
                            onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                        />
                        <textarea
                            placeholder="Project Description"
                            value={projectData.description}
                            onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                            rows="4"
                        />
                        <input
                            type="date"
                            value={projectData.deadline}
                            onChange={(e) => setProjectData({...projectData, deadline: e.target.value})}
                            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                        />
                        <input
                            type="text"
                            placeholder="Employees (comma-separated emails)"
                            value={projectData.employees}
                            onChange={(e) => setProjectData({...projectData, employees: e.target.value})}
                            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                        />
                    </div>

                    {/* Task Creation */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4 text-white">Add Tasks</h3>
                        <div className="bg-gray-700 p-4 rounded mb-4">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={currentTask.title}
                                onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                                className="w-full mb-4 p-2 rounded bg-gray-600 text-white"
                            />
                            <textarea
                                placeholder="Task Description"
                                value={currentTask.description}
                                onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
                                className="w-full mb-4 p-2 rounded bg-gray-600 text-white"
                                rows="3"
                            />
                            <input
                                type="date"
                                value={currentTask.deadline}
                                onChange={(e) => setCurrentTask({...currentTask, deadline: e.target.value})}
                                className="w-full mb-4 p-2 rounded bg-gray-600 text-white"
                            />
                            <input
                                type="text"
                                placeholder="Assigned To (Employee Email)"
                                value={currentTask.assignedTo}
                                onChange={(e) => setCurrentTask({...currentTask, assignedTo: e.target.value})}
                                className="w-full mb-4 p-2 rounded bg-gray-600 text-white"
                            />
                            <button
                                type="button"
                                onClick={handleAddTask}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add Task
                            </button>
                        </div>

                        {/* Task List */}
                        <div className="space-y-2">
                            {projectData.tasks.map((task, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                                    <div className="text-white">
                                        <div className="font-semibold">{task.title}</div>
                                        <div className="text-sm text-gray-300">Assigned to: {task.assignedTo}</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTask(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;