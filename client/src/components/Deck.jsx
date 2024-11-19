import React, { useEffect, useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import ProjectCard from './ProjectCard';
import UserCard from './UserCard';

const Deck = () => {
    const { projects, tasks, loading, fetchData } = useProject();
    const { user } = useAuth();
    const [groupedTasks, setGroupedTasks] = useState({
        todo: [],
        inProgress: [],
        completed: []
    });
    const [groupedProjects, setGroupedProjects] = useState({
        todo: [],
        inProgress: [],
        completed: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    // Group projects by status
    useEffect(() => {
        if (!Array.isArray(projects)) return;

        const grouped = projects.reduce((acc, project) => {
            if (!project) return acc;
            
            const status = project.status?.toLowerCase() || 'planning';
            if (status === 'planning') {
                acc.todo.push(project);
            } else if (status === 'ongoing') {
                acc.inProgress.push(project);
            } else if (status === 'completed') {
                acc.completed.push(project);
            }
            return acc;
        }, { todo: [], inProgress: [], completed: [] });

        setGroupedProjects(grouped);
    }, [projects]);

    // Group tasks by status
    useEffect(() => {
        if (!Array.isArray(tasks)) return;

        const grouped = tasks.reduce((acc, task) => {
            if (!task) return acc;
            
            const status = task.status?.toLowerCase() || 'todo';
            if (status.includes('todo')) {
                acc.todo.push(task);
            } else if (status.includes('progress')) {
                acc.inProgress.push(task);
            } else if (status.includes('complete')) {
                acc.completed.push(task);
            }
            return acc;
        }, { todo: [], inProgress: [], completed: [] });

        setGroupedTasks(grouped);
    }, [tasks]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 mt-20">
            <div className="flex flex-col md:flex-row w-full gap-4">
                {/* Todo Column */}
                <div className="flex-1 border-4 hover:border-pink-400 bg-pink-100 p-4 rounded-lg hover:bg-pink-100 opacity-70 hover:opacity-90 transition duration-200 ease-in-out">
                    <h2 className="text-xl font-bold mb-4 text-black">Planning ({groupedTasks.todo.length + groupedProjects.todo.length})</h2>
                    
                    {groupedProjects.todo.map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                    
                    {groupedTasks.todo.map(task => (
                        <UserCard
                            key={task._id}
                            task={task}
                            onStatusChange={() => fetchData()}
                        />
                    ))}
                </div>

                {/* In Progress Column */}
                <div className="flex-1 border-4 hover:border-yellow-400 bg-yellow-100 p-4 rounded-lg opacity-70 hover:opacity-90 transition duration-300 ease-in-out">
                    <h2 className="text-xl font-bold mb-4 text-black">In Progress ({groupedTasks.inProgress.length + groupedProjects.inProgress.length})</h2>
                    
                    {groupedProjects.inProgress.map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                    
                    {groupedTasks.inProgress.map(task => (
                        <UserCard
                            key={task._id}
                            task={task}
                            status="working"
                            onStatusChange={() => fetchData()}
                        />
                    ))}
                </div>

                {/* Completed Column */}
                <div className="flex-1 border-4 hover:border-green-400 bg-green-100 p-4 rounded-lg opacity-70 hover:opacity-90 transition duration-300 ease-in-out">
                    <h2 className="text-xl font-bold mb-4 text-black">Completed ({groupedTasks.completed.length + groupedProjects.completed.length})</h2>
                    
                    {groupedProjects.completed.map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                    
                    {groupedTasks.completed.map(task => (
                        <UserCard
                            key={task._id}
                            task={task}
                            onStatusChange={() => fetchData()}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deck;