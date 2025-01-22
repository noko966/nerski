import * as _ from "./utils";
const tinycolor = require("tinycolor2");

export default class SKStylePicker {
  constructor(rootElement, verbalData, mode, gradientConfig) {
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

    this._vd = verbalData;

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
      changestop: [],
      cancel: [],
      stylechange: [],
    };

    this._recalc = true;
  }

  createStyles() {
    const _vd = this._vd;
    const _that = this;
    this.styles = [
      {
        name: "default",
        cssPropValues: {
          background: `var(--${_vd.nameBg})`,
          color: `var(--${_vd.nameTxt})`,
          radius: `var(--${_vd.nameRadius})`,
          border: null,
          shadow: null,
        },
      },
      {
        name: "glass",
        cssPropValues: {
          background: `var(--${_vd.nameBg})`,
          color: `var(--${_vd.nameAccent})`,
          radius: `var(--${_vd.nameRadius})`,
          border: "",
          shadow: `inset 6px 6px 10px var(--${_vd.nameBg2})`,
        },
      },
      {
        name: "clown",
        cssPropValues: {
          background: _that._createGradientClown(_vd),
          color: `var(--${_vd.nameAccent})`,
          radius: `var(--${_vd.nameRadius})`,
          border: null,
          shadow: `inset 6px 6px 10px var(--${_vd.nameBg2})`,
        },
      },
      {
        name: "skeo",
        cssPropValues: {
          background: `var(--${_vd.nameBg})`,
          color: `var(--${_vd.nameTxt})`,
          radius: `var(--${_vd.nameRadius})`,
          border: {
            top: `var(--${_vd.nameBg2})`,
            bottom: `var(--${_vd.nameBg})`,
          },
          shadow: `inset 1px 1px 2px 0px var(--${_vd.nameBg})`,
        },
      },
      {
        name: "underlined",
        cssPropValues: {
          background: `var(--${_vd.nameBg})`,
          color: `var(--${_vd.nameTxt})`,
          radius: "0",
          border: {
            bottom: `1px solid var(--${_vd.nameAccent})`,
          },
          shadow: null,
        },
      },
    ];
  }

  _createGradientClown(verbalData) {
    const _vd = verbalData;
    const colors = [`var(--${_vd.nameAccent})`];
    // We'll use 10px for each color band
    const bandSize = 20;

    // Build each color stop pair: "color Xpx, color Ypx"
    const stops = colors.map((color, i) => {
      const s1 = i * bandSize;
      const e1 = (i + 1) * bandSize;
      return `var(--${_vd.nameBg}) ${s1}px, var(--${
        _vd.nameBg
      }) ${e1}px, ${color} ${e1 + 1}px, ${color} ${e1 + 2}px`;
    });

    // Join all stops into a comma-separated list
    const gradientStops = stops.join(", ");

    // Finally, wrap in a repeating-linear-gradient with a 45deg angle
    const repeatingGradient = `repeating-linear-gradient(45deg, ${gradientStops})`;
    return repeatingGradient;
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
    .sk_styles_wrapper{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 120px;
     display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 8px;
    padding: 5px;
    }

    .sk_picker_style{
      flex-shrink: 0;
      height: var(--control-picker-size);
      display: flex;
      align-items: center;
      font-size: 10px;
      justify-content: center;
      background: var(--background);
      color: var(--color);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      border-top: var(--border-top);
      border-bottom: var(--border-bottom);
      border-left: var(--border-left);
      border-right: var(--border-right);
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

  setStyle(style) {
    this._emit("stylechange", style, this);
  }

  createUI() {
    this.root = document.createElement("div");
    this.root.className = "sk_picker_root";

    const themesBlock = document.createElement("div");
    themesBlock.className = "sk_widget_block";

    this.styleSwatchesWrapper = document.createElement("div");
    this.styleSwatchesWrapper.className = "sk_styles_wrapper sk_picker_scroll";

    this.styles.forEach((st) => this.addStyleSwatch(st));

    this.root.appendChild(themesBlock);
    themesBlock.appendChild(this.styleSwatchesWrapper);
    this.rootElement.appendChild(this.root);
  }

  init() {
    this.createStyles();
    this.createUI();
    this._bindEvents();
    this.createStyle();
    this._initializingActive = false;

    this._emit("init");
  }

  _bindEvents() {
    let that = this;
    const { root, applyAndClose, inputEl } = this;
    this._eventBindings.push(
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
      )
    );
  }

  destroy() {
    const root = this.root;
    this._eventBindings.forEach((args) => _.off(...args));

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

  addStyleSwatch(_style) {
    if (_style) {
      const { styleSwatchesWrapper } = this;

      const el = document.createElement("div");
      el.className = "sk_picker_style";
      el.innerText = _style.name;
      el.style.setProperty("--background", _style.cssPropValues.background);
      el.style.setProperty("--color", _style.cssPropValues.color);
      el.style.setProperty("--shadow", _style.cssPropValues.shadow);
      el.style.setProperty("--radius", _style.cssPropValues.radius);
      if (_style.cssPropValues.border) {
        for (const key in _style.cssPropValues.border) {
          el.style.setProperty(
            `--border-${key}`,
            _style.cssPropValues.border[key]
          );
        }
      }

      let cssStyle = `
      background: ${_style.cssPropValues.background};
      color: ${_style.cssPropValues.color};
      ${
        _style.cssPropValues.shadow
          ? `box-shadow: ${_style.cssPropValues.shadow}`
          : ""
      };
      ${
        _style.cssPropValues.radius
          ? `border-radius: ${_style.cssPropValues.radius}`
          : ""
      };
      `;
      for (const key in _style.cssPropValues.border) {
        cssStyle += _style.cssPropValues.border[key]
          ? `border-${key}: ${_style.cssPropValues.border[key]}`
          : "";
      }

      // Append element and save swatch data
      styleSwatchesWrapper.appendChild(el);

      // Bind event
      this._eventBindings.push(
        _.on(el, "click", () => {
          this.setStyle(cssStyle);
        })
      );

      return true;
    }

    return false;
  }
}
