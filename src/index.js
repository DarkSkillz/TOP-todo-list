import "./styles.css"; 
import { Project, Task, Librarian } from "./classes.js";
import UIhandler from "./UIHandler.js";
import functionLoader from "./functionLoader.js"

// Globals
const aside = document.querySelector("aside")
const addProjectBtn = document.querySelector(".addProjectBtn")
const addTaskBtn = document.querySelector(".addTask")
const deleteProjectBtn = document.querySelector(".deleteProject")
const projectArray = Librarian.getProjects()

// Main Codespace
Librarian.addProject("Default Project")
UIhandler.projectsToDOM()

// Event Listeners
addProjectBtn.addEventListener("click",()=>{
    if (!document.contains(document.querySelector(".addProjectForm"))) {
        UIhandler.addProjectForm()
    }
})

addTaskBtn.addEventListener("click",()=>{
    if (!document.contains(document.querySelector(".taskCreationForm"))) {
        UIhandler.taskCreationForm()
    }
})

deleteProjectBtn.addEventListener("click",()=>{
    if (!document.contains(document.querySelector(".deleteConfirmBox"))) {
        UIhandler.deleteConfirmBox("project")
    }
})

//todo Edit And Delete Tasks
//todo Tab Switching Filters
//todo Styling