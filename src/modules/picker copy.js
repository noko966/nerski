export default class SKPicker {
  constructor(rootElement, currentColor) {
    this.rootElement = rootElement || document.body;
    this.root = null;
    this.canvas = null; // <div> container
    this.canvasEl = null; // actual <canvas>
    this.ctx = null;
    this.currentColor = currentColor || "#ffffff";
    this.colors = null;
    this.input = null;
    this.events = {};
    this.solids = [
      "#1a1a1a",
      "#2b2b2b",
      "#3c3c3c",
      "#4a4a4a",
      "#5b5b5b",
      "#E2E2E2",
      "#ff75c3",
      "#ffa647",
      "#ffe83f",
      "#9fff5b",
      "#70e2ff",
      "#cd93ff",
      "#09203f",
      "#092f2e",
      "#092f2e",
      "#092f2e",
      "#092f2e",
      "#092f2e",
      "#092f2e",
    ];

    this.gradients = [
      "linear-gradient(to bottom right,#accbee,#e7f0fd)",
      "linear-gradient(to bottom right,#d5d4d0,#d5d4d0,#eeeeec)",
      "linear-gradient(to bottom right,#000000,#434343)",
      "linear-gradient(to bottom right,#09203f,#537895)",
      "linear-gradient(to bottom right,#AC32E4,#7918F2,#4801FF)",
      "linear-gradient(to bottom right,#f953c6,#b91d73)",
      "linear-gradient(to bottom right,#ee0979,#ff6a00)",
      "linear-gradient(to bottom right,#F00000,#DC281E)",
      "linear-gradient(to bottom right,#00c6ff,#0072ff)",
      "linear-gradient(to bottom right,#4facfe,#00f2fe)",
      "linear-gradient(to bottom right,#0ba360,#3cba92)",
      "linear-gradient(to bottom right,#FDFC47,#24FE41)",
      "linear-gradient(to bottom right,#8a2be2,#0000cd,#228b22,#ccff00)",
      "linear-gradient(to bottom right,#40E0D0,#FF8C00,#FF0080)",
      "linear-gradient(to bottom right,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
      "linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    ];
  }

  createStyle() {
    const styleEl = document.createElement("style");
    const style = `
    .sk_picker_root{
    --input_size: 32px;
    --solid_size: 24px;
    position: fixed;
    width: 250px;
    height: auto;
    z-index: calc(var(--sk_zind) + 100);
    top: 0px;
    transform: translate(543px, 137px);
    border: none;
    background: var(--sk_dominantBg);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--sk_dominantBg2);}
    .sk_picker_input{
    appearance: none;
    height: var(--input_size);
    padding: 0 8px;
    outline: none;
    border: none;
    background: var(--sk_dominantBgHover);
    color: var(--sk_dominantTxt);
    width: 100%;
    flex-grow: 1;
    min-width: 1px;
    border-radius: 4px;
    border: 1px solid var(--sk_dominantBg2);
    }
    .sk_picker_eyedropper_trigger{
    height: var(--input_size);
    width: var(--input_size);
    outline: 0;
    appearance: none;
    border: 1px solid var(--sk_dominantBg2);
    background: var(--sk_dominantBgHover);
    border-radius: 4px;}
    .sk_picker_controls_row{
    display: flex;
    align-items: center;
    column-gap: 8px;
    margin-top: 16px;
    }
    .sk_picker_solid{
    height: var(--solid_size);
    width: var(--solid_size);
    border-radius: 4px;
    cursor: pointer;
    }
    .sk_picker_colors{
    overflow-y: auto;
    flex-wrap: wrap;
    display: flex;
    row-gap: 4px;
    column-gap: 4px;
    max-height: 80px;
    padding: 2px;
    background: var(--sk_dominantBgHover);
    border-radius: 4px;
    border: 1px solid var(--sk_dominantBg2);
    }
    .sk_picker_canvas{
    width: 100%;
    height: 100px;
    margin-bottom: 16px;
    background-color: var(--sk_dominantBg2);
    border-radius: 8px;
    }
    .sk_picker_scroll::-webkit-scrollbar {
        scrollbar-width: thin;
        width: 4px;
    }

    .sk_picker_scroll::-webkit-scrollbar-track {
    }

    .sk_picker_scroll::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: var(--sk_dominantBg);
    }
   
    `;
    styleEl.innerHTML = style;
    styleEl.id = "sk_picker_style_element";

    this.rootElement.appendChild(styleEl);
    return style;
  }

  // --- Event methods ---
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  trigger(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((cb) => cb(...args));
    }
  }

  show() {
    if (this.root) {
      this.updateControls();
      this.root.style.display = "block";
      this.trigger("show", this);
    }
  }

  hide() {
    if (this.root) {
      this.root.style.display = "none";
      this.trigger("hide", this);
    }
  }

  updateControls() {
    this.input.value = this.currentColor;
    this.input.style.background = this.currentColor;
  }

  // --- Set background & trigger change ---
  setBackground(bg, source = "swatch") {
    // Set input value
    this.input.value = bg;

    // Change the page background

    // Trigger "change" event
    this.trigger("change", bg, source, this);
  }

  drawChromaCanvas() {
    // Make sure we have a context and correct dimensions
    if (!this.ctx || !this.canvasEl) return;

    const { width, height } = this.canvasEl;

    // Create a horizontal gradient from Red → Green → Blue for demonstration
    const grad = this.ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, "#ff0000"); // red
    grad.addColorStop(0.5, "#00ff00"); // green
    grad.addColorStop(1, "#0000ff"); // blue

    // Fill the canvas
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, width, height);
  }

  createUI() {
    // 1. Create the picker’s root container
    this.root = document.createElement("div");
    this.root.className = "sk_picker_root";

    // 2. Create an optional canvas area (placeholder)
    this.canvas = document.createElement("div");
    this.canvas.className = "sk_picker_canvas";

    // Create the actual <canvas> element for 2D drawing
    this.canvasEl = document.createElement("canvas");
    this.canvasEl.width = 216; // match the root width
    this.canvasEl.height = 100; // same height as the .sk_picker_canvas
    this.ctx = this.canvasEl.getContext("2d");

    this.drawChromaCanvas();

    // Handle click on canvas to pick color
    this._canvasClickHandler = (e) => {
      const rect = this.canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Read pixel [r,g,b,a]
      const pixelData = this.ctx.getImageData(x, y, 1, 1).data;
      const [r, g, b] = pixelData;
      // Convert to hex
      const color = `#${this.toHex(r)}${this.toHex(g)}${this.toHex(b)}`;

      this.setBackground(color, "canvas");
    };
    this.canvasEl.addEventListener("click", this._canvasClickHandler);

    // Add the <canvas> into the canvas DIV
    this.canvas.appendChild(this.canvasEl);
    // 3. Create a container for color swatches
    this.colors = document.createElement("div");
    this.colors.className = "sk_picker_colors sk_picker_scroll";

    // We’ll store swatch listeners in an array so we can remove them later
    this._swatchHandlers = [];

    // 4. Loop through solids array to create each swatch
    this.solids.forEach((color) => {
      const swatch = document.createElement("div");
      swatch.className = "sk_picker_solid";
      swatch.style.background = color;

      // Create a click handler reference
      const swatchClickHandler = () => {
        this.setBackground(color, "swatch");
      };

      swatch.addEventListener("click", swatchClickHandler);

      // Store it so we can remove it in destroy()
      this._swatchHandlers.push({
        element: swatch,
        handler: swatchClickHandler,
      });

      this.colors.appendChild(swatch);
    });

    // 5. Create a row for input + eyedropper
    this.controls = document.createElement("div");
    this.controls.className = "sk_picker_controls_row";

    // 6. Create an input field
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.className = "sk_picker_input";

    // We'll store these input handlers as properties
    const applyColorIfValid = () => {
      let val = this.input.value.trim();

      // Regex to match optional '#' then exactly 3 or 6 hex digits
      // e.g., #FFF, FFF, #FFFFFF, or FFFFFF
      const pattern = /^#?([\da-fA-F]{3}|[\da-fA-F]{6})$/;

      if (pattern.test(val)) {
        // Remove a leading '#' if present
        val = val.replace(/^#/, "");

        // If it's a 3-digit hex (e.g. "FFF"), expand to 6-digit ("FFFFFF")
        if (val.length === 3) {
          val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
        }

        // Now prepend '#'
        const color = "#" + val;

        // Update the picker’s color (and fire "change" if you do so in setBackground)
        this.setBackground(color, "input");
      }
      // else: do nothing on invalid color
    };

    // Create references for our blur and keydown handlers
    this._inputBlurHandler = applyColorIfValid;
    this._inputKeydownHandler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // stop form submission if in a form
        applyColorIfValid();
        // optionally: this.input.blur();
      }
    };

    // Add the listeners
    this.input.addEventListener("blur", this._inputBlurHandler);
    this.input.addEventListener("keydown", this._inputKeydownHandler);

    // 7. Create an eyedropper button (optional)
    this.eyedropperTrigger = document.createElement("button");
    this.eyedropperTrigger.className = "sk_picker_eyedropper_trigger";
    this.eyedropperTrigger.innerText = "🎨";

    // If you have an eyedropper handler, store it similarly
    // e.g.:
    // EyeDropper logic
    this._eyedropperHandler = () => {
      if ("EyeDropper" in window) {
        const ed = new EyeDropper();
        ed.open()
          .then((colorResult) => {
            if (colorResult && colorResult.sRGBHex) {
              // Use the color from EyeDropper
              this.setBackground(colorResult.sRGBHex, "eyedropper");
            }
          })
          .catch((error) => {
            console.error("Error using EyeDropper:", error);
          });
      } else {
        console.error("EyeDropper API is not supported in this browser.");
      }
    };
    // Attach the click event
    this.eyedropperTrigger.addEventListener("click", this._eyedropperHandler);

    // 8. Append all elements to their containers
    this.root.appendChild(this.canvas); // Canvas goes into the root
    this.root.appendChild(this.colors); // Swatches container
    this.controls.appendChild(this.input); // Input goes into controls
    this.controls.appendChild(this.eyedropperTrigger);
    this.root.appendChild(this.controls); // Controls row goes into root

    // Finally, attach the entire picker to the designated root element
    this.rootElement.appendChild(this.root);

    // 9. Return the root, in case needed
    return this.root;
  }

  createDiv(cn) {
    const el = document.createElement("div");
    el.className = cn || "sk_picker_default_el";
    return el;
  }

  init() {
    this.createUI();
    this.createStyle();
  }

  destroy() {
    // 1. Remove swatch listeners
    if (this._swatchHandlers && this._swatchHandlers.length) {
      this._swatchHandlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      this._swatchHandlers = [];
    }

    // 2. Remove input listeners if they exist
    if (this.input && this._inputBlurHandler) {
      this.input.removeEventListener("blur", this._inputBlurHandler);
    }
    if (this.input && this._inputKeydownHandler) {
      this.input.removeEventListener("keydown", this._inputKeydownHandler);
    }

    // 3. Remove eyedropper listener if present
    if (this.eyedropperTrigger && this._eyedropperHandler) {
      this.eyedropperTrigger.removeEventListener(
        "click",
        this._eyedropperHandler
      );
    }

    // 4. Remove canvas click handler
    if (this.canvasEl && this._canvasClickHandler) {
      this.canvasEl.removeEventListener("click", this._canvasClickHandler);
    }

    // 4. Remove the root from the DOM
    if (this.root) {
      this.root.remove();
      this.root = null;
    }

    // 5. Remove the style element if you appended one with a known ID
    const styleEl = document.getElementById("sk_picker_style_element");
    if (styleEl) {
      styleEl.remove();
    }

    // 6. Clear out other references
    // 7. Clear references
    this.canvas = null;
    this.canvasEl = null;
    this.colors = null;
    this.input = null;
    this.controls = null;
    this.eyedropperTrigger = null;

    // 7. Clear event callback arrays
    this.events = {};
  }

  toHex(num) {
    const hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
}
