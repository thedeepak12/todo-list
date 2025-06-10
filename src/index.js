import './style.css';
import buildSidebar from './modules/sidebar';
import createTaskForm from './modules/task';
import { loadTasks, saveTasks } from './modules/storage.js';

let tasks = loadTasks();
let currentView = 'inbox';

const app = document.getElementById('app');

const header = document.createElement('header');
header.textContent = 'Todo List';

const container = document.createElement("div");
container.classList.add("container");

const sidebar = buildSidebar();

const main = document.createElement("div");
main.classList.add("main");

container.appendChild(sidebar);
container.appendChild(main);

app.appendChild(header);
app.appendChild(container);

const addTaskBtn = sidebar.querySelector(".add-task");

addTaskBtn.addEventListener("click", () => {
    const form = createTaskForm((taskData) => {
        tasks.push({
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
    });
        saveTasks(tasks);
        renderTaskList();
    });
    main.appendChild(form);
});

const viewTiles = document.querySelectorAll('.tile');
viewTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        currentView = tile.id;
        viewTiles.forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        renderTaskList();
    })
})
sidebar.querySelector('#inbox').classList.add('selected');

function renderTaskList() {
    main.innerHTML = '';

    if (tasks.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No tasks yet.';
        main.appendChild(empty);
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');

        const title = document.createElement('h3');
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        const due = document.createElement('p');
        due.textContent = `Due: ${task.dueDate || 'No date'}`;

        taskDiv.appendChild(title);
        taskDiv.appendChild(description);
        taskDiv.appendChild(due);

        main.appendChild(taskDiv);
    });
}

renderTaskList();