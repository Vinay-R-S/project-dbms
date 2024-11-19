import React, { useState } from "react";
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';

const ProjectCard = ({ project }) => {
    const { updateProject, deleteProject } = useProject();
    const { user, isManager } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: project.title,
        description: project.description,
        deadline: project.deadline
    });

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await updateProject(project._id, editData);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update project:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(project._id);
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
        }
    };

    const handlePush = async () => {
        try {
            await updateProject(project._id, { status: 'Completed' });
        } catch (error) {
            console.error('Failed to complete project:', error);
        }
    };

    const handleRevert = async () => {
        try {
            await updateProject(project._id, { status: 'In Progress' });
        } catch (error) {
            console.error('Failed to revert project:', error);
        }
    };

    if (isEditing) {
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
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {project.title}
                </h5>
                <div className="text-sm tracking-tight text-white">
                    {new Date(project.deadline).toLocaleDateString()}
                </div>
            </div>

            <div className="text-s tracking-tight text-white">
                Managed by : {project.manager?.firstName} {project.manager?.lastName}
            </div>

            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {project.description}
            </p>

            {project.employees?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {project.employees.map(employee => (
                        <span key={employee._id} className="text-sm bg-blue-500 text-white px-2 py-1 rounded-lg">
                            {employee.firstName} {employee.lastName}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex justify-between w-full align-center mt-4">
                {isManager && (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-blue-300 hover:text-blue-500">
                            Edit
                        </button>
                        {project.status !== 'Completed' && (
                            <button onClick={handlePush} className="text-green-500 hover:text-green-700">
                                Push
                            </button>
                        )}
                        {project.status === 'Completed' && (
                            <button onClick={handleRevert} className="text-yellow-500 hover:text-yellow-700">
                                Revert
                            </button>
                        )}
                        <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;