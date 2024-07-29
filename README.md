
Todo List Application

This project is a simple Todo List application built with React that allows users to add and delete tasks.

It also uses react-toastify for displaying notifications and localStorage to persist tasks across page reloads.

Features: 

Add new tasks with a title and description.

Delete tasks.

Notifications for task addition and deletion using react-toastify.

Persistence of tasks using localStorage.

State Management

title: Stores the current task title input.

desc: Stores the current task description input.

main: An array that holds all the tasks.

isEditing: A boolean that indicates if a task is being edited.

currentTaskIndex: The index of the task currently being edited.

searchTerm: Stores the current search term input.
Effect Hook

useEffect: Loads tasks from localStorage when the component mounts.
Handlers
submitHandler: Handles form submission for both adding new tasks and updating existing tasks.

If isEditing is true, it updates the task at currentTaskIndex and sets isEditing to false.

If isEditing is false, it adds a new task to the main array.

Saves the updated tasks to localStorage.
Clears the input fields and displays a success notification.
deleteHandler: Deletes the task at the specified index.

Removes the task from the main array.

Saves the updated tasks to localStorage.

Displays a success notification.

editHandler: Prepares the form for editing a task.

Sets the current task's title and description in the input fields.

Sets isEditing to true and stores the index of the task being edited in currentTaskIndex.

toggleDoneHandler: Toggles the done property of a task.

Updates the task's completion status.

Saves the updated tasks to localStorage.

Displays a success notification.
filteredTasks: Filters tasks based on the search term.

Rendering
Renders a form with input fields for the task title and description, and a submit button that changes text based on isEditing.
Renders a search input field to filter tasks by title or description.

Renders a list of tasks with "Edit", "Delete", and "Mark as Done" buttons for each task.

Applies a line-through class to tasks that are marked as done.

Displays a message if no tasks are available.

Toast Notifications

Displays error notifications if the title or description is missing when adding or updating a task.
Displays success notifications when a task is added, updated, or deleted.
Displays success notifications when a task's status is updated.
Dependencies
react: JavaScript library for building user interfaces.
react-toastify: Library for displaying notifications.
tailwindcss: Utility-first CSS framework.

localStorage: Web API for storing data locally in the user's browser.
