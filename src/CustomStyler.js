var tinycolor = require("tinycolor2");
import Pickr from "@simonwep/pickr";

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
    this.boundMouseMove = (event) => self.onMouseMove(event, self.selector);
    this.boundClick = (event) => self.oonClick(event);
    this.root.addEventListener("mousemove", self.boundMouseMove);
    this.root.addEventListener("click", self.boundClick, true);
  }

  onMouseMove(event, selector) {
    if (this.isStopped || !this.isRunning) return;

    let hoveredElement;

    // If our root supports elementFromPoint, use that:
    if (this.root && typeof this.root.elementFromPoint === "function") {
      hoveredElement = this.root.elementFromPoint(event.clientX, event.clientY);
    } else {
      // Fallback: if the root is an element that doesn't have .elementFromPoint
      hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
    }

    if (
      hoveredElement &&
      hoveredElement.matches(selector) &&
      this.isVisible(hoveredElement)
    ) {
      // If we hovered over a new matching element
      if (hoveredElement !== this.currentElement) {
        if (this.currentElement) {
          this.resetStyles();
        }
        this.applyStyles(hoveredElement);
      }
    } else {
      this.resetStyles();
    }
  }

  oonClick(event) {
    if (this.isStopped || !this.isRunning) return;
    // console.log(event);

    // If user clicks inside the custom UI
    // if (this.UIRoot && this.UIRoot.contains(event.target)) {
    //   return;
    // }

    // // If click is inside the toolbox wrapper
    // if (this.toolboxWrapper && this.toolboxWrapper.contains(event.target)) {
    //   // If the clicked element is our toggle button
    //   if (event.target.matches("#toggleEditorBtn")) {
    //     // Deactivate or toggle the styler
    //     if (typeof styler !== "undefined" && styler) {
    //       styler.toggleStyler();
    //     }
    //   }
    //   return;
    // }

    if (this.isRunning) {
      // Prevent default actions and stop propagation
      event.preventDefault();
      event.stopPropagation();

      // Use composedPath to find if any element in the path matches the selector
      const path = event.composedPath();
      const clickedElement = path.find(
        (el) => el.matches && el.matches(this.selector)
      );

      if (clickedElement && this.isVisible(clickedElement)) {
        this.isStopped = true;
        this.clickCallback(clickedElement);

        // Show UI near the clicked element
        const bounds = clickedElement.getBoundingClientRect();
        this.showUI(bounds.left, bounds.top, clickedElement);
      }
    }
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
      this.boundMouseMove = (event) => this.onMouseMove(event, "*");
      this.boundClick = (event) => this.oonClick(event);

      this.root.addEventListener("mousemove", this.boundMouseMove);
      this.root.addEventListener("click", this.boundClick, true);

      console.log("MouseIntersectStyler started");
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;

      this.root.removeEventListener("mousemove", this.boundMouseMove);
      this.root.removeEventListener("click", this.boundClick, true);

      console.log("MouseIntersectStyler stopped");
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
    for (const key in this.skin) {
      css += `${key} {
  background-color: ${this.skin[key].backgroundColor};
  color: ${this.skin[key].color}b;
  padding-top: ${this.skin[key]["padding-top"]}px;
  padding-right: ${this.skin[key]["padding-right"]}px;
  padding-bottom: ${this.skin[key]["padding-bottom"]}px;
  padding-left: ${this.skin[key]["padding-left"]}px;
  border-radius: ${this.skin[key].borderRadius};
}\n\n`;
    }

    // width: ${this.skin[key].width} !important;
    //   height: ${this.skin[key].height} !important;

    // display: flex !important;
    //   flex-direction: ${this.skin[key].flexDirection} !important;

    return css;
  }

  createKey(name, el) {
    this.skin[name] = {};
    let cs = this.getSelectorAffectedCssStyles(el);
    let color = tinycolor(cs.color).toHexString();
    let backgroundColor = tinycolor(cs.backgroundColor).toHexString();

    const padding = this.parseProp(cs.padding);

    this.skin[name]["backgroundColor"] = backgroundColor;
    this.skin[name]["color"] = color;
    this.skin[name]["padding-top"] = padding.top.value;
    this.skin[name]["padding-right"] = padding.right.value;
    this.skin[name]["padding-bottom"] = padding.bottom.value;
    this.skin[name]["padding-left"] = padding.left.value;

    this.skin[name]["width"] = cs.width;
    this.skin[name]["height"] = cs.height;
    this.skin[name]["borderRadius"] = cs.borderRadius;
    this.skin[name]["flexDirection"] = cs.flexDirection;
  }

  createControl(label) {
    let d = document.createElement("div");
    let s = document.createElement("span");
    s.innerText = label || "control name";
    let c = document.createElement("div");
    d.className = "sk_styler_control_row";
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
        position: fixed;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    background: var(--skinnerBg2);
    color: var(--skinnerTxt);
    border: 1px solid var(--skinnerBg3);
    z-index: var(--sk_zind2);
    row-gap: 4px;
      }

      .sk_ui_custom_change_root.state-reveal {
        animation: appear 0.3s;
      }
        @keyframes appear {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
          .sk_styler_control_row {
    border: 1px solid var(--skinnerBg2);
    display: flex;
    padding: 0 var(--controls-ui-pad-x);
    align-items: center;
    column-gap: var(--controls-ui-gap);
    height: var(--controls-row-height);
    background-color: var(--skinnerBg);
    color: var(--skinnerTxt) !important;
    border-radius: 4px;
}
    .sk_styler_control_row_label {
    flex-grow: 1;
    min-width: 1px;
    font-size: 12px;
}
    .sk_styler_control_holder{
    
    }

    .sk_styler_control_holder > .pickr {
    position: absolute;
}

.sk_editor_input {
    -webkit-appearance: none;
    appearance: none;
    width: 50px;
    font-size: 11px;
    height: 24px;
    font-weight: 500;
    background: var(--skinnerShadow);
    color: var(--skinnerTxt2);
    border-radius: 2px;
    text-align: right;
    border: 0;
    border: 1px solid var(--skinnerBg3);
    outline: 0;
    padding: 0 6px;
}
    .sk_editor_button{
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid var(--skinnerBg3);
    text-align: center;
    height: var(--skinnerBtnHeight);
    text-decoration: none;
    background-color: var(--skinnerBg2);
    color: var(--skinnerTxt2);
    display: block;
    text-transform: capitalize;
    font-size: 12px;
    position: relative;
    font-weight: 500;
    padding: 0 12px;
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 4px;
    }
    .sk_editor_button.variant_ok{
        background-color: var(--skinnerAccent);
    border-color: var(--skinnerAccent);
    color: var(--skinnerAccentTxt);
    position: relative;
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
      this.handlePicker(e, (color) => {
        this.modifyKey("backgroundColor", color.toHEXA().toString());
        this.updateControl("backgroundColor", color.toHEXA().toString());
      });
    };

    // **New** callback for Text Color
    const handleTextColorPickerCallBack = (e) => {
      this.handlePicker(e, (color) => {
        this.modifyKey("color", color.toHEXA().toString());
        this.updateControl("color", color.toHEXA().toString());
      });
    };

    // Apply button
    this.hideUITrigger = document.createElement("button");
    this.hideUITrigger.className = "sk_editor_button variant_ok";
    this.hideUITrigger.addEventListener("click", (e) => self.hideUI());
    this.hideUITrigger.innerText = "apply";

    // Control wrappers for various properties
    let controlWrapperBg = this.createControl("background-color");
    let controlWrapperColor = this.createControl("text-color");
    let controlWrapperPadding = this.createControl("padding");
    let controlWrapperFlex = this.createControl("padding");
    let controlWrapperRadius = this.createControl("border-radius");
    let controlWrapperWidthHeight = this.createControl("width/height");

    // Padding input
    let padInputVariants = ["top", "right", "left", "bottom"];
    let paddingInputs = {};
    padInputVariants.forEach((v) => {
      paddingInputs[v] = document.createElement("input");
      paddingInputs[v].className = "nik_skinner_radius_amount";
      paddingInputs[v].type = "number";
      paddingInputs[v].addEventListener("change", (e) => {
        self.modifyKey(`padding-${v}`, e.target.value);
      });
    });

    // Background picker
    this.BgPicker = this.createColorBox(
      "nik_skinner_control_group_picker",
      handlePickerCallBack
    );

    // **New** text color picker
    this.TextColorPicker = this.createColorBox(
      "nik_skinner_control_group_picker",
      handleTextColorPickerCallBack
    );

    // Flex-direction radio buttons
    const flexDirectionWrapper = document.createElement("div");
    flexDirectionWrapper.className = "nik_skinner_flex_direction_wrapper";

    const flexRowRadio = document.createElement("input");
    flexRowRadio.type = "radio";
    flexRowRadio.name = "flexDirection"; // Same name ensures mutual exclusivity
    flexRowRadio.id = "flexRowRadio";
    flexRowRadio.value = "row";
    flexRowRadio.addEventListener("change", (e) => {
      if (e.target.checked) {
        self.modifyKey("flexDirection", "row");
      }
    });
    const flexRowLabel = document.createElement("label");
    flexRowLabel.setAttribute("for", "flexRowRadio");
    flexRowLabel.innerText = "Flex Row";

    const flexColumnRadio = document.createElement("input");
    flexColumnRadio.type = "radio";
    flexColumnRadio.name = "flexDirection"; // Same name ensures mutual exclusivity
    flexColumnRadio.id = "flexColumnRadio";
    flexColumnRadio.value = "column";
    flexColumnRadio.addEventListener("change", (e) => {
      if (e.target.checked) {
        self.modifyKey("flexDirection", "column");
      }
    });
    const flexColumnLabel = document.createElement("label");
    flexColumnLabel.setAttribute("for", "flexColumnRadio");
    flexColumnLabel.innerText = "Flex Column";

    // Append radios and labels to the wrapper
    flexDirectionWrapper.appendChild(flexRowRadio);
    flexDirectionWrapper.appendChild(flexRowLabel);
    flexDirectionWrapper.appendChild(flexColumnRadio);
    flexDirectionWrapper.appendChild(flexColumnLabel);

    // Border-radius input
    const borderRadiusInput = document.createElement("input");
    borderRadiusInput.type = "number";
    borderRadiusInput.className = "sk_editor_input";
    borderRadiusInput.placeholder = "Border Radius (px)";
    borderRadiusInput.addEventListener("change", (e) => {
      self.modifyKey("borderRadius", e.target.value + "px");
    });

    // Width and height inputs
    const widthInput = document.createElement("input");
    widthInput.type = "number";
    widthInput.className = "sk_editor_input";
    widthInput.placeholder = "Width (px)";
    widthInput.addEventListener("change", (e) => {
      self.modifyKey("width", e.target.value + "px");
    });

    const heightInput = document.createElement("input");
    heightInput.type = "number";
    heightInput.className = "sk_editor_input";
    heightInput.placeholder = "Height (px)";
    heightInput.addEventListener("change", (e) => {
      self.modifyKey("height", e.target.value + "px");
    });
    controlWrapperBg.inside.appendChild(this.BgPicker);
    controlWrapperColor.inside.appendChild(this.TextColorPicker);

    controlWrapperPadding.inside.appendChild(paddingInputs.top);
    controlWrapperPadding.inside.appendChild(paddingInputs.right);
    controlWrapperPadding.inside.appendChild(paddingInputs.bottom);
    controlWrapperPadding.inside.appendChild(paddingInputs.left);
    controlWrapperRadius.inside.appendChild(borderRadiusInput);
    controlWrapperFlex.inside.appendChild(flexDirectionWrapper);
    controlWrapperWidthHeight.inside.appendChild(widthInput);
    controlWrapperWidthHeight.inside.appendChild(heightInput);

    // Append controls to root

    root.appendChild(controlWrapperBg.element);
    root.appendChild(controlWrapperColor.element);
    root.appendChild(controlWrapperPadding.element);
    root.appendChild(controlWrapperFlex.element);
    root.appendChild(controlWrapperRadius.element);
    root.appendChild(controlWrapperWidthHeight.element);

    root.appendChild(this.hideUITrigger);
    document.body.appendChild(style);
    document.body.appendChild(root);

    this.stylerControls = {};
    this.stylerControls.backgroundColor = this.BgPicker;
    this.stylerControls.color = this.TextColorPicker;
    this.stylerControls.padding = paddingInputs;
    this.stylerControls.borderRadius = borderRadiusInput;

    this.UIRoot = root;
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
      backgroundColor: computedStyles.backgroundColor,
      color: computedStyles.color,
      padding: computedStyles.padding,
      borderRadius: computedStyles.borderRadius,
      width: computedStyles.width,
      height: computedStyles.height,
    };

    return styles;
  }

  showUI(x, y, currentElement) {
    if (!this.UIRoot) return;

    const elementStyles = this.getSelectorAffectedCssStyles(currentElement);
    const backgroundColor = elementStyles.backgroundColor;
    const color = elementStyles.color;
    const padding = this.parseProp(elementStyles.padding);
    const bordeRadius = this.parseProp(elementStyles.borderRadius);

    this.stylerControls.backgroundColor.style.background = backgroundColor;
    this.stylerControls.color.style.background = color;
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

    let selector = this.generateCssPath(currentElement);
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

  createPickerAndTrigger(parent, color) {
    let _triggerEl = document.createElement("div");
    _triggerEl.className = "skinner_picker_trigger_hide";
    parent.appendChild(_triggerEl);

    let _picker = Pickr.create({
      el: _triggerEl,
      theme: "classic",
      comparison: false,
      default: color,
      components: {
        preview: false,
        hue: true,
        interaction: {
          //hex: false,
          input: true,
          save: false,
        },
      },
    });

    return _picker;
  }

  removePicker(instance) {
    this.pickers = this.pickers.filter((p) => p !== instance);
  }

  handlePicker(event, onChangeCallback) {
    const selectedRuleState = this.skin[this.activeSelectorId];
    // const selectedRule = this.rules.find(
    //   (r) => r.cssSel === this.activeSelectorId
    // );

    let picker = this.createPickerAndTrigger(
      event.target.parentElement,
      selectedRuleState.backgroundColor // Default to "red" for the picker
    );

    picker.show();

    picker.on("change", (color, source, instance) => {
      onChangeCallback(color);
    });

    picker.on("hide", (instance) => {
      instance.destroyAndRemove();
      this.removePicker(instance); // Remove from pickers array
    });

    this.pickers.push(picker); // Store picker instance
  }
}

export { MouseIntersectStyler };
