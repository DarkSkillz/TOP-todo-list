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
    const addProject = (name) => {
        const newProject = new Project(name)
        console.log(newProject);
        
    }

    return {addProject}
})()
export default index