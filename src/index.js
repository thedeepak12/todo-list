import './style.css';
import buildSidebar from './modules/sidebar';
import createTaskForm from './modules/task';
import { loadTasks, saveTasks } from './modules/storage';
import { format, isToday, isWithinInterval, addDays } from 'date-fns';
import editIcon from './assets/images/edit.svg';
import deleteIcon from './assets/images/delete.svg';
import { updateTask, deleteTask } from './modules/todoLogic';

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

const viewTiles = sidebar.querySelectorAll('.tile:not(.project-section .tile)');
viewTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        currentView = tile.id;
        viewTiles.forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        renderTaskList();
    });
});
sidebar.querySelector('#inbox').classList.add('selected');

function renderTaskList() {
    main.innerHTML = '';

    let filteredTasks = tasks;
    if (currentView === 'today') {
        filteredTasks = tasks.filter(task => task.dueDate && isToday(new Date(task.dueDate)));
    } else if (currentView === 'upcoming') {
        const today = new Date();
        const nextWeek = addDays(today, 7);
        filteredTasks = tasks.filter(task => 
            task.dueDate && 
            isWithinInterval(new Date(task.dueDate), { start: today, end: nextWeek })
        );
    }

    if (filteredTasks.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No tasks yet.';
        main.appendChild(empty);
        return;
    }

    filteredTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                deleteTask(index, tasks);
                renderTaskList();
            }
        });
        
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        const title = document.createElement('h3');
        title.textContent = task.title;

        const description = document.createElement('p');
        description.textContent = task.description;

        const due = document.createElement('p');
        due.classList.add('due-date');
        due.textContent = task.dueDate ? `Due: ${format(new Date(task.dueDate), 'dd MMM')}` : '';

        taskDetails.appendChild(title);
        taskDetails.appendChild(description);
        taskDetails.appendChild(due);

        const actions = document.createElement('div');
        actions.classList.add('task-actions');

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        const editImg = document.createElement('img');
        editImg.src = editIcon;
        editImg.alt = 'Edit task';
        editBtn.appendChild(editImg);
        editBtn.addEventListener('click', () => {
            const form = createTaskForm((taskData) => {
                updateTask(index, taskData, tasks);
                renderTaskList();
            }, task, index);
            main.appendChild(form);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        const deleteImg = document.createElement('img');
        deleteImg.src = deleteIcon;
        deleteImg.alt = 'Delete task';
        deleteBtn.appendChild(deleteImg);
        deleteBtn.addEventListener('click', () => {
            deleteTask(index, tasks);
            renderTaskList();
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        taskHeader.appendChild(checkbox);
        taskHeader.appendChild(taskDetails);
        taskHeader.appendChild(actions);

        taskDiv.appendChild(taskHeader);
        main.appendChild(taskDiv);
    });
}

renderTaskList();