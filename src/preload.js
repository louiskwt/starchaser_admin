// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { db } = require("./firebase/config");
const { turncate } = require("./utils/");

window.addEventListener("DOMContentLoaded", () => {
  const pendingTaskList = document.getElementById("pending-task-table");

  const taskRef = db.collection("tasks");
  const pendingTasks = taskRef.where("status", "==", "pending").get();

  pendingTasks.then((querySnapshot) => {
    if (!querySnapshot.empty) {
      querySnapshot.docs.map((doc) => {
        const taskElemet = document.createElement("tr");
        const task = doc.data();
        taskElemet.innerHTML = `
          <td>${turncate(task.name, 56)}</td>
          <td><a href='${task.url}' target="_blank" >Download</a></td>
          <td>${task.status}</td>
          <td><button class="action-btn" id="${doc.id}">Graded</button></td>\
        `;
        pendingTaskList.appendChild(taskElemet);
      });
    }
  });
});

document.addEventListener("click", (e) => {
  const target = e.target.closest(".action-btn");
  if (target) {
    const id = target.id;
    db.collection("tasks")
      .doc(id)
      .update({
        status: "graded",
      })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.reload();
      });
  }
});
