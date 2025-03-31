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
    let CSSVariableRuleStart = "";

    for (const key in this.skin) {
      const _skin = this.skin[key];

      CSSVariableRuleStart += `
        ${key} {

        --${_skin.varPrefix}G: ${_skin.background.main};
        --${_skin.varPrefix}Bg: ${_skin.background.main};
        
 `;

      // Define CSS variables for padding

      CSSVariableRuleStart += `
        --${_skin.varPrefix}Ps: ${_skin.padding.start}px;
        --${_skin.varPrefix}Pe: ${_skin.padding.end}px;
        `;

      // --${_skin.varPrefix}PaddingTop: ${_skin.padding.top}px;
      // --${_skin.varPrefix}PaddingBottom: ${_skin.padding.bottom}px;

      // Define CSS variables for border radius

      CSSVariableRuleStart += `
        --${_skin.varPrefix}RTL: ${_skin.radius.tl};
        --${_skin.varPrefix}RTR: ${_skin.radius.tr};
        --${_skin.varPrefix}RBR: ${_skin.radius.br};
        --${_skin.varPrefix}RBL: ${_skin.radius.bl};
        `;

      // Define CSS variables for colors

      for (const txt in _skin.colors) {
        CSSVariableRuleStart += `
          --${_skin.varPrefix}${txt}: ${_skin.colors[txt]};
          `;
      }

      CSSVariableRuleStart += `
      padding-inline-start: var(--${_skin.varPrefix}Ps);
        padding-inline-end: var(--${_skin.varPrefix}Pe);
        border-top-left-radius: var(--${_skin.varPrefix}RTL);
        border-top-right-radius: var(--${_skin.varPrefix}RTR);
        border-bottom-right-radius: var(--${_skin.varPrefix}RBR);
        border-bottom-left-radius: var(--${_skin.varPrefix}RBL);
      `;
      CSSVariableRuleStart += `}`;
    }

    // Apply the CSS variables to the element styles

    // Apply the color variables to elements with data-sk-color

    const res = `
    ${CSSVariableRuleStart}`;

    return res;
  }

  createKey(name, el) {
    this.skin[name] = {};
    const cs = this.getSelectorAffectedCssStyles(el);
    const css = this.getSelectorEssenceStyles(el);
    let uniqueClass = el.getAttribute("data-sk");
    const padding = this.parseProp(cs.padding);

    // Helper function to group elements by `data-sk-color`
    this.skin[name].colors = {};

    this.skin[name].colors = {
      Txt: css.txt, // Default text color, can be modified
      Txt2: css.txt2, // Default secondary text color
      Txt3: css.txt3, // Default tertiary text color
    };

    // Set up your skin structure
    this.skin[name].background = { main: css.bg };
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
  }
  createTextColorPickers() {
    const colors = ["Txt", "Txt2", "Txt3"];
    colors.forEach((clr, i) => {
      const handlePickerCallBack = (e) => {
        this.handlePicker(e, null, null, (color) => {
          this.modifyKey("colors", clr, color);
          this.updateControl("colors", clr, color);
        });
      };

      const picker = this.createColorBox(
        "sk_picker_trigger",
        handlePickerCallBack
      );
      this.stylerControls.colors[clr] = picker;

      this.pickersWrapper.appendChild(picker);
    });
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
    --inputsCta: var(--sk_dominantTxt2);
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
      this.handleGradientPicker(e, null, (data) => {
        this.modifyKey("background", "main", data.color);
        this.updateControl("background", "main", data.color);
      });
    };

    // Apply button
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "sk_widget_footer_row";

    this.hideUITrigger = document.createElement("button");
    this.hideUITrigger.className = "sk_btn variant_primary variant_styler";
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

    this.paddingsWrapper = document.createElement("div");
    this.paddingsWrapper.className =
      "sk_ui_custom_change_controls_paddings_wrapper";
    this.pickersWrapper = document.createElement("div");
    this.pickersWrapper.className =
      "sk_ui_custom_change_controls_pickers_wrapper";
    this.radiusesWrapper = document.createElement("div");
    this.radiusesWrapper.className =
      "sk_ui_custom_change_controls_radiuses_wrapper";
    rootControls.appendChild(this.pickersWrapper);
    this.pickersWrapper.appendChild(this.BgPicker);

    const paddingRangeStartWrapper = document.createElement("div");
    paddingRangeStartWrapper.className =
      "sk_control_padding_wrapper variant_start";
    this.paddingRangeStart = document.createElement("input");
    this.paddingRangeStart.type = "range";
    this.paddingRangeStart.className = "sk_control_padding ";

    this.paddingRangeStart.min = 0;
    this.paddingRangeStart.max = 100;

    this.paddingRangeStart.addEventListener("change", (e) => {
      const value = e.target.value;

      this.modifyKey("padding", "start", value);

      const percentage =
        ((value - e.target.min) / (e.target.max - e.target.min)) * 100;

      paddingRangeStartWrapper.style.setProperty("--percent", `${percentage}%`);
    });

    paddingRangeStartWrapper.appendChild(this.paddingRangeStart);
    this.paddingsWrapper.appendChild(paddingRangeStartWrapper);

    const paddingRangeEndWrapper = document.createElement("div");
    paddingRangeEndWrapper.className = "sk_control_padding_wrapper variant_end";
    this.paddingRangeEnd = document.createElement("input");
    this.paddingRangeEnd.type = "range";
    this.paddingRangeEnd.className = "sk_control_padding  sk_flip";

    this.paddingRangeEnd.min = 0;
    this.paddingRangeEnd.max = 32;

    this.paddingRangeEnd.addEventListener("change", (e) => {
      const value = e.target.value;

      this.modifyKey("padding", "end", value);

      const percentage =
        ((value - e.target.min) / (e.target.max - e.target.min)) * 100;

      paddingRangeEndWrapper.style.setProperty("--percent", `${percentage}%`);
    });

    root.appendChild(rootControls);
    root.appendChild(this.paddingsWrapper);
    root.appendChild(this.radiusesWrapper);
    paddingRangeEndWrapper.appendChild(this.paddingRangeEnd);
    this.paddingsWrapper.appendChild(paddingRangeEndWrapper);
    rootControls.appendChild(this.hideUITrigger);

    const rootBounds = root.getBoundingClientRect();

    const borderRadiusTL = this.createRadiusControl(this.radiusesWrapper, "tl");
    const borderRadiusTR = this.createRadiusControl(this.radiusesWrapper, "tr");
    const borderRadiusBR = this.createRadiusControl(this.radiusesWrapper, "br");
    const borderRadiusBL = this.createRadiusControl(this.radiusesWrapper, "bl");

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
    this.createTextColorPickers();

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
    radius.min = 0;

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

  getSelectorEssenceStyles(selector) {
    let computedStyles = getComputedStyle(selector);
    if (!selector) return;
    let styles = {
      bg: computedStyles.getPropertyValue("--eventBg"),
      txt: computedStyles.getPropertyValue("--eventTxt"),
      txt2: computedStyles.getPropertyValue("--eventTxt2"),
      txt3: computedStyles.getPropertyValue("--eventTxt3"),
      padding: computedStyles.padding,
      borderRadiusTL: computedStyles.borderTopLeftRadius,
      borderRadiusTR: computedStyles.borderTopRightRadius,
      borderRadiusBR: computedStyles.borderBottomRightRadius,
      borderRadiusBL: computedStyles.borderBottomLeftRadius,
    };

    return styles;
  }

  getElementsWithColorAttr(rootEl) {
    const grouped = {};
    const stack = [rootEl];

    while (stack.length > 0) {
      const current = stack.pop();
      for (const child of current.children) {
        if (child.hasAttribute("data-sk")) continue;
        if (child.hasAttribute("data-sk-color")) {
          const color = child.getAttribute("data-sk-color");
          if (!grouped[color]) grouped[color] = [];
          grouped[color].push(child);
        }
        stack.push(child);
      }
    }
    return grouped;
  }

  showUI(x, y, currentElement) {
    const _t = this;
    if (!this.UIRoot) return;

    const elementStyles = this.getSelectorAffectedCssStyles(currentElement);
    const css = this.getSelectorEssenceStyles(currentElement);

    const bounds = currentElement.getBoundingClientRect();
    const bg = css.bg;
    const padding = this.parseProp(elementStyles.padding);

    this.stylerControls.background.main.style.background = bg;

    this.stylerControls.colors.Txt.style.background = css.txt;
    this.stylerControls.colors.Txt.style.background = css.txt2;
    this.stylerControls.colors.Txt.style.background = css.txt3;

    this.stylerControls.padding.end.value = padding.right.value;
    this.stylerControls.padding.start.value = padding.left.value;
    this.stylerControls.radius.tl.value = css.borderTopLeftRadius;
    this.stylerControls.radius.tr.value = css.borderTopRightRadius;
    this.stylerControls.radius.br.value = css.borderBottomRightRadius;
    this.stylerControls.radius.bl.value = css.borderBottomLeftRadius;
    this.stylerControls.radius.bl.parentElement;

    const radiusMax = Math.ceil(bounds.height / 2);
    this.stylerControls.radius.tl.setAttribute("max", radiusMax);
    this.stylerControls.radius.tr.setAttribute("max", radiusMax);
    this.stylerControls.radius.br.setAttribute("max", radiusMax);
    this.stylerControls.radius.bl.setAttribute("max", radiusMax);

    this.stylerControls.radius.tl.parentElement.style.setProperty(
      "--max",
      `${radiusMax}px`
    );

    this.stylerControls.radius.tr.parentElement.style.setProperty(
      "--max",
      `${radiusMax}px`
    );

    this.stylerControls.radius.br.parentElement.style.setProperty(
      "--max",
      `${radiusMax}px`
    );

    this.stylerControls.radius.bl.parentElement.style.setProperty(
      "--max",
      `${radiusMax}px`
    );

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const uiWidth = this.UIRoot.offsetWidth || 300;
    const uiHeight = this.UIRoot.offsetHeight || 150;

    if (x + uiWidth > windowWidth) x = windowWidth - uiWidth - 10;
    if (y + uiHeight > windowHeight) y = windowHeight - uiHeight - 10;
    x = Math.max(x, 10);
    y = Math.max(y, 10);

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

    // 🔥 Attach dynamic color pickers

    this.createKey(selector, currentElement); // saves txt1/2/3
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

    // Use the provided color or default to the one passed
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

  handleGradientPicker(event, color, onChangeCallback) {
    // const _vd = this.verbalData(essence);
    const _t = this;
    if (self.pickerInstance) {
      console.log("A picker is already open. Please close it first.");
      return;
    }

    let x = event.clientX;
    let y = event.clientY;
    const gradientState = {
      mode: "gradient",
      stops: [
        [color, 0],
        [color, 1],
      ],
      angle: 0,
      type: "linear",
    };

    const SKPickerInstance = new SKPicker({
      mode: "gradient",
      stops: gradientState.stops,
      angle: gradientState.angle,
      type: gradientState.type,
    });
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
