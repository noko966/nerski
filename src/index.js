import init from "./main.js";

if (!window.init) {
  window.init = init;
} else {
  console.warn("window.init already exists!");
}

(function (global) {
  global.myApp = global.myApp || {};
  global.myApp.init = init;
})(window);

// Add event listener for keydown event to trigger init on pressing "s"
window.addEventListener("keydown", (event) => {
  if (event.key === "s" || event.key === "S") {
    // Check for "s" or "S" key
    init(); // Trigger the init function
  }
});
