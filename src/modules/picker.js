import * as _ from "./utils";
import Moveable from "./moveable";
const tinycolor = require("tinycolor2");

export default class SKPicker {
  constructor(rootElement, currentColor) {
    this.rootElement = rootElement || document.body;
    this.root = null;
    this.canvas = null; // <div> container
    this.canvasEl = null; // actual <canvas>
    this.ctx = null;
    this.currentColor = tinycolor(currentColor).toHexString();

    this._outsideClickHandler = null; // ADDED
    this.swatchesWrapper = null;
    this.swatchColors = [];
    this.inputEl = null;
    this._initializingActive = true;
    this.swatches = null;
    this._eventBindings = [];
    this._eventListener = {
      init: [],
      save: [],
      hide: [],
      show: [],
      clear: [],
      change: [],
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

  _rePositioningPicker() {
    const el = this.root;
    const eb = el.getBoundingClientRect();
    el.style.top = `${(window.innerHeight - eb.height) / 2}px`;
    el.style.left = `${(window.innerWidth - eb.width) / 2}px`;
  }

  createStyle() {
    const styleEl = document.createElement("style");
    const style = `
    .sk_picker_root{
    display: none;
    --input_size: 32px;
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
    padding: 12px;
    border-radius: 4px;
    flex-direction: column;
    row-gap: 8px;
    }
    .sk_picker_root.state_visible{
    display: flex;
    }
    .sk_picker_input{
    appearance: none;
    height: var(--input_size);
    padding: 0 8px;
    outline: none;
    border: none;
    background: var(--sk_dominantBg);
    color: var(--sk_dominantTxt2);
    width: 100%;
    flex-grow: 1;
    min-width: 1px;
    border-radius: 4px;
    border: 1px solid var(--sk_dominantBg2);
    }
    .sk_picker_controls_row{
    display: flex;
    align-items: center;
    column-gap: 6px;
    }
    .sk_picker_sliders{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 8px;
    background: var(--sk_dominantBgHover);
    border: 1px solid var(--sk_dominantBg2);
    border-radius: 4px;
    flex-direction: column;
    row-gap: 6px;
    }
    .sk_picker_solid{
    height: var(--solid_size);
    width: var(--solid_size);
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid var(--sk_dominantTxt);
    }
    .sk_picker_colors{
    overflow-y: auto;
    flex-wrap: wrap;
    display: flex;
    row-gap: 4px;
    column-gap: 4px;
    max-height: 80px;
    padding: 8px;
    display: flex;
    background: var(--sk_dominantBgHover);
    border: 1px solid var(--sk_dominantBg2);
    border-radius: 4px;
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
      width: 12px;
      height: 24px;
      border: 3px solid black;
      border-radius: 6px;
      z-index: 10;
      top: 50%;
    transform: translateY(-50%);yya
    }

    .sk_picker_canvas_root{
        width: 100%;
        height: 80px;
        background: var(--sk_dominantShadow);
        border-radius: 8px;
        border: 1px solid var(--sk_dominantBgHover);
    }

    .sk_picker_canvas_hue{
      position: relative;
      height: 100%;
      border-radius: inherit;
    }

    .sk_picker_canvas_hand{
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid black;
    border-radius: 10px;
    }
   .sk_picker_btn {
    appearance: none;
    border: 1px solid var(--sk_dominantBg2);
    text-align: center;
    height: var(--input_size);
    text-decoration: none;
    background-color: var(--sk_dominantBgHover);
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
    }
    .sk_picker_btn.variant_primary{
    width: 100%;
    background-color: var(--sk_accentBg);
    color: var(--sk_accentTxt);
    }
    .sk_picker_btn.variant_icon{
    height: var(--input_size);
    width: var(--input_size);
    }
    .sk_picker_actions_wrapper {
    padding: 8px;
    display: flex;
    background: var(--sk_dominantBgHover);
    border: 1px solid var(--sk_dominantBg2);
    border-radius: 4px;
    flex-direction: column;
    align-items: stretch;
    row-gap: 6px;
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

  show() {
    if (!this.isOpen()) {
      this.root.classList.add("state_visible");
      this._rePositioningPicker();
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

  _updateOutput(eventSource) {
    const _c = this._color;

    this.inputEl.value = tinycolor(_c).toHexString();
    if (!this._initializingActive && this._recalc) {
      this._emit("change", _c, eventSource, this);
    }
  }

  createPicker() {
    let _that = this;
    const root = document.createElement("div");
    root.className = "sk_picker_canvas_root";

    const hue = document.createElement("div");
    hue.className = "sk_picker_canvas_hue";

    const hand = document.createElement("div");
    hand.className = "sk_picker_canvas_hand";

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
        // Update the input field only if the user is currently not typing
        if (_that._recalc) {
          // Calculate saturation based on the position
          _sv.s = x * 100;

          // Calculate the value
          _sv.v = 100 - y * 100;

          // Prevent falling under zero
          _sv.v < 0 ? (_sv.v = 0) : 0;
          _that._updateOutput("slider");
        }

        // Set picker and gradient color
        const _chl = tinycolor(_sv).toHsl();
        this.element.style.background = _chl;
        this.wrapper.style.background = `
              linear-gradient(to top, rgba(0, 0, 0, ${_chl.a}), transparent),
              linear-gradient(to left, hsla(${_chl.h}, 100%, 50%, ${_chl.a}), rgba(255, 255, 255, ${_chl.a}))
          `;
        let _chx = tinycolor(_chl).toHexString();
        // Change current color
        // currentColor.style.setProperty("--pcr-color", cssRGBaString);
        _that.setBackground(_chx, "picker_canvas");
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
          // Calculate saturation based on the position

          hsl.h = v * 360;

          // Prevent falling under zero
          _that._updateOutput("slider");
        }
        let _chx = tinycolor(hsl).toHexString();
        // Set picker and gradient color

        // Set picker and gradient color

        _that.slSlider.trigger();
        this.element.style.background = _chx;
        _that.setBackground(_chx, "picker_hue");
      },
    });

    return root;
  }

  updateControls() {
    // this.input.value = this.currentColor;
  }

  // ADDED: auto-destroy for "input" or "outside"
  setBackground(color, source = "no") {
    let _color = tinycolor(color).toHexString();

    // Update output if recalculation is enabled
    // Restore old state

    this._color = _color;
    this._emit("change", _color, source, this);

    return true;
  }

  createUI() {
    // 1. Create the picker’s root container
    this.root = document.createElement("div");
    this.root.className = "sk_picker_root";

    // 3. Create a container for color swatches
    this.swatchesWrapper = document.createElement("div");
    this.swatchesWrapper.className = "sk_picker_colors sk_picker_scroll";

    // We’ll store swatch listeners in an array so we can remove them later

    this.solids.forEach((color) => this.addSwatch(color));

    this.saturationControl = this.createPicker();
    this.hueControl = this.createSlider("hue");

    // 6. Create an input field
    this.inputEl = document.createElement("input");
    this.inputEl.type = "text";
    this.inputEl.className = "sk_picker_input";

    // 7. Create an eyedropper button (optional)
    this.eyedropperTrigger = document.createElement("button");
    this.eyedropperTrigger.className = "sk_picker_btn variant_icon";
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

    const slidersWrapper = document.createElement("div");
    slidersWrapper.className = "sk_picker_sliders";
    slidersWrapper.appendChild(this.saturationControl);
    slidersWrapper.appendChild(this.hueControl);

    const actionsWrapper = document.createElement("div");
    actionsWrapper.className = "sk_picker_actions_wrapper";

    const inputsWrapper = document.createElement("div");
    inputsWrapper.className = "sk_picker_controls_row";
    inputsWrapper.appendChild(this.inputEl);
    inputsWrapper.appendChild(this.eyedropperTrigger);

    this.applyAndClose = document.createElement("button");
    this.applyAndClose.className = "sk_picker_btn variant_primary";
    this.applyAndClose.innerText = "Apply";

    actionsWrapper.appendChild(inputsWrapper);
    actionsWrapper.appendChild(this.applyAndClose);

    // 8. Append all elements to their containers
    this.root.appendChild(slidersWrapper); // Input goes into controls
    this.root.appendChild(this.swatchesWrapper); // Swatches container
    this.root.appendChild(actionsWrapper); // Actions

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
    this._bindEvents();
    this.createStyle();
    this._initializingActive = false;
    this.setBackground(this.currentColor);
    // Update slider and palette
    let _hsv = tinycolor(this._color).toHsv();
    this.hSlider.update(_hsv.h / 360);
    this.slSlider.update(_hsv.s / 100, 1 - _hsv.v / 100);
    this._emit("init");
  }

  _bindEvents() {
    let that = this;
    const { root, applyAndClose, inputEl } = this;
    this._eventBindings.push(
      // Save and hide / show picker
      _.on(
        this.applyAndClose,
        "click",
        () => {
          // let hexColor = that._color.toHEXA().toString();
          // !this.setBackground(hexColor) && this.hide();
          this.isOpen() ? this.hide() : this.show();
        }
        // this.isOpen() ? this.hide() : this.show()
      ),

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
        // Fire listener if initialization is finish and changed color was valid
        let _c = tinycolor(e.target.value).toHexString();
        this._color = _c;
        if (this.setBackground(_c) && !this._initializingActive) {
          this._emit("change", this._color, "input", this);
          this._emit("changestop", "input", this);
        }

        e.stopImmediatePropagation();
      }),

      // Detect user input and disable auto-recalculation
      _.on(inputEl, ["focus", "blur"], (e) => {
        this._recalc = e.type === "blur";
        this._recalc && this._updateOutput(null);
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
          this._emit("swatchselect", _c);
          this._emit("change", _c, "swatch", this);
        })
      );

      return true;
    }

    return false;
  }
}
