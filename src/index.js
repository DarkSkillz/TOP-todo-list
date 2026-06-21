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
projectArray[0].addTask(new Task("one","Default Project","2026-06-11","High","Completed"))
projectArray[0].addTask(new Task("two","Default Project","2026-06-11","High","Completed"))
projectArray[0].addTask(new Task("three","Default Project","2026-06-11","High","Completed"))
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

//todo Name Validation for tasks
//todo Edit And Delete Tasks
//todo Tab Switching Filters
//todo Styling