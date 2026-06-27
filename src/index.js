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
const allProjects = document.querySelector(".allProjects")
const currentProject = document.querySelector(".currentProject")
const projectArray = Librarian.getProjects()
const todayTab = document.getElementById("todayTab")
const weekTab = document.getElementById("weekTab")
const monthTab = document.getElementById("monthTab")
const yearTab = document.getElementById("yearTab")
const allTimeTab = document.getElementById("allTimeTab")

// Main Codespace
Librarian.addProject("All Projects")
/* Librarian.addProject("testProject")
projectArray[1].addTask(new Task("1","pro2","2026-06-25","High","Completed"))
projectArray[1].addTask(new Task("2","pro2","2026-06-25","High","Completed"))
projectArray[1].addTask(new Task("3","pro2","2026-06-25","High","Completed")) */
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
    UIhandler.timeLoad("Today")
})

weekTab.addEventListener("click",()=>{
    UIhandler.timeLoad("Week")
})

monthTab.addEventListener("click",()=>{
    UIhandler.timeLoad("Month")
})

yearTab.addEventListener("click",()=>{
    UIhandler.timeLoad("Year")
})

allTimeTab.addEventListener("click",()=>{
    UIhandler.timeLoad("AllTime")
})


// TODOs
//todo All Projects Option
//todo Local Storage
//todo Styling