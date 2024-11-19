import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../util/api';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, token } = useAuth();

    const fetchData = async () => {
        if (!token || !isAuthenticated) {
            console.log('No token or not authenticated');
            setLoading(false);
            return;
        }
    
        try {
            setLoading(true);
            console.log('Fetching data with token:', token);
            
            const projectsRes = await api.get('/projects');
            console.log('Projects response:', projectsRes.data);
            
            const tasksRes = await api.get('/tasks');
            console.log('Tasks response:', tasksRes.data);
            
            if (projectsRes.data) {
                setProjects(projectsRes.data);
                console.log('Projects set in state:', projectsRes.data);
            }
            
            if (tasksRes.data) {
                setTasks(tasksRes.data);
                console.log('Tasks set in state:', tasksRes.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error.response || error);
            setProjects([]);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (projectData) => {
        try {
            const response = await api.post('/projects', projectData);
            setProjects(prev => [...prev, response.data]);
            await fetchData(); // Refresh data after creation
            return response.data;
        } catch (error) {
            console.error('Project creation error:', error);
            throw error.response?.data?.message || 'Failed to create project';
        }
    };

    const updateProject = async (projectId, projectData) => {
        try {
            const response = await api.put(`/projects/${projectId}`, projectData);
            setProjects(prev => prev.map(p => p._id === projectId ? response.data : p));
            await fetchData(); // Refresh data after update
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update project';
        }
    };

    const deleteProject = async (projectId) => {
        try {
            await api.delete(`/projects/${projectId}`);
            setProjects(prev => prev.filter(p => p._id !== projectId));
            await fetchData(); // Refresh data after deletion
        } catch (error) {
            throw error.response?.data?.message || 'Failed to delete project';
        }
    };

    const createTask = async (taskData) => {
        try {
            const response = await api.post('/tasks', taskData);
            setTasks(prev => [...prev, response.data]);
            await fetchData(); // Refresh data after creation
            return response.data;
        } catch (error) {
            console.error('Task creation error:', error);
            throw error.response?.data?.message || 'Failed to create task';
        }
    };

    const updateTask = async (taskId, taskData) => {
        try {
            const response = await api.put(`/tasks/${taskId}`, taskData);
            setTasks(prev => prev.map(t => t._id === taskId ? response.data : t));
            await fetchData(); // Refresh data after task update
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update task';
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(prev => prev.filter(t => t._id !== taskId));
            await fetchData(); // Refresh data after task deletion
        } catch (error) {
            throw error.response?.data?.message || 'Failed to delete task';
        }
    };

    const value = {
        projects,
        tasks,
        loading,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
        fetchData
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};