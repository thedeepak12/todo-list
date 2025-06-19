import inboxIcon from "../assets/images/inbox.svg";
import todayIcon from '../assets/images/today.svg';
import upcomingIcon from '../assets/images/upcoming.svg';
import tagIcon from '../assets/images/tag.svg';
import addIcon from '../assets/images/add.svg';
import deleteIcon from '../assets/images/delete.svg';
import { addProject, getProjects, createProjectForm, deleteProject } from './project';

export default function buildSidebar(updateTileSelection, renderTaskList) {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("add-task");

    const addImg = document.createElement("img");
    addImg.src = addIcon;
    addImg.alt = "Add task";

    const addText = document.createElement("div");
    addText.textContent = "Add task";

    addTaskBtn.appendChild(addImg);
    addTaskBtn.appendChild(addText);

    sidebar.appendChild(addTaskBtn);

    const views = [
        { id: 'inbox', label: 'Inbox', icon: inboxIcon },
        { id: 'today', label: 'Today', icon: todayIcon },
        { id: 'upcoming', label: 'Upcoming', icon: upcomingIcon },
    ];

    views.forEach(view => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = view.id;

        const img = document.createElement("img");
        img.src = view.icon;
        img.alt = view.label;

        const text = document.createElement("div");
        text.textContent = view.label;

        tile.appendChild(img);
        tile.appendChild(text);
        sidebar.appendChild(tile);
    });

    const projectSection = document.createElement("div");
    projectSection.classList.add("project-section");

    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");

    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = "My Projects";

    const addProjectBtn = document.createElement("div");
    addProjectBtn.classList.add("add-project-btn");

    const addProjectImg = document.createElement("img");
    addProjectImg.src = addIcon;
    addImg.alt = "Add project";
    addProjectImg.classList.add("add-project-img");

    addProjectBtn.appendChild(addProjectImg);

    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(addProjectBtn);
    projectSection.appendChild(projectHeader);

    const projectList = document.createElement("div");
    projectList.classList.add("project-list");

    function renderProjects() {
        projectList.innerHTML = '';
        const projects = getProjects();
        projects.forEach(project => {
            const projectTile = document.createElement("div");
            projectTile.classList.add("tile");
            projectTile.id = project.id;
            
            const projectLabel = document.createElement('div');

            const text = document.createElement('p');
            text.textContent = project.name;

            const img = document.createElement("img");
            img.src = tagIcon;
            img.alt = '';

            projectLabel.appendChild(text);
            projectLabel.appendChild(img);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-project-btn');
            const deleteImg = document.createElement('img');
            deleteImg.src = deleteIcon;
            deleteBtn.appendChild(deleteImg);
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteProject(project.id);
                renderProjects();
            });

            projectTile.appendChild(projectLabel);
            projectTile.appendChild(deleteBtn);
            projectList.appendChild(projectTile);
        });
    }

    addProjectBtn.addEventListener("click", () => {
        const existingForm = projectSection.querySelector(".project-form");
        if (existingForm) return;
        const form = createProjectForm((name) => {
            addProject(name);
            renderProjects();
        });
        projectSection.insertBefore(form, projectList);
        form.querySelector("#project-name").focus();
    });

    renderProjects();
    projectSection.appendChild(projectList);
    sidebar.appendChild(projectSection);
    
    return sidebar;
}