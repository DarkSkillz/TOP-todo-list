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

            projectHeadingAside.innerText = elements.projectTextInput.value
            projectHeadingMain.innerText = elements.projectTextInput.value
            index.addProject(elements.projectTextInput.value)
            elements.projectTextInput.value = ""

            if (elements.projectInputFrame.contains(elements.projectLabel)) {
                elements.projectInputFrame.removeChild(elements.projectLabel)
            }
            addToDOM.removeProjectUI()
            aside.append(projectHeadingAside)
            main.append(projectHeadingMain)
        }
    }

    return {addProjectUI, removeProjectUI ,addProject}
})()

const addProject = document.getElementById("addProject")

addProject.addEventListener("click", () => {
    addToDOM.addProjectUI()
    elements.projectButton.addEventListener("click", addToDOM.addProject)
})