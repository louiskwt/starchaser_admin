// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { db } = require("./firebase/config");

window.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-table");

  db.collection("tasks").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      console.log("running");
      const taskElemet = document.createElement("tr");
      const task = doc.data();
      console.log(task);
      taskElemet.innerHTML = `
        <td>${task.name}</td>
        <td><a href='${task.url}' >Download</a></td>
        <td>${task.status}</td>
      `;
      taskList.appendChild(taskElemet);
    });
  });
});
