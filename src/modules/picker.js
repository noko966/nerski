import * as _ from "./utils";
import Moveable from "./moveable";
const tinycolor = require("tinycolor2");

export default class SKPicker {
  constructor(rootElement, currentColor, mode, gradientConfig) {
    this.rootElement = rootElement || document.body;
    this.root = null;

    this.icons = {
      eyeDropper: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1374 9.21573L5.00012 17L2.15698 17.8432L2.50012 15L10.7844 6.86279" stroke="#A5A5A5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.7332 3.67055C17.2391 4.90977 16.4313 6.33722 15.4744 7.72545L14.9097 9.96075C14.8156 10.3215 14.3685 10.447 14.1019 10.1804L10.7842 6.86271L9.81951 5.898C9.55285 5.63134 9.67834 5.18428 10.047 5.09016L12.1568 4.56467C13.5685 3.57643 15.0274 2.73722 16.2979 2.23526C16.7607 2.06271 17.2077 2.1882 17.4901 2.47839C17.7881 2.76859 17.9293 3.21565 17.7411 3.67055H17.7332Z" stroke="#A5A5A5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
      removeStop: `
<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.02026 1L5.02026 5" stroke="#A5A5A5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.979981 5L4.97998 1" stroke="#A5A5A5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    };

    this._mode = mode || "color";

    this._gradientConfig = gradientConfig || {};

    if (this._mode === "gradient") {
      this.currentGradientStopsObj = {};
      this._gradientConfig.stops.forEach((s, i) => {
        this.currentGradientStopsObj[`gradStop${i}`] = {
          color: s,
        };
      });
    }

    this.gradient = {
      wrapperEl: null,
      previewEl: null,
      stopsControlWrapper: null,
      stopsWrapperEl: null,
      type: this._gradientConfig.type || "linear",
      angle: this._gradientConfig.angle || 90,
      stops: this.currentGradientStopsObj,
      activeStopId: "gradStop0",
    };

    this._outsideClickHandler = null; // ADDED
    this.swatchesWrapper = null;
    this.swatchColors = [];
    this.inputEl = null;
    this._initializingActive = true;
    this.swatches = null;
    this.gradientRoot = null;
    this.gradientStopsWrapper = null;
    this.gradientColorStops = [];
    this._eventBindings = [];
    this._eventListener = {
      init: [],
      save: [],
      hide: [],
      show: [],
      clear: [],
      change: [],
      gradientchange: [],
      changestop: [],
      cancel: [],
      swatchselect: [],
    };

    this._color = tinycolor(currentColor).toHexString();

    this._recalc = true;

    this.solids = [
      "#1ABC9C",
      "#3498DB",
      "#FEE75C",
      "#9B59B6",
      "#E91E63",
      "#F1C40F",
      "#34495E",
      "#11806A",
      "#1F8B4C",
      "#206694",
      "#71368A",
      "#AD1457",
      "#C27C0E",
      "#A84300",
      "#992D22",
      "#979C9F",
      "#7F8C8D",
      "#BCC0C0",
      "#2C3E50",
      "#5865F2",
      "#99AAb5",
      "#2C2F33",
      "#23272A",
      "#ffe83f",
      "#9fff5b",
      "#70e2ff",
      "#cd93ff",
      "#09203f",
      "#092f2e",
      "#DB3B61",
      "#EF3F61",
      "#3A3A59",
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

  _rePositioningPicker(x, y) {
    let _x = x;
    let _y = y;
    const el = this.root;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const uiWidth = el.offsetWidth;
    const uiHeight = el.offsetHeight;

    if (_x + uiWidth > windowWidth) {
      _x = windowWidth - uiWidth - 10;
    }
    if (_y + uiHeight > windowHeight) {
      _y = windowHeight - uiHeight - 10;
    }

    _x = Math.max(_x, 10);
    _y = Math.max(_y, 10);
    el.style.left = `${_x}px`;
    el.style.top = `${_y}px`;
  }

  createStyle() {
    const styleEl = document.createElement("style");
    const style = `
    .sk_picker_root{
    display: none;
    --input_size: 28px;
    --solid_size: 24px;
    position: fixed;
    width: 250px;
    height: auto;
    z-index: calc(var(--sk_zind) + 100);
    top: 0px;
    transform: translate(0, 0);
    border: none;
    background: var(--sk_dominantBg);
    border: 1px solid var(--sk_dominantBgHover);
    backdrop-filter: blur(5px);
    flex-direction: column;
    align-items: stretch;
    padding: 6px;
    border-radius: 4px;
    flex-direction: column;
    row-gap: 4px;
    box-shadow: 0 0 0 4px var(--sk_dominantShadow);
    }
    .sk_picker_root.state_visible{
    display: flex;
    }
    .sk_picker_controls_row{
    display: flex;
    align-items: center;
    column-gap: 6px;
    }
    .sk_widget_block{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 6px;
    background: var(--sk_dominantBg2);
    border: 1px solid var(--sk_dominantBg2Hover);
    border-radius: 4px;
    flex-direction: column;
    row-gap: 4px;
    }
    .sk_picker_solid{
    height: var(--solid_size);
    width: var(--solid_size);
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid var(--sk_dominantBg3Hover);
    }
    .sk_swatches_wrapper{
        overflow-y: auto;
    overflow-x: hidden;
    flex-wrap: wrap;
    display: flex;
    row-gap: 2px;
    column-gap: 2px;
    max-height: 60px;
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
    .sk_picker_slider_track {
      height: 16px;
      border-radius: 4px;
      border: 1px solid var(--sk_dominantBg);
      background: var(--bg);
    }
    .sk_picker_slider_root.variant_hue{
      --bg: linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%);
    }
    .sk_picker_slider_root{
      --bg: transparent;
      position: relative;
      width: 100%;
    }
    .sk_picker_slider_hand{
      position: absolute;
      width: 16px;
      height: 16px;
      border: 1px solid var(--sk_dominantBg3);
      border-radius: 8px;
      z-index: 10;
      box-shadow: inset 0 0 0px 2px var(--sk_dominantBg2);
    cursor: pointer;
    }

    .sk_picker_canvas_root{
        width: 100%;
        height: 60px;
        border-radius: 4px;
        border: 1px solid var(--sk_dominantBg);
    }

    .sk_picker_canvas_hue{
      position: relative;
      height: 100%;
      border-radius: inherit;
    }


   .sk_picker_btn {
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
    .sk_picker_btn.variant_primary{
    width: 100%;
    background-color: var(--sk_accentBg);
    color: var(--sk_accentTxt);
    }
    .sk_picker_btn.variant_icon{
    height: var(--input_size);
    width: var(--input_size);
    padding: 0;
    }

    .sk_picker_gradient_stops_wrapper{
display: flex;
    flex-direction: row;
    align-items: center;
        column-gap: 8px;
}

.sk_picker_gradient_stop {
    position: relative;
    width: 28px;
    height: 28px;
    border: 1px solid var(--sk_dominantBgHover);
    border-radius: 4px;
    z-index: 10;
    }
    .sk_picker_gradient_stop.state_ative{
      box-shadow: 0 0 0 2px var(--sk_dominantShadow);
    }
    .sk_picker_gradient_stop_remove{
    appearance: none;
        position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sk_dominantTxt3);
    background: var(--sk_dominantBg3);
    border: 1px solid var(--sk_dominantBg3Hover);
    appearance: none;
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    transform: translate(50%, -50%);
    border-radius: 4px;
    z-index: 10;
    cursor: pointer;
    padding: 0;
    }

    .sk_picker_gradient_preview {
        height: 32px;
    border-radius: 4px;
    position: relative;
    background-image: var(--grad);
    width: 100%;
    border: 1px solid var(--sk_dominantBg3Hover);
    }
    .sk_picker_input {
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
    .sk_widget_separator_hor{
        width: 100%;
    height: 1px;
    flex-shrink: 0;
    padding: 0 12px;
    }
    .sk_widget_separator_hor::before{
    height: 1px;
    background: var(--sk_dominantBgHover);
    width: 100%;
    content: '';
    display: block;
    }
    .sk_picker_tabs_wrapper{
    display: flex;
    align-items: center;
    border: 1px solid var(--sk_dominantBg);
    border-radius: 8px;
    overflow: hidden;
    }
    .sk_picker_tab{
    flex: 1;
    cursor: pointer;
    }
    .sk_picker_tab > input{
    display: none;
    }
    .sk_picker_tab > span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    height: var(--input_size);
    background: var(--sk_dominantBg);
    color: var(--sk_dominantTxt2);
    }
    .sk_picker_tab > input:checked + span {
    background: var(--sk_dominantBg2);
    }
    .sk_widget_block_section{
    display: flex;
    align-items: center;
    padding: 2px;
    column-gap: 6px;
    }
    .sk_grow{
    flex-grow: 1;
    min-width: 1px;
    }
    .sk_widget_row {
    display: flex;
    align-items: center;
}
    `;
    styleEl.innerHTML = style;
    styleEl.id = "sk_picker_style_element";

    this.rootElement.appendChild(styleEl);
    return style;
  }

  isOpen() {
    return this.root.classList.contains("state_visible");
  }

  show(x = 0, y = 0) {
    if (!this.isOpen()) {
      this.root.classList.add("state_visible");
      this._rePositioningPicker(x, y);
      this.updateSliders();
      this._emit("show", this);
      return this;
    }
  }

  hide() {
    if (this.isOpen()) {
      this.root.classList.remove("state_visible");
      this._emit("hide", "close", this);
      return true;
    }

    return false;
  }

  on(event, cb) {
    this._eventListener[event].push(cb);
    return this;
  }

  off(event, cb) {
    const callBacks = this._eventListener[event] || [];
    const index = callBacks.indexOf(cb);

    if (~index) {
      callBacks.splice(index, 1);
    }

    return this;
  }

  _emit(event, ...args) {
    this._eventListener[event].forEach((cb) => cb(...args, this));
  }

  createPicker() {
    let _that = this;
    const root = document.createElement("div");
    root.className = "sk_picker_canvas_root";

    const hue = document.createElement("div");
    hue.className = "sk_picker_canvas_hue";

    const hand = document.createElement("div");
    hand.className = "sk_picker_slider_hand";

    root.appendChild(hue);
    hue.appendChild(hand);

    this.pickerRoot = root;

    this.slSlider = Moveable({
      element: hand,
      wrapper: root,

      onstop: () => _that._emit("changestop", "slider", _that),
      onchange(x, y) {
        const c = _that._color;
        // const { lastColor, currentColor } = _root.preview;
        const _sv = tinycolor(c).toHsv();
        console.log(_sv);

        // Update the input field only if the user is currently not typing
        if (_that._recalc) {
          // Calculate saturation based on the position
          _sv.s = x;

          // Calculate the value
          _sv.v = 1 - y;

          // Prevent falling under zero
          _sv.v < 0 ? (_sv.v = 0) : 0;

          this.wrapper.style.background = `
              linear-gradient(to top, rgba(0, 0, 0, 1), transparent),
              linear-gradient(to left, hsl(${_sv.h}, 100%, 50%), rgba(255, 255, 255, 1))
          `;
          let _chx = tinycolor(_sv).toHexString();
          // Change current color
          // currentColor.style.setProperty("--pcr-color", cssRGBaString);
          _that.setBackground(_chx, "picker_canvas");
          _that.inputEl.value = _chx;
        }
      },
    });

    return root;
  }

  createSlider(type) {
    let _that = this;
    const root = document.createElement("div");
    const hand = document.createElement("div");
    const track = document.createElement("div");
    let variantCN;
    switch (type) {
      case "hue":
        variantCN = "variant_hue";
        break;

      default:
        variantCN = "";
        break;
    }

    root.className = "sk_picker_slider_root " + variantCN;
    hand.className = "sk_picker_slider_hand";
    track.className = "sk_picker_slider_track";

    root.appendChild(hand);
    root.appendChild(track);
    this.hSlider = Moveable({
      lock: "v",
      element: hand,
      wrapper: root,

      onstop: () => _that._emit("changestop", "slider", _that),
      onchange(v) {
        let hsl = tinycolor(_that._color).toHsl();
        // Update the input field only if the user is currently not typing
        if (_that._recalc) {
          hsl.h = v * 360;

          // Prevent falling under zero
          let _chx = tinycolor(hsl).toHexString();
          // Set picker and gradient color

          _that.slSlider.trigger();
          this.element.style.background = _chx;
          _that.setBackground(_chx, "picker_hue");
          _that.inputEl.value = _chx;
        }
      },
    });

    return root;
  }

  // ADDED: auto-destroy for "input" or "outside"
  setBackground(color, source = "no") {
    let _color = tinycolor(color).toHexString();

    this._color = _color;
    if (this._mode === "gradient") {
      this.gradient.stops[this.gradient.activeStopId].color = _color;
      this.createGradientStops();
      const gradient = this.generateGradientString();
      this._emit("gradientchange", gradient, source, this);
    } else {
      this._emit("change", _color, source, this);
    }

    return true;
  }

  createUI() {
    this.root = document.createElement("div");
    this.root.className = "sk_picker_root";

    this.swatchesWrapper = document.createElement("div");
    this.swatchesWrapper.className = "sk_swatches_wrapper sk_picker_scroll";

    const swatchesWidget = document.createElement("div");
    swatchesWidget.className = "sk_widget_block";

    this.solids.forEach((color) => this.addSwatch(color));

    this.saturationControl = this.createPicker();
    this.hueControl = this.createSlider("hue");

    // 6. Create an input field
    this.inputEl = document.createElement("input");
    this.inputEl.type = "text";
    this.inputEl.className = "sk_picker_input sk_grow";

    // 7. Create an eyedropper button (optional)
    this.eyedropperTrigger = document.createElement("button");
    this.eyedropperTrigger.className = "sk_picker_btn variant_icon";
    this.eyedropperTrigger.innerHTML = this.icons.eyeDropper;

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

    this._mode === "gradient" && this.showGradientSlider();

    const slidersWrapper = document.createElement("div");
    slidersWrapper.className = "sk_widget_block";
    slidersWrapper.appendChild(this.saturationControl);
    slidersWrapper.appendChild(this.createSeparator());
    slidersWrapper.appendChild(this.hueControl);

    const actionsWrapper = document.createElement("div");
    actionsWrapper.className = "sk_widget_footer_row";

    const inputsWrapper = document.createElement("div");
    inputsWrapper.className = "sk_picker_controls_row";
    inputsWrapper.appendChild(this.inputEl);
    inputsWrapper.appendChild(this.eyedropperTrigger);

    this.applyAndClose = document.createElement("button");
    this.applyAndClose.className = "sk_picker_btn variant_primary";
    this.applyAndClose.innerText = "Apply";
    slidersWrapper.appendChild(this.createSeparator());
    slidersWrapper.appendChild(inputsWrapper);
    actionsWrapper.appendChild(this.applyAndClose);

    // 8. Append all elements to their containers
    this.root.appendChild(slidersWrapper); // Input goes into controls
    this.root.appendChild(swatchesWidget);
    swatchesWidget.appendChild(this.swatchesWrapper);

    this.root.appendChild(actionsWrapper); // Actions

    // Finally, attach the entire picker to the designated root element
    this.rootElement.appendChild(this.root);

    // 9. Return the root, in case needed
    return this.root;
  }

  createSeparator() {
    const sw = document.createElement("div");
    sw.className = "sk_widget_separator_hor";
    return sw;
  }

  createDiv(cn) {
    const el = document.createElement("div");
    el.className = cn || "sk_picker_default_el";
    return el;
  }

  updateSliders() {
    let _hsv = tinycolor(this._color).toHsv();
    this.hSlider.update(_hsv.h / 360);
    this.slSlider.update(_hsv.s, 1 - _hsv.v);
    this.inputEl.value = this._color;
    return true;
  }

  init() {
    this.createUI();
    this._bindEvents();
    this.createStyle();
    this._initializingActive = false;
    this.setBackground(this._color);

    this._emit("init");
  }

  _bindEvents() {
    let that = this;
    const { root, applyAndClose, inputEl } = this;
    this._eventBindings.push(
      _.on(this.applyAndClose, "click", () => {
        this.isOpen() ? this.hide() : this.show();
      }),

      // Close with escape key
      _.on(
        document,
        "keyup",
        (e) =>
          this.isOpen() &&
          (e.key === "Escape" || e.code === "Escape") &&
          this.hide()
      ),
      _.on(
        document,
        ["touchstart", "mousedown"],
        (e) => {
          if (
            this.isOpen() &&
            !_.eventPath(e).some((el) => el === root || el === applyAndClose)
          ) {
            this.hide();
          }
        },
        { capture: true }
      ),

      // User input
      _.on(inputEl, ["keyup", "input"], (e) => {
        let _c = tinycolor(e.target.value).toHexString();
        this.setBackground(_c);
        e.stopImmediatePropagation();
      }),

      // Detect user input and disable auto-recalculation
      _.on(inputEl, ["focus", "blur"], (e) => {
        this._recalc = e.type === "blur";
        this._recalc && this.updateSliders();
      })
    );
  }

  destroy() {
    const root = this.root;
    this._eventBindings.forEach((args) => _.off(...args));

    // 3. Remove eyedropper listener if present
    if (this.eyedropperTrigger && this._eyedropperHandler) {
      this.eyedropperTrigger.removeEventListener(
        "click",
        this._eyedropperHandler
      );
    }

    // 4. Remove the root from the DOM
    if (this.root.parentElement) {
      this.root.parentElement.removeChild(root);
    }

    // 5. Remove the style element if you appended one with a known ID
    const styleEl = document.getElementById("sk_picker_style_element");
    if (styleEl) {
      styleEl.remove();
    }

    Object.keys(this).forEach((key) => (this[key] = null));
  }

  addSwatch(color) {
    const _c = tinycolor(color).toHexString();

    if (_c) {
      const { swatchColors, swatchesWrapper } = this;

      const el = document.createElement("div");
      el.className = "sk_picker_solid";
      el.style.background = _c;

      // Append element and save swatch data
      swatchesWrapper.appendChild(el);
      swatchColors.push({ el, _c });

      // Bind event
      this._eventBindings.push(
        _.on(el, "click", () => {
          this.setBackground(_c);
          this.updateSliders();
          this._emit("swatchselect", _c);
        })
      );

      return true;
    }

    return false;
  }

  setActiveGradientStop(key) {
    this.gradient.activeStopId = key;
    this.setBackground(this.gradient.stops[key].color);
    this.updateSliders();
  }

  generateGradientString() {
    let str = "";

    const keys = Object.keys(this.gradient.stops);

    keys.sort((a, b) => {
      const numA = parseInt(a.replace("gradStop", ""), 10);
      const numB = parseInt(b.replace("gradStop", ""), 10);
      return numA - numB;
    });

    const stopsString = keys
      .map((key) => this.gradient.stops[key].color)
      .join(", ");

    const stopsArray = keys.map((key) => this.gradient.stops[key].color);

    if (this.gradient.type === "linear") {
      str = `linear-gradient(${this.gradient.angle}deg, ${stopsString})`;
    } else if (this.gradient.type === "radial") {
      str = `radial-gradient(circle at 50% 50%, ${stopsString})`;
    } else if (this.gradient.type === "conic") {
      str = `conic-gradient(from 90deg at 50% 50%, ${stopsString})`;
    }

    return {
      str: stopsArray.length > 1 ? str : stopsArray[0],
      angle: this.gradient.angle,
      type: this.gradient.type,
      stops: stopsArray,
    };
  }

  addGradientSwatch(color, key, active = false) {
    const c = tinycolor(color).toHexString();
    if (c) {
      const el = document.createElement("div");
      el.className = `sk_picker_gradient_stop ${active ? "state_ative" : ""}`;
      el.style.setProperty("--bg", color);
      el.style.background = `var(--bg)`;

      this.gradient.stopsWrapperEl.appendChild(el);

      el.addEventListener("click", (e) => {
        this.setActiveGradientStop(key);
      });

      const removeBtn = document.createElement("button");
      removeBtn.className = "sk_picker_gradient_stop_remove";
      removeBtn.innerHTML = this.icons.removeStop;
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        delete this.gradient.stops[key];
        this.createGradientStops();
      });
      el.appendChild(removeBtn);

      return true;
    }
    return false;
  }

  showGradientSlider(onChangeCallback) {
    this.createGradientSlider();

    const addStopBtn = document.createElement("button");
    addStopBtn.innerText = "+";
    addStopBtn.className = "sk_picker_btn variant_icon";
    addStopBtn.addEventListener("click", () => {
      const keys = Object.keys(this.gradient.stops);

      let maxIndex = 0;
      keys.forEach((key) => {
        const num = parseInt(key.replace("gradStop", ""), 10);
        if (!isNaN(num) && num > maxIndex) {
          maxIndex = num;
        }
      });

      const newColor = this.gradient.stops[`gradStop${maxIndex}`].color;

      const nextIndex = maxIndex + 1;
      const newKey = `gradStop${nextIndex}`;

      this.gradient.stops[newKey] = { color: newColor };

      this.createGradientStops();
    });

    const widgetSection = document.createElement("div");
    widgetSection.className = "sk_widget_block_section";

    const angleInput = document.createElement("input");
    angleInput.className = "sk_picker_input";
    angleInput.type = "number";
    angleInput.value = this.gradient.angle;

    const angleRangeSlider = document.createElement("input");
    angleRangeSlider.className = "sk_picker_range";
    angleRangeSlider.type = "range";
    angleRangeSlider.value = this.gradient.angle;
    angleRangeSlider.min = 0;
    angleRangeSlider.max = 360;
    angleRangeSlider.step = 10;

    this._eventBindings.push(
      _.on(angleInput, "change", (e) => {
        this.gradient.angle = e.target.value;
        this.setBackground(this._color);
        angleRangeSlider.value = e.target.value;
      }),
      _.on(angleRangeSlider, "change", (e) => {
        this.gradient.angle = e.target.value;
        this.setBackground(this._color);
        angleInput.value = e.target.value;
      })
    );

    const gradientTypeContainer = document.createElement("div");
    gradientTypeContainer.className = "sk_picker_tabs_wrapper";

    const gradientTypes = ["linear", "radial", "conic"];

    gradientTypes.forEach((type) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.id = type;
      radio.name = "gradientType";
      radio.value = type;

      if (this.gradient.type === type) {
        radio.checked = true;
      }

      this._eventBindings.push(
        _.on(radio, "change", (e) => {
          if (e.target.checked) {
            this.gradient.type = e.target.value;
            this.setBackground(this._color);
          }
        })
      );

      // Create a label for readability
      const label = document.createElement("label");
      label.className = "sk_picker_tab";
      label.htmlFor = type;
      const text = document.createElement("span");
      text.innerText = type.charAt(0).toUpperCase() + type.slice(1);

      // Append radio and label to the container
      // gradientTypeContainer.appendChild(radio);
      label.appendChild(radio);
      label.appendChild(text);
      gradientTypeContainer.appendChild(label);
    });
    this.gradient.stopsControlWrapper.appendChild(addStopBtn);
    this.gradient.wrapperEl.appendChild(this.createSeparator());
    widgetSection.appendChild(angleRangeSlider);
    widgetSection.appendChild(angleInput);
    this.gradient.wrapperEl.appendChild(widgetSection);
    this.gradient.wrapperEl.appendChild(this.createSeparator());
    this.gradient.wrapperEl.appendChild(gradientTypeContainer);

    this.createGradientStops();
  }

  createGradientSlider() {
    this.gradient.wrapperEl = document.createElement("div");
    this.gradient.wrapperEl.className = "sk_widget_block";

    this.gradient.previewEl = document.createElement("div");
    this.gradient.previewEl.className = "sk_picker_gradient_preview";

    this.gradient.stopsControlWrapper = document.createElement("div");
    this.gradient.stopsControlWrapper.className = "sk_widget_row";

    this.gradient.stopsWrapperEl = document.createElement("div");
    this.gradient.stopsWrapperEl.className =
      "sk_picker_gradient_stops_wrapper sk_grow";

    this.gradient.wrapperEl.appendChild(this.gradient.previewEl);
    this.gradient.wrapperEl.appendChild(this.gradient.stopsControlWrapper);
    this.gradient.stopsControlWrapper.appendChild(this.gradient.stopsWrapperEl);
    this.root.appendChild(this.gradient.wrapperEl);
  }

  createGradientStops() {
    this.gradient.stopsWrapperEl.innerHTML = "";
    this.gradient.wrapperEl.style.setProperty(
      "--grad",
      this.generateGradientString().str
    );

    // 1) Gather the keys
    const keys = Object.keys(this.gradient.stops);

    // 2) Sort them based on the numeric part after 'gradStop'
    keys.sort((a, b) => {
      const orderA = parseInt(a.replace("gradStop", ""), 10);
      const orderB = parseInt(b.replace("gradStop", ""), 10);
      return orderA - orderB; // ascending order
    });

    keys.forEach((key) => {
      const stopColor = this.gradient.stops[key].color;
      const active = this.gradient.activeStopId === key;

      this.addGradientSwatch(stopColor, key, active);
    });
  }
}
