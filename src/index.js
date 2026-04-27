class Project {
    constructor(name) {
        this._name = name
        this._tasks = []
        this._complete = []
    }

    get name() {
        return this._name
    }

    get tasks() {
        return this._tasks
    }

    set name(name) {
        this._name = name
    }

    addTask(task) {
        this._tasks.push(task) 
    }

    addComplete(task) {
        this._complete.push(task)
    }

    removeTask(task) {
        this._tasks.splice(this._tasks.indexOf(task),1)
    }
}

class Task {
    constructor(name, dueDate, description, priority) {
        this._name = name
        this._dueDate = dueDate
        this._description = description
        this._priority = priority
    }

    get name() {
        return this._name
    }

    get dueDate() {
        return this._dueDate
    }

    get description() {
        return this._description
    }

    get priority() {
        return this._priority
    }

    set name(name) {
        this._name = name
    }

    set dueDate(date) {
        this._dueDate = date
    }

    set description(description) {
        this._description = description
    }

    set priority(priority) {
        this._priority = priority
    }
}

const index = (() => {
    const projects = []

    const addProject = (name) => {
        const newProject = new Project(name)
        projects.push(newProject)
        console.log(projects);
    }

    const removeProject = (name) => {
        projects.splice(projects.indexOf(name),1)
        console.log(projects);
    }

    return {addProject}
})()
export default index

/* Add array for projects to easily remove them */
/* Add function to handle tasks */