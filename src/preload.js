// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { db } = require("./firebase/config");
const { turncate } = require("./utils/");

window.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-table");
  const pendingTaskList = document.getElementById("pending-task-table");

  const taskRef = db.collection("tasks");
  const pendingTasks = taskRef.where("status", "==", "pending").get();

  pendingTasks.then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const tasks = querySnapshot.docs.map((doc) => {
        const taskElemet = document.createElement("tr");
        const task = doc.data();
        taskElemet.innerHTML = `
          <td>${turncate(task.name, 20)}</td>
          <td><a href='${task.url}' target="_blank" >Download</a></td>
          <td>${task.status}</td>
        `;
        pendingTaskList.appendChild(taskElemet);
      });
    }
  });

  db.collection("tasks").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const taskElemet = document.createElement("tr");
      const task = doc.data();
      taskElemet.innerHTML = `
        <td>${turncate(task.name, 20)}</td>
        <td><a href='${task.url}' target="_blank" >Download</a></td>
        <td>${task.status}</td>
      `;
      taskList.appendChild(taskElemet);
    });
  });
});
