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
UIhandler.loadLocalStorage()

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

todayTab.addEventListener("click",(e)=>{
    UIhandler.timeLoad("Today")
    UIhandler.resetColors()
    e.currentTarget.style.backgroundColor = "rgba(178, 14, 184, 0.432)"
})

weekTab.addEventListener("click",(e)=>{
    UIhandler.timeLoad("Week")
    UIhandler.resetColors()
    e.currentTarget.style.backgroundColor = "rgba(178, 14, 184, 0.432)"
})

monthTab.addEventListener("click",(e)=>{
    UIhandler.timeLoad("Month")
    UIhandler.resetColors()
    e.currentTarget.style.backgroundColor = "rgba(178, 14, 184, 0.432)"
})

yearTab.addEventListener("click",(e)=>{
    UIhandler.timeLoad("Year")
    UIhandler.resetColors()
    e.currentTarget.style.backgroundColor = "rgba(178, 14, 184, 0.432)"
})

allTimeTab.addEventListener("click",(e)=>{
    UIhandler.timeLoad("AllTime")
    UIhandler.resetColors()
    e.currentTarget.style.backgroundColor = "rgba(178, 14, 184, 0.432)"
})

//! Debug Only
document.querySelector(".temp").addEventListener("click",()=>{
    localStorage.clear()
    console.log(localStorage)
})