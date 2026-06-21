import { Project, Task, Librarian } from "./classes.js"

const UIhandler = (() => {
    // Globals
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")
    const taskCardSection = document.querySelector(".taskCardSection")
    const projectList = document.querySelector(".projectList")
    const projectLabel = document.querySelector(".projectLabel")
    const projectArray = Librarian.getProjects()
    const projectNames = Librarian.getProjectNames()
    const projectCollection = document.getElementsByClassName("projectItem")
    const projectItems = Array.from(projectCollection)
    let currentProjectName = "Default Project"
    let currentProject = projectArray[0]
    let currentTask = undefined

    //* Project Form
    const addProjectForm = () => {
        // Elements
        const formProject = document.createElement("form")
        const inputText = document.createElement("input")
        const inputSubmitProject = document.createElement("input")
        const addProjectFormErr = document.createElement("p")
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
        inputSubmitProject.setAttribute("type","submit")
        inputSubmitProject.setAttribute("value","Confirm")
        
        // Other
        addProjectFormErr.innerText = "Please enter a name!"
        nameErrMsg.innerText = "A project of this name already exists"

        // Appending
        formProject.append(inputText,inputSubmitProject)
        aside.append(formProject)
        
        // Event Listeners
        inputSubmitProject.addEventListener("click",(e)=>{
            e.preventDefault()
            if (projectNames.includes(inputText.value.trim())) {
                formProject.append(nameErrMsg)
            }
            else if (inputText.value.trim() == "") {
                inputText.style.borderColor = "red"
            }
            else {
                Librarian.addProject(inputText.value)
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
            addTaskCard(task.name, currentProjectName, task.date, task.priority, task.status)
        })
    }

    //* Reset Current Project
    const resetCurrentProject = () => {
        currentProjectName = "Default Project"
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
        
        // Classes & IDs
        formTask.className = "taskCreationForm"
        taskNameInputDiv.className = "taskNameInputDiv"
        taskDateInputDiv.className = "taskDateInputDiv"
        taskPriorityInputDiv.className = "taskPriorityInputDiv"
        taskStatusInputDiv.className = "taskStatusInputDiv"
        inputSubmitTask.className = "inputSubmitTask"
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
        cancelSVG.innerHTML = '<svg class="cancelSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
        labelName.innerText = "Name"
        labelDate.innerText = "Date"
        labelPriority.innerText = "Priority"
        optionHigh.innerText = "High"
        optionMed.innerText = "Medium"
        optionLow.innerText = "Low"
        labelStatusComp.innerText = "Completed"
        labelStatusNotComp.innerText = "Not Completed"

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

        inputSubmitTask.addEventListener("click",(e)=>{
            e.preventDefault()
            const formData = new FormData(formTask)
            const data = Object.fromEntries(formData)
            if (data.name == "") {
                inputName.style.borderColor = "red"
            }
            else if (data.date == "") {
                inputDate.style.borderColor = "red"
            } else {
                updateCurrentProject()
                currentProject.addTask(new Task(data.name, currentProjectName,data.date, data.priority, data.status))
                tasksToDOM()
                removeParentElement(e.currentTarget)
            }
        })
    }

    //* Task Edit Form
    const taskEditForm = (name, date) => {
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

    // Classes & IDs
    formTask.className = "taskEditForm"
    taskNameInputDiv.className = "taskNameInputDiv"
    taskDateInputDiv.className = "taskDateInputDiv"
    taskPriorityInputDiv.className = "taskPriorityInputDiv"
    taskStatusInputDiv.className = "taskStatusInputDiv"
    inputEditTask.className = "inputEditTask"

    inputName.id = "name"
    inputDate.id = "date"
    selectElement.id = "priority"
    inputStatusComp.id = "completed"
    inputStatusNotComp.id = "notCompleted"

    // Other
    cancelSVG.innerHTML = '<svg class="cancelSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'

    labelName.innerText = "Name"
    labelDate.innerText = "Date"
    labelPriority.innerText = "Priority"
    optionHigh.innerText = "High"
    optionMed.innerText = "Medium"
    optionLow.innerText = "Low"
    labelStatusComp.innerText = "Completed"
    labelStatusNotComp.innerText = "Not Completed"

    // Attributes
    labelName.setAttribute("for", "name")
    inputName.setAttribute("type", "text")
    inputName.setAttribute("name", "name")
    inputName.setAttribute("value", name)

    labelDate.setAttribute("for", "date")
    inputDate.setAttribute("type", "date")
    inputDate.setAttribute("name", "date")
    inputDate.setAttribute("value", date)

    labelPriority.setAttribute("for", "priority")
    selectElement.setAttribute("name", "priority")
    optionHigh.setAttribute("value", "High")
    optionMed.setAttribute("value", "Medium")
    optionLow.setAttribute("value", "Low")

    labelStatusComp.setAttribute("for", "completed")
    inputStatusComp.setAttribute("type", "radio")
    inputStatusComp.setAttribute("name", "status")
    inputStatusComp.setAttribute("value", "Completed")

    labelStatusNotComp.setAttribute("for", "not completed")
    inputStatusNotComp.setAttribute("type", "radio")
    inputStatusNotComp.setAttribute("name", "status")
    inputStatusNotComp.setAttribute("value", "Not Completed")
    inputStatusNotComp.setAttribute("checked", "")

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
}

    //* Confirmation Box (Delete)
    const deleteConfirmBox = (type, taskName) => {
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
    confirmText.innerText = 'Are you sure you want to delete "project/task" ?'
    deleteConfirmYesBtn.innerText = "Yes"
    deleteConfirmNoBtn.innerText = "No"

    // Appending
    deleteConfirmOptionsDiv.append(deleteConfirmYesBtn, deleteConfirmNoBtn)
    deleteConfirmBoxDiv.append(confirmText, deleteConfirmOptionsDiv)
    main.append(deleteConfirmBoxDiv)

    // Event Listeners
    switch (type) {
        case "project":
            if (currentProjectName == "Default Project") {
                confirmText.innerText = "You Can't Delete The Default Project!"
                deleteConfirmOptionsDiv.removeChild(deleteConfirmYesBtn)
                deleteConfirmNoBtn.innerText = "Go Back"
            }
            else {
                deleteConfirmYesBtn.addEventListener("click",(e)=>{
                    Librarian.deleteProject(currentProject)
                    resetCurrentProject()
                    projectsToDOM()
                    tasksToDOM()
                    removeGrandParentElement(e.currentTarget)
                })
            }
            break;

        case "task":
            deleteConfirmYesBtn.addEventListener("click",(e)=>{
                currentProject.tasks.forEach((task)=>{
                    if (task.name == taskName) {
                        currentTask = task
                    }
                })
                currentProject.deleteTask(currentTask)
                tasksToDOM()
                removeGrandParentElement(e.currentTarget)
            })
            break
    }
    
    deleteConfirmNoBtn.addEventListener("click",(e)=>{
            removeGrandParentElement(e.currentTarget)
        })
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
        taskEditBtn.addEventListener("click",()=>{
            //todo Task Edit
        })

        taskDeleteBtn.addEventListener("click",(e)=>{
            deleteConfirmBox("task",e.currentTarget.parentElement.parentElement.querySelector(".taskName").innerText)
        })
    }

    return {addProjectForm, projectsToDOM, removeParentElement, removeGrandParentElement, taskCreationForm, taskEditForm, deleteConfirmBox, addTaskCard}
})()

export default UIhandler