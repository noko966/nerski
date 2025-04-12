import SKPicker from "./modules/picker.js";

// Class to handle mouse move intersection with DOM elements and apply styles
class MouseIntersectStyler {
  constructor(root, patientRoot) {
    this.eventListeners = {
      cssupdate: [],
      // possibly other events
    };
    this.currentElement = null;
    this.isStopped = false;
    this.isRunning = false; // Track if the styler is active
    this.mouseLeaveHandler = null;
    this.rules = [];
    this.UIRoot = null;
    this.root = root || document;
    this.init();
    this.pickers = [];
    this.state = {};
    this.activeSelectorId = null;
    this.skin = {};
    this.colors = {};
    this.flags = Object.create(null);
    this.patientRoot = patientRoot || document.body;
  }

  scheduleCssUpdate() {
    clearTimeout(this.__cssTimer);
    this.__cssTimer = setTimeout(() => {
      const css = this.createCss();
      if (css) this.emit("cssupdate", css);
    }, 0);
  }

  init() {
    const self = this;
    this.createUI();
  }

  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (!this.eventListeners[eventName]) return;
    this.eventListeners[eventName].forEach((cb) => cb(...args));
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

      // Target all elements with [data-sk] in the patientRoot

      if (this.patientRoot instanceof ShadowRoot) {
        this.editableElements = this.patientRoot.querySelectorAll("[data-sk]");
      } else {
        this.editableElements = document.querySelectorAll("[data-sk]");
      }

      // Attach "mouseenter" and "click" listeners
      this.editableElements.forEach((el) => {
        el.addEventListener("mouseenter", this.boundMouseOver, true);
        el.addEventListener("click", this.boundClick, true);
      });

      console.log("MouseIntersectStyler started");
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      // Re-grab elements in case the DOM changed

      if (this.patientRoot instanceof ShadowRoot) {
        this.editableElements = this.patientRoot.querySelectorAll("[data-sk]");
      } else {
        this.editableElements = document.querySelectorAll("[data-sk]");
      }

      this.editableElements.forEach((el) => {
        el.removeEventListener("mouseenter", this.boundMouseOver);
        el.removeEventListener("click", this.boundClick);
      });

      console.log("MouseIntersectStyler stopped");
    }
  }

  injectStyle(css) {
    const _id = "sk_custom_styler_injected";
    let styleElement = document.getElementById(_id);
    if (this.patientRoot instanceof ShadowRoot) {
      styleElement = this.patientRoot.querySelector(`#${styleId}`);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.setAttribute("id", _id);
        this.patientRoot.appendChild(styleElement);
      }
    } else {
      // Otherwise, assume the target is `document`
      styleElement = document.getElementById(_id);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.setAttribute("id", _id);
        document.head.appendChild(styleElement);
      }
    }

    this.injectedStyle = styleElement;
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
    ];

    const bandSize = 16;
    const stops = [];

    colors.forEach((color, i) => {
      const start = i * 2 * bandSize;
      const mid = start + bandSize;
      const end = mid + bandSize;

      stops.push(
        `var(--sk_dominantBg) ${start}px`,
        `var(--sk_dominantBg) ${mid}px`,
        `${color} ${mid}px`,
        `${color} ${end}px`
      );
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
        // this.clickCallback(clickedElement);

        // Show UI near the clicked element
        const bounds = clickedElement.getBoundingClientRect();
        this.injectStyle("");
        this.showUI(bounds.left, bounds.top, clickedElement);
      }
    }
  }

  modifyKey(group, name, value) {
    const sel = this.activeSelectorId;
    const selectedRuleState = this.skin[sel];
    if (!selectedRuleState) return;
    selectedRuleState[group][name] = value;
    if (!this.flags[sel]) this.flags[sel] = this.freshFlags();
    this.flags[sel][group] = true;
    this.scheduleCssUpdate();
  }

  createCss() {
    let css = "";
    for (const key in this.skin) {
      const f = this.flags[key];
      if (!f) continue;
      const s = this.skin[key];
      let block = `${key}{`;
      if (f.background)
        block += `--${s.varPrefix}Bg:${s.background.main};--${s.varPrefix}G:${s.background.main};`;
      if (f.colors)
        Object.keys(s.colors).forEach(
          (k) => (block += `--${s.varPrefix}${k}:${s.colors[k]};`)
        );
      if (f.accentColors)
        Object.keys(s.accentColors).forEach(
          (k) => (block += `--${s.varPrefix}${k}:${s.accentColors[k]};`)
        );
      if (f.padding) {
        block += `--${s.varPrefix}Ps:${s.padding.start};--${s.varPrefix}Pe:${s.padding.end};--${s.varPrefix}Pt:${s.padding.top};--${s.varPrefix}Pb:${s.padding.bottom};`;
        block += `padding-inline-start:var(--${s.varPrefix}Ps);padding-inline-end:var(--${s.varPrefix}Pe);padding-top:var(--${s.varPrefix}Pt);padding-bottom:var(--${s.varPrefix}Pb);`;
      }
      if (f.border) {
        block += `--${s.varPrefix}BorderStartWidth:${s.border.start};--${s.varPrefix}BorderEndWidth:${s.border.end};--${s.varPrefix}BorderTopWidth:${s.border.top};--${s.varPrefix}BorderBottomWidth:${s.border.bottom};--${s.varPrefix}Border:${s.border.color};`;
        block += `border-inline-start:var(--${s.varPrefix}BorderStartWidth) solid var(--${s.varPrefix}Border);border-inline-end:var(--${s.varPrefix}BorderEndWidth) solid var(--${s.varPrefix}Border);border-top:var(--${s.varPrefix}BorderTopWidth) solid var(--${s.varPrefix}Border);border-bottom:var(--${s.varPrefix}BorderBottomWidth) solid var(--${s.varPrefix}Border);`;
      }
      if (f.radius) {
        block += `--${s.varPrefix}RTL:${s.radius.tl};--${s.varPrefix}RTR:${s.radius.tr};--${s.varPrefix}RBR:${s.radius.br};--${s.varPrefix}RBL:${s.radius.bl};`;
        block += `border-top-left-radius:var(--${s.varPrefix}RTL);border-top-right-radius:var(--${s.varPrefix}RTR);border-bottom-right-radius:var(--${s.varPrefix}RBR);border-bottom-left-radius:var(--${s.varPrefix}RBL);`;
      }
      block += "}";
      css += block;
    }
    return css;
  }

  createKey(name, el) {
    this.skin[name] = {};
    const css = this.getSelectorEssenceStyles(el);
    const uniqueClass = el.getAttribute("data-sk");
    this.skin[name].colors = { Txt: css.txt, Txt2: css.txt2, Txt3: css.txt3 };
    this.skin[name].accentColors = {
      Accent: css.accent,
      AccentTxt: css.accentTxt,
    };
    this.skin[name].background = { main: css.bg };
    this.skin[name].gradient = {
      isActive: false,
      stops: [
        [css.bg, 0],
        [css.bg, 1],
      ],
      angle: 0,
      type: "linear",
      color: this.createGradientString({
        stops: [
          [css.bg, 0],
          [css.bg, 1],
        ],
        angle: 0,
        type: "linear",
      }),
    };
    this.skin[name].padding = {
      start: css.padding.start,
      end: css.padding.end,
      bottom: css.padding.bottom,
      top: css.padding.top,
    };
    this.skin[name].border = {
      start: css.border.start,
      end: css.border.end,
      bottom: css.border.bottom,
      top: css.border.top,
      color: css.border.color,
    };
    this.skin[name].varPrefix = uniqueClass;
    this.skin[name].radius = {
      tl: css.radius.tl,
      tr: css.radius.tr,
      br: css.radius.br,
      bl: css.radius.bl,
    };
  }
  createTextColorPickers(root) {
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

      root.appendChild(picker);
    });
  }

  createAccentColorPickers(root) {
    const colors = ["Accent", "AccentTxt"];
    colors.forEach((clr, i) => {
      const handlePickerCallBack = (e) => {
        this.handlePicker(e, null, null, (color) => {
          this.modifyKey("accentColors", clr, color);
          this.updateControl("accentColors", clr, color);
        });
      };

      const picker = this.createColorBox(
        "sk_picker_trigger",
        handlePickerCallBack
      );
      this.stylerControls.accentColors[clr] = picker;

      root.appendChild(picker);
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
    // el.appendChild(ic);
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
    width: 100%;
    height: 100%;
    z-index: calc(var(--sk_zind) - 100);
    top: 0;
    bottom:0;
    left:0;
    right:0;
    border: none;
      }
    
    
    `;
    const root = document.createElement("div");
    root.className = "sk_ui_custom_change_root";
    root.style.opacity = 0;
    root.style.pointerEvents = "none";
    this.ui = {};

    // Callback for color picker
    const handleBackgroundPickerCallBack = (e) => {
      this.handleGradientPicker(e, null, (data) => {
        this.modifyKey("background", "main", data.color);

        this.updateControl("background", "main", data.color);
      });
    };

    const handleBorderPickerCallBack = (e) => {
      this.handlePicker(e, null, null, (color) => {
        this.modifyKey("border", "color", color);
        this.updateControl("border", "color", color);
      });
    };

    // Apply button
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "sk_widget_footer_row";

    this.hideUITrigger = document.createElement("button");
    this.hideUITrigger.className = "sk_btn variant_primary variant_styler";
    this.hideUITrigger.addEventListener("click", (e) => self.hideUI());
    this.hideUITrigger.innerText = "apply";

    this.BgPicker = this.createColorBox(
      "sk_picker_trigger",
      handleBackgroundPickerCallBack
    );

    this.BorderPicker = this.createColorBox(
      "sk_picker_trigger",
      handleBorderPickerCallBack
    );

    const rootBounds = root.getBoundingClientRect();

    const group1 = document.createElement("div");
    group1.className = "sk_ui_custom_change_modals_group variant_colors";

    const group2 = document.createElement("div");
    group2.className = "sk_ui_custom_change_modals_group";

    const bglbl = this.createControlHeader("backgroun's");
    const bgContent = this.createControlContent();
    this.ui.backgroundRoot = this.createControlRoot();
    this.ui.backgroundRoot.appendChild(bglbl);
    this.ui.backgroundRoot.appendChild(bgContent);
    document.body.appendChild(style);
    document.body.appendChild(root);
    this.ui.modalsContainer = document.createElement("div");

    const txtlbl = this.createControlHeader("text's");
    const txtContent = this.createControlContent();

    const accentlbl = this.createControlHeader("accent's");
    const accentContent = this.createControlContent();
    this.ui.backgroundRoot.appendChild(txtlbl);
    this.ui.backgroundRoot.appendChild(txtContent);
    this.ui.backgroundRoot.appendChild(accentlbl);
    this.ui.backgroundRoot.appendChild(accentContent);
    this.ui.modalsContainer.appendChild(group1);
    this.ui.modalsContainer.appendChild(group2);
    this.ui.modalsActionsWrapper = document.createElement("div");
    this.ui.modalsContainer.appendChild(this.ui.modalsActionsWrapper);
    this.ui.modalsActionsWrapper.className = "sk_actions_wrapper_styler";
    group1.appendChild(this.ui.backgroundRoot);

    const bRow = this.createPickersRow();
    bgContent.appendChild(bRow);
    bRow.appendChild(this.BgPicker);

    this.stylerControls = {};
    this.ui.modalsContainer.className = "sk_ui_custom_change_modals_container";

    this.ui.paddingRoot = this.createControlRoot();
    const plbl = this.createControlHeader("padding");
    const pContent = this.createControlContent();
    this.ui.paddingRoot.appendChild(plbl);
    this.ui.paddingRoot.appendChild(pContent);
    pContent.appendChild(this.createPaddingGroupControls());
    group2.appendChild(this.ui.paddingRoot);

    this.ui.borderRoot = this.createControlRoot();
    const blbl = this.createControlHeader("border");
    const bContent = this.createControlContent();
    this.ui.borderRoot.appendChild(blbl);
    this.ui.borderRoot.appendChild(bContent);
    bContent.appendChild(this.createBorderGroupControls());
    bContent.appendChild(this.BorderPicker);
    group2.appendChild(this.ui.borderRoot);

    this.ui.radiusRoot = this.createControlRoot();
    const rlbl = this.createControlHeader("radius");
    const rContent = this.createControlContent();
    this.ui.radiusRoot.appendChild(rlbl);
    this.ui.radiusRoot.appendChild(rContent);
    rContent.appendChild(this.createRadiusGroupControls());
    group2.appendChild(this.ui.radiusRoot);
    root.appendChild(this.ui.modalsContainer);

    this.stylerControls.background = {};

    this.stylerControls.border.color = this.BorderPicker;
    this.stylerControls.background.main = this.BgPicker;
    this.stylerControls.colors = {};
    this.stylerControls.accentColors = {};

    const cRow = this.createPickersRow();
    const aRow = this.createPickersRow();
    txtContent.appendChild(cRow);
    accentContent.appendChild(aRow);
    this.createTextColorPickers(cRow);
    this.createAccentColorPickers(aRow);
    this.ui.predefinedStylesRoot = document.createElement("div");
    this.ui.predefinedStylesRoot.className = "sk_ui_prd_styles_root";
    this.ui.modalsActionsWrapper.appendChild(this.ui.predefinedStylesRoot);
    this.ui.modalsActionsWrapper.appendChild(this.hideUITrigger);

    this.UIRoot = root;
  }

  createPickersRow() {
    const root = document.createElement("div");
    root.className = "sk_ui_pickers_row";

    return root;
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
      tl: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path class="st0" d="M16.5,3.5H8.7c-2.9,0-5.2,2.3-5.2,5.2v7.8"/>
</svg>
`,
      tr: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path class="st0" d="M16.5,16.5V8.7c0-2.9-2.3-5.2-5.2-5.2H3.5"/>
</svg>
`,
      bl: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path class="st0" d="M3.5,3.5v7.8c0,2.9,2.3,5.2,5.2,5.2h7.8"/>
</svg>
`,
      br: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path class="st0" d="M3.5,16.5h7.8c2.9,0,5.2-2.3,5.2-5.2V3.5"/>
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

  addSVGIcon() {
    const icon = document.createElement("i");
    icon.innerHTML = `<svg version="1.1" class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M5 8.33329V6.66663C5 3.90829 5.83333 1.66663 10 1.66663C14.1667 1.66663 15 3.90829 15 6.66663V8.33329" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99996 15.4167C11.1506 15.4167 12.0833 14.4839 12.0833 13.3333C12.0833 12.1827 11.1506 11.25 9.99996 11.25C8.84937 11.25 7.91663 12.1827 7.91663 13.3333C7.91663 14.4839 8.84937 15.4167 9.99996 15.4167Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.1666 18.3334H5.83329C2.49996 18.3334 1.66663 17.5 1.66663 14.1667V12.5C1.66663 9.16671 2.49996 8.33337 5.83329 8.33337H14.1666C17.5 8.33337 18.3333 9.16671 18.3333 12.5V14.1667C18.3333 17.5 17.5 18.3334 14.1666 18.3334Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    </svg>
    `;

    return icon;
  }

  createBorderGroupControls() {
    const unit = "px";
    const _t = this;

    const linkToggle = document.createElement("input");
    linkToggle.type = "checkbox";
    linkToggle.id = "sk-border-link-toggle";
    linkToggle.checked = _t.stylerControls.linkPaddingAll;
    const linkToggleLabel = document.createElement("label");
    const icon = _t.addSVGIcon();
    linkToggleLabel.htmlFor = "sk-border-link-toggle";
    linkToggleLabel.className = "sk_iconic_checkbox";

    linkToggleLabel.appendChild(linkToggle);
    linkToggleLabel.appendChild(icon);

    _t.stylerControls.border = {};
    _t.stylerControls.border.linkAll = false;

    linkToggle.addEventListener("change", (e) => {
      _t.stylerControls.border.linkAll = e.target.checked;
      if (_t.stylerControls.border.linkAll) {
        const startVal = _t.stylerControls.border.start.value;
        setAllSides(startVal);
      }
    });

    _t.stylerControls.padding.linkToggle = linkToggle;

    function setAllSides(value) {
      _t.stylerControls.border.start.value = value;
      _t.stylerControls.border.top.value = value;
      _t.stylerControls.border.end.value = value;
      _t.stylerControls.border.bottom.value = value;

      _t.modifyKey("border", "start", value + unit);
      _t.modifyKey("border", "top", value + unit);
      _t.modifyKey("border", "end", value + unit);
      _t.modifyKey("border", "bottom", value + unit);
    }

    const cs = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("border", `start`, e.target.value + unit);
      }
    }, "s");
    const ct = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("border", `top`, e.target.value + unit);
      }
    }, "t");
    const ce = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("border", `end`, e.target.value + unit);
      }
    }, "e");
    const cb = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("border", `bottom`, e.target.value + unit);
      }
    }, "b");

    const controlWrapper = document.createElement("div");
    controlWrapper.className = "sk_input_control_group_block";
    controlWrapper.appendChild(cs.inputWrapperEl);
    controlWrapper.appendChild(ct.inputWrapperEl);
    controlWrapper.appendChild(ce.inputWrapperEl);
    controlWrapper.appendChild(cb.inputWrapperEl);

    const controlsRoot = document.createElement("div");

    controlsRoot.appendChild(controlWrapper);
    controlsRoot.appendChild(linkToggleLabel);

    _t.stylerControls.border.start = cs.inputEl;
    _t.stylerControls.border.end = ce.inputEl;
    _t.stylerControls.border.top = ct.inputEl;
    _t.stylerControls.border.bottom = cb.inputEl;

    return controlsRoot;
  }

  createPaddingGroupControls() {
    const unit = "px";
    const _t = this;

    const linkToggle = document.createElement("input");
    linkToggle.type = "checkbox";
    linkToggle.id = "sk-padding-link-toggle";
    linkToggle.checked = _t.stylerControls.linkPaddingAll;
    const linkToggleLabel = document.createElement("label");
    const icon = _t.addSVGIcon();
    linkToggleLabel.htmlFor = "sk-padding-link-toggle";
    linkToggleLabel.className = "sk_iconic_checkbox";

    linkToggleLabel.appendChild(linkToggle);
    linkToggleLabel.appendChild(icon);

    _t.stylerControls.padding = {};
    _t.stylerControls.padding.linkAll = false;

    linkToggle.addEventListener("change", (e) => {
      _t.stylerControls.padding.linkAll = e.target.checked;
      if (_t.stylerControls.padding.linkAll) {
        const startVal = _t.stylerControls.padding.start.value;
        setAllSides(startVal);
      }
    });

    _t.stylerControls.padding.linkToggle = linkToggle;

    function setAllSides(value) {
      _t.stylerControls.padding.start.value = value;
      _t.stylerControls.padding.top.value = value;
      _t.stylerControls.padding.end.value = value;
      _t.stylerControls.padding.bottom.value = value;

      _t.modifyKey("padding", "start", value + unit);
      _t.modifyKey("padding", "top", value + unit);
      _t.modifyKey("padding", "end", value + unit);
      _t.modifyKey("padding", "bottom", value + unit);
    }

    const cs = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("padding", `start`, e.target.value + unit);
      }
    }, "s");
    const ct = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("padding", `top`, e.target.value + unit);
      }
    }, "t");
    const ce = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("padding", `end`, e.target.value + unit);
      }
    }, "e");
    const cb = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("padding", `bottom`, e.target.value + unit);
      }
    }, "b");

    const controlWrapper = document.createElement("div");
    controlWrapper.className = "sk_input_control_group_block";
    controlWrapper.appendChild(cs.inputWrapperEl);
    controlWrapper.appendChild(ct.inputWrapperEl);
    controlWrapper.appendChild(ce.inputWrapperEl);
    controlWrapper.appendChild(cb.inputWrapperEl);

    const controlsRoot = document.createElement("div");

    controlsRoot.appendChild(controlWrapper);
    controlsRoot.appendChild(linkToggleLabel);

    _t.stylerControls.padding.start = cs.inputEl;
    _t.stylerControls.padding.end = ce.inputEl;
    _t.stylerControls.padding.top = ct.inputEl;
    _t.stylerControls.padding.bottom = cb.inputEl;

    return controlsRoot;
  }

  createRadiusGroupControls() {
    const unit = "px";

    const _t = this;

    const linkToggle = document.createElement("input");
    linkToggle.type = "checkbox";
    linkToggle.id = "sk-radius-link-toggle";
    linkToggle.checked = _t.stylerControls.linkPaddingAll;

    const linkToggleLabel = document.createElement("label");
    const icon = _t.addSVGIcon();
    linkToggleLabel.htmlFor = "sk-radius-link-toggle";
    linkToggleLabel.className = "sk_iconic_checkbox";

    linkToggleLabel.appendChild(linkToggle);
    linkToggleLabel.appendChild(icon);

    _t.stylerControls.radius = {};
    _t.stylerControls.radius.linkAll = false;

    linkToggle.addEventListener("change", (e) => {
      _t.stylerControls.radius.linkAll = e.target.checked;
      if (_t.stylerControls.radius.linkAll) {
        const startVal = _t.stylerControls.radius.tl.value;
        setAllSides(startVal);
      }
    });

    _t.stylerControls.radius.linkToggle = linkToggle;

    function setAllSides(value) {
      _t.stylerControls.radius.tl.value = value;
      _t.stylerControls.radius.tr.value = value;
      _t.stylerControls.radius.bl.value = value;
      _t.stylerControls.radius.br.value = value;

      _t.modifyKey("radius", "tl", value + unit);
      _t.modifyKey("radius", "tr", value + unit);
      _t.modifyKey("radius", "bl", value + unit);
      _t.modifyKey("radius", "br", value + unit);
    }

    const tl = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("radius", `tl`, e.target.value + unit);
      }
    }, "tl");
    const tr = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("radius", `tr`, e.target.value + unit);
      }
    }, "tr");

    const bl = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("radius", `bl`, e.target.value + unit);
      }
    }, "bl");
    const br = _t.createInputControl((e) => {
      if (linkToggle.checked) {
        setAllSides(e.target.value);
      } else {
        _t.modifyKey("radius", `br`, e.target.value + unit);
      }
    }, "br");

    const controlWrapper = document.createElement("div");
    controlWrapper.className = "sk_input_control_group_block";
    controlWrapper.appendChild(tl.inputWrapperEl);
    controlWrapper.appendChild(tr.inputWrapperEl);
    controlWrapper.appendChild(bl.inputWrapperEl);
    controlWrapper.appendChild(br.inputWrapperEl);

    const controlsRoot = document.createElement("div");
    controlsRoot.appendChild(controlWrapper);
    controlsRoot.appendChild(linkToggleLabel);

    _t.stylerControls.radius.tl = tl.inputEl;
    _t.stylerControls.radius.tr = tr.inputEl;
    _t.stylerControls.radius.bl = bl.inputEl;
    _t.stylerControls.radius.br = br.inputEl;

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

  getSelectorEssenceStyles(selector) {
    const essence = selector.getAttribute("data-sk");
    let computedStyles = getComputedStyle(selector);
    if (!selector) return;
    const background =
      computedStyles.getPropertyValue(`--${essence}Bg`) ||
      computedStyles.getPropertyValue(`--${essence}G`);
    let styles = {
      bg: background,
      txt: computedStyles.getPropertyValue(`--${essence}Txt`),
      txt2: computedStyles.getPropertyValue(`--${essence}Txt2`),
      txt3: computedStyles.getPropertyValue(`--${essence}Txt3`),
      accent: computedStyles.getPropertyValue(`--${essence}Accent`),
      accentTxt: computedStyles.getPropertyValue(`--${essence}AccentTxt`),
      padding: {
        start: computedStyles.paddingInlineStart,
        end: computedStyles.paddingInlineEnd,
        top: computedStyles.paddingTop,
        bottom: computedStyles.paddingBottom,
      },
      border: {
        start: computedStyles.borderBlockStartWidth,
        end: computedStyles.borderBlockEndWidth,
        top: computedStyles.borderTopWidth,
        bottom: computedStyles.borderBottomWidth,
        color: computedStyles.getPropertyValue(`--${essence}Border`),
      },
      radius: {
        tl: computedStyles.borderTopLeftRadius,
        tr: computedStyles.borderTopRightRadius,
        br: computedStyles.borderBottomRightRadius,
        bl: computedStyles.borderBottomLeftRadius,
      },
    };

    return styles;
  }

  parseValueForInput(rawValue) {
    return parseInt(rawValue, 10);
  }

  showUI(x, y, currentElement) {
    if (!this.UIRoot) return;
    const css = this.getSelectorEssenceStyles(currentElement);
    const bounds = currentElement.getBoundingClientRect();
    this.stylerControls.background.main.style.background = css.bg;
    this.stylerControls.colors.Txt.style.background = css.txt;
    this.stylerControls.colors.Txt2.style.background = css.txt2;
    this.stylerControls.colors.Txt3.style.background = css.txt3;
    this.stylerControls.accentColors.Accent.style.background = css.accent;
    this.stylerControls.accentColors.AccentTxt.style.background = css.accentTxt;
    this.stylerControls.padding.start.value = this.parseValueForInput(
      css.padding.start
    );
    this.stylerControls.padding.end.value = this.parseValueForInput(
      css.padding.end
    );
    this.stylerControls.padding.top.value = this.parseValueForInput(
      css.padding.top
    );
    this.stylerControls.padding.bottom.value = this.parseValueForInput(
      css.padding.bottom
    );
    this.stylerControls.border.color.style.background = css.border.color;
    this.stylerControls.border.start.value = this.parseValueForInput(
      css.border.start
    );
    this.stylerControls.border.end.value = this.parseValueForInput(
      css.border.end
    );
    this.stylerControls.border.top.value = this.parseValueForInput(
      css.border.top
    );
    this.stylerControls.border.bottom.value = this.parseValueForInput(
      css.border.bottom
    );
    this.stylerControls.radius.tl.value = this.parseValueForInput(
      css.radius.tl
    );
    this.stylerControls.radius.tr.value = this.parseValueForInput(
      css.radius.tr
    );
    this.stylerControls.radius.br.value = this.parseValueForInput(
      css.radius.br
    );
    this.stylerControls.radius.bl.value = this.parseValueForInput(
      css.radius.bl
    );
    const radiusMax = Math.ceil(bounds.height / 2);
    this.stylerControls.radius.tl.setAttribute("max", radiusMax);
    this.stylerControls.radius.tr.setAttribute("max", radiusMax);
    this.stylerControls.radius.br.setAttribute("max", radiusMax);
    this.stylerControls.radius.bl.setAttribute("max", radiusMax);
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const uiWidth = this.UIRoot.offsetWidth || 300;
    const uiHeight = this.UIRoot.offsetHeight || 150;
    if (x + uiWidth > windowWidth) x = windowWidth - uiWidth - 10;
    if (y + uiHeight > windowHeight) y = windowHeight - uiHeight - 10;
    x = Math.max(x, 10);
    y = Math.max(y, 10);
    this.UIRoot.style.opacity = "1";
    this.UIRoot.style.pointerEvents = "";
    this.UIRoot.classList.remove("variant_start");
    if (bounds.x + bounds.width >= windowWidth - 160)
      this.UIRoot.classList.add("variant_start");
    const uniqueClass = currentElement.getAttribute("data-sk");
    const specificCn = this.generateCssPath(currentElement);
    const selector = `${specificCn}[data-sk="${uniqueClass}"]`;
    this.activeSelectorId = selector;
    if (!this.flags[selector]) this.flags[selector] = this.freshFlags();
    this.UIRoot.classList.add("state-reveal");
    setTimeout(() => this.UIRoot.classList.remove("state-reveal"), 3000);
    this.createKey(selector, currentElement);
  }

  freshFlags() {
    return {
      padding: false,
      border: false,
      radius: false,
      colors: false,
      accentColors: false,
      background: false,
    };
  }

  createGradientString(gradientConfig) {
    const _gc = gradientConfig;
    let str = "";
    function createStopsString(gradientConfig) {
      const _gc = gradientConfig;
      let res = "";
      switch (_gc.type) {
        case "linear":
        case "radial":
          return _gc.stops.map((s) => `${s[0]} ${s[1] * 100}%`).join(",");
        case "conic":
          return _gc.stops.map((s) => `${s[0]} ${s[1] * 360}deg`).join(",");
      }
      return res;
    }

    const stopsString = createStopsString(_gc);

    switch (_gc.type) {
      case "linear":
        return (str = `linear-gradient(${_gc.angle}deg, ${stopsString})`);
      case "radial":
        return (str = `radial-gradient(${_gc.angle}, ${stopsString})`);
      case "conic":
        return (str = `conic-gradient(${stopsString})`);
    }

    return str;
  }

  hideUI() {
    if (!this.UIRoot) return;
    this.isStopped = false;
    this.UIRoot.style.opacity = "0";
    this.UIRoot.style.pointerEvents = "none";
  }

  updateControl(group, control, value) {
    this.stylerControls[group][control].style.background = value;
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
    if (!color) {
      color = _t.skin[_t.activeSelectorId].background.main;
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

    const SKPickerInstance = new SKPicker(gradientState);
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
