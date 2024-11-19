import { init, destroy } from "./main.js";

// Check if init and destroy are already defined in the global scope
if (!window.init) {
  window.init = init;
} else {
  console.warn("window.init already exists!");
}

if (!window.destroy) {
  window.destroy = destroy;
} else {
  console.warn("window.destroy already exists!");
}

// Add event listener for keydown event to trigger init on pressing "s"
// and destroy SkinnerInstance on pressing "d"
window.addEventListener("keydown", (event) => {
  if (event.key === "s" || event.key === "S") {
    // Trigger init function
    init();
  } else if (event.key === "d" || event.key === "D") {
    // Trigger destroy function
    destroy();
  }
});
