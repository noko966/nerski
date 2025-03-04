var tinycolor = require("tinycolor2");
import SKPicker from "./modules/picker.js";

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
  }

  init() {
    const self = this;
    this.createUI();
    // this.boundMouseMove = (event) => self.onMouseMove(event, self.selector);
    // this.boundClick = (event) => self.oonClick(event);
    // this.root.addEventListener("mousemove", self.boundMouseMove);
    // this.root.addEventListener("click", self.boundClick, true);
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

      // this.root.addEventListener("mousemove", this.boundMouseMove, true);
      // this.root.addEventListener("click", this.boundClick, true);

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

    // We'll use 10px for each color band
    const bandSize = 20;

    // Build each color stop pair: "color Xpx, color Ypx"
    const stops = colors.map((color, i) => {
      const s1 = i * bandSize;
      const e1 = (i + 1) * bandSize;
      return `var(--dominantBg) ${s1}px, var(--dominantBg) ${e1}px, ${color} ${e1 + 1
        }px, ${color} ${e1 + 2}px`;
    });

    // Join all stops into a comma-separated list
    const gradientStops = stops.join(", ");

    // Finally, wrap in a repeating-linear-gradient with a 45deg angle
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

      // Use composedPath to find if any element in the path matches the selector
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

        // Define handler to clean up on click or mouseout
        const cleanup = () => {
          this.injectStyle(""); // Implement this method to remove the injected CSS
          target.removeEventListener("mouseleave", handleMouseOut);
        };

        // Handler for mouseout event
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
      // Prevent default actions and stop propagation
      event.preventDefault();
      event.stopPropagation();

      // Use composedPath to find if any element in the path matches the selector
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

  modifyKey(name, value) {
    const selectedRuleState = this.skin[this.activeSelectorId];

    if (selectedRuleState) {
      // Update the rule and state
      selectedRuleState[name] = value;

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

    for (const key in this.skin) {
      const _skin = this.skin[key];

      CSSVariableRuleStart += `
--SK_custom${_skin.varPrefix}Bg: ${_skin.backgroundColor};
--SK_custom${_skin.varPrefix}Txt:${_skin.color};`;

      css += `${key} * {
color: unset;
}`;
      css += `${key} {
background: var(--SK_custom${_skin.varPrefix}Bg);
color: var(--SK_custom${_skin.varPrefix}Txt);
}
`;
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
    const txt = tinycolor(cs.text).toHexString();
    let uniqueClass = el.getAttribute("data-sk");
    const padding = this.parseProp(cs.padding);

    this.skin[name]["backgroundColor"] = bg;
    this.skin[name]["color"] = txt;
    this.skin[name]["padding-top"] = padding.top.value;
    this.skin[name]["padding-right"] = padding.right.value;
    this.skin[name]["padding-bottom"] = padding.bottom.value;
    this.skin[name]["padding-left"] = padding.left.value;

    this.skin[name]["varPrefix"] = uniqueClass;

    this.skin[name]["borderRadius"] = cs.borderRadius;
  }

  createCSSBasedOnTree(tree) {
    const rootEl = tree[0];
    // const repeated = rootEl.cssSelector.repeat(2);
    const repeated = rootEl.cssSelector;
    const _skin = {
      bg: "#1a1a1a",
      txt: "#fff",
      acc: "#ffb700",
    };

    let CSSVariableRuleStart = `
    ${repeated} *{
      color: unset;
      background: unset;
      border: unset;
    }
    ${repeated} {
      background: ${tinycolor(_skin.bg).toHexString()};
      color: ${tinycolor(_skin.txt).toHexString()};
    `;

    let css = ``;

    const usedSelectors = new Set();

    tree.forEach((t) => {
      const { cssSelector, level, ind, dataSk } = t;
      const lvl = 4 - level;

      // If we've seen this cssSelector before, skip it
      if (usedSelectors.has(cssSelector)) {
        return;
      }
      usedSelectors.add(cssSelector);

      // Build a single unique selector
      const selector = `${cssSelector}`;

      CSSVariableRuleStart += `
        --${dataSk}Bg: ${tinycolor(_skin.bg)
          .lighten(level * 2 + ind * 1)
          .setAlpha(0.1 + level * 0.01)
          .toRgbString()};
        --${dataSk}Txt: ${tinycolor(_skin.txt).toHexString()};
        --${dataSk}Accent: ${tinycolor(_skin.acc)
          .setAlpha(0.1 + level * 0.01)
          .toRgbString()};
          
      `;

      // Append CSS rule
      css += `${repeated} ${selector} {
      background: var(--${dataSk}Bg);
      color: var(--${dataSk}Txt);
      backdrop-filter: blur(10px);
      border-radius: ${Math.abs(lvl + 2)}px;
      padding: ${Math.abs(lvl * 4)}px;
    }\n
    ${repeated} ${selector} [data-sk-text="accent"] {
      color: var(--${dataSk}Accent);
    }
    `;
    });

    const res = `
    ${CSSVariableRuleStart}
    }
    ${css}
    `;

    this.setOrUpdateIframeCustomCss(res);
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
    --solid_size: 24px;
    position: fixed;
    width: 250px;
    height: auto;
    z-index: var(--sk_zind);
    top: 0px;
    transform: translate(0, 0);
    border: none;
    background: var(--sk_dominantBgHover);
    border: 1px solid var(--sk_dominantBg);
    flex-direction: column;
    align-items: stretch;
    padding: 6px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
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
    border-radius: 2px;
    text-align: right;
    border: 0;
    border: 1px solid var(--sk_dominantBg3);
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
   
    
    `;
    const root = document.createElement("div");
    root.className = "sk_ui_custom_change_root";
    root.style.left = "50%";
    root.style.top = "50%";
    root.style.opacity = 0;
    root.style.pointerEvents = "none";

    // Callback for color picker
    const handlePickerCallBack = (e) => {
      this.handlePicker(e, null, null, (color) => {
        this.modifyKey("backgroundColor", color);
        this.updateControl("backgroundColor", color);
      });
    };

    // **New** callback for Text Color
    const handleTextColorPickerCallBack = (e) => {
      this.handlePicker(e, null, null, (color) => {
        this.modifyKey("color", color);
        this.updateControl("color", color);
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
    let controlWrapperColor = this.createControl("text", "variant_color");

    // Padding input
    let padInputVariants = ["top", "right", "left", "bottom"];
    let paddingInputs = {};
    padInputVariants.forEach((v) => {
      paddingInputs[v] = document.createElement("input");
      paddingInputs[v].className = "sk_input";
      paddingInputs[v].type = "number";
      paddingInputs[v].addEventListener("change", (e) => {
        self.modifyKey(`padding-${v}`, e.target.value);
      });
    });

    // Background picker
    this.BgPicker = this.createColorBox(
      "sk_picker_trigger",
      handlePickerCallBack
    );

    // **New** text color picker
    this.TextColorPicker = this.createColorBox(
      "sk_picker_trigger",
      handleTextColorPickerCallBack
    );

    // Border-radius input
    const borderRadiusInput = document.createElement("input");
    borderRadiusInput.type = "number";
    borderRadiusInput.className = "sk_input";
    borderRadiusInput.placeholder = "Border Radius (px)";
    borderRadiusInput.addEventListener("change", (e) => {
      self.modifyKey("borderRadius", e.target.value + "px");
    });

    controlWrapperBg.inside.appendChild(this.BgPicker);
    controlWrapperColor.inside.appendChild(this.TextColorPicker);

    const colorBlock = this.createControlRoot();
    const colorBlockHeader = this.createControlHeader("Color");
    const colorBlockContent = this.createControlContent();

    const paddingBlock = this.createControlRoot();
    const paddingBlockHeader = this.createControlHeader("Padding");
    const paddingBlockContent = this.createControlContent();

    const radiusBlock = this.createControlRoot();
    const radiusBlockHeader = this.createControlHeader("Radius");
    const radiusBlockContent = this.createControlContent();

    colorBlock.appendChild(colorBlockHeader);
    colorBlock.appendChild(colorBlockContent);
    const pickersElWrapper = document.createElement("div");
    pickersElWrapper.className = "row";
    const separatorEl = document.createElement("div");
    separatorEl.className = "sk_block_separator_y";
    colorBlockContent.appendChild(pickersElWrapper);
    pickersElWrapper.appendChild(controlWrapperBg.element);
    pickersElWrapper.appendChild(separatorEl);
    pickersElWrapper.appendChild(controlWrapperColor.element);


    const padControlGroup = this.createUnputsGroupControl();

    paddingBlockContent.appendChild(padControlGroup);

    paddingBlock.appendChild(paddingBlockHeader);
    paddingBlock.appendChild(paddingBlockContent);
    // paddingBlockContent.appendChild(paddingInputs.top);
    // paddingBlockContent.appendChild(paddingInputs.right);
    // paddingBlockContent.appendChild(paddingInputs.bottom);
    // paddingBlockContent.appendChild(paddingInputs.left);

    radiusBlock.appendChild(radiusBlockHeader);
    radiusBlock.appendChild(radiusBlockContent);
    radiusBlockContent.appendChild(borderRadiusInput);


    root.appendChild(colorBlock);
    root.appendChild(paddingBlock);
    // root.appendChild(padControlGroup);

    root.appendChild(radiusBlock);

    buttonWrapper.appendChild(this.hideUITrigger);
    root.appendChild(buttonWrapper);
    document.body.appendChild(style);
    document.body.appendChild(root);

    this.stylerControls = {};
    this.stylerControls.backgroundColor = this.BgPicker;
    this.stylerControls.color = this.TextColorPicker;
    this.stylerControls.padding = paddingInputs;
    this.stylerControls.borderRadius = borderRadiusInput;

    this.UIRoot = root;
  }

  createUnputControl(callback, indicator) {
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
`, e: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M16.5,16.5v-13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`, b: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M3.5,16.5h13"/>
<path d="M12,7H8C7.5,7,7,7.5,7,8v4c0,0.6,0.5,1,1,1h4c0.6,0,1-0.5,1-1V8C13,7.5,12.5,7,12,7z"/>
</svg>
`,
    }
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "sk_input_control_group";
    const input = document.createElement("input");
    input.className = "sk_input variant_quatro";
    input.addEventListener("change", callback);
    
    const i = document.createElement('i');
    i.className = "sk_input_control_icon";
    i.innerHTML = icons[indicator] || icons['x'];
    inputWrapper.appendChild(i)
    inputWrapper.appendChild(input)
    return inputWrapper;
  }

  createUnputsGroupControl() {
    const cx = this.createUnputControl(()=>{}, "x");
    const cy = this.createUnputControl(()=>{}, "y");
    const cs = this.createUnputControl(()=>{}, "s");
    const ct = this.createUnputControl(()=>{}, "t");
    const ce = this.createUnputControl(()=>{}, "e");
    const cb = this.createUnputControl(()=>{}, "b");

    const controlWrapper1 = document.createElement("div");
    controlWrapper1.className = "sk_input_control_group_block";
    controlWrapper1.appendChild(cx);
    controlWrapper1.appendChild(cy);


    const controlWrapper2 = document.createElement("div");
    controlWrapper2.className = "sk_input_control_group_block";
    controlWrapper2.appendChild(cs);
    controlWrapper2.appendChild(ct);
    controlWrapper2.appendChild(ce);
    controlWrapper2.appendChild(cb);

    const controlsRoot = document.createElement("div");
    controlsRoot.appendChild(controlWrapper1);
    controlsRoot.appendChild(controlWrapper2);


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
      borderRadius: computedStyles.borderRadius,
    };

    return styles;
  }

  showUI(x, y, currentElement) {
    if (!this.UIRoot) return;

    const elementStyles = this.getSelectorAffectedCssStyles(currentElement);
    const bg = elementStyles.background;
    const txt = elementStyles.text;
    const padding = this.parseProp(elementStyles.padding);
    const bordeRadius = this.parseProp(elementStyles.borderRadius);

    this.stylerControls.backgroundColor.style.background = bg;
    this.stylerControls.color.style.background = txt;
    this.stylerControls.padding.top.value = padding.top.value;
    this.stylerControls.padding.right.value = padding.right.value;
    this.stylerControls.padding.bottom.value = padding.bottom.value;
    this.stylerControls.padding.left.value = padding.left.value;
    this.stylerControls.borderRadius.value = bordeRadius.top.value;

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
    this.UIRoot.style.left = `${x}px`;
    this.UIRoot.style.top = `${y}px`;
    this.UIRoot.style.opacity = "1";
    this.UIRoot.style.pointerEvents = "";

    let uniqueClass = currentElement.getAttribute("data-sk");
    let specificCn = this.generateCssPath(currentElement);
    let selector = `${specificCn}[data-sk="${uniqueClass}"]`;

    this.activeSelectorId = selector;

    // Add reveal animation
    this.UIRoot.classList.add("state-reveal");
    let timeoutId = setTimeout(() => {
      this.UIRoot.classList.remove("state-reveal");
      timeoutId = null;
    }, 3000);

    this.createKey(selector, currentElement);
  }

  hideUI() {
    if (this.UIRoot) {
      this.isStopped = false;
      this.UIRoot.style.opacity = "0";
      this.UIRoot.style.pointerEvents = "none";
    }
  }

  updateControl(control, value) {
    this.stylerControls[control].style.background = value;
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

  // generateCssPath(element) {
  //   console.log({ element });

  //   const path = [];
  //   while (this.root) {
  //     const selector = element.className
  //       ? `.${element.className.trim().split(/\s+/).join(".")}`
  //       : element.tagName.toLowerCase();
  //     path.unshift(selector);
  //     element = element.parentElement;
  //   }
  //   return path.join(" > ");
  // }

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
