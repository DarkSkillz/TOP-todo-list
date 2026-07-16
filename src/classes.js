export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.taskNames = [];
    }

    addTask(task) {
        this.tasks.push(task);
        if (!this.taskNames.includes(task.name)) {
            this.taskNames.push(task.name);
        }
    }

    deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.taskNames.splice(this.taskNames.indexOf(task), 1);
    }
}

export class Task {
    constructor(name, parent, date, priority, status) {
        this.name = name;
        this.parent = parent;
        this.date = date;
        this.priority = priority;
        this.status = status;
    }
}

export class Librarian {
    static projectArray = [];
    static projectNames = [];

    static getProjects() {
        return Librarian.projectArray;
    }

    static getProjectNames() {
        return Librarian.projectNames;
    }

    static addProject(projectName) {
        const newProject = new Project(projectName);
        Librarian.projectArray.push(newProject);
        if (!Librarian.projectNames.includes(newProject.name)) {
            Librarian.projectNames.push(newProject.name);
        }
    }

    static deleteProject(project) {
        Librarian.projectArray.splice(
            Librarian.projectArray.indexOf(project),
            1,
        );
        Librarian.projectNames.splice(
            Librarian.projectNames.indexOf(project),
            1,
        );
    }
}
