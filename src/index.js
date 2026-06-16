import "./styles.css"; 
import { Project, Task, Librarian } from "./classes.js";
import UIhandler from "./UIHandler.js";
import functionLoader from "./functionLoader.js"

// Globals
const aside = document.querySelector("aside")
const addProjectBtn = document.querySelector(".addProjectBtn")
const projectArray = Librarian.getProjects()
let currentProject

// Main Codespace
Librarian.addProject("Default Project")

const newTask = new Task("test task","empty","someday","high","comp")

// Event Listeners
addProjectBtn.addEventListener("click",()=>{
    if (!aside.contains(aside.querySelector(".addProjectForm"))) {
        UIhandler.addProjectForm()
    }
})