import "./styles.css"; 
import { Project, Task, Librarian } from "../classes.js";
import UIhandler from "../UIHandler.js";
import tabLoader from "../tabLoader.js"

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


const addTaskBtn = document.querySelector(".addTask")
// Make task creation form appear
addTaskBtn.addEventListener("click",()=>{
    const taskCreationForm = document.querySelector(".taskCreationForm")
    if (!document.contains(taskCreationForm)) {
        UIhandler.taskCreationForm()
    }
    // Cancels task creation
    document.querySelector(".cancelSVG").addEventListener("click", (e)=>{
        e.currentTarget.parentElement.parentElement.remove()
    })
    // Adds task to DOM
    document.querySelector(".inputSubmitTask").addEventListener("click",(e)=>{
        e.preventDefault()
        const parentProject = document.querySelector(".projectNameLabel").innerText
        const taskInputName = document.querySelector("#name")
        const taskInputDate = document.querySelector("#date")
        const taskInputPriority = document.querySelector("#priority").value
        const taskInputStatus = document.querySelector("input[name='status']:checked").value
        //! Change date validation to include DateFNS
        if (taskInputName.value == "" || taskInputDate.value == "") {
            taskInputName.style.borderColor = "red"
            taskInputDate.style.borderColor = "red"
        }
        else {
            UIhandler.addTaskCard(taskInputName.value,parentProject,taskInputDate.value,taskInputPriority,taskInputStatus)
            e.currentTarget.parentElement.remove()
            const AllProjects = Librarian.getAllProjects()
            AllProjects.forEach(element => {
            if (element.name == parentProject) {
                element.addTask(new Task(taskInputName.value,parentProject,taskInputDate.value,taskInputPriority,taskInputStatus))
                console.log(element); //! Debug only
            }
            });
            // Edit task
            document.querySelector(".taskEdit").addEventListener("click",(e) => {
                const parentForm = e.currentTarget.parentElement.parentElement
                AllProjects.forEach((i)=>{
                    if (i.name == parentProject) {
                        const targetProject = AllProjects.indexOf(i)
                    }
                })
                UIhandler.taskEditForm(taskInputName.value,taskInputDate.value)
                // Cancel Edit
                document.querySelector(".cancelSVG").addEventListener("click", (e)=>{
                    e.currentTarget.parentElement.parentElement.remove()
                })
                document.querySelector(".inputEditTask").addEventListener("click",(e)=>{
                    e.preventDefault()
                    parentForm.remove()

                    //todo Figure out how to make the edit work
                })
            })
            // Delete task
            document.querySelector(".taskDelete").addEventListener("click", ()=>{
                console.log("very gogo")
            })
        }
    })
})

Librarian.addProject("Default Project")
tabLoader.loadProject("Default Project")

//todo Add function to add tasks to project
//todo Add function to delete project and return to default project
//todo Add functionality to the rest of the buttons
//todo Change date validation to use DateFNS
//todo Add project name check for existing names
//todo Apply new style after finishing functionality