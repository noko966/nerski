var tinycolor = require("tinycolor2");
import SKPicker from "./modules/picker.js";
import Moveable from "./modules/moveable";

// Class to handle mouse move intersection with DOM elements and apply styles
class MouseIntersectStyler {
  constructor(selector, styleCallback, resetCallback, clickCallback, root) {
    this.styleCallback = styleCallback;
    this.resetCallback = resetCallback;
    this.clickCallback = clickCallback;
    this.currentElement = null;
    this.isStopped = false;
    this.isRunning = false; // Track if the styler is active
    this.mouseLeaveHandler = null;
    this.rules = [];
    this.UIRoot = null;
    this.root = root || document;
    this.selector = selector || "*";
    this.init(this.selector, this.root);
    this.pickers = [];
    this.state = {};
    this.activeSelectorId = null;
    this.skin = {};
    this.colors = {};
  }

  init() {
    const self = this;
    this.createUI();
  }

  toggleStyler() {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.boundMouseOver = (event) => this.onMouseOver(event);
      this.boundClick = (event) => this.onClick(event);

      this.editableElements = this.root.querySelectorAll("[data-sk]");

      this.editableElements.forEach((el) => {
        el.addEventListener("mouseenter", this.boundMouseOver, true);
      });

      this.editableElements.forEach((el) => {
        el.addEventListener("click", this.boundClick, true);
      });

      console.log("MouseIntersectStyler started");
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      this.editableElements = this.root.querySelectorAll("[data-sk]");
      this.editableElements.forEach((el) => {
        el.removeEventListener("mouseenter", this.boundMouseOver);
      });
      console.log("MouseIntersectStyler stopped");
    }
  }

  injectStyle(css) {
    const styleId = "sk_custom_styler_injected";

    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      this.injectedStyle = document.createElement("style");

      this.injectedStyle.id = styleId;
      if (this.root === document) {
        this.root.body.appendChild(this.injectedStyle);
      } else {
        this.root.appendChild(this.injectedStyle);
      }
    }

    this.injectedStyle.innerHTML = css;
  }

  generateHoverStyle(cn) {
    const colors = [
      "#FF637C",
      "#8144CD",
      "#7872E0",
      "#56A9E2",
      "#D2F58D",
      "#FFD76B",
      "#FF637C",
    ];

    const bandSize = 20;

    const stops = colors.map((color, i) => {
      const s1 = i * bandSize;
      const e1 = (i + 1) * bandSize;
      return `var(--dominantBg) ${s1}px, var(--dominantBg) ${e1}px, ${color} ${
        e1 + 1
      }px, ${color} ${e1 + 2}px`;
    });

    const gradientStops = stops.join(", ");

    const repeatingGradient = `repeating-linear-gradient(45deg, ${gradientStops})`;

    let css = `
@keyframes sk_custom_hover_anim {
  from{
    background-position: 0 0;
  }
  to{
    background-position: 50% 0;
  }
}


${cn}{
  background-image: ${repeatingGradient} !important;
  color: var(--dominantTxt) !important;
  background-size: 200% 200%;
  animation-duration: 10s;
  animation-direction: normal;
  animation-iteration-count: 88;
  animation-name: sk_custom_hover_anim;
  animation-timing-function: linear;
}
${cn}:nth-child(even){
  animation-direction: reverse;
}

${cn} > * {
    opacity: 0.8;
}
`;

    return css;
  }

  onMouseOver(event) {
    if (this.isStopped || !this.isRunning) return;

    if (this.isRunning) {
      event.preventDefault();
      event.stopPropagation();

      const path = event.composedPath();
      const hoveredElement = path.find(
        (el) => el.matches && el.matches("[data-sk]")
      );

      if (hoveredElement) {
        let target = hoveredElement;
        let uniqueClass = target.getAttribute("data-sk");
        let specificCn = this.generateCssPath(hoveredElement);
        let className = `${specificCn}[data-sk="${uniqueClass}"]`;
        let css = this.generateHoverStyle(className);
        this.injectStyle(css);

        const cleanup = () => {
          this.injectStyle("");
          target.removeEventListener("mouseleave", handleMouseOut);
        };

        const handleMouseOut = (mouseOutEvt) => {
          cleanup();
        };

        target.addEventListener("mouseleave", handleMouseOut);
      }
    }
  }

  onClick(event) {
    if (this.isStopped || !this.isRunning) return;

    if (this.isRunning) {
      event.preventDefault();
      event.stopPropagation();

      const path = event.composedPath();
      const clickedElement = path.find(
        (el) => el.matches && el.matches("[data-sk]")
      );

      if (clickedElement) {
        this.isStopped = true;
        this.clickCallback(clickedElement);

        // Show UI near the clicked element
        const bounds = clickedElement.getBoundingClientRect();
        this.injectStyle("");
        this.showUI(bounds.left, bounds.top, clickedElement);
      }
    }
  }

  modifyKey(group, name, value) {
    const selectedRuleState = this.skin[this.activeSelectorId];

    if (selectedRuleState) {
      // Update the rule and state
      selectedRuleState[group][name] = value;

      let css = this.createCss();
      this.setOrUpdateIframeCustomCss(css, this.root);
    }
  }

  createCss() {
    let css = "";
    console.log(this.root);

    let CSSVariableRuleStart = `
   
    :root{
    `;

    console.log(this.skin);

    for (const key in this.skin) {
      const _skin = this.skin[key];

      CSSVariableRuleStart += `
--SK_custom${_skin.varPrefix}Bg: ${_skin.background.main};`;

      css += `${key} * {
color: unset;
}`;
      css += `${key} {
background: var(--SK_custom${_skin.varPrefix}Bg);
}`;

      css += `${key} {
  padding-inline-start: ${_skin.padding.start}px;
  padding-inline-end: ${_skin.padding.end}px;
  padding-top: ${_skin.padding.top}px;
  padding-bottom: ${_skin.padding.bottom}px;
  }`;

      css += `${key} {
    border-top-left-radius: ${_skin.radius.tl};
    border-top-right-radius: ${_skin.radius.tr};
    border-bottom-right-radius: ${_skin.radius.br};
    border-bottom-left-radius: ${_skin.radius.bl};
    }`;

      for (const color in _skin.colors) {
        console.log(color);

        css += `${key} [data-sk-color="${color}"] {
      color: ${_skin.colors[color]};
      }`;
      }
    }

    const res = `
    ${CSSVariableRuleStart}
    }
    ${css}
    `;

    return res;
  }

  createKey(name, el) {
    this.skin[name] = {};
    const cs = this.getSelectorAffectedCssStyles(el);
    const bg = tinycolor(cs.background).toHexString();
    let uniqueClass = el.getAttribute("data-sk");
    const padding = this.parseProp(cs.padding);

    // Helper function to group elements by `data-sk-color`
    function getElementsWithColorAttr(rootEl) {
      if (!rootEl || !rootEl.hasAttribute("data-sk")) {
        return {};
      }

      const grouped = {};
      const stack = [rootEl];

      while (stack.length > 0) {
        const current = stack.pop();

        for (const child of current.children) {
          // Skip elements that have their own data-sk
          if (child.hasAttribute("data-sk")) {
            continue;
          }

          // Group by `data-sk-color`
          if (child.hasAttribute("data-sk-color")) {
            const color = child.getAttribute("data-sk-color");
            if (!grouped[color]) {
              grouped[color] = [];
            }
            grouped[color].push(child);
          }

          stack.push(child);
        }
      }

      return grouped;
    }

    // Set up your skin structure
    this.skin[name].colors = {};
    this.skin[name].background = { main: bg };
    this.skin[name].padding = {
      start: padding.top.value,
      end: padding.right.value,
      bottom: padding.bottom.value,
      left: padding.left.value,
    };
    this.skin[name].varPrefix = uniqueClass;
    this.skin[name].radius = {
      tl: cs.borderRadiusTL,
      tr: cs.borderRadiusTR,
      br: cs.borderRadiusBR,
      bl: cs.borderRadiusBL,
    };

    // Extract up to 3 unique color keys
    const colorElements = getElementsWithColorAttr(el);
    const colorKeys = Object.keys(colorElements); // e.g. ["red", "green", "blue", ...]

    // Initialize each txt key to an empty object first
    this.skin[name].colors.txt1 = {};
    this.skin[name].colors.txt2 = {};
    this.skin[name].colors.txt3 = {};

    // Map up to 3 unique colors to txt1, txt2, txt3
    const txtFields = ["txt1", "txt2", "txt3"];
    for (let i = 0; i < txtFields.length; i++) {
      // If there is a color for this index, assign it; otherwise, leave as is
      if (colorKeys[i] != null) {
        // You can decide how you want to store the color. For example:
        //   this.skin[name].colors[txtFields[i]] = colorKeys[i];
        // If you prefer including the array of elements, do something like:
        //   this.skin[name].colors[txtFields[i]] = {
        //     color: colorKeys[i],
        //     elements: colorElements[colorKeys[i]]
        //   };
        this.skin[name].colors[txtFields[i]] = colorKeys[i];
      }
    }
  }

  createControlRoot() {
    let root = document.createElement("div");
    root.className = "sk_widget_collapse_block";

    return root;
  }

  createControlHeader(label) {
    let el = document.createElement("div");
    el.className = "sk_widget_block_header";
    let txt = document.createElement("span");
    txt.className = "sk_txt";
    txt.innerText = label;
    let ic = document.createElement("i");
    ic.className = "sk_ico";
    ic.innerHTML = "";
    el.appendChild(ic);
    el.appendChild(txt);

    return el;
  }

  createControlContent() {
    let el = document.createElement("div");
    el.className = "sk_widget_block_content";
    return el;
  }

  createControl(label, variantCN) {
    let d = document.createElement("div");
    let s = document.createElement("span");
    s.innerText = label || "control name";
    let c = document.createElement("div");
    d.className = `sk_styler_control_row ${variantCN ? variantCN : ""}`;
    s.className = "sk_styler_control_row_label";
    c.className = "sk_styler_control_holder";

    d.appendChild(s);
    d.appendChild(c);
    return {
      element: d,
      inside: c,
    };
  }

  createUI() {
    let self = this;
    if (this.UIRoot) return; // Prevent duplicate UI creation
    const style = document.createElement("style");
    style.innerHTML = `
      .sk_ui_custom_change_root {
    --input_size: 28px;
    --inputsOverlay: #ffffff20;
    --inputsCta: #ffffffaa;
    --solid_size: 24px;
    position: fixed;
    width: 250px;
    height: auto;
    z-index: var(--sk_zind);
    top: 0px;
    transform: translate(0, 0);
    border: none;
    background: var(--sk_dominantGlass2);
    border: 1px solid var(--sk_dominantBg);
    flex-direction: column;
    align-items: stretch;
    padding: 6px;
    border-radius: 4px;
    display: flex;
    row-gap: 8px;
      }
    .sk_ui_custom_change_controls_wrapper{
        position: absolute;
    top: calc(100% + 16px);
    right: 0;
    background: var(--sk_dominantBg);
    width: 100px;
    border-radius: 4px;
    border: 1px solid var(--sk_dominantBg2);
    padding: 8px;
    }

      .sk_ui_custom_change_root.state-reveal {
        animation: appear 0.3s;
      }
        @keyframes appear {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
          .sk_styler_control_row {
    display: flex;
    align-items: center;
    column-gap: var(--controls-ui-gap);
    
}
    .sk_styler_control_row_label {
    flex-grow: 1;
    min-width: 1px;
    font-size: 10px;
    text-align: right;
}
    .sk_styler_control_row.variant_color{
        width: calc(50% - 5px);
    }

    .sk_styler_control_holder > .pickr {
    position: absolute;
}

.row{
    display: flex;
    align-items: center;
    width: 100%;
    column-gap: 4px;
}

.sk_block_separator_y{
    width: 1px;
    flex-shrink:0;
    height: 24px;
    background: var(--sk_dominantBg);
    flex-shrink: 0;

}

.sk_input {
    appearance: none;
    width: 50px;
    font-size: 11px;
    height: var(--input_size);
    font-weight: 500;
    background: var(--sk_dominantBg);
    color: var(--sk_dominantTxt2);
    border-radius: 4px;
    text-align: right;
    border: 0;
    border: 1px solid var(--sk_dominantShadow);
    outline: 0;
    padding: 0 6px;
}

.sk_btn {
    appearance: none;
    border: 0;
    border: 1px solid var(--sk_dominantBg3Hover);
    text-align: center;
    height: var(--input_size);
    text-decoration: none;
    background-color: var(--sk_dominantBg2);
    color: var(--sk_dominantTxt2);
    text-transform: capitalize;
    font-size: 12px;
    position: relative;
    font-weight: 500;
    padding: 0 8px;
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    box-shadow: 0px 0px 0px 1px var(--sk_dominantShadow);
}
    .sk_btn.variant_primary{
        width: 100%;
    background-color: var(--sk_accentBg);
    color: var(--sk_accentTxt);
    }



    /*********** Baseline, reset styles ***********/
input[type="range"].sk_control_padding {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100px;
  margin: 0;
  width: 100px;
  height: calc(100% + 24px);
}

/* Removes default focus */
input[type="range"].sk_control_padding:focus {
  outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"].sk_control_padding::-webkit-slider-runnable-track {
  background-color: var(--inputsOverlay);
  border-radius: 0px;
  height: 100%;
  border: 0;
}

/* slider thumb */
input[type="range"].sk_control_padding::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  margin-top: -6px; 
  background-color: var(--inputsCta);
  border-radius: 0px;
  height: calc(100% + 12px);
  width: 2px;
}

input[type="range"].sk_control_padding:focus::-webkit-slider-thumb {
  outline: 1px solid var(--inputsCta);
  outline-offset: 1px;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"].sk_control_padding::-moz-range-track {
  background-color: var(--inputsOverlay);
  border-radius: 0px;
  height: 100%;
  border: 0;
}

/* slider thumb */
input[type="range"].sk_control_padding::-moz-range-thumb {
  background-color: var(--inputsOverlay);
  border: none; /*Removes extra border that FF applies*/
  border-radius: 0px;
  height: 100%;
  width: 2px;
}

input[type="range"].sk_control_padding:focus::-moz-range-thumb{
  outline: 1px solid var(--inputsCta);
  outline-offset: 1px;
}

.sk_control_padding.variant_start{
position: absolute;
    top: 50%;
    bottom: 0;
    left: 0;
    transform: translateY(-50%);
}

.sk_control_padding.variant_end{
position: absolute;
top: 50%;
bottom: 0;
right: 0;
transform: translateY(-50%);
}
  .sk_flip{
  direction: rtl;}
   
  .sk_control_radius_root{
  --size: 40px;
  width: var(--size);
  height: var(--size);
    z-index: 10;
    position: absolute;
  }

  .sk_control_radius_root > .sk_control_radius{
      transform: translate(-50%, -50%) rotate(45deg);
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .sk_control_radius_root.variant_tl{
    top: 0;
    left: 0;
    transform: rotate(0deg);
  }


  .sk_control_radius_root.variant_tr{
    top: 0;
    right: 0;
    transform: rotate(90deg);
  }

    

  .sk_control_radius_root.variant_br{
    bottom: 0;
    right: 0;
    transform: rotate(180deg);

  }


  .sk_control_radius_root.variant_bl{
    bottom: 0;
    left: 0;
    transform: rotate(-90deg);
  }
  
    
  .sk_control_radius_indicator{
  background-color: var(--inputsOverlay);
  width: var(--radius);
  height: var(--radius);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    border-radius: 50%;
  }
  


      /*********** Baseline, reset styles ***********/
input[type="range"].sk_control_radius {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  height: 4px;
  margin: 0;
}

/* Removes default focus */
input[type="range"].sk_control_radius:focus {
  outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"].sk_control_radius::-webkit-slider-runnable-track {
  background-color: transparent;
  border-radius: 0px;
  height: 100%;
  border: 0;
}

/* slider thumb */
input[type="range"].sk_control_radius::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  margin-top: 0px; /* Centers thumb on the track */
  background-color: var(--inputsCta);
  border-radius: 50%;
  height: 100%;
  width: 4px;
}

input[type="range"].sk_control_radius:focus::-webkit-slider-thumb {
  outline: 1px solid var(--inputsCta);
  outline-offset: 1px;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"].sk_control_radius::-moz-range-track {
  background-color: transparent;
  border-radius: 0px;
  height: 100%;
  border: 0;
}

/* slider thumb */
input[type="range"].sk_control_radius::-moz-range-thumb {
  background-color: var(--inputsOverlay);
  border: none; /*Removes extra border that FF applies*/
  border-radius: 50%;
  height: 100%;
  width: 4px;
}

input[type="range"].sk_control_radius:focus::-moz-range-thumb{
  outline: 1px solid var(--inputsCta);
  outline-offset: 1px;
}

  
    
    `;
    const root = document.createElement("div");
    root.className = "sk_ui_custom_change_root";
    root.style.left = "50%";
    root.style.top = "50%";
    root.style.opacity = 0;
    root.style.pointerEvents = "none";

    const rootControls = document.createElement("div");
    rootControls.className = "sk_ui_custom_change_controls_wrapper";

    // Callback for color picker
    const handlePickerCallBack = (e) => {
      this.handlePicker(e, null, null, (color) => {
        this.modifyKey("background", "main", color);
        this.updateControl("background", "main", color);
      });
    };

    // Apply button
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "sk_widget_footer_row";

    this.hideUITrigger = document.createElement("button");
    this.hideUITrigger.className = "sk_btn variant_primary";
    this.hideUITrigger.addEventListener("click", (e) => self.hideUI());
    this.hideUITrigger.innerText = "apply";

    // Control wrappers for various properties
    let controlWrapperBg = this.createControl("background", "variant_color");

    // Padding input

    // Background picker
    this.BgPicker = this.createColorBox(
      "sk_picker_trigger",
      handlePickerCallBack
    );

    rootControls.appendChild(this.BgPicker);

    this.paddingRangeStart = document.createElement("input");
    this.paddingRangeStart.type = "range";
    this.paddingRangeStart.className = "sk_control_padding variant_start";

    this.paddingRangeStart.min = 0;
    this.paddingRangeStart.max = 100;

    this.paddingRangeStart.addEventListener("change", (e) => {
      this.modifyKey("padding", "start", e.target.value);
    });

    root.appendChild(this.paddingRangeStart);

    this.paddingRangeEnd = document.createElement("input");
    this.paddingRangeEnd.type = "range";
    this.paddingRangeEnd.className = "sk_control_padding variant_end sk_flip";

    this.paddingRangeEnd.min = 0;
    this.paddingRangeEnd.max = 100;

    this.paddingRangeEnd.addEventListener("change", (e) => {
      this.modifyKey("padding", "end", e.target.value);
    });

    root.appendChild(rootControls);
    root.appendChild(this.paddingRangeEnd);
    rootControls.appendChild(this.hideUITrigger);

    const rootBounds = root.getBoundingClientRect();

    const borderRadiusTL = this.createRadiusControl(root, "tl");
    const borderRadiusTR = this.createRadiusControl(root, "tr");
    const borderRadiusBR = this.createRadiusControl(root, "br");
    const borderRadiusBL = this.createRadiusControl(root, "bl");

    this.stylerControls = {};

    document.body.appendChild(style);
    document.body.appendChild(root);

    this.stylerControls.padding = {};
    this.stylerControls.padding.top = {};
    this.stylerControls.padding.end = this.paddingRangeEnd;
    this.stylerControls.padding.bottom = {};
    this.stylerControls.padding.start = this.paddingRangeStart;
    this.stylerControls.radius = {};
    this.stylerControls.background = {};
    this.stylerControls.radius.tl = borderRadiusTL.input;
    this.stylerControls.radius.tr = borderRadiusTR.input;
    this.stylerControls.radius.br = borderRadiusBR.input;
    this.stylerControls.radius.bl = borderRadiusBL.input;
    this.stylerControls.background.main = this.BgPicker;
    this.stylerControls.colors = {};

    this.UIRoot = root;
    this.UIRootControls = rootControls;
  }

  createRadiusControl(root, variant) {
    const radiusRoot = document.createElement("div");
    let variantCN = "tl";
    switch (variant) {
      case "tl":
        variantCN = "tl";
        break;
      case "tr":
        variantCN = "tr";
        break;
      case "br":
        variantCN = "br";
        break;
      case "bl":
        variantCN = "bl";
        break;

      default:
        break;
    }

    radiusRoot.className = `sk_control_radius_root variant_${variantCN}`;

    const radius = document.createElement("input");
    radius.type = "range";
    radius.className = "sk_control_radius";

    radius.addEventListener("input", (e) => {
      const radiusVal = e.target.value;
      radiusRoot.style.setProperty("--radius", `${radiusVal}px`);
      radiusRoot.style.setProperty("--width", `${radiusVal * 2}px`);
      this.modifyKey("radius", `${variant}`, `${radiusVal}px`);
    });

    const radiusIndicator = document.createElement("div");
    radiusIndicator.className = "sk_control_radius_indicator";

    radiusRoot.appendChild(radius);
    radiusRoot.appendChild(radiusIndicator);
    root.appendChild(radiusRoot);

    return {
      input: radius,
    };
  }

  createInputControl(callback, indicator) {
    const icons = {
      x: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M16.5,16.5v-13"/>
<path d="M3.5,3.5v13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`,
      y: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M3.5,16.5h13"/>
<path d="M16.5,3.5h-13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`,
      s: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M3.5,3.5v13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`,
      t: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M16.5,3.5h-13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`,
      e: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M16.5,16.5v-13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`,
      b: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M3.5,16.5h13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`,
    };
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "sk_input_control_group";
    const input = document.createElement("input");
    input.type = "number";
    input.className = "sk_input variant_quatro";
    input.addEventListener("change", (e) => callback(e));

    const i = document.createElement("i");
    i.className = "sk_input_control_icon";
    i.innerHTML = icons[indicator] || icons["x"];
    inputWrapper.appendChild(i);
    inputWrapper.appendChild(input);
    return {
      inputWrapperEl: inputWrapper,
      inputEl: input,
    };
  }

  createInputsGroupControl() {
    const _t = this;
    const cx = _t.createInputControl((e) => {
      _t.modifyKey(`padding-left`, e.target.value);
      _t.modifyKey(`padding-right`, e.target.value);
    }, "x");
    const cy = _t.createInputControl((e) => {
      _t.modifyKey(`padding-top`, e.target.value);
      _t.modifyKey(`padding-bottom`, e.target.value);
    }, "y");

    const cs = _t.createInputControl((e) => {
      _t.modifyKey(`padding-left`, e.target.value);
    }, "s");
    const ct = _t.createInputControl((e) => {
      _t.modifyKey(`padding-top`, e.target.value);
    }, "t");
    const ce = _t.createInputControl((e) => {
      _t.modifyKey(`padding-right`, e.target.value);
    }, "e");
    const cb = _t.createInputControl((e) => {
      _t.modifyKey(`padding-bottom`, e.target.value);
    }, "b");

    const controlWrapper1 = document.createElement("div");
    controlWrapper1.className = "sk_input_control_group_block";
    controlWrapper1.appendChild(cx.inputWrapperEl);
    controlWrapper1.appendChild(cy.inputWrapperEl);

    const controlWrapper2 = document.createElement("div");
    controlWrapper2.className = "sk_input_control_group_block";
    controlWrapper2.appendChild(cs.inputWrapperEl);
    controlWrapper2.appendChild(ct.inputWrapperEl);
    controlWrapper2.appendChild(ce.inputWrapperEl);
    controlWrapper2.appendChild(cb.inputWrapperEl);

    const controlsRoot = document.createElement("div");
    controlsRoot.appendChild(controlWrapper1);
    controlsRoot.appendChild(controlWrapper2);

    _t.stylerControls.padding = {};

    _t.stylerControls.padding.top = ct.inputEl;
    _t.stylerControls.padding.right = ce.inputEl;
    _t.stylerControls.padding.bottom = cb.inputEl;
    _t.stylerControls.padding.left = cs.inputEl;

    return controlsRoot;
  }

  createColorBox(className, callBack) {
    let div = document.createElement("div");
    div.className = className;

    // div.style.background = color;
    div.addEventListener("click", callBack);

    return div;
  }

  parsePropValue(valueStr) {
    // Extract numeric value
    const numericValue = parseFloat(valueStr);

    // Extract unit by removing the numeric part from the end
    // Anything after the number is considered the unit
    const unit = valueStr.replace(/[0-9.\-]+/, "").trim() || "px";

    return { value: numericValue, unit: unit };
  }

  parseProp(paddingStr) {
    // Split string by whitespace
    const parts = paddingStr.trim().split(/\s+/).filter(Boolean);

    // Parse each value and its unit
    const parsedValues = parts.map(this.parsePropValue);

    let top, right, bottom, left;

    switch (parsedValues.length) {
      case 1:
        // 1 value: top=right=bottom=left
        top = right = bottom = left = parsedValues[0];
        break;
      case 2:
        // 2 values: top=bottom = first value, right=left = second value
        top = bottom = parsedValues[0];
        right = left = parsedValues[1];
        break;
      case 3:
        // 3 values: top = first, left=right = second, bottom = third
        top = parsedValues[0];
        right = left = parsedValues[1];
        bottom = parsedValues[2];
        break;
      case 4:
        // 4 values: top, right, bottom, left
        [top, right, bottom, left] = parsedValues;
        break;
      default:
        // No values or more than 4 is invalid or not supported by CSS shorthand
        // Decide how to handle. For now, return defaults (0px).
        top = right = bottom = left = { value: 0, unit: "px" };
        break;
    }

    return { top, right, bottom, left };
  }

  extractPxValues(pxString) {
    // Split the string by spaces to handle multiple values
    let parts = pxString.trim().split(/\s+/);

    // Map each part, remove 'px' and convert to number
    let values = parts.map((part) => {
      return parseFloat(part.replace("px", ""));
    });

    return values;
  }

  getSelectorAffectedCssStyles(selector) {
    if (!selector) return;
    let computedStyles = getComputedStyle(selector);
    let styles = {
      background: computedStyles.background,
      text: computedStyles.color,
      padding: computedStyles.padding,
      borderRadiusTL: computedStyles.borderTopLeftRadius,
      borderRadiusTR: computedStyles.borderTopRightRadius,
      borderRadiusBR: computedStyles.borderBottomRightRadius,
      borderRadiusBL: computedStyles.borderBottomLeftRadius,
    };

    return styles;
  }

  showUI(x, y, currentElement) {
    const _t = this;
    if (!this.UIRoot) return;

    const elementStyles = this.getSelectorAffectedCssStyles(currentElement);
    const bounds = currentElement.getBoundingClientRect();
    const bg = elementStyles.background;
    const txt = elementStyles.text;
    const padding = this.parseProp(elementStyles.padding);

    this.stylerControls.background.main.style.background = bg;
    // this.stylerControls.color.style.background = txt;
    this.stylerControls.padding.top.value = padding.top.value;
    this.stylerControls.padding.end.value = padding.right.value;
    this.stylerControls.padding.bottom.value = padding.bottom.value;
    this.stylerControls.padding.start.value = padding.left.value;
    this.stylerControls.radius.tl.value = elementStyles.borderTopLeftRadius;
    this.stylerControls.radius.tr.value = elementStyles.borderTopRightRadius;
    this.stylerControls.radius.br.value = elementStyles.borderBottomRightRadius;
    this.stylerControls.radius.bl.value = elementStyles.borderBottomLeftRadius;

    // Get the window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get the UIRoot dimensions
    const uiWidth = this.UIRoot.offsetWidth || 300; // Default to a sensible width if not rendered yet
    const uiHeight = this.UIRoot.offsetHeight || 150; // Default to a sensible height if not rendered yet

    // Adjust x and y to ensure the UI fits within the window
    if (x + uiWidth > windowWidth) {
      x = windowWidth - uiWidth - 10; // Add some padding (e.g., 10px)
    }
    if (y + uiHeight > windowHeight) {
      y = windowHeight - uiHeight - 10; // Add some padding (e.g., 10px)
    }

    // Prevent negative positions
    x = Math.max(x, 10); // Minimum padding of 10px
    y = Math.max(y, 10);

    // Set the adjusted position
    const gap = 12;

    this.UIRoot.style.left = `${x - gap}px`;
    this.UIRoot.style.top = `${y - gap}px`;
    this.UIRoot.style.width = `${bounds.width + gap * 2}px`;
    this.UIRoot.style.height = `${bounds.height + gap * 2}px`;
    this.UIRoot.style.opacity = "1";
    this.UIRoot.style.pointerEvents = "";

    let uniqueClass = currentElement.getAttribute("data-sk");
    let specificCn = this.generateCssPath(currentElement);
    let selector = `${specificCn}[data-sk="${uniqueClass}"]`;

    this.activeSelectorId = selector;

    this.UIRoot.classList.add("state-reveal");
    let timeoutId = setTimeout(() => {
      this.UIRoot.classList.remove("state-reveal");
      timeoutId = null;
    }, 3000);


    const rootBounds = _t.UIRoot.getBoundingClientRect();


    colorElements.forEach((ce) => {
      let uniqueClass = ce.getAttribute("data-sk-color");
      const handlePickerCallBack = (e) => {
        _t.handlePicker(e, null, null, (color) => {
          _t.modifyKey("colors", uniqueClass, color);
          _t.updateControl("colors", uniqueClass, color);
        });
      };

      const picker = _t.createColorBox(
        "sk_picker_trigger",
        handlePickerCallBack
      );
      _t.stylerControls.colors[uniqueClass] = picker;

      const bounds = ce.getBoundingClientRect();

      picker.style.top = bounds.top - rootBounds.top + rootBounds.height + "px";
      picker.style.left = bounds.left - rootBounds.left + "px";
      picker.style.position = "absolute";

      _t.UIRoot.appendChild(picker);
    });

    this.createKey(selector, currentElement, colorElements);
  }

  hideUI() {
    if (this.UIRoot) {
      this.isStopped = false;
      this.UIRoot.style.opacity = "0";
      this.UIRoot.style.pointerEvents = "none";
    }
  }

  updateControl(group, control, value) {
    this.stylerControls[group][control].style.background = value;
  }

  setOrUpdateIframeCustomCss(css, target) {
    var styleId = "css-as-custom-stylesheet";
    var styleElement = document.getElementById(styleId);

    if (target instanceof ShadowRoot) {
      styleElement = target.querySelector(`#${styleId}`);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.setAttribute("id", styleId);
        target.appendChild(styleElement);
      }
    } else {
      // Otherwise, assume the target is `document`
      styleElement = document.getElementById(styleId);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.setAttribute("id", styleId);
        document.head.appendChild(styleElement);
      }
    }

    // Update the inner HTML of the style element with the new CSS
    styleElement.innerHTML = css;
  }

  applyStyles(element) {
    this.styleCallback(element);
    this.currentElement = element;
    this.mouseLeaveHandler = () => this.resetStyles();
    element.addEventListener("mouseleave", this.mouseLeaveHandler);
  }

  resetStyles() {
    if (this.currentElement) {
      this.resetCallback(this.currentElement);
      if (this.mouseLeaveHandler) {
        this.currentElement.removeEventListener(
          "mouseleave",
          this.mouseLeaveHandler
        );
        this.mouseLeaveHandler = null;
      }
      this.currentElement = null;
    }
  }

  isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0
    );
  }

  generateCssPath(element, options = {}) {
    const {
      forbiddenWords = ["align", "flex", "col", "grid"],
      includeTagNames = true,
      includeIds = true,
      includeDataAttributes = true,
      dataAttributePrefix = "data-",
    } = options;

    if (!(element instanceof Element)) {
      throw new Error("The provided argument is not a valid DOM Element.");
    }

    const path = [];
    let currentElement = element;
    let level = 0; // Level counter

    while (
      currentElement &&
      currentElement.nodeType === Node.ELEMENT_NODE &&
      level < 3
    ) {
      let selector = "";

      // Prefer ID if available and allowed
      if (includeIds && currentElement.id) {
        selector = `#${currentElement.id}`;
      } else {
        // Get all class names of the current element
        const classList = Array.from(currentElement.classList);

        // Filter out classes that end with a number or contain any forbidden words
        const filteredClasses = classList.filter((cls) => {
          if (/\d$/.test(cls)) return false;
          for (let word of forbiddenWords) {
            const regex = new RegExp(`\\b${word}\\b`, "i");
            if (regex.test(cls)) return false;
          }
          return true;
        });

        // Select the first suitable class
        if (filteredClasses.length > 0) {
          selector = `.${filteredClasses.join(".")}`;
        }

        // Optionally, include data attributes for specificity
        if (includeDataAttributes && !selector) {
          const dataAttrs = Array.from(currentElement.attributes).filter(
            (attr) => attr.name.startsWith(dataAttributePrefix)
          );
          if (dataAttrs.length > 0) {
            const firstDataAttr = dataAttrs[0];
            selector = `[${firstDataAttr.name}="${firstDataAttr.value}"]`;
          }
        }

        if (!selector && includeTagNames) {
          // Fallback to tag name (in lowercase)
          selector = currentElement.tagName.toLowerCase();

          // Optionally, add :nth-of-type to make the selector more specific
          const parent = currentElement.parentElement;
          if (parent) {
            const siblings = Array.from(parent.children).filter(
              (child) => child.tagName === currentElement.tagName
            );
            if (siblings.length > 1) {
              const index = siblings.indexOf(currentElement) + 1;
              selector += `:nth-of-type(${index})`;
            }
          }
        }
      }

      if (selector) {
        path.unshift(selector);
      }

      // Move up to the parent element
      currentElement = currentElement.parentElement;
      level++; // Increment level counter
    }

    return path.join(" > ");
  }

  handlePicker(event, color, type, onChangeCallback) {
    if (this.pickerInstance) {
      console.log("A picker is already open. Please close it first.");
      return;
    }

    // Extract the current color from your state
    const currentColor = color;

    const x = event.clientX;
    const y = event.clientY;

    const SKPickerInstance = new SKPicker(null, currentColor, type);
    SKPickerInstance.init();
    SKPickerInstance.show(x, y);

    this.pickerInstance = SKPickerInstance;

    SKPickerInstance.on("change", (color, source, instance) => {
      onChangeCallback(color);
    });

    SKPickerInstance.on("hide", (source, instance) => {
      instance.destroy();
      this.pickerInstance = null;
    });
  }

  handleGradientPicker(event, essence, onChangeCallback) {
    const _vd = this.verbalData(essence);
    const _t = this;
    if (self.pickerInstance) {
      console.log("A picker is already open. Please close it first.");
      return;
    }

    let x = event.clientX;
    let y = event.clientY;
    const gtadientState = _t.state[essence].Gradient;

    const SKPickerInstance = new SKPicker(
      null,
      gtadientState.stops[0],
      "gradient",
      {
        stops: gtadientState.stops,
        angle: gtadientState.angle,
        type: gtadientState.type,
      }
    );
    SKPickerInstance.init();

    SKPickerInstance.show(x, y);

    self.pickerInstance = SKPickerInstance;

    SKPickerInstance.on("gradientchange", (grad, source, instance) => {
      console.log("Picker color changed:", grad, "Source:", source);
      onChangeCallback(grad);
    });

    SKPickerInstance.on("hide", (source, instance) => {
      instance.destroy();
      self.pickerInstance = null;
    });
  }
}

export { MouseIntersectStyler };
