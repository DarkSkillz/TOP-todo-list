const UIhandler = (() => {
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")

    //* addProjectForm
    const formProject = document.createElement("form")
    formProject.className = "addProjectForm"

    const inputText = document.createElement("input")
    inputText.setAttribute("type","text")
    inputText.setAttribute("placeholder","Project name")
    inputText.className = "addFormProjectInputText"

    const inputSubmitProject = document.createElement("input")
    inputSubmitProject.setAttribute("type","submit")
    inputSubmitProject.setAttribute("value","Confirm")
    inputSubmitProject.className = "inputSubmitProject"

    formProject.append(inputText,inputSubmitProject)

    const addProjectFormErr = document.createElement("p")
    addProjectFormErr.innerText = "Please enter a name!"

    const addProjectForm = () => {
        aside.append(formProject)
    }

    const addProjectFormRemove = () => {
        aside.removeChild(formProject)
    }

    //* taskCreationForm
    const formTask = document.createElement("form")
    formTask.className = "taskCreationForm"

    const cancelSVG = document.createElement("svg")
    cancelSVG.innerHTML = '<svg class="cancelSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
    // Name
    const taskNameInputDiv = document.createElement("div")
    taskNameInputDiv.className = "taskNameInputDiv"

    const labelName = document.createElement("label")
    labelName.setAttribute("for","name")
    labelName.innerText = "Name"

    const inputName = document.createElement("input")
    inputName.setAttribute("type","text")
    inputName.setAttribute("name","name")
    inputName.setAttribute("required","")
    inputName.id = "name"

    taskNameInputDiv.append(labelName,inputName)
    // Date
    const taskDateInputDiv = document.createElement("div")
    taskDateInputDiv.className = "taskDateInputDiv"

    const labelDate = document.createElement("label")
    labelDate.setAttribute("for","date")
    labelDate.innerText = "Date"

    const inputDate = document.createElement("input")
    inputDate.setAttribute("type","text")
    inputDate.setAttribute("name","date")
    inputDate.setAttribute("required","")
    inputDate.id = "date"

    taskDateInputDiv.append(labelDate, inputDate)
    // Priority
    const taskPriorityInputDiv = document.createElement("div")
    taskPriorityInputDiv.className = "taskPriorityInputDiv"

    const labelPriority = document.createElement("label")
    labelPriority.setAttribute("for","priority")
    labelPriority.innerText = "Priority"

    const selectElement = document.createElement("select")
    selectElement.setAttribute("name","priority")
    selectElement.id = "priority"

    const optionHigh = document.createElement("option")
    optionHigh.setAttribute("value","high")
    optionHigh.innerText = "High"
    const optionMed = document.createElement("option")
    optionMed.setAttribute("value","med")
    optionMed.innerText = "Medium"
    const optionLow = document.createElement("option")
    optionLow.setAttribute("value","low")
    optionLow.innerText = "Low"

    selectElement.append(optionHigh,optionMed,optionLow)

    taskPriorityInputDiv.append(labelPriority, selectElement)
    // Status
    const taskStatusInputDiv = document.createElement("div")
    taskStatusInputDiv.className = "taskStatusInputDiv"

    const labelStatusComp = document.createElement("label")
    labelStatusComp.setAttribute("for","completed")
    labelStatusComp.innerText = "Completed"

    const inputStatusComp = document.createElement("input")
    inputStatusComp.setAttribute("type","radio")
    inputStatusComp.setAttribute("name","status")
    inputStatusComp.setAttribute("value","completed")
    inputStatusComp.id = "completed"

    const labelStatusNotComp = document.createElement("label")
    labelStatusNotComp.setAttribute("for","not completed")
    labelStatusNotComp.innerText = "Not Completed"

    const inputStatusNotComp = document.createElement("input")
    inputStatusNotComp.setAttribute("type","radio")
    inputStatusNotComp.setAttribute("name","status")
    inputStatusNotComp.setAttribute("value","not completed")
    inputStatusNotComp.setAttribute("checked","")
    inputStatusNotComp.id = "notCompleted"

    taskStatusInputDiv.append(labelStatusComp, inputStatusComp, labelStatusNotComp, inputStatusNotComp)

    const inputSubmitTask = document.createElement("input")
    inputSubmitTask.setAttribute("type","submit")
    inputSubmitTask.setAttribute("value","Add Task")

    formTask.append(cancelSVG, taskNameInputDiv, taskDateInputDiv, taskPriorityInputDiv, taskStatusInputDiv, inputSubmitTask)

    const taskCreationForm = () => {
        main.append(formTask)
    }

    const taskCreationFormRemove = () => {
        main.removeChild(formTask)
    }

    //* deleteConfirmBox
    const deleteConfirmBoxDiv = document.createElement("div")
    deleteConfirmBoxDiv.className = "deleteConfirmBox"

    const confirmText = document.createElement("p")
    confirmText.innerText = 'Are you sure you want to delete "project/task" ?'

    const deleteConfirmOptionsDiv = document.createElement("div")
    deleteConfirmOptionsDiv.className = "deleteConfirmOptions"

    const deleteConfirmYesBtn = document.createElement("button")
    deleteConfirmYesBtn.className = "deleteConfirmYes"
    deleteConfirmYesBtn.innerText = "Yes"

    const deleteConfirmNoBtn = document.createElement("button")
    deleteConfirmNoBtn.className = "deleteConfirmNo"
    deleteConfirmNoBtn.innerText = "No"

    deleteConfirmOptionsDiv.append(deleteConfirmYesBtn, deleteConfirmNoBtn)

    deleteConfirmBoxDiv.append(confirmText, deleteConfirmOptionsDiv)

    const deleteConfirmBox = () => {
        main.append(deleteConfirmBoxDiv)
    }

    const deleteConfirmBoxRemove = () => {
        main.removeChild(deleteConfirmBoxDiv)
    }

    //* Adding projects to DOM
    const unorderedList = document.querySelector(".projectList")

    const addProjectToDOM = (projectArray) => {
        unorderedList.replaceChildren()
        for (let i = 0; i < projectArray.length; i++) {
            const listItem = document.createElement("li")
            listItem.innerText = projectArray[i].name
            unorderedList.append(listItem)
        }
    }

    //* Task Card
    const taskCardSection = document.querySelector(".taskCardSection")

    const addTaskCard = (name,parent,date,priority,status) => {
        const taskCardDiv = document.createElement("div")
        taskCardDiv.className = "taskCard"
    
        const taskCardUpper = document.createElement("div")
        taskCardUpper.className = "taskCardUpper"

        const taskName = document.createElement("p")
        taskName.className = "taskName"
        taskName.innerText = name

        const taskParent = document.createElement("p")
        taskParent.className = "taskParent"
        taskParent.innerText = parent

        const taskDate = document.createElement("p")
        taskDate.className = "taskDate"
        taskDate.innerText = date

        const taskPriority = document.createElement("p")
        taskPriority.className = "taskPriority"
        taskPriority.innerText = priority

        const taskStatus = document.createElement("p")
        taskStatus.className = "taskStatus"
        taskStatus.innerText = status

        const taskCardLower = document.createElement("div")
        taskCardLower.className = "taskCardLower"

        const taskEditBtn = document.createElement("button")
        taskEditBtn.className = "taskEdit"
        taskEditBtn.innerText = "Edit"

        const taskDeleteBtn = document.createElement("button")
        taskDeleteBtn.className = "taskDelete"
        taskDeleteBtn.innerText = "Delete"

        taskCardUpper.append(taskName,taskParent,taskDate,taskPriority,taskStatus)
        taskCardLower.append(taskEditBtn,taskDeleteBtn)
        taskCardDiv.append(taskCardUpper,taskCardLower)
        taskCardSection.append(taskCardDiv)

    }

    return {addProjectForm, addProjectFormRemove, taskCreationForm, taskCreationFormRemove, deleteConfirmBox, deleteConfirmBoxRemove, addProjectToDOM, addTaskCard}
})()

export default UIhandler