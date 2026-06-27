import { Project, Task, Librarian } from "./classes.js"
import { isToday, isThisWeek, isThisMonth, isThisYear, format } from "date-fns";

const UIhandler = (() => {
    // Globals
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")
    const taskCardSection = document.querySelector(".taskCardSection")
    const projectList = document.querySelector(".projectList")
    const projectLabel = document.querySelector(".projectLabel")
    const projectConfig = document.querySelector(".projectConfig")
    const projectArray = Librarian.getProjects()
    const projectNames = Librarian.getProjectNames()
    let currentProjectName = "All Projects"
    let currentProject = projectArray[0]
    let currentTask = undefined
    let currentTab = "AllTime"

    // Functions
    //* Project Form
    const addProjectForm = () => {
        // Elements
        const formProject = document.createElement("form")
        const inputText = document.createElement("input")
        const inputSubmitProject = document.createElement("input")
        const nameErrMsg = document.createElement("span")
        
        // Classes & IDs
        formProject.className = "addProjectForm"
        inputText.className = "addFormProjectInputText"
        inputSubmitProject.className = "inputSubmitProject"
        inputText.id = "projectInputText"
        nameErrMsg.className = "nameErrMsg"

        // Attributes
        inputText.setAttribute("type","text")
        inputText.setAttribute("placeholder","Project name")
        inputText.setAttribute("name","name")
        inputSubmitProject.setAttribute("type","submit")
        inputSubmitProject.setAttribute("value","Confirm")
        
        // Other
        nameErrMsg.innerText = "A project of this name already exists"

        // Appending
        formProject.append(inputText,inputSubmitProject)
        aside.append(formProject)
        
        // Event Listeners
        inputSubmitProject.addEventListener("click",(e)=>{
            e.preventDefault()
            const formData = new FormData(formProject)
            const data = Object.fromEntries(formData)
            if (projectNames.includes(data.name.trim().replace(/\s+/g, " "))) {
                formProject.append(nameErrMsg)
            }
            else if (data.name.trim() == "") {
                inputText.style.borderColor = "red"
            }
            else {
                const projectName = data.name.trim().replace(/\s+/g, " ")
                Librarian.addProject(projectName)
                projectsToDOM()
                removeParentElement(e.currentTarget)
            }
        })
    }

    //* Update Current Project
    const updateCurrentProject = () => {
        projectArray.forEach((project)=>{
            if (project.name == currentProjectName) {
                currentProject = projectArray[projectArray.indexOf(project)]
            }
        })
    }

    //* Update Current Task
    const updateCurrentTask = (taskName, taskParent) => {
        currentProject.tasks.forEach((task)=>{
            if (task.name == taskName && task.parent == taskParent) {
                currentTask = task
            }
        })
    }

    //* Parse Projects to DOM 
    const projectsToDOM = () => {
        projectList.replaceChildren()
        projectArray.forEach((project)=>{
            const projectDisplay = document.createElement("li")
            projectDisplay.className = "projectItem"
            projectDisplay.innerText = project.name
            projectList.append(projectDisplay)

            projectDisplay.addEventListener("click",()=>{
                projectLabel.replaceChildren()
                const currentProjectDisplay = document.createElement("p")
                currentProjectDisplay.className = "currentProject"
                projectLabel.append(currentProjectDisplay)
                currentProjectName = project.name
                currentProjectDisplay.innerText = currentProjectName
                updateCurrentProject()
                tasksToDOM()
            })
        })
    }

    //* Parse Tasks to DOM
    const tasksToDOM = () => {
        taskCardSection.replaceChildren()
        updateCurrentProject()
        currentProject.tasks.forEach((task)=>{
            addTaskCard(task.name, task.parent, task.date, task.priority, task.status)
        })

        const taskDates = Array.from(document.querySelectorAll(".taskDate"))
        taskDates.forEach((task)=>{
            const date = new Date(task.innerText)
            switch (currentTab) {
                case "Today":
                    if (!isToday(date)) {
                        removeGrandParentElement(task)
                    }
                    break;

                case "Week":
                    if (!isThisWeek(date)) {
                        removeGrandParentElement(task)
                    }
                    break;

                case "Month":
                    if (!isThisMonth(date)) {
                        removeGrandParentElement(task)
                    }
                    break;
                    
                case "Year":
                    if (!isThisYear(date)) {
                        removeGrandParentElement(task)
                    }
                    break;
            }
        })
    }

    //* Reset Current Project
    const resetCurrentProject = () => {
        currentProjectName = "All Projects"
        updateCurrentProject()
        document.querySelector(".currentProject").innerText = currentProjectName
    }

    //* Remove Parent Element
    const removeParentElement = (element) => {
        element.parentElement.remove()
    }

    //* Remove Grand Parent Element
    const removeGrandParentElement = (element) => {
        element.parentElement.parentElement.remove()
    }

    //* Task Creation Form
    const taskCreationForm = () => {
        // Creating Elements
        const formTask = document.createElement("form")
        const cancelSVG = document.createElement("span")
        const taskNameInputDiv = document.createElement("div")
        const labelName = document.createElement("label")
        const inputName = document.createElement("input")
        const taskDateInputDiv = document.createElement("div")
        const labelDate = document.createElement("label")
        const inputDate = document.createElement("input")
        const taskPriorityInputDiv = document.createElement("div")
        const labelPriority = document.createElement("label")
        const selectElement = document.createElement("select")
        const optionHigh = document.createElement("option")
        const optionMed = document.createElement("option")
        const optionLow = document.createElement("option")
        const taskStatusInputDiv = document.createElement("div")
        const labelStatusComp = document.createElement("label")
        const inputStatusComp = document.createElement("input")
        const labelStatusNotComp = document.createElement("label")
        const inputStatusNotComp = document.createElement("input")
        const inputSubmitTask = document.createElement("input")
        const nameErrMsg = document.createElement("span")
        const taskErrMsg = document.createElement("span")
        
        // Classes & IDs
        formTask.className = "taskCreationForm"
        taskNameInputDiv.className = "taskNameInputDiv"
        taskDateInputDiv.className = "taskDateInputDiv"
        taskPriorityInputDiv.className = "taskPriorityInputDiv"
        taskStatusInputDiv.className = "taskStatusInputDiv"
        inputSubmitTask.className = "inputSubmitTask"
        nameErrMsg.className = "nameErrMsg"
        inputName.id = "name"
        inputDate.id = "date"
        selectElement.id = "priority"
        inputStatusComp.id = "completed"
        inputStatusNotComp.id = "notCompleted"

        // Attributes
        inputName.setAttribute("type","text")
        inputName.setAttribute("name","name")
        inputName.setAttribute("required","")
        labelName.setAttribute("for","name")
        labelDate.setAttribute("for","date")
        inputDate.setAttribute("type","date")
        inputDate.setAttribute("name","date")
        labelPriority.setAttribute("for","priority")
        selectElement.setAttribute("name","priority")
        optionHigh.setAttribute("value","High")
        optionMed.setAttribute("value","Medium")
        optionLow.setAttribute("value","Low")
        labelStatusComp.setAttribute("for","completed")
        inputStatusComp.setAttribute("type","radio")
        inputStatusComp.setAttribute("name","status")
        inputStatusComp.setAttribute("value","Completed")
        labelStatusNotComp.setAttribute("for","not completed")
        inputStatusNotComp.setAttribute("type","radio")
        inputStatusNotComp.setAttribute("name","status")
        inputStatusNotComp.setAttribute("value","Not Completed")
        inputStatusNotComp.setAttribute("checked","")
        inputSubmitTask.setAttribute("type","submit")
        inputSubmitTask.setAttribute("value","Add Task")

        // Other
        cancelSVG.innerHTML = '<svg class="cancelSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Cancel</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
        labelName.innerText = "Name"
        labelDate.innerText = "Date"
        labelPriority.innerText = "Priority"
        optionHigh.innerText = "High"
        optionMed.innerText = "Medium"
        optionLow.innerText = "Low"
        labelStatusComp.innerText = "Completed"
        labelStatusNotComp.innerText = "Not Completed"
        nameErrMsg.innerText = "A task of this name already exists within this project!"
        taskErrMsg.innerText = "You Can't Add Tasks to This Project Directly!"

        // Appending
        taskNameInputDiv.append(labelName,inputName)
        taskDateInputDiv.append(labelDate, inputDate)
        selectElement.append(optionHigh,optionMed,optionLow)
        taskPriorityInputDiv.append(labelPriority, selectElement)
        taskStatusInputDiv.append(labelStatusComp, inputStatusComp, labelStatusNotComp, inputStatusNotComp)
        formTask.append(cancelSVG, taskNameInputDiv, taskDateInputDiv, taskPriorityInputDiv, taskStatusInputDiv, inputSubmitTask)
        main.append(formTask)

        // Event Listeners
        cancelSVG.addEventListener("click",(e)=>{
            removeParentElement(e.currentTarget)
        })

        if (currentProjectName == "All Projects") {
            formTask.replaceChildren()
            formTask.append(inputSubmitTask)
            inputSubmitTask.setAttribute("value","Go Back")
            formTask.append(taskErrMsg)
            inputSubmitTask.addEventListener("click",(e)=>{
                e.preventDefault()
                removeParentElement(e.currentTarget)
            })
            
        }
        else {
            inputSubmitTask.addEventListener("click",(e)=>{
                e.preventDefault()
                updateCurrentProject()
                const formData = new FormData(formTask)
                const data = Object.fromEntries(formData)
                if (data.name.trim() == "") {
                    inputName.style.borderColor = "red"
                }
                else if (data.date == "") {
                    inputDate.style.borderColor = "red"
                } 
                else if (currentProject.taskNames.includes(data.name.trim().replace(/\s+/g, " "))) {
                    formTask.append(nameErrMsg)
                }
                else {
                    const taskName = data.name.trim().replace(/\s+/g, " ")
                    currentProject.addTask(new Task(taskName, currentProjectName,data.date, data.priority, data.status))
                    updateCurrentTask(taskName, currentProjectName)
                    projectArray[0].addTask(currentTask)
                    tasksToDOM()
                    removeParentElement(e.currentTarget)
                }
            })
        }
    }

    //* Task Edit Form
    const taskEditForm = (task) => {
        // Elements
        const formTask = document.createElement("form")
        const cancelSVG = document.createElement("span")
        const taskNameInputDiv = document.createElement("div")
        const labelName = document.createElement("label")
        const inputName = document.createElement("input")
        const taskDateInputDiv = document.createElement("div")
        const labelDate = document.createElement("label")
        const inputDate = document.createElement("input")
        const taskPriorityInputDiv = document.createElement("div")
        const labelPriority = document.createElement("label")
        const selectElement = document.createElement("select")
        const optionHigh = document.createElement("option")
        const optionMed = document.createElement("option")
        const optionLow = document.createElement("option")
        const taskStatusInputDiv = document.createElement("div")
        const labelStatusComp = document.createElement("label")
        const inputStatusComp = document.createElement("input")
        const labelStatusNotComp = document.createElement("label")
        const inputStatusNotComp = document.createElement("input")
        const inputEditTask = document.createElement("input")
        const nameErrMsg = document.createElement("span")

        // Classes & IDs
        formTask.className = "taskEditForm"
        taskNameInputDiv.className = "taskNameInputDiv"
        taskDateInputDiv.className = "taskDateInputDiv"
        taskPriorityInputDiv.className = "taskPriorityInputDiv"
        taskStatusInputDiv.className = "taskStatusInputDiv"
        inputEditTask.className = "inputEditTask"
        nameErrMsg.className = "nameErrMsg"

        inputName.id = "name"
        inputDate.id = "date"
        selectElement.id = "priority"
        inputStatusComp.id = "completed"
        inputStatusNotComp.id = "notCompleted"

        // Other
        cancelSVG.innerHTML = '<svg class="cancelSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Cancel</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
        labelName.innerText = "Name"
        labelDate.innerText = "Date"
        labelPriority.innerText = "Priority"
        optionHigh.innerText = "High"
        optionMed.innerText = "Medium"
        optionLow.innerText = "Low"
        labelStatusComp.innerText = "Completed"
        labelStatusNotComp.innerText = "Not Completed"
        nameErrMsg.innerText = "A task of this name already exists within this project!"

        // Attributes
        labelName.setAttribute("for", "name")
        inputName.setAttribute("type", "text")
        inputName.setAttribute("name", "name")
        inputName.setAttribute("value", task.name)

        labelDate.setAttribute("for", "date")
        inputDate.setAttribute("type", "date")
        inputDate.setAttribute("name", "date")
        inputDate.setAttribute("value", task.date)

        labelPriority.setAttribute("for", "priority")
        selectElement.setAttribute("name", "priority")
        optionHigh.setAttribute("value", "High")
        optionMed.setAttribute("value", "Medium")
        optionLow.setAttribute("value", "Low")

        switch (task.priority) {
            case "High":
                optionHigh.setAttribute("selected","")
                break;
        
            case "Medium":
                optionMed.setAttribute("selected","")
                break

            case "Low":
                optionLow.setAttribute("selected","")
                break
        }

        labelStatusComp.setAttribute("for", "completed")
        inputStatusComp.setAttribute("type", "radio")
        inputStatusComp.setAttribute("name", "status")
        inputStatusComp.setAttribute("value", "Completed")

        labelStatusNotComp.setAttribute("for", "not completed")
        inputStatusNotComp.setAttribute("type", "radio")
        inputStatusNotComp.setAttribute("name", "status")
        inputStatusNotComp.setAttribute("value", "Not Completed")

        switch (task.status) {
            case "Completed":
                inputStatusComp.setAttribute("checked","")
                break;

            case "Not Completed":
                inputStatusNotComp.setAttribute("checked","")
                break
        }

        inputEditTask.setAttribute("type", "submit")
        inputEditTask.setAttribute("value", "Edit Task")

        // Appending
        selectElement.append(optionHigh, optionMed, optionLow)
        taskNameInputDiv.append(labelName, inputName)
        taskDateInputDiv.append(labelDate, inputDate)
        taskPriorityInputDiv.append(labelPriority, selectElement)
        taskStatusInputDiv.append(labelStatusComp, inputStatusComp, labelStatusNotComp, inputStatusNotComp)
        formTask.append(cancelSVG, taskNameInputDiv, taskDateInputDiv, taskPriorityInputDiv, taskStatusInputDiv, inputEditTask)
        main.append(formTask)

        // Event Listeners
        inputEditTask.addEventListener("click",(e)=>{
            e.preventDefault()
            updateCurrentProject()
            const formData = new FormData(formTask)
            const data = Object.fromEntries(formData)
            const taskName = data.name.trim().replace(/\s+/g, " ")
            if (data.name == "") {
                inputName.style.borderColor = "red"
            }
            else if (data.date == "") {
                inputDate.style.borderColor = "red"
            }
            else if (currentProject.taskNames.includes(taskName) && currentTask.name !== taskName) {
                formTask.append(nameErrMsg)
            }
            else {
                currentTask.name = taskName
                currentTask.date = data.date
                currentTask.priority = data.priority
                currentTask.status = data.status
                tasksToDOM()
                removeParentElement(e.currentTarget)
            }
        })
        
        cancelSVG.addEventListener("click",(e)=>{
            removeParentElement(e.currentTarget)
        })
}

    //* Confirmation Box (Delete)
    const deleteConfirmBox = (type, taskName, taskParent) => {
        // Elements
        const deleteConfirmBoxDiv = document.createElement("div")
        const confirmText = document.createElement("p")
        const deleteConfirmOptionsDiv = document.createElement("div")
        const deleteConfirmYesBtn = document.createElement("button")
        const deleteConfirmNoBtn = document.createElement("button")

        // Classes & IDs
        deleteConfirmBoxDiv.className = "deleteConfirmBox"
        deleteConfirmOptionsDiv.className = "deleteConfirmOptions"
        deleteConfirmYesBtn.className = "deleteConfirmYes"
        deleteConfirmNoBtn.className = "deleteConfirmNo"

        // Other
        confirmText.innerText = `Are you sure you want to delete this ${type} ?`
        deleteConfirmYesBtn.innerText = "Yes"
        deleteConfirmNoBtn.innerText = "No"

        // Appending
        deleteConfirmOptionsDiv.append(deleteConfirmYesBtn, deleteConfirmNoBtn)
        deleteConfirmBoxDiv.append(confirmText, deleteConfirmOptionsDiv)
        main.append(deleteConfirmBoxDiv)

        // Event Listeners
        switch (type) {
            case "project":
                if (currentProjectName == "All Projects") {
                    confirmText.innerText = "You Can't Delete This Project!"
                    deleteConfirmOptionsDiv.removeChild(deleteConfirmYesBtn)
                    deleteConfirmNoBtn.innerText = "Go Back"
                }
                else {
                    updateCurrentProject()
                    deleteConfirmYesBtn.addEventListener("click",(e)=>{
                        Librarian.deleteProject(currentProject)
                        projectArray[0].tasks.forEach((task)=>{
                            if (!projectNames.includes(task.parent)) {
                                console.log(projectNames)
                                projectArray[0].deleteTask(task)
                                //! WHY ISN'T THIS WORKING 
                            }
                        })
                        resetCurrentProject()
                        projectsToDOM()
                        tasksToDOM()
                        removeGrandParentElement(e.currentTarget)
                    })
                }
                break;

            case "task":
                deleteConfirmYesBtn.addEventListener("click",(e)=>{
                    updateCurrentTask(taskName, taskParent)
                    if (currentProjectName == "All Projects") {
                        projectArray.forEach((project)=>{
                            if (project.name == currentTask.parent) {
                                project.deleteTask(currentTask)
                            }
                        })
                    currentProject.deleteTask(currentTask)
                    } 
                    else { 
                        currentProject.deleteTask(currentTask)
                        projectArray[0].deleteTask(currentTask)
                    }
                    tasksToDOM()
                    removeGrandParentElement(e.currentTarget)
                })
                break
        }
        
        deleteConfirmNoBtn.addEventListener("click",(e)=>{
                removeGrandParentElement(e.currentTarget)
            })
}

    //* Edit Project Name
    const editProjectName = () => {
        // Elements
        const formProject = document.createElement("form")
        const inputText = document.createElement("input")
        const inputSubmitProject = document.createElement("input")
        const nameErrMsg = document.createElement("span")
        const projectErrMsg = document.createElement("span")
        
        // Classes & IDs
        formProject.className = "editProjectForm"
        inputText.className = "editFormProjectInputText"
        inputSubmitProject.className = "inputSubmitProject"
        inputText.id = "projectInputText"
        nameErrMsg.className = "nameErrMsg"
        projectErrMsg.className = "projectErrMsg"

        // Attributes
        inputText.setAttribute("type","text")
        inputText.setAttribute("placeholder","Project name")
        inputText.setAttribute("name","name")
        inputSubmitProject.setAttribute("type","submit")
        inputSubmitProject.setAttribute("value","Confirm")
        
        // Other
        nameErrMsg.innerText = "A project of this name already exists"
        projectErrMsg.innerText = "You Can't Change The Name of This Project!"

        // Appending
        formProject.append(inputText,inputSubmitProject)
        projectLabel.append(formProject)
        
        // Event Listeners
        if (currentProjectName !== "All Projects") {
            inputSubmitProject.addEventListener("click",(e)=>{
                e.preventDefault()
                updateCurrentProject()
                const formData = new FormData(formProject)
                const data = Object.fromEntries(formData)
                const projectName = data.name.trim().replace(/\s+/g, " ")
                if (projectNames.includes(data.name.trim().replace(/\s+/g, " ")) && currentProjectName !== projectName) {
                    formProject.append(nameErrMsg)
                }
                else if (data.name.trim() == "") {
                    inputText.style.borderColor = "red"
                }
                else {
                    currentProject.name = projectName
                    projectsToDOM()
                    projectLabel.replaceChildren()
                    const currentProjectDisplay = document.createElement("p")
                    currentProjectDisplay.className = "currentProject"
                    projectLabel.append(currentProjectDisplay)
                    currentProjectName = currentProject.name
                    currentProjectDisplay.innerText = currentProjectName
                    currentProject.tasks.forEach((task)=>{
                        task.parent = currentProjectName
                    })
                    tasksToDOM()
                    removeParentElement(e.currentTarget)
                }
            })
        }
        else {
            formProject.removeChild(inputText)
            formProject.append(projectErrMsg)
            inputSubmitProject.setAttribute("value","Go Back")

            inputSubmitProject.addEventListener("click",(e)=>{
                e.preventDefault()
                removeParentElement(e.currentTarget)
            })
        }
    }

    //* Task Card
    const addTaskCard = (name, parent, date, priority, status) => {
        // Elements
        const taskCardDiv = document.createElement("div")
        const taskCardUpper = document.createElement("div")
        const taskName = document.createElement("p")
        const taskParent = document.createElement("p")
        const taskDate = document.createElement("p")
        const taskPriority = document.createElement("p")
        const taskStatus = document.createElement("p")
        const taskCardLower = document.createElement("div")
        const taskEditBtn = document.createElement("button")
        const taskDeleteBtn = document.createElement("button")

        // Classes & IDs
        taskCardDiv.className = "taskCard"
        taskCardUpper.className = "taskCardUpper"
        taskName.className = "taskName"
        taskParent.className = "taskParent"
        taskDate.className = "taskDate"
        taskPriority.className = "taskPriority"
        taskStatus.className = "taskStatus"
        taskCardLower.className = "taskCardLower"
        taskEditBtn.className = "taskEdit"
        taskDeleteBtn.className = "taskDelete"

        // Other
        taskName.innerText = name
        taskParent.innerText = parent
        taskDate.innerText = date
        taskPriority.innerText = priority
        taskStatus.innerText = status
        taskEditBtn.innerText = "Edit"
        taskDeleteBtn.innerText = "Delete"

        // Appending
        taskCardUpper.append(taskName, taskParent, taskDate, taskPriority, taskStatus)
        taskCardLower.append(taskEditBtn, taskDeleteBtn)
        taskCardDiv.append(taskCardUpper, taskCardLower)
        taskCardSection.append(taskCardDiv)

        // Event Listeners
        taskEditBtn.addEventListener("click",(e)=>{
            if (!document.contains(document.querySelector(".taskEditForm"))) {
                updateCurrentTask(e.currentTarget.parentElement.parentElement.querySelector(".taskName").innerText, e.currentTarget.parentElement.parentElement.querySelector(".taskParent").innerText)
                taskEditForm(currentTask)
            }
        })

        taskDeleteBtn.addEventListener("click",(e)=>{
            if (!document.contains(document.querySelector(".deleteConfirmBox"))) {
                deleteConfirmBox("task",e.currentTarget.parentElement.parentElement.querySelector(".taskName").innerText,e.currentTarget.parentElement.parentElement.querySelector(".taskParent").innerText)
            }
        })
    }

    //* Time Load
    const timeLoad = (time) => {
        currentTab = time
        tasksToDOM()
    }

    return {addProjectForm, projectsToDOM, removeParentElement, removeGrandParentElement, taskCreationForm, taskEditForm, deleteConfirmBox, addTaskCard, editProjectName, timeLoad}
})()

export default UIhandler