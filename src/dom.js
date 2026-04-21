const dom = (() => {
    const addProject = () => {
        const projectTextInput = document.createElement("input")
        projectTextInput.type = "text"
        projectTextInput.placeholder = "Enter project name"
        projectTextInput.name = "projectName"

        const projectButton = document.createElement("button")
        projectButton.innerText = "Add Project"
        
        const projectLabel = document.createElement("label")
        projectLabel.for = "projectName"
        projectLabel.innerText = "Please enter a name"

        document.body.append(projectTextInput, projectButton)

        const main = document.querySelector("main")
        const aside = document.querySelector("aside")
        projectButton.addEventListener("click", () => {
            if (projectTextInput.value == "") {
                document.body.append(projectLabel)
            }
            else {
                const projectHeading = document.createElement("h1")
                projectHeading.innerText = projectTextInput.value
                aside.append(projectHeading)
                main.append(projectHeading) // Why only work on one ???
            }
            })
    }


    return {addProject}
})()

export default dom