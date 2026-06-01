import "./styles.css"; 
import { Project, Task, Librarian } from "../classes.js";

const project0 = new Project("Project0")
const project1 = new Project("Project1")
const project2 = new Project("Project2")

Librarian.addProject(project0)
Librarian.addProject(project1)
Librarian.addProject(project2)
const projects = Librarian.getAllProjects()

projects[0].addTask(new Task("Task0","28th May 2026", "High","Not Completed", projects[0]._name))
projects[1].addTask(new Task("Task1","29th May 2026", "Medium","Completed", projects[1]._name))
projects[2].addTask(new Task("Task2","30th May 2026", "Low","Not Completed", projects[2]._name))

Librarian.deleteProject(project1)