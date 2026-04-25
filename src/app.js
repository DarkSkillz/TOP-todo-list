import "./styles.css"
import index from "./index.js"

const addToDOM = (() => {
    const main = document.querySelector("main")
    const aside = document.querySelector("aside")

    const projectTextInput = document.createElement("input")
    projectTextInput.type = "text"
    projectTextInput.placeholder = "Enter project name"
    projectTextInput.name = "projectName"

    const projectButton = document.createElement("button")
    projectButton.innerText = "Add Project"
    projectButton.id = "projectButton"
    
    const projectLabel = document.createElement("label")
    projectLabel.for = "projectName"
    projectLabel.innerText = "Please enter a name"

    const addProjectUI = () => {
        document.body.append(projectTextInput, projectButton)
    }

    const addProject = () => {
        if (projectTextInput.value == "") {
            document.body.append(projectLabel)
        }
        else {
            const projectHeadingAside = document.createElement("h1")
            const projectHeadingMain = document.createElement("h1")

            projectHeadingAside.innerText = projectTextInput.value
            projectHeadingMain.innerText = projectTextInput.value
            index.addProject(projectTextInput.value)
            projectTextInput.value = ""

            if (document.body.contains(projectLabel)) {
                document.body.removeChild(projectLabel)
            }

            aside.append(projectHeadingAside)
            main.append(projectHeadingMain)
        }
    }

    return {addProjectUI, addProject}
})()

const addProject = document.getElementById("addProject")

addProject.addEventListener("click", () => {
    addToDOM.addProjectUI()
    projectButton.addEventListener("click", addToDOM.addProject)
})