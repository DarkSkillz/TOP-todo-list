const UIhandler = (() => {
    // Globals
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")
    const taskCardSection = document.querySelector(".taskCardSection")

    //* Project Form
    const addProjectForm = () => {
        // Elements
        const formProject = document.createElement("form")
        const inputText = document.createElement("input")
        const inputSubmitProject = document.createElement("input")
        const addProjectFormErr = document.createElement("p")
        
        // Classes & IDs
        formProject.className = "addProjectForm"
        inputText.className = "addFormProjectInputText"
        inputSubmitProject.className = "inputSubmitProject"

        // Attributes
        inputText.setAttribute("type","text")
        inputText.setAttribute("placeholder","Project name")
        inputSubmitProject.setAttribute("type","submit")
        inputSubmitProject.setAttribute("value","Confirm")
        
        // Other
        addProjectFormErr.innerText = "Please enter a name!"

        // Appending
        formProject.append(inputText,inputSubmitProject)
        aside.append(formProject)
        
        // Event Listeners
        inputSubmitProject.addEventListener("click",(e)=>{
            e.preventDefault()
            //todo Add project to librarian and DOM
            removeParentElement(e.currentTarget)
        })
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
        inputDate.setAttribute("type","text")
        inputDate.setAttribute("name","date")
        inputDate.setAttribute("required","")
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
    inputName.setAttribute("required", "")
    inputName.setAttribute("value", name)

    labelDate.setAttribute("for", "date")
    inputDate.setAttribute("type", "text")
    inputDate.setAttribute("name", "date")
    inputDate.setAttribute("required", "")
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
    const deleteConfirmBox = () => {
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
}
/*     //* Adding projects to DOM
    const unorderedList = document.querySelector(".projectList")

    const addProjectToDOM = (projectArray) => {
        unorderedList.replaceChildren()
        for (let i = 0; i < projectArray.length; i++) {
            const listItem = document.createElement("li")
            listItem.innerText = projectArray[i].name
            listItem.className = "projectItem"
            unorderedList.append(listItem)
        }
    } */

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
    }

    return {addProjectForm, removeParentElement, removeGrandParentElement, taskCreationForm, taskEditForm, deleteConfirmBox, addTaskCard}
})()

export default UIhandler