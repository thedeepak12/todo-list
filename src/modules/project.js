import { saveProjects, loadProjects } from "./storage";

export function addProject(name) {
    const projects = loadProjects();
    const id = `project-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    projects.push({ id, name });
    saveProjects(projects);
    return { id, name };
}

export function getProjects() {
    let projects = loadProjects();
    if (projects.length === 0) {
        projects = [
            { id: 'project-personal', name: 'Personal' },
            { id: 'project-work', name: 'Work' }
        ];
        saveProjects(projects);
    }
    return projects;
}

export function deleteProject(id) {
    const projects = loadProjects();
    const updatedProjects = projects.filter(projects => projects.id !== id); 
    saveProjects(updatedProjects);
}

export function createProjectForm(onSubmit) {
    const form = document.createElement('div');
    form.classList.add('project-form');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = "project-name";
    input.placeholder = "Name";
    input.required = true

    const submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.textContent = "Add";
    submitBtn.classList.add("add-project-submit");

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancel-project-btn");

    form.appendChild(input);
    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    submitBtn.addEventListener("click", () => {
        const name = input.value.trim();
        if (name) {
            onSubmit(name);
            form.remove();
        }
    });

    cancelBtn.addEventListener("click", () => {
        form.remove();
    });

    return form;
}