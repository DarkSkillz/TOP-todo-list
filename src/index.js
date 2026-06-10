import "./styles.css"; 
import { Project, Task, Librarian } from "../classes.js";
import UIhandler from "../UIHandler.js";
import tabLoader from "../tabLoader.js"

/* const project0 = new Project("Project0")
const project1 = new Project("Project1")
const project2 = new Project("Project2")

Librarian.addProject(project0)
Librarian.addProject(project1)
Librarian.addProject(project2)
const projects = Librarian.getAllProjects()

projects[0].addTask(new Task("Task0","28th May 2026", "High","Not Completed", projects[0]._name))
projects[1].addTask(new Task("Task1","29th May 2026", "Medium","Completed", projects[1]._name))
projects[2].addTask(new Task("Task2","30th May 2026", "Low","Not Completed", projects[2]._name))

Librarian.deleteProject(project1) */

const aside = document.querySelector("aside")
const addProjectBtn = document.querySelector(".addProjectBtn")

addProjectBtn.addEventListener("click",()=>{
    if (!aside.contains(aside.querySelector(".addProjectForm"))) {
        UIhandler.addProjectForm()

        const inputText = aside.querySelector(".addFormProjectInputText")
        const formProject = aside.querySelector(".inputSubmitProject")
        const projectItems = aside.getElementsByClassName("projectItem")
        inputText.style.borderColor = "black"
        formProject.addEventListener("click",(e) => {
            e.preventDefault()
            // Check for name validation
            if (inputText.value == "") {
                inputText.style.borderColor = "red"
            }
            // Add project for Librarian and DOM
            else {
                Librarian.addProject(String(inputText.value))
                UIhandler.addProjectToDOM(Librarian.getAllProjects())
                inputText.value = ""
                UIhandler.addProjectFormRemove()
                // Event Listeners for Projects
                for (let i = 0; i < projectItems.length; i++) {
                    projectItems[i].addEventListener("click",()=>{
                        tabLoader.loadProject(projectItems[i].innerText)
                    })
                }
            }
        })
    }
})

Librarian.addProject("Default Project")
tabLoader.loadProject("Default Project")
