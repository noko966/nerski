import * as _ from "./utils";
import Moveable from "./moveable";
const tinycolor = require("tinycolor2");

export default class SKPicker {
  static DEFAULT_OPTIONS = {
    disabled: false,
    lockOpacity: false,
    container: document.body,
    swatches: null,
    mode: "color",
    stops: [
      ["#42445a", 0],
      ["#20b6dd", 1],
    ],
    angle: 0,
    type: "linear",
    default: "#42445a",
    closeWithKey: "Escape",
    localSolids: [],
  };
  constructor(opt) {
    this.options = opt = Object.assign({ ...SKPicker.DEFAULT_OPTIONS }, opt);
    this._focusedStop = null;
    this.g_stops = [];
    this.g_angle = this.options.angle;
    this.g_mode = this.options.type;
    this.root = null;

    this.g_modes = ["linear", "radial", "conic"];

    // Liniear angle
    this.g_angles = [
      { angle: 0, name: "to top" },
      { angle: 90, name: "to right" },
      { angle: 180, name: "to bottom" },
      { angle: 270, name: "to left" },
    ];

    // Radial direction
    this.g_direction = "circle at center";
    this.g_directions = [
      { pos: "tl", css: "circle at left top" },
      { pos: "tm", css: "circle at center top" },
      { pos: "tr", css: "circle at right top" },
      { pos: "r", css: "circle at right" },
      { pos: "m", css: "circle at center" },
      { pos: "l", css: "circle at left" },
      { pos: "br", css: "circle at right bottom" },
      { pos: "bm", css: "circle at center bottom" },
      { pos: "bl", css: "circle at left bottom" },
    ];

    this.simplifyEvent = this.simplifyEvent.bind(this);
    this.icons = {
      eyeDropper: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1374 9.21573L5.00012 17L2.15698 17.8432L2.50012 15L10.7844 6.86279" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.7332 3.67055C17.2391 4.90977 16.4313 6.33722 15.4744 7.72545L14.9097 9.96075C14.8156 10.3215 14.3685 10.447 14.1019 10.1804L10.7842 6.86271L9.81951 5.898C9.55285 5.63134 9.67834 5.18428 10.047 5.09016L12.1568 4.56467C13.5685 3.57643 15.0274 2.73722 16.2979 2.23526C16.7607 2.06271 17.2077 2.1882 17.4901 2.47839C17.7881 2.76859 17.9293 3.21565 17.7411 3.67055H17.7332Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
      removeStop: `
<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.02026 1L5.02026 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.979981 5L4.97998 1"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    };

    this.currentColor = opt.default;
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
      gradientchange: [],
      changestop: [],
      cancel: [],
      swatchselect: [],
    };

    this._recalc = true;

    this.solids = [
      ...this.options.localSolids,
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

  static create = (options) => new SKPicker(options);

  createStyle() {
    const styleEl = document.createElement("style");
    const style = `
    .sk_picker_root{
    display: none;
        --input_size: 28px;
    --solid_size: 24px;
    position: fixed;
    height: auto;
    z-index: calc(var(--sk_zind) + 100);
    top: 0px;
    transform: translate(0, 0);
    border: none;
    background: var(--sk_dominantBgHover);
    border: 1px solid var(--sk_dominantBg);
    align-items: stretch;
    padding: 0px;
    border-radius: 4px;
    column-gap: 4px;
    }
    .sk_block_picker {
        width: 200px;
    flex-shrink: 0;
    flex-direction: column;
    }
    .sk_block_picker_wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 8px;
    }
    .sk_picker_root.state_visible{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 8px;
    }
    .sk_picker_controls_row{
    display: flex;
    align-items: center;
    column-gap: 6px;
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
      border-radius: 2px;
      border: 1px solid var(--sk_dominantShadow);
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
          position: relative;
    width: 100%;
    height: 70px;
    border-radius: 2px;
    border: 1px solid var(--sk_dominantShadow);
    }

    .sk_picker_canvas_root::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
background-image:
  linear-gradient(45deg, #ccc 25%, transparent 25%),
  linear-gradient(-45deg, #ccc 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #ccc 75%),
  linear-gradient(-45deg, transparent 75%, #ccc 75%);
background-size:20px 20px;
background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

  .sk_picker_canvas_hue{
    position: relative;
    height: 100%;
    border-radius: inherit;
  }

  .sk_g_picker_mode{
        height: 24px;
    width: 24px;
    position: absolute;
    top: 4px;
    left: 4px;
    border: 2px solid white;
    border-radius: 2px;
    cursor: pointer;
    opacity: 0.25;
    transition: all 0.3s;
    }

    .sk_g_picker_mode::before{
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    transition: all 0.3s;
    }
.sk_g_picker_mode[data-mode=linear]::before {
    height: 2px;
    width: 70%;
    background: white;
    transform: rotate(45deg);
    border-radius: 50em
}

.sk_g_picker_mode[data-mode=radial]::before {
    height: 50%;
    width: 50%;
    border-radius: 100%;
    border: 2px solid white
}

.sk_g_picker_mode[data-mode=conic]::before {
    height: 0;
    width: 0;
    border: 5px solid transparent;
    border-color: white white transparent transparent
}
        

  .sk_g_picker_markers{
    position: relative;
    z-index: 1;
  }
    .sk_g_picker_position{
    height: 80px;
    width: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.3s;
    position: absolute;
    margin: auto;
    }
.sk_g_picker_angle{
    height: 10px;
    width: 10px;
    background: white;
    border-radius: 50%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.3s;
    position: absolute;
    margin: auto;
    opacity: 0.25;
  }
    .sk_g_picker_result{
        position: relative;
    width: 100%;
    height: 70px;
    border-radius: 2px;
    border: 1px solid var(--sk_dominantShadow);
    }
    .sk_g_picker_arrow{
    height: 2px;
    width: 2em;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;
    position: absolute;
    background: white;
    border-radius: 1em;
    margin: auto 0;
    transform-origin: left;
    }
  .sk_g_picker_preview{
    height: 24px;
    width: 100%;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid var(--sk_dominantShadow);
  }

  .sk_picker_gradient_stops_wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
        column-gap: 8px;
}

.sk_g_stop {
    --size: 14px;
    position: absolute;
    width: var(--size);
    height: var(--size);
    margin-left: calc(var(--size) / -2);
    border-radius: 4px;
    background: currentColor;
    z-index: 10;
    }
    .sk_g_stop.state_ative{
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
    .sk_widget_footer_row{
    display: flex;
    align-items: center;
    column-gap: 8px;
    }
    .sk_widget_row {
    display: flex;
    align-items: center;
}
    .sk_widget_block_content.variant_gradient_preview{
    padding-bottom: 16px;
    }
    `;
    styleEl.innerHTML = style;
    styleEl.id = "sk_picker_style_element";

    this.options.container.appendChild(styleEl);
    return style;
  }

  isOpen() {
    return this.root.classList.contains("state_visible");
  }

  show(x = 0, y = 0) {
    if (!this.isOpen()) {
      this.root.classList.add("state_visible");
      this._rePositioningPicker(x, y);
      this.setColorHSVA(this.currentColor);

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

  applyColor() {
    const cssRGBaString = tinycolor(this._color).toRgbString();
    this._lastColor = (() => {
      return this._color;
    })();

    if (!this._initializingActive) {
      this._emit("save", this._color);
    }

    return this;
  }

  setColorHSVA(color) {
    const _t = this;
    const recalc = this._recalc;
    this._recalc = false;
    if (!tinycolor(color).isValid()) {
      return false;
    }

    _t._color = tinycolor(color).toHsv();

    _t._hue.update(_t._color.h / 360);
    if (_t.options.mode === "opacity") {
      _t._opacity.update(_t._color.a);
    }
    _t._palette.update(_t._color.s, 1 - _t._color.v);

    _t.applyColor();
    if (recalc) {
      _t._updateOutput();
    }

    // Restore old state
    _t._recalc = recalc;
    return true;
  }

  _updateOutput(eventSource) {
    const _color = tinycolor(this._color).toHex8String();
    this.inputEl.value = _color;
    if (!this._initializingActive && this._recalc) {
      this._emit("change", _color, eventSource, this);
    }
  }

  getColor() {
    return this._color;
  }

  createPaletteElement() {
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

    this._palette = Moveable({
      element: hand,
      wrapper: hue,

      onstop: () => _that._emit("changestop", "slider", _that),
      onchange(x, y) {
        const color = _that.getColor();

        if (_that._recalc) {
          color.s = x;

          color.v = 1 - y;

          color.v < 0 ? (color.v = 0) : 0;
          _that._updateOutput("slider");
        }

        const cssRGBaString = tinycolor(color).toRgbString();
        this.element.style.background = cssRGBaString;
        this.wrapper.style.background = `
          linear-gradient(to top, rgba(0, 0, 0, ${color.a}), transparent),
          linear-gradient(to left, hsla(${color.h}, 100%, 50%, ${color.a}), rgba(255, 255, 255, ${color.a}))
      `;
      },
    });

    return root;
  }

  createHueElement() {
    let _that = this;
    const root = document.createElement("div");
    const hand = document.createElement("div");
    const track = document.createElement("div");

    root.className = "sk_picker_slider_root variant_hue";
    hand.className = "sk_picker_slider_hand";
    track.className = "sk_picker_slider_track";

    root.appendChild(hand);
    root.appendChild(track);
    this._hue = Moveable({
      lock: "v",
      element: hand,
      wrapper: root,

      onstop: () => _that._emit("changestop", "slider", _that),
      onchange(v) {
        const color = _that.getColor();

        if (_that._recalc) {
          color.h = v * 360;
        }
        this.element.style.backgroundColor = `hsl(${color.h}, 100%, 50%)`;
        _that._palette.trigger();
      },
    });

    return root;
  }

  createOpacityElement() {
    let _that = this;
    const root = document.createElement("div");
    const hand = document.createElement("div");
    const track = document.createElement("div");

    root.className = "sk_picker_slider_root variant_opacity";
    hand.className = "sk_picker_slider_hand";
    track.className = "sk_picker_slider_track";

    root.appendChild(hand);
    root.appendChild(track);
    this._opacity = Moveable({
      lock: "v",
      element: hand,
      wrapper: root,

      onstop: () => _that._emit("changestop", "slider", _that),
      onchange(v) {
        const color = _that.getColor();

        if (_that._recalc) {
          color.a = Math.round(v * 1e2) / 100;
        }
        this.wrapper.style.background = `rgba(0, 0, 0, ${color.a})`;
        this.element.style.background = `rgba(0, 0, 0, ${color.a})`;
        _that._palette.trigger();
      },
    });

    return root;
  }

  createUiHeader(label) {
    const root = document.createElement("div");
    root.className = "sk_widget_block_header";
    root.innerText = label || "label";
    return root;
  }

  createUI() {
    this.root = document.createElement("div");
    this.root.className = "sk_picker_root";
    const pickerBlocksWrapper = document.createElement("div");
    pickerBlocksWrapper.className = "sk_block_picker_wrapper";
    const pickerBlock = document.createElement("div");
    pickerBlock.className = "sk_block_picker sk_widget_collapse_block";
    const g_pickerBlock = document.createElement("div");
    g_pickerBlock.className = "sk_block_picker sk_widget_collapse_block";
    this.swatchesWrapper = document.createElement("div");
    this.swatchesWrapper.className = "sk_swatches_wrapper sk_picker_scroll ";

    const swatchesWidgetRoot = document.createElement("div");
    swatchesWidgetRoot.className = "sk_block_picker sk_widget_collapse_block";
    const swatchesWidget = document.createElement("div");
    swatchesWidget.className = "sk_widget_block_content";

    this.solids.forEach((color) => this.addSwatch(color));

    const paletteElement = this.createPaletteElement();
    const hueElement = this.createHueElement();

    // 6. Create an input field
    this.inputEl = document.createElement("input");
    this.inputEl.type = "text";
    this.inputEl.className = "sk_input_text sk_grow variant_large";

    // 7. Create an eyedropper button (optional)
    this.eyedropperTrigger = document.createElement("button");
    this.eyedropperTrigger.className = "sk_btn variant_icon";
    this.eyedropperTrigger.innerHTML = this.icons.eyeDropper;

    this._eyedropperHandler = () => {
      if ("EyeDropper" in window) {
        const ed = new EyeDropper();
        ed.open()
          .then((colorResult) => {
            if (colorResult && colorResult.sRGBHex) {
              // Use the color from EyeDropper
              this.setColorHSVA(colorResult.sRGBHex);
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

    document.addEventListener("keydown", (event) => {
      if (event.key === "i") {
        this._eyedropperHandler();
      }
    });

    const slidersWrapper = document.createElement("div");
    slidersWrapper.className = "sk_widget_block_content sk_layout_col";
    slidersWrapper.appendChild(paletteElement);
    slidersWrapper.appendChild(this.createSeparator());
    slidersWrapper.appendChild(hueElement);
    if (this.options.mode === "opacity") {
      const opacitySlider = this.createOpacityElement();
      slidersWrapper.appendChild(opacitySlider);
    }

    const actionsWrapper = document.createElement("div");
    actionsWrapper.className = "sk_widget_footer_row";

    const inputsWrapper = document.createElement("div");
    inputsWrapper.className = "sk_picker_controls_row";
    inputsWrapper.appendChild(this.inputEl);
    inputsWrapper.appendChild(this.eyedropperTrigger);

    this.cancelAndClose = document.createElement("button");
    this.cancelAndClose.className = "sk_btn sk_grow";
    this.cancelAndClose.innerText = "Cancel";

    this.applyAndClose = document.createElement("button");
    this.applyAndClose.className = "sk_btn variant_cta sk_grow";
    this.applyAndClose.innerText = "Apply";
    slidersWrapper.appendChild(this.createSeparator());
    slidersWrapper.appendChild(inputsWrapper);
    actionsWrapper.appendChild(this.cancelAndClose);
    actionsWrapper.appendChild(this.applyAndClose);

    pickerBlock.appendChild(this.createUiHeader("picker"));
    pickerBlock.appendChild(slidersWrapper);
    swatchesWidgetRoot.appendChild(this.createUiHeader("swatches"));
    swatchesWidgetRoot.appendChild(swatchesWidget);
    swatchesWidget.appendChild(this.swatchesWrapper);

    this.root.appendChild(pickerBlock);

    pickerBlocksWrapper.appendChild(pickerBlock);
    pickerBlocksWrapper.appendChild(swatchesWidgetRoot);

    if (this.options.mode === "gradient") {
      const gradModeEl = document.createElement("div");
      gradModeEl.className = "sk_g_picker_mode";

      const previewElWrapper = document.createElement("div");
      previewElWrapper.className =
        "sk_widget_block_content sk_layout_col variant_gradient_preview";
      const previewEl = document.createElement("div");
      previewEl.className = "sk_g_picker_preview";
      const resultEl = document.createElement("div");
      resultEl.className = "sk_g_picker_result";

      const posEl = document.createElement("div");
      posEl.className = "sk_g_picker_position";

      const resultMarkers = document.createElement("div");
      resultMarkers.className = "sk_g_picker_markers";

      const arrowEl = document.createElement("div");
      arrowEl.className = "sk_g_picker_arrow";
      const angleEl = document.createElement("div");
      angleEl.className = "sk_g_picker_angle";

      this.g_markers_el = resultMarkers;
      this.g_result_el = resultEl;
      this.g_mode_el = gradModeEl;
      this.g_arrow_el = arrowEl;
      this.g_angle_el = angleEl;
      this.g_preview_el = previewEl;
      this.g_pos_el = posEl;

      angleEl.appendChild(arrowEl);
      resultEl.appendChild(gradModeEl);
      resultEl.appendChild(angleEl);
      resultEl.appendChild(posEl);
      previewElWrapper.appendChild(resultEl);
      previewElWrapper.appendChild(previewEl);
      g_pickerBlock.appendChild(this.createUiHeader("gradient"));
      g_pickerBlock.appendChild(previewElWrapper);
      previewElWrapper.appendChild(resultMarkers);

      pickerBlocksWrapper.appendChild(g_pickerBlock);
    }

    this.root.appendChild(pickerBlocksWrapper);
    this.root.appendChild(actionsWrapper);
    this.options.container.appendChild(this.root);

    return this.root;
  }

  _render() {
    const {
      g_preview_el,
      g_result_el,
      g_arrow_el,
      g_angle_el,
      g_pos_el,
      g_mode_el,
    } = this;
    const { g_stops, g_mode, g_angle } = this;
    g_stops.sort((a, b) => a.loc - b.loc);

    for (const { color, el, loc } of g_stops) {
      Object.assign(el.style, {
        left: `${loc * 100}%`,
        color,
      });
    }

    // Rotate g_arrow_el
    g_arrow_el.style.transform = `rotate(${g_angle - 90}deg)`;

    g_preview_el.style.background = `linear-gradient(to right, ${this.getStops().toString(
      "linear"
    )})`;
    g_result_el.style.background = this.getGradient().toString();

    // Show / hide g_angle_el control. Update switch button
    g_pos_el.style.opacity = g_mode === "radial" ? "" : "0";
    g_pos_el.style.visibility = g_mode === "radial" ? "" : "hidden";
    g_angle_el.style.opacity = g_mode === "linear" ? "" : "0";
    g_angle_el.style.visibility = g_mode === "linear" ? "" : "hidden";

    g_mode_el.setAttribute("data-mode", g_mode);

    const gradientConfig = {
      type: this.g_mode,
      angle: this.g_angle,
      direction: this.g_direction,
      stops: this.g_stops.map((s) => [s.color, s.loc]),
      color: this.getGradient(),
    };
    // Fire event
    this._emit("gradientchange", gradientConfig);
  }

  _resolveColorStopPosition(x) {
    const { g_markers_el } = this;
    const mbcr = g_markers_el.getBoundingClientRect();
    const diff = x - mbcr.left;

    let loc = diff / mbcr.width;
    if (loc < 0) loc = 0;
    if (loc > 1) loc = 1;

    return loc;
  }

  addStop(color, loc = 0.5, silent = false) {
    const { g_markers_el } = this;
    const el = document.createElement("div");
    el.className = "sk_g_stop";
    g_markers_el.appendChild(el);

    this.setColorHSVA(color);
    const _color = color;

    const stop = {
      el,
      loc,
      color: _color,

      listener: _.on(el, ["mousedown", "touchstart"], (e) => {
        e.preventDefault();
        const markersbcr = g_markers_el.getBoundingClientRect();
        this.setColorHSVA(stop.color);
        this._focusedStop = stop;
        let hidden = false;
        // Listen for mouse / touch movements
        const m = _.on(window, ["mousemove", "touchmove"], (e) => {
          const { x, y } = this.simplifyEvent(e);
          const rootDistance = Math.abs(y - markersbcr.y);

          // Allow the user to remove the current stop with trying to drag the stop away
          hidden = rootDistance > 50 && this.g_stops.length > 2;
          el.style.opacity = hidden ? "0" : "1";

          if (!hidden) {
            stop.loc = this._resolveColorStopPosition(x);
            this._render();
          }
        });

        // Clear up after interaction endet
        const s = _.on(window, ["mouseup", "touchend", "touchcancel"], () => {
          _.off(...m);
          _.off(...s);

          // If hidden, which means the user wants to remove it, remove the current stop
          if (hidden) {
            this.removeStop(stop);
            this._render(true);
          }
        });
      }),
    };

    this._focusedStop = stop;
    this.g_stops.push(stop);
    this._render(silent);
    return this;
  }

  removeStop(v) {
    const { g_stops } = this;

    const stop = (() => {
      if (typeof v === "number") {
        return g_stops.find((v) => v.loc === v);
      } else if (typeof v === "string") {
        return g_stops.find((v) => v.color === v);
      } else if (typeof v === "object") {
        return v;
      }
    })();

    // Remove stop from list
    g_stops.splice(g_stops.indexOf(stop), 1);

    // Remove stop element
    stop.el.remove();

    // Unbind listener
    _.off(...stop.listener);

    // Focus another stop since the current one may gone
    if (this._focusedStop === stop) {
      this._focusedStop = g_stops[0];
    }

    this._render();
  }

  setGradient(str) {
    const parsed = parseGradient(str);

    if (!parsed || parsed.stops.length < 2) {
      return false;
    }

    const { type, stops, modifier } = parsed;
    const oldStops = [...this.g_stops];
    if (this.g_mode.includes(type)) {
      this.g_mode = type;

      // Apply new stops
      for (const stop of stops) {
        this.addStop(stop.color, stop.loc / 100);
      }

      // Remove current stops
      for (const stop of oldStops) {
        this.removeStop(stop);
      }

      if (type === "linear") {
        this.g_angle = 180; // Default value
        modifier && this.setLinearAngle(modifier);
      } else if (type === "radial") {
        this.g_direction = "circle at center"; // Default value
        modifier && this.setRadialPosition(modifier);
      }

      return true;
    }

    return false;
  }

  getGradient(type = this.g_mode) {
    const linearStops = this.getStops().toString(type);

    switch (type) {
      case "linear":
        return `linear-gradient(${this.g_angle}deg, ${linearStops})`;
      case "radial":
        return `radial-gradient(${this.g_direction}, ${linearStops})`;
      case "conic":
        return `conic-gradient(${linearStops})`;
    }
  }

  getStops() {
    const stops = this.g_stops.map((v) => ({
      color: v.color,
      location: v.loc,
    }));

    const type = this.g_mode;
    stops.toString = function (_type = type) {
      switch (_type) {
        case "linear":
        case "radial":
          return this.map((v) => `${v.color} ${v.location * 100}%`).join(",");
        case "conic":
          return this.map((v) => `${v.color} ${v.location * 360}deg`).join(",");
      }
    };

    return stops;
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

  updateSliders() {}

  init() {
    this.createUI();
    this._bindEvents();

    this.createStyle();

    this.setColorHSVA(this.currentColor);

    this._initializingActive = false;

    this._emit("init");
    if (this.options.mode === "gradient") {
      this._bindGradientEvents();

      for (const [color, loc] of this.options.stops) {
        this.addStop(color, loc, true);
      }

      this._render(true);

      this.on("change", (color) => {
        if (this._focusedStop) {
          this._focusedStop.color = tinycolor(color).toHex8String();
          this._render(true);
        }
      });
    }
  }

  _bindGradientEvents() {
    this._eventBindings.push(
      _.on(this.g_mode_el, ["mousedown", "touchstart"], (e) => {
        const nextIndex = this.g_modes.indexOf(this.g_mode) + 1;
        this.g_mode =
          this.g_modes[nextIndex === this.g_modes.length ? 0 : nextIndex];

        // Repaint
        this._render(true);

        // Prevent some things
        e.stopPropagation();
      }),

      _.on(this.g_preview_el, "click", (e) => {
        this.addStop(
          tinycolor(this._color).toHex8String(),
          this._resolveColorStopPosition(e.pageX)
        );
      }),

      _.on(this.g_result_el, ["mousedown", "touchstart"], (e) => {
        e.preventDefault();

        if (this.g_mode !== "linear") {
          return;
        }

        this.g_angle_el.classList.add(`gpcr-active`);
        const m = _.on(window, ["mousemove", "touchmove"], (e) => {
          const { x, y } = this.simplifyEvent(e);
          const box = this.g_angle_el.getBoundingClientRect();

          // Calculate angle relative to the center
          const boxcx = box.left + box.width / 2;
          const boxcy = box.top + box.height / 2;
          const radians = Math.atan2(x - boxcx, y - boxcy) - Math.PI;
          const degrees = Math.abs((radians * 180) / Math.PI);

          // ctrl and shift can be used to divide / quarter the snapping points
          const div = [1, 2, 4][Number(e.shiftKey || e.ctrlKey * 2)];
          this.setLinearAngle(degrees - (degrees % (45 / div)));
        });

        const s = _.on(window, ["mouseup", "touchend", "touchcancel"], () => {
          this.g_angle_el.classList.remove(`gpcr-active`);
          _.off(...m);
          _.off(...s);
        });
      }),
      _.on(this.g_pos_el, ["mousedown", "touchstart"], (e) => {
        const pos = e.target.getAttribute("data-pos");
        const pair = this.g_directions.find((v) => v.pos === pos);
        this.setRadialPosition((pair && pair.css) || this.g_direction);
      })
    );
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
        if (this.setColorHSVA(e.target.value) && !this._initializingActive) {
          this._emit("change", this._color, "input", this);
          this._emit("changestop", "input", this);
        }
        e.stopImmediatePropagation();
      }),

      // Detect user input and disable auto-recalculation
      _.on(inputEl, ["focus", "blur"], (e) => {
        this._recalc = e.type === "blur";
        this._recalc && this._updateOutput();
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
          this.setColorHSVA(_c);
          this._emit("swatchselect", _c);
          this._emit("change", _c, "swatch", this);
        })
      );

      return true;
    }

    return false;
  }

  simplifyEvent(evt) {
    const tap = (evt.touches && evt.touches[0]) || evt;
    return {
      tap,
      x: tap.clientX,
      y: tap.clientY,
      target: tap.target,
    };
  }

  getLinearAngle() {
    return this.g_mode === "linear" ? this.g_angle : -1;
  }
  setLinearAngle(angle) {
    angle =
      typeof angle === "number"
        ? angle
        : normalize.angleToDegrees(angle) ||
          (this.g_angles.find((v) => v.name === angle) || {}).angle;

    if (typeof angle === "number") {
      this.g_angle = angle;
      this._render();
      return true;
    }

    return false;
  }
}
