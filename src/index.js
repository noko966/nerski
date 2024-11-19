import { init, destroy, createPreview, destroyPreview } from "./main.js";

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
  if (event.key === "a" || event.key === "A") {
    // Trigger init function
    init();
  } else if (event.key === "q" || event.key === "Q") {
    // Trigger destroy function
    destroy();
  } else if (event.key === "p" || event.key === "P") {
    // Trigger destroy function
    createPreview();
  } else if (event.key === "o" || event.key === "O") {
    // Trigger destroy function
    destroyPreview();
  }
});
