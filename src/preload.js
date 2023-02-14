// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { db } = require("./firebase/config");
const { turncate } = require("./utils/");

window.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-table");

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
