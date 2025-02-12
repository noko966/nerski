import * as _ from "./utils";
import Moveable from "./moveable";
const tinycolor = require("tinycolor2");
import SKPicker from "./picker";
export default class SKGPicker {
  container = document.body;

  default = "#42445a";
  _stops = [];

  // Liniear angle
  _angle = 0;
  _angles = [
    { angle: 0, name: "to top" },
    { angle: 90, name: "to right" },
    { angle: 180, name: "to bottom" },
    { angle: 270, name: "to left" },
  ];

  // Radial direction
  _direction = "circle at center";
  _directions = [
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

  _focusedStop = null;
  _mode = "linear";
  _modes = ["linear", "radial"];
  _root = null;
  _eventListener = {
    init: [],
    change: [],
  };

  static DEFAULT_OPTIONS = {
    container: document.body,
    default: "#42445a",
    
  };

  constructor(opt) {
    this.options = opt = Object.assign({ ...SKPicker.DEFAULT_OPTIONS }, opt);

    // Build dom
    this.buildUI(opt);

    this._pickr = new SKPicker({})
      .on("change", (color) => {
        if (this._focusedStop) {
          // this._focusedStop.color = color.toRGBA().toString(0);
          // this._render();
        }
      })
      .on("init", () => {
        // Add pre-defined swatches
        for (const [color, loc] of opt.stops) {
          this.addStop(color, loc, true);
        }

        // this._bindEvents();
        // this._emit("init", this);
      });
  }

  init() {}
  show() {}
  on() {}


}
