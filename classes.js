export class Project {
    constructor(name) {
        this._name = name
        this._tasks = []
    }

    addTask(task) {
        this._tasks.push(task)
    }

    deleteTask(task) {
        this._tasks.splice(this._tasks.indexOf(task), 1)
    }
}

export class Task {
    constructor(name, date, priority, status, parent) {
        this._name = name
        this._date = date
        this._priority = priority
        this._status = status
        this._parent = parent
    }
}

export class Librarian {
    static projectArray = []

    static getAllProjects() {
        return Librarian.projectArray
    }

    static addProject(project) {
        Librarian.projectArray.push(project)
    }

    static deleteProject(project) {
        Librarian.projectArray.splice(Librarian.projectArray.indexOf(project), 1)
    }
}