// Get a reference to the specific 'sport-mobile' element you want to stop at
const rootElement = document.querySelector("sport-mobile");
const shadow = rootElement.shadowRoot;

function generateCssPath(element) {
  const path = [];
  let current = element;

  while (current) {
    // Check if we've reached the specific 'sport-mobile' element instance
    if (current === rootElement) {
      const selector = current.className
        ? `.${current.className.trim().split(/\s+/).join(".")}`
        : current.tagName.toLowerCase();
      path.unshift(selector);
      break;
    }

    if (current instanceof ShadowRoot) {
      current = current.host;
    } else if (current && current.tagName) {
      const selector = current.className
        ? `.${current.className.trim().split(/\s+/).join(".")}`
        : current.tagName.toLowerCase();
      path.unshift(selector);
      current = current.parentElement || current.getRootNode();
    } else {
      break;
    }
  }

  return path.join(" >\n");
}

// Disable all clicks globally
document.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
    e.preventDefault();
  },
  true
);

// Add a style element for our outline class
const styleEl = document.createElement("style");
styleEl.textContent = `
  .hover-outline {
    outline: 2px solid red !important;
  }
  `;

shadow.appendChild(styleEl);

let currentlyOutlinedElement = null;

// On mousemove inside the shadow, highlight the hovered element
shadow.addEventListener("mousemove", (e) => {
  // The first element in composedPath() is the direct target under the cursor
  const hoveredElement = e.composedPath()[0];

  if (hoveredElement && hoveredElement !== currentlyOutlinedElement) {
    // Remove outline from old element
    if (currentlyOutlinedElement) {
      currentlyOutlinedElement.classList.remove("hover-outline");
    }

    // Add outline to new element
    hoveredElement.classList.add("hover-outline");
    currentlyOutlinedElement = hoveredElement;
  }
});

// On mouseout, remove the outline if leaving the shadow root entirely
shadow.addEventListener("mouseout", (e) => {
  const related = e.relatedTarget;
  // If we're leaving the shadow root area (related target is null or outside shadow)
  if (!related || related.getRootNode() !== shadow) {
    if (currentlyOutlinedElement) {
      currentlyOutlinedElement.classList.remove("hover-outline");
      currentlyOutlinedElement = null;
    }
  }
});

// On keydown 'c', copy the currently hovered element’s CSS path
document.addEventListener("keydown", async (e) => {
  if (e.key.toLowerCase() === "c" && currentlyOutlinedElement) {
    const cssPath = generateCssPath(currentlyOutlinedElement);
    try {
      await navigator.clipboard.writeText(cssPath);
      console.log("Path copied to clipboard:\n" + cssPath);
    } catch (error) {
      console.error("Failed to copy path:", error);
    }
  }
});
