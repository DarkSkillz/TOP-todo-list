import "./styles.css"; 
import { Project, Task, Librarian } from "./classes.js";
import UIhandler from "./UIHandler.js";
import functionLoader from "./tabLoader.js"
import tabLoader from "./tabLoader.js";

// Globals
const aside = document.querySelector("aside")
const addProjectBtn = document.querySelector(".addProjectBtn")
const addTaskBtn = document.querySelector(".addTask")
const deleteProjectBtn = document.querySelector(".deleteProject")
const editNameBtn = document.querySelector(".editName")
const projectArray = Librarian.getProjects()
const todayTab = document.getElementById("todayTab")
const weekTab = document.getElementById("weekTab")
const monthTab = document.getElementById("monthTab")
const yearTab = document.getElementById("yearTab")
const allTimeTab = document.getElementById("allTimeTab")

// Main Codespace
Librarian.addProject("Default Project")
projectArray[0].addTask(new Task("Test Task 1","Default Project","2026-06-25","High","Completed"))
projectArray[0].addTask(new Task("Test Task 2","Default Project","2026-06-24","High","Completed"))
projectArray[0].addTask(new Task("Test Task 3","Default Project","2026-06-26","High","Completed"))
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

editNameBtn.addEventListener("click",()=>{
    if (!document.contains(document.querySelector(".editProjectForm"))) {
        UIhandler.editProjectName()
    }
})

todayTab.addEventListener("click",()=>{
    UIhandler.loadToday()
})
weekTab.addEventListener("click",()=>{
    UIhandler.loadThisWeek()
})
monthTab.addEventListener("click",()=>{
    UIhandler.loadThisMonth()
})
yearTab.addEventListener("click",()=>{
    UIhandler.loadThisYear()
})
allTimeTab.addEventListener("click",()=>{
    UIhandler.loadAllTime()
})


// TODOs
//todo Tab Switching Filters
//todo All Projects Option
//todo Styling