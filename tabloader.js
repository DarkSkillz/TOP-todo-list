const tabLoader = (() => {
    const projectLabel = document.querySelector(".projectLabel")

    const loadProject = (name) => {
        const projectNameLabel = document.createElement("p")
        projectNameLabel.innerText = name
        projectNameLabel.className = "projectNameLabel"

        projectLabel.replaceChildren()
        projectLabel.append(projectNameLabel)
    }

    return {loadProject}
})()

export default tabLoader