// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ref, data } = require("./firebase/config");

window.addEventListener("DOMContentLoaded", () => {
  console.log("preload.js: DOMContentLoaded");
  console.log("preload.js: ref", ref);
  console.log(data);
});
