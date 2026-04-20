import "./styles.css"

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

const project = new Project(Project)

const task1 = new Task("todo1", "7pm", "work on code", 2)
const task2 = new Task("todo2", "10pm", "do anki cards", 3)
const task3 = new Task("todo3", "April 28th", "watch the tourney", 1)

project.addTask(task1)
project.addTask(task2)
project.addTask(task3)

console.log(project.tasks)
project.removeTask(task2)
project.removeTask(task3)

console.log(task1.name,task1.dueDate,task1.description,task1.priority);
