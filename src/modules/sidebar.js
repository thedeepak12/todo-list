import inboxIcon from "../assets/images/inbox.svg";
import todayIcon from '../assets/images/today.svg';
import upcomingIcon from '../assets/images/upcoming.svg';
import tagIcon from '../assets/images/tag.svg';

export default function buildSidebar() {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

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

    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = "My Projects";

    projectSection.appendChild(projectTitle);

    const projects = ["Work", "Personal"];

    projects.forEach(projectName => {
        const projectTile = document.createElement("div");
        projectTile.classList.add("tile");

        const img = document.createElement("img");
        img.src = tagIcon;
        img.alt = '';

        const text = document.createElement("div");
        text.textContent = projectName;

        projectTile.appendChild(img);
        projectTile.appendChild(text);
        projectSection.appendChild(projectTile);
    })

    sidebar.appendChild(projectSection);

    return sidebar;
}