import './style.css';
import buildSidebar from './modules/sidebar';
import createTaskForm from './modules/task';

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
    main.innerHTML = "";
    const form = createTaskForm((taskData) => {
        console.log("Task submitted", taskData);
        main.innerHTML = "";
    });
    main.appendChild(form);
})