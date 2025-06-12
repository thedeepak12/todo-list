import { saveTasks } from './modules/storage.js';

export function updateTask(index, taskData, tasks) {
    tasks[index] = {
        ...taskData,
        completed: tasks[index].completed || false,
        createdAt: tasks[index].createdAt || new Date().toISOString(),
    };
    saveTasks(tasks);
}

export function deleteTask(index, tasks) {
    tasks.splice(index, 1);
    saveTasks(tasks);
}