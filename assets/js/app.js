// Take all input from html elements  task input, add task button, clear task, display tasks ul, filter
// Move input into List Item
// Append link to Li and insert link in LI
// Append Li to Ul element from the forn

console.log(document.scripts);
console.log(document.forms);
const formArr  = Array.from((document.forms));
console.log(JSON.stringify(document.querySelectorAll("div")));
console.log((document.querySelectorAll("div")));
document.querySelectorAll("div").forEach((item,index) => {
    console.log(`index: ${index}, item: `+  JSON.stringify(item));
});
console.log("__________________")
formArr.forEach((item, index) =>{
    console.log(`index: ${index}, item: `+  JSON.stringify(item));
});

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
}

const addTasks = (e) => {
    if (documentInput.value === "") {
        alert("Please include a task");
    }
    else {
        //Add task to Filter
        console.log(documentInput.value);
        // let li = `<li class="list-group-item">${documentInput.value}</li>` // creating the li element manaually but deprecated
        const li = document.createElement("li"); // create li element
        li.appendChild(document.createTextNode(documentInput.value)); //append li to inpuut
        li.className = "list-group-item"; // add classname to li
        const link = document.createElement("a"); // create link element
        link.className = "float-right";
        const i = document.createElement("i"); // create i element for fontawesome
        i.className = "fa fa-trash";// add font awesome class to style the list item
        link.appendChild(i);
        li.appendChild(link);
        documentUl.appendChild(li);
        documentInput.value = "";
    }
    e.preventDefault();
}

const deleteTask = (e) => {
    if (e.target.className.includes("fa-trash")) {
        console.log(e.target.className);
        if (confirm("Are you sure?")) {
            console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.remove();
        }
    }
}

const clearAllTasks = (e) => {
    if (confirm("Are you sure you want to clear all tasks? ")) {
        while (documentUl.firstChild) {
            documentUl.firstChild.remove();
        }
    }
}

const filterTasks = (e) => {
    let searchValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(listItem => {
        let task = listItem.firstChild.textContent.toLowerCase();
        console.log("task.includes(searchValue) : "+  task.includes(searchValue) );
        if (task.includes(searchValue) === true) {
            listItem.classList.add("d-inline");
        }
        else {
            listItem.classList.add("d-none");
        }
    });
}

const events = fnListenAllEvents();
