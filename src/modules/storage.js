const TASK_STORAGE_KEY = 'todoTasks';
const PROJECT_STORAGE_KEY = 'todoProjects';

export function saveTasks(tasks) {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasks() {
    const data = localStorage.getItem(TASK_STORAGE_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
        return [];
    }
}

export function saveProjects(projects) {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
    const data = localStorage.getItem(PROJECT_STORAGE_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Failed to parse projects from localStorage", e);
        return [];
    }
}