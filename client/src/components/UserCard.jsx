import React, { useState } from "react";
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';

const UserCard = ({ task, onStatusChange }) => {
    const { updateTask, deleteTask } = useProject();
    const { user, isManager } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        deadline: task.deadline
    });

    // Simplified permission check
    const isAssignedUser = task.assignedTo?._id === user?._id;
    const canModifyTask = isManager || isAssignedUser;

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(task._id, editData);
            setIsEditing(false);
            if (onStatusChange) onStatusChange();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(task._id);
                if (onStatusChange) onStatusChange();
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
    };

    const handleStatusChange = async (action) => {
        try {
            let newStatus;
            const currentStatus = task.status.toLowerCase();

            if (action === 'push') {
                if (currentStatus === 'todo') {
                    newStatus = 'In Progress';
                } else if (currentStatus === 'in progress') {
                    newStatus = 'Completed';
                }
            } else if (action === 'revert') {
                if (currentStatus === 'completed') {
                    newStatus = 'In Progress';
                } else if (currentStatus === 'in progress') {
                    newStatus = 'Todo';
                }
            }

            if (newStatus) {
                await updateTask(task._id, { status: newStatus });
                if (onStatusChange) onStatusChange();
            }
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    if (isEditing && canModifyTask) {
        return (
            <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
                <form onSubmit={handleEdit}>
                    <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="mb-2 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2"
                    />
                    <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({...editData, description: e.target.value})}
                        className="mb-2 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2"
                    />
                    <input
                        type="date"
                        value={editData.deadline?.split('T')[0]}
                        onChange={(e) => setEditData({...editData, deadline: e.target.value})}
                        className="mb-2 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2"
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="text-blue-500">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="text-red-500">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
            <div className="flex justify-between w-full align-center">
                <div>
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {task.title}
                    </h5>
                    <div className="text-sm tracking-tight text-gray-400">
                        Project: {task.project?.title || 'No Project'}
                    </div>
                </div>
                <div className="text-sm tracking-tight text-white">
                    {new Date(task.deadline).toLocaleDateString()}
                </div>
            </div>

            {/* <div className="text-s tracking-tight text-white">
                Assigned to : {task.assignedTo ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}` : 'Unassigned'}
            </div> */}

            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {task.description}
            </p>

            {canModifyTask && (
                <div className="flex justify-between w-full align-center mt-4">
                    <button onClick={() => setIsEditing(true)} className="text-blue-300 hover:text-blue-500">
                        Edit
                    </button>
                    {task.status.toLowerCase() !== 'completed' && (
                        <button 
                            onClick={() => handleStatusChange('push')} 
                            className="text-green-500 hover:text-green-700"
                        >
                            Push →
                        </button>
                    )}
                    {task.status.toLowerCase() !== 'todo' && (
                        <button 
                            onClick={() => handleStatusChange('revert')} 
                            className="text-yellow-500 hover:text-yellow-700"
                        >
                            ← Revert
                        </button>
                    )}
                    {isManager && (
                        <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserCard;