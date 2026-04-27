const elements = (() => {
    const projectTextInput = document.createElement("input")
    projectTextInput.id = "projectText"
    projectTextInput.type = "text"
    projectTextInput.placeholder = "Enter project name"
    projectTextInput.name = "projectName"

    const projectButton = document.createElement("button")
    projectButton.id = "projectBtn"
    projectButton.innerText = "Add Project"
    projectButton.id = "projectButton"
    
    const projectLabel = document.createElement("label")
    projectLabel.id = "projectLabel"
    projectLabel.for = "projectName"
    projectLabel.innerText = "Please enter a name"

    const projectInputFrame = document.createElement("div")
    projectInputFrame.id = "projectFrame"
    projectInputFrame.append(projectTextInput, projectButton)

    return {projectTextInput, projectButton, projectLabel, projectInputFrame}
})()

export default elements