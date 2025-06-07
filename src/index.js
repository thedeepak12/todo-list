import './style.css';
import buildSidebar from './modules/sidebar';

const app = document.getElementById('app');

const header = document.createElement('header');
header.textContent = 'Todo List';

const container = document.createElement("div");
container.classList.add("container");

const sidebar = buildSidebar();

container.appendChild(sidebar);

app.appendChild(header);
app.appendChild(container);