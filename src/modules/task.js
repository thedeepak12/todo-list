export default function createTaskForm(onSubmit, task = {}, index) {
    const overlay = document.createElement("div");
    overlay.classList.add("form-overlay");

    const form = document.createElement("form");
    form.classList.add("task-form");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = "task-title";

    const title = document.createElement("input");
    title.type = "text";
    title.id = "task-title";
    title.value = task.title || '';
    title.required = true;

    const descLabel = document.createElement("label");
    descLabel.textContent = "Description:";
    descLabel.htmlFor = "task-desc";

    const description = document.createElement("textarea");
    description.id = "task-desc";
    description.rows = 4;
    description.value = task.description || '';

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Due Date:";
    dateLabel.htmlFor = "task-date";

    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.id = "task-date";
    dueDate.value = task.dueDate || '';

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority:";
    priorityLabel.htmlFor = "task-priority";

    const priority = document.createElement("select");
    priority.id = "task-priority";
    ["Low", "Medium", "High"].forEach(level => {
        const option = document.createElement("option");
        option.value = level.toLowerCase();
        option.textContent = level;
        priority.appendChild(option);
    });

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = task.title ? "Save" : "Add Task";
    submit.classList.add("add-task-btn");

    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.classList.add("cancel-btn");

    form.appendChild(titleLabel);
    form.appendChild(title);
    form.appendChild(descLabel);
    form.appendChild(description);
    form.appendChild(dateLabel);
    form.appendChild(dueDate);
    form.appendChild(priorityLabel);
    form.appendChild(priority);
    form.appendChild(submit);
    form.appendChild(cancel);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskData = {
            title: title.value.trim(),
            description: description.value.trim(),
            dueDate: dueDate.value,
            priority: priority.value,
        };
        if (taskData.title) {
            onSubmit(taskData, index);
            overlay.remove();
        }
    });
    
    cancel.addEventListener("click", () => {
        overlay.remove();
    });

    overlay.appendChild(form);
    return overlay;
}