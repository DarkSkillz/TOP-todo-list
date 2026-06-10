const tabLoader = (() => {
    const projectLabel = document.querySelector(".projectLabel")

    const loadProject = (name) => {
        const projectNameLabel = document.createElement("p")
        projectNameLabel.innerText = name
        projectNameLabel.className = "projectNameLabel"

        projectLabel.replaceChildren()
        projectLabel.append(projectNameLabel)
    }

    //todo Add function to load project tasks 
    //todo Add function to add tasks to project
    //todo Add function to delete project and return to default project
    return {loadProject}
})()

export default tabLoader