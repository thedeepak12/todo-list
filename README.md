# Todo List

This project is a dynamic, project-based Todo List application built with vanilla JavaScript, HTML, and CSS. It features a clean user interface where users can manage tasks by priority, due date, and projects. All interactions are handled with modular JavaScript, emphasizing DOM manipulation and component-based design.

## Features

* **Project-Based Task Management**: Users can create custom projects and view tasks specific to each project.
* **Task CRUD Operations**: Add, edit, and delete tasks with form validation and persistent data.
* **Dynamic Rendering**: All tasks and projects are rendered dynamically based on user input and current selection.
* **Local Storage Persistence**: Tasks and projects are saved in the browser's local storage for data retention across sessions.
* **Priority Indicators**: Visual cues (colored borders) indicate priority level — low, medium, or high.

## Tech Stack

* **JavaScript**: Core logic for DOM manipulation, event handling, and state management.
* **HTML**: Provides the base structure and entry point.
* **CSS**: Custom styles using:
  * Flexbox layout for sidebar and main sections.
  * Transitions and hover states for interactivity.
  * Form styling for task and project inputs.
* **LocalStorage API**: Used to store and retrieve tasks and projects per user session.
* **date-fns**: Lightweight JavaScript library used for formatting and manipulating dates in task due dates.

## What I Learned

* **Modular JavaScript Architecture**: Structured code into separate files (tasks, project, sidebar, storage, todoLogic) to improve maintainability and readability.
* **Dynamic UI Updates**: Built forms and components that update the DOM in real time without full page reloads.
* **Event Delegation & State Tracking**: Managed complex user interactions, such as editing vs. adding tasks, using internal state flags.
* **Local Storage Integration**: Implemented persistent state without a backend, using the browser's local storage effectively.
* **Date Formatting with date-fns**: Utilized `date-fns` for clean, human-readable formatting of due dates and future-ready date handling.