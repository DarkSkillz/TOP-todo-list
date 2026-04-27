import "./styles.css"
import index from "./index.js"
import elements from "./elements.js"

const addToDOM = (() => {
    const main = document.querySelector("main")
    const aside = document.querySelector("aside")

    const addProjectUI = () => {
        document.body.append(elements.projectInputFrame)
    }

    const removeProjectUI = () => {
        document.body.removeChild(elements.projectInputFrame)
    }

    const addProject = () => {
        if (elements.projectTextInput.value == "") {
            elements.projectInputFrame.append(elements.projectLabel)
        }
        else {
            const projectHeadingAside = document.createElement("h1")
            const projectHeadingMain = document.createElement("h1")

            const projectSettingsAside = document.createElement("svg")
            const projectSettingsMain = document.createElement("svg")

            const projectFrameAside = document.createElement("div")
            projectFrameAside.id = "projectFrameAside"

            const projectFrameMain = document.createElement("div")
            projectFrameMain.id = "projectFrameMain"

            projectFrameAside.append(projectHeadingAside, projectSettingsAside)
            projectFrameMain.append(projectHeadingMain, projectSettingsMain)

            projectSettingsAside.outerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-horizontal</title><path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" /></svg>'
            projectSettingsMain.outerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-horizontal</title><path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" /></svg>'

            projectHeadingAside.innerText = elements.projectTextInput.value
            projectHeadingMain.innerText = elements.projectTextInput.value
            index.addProject(elements.projectTextInput.value)
            elements.projectTextInput.value = ""

            if (elements.projectInputFrame.contains(elements.projectLabel)) {
                elements.projectInputFrame.removeChild(elements.projectLabel)
            }

            addToDOM.removeProjectUI()

            aside.append(projectFrameAside)
            main.append(projectFrameMain)

            projectSettingsAside.addEventListener("click", addToDOM.displayProjectSettings)
        }
    }

    const displayProjectSettings = () => {
        //todo Display the options for EDIT and DELETE 
    }

    const editProjectName = () => {
        //todo Edit project's name 
    }

    const removeProject = () => {
        //todo Remove project from DOM and Projects array 
    }

    return {addProjectUI, removeProjectUI ,addProject}
})()

const addProject = document.getElementById("addProject")

addProject.addEventListener("click", () => {
    addToDOM.addProjectUI()
    elements.projectButton.addEventListener("click", addToDOM.addProject)
})