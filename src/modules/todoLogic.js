import { saveTasks, loadTasks } from './storage';

export function updateTask(createdAt, taskData) {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(task => task.createdAt === createdAt);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            ...taskData,
            completed: tasks[taskIndex].completed || false,
            createdAt: tasks[taskIndex].createdAt,
            project: taskData.project
        };
        saveTasks(tasks);
    }
}

export function deleteTask(createdAt) {
    const tasks = loadTasks();
    const updatedTasks = tasks.filter(task => task.createdAt !== createdAt);
    saveTasks(updatedTasks);
}