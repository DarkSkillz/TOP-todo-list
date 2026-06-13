export class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }

    addTask(task) {
        this.tasks.push(task)
    }

    deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1)
    }
}

export class Task {
    constructor(name, parent, date, priority, status) {
        this.name = name
        this.parent = parent
        this.date = date
        this.priority = priority
        this.status = status
    }
}

export class Librarian {
    static projectArray = []

    static getAllProjects() {
        return Librarian.projectArray
    }

    static addProject(projectName) {
        const newProject = new Project(projectName)
        Librarian.projectArray.push(newProject)
    }

    static deleteProject(project) {
        Librarian.projectArray.splice(Librarian.projectArray.indexOf(project), 1)
    }
}