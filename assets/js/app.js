// Take all input from html elements  task input, add task button, clear task, display tasks ul, filter
// Move input into List Item
// Append link to Li and insert link in LI
// Append Li to Ul element from the forn

documentInput = document.querySelector("#task");
documentForm = document.querySelector("form");
documentFormTasks = document.querySelector("#form-tasks");
documentUl = document.querySelector(".list-group");
documentClearBtn = document.querySelector(".clear-tasks");
documentFilter = document.querySelector("#filter");



const fnListenAllEvents = () => {
    //Add Tasks
    documentForm.addEventListener("submit", addTasks);
    //Delete a task
    documentFormTasks.addEventListener('click', deleteTask);
    //Clear all tasks
    documentClearBtn.addEventListener("click", clearAllTasks);
    // Filter tasks
    documentFilter.addEventListener("keyup", filterTasks)
    //Fetch from Local Storage Event
    document.addEventListener("DOMContentLoaded", fetchFromLocalStorage("tasks"))
}

const addTasks = (e) => {
    if (documentInput.value === "") {
        alert("Please include a task");
    }
    else {
        //Add task to Filter
        console.log(documentInput.value);
        
        addToLocalStorage("tasks", documentInput.value);
        
        documentInput.value = "";
    }
    fetchFromLocalStorage("tasks");
    e.preventDefault();
}



const addToLocalStorage = (taskKey, taskData = "") => {
    console.log("inside addToLocalStorage...");
    let tasks;
    if ((localStorage.getItem(taskKey) === null)) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem(taskKey));
    }
    tasks.push(taskData);
    localStorage.setItem(taskKey, JSON.stringify(tasks));
}

const fetchFromLocalStorage = (taskKey = "tasks") => {
    console.log("inside fetchFromLocalStorage...");
    let tasks;
    if ((localStorage.getItem(taskKey) === null)) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem(taskKey));
    }

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = task;
        const link = document.createElement('a');
        link.setAttribute("class", "float-right");
        const i = document.createElement("i");
        i.className = "fa fa-trash";
        link.appendChild(i);
        li.appendChild(link);
        documentUl.appendChild(li);
    });

}

const deleteTask = (e) => {
    if (e.target.className.includes("fa-trash")) {
        console.log(e.target.className);
        if (confirm("Are you sure?")) {
            console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.remove();
            deleteTaskFromLocalStorage(e.target.parentElement.parentElement.textContent,"tasks");
        }
    }
}

const deleteTaskFromLocalStorage = (taskToBeDeleted,taskKey) => {
    console.log(taskToBeDeleted);
    let tasks;
    if ((localStorage.getItem(taskKey) === null)) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem(taskKey));
    }

    tasks.forEach((task, index) => {
        if (taskToBeDeleted === task){
            tasks.splice(index,1);
        }
        localStorage.setItem(taskKey,JSON.stringify(tasks));
    });
}

const clearAllTasks = (e) => {
    if (confirm("Are you sure you want to clear all tasks? ")) {
        while (documentUl.firstChild) {
            documentUl.firstChild.remove();
            clearAllTasksFromLocalStorage();
        }
    }
}

const clearAllTasksFromLocalStorage = () => {
    let tasks;
    const taskKey = "tasks";
    if (!(localStorage.getItem(taskKey) === null)) {
        localStorage.removeItem(taskKey);
    }
}

const filterTasks = (e) => {
    let searchValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(listItem => {
        let task = listItem.firstChild.textContent.toLowerCase();
        console.log("task.includes(searchValue) : " + task.includes(searchValue));
        if (task.includes(searchValue) === true) {
            listItem.classList.add("d-inline");
        }
        else {
            listItem.classList.add("d-none");
        }
    });
}

const events = fnListenAllEvents();
