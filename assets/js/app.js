// Take all input from html elements  task input, add task button, clear task, display tasks ul, filter
// Move input into List Item
// Append link to Li and insert link in LI
// Append Li to Ul element from the forn

documentInput = document.querySelector("#task");
documentForm = document.querySelector("form");
documentUl = document.querySelector(".list-group");
documentClearBtn = document.querySelector(".clear-tasks");
documentFilter = document.querySelector("#filter");


console.log("documentForm: " + documentForm.submit);
const fnListenAllEvents = () => {
    documentForm.addEventListener("submit",addTasks);
}

const addTasks = (e) => {
    if (documentInput.value === ""){
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
        link.className= "float-right";
        const i = document.createElement("i"); // create i element for fontawesome
        i.className = "fa fa-trash";// add font awesome class to style the list item
        link.appendChild(i);
        li.appendChild(link);        
        documentUl.appendChild(li);
        documentInput.value = "";
        
 
    }
    e.preventDefault();
}

const events = fnListenAllEvents();