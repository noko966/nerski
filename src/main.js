import guessVisibleColor from "./neuron.js";
var tinycolor = require("tinycolor2");
import chroma from "chroma-js";
import Pickr from "@simonwep/pickr";
import { MouseIntersectStyler } from "./CustomStyler.js";

class Skinner {
  constructor(cssCb, starterConfig, header, root, variant, patientRoot) {
    this.pickers = [];
    this.eventListeners = [];
    this.variant = variant || "sport";
    this.header =
      document.querySelector(header) || document.createElement("div");
    this.skinnerRoot = root || document.body;
    this.classNames = {
      btn: "skinner_btn",
      btn50: "skinner_btn-50",
      btn100: "skinner_btn-100",
      ico: "skinner_ico",
      uiSwitch: "skinner_ui_switcher",
      settingsWrapper: "skinner_settings_wrapper",
      uiLabelSm: "skinner_ui_label_sm",
    };
    this.icons = {
      moon: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M22.2,16.6c-1.7,3-4.7,5.1-8.1,5.5c-0.5,0.1-1,0.1-1.5,0.1c-6.1,0-11-5-10.9-11.1 c0-3.7,1.9-7.2,5.1-9.2c0.4-0.2,0.9-0.1,1.1,0.3C8,2.4,8,2.7,7.9,3C5.3,7.5,7,13.3,11.5,15.8c1.8,1,3.8,1.4,5.8,1.1 c1.3-0.2,2.6-0.6,3.7-1.4c0.4-0.2,0.9-0.1,1.1,0.2C22.4,16,22.4,16.3,22.2,16.6L22.2,16.6z"/></svg>`,
      chb: `<svg class="sk_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><polyline class="sk_svg_path_checkbox" points="4.5,9.4 8.6,13.6 15.7,6.5 "/></svg>`,
      copy: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_copy" d="M13.5,16.9H9.5c-1.5,0-2.8-1.2-2.8-2.8V8.9c0-1.5,1.2-2.8,2.8-2.8h3.9c1.5,0,2.8,1.2,2.8,2.8v5.3 C16.2,15.7,15,16.9,13.5,16.9z M12.6,4.2c-0.5-0.6-1.3-1-2.1-1H6.5C5,3.1,3.8,4.3,3.8,5.9v5.3c0,0.9,0.4,1.6,1,2.1"/></svg>`,
      download: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_copy" d="M13.1,9.8l-2.7,2.7c-0.1,0.1-0.3,0.1-0.4,0L7.4,9.8 M10.2,4.2v8.2 M4.5,11.5v3.9c0,0.4,0.4,0.8,0.8,0.8h9.3 c0.4,0,0.8-0.4,0.8-0.8v-3.9"/></svg>`,
      saveToDb: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_save" d="M9.8,15.8V9.1 M11.6,10.7l-1.6-1.6C9.9,9,9.7,9,9.5,9.2l-1.6,1.6 M12.7,13c0.4,0.2,0.8,0.3,1.2,0.3 c1.4,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-0.4,0-0.7,0.1-1,0.2c0-2.1-1.6-3.9-3.5-3.9S5.8,6.4,5.8,8.5c-1.2,0.2-2.1,1.2-2.1,2.4 c0,1.4,1.1,2.4,2.4,2.4c0.4,0,0.8-0.1,1.1-0.3"/></svg>`,
      recolor: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><g class="sk_svg_path_load"><path class="st0" d="M10,14.2c1.6,0,2.8-1.3,2.8-2.8S11.4,7.7,10,5.2c-1.4,2.5-2.8,4.6-2.8,6.2S8.4,14.2,10,14.2z"/> <line class="st0" x1="15.7" y1="16.4" x2="4.3" y2="16.4"/><g></svg>`,
      showHide: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="svg_path_top" d="M2.4,9.9c0.6,0,2.9,4.9,7.6,4.9s7-4.9,7.6-4.9"/><path class="svg_path_bot_t" d="M17.6,9.9c-0.6,0-2.9,4.9-7.6,4.9S3,9.9,2.4,9.9 M10,17.5v-1.7 M6.3,14.8l-0.8,1.4 M2.7,13.7l1-0.9 M13.7,14.8 l0.8,1.4 M16.3,12.8l1,0.9"/><path class="svg_path_top" d="M17.6,9.9c-0.6,0-2.9-4.9-7.6-4.9S3,9.9,2.4,9.9 M11.6,9.9c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6 S9.1,8.2,10,8.2S11.6,9,11.6,9.9z"/></svg>`,
    };

    this.patientRoot = patientRoot || document.body;

    this.isStylerToggledOn = false;
    this.isPickerOpen = false;

    this.skinnerContainer = this.createControlsWrapper();

    this.essenceGroups = {};

    this.uiColors = {
      dark: {
        name: "dark",
        bg: "#1F2122",
        accent: "#1696a5",
      },
      light: {
        name: "light",
        bg: "#e8ecf1",
        accent: "#1696a5",
      },
    };

    if (this.variant === "casino") {
      this.defaults = {
        dark: {
          bg2: 6,
          bg3: 14,
          bgHov: 4,
        },
        light: {
          bg2: 11,
          bg3: 19,
          bgHov: 5,
        },
        alpha: {
          bg: 0.7,
          bg2: 0.5,
          bg3: 0.3,
        },
        txt: {
          txt: 0.9,
          txt2: 0.6,
          txt3: 0.4,
        },
      };
    } else {
      this.defaults = {
        dark: {
          bg2: 6,
          bg3: 12,
          bgHov: 3,
        },
        light: {
          bg2: 10,
          bg3: 15,
          bgHov: 3,
        },
        alpha: {
          bg: 0.7,
          bg2: 0.5,
          bg3: 0.3,
        },
        txt: {
          txt: 0.9,
          txt2: 0.6,
          txt3: 0.4,
        },
      };
    }

    if (this.variant === "casino") {
      this.configOrder = [
        {
          name: "body",
          inherits: null,
        },
        {
          name: "accent",
          inherits: null,
        },

        {
          name: "dominant",
          inherits: ["body"],
        },
        {
          name: "card",
          inherits: ["body"],
        },
        {
          name: "game",
          inherits: ["body"],
        },
        {
          name: "jackpot",
          inherits: ["body"],
        },
        {
          name: "button",
          inherits: ["accent"],
        },
        {
          name: "buttonSecondary",
          inherits: ["dominant", "body"],
          // variation: 5,
        },
        {
          name: "navbar",
          inherits: ["dominant", "body"],
        },
        {
          name: "slider",
          inherits: ["body"],
        },
        {
          name: "header",
          inherits: ["dominant", "body"],
        },
        {
          name: "headerSecondary",
          inherits: ["dominant", "body"],
        },
        {
          name: "footer",
          inherits: ["dominant", "body"],
        },
        {
          name: "subHeader",
          inherits: ["header", "dominant", "body"],
        },
        {
          name: "tab",
          inherits: ["dominant", "body"],
        },
        {
          name: "tabActive",
          inherits: ["tab", "dominant", "body"],
        },
        {
          name: "input",
          inherits: ["dominant", "body"],
        },
        {
          name: "inputSecondary",
          inherits: ["input", "dominant", "body"],
        },
        {
          name: "filter",
          inherits: ["dominant", "body"],
        },
        {
          name: "tooltip",
          inherits: ["dominant", "body"],
        },
        {
          name: "modal",
          inherits: ["body"],
        },
        {
          name: "login",
          inherits: ["modal", "body"],
        },
        {
          name: "register",
          inherits: ["modal", "body"],
        },
      ];
    } else {
      this.configOrder = [
        {
          name: "body",
          inherits: null,
        },
        {
          name: "accent",
          inherits: null,
        },
        {
          name: "dominant",
          inherits: ["body"],
        },
        {
          name: "button",
          inherits: ["accent"],
        },
        {
          name: "buttonSecondary",
          inherits: ["body"],
        },
        {
          name: "navbar",
          inherits: ["dominant", "body"],
        },
        {
          name: "slider",
          inherits: ["body"],
        },
        {
          name: "header",
          inherits: ["dominant", "body"],
        },
        {
          name: "subHeader",
          inherits: ["header", "dominant", "body"],
        },
        {
          name: "event",
          inherits: ["dominant", "body"],
        },
        {
          name: "eventLive",
          inherits: ["event", "body"],
        },
        {
          name: "odd",
          inherits: ["body"],
        },
        {
          name: "oddActive",
          inherits: ["accent"],
        },
        {
          name: "showMore",
          inherits: ["body"],
        },
        {
          name: "marketHeader",
          inherits: ["body", "header"],
        },
        {
          name: "collapse",
          inherits: ["header", "dominant", "body"],
        },
        {
          name: "tab",
          inherits: ["dominant", "body"],
        },
        {
          name: "tabActive",
          inherits: ["tab", "dominant", "body"],
        },
        {
          name: "tabSecondaryActive",
          inherits: ["tab", "dominant", "body"],
        },
        {
          name: "menu_1",
          inherits: ["dominant", "body"],
        },
        {
          name: "menu_2",
          inherits: ["menu_1", "dominant", "body"],
        },
        {
          name: "menu_3",
          inherits: ["menu_2", "menu_1", "dominant", "body"],
        },
        {
          name: "input",
          inherits: ["dominant", "body"],
        },
        {
          name: "inputSecondary",
          inherits: ["input", "dominant", "body"],
        },
        {
          name: "filter",
          inherits: ["input", "dominant", "body"],
        },
        {
          name: "tooltip",
          inherits: ["dominant", "body"],
        },
        {
          name: "modal",
          inherits: ["body"],
        },
        {
          name: "betSlip",
          inherits: ["dominant", "body"],
        },
        {
          name: "betSlipStake",
          inherits: ["betSlip", "dominant", "body"],
        },
        {
          name: "betSlipInput",
          inherits: ["betSlip", "dominant", "body"],
        },
        {
          name: "betSlipButton",
          inherits: ["betSlip", "dominant", "body"],
        },
        {
          name: "betSlipHeader",
          inherits: ["betSlip", "dominant", "body"],
        },
        {
          name: "betSlipTab",
          inherits: ["betSlip", "dominant", "body"],
        },
        {
          name: "betSlipTabActive",
          inherits: ["betSlip", "dominant", "body"],
        },
        {
          name: "tmLogo",
          inherits: ["dominant", "body"],
        },
      ];
    }

    this.cssCb = cssCb;
    this.skin = {};
    this.isUIVisible = true;
    this.version = "1.0.0";

    this._config = starterConfig || {};

    this.activeEssences = this.configOrder.filter((c) => {
      return this._config[c.name];
    });

    this.localStorage = {};

    this.mergedConfig = this.mergeConfig(this._config);
    this.generateInitialSkin();

    this.modifyKey = this.modifyKey.bind(this);
    this.generateInitialSkin = this.generateInitialSkin.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.toggleUi = this.toggleUi.bind(this);
    this.initBasedOnCustomConfig = this.initBasedOnCustomConfig.bind(this);
    this.mergeConfig = this.mergeConfig.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
    this.getFallbackLvl = this.getFallbackLvl.bind(this);
    this.message = this.message.bind(this);

    this.generateBackgrounds = this.generateBackgrounds.bind(this);

    this.generateGradientss = this.generateGradientss.bind(this);
    this.generateTextss = this.generateTextss.bind(this);
    this.generateAccentss = this.generateAccentss.bind(this);
    this.generateBorderss = this.generateBorderss.bind(this);

    this.labelsMap = {
      body: "Body",
      accent: "Accent",
      dominant: "Dominant",
      button: "Button",
      buttonSecondary: "Secondary Button",
      odd: "Odd",
      oddActive: "Active Odd",
      showMore: "Show More",
      header: "Header",
      subHeader: "Subheader",
      eventWrapper: "Event Wrapper",
      event: "Event",
      menu_1: "Menu Level 1",
      menu_2: "Menu Level 2",
      menu_3: "Menu Level 3",
      popup: "Popup",
      tab: "Tab",
      tabActive: "Active Tab",
      tabSecondaryActive: "Active Secondary Tab",
      input: "Input",
      inputSecondary: "Secondary Input",
      navbar: "Navbar",
      slider: "Slider",
      collapse: "Collapse",
      marketHeader: "Market Header",
      filter: "Filter",
      tooltip: "Tooltip",
      tmLogo: "Team logo",
      betSlip: "Betslip",
      betSlipStake: "Betslip Stake",
      betSlipTab: "Betslip Tab",
      betSlipTabActive: "Betslip Tab Active",
      betSlipInput: "Betslip Input",
      betSlipButton: "Betslip Button",
      name: "Name",
      background: "Background",
      gradient: "Gradient",
      text: "Text",
      border: "Border",
      radius: "Radius",
    };
  }

  mergeConfig(config) {
    let _config = config;
    let _mergedConfig = {};
    let _missingConfig = {};
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      let _configBlueprint = {
        Background: {
          isDark: false,
          isActive: false,
          color: "#19C950",
        },
        Gradient: {
          angle: 0,
          isActive: false,
          color: "#1703A2",
        },
        Text: {
          isActive: false,
          color: "#611BCD",
        },
        Accent: {
          isActive: false,
          color: "#F022FE",
        },
        Border: {
          isActive: false,
          color: "#AC23F7",
        },
        borderRadius: 2,
      };
      _mergedConfig[_essence] = {};
      _mergedConfig[_essence].editable = Boolean(
        this.activeEssences.find((f) => f.name === _essence)
      );
      if (!_config[_essence]) {
        _missingConfig[_essence] = {};
      }
      for (const key in _configBlueprint) {
        if (key == "borderRadius") {
          if (_config[_essence] && _config[_essence][key]) {
            _mergedConfig[_essence][key] = _config[_essence][key];
          } else {
            _mergedConfig[_essence][key] = _configBlueprint[key];
          }
        } else {
          _mergedConfig[_essence][key] = Object.assign(
            _configBlueprint[key],
            _config[_essence] ? _config[_essence][key] : {}
          );
        }
      }
      if (_essence === "body" || _essence === "accent") {
        _mergedConfig[_essence].Background.isActive = true;
      }
      _mergedConfig[_essence].fallback = this.configOrder[i].inherits;
      _mergedConfig[_essence].variation =
        _config[_essence] && _config[_essence].variation
          ? _config[_essence].variation
          : this.configOrder[i].variation;
    }

    return _mergedConfig;
  }

  generateBackgrounds2(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isDark = this.skin[_vb.isDark];
    this.skin[_vb.nameBg2] = _isDark
      ? tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.bg2)
          .toString()
      : tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.light.bg2)
          .toString();

    this.skin[_vb.nameBg3] = _isDark
      ? tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.bg3)
          .toString()
      : tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.light.bg3)
          .toString();

    this.skin[_vb.nameBgHov] = _isDark
      ? tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.bgHov)
          .toString()
      : tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.light.bgHov)
          .toString();

    this.skin[_vb.nameBg2Hov] = _isDark
      ? tinycolor(this.skin[_vb.nameBg2])
          .darken(this.defaults.dark.bgHov)
          .toString()
      : tinycolor(this.skin[_vb.nameBg2])
          .lighten(this.defaults.light.bgHov)
          .toString();

    this.skin[_vb.nameBg3Hov] = _isDark
      ? tinycolor(this.skin[_vb.nameBg3])
          .darken(this.defaults.dark.bgHov)
          .toString()
      : tinycolor(this.skin[_vb.nameBg3])
          .lighten(this.defaults.light.bgHov)
          .toString();

    this.skin[_vb.nameRGBA] = tinycolor(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg)
      .toRgbString();
    this.skin[_vb.nameRGBA2] = tinycolor(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg2)
      .toRgbString();
    this.skin[_vb.nameRGBA3] = tinycolor(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg3)
      .toRgbString();

    if (this.variant === "casino") {
      // let mixTint = _isDark ? "#fff" : "#000";
      let mixTint = "#000";
      this.skin[`${_vb.name}Shadow`] = tinycolor
        .mix(mixTint, this.skin[_vb.nameBg], 80)
        .setAlpha(80)
        .toRgbString();
      this.skin[`${_vb.name}ShadowFade`] = tinycolor
        .mix(mixTint, this.skin[_vb.nameBg], 80)
        .setAlpha(0)
        .toRgbString();
    }
  }

  generateBackgrounds(essence) {
    let _vb = this.verbalData(essence);
    let isDark = this.skin[_vb.isDark];
    const bgKeyNames = [
      _vb.nameBgHov,
      _vb.nameBg2,
      _vb.nameBg2Hov,
      _vb.nameBg3,
      _vb.nameBg3Hov,
    ];

    const bgAKeyNames = [_vb.nameRGBA, _vb.nameRGBA2, _vb.nameRGBA3];

    let colorStops = 6;

    let firstColor = this.skin[_vb.nameBg];

    bgKeyNames.forEach((bgName, i) => {
      this.skin[bgName] = isDark
        ? chroma(firstColor).darken(0.2 * i)
        : chroma(firstColor).brighten(0.2 * i);
    });

    bgAKeyNames.forEach((bgName, i) => {
      this.skin[bgName] = chroma(firstColor)
        .alpha(i * 0.5)
        .css();
    });
  }

  generateGradientss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isGradient = this.skin[_vb.isGradient];

    if (_isGradient) {
      this.skin[_vb.nameG] = `linear-gradient(${
        this.skin[_vb.gradientAngle]
      }deg, ${this.skin[_vb.nameBg_g]} 0%, ${this.skin[_vb.nameBg]} 100%)`;
    } else {
      this.skin[_vb.nameBg_g] = this.skin[_vb.nameBg2];
      this.skin[_vb.nameG] = this.skin[_vb.nameBg];
    }
  }

  generateTextss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isCustomTextActive = this.skin[_vb.isCustomTxt];
    let essenceBg = this.skin[_vb.nameBg];
    let essenceTxt;
    if (_isCustomTextActive) {
      essenceTxt = this.skin[_vb.nameTxt];
    } else {
      essenceTxt = guessVisibleColor(
        tinycolor(this.skin[_vb.nameBg]).toHexString()
      );
    }
    this.skin[_vb.nameTxt] = essenceTxt;
    this.skin[_vb.nameTxt2] = tinycolor
      .mix(essenceTxt, essenceBg, 30)
      .toHexString();
    this.skin[_vb.nameTxt3] = tinycolor
      .mix(essenceTxt, essenceBg, 50)
      .toHexString();
  }

  generateAccentss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isCustomAccentActive = this.skin[_vb.isCustomAccent];
    let _customAccentColor = this.skin[_vb.nameAccent];
    if (_isCustomAccentActive) {
      this.skin[_vb.nameAccent] = _customAccentColor;
    } else {
      this.skin[_vb.nameAccent] =
        this.skin.accentBg || this.mergedConfig.accent.Background.color;
    }
    this.skin[_vb.nameAccentTxt] = tinycolor(
      guessVisibleColor(tinycolor(this.skin[_vb.nameAccent]).toHexString())
    )
      .setAlpha(this.defaults.txt.txt)
      .toRgbString();
  }

  generateBorderss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isCustomBorderActive = this.skin[_vb.isCustomBorder];
    let _customBorderColor = this.skin[_vb.nameBorder];
    if (_isCustomBorderActive) {
      this.skin[_vb.nameBorder] = _customBorderColor;
    } else {
      this.skin[_vb.nameBorder] = this.skin[_vb.nameBgHov];
    }
  }

  generateInitialSkin() {
    let _config = this.mergedConfig;
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      let _vd = this.verbalData(_essence);

      if (_essence === "body" || _essence === "accent") {
        this.skin[_vd.isName] = true;
      } else {
        this.skin[_vd.isName] = _config[_essence].Background.isActive;
      }

      let isActive = this.skin[_vd.isName];

      if (isActive) {
        this.skin[_vd.nameBg] = _config[_essence].Background.color;
        this.skin[_vd.isDark] = _config[_essence].Background.isDark;
        this.generateBackgrounds(_essence);

        this.skin[_vd.isGradient] = _config[_essence].Gradient.isActive;
        this.skin[_vd.nameBg_g] = _config[_essence].Gradient.color;
        this.skin[_vd.gradientAngle] = _config[_essence].Gradient.angle;
        this.generateGradientss(_essence);

        this.skin[_vd.isCustomTxt] = _config[_essence].Text.isActive;
        this.skin[_vd.nameTxt] = _config[_essence].Text.color;
        this.generateTextss(_essence);

        this.skin[_vd.isCustomAccent] = _config[_essence].Accent.isActive;
        this.skin[_vd.nameAccent] = _config[_essence].Accent.color;
        this.generateAccentss(_essence);

        this.skin[_vd.isCustomBorder] = _config[_essence].Border.isActive;
        this.skin[_vd.nameBorder] = _config[_essence].Border.color;
        this.generateBorderss(_essence);

        this.skin[_vd.nameRadius] = _config[_essence].borderRadius;
        this.skin[_vd.nameTxtInverse] = tinycolor(
          this.skin[_vd.nameTxt]
        ).isLight()
          ? "#262626"
          : "#fff";
      } else {
        let _fbEssence = _config[_essence].fallback.find((f) => {
          return _config[f].editable && _config[f]["Background"].isActive;
        });
        let _vdf = this.verbalData(_fbEssence);
        let fbLength = _config[_essence].fallback.length;
        let variation = this.mergedConfig[_essence].variation;
        this.skin[_vd.nameBg] = this.getFallbackLvl(
          _fbEssence,
          variation,
          fbLength
        );
        this.generateBackgrounds(_essence);

        this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
        this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
        this.skin[_vd.gradientAngle] = this.skin[_vdf.gradientAngle];

        this.generateGradientss(_essence);

        this.skin[_vd.isCustomTxt] = this.skin[_vdf.isCustomTxt];
        this.skin[_vd.nameTxt] = this.skin[_vdf.nameTxt];
        this.generateTextss(_essence);

        this.skin[_vd.isCustomAccent] = this.skin[_vdf.isCustomAccent];
        this.skin[_vd.nameAccent] = this.skin[_vdf.nameAccent];
        this.generateAccentss(_essence);

        this.skin[_vd.isCustomBorder] = this.skin[_vdf.isCustomBorder];
        this.skin[_vd.nameBorder] = this.skin[_vdf.nameBorder];
        this.generateBorderss(_essence);

        this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
        this.skin[_vd.nameTxtInverse] = tinycolor(
          this.skin[_vd.nameTxt]
        ).isLight()
          ? "#262626"
          : "#fff";
      }
    }
  }

  getFallbackLvl(essence, variation, lvl) {
    let _essence = essence;

    let _variation = variation;
    let _lvl = lvl;
    let _vb = this.verbalData(_essence);
    let _variationsArr = [
      "Bg",
      "BgHover",
      "Bg2",
      "Bg2Hover",
      "Bg3",
      "Bg3Hover",
    ];
    let _bg = _variation
      ? this.skin[_vb.name + _variationsArr[_variation]]
      : this.skin[_vb.name + _variationsArr[_lvl]];

    return _bg;
  }

  initBasedOnCustomConfig(config) {
    let _config = config;

    if (!_config) {
      console.error("no custom config provided Ara");
      return false;
    }
    this.mergedConfig = this.mergeConfig(_config);
    this.generateInitialSkin();
    this.generateTheme();

    this.applyTheme();

    this.cssCb(this.skin);
    this.appendCssToSkinnerInstanceRoot(this.skin);
  }

  applyTheme() {
    const self = this;
    const config = this.configOrder;
    self.message("loading config", true);

    let i = -1;
    let timeoutId;
    (function apply() {
      i++;
      clearTimeout(timeoutId);
      if (config.length === i) {
        return self.message("", false);
      }
      let _essence = config[i].name;
      if (!self.mergedConfig[_essence].editable) {
        return (timeoutId = setTimeout(apply));
      }
      self.updateControlFor(_essence);
      let verbalData = self.verbalData(_essence);

      self[verbalData.nameBg].picker.style.background =
        self.skin[verbalData.nameBg];
      self[verbalData.nameBg].picker2.style.background =
        self.skin[verbalData.nameBg_g];
      self[verbalData.nameBg].picker3.style.setProperty =
        ("--bg", self.skin[verbalData.nameBg]);
      self[verbalData.nameBg].picker3.style.setProperty =
        ("--txt", self.skin[verbalData.nameTxt]);
      self[verbalData.nameBg].customAccentPckr.style.background =
        self.skin[verbalData.nameAccent];

      self[verbalData.nameBg].borderPckr.style.background =
        self.skin[verbalData.nameBorder];
      timeoutId = setTimeout(apply);
    })();
  }

  init() {
    this.createHTML();
    this.addCss();
    this.addSettingsWrapper();
    this.addVersioning();
    this.generateTheme();
    this.generateUiPalette(this.uiColors.light);
    this.updateAllControls();
    this.createDownloadButton();
    this.createCloseButton();
    this.addUiThemeSwitcher();
    this.addStringAnim();
    this.cssCb(this.skin);

    // **Initialize the MouseIntersectStyler here**
    // Callback for when the user hovers over elements
    const styleCallback = (el) => {
      el.style.outline = "2px solid red";
    };
    // Callback to reset when mouse leaves element
    const resetCallback = (el) => {
      el.style.outline = "";
    };
    // Callback on click - show the styler UI and stop scanning
    const clickCallback = (el) => {
      // The styler internally handles showing UI, so we don't need to do much here.
      console.log("Element selected:", el);
    };

    this.customStyler = new MouseIntersectStyler(
      "*",
      styleCallback,
      resetCallback,
      clickCallback,
      this.patientRoot
    );

    if (this.toolBox) {
      this.toolBox.addEventListener("mouseover", () => {
        // If styler is running, stop it when entering toolbox
        if (this.customStyler && this.customStyler.isRunning) {
          this.customStyler.stop();
        }
      });

      this.toolBox.addEventListener("mouseout", () => {
        // Only restart if styler is toggled on AND not running
        if (
          this.isStylerToggledOn &&
          !this.isPickerOpen &&
          this.customStyler &&
          !this.customStyler.isRunning
        ) {
          this.customStyler.start();
        }
      });
    }
  }

  destroy() {
    document.body.removeChild(this.overlay);
    document.body.removeChild(this.toolbox);
    document.body.removeChild(this.header);
    document.body.removeChild(this.messageWrapper);
    document.documentElement.style = "";
    this.skinnerRoot.removeChild(this.skinnerUIStyles);
    document.head.removeChild(this.iconsLink);

    let styleId = "css-as-test-stylesheet";
    let styleElement = document.getElementById(styleId);
    document.head.removeChild(styleElement);

    this.eventListeners.forEach(({ element, type, listener }) => {
      element.removeEventListener(type, listener);
    });
    this.eventListeners = [];

    this.destroyPickers();

    // Clear the array to avoid memory leaks
  }

  addStringAnim() {
    const stringWrapper = document.createElement("div");
    stringWrapper.className = "sk_path_string_root";

    const box = document.createElement("div");
    box.className = "sk_path_string_box";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("vector-effect", "non-scaling-stroke");
    svg.setAttribute("preserveAspectRatio", "none");

    svg.appendChild(path);

    stringWrapper.appendChild(svg);
    stringWrapper.appendChild(box);

    this.toolBox.appendChild(stringWrapper);

    let progress = 0;
    let width = 500;
    let time = Math.PI / 2;
    let x = 0.5;
    let reqId = null;

    svg.setAttribute("viewBox", `0 0 ${width} 40`);

    const setPath = (progress) => {
      path.setAttribute(
        "d",
        `M0 20 Q${width * x} ${20 + progress}, ${width} 20`
      );
    };

    const lerp = (x, y, a) => x * (1 - a) + y * a;

    const manageMouseEnter = () => {
      if (reqId) {
        cancelAnimationFrame(reqId);
        resetAnimation();
      }
    };

    const manageMouseMove = (e) => {
      const { movementY, clientX } = e;
      const pathBound = box.getBoundingClientRect();
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY * 0.2;
      setPath(progress);
    };

    const manageMouseLeave = () => {
      animateOut();
    };

    const animateOut = () => {
      const newProgress = progress * Math.sin(time);
      progress = lerp(progress, 0, 0.025);
      time += 0.2;
      setPath(newProgress);
      if (Math.abs(progress) > 0.75) {
        reqId = requestAnimationFrame(animateOut);
      } else {
        resetAnimation();
      }
    };

    const resetAnimation = () => {
      time = Math.PI / 2;
      progress = 0;
    };

    box.addEventListener("mouseenter", manageMouseEnter);
    box.addEventListener("mousemove", manageMouseMove);
    box.addEventListener("mouseleave", manageMouseLeave);

    setPath(progress);
  }

  addSettingsWrapper() {
    this.header.className = "nik_skinner_header";
    this.skinnerRoot.appendChild(this.header);
    this.settingsWrapper = document.createElement("Div");
    this.settingsWrapper.className = this.classNames.settingsWrapper;
    // let headerNav = this.header.querySelector(".nik_skinner_link_wrapper");
    // this.header.insertBefore(this.settingsWrapper, headerNav);
  }

  addVersioning() {
    let vDiv = document.createElement("Div");
    vDiv.className = "nik_skinner_versioning";
    vDiv.innerText = "V " + this.version;
    this.settingsWrapper.appendChild(vDiv);
  }

  prerogative(name) {
    return name === "body" || name === "accent" ? true : false;
  }

  createCssForSkinnerInstance(skin) {
    let res = ``;
    this.configOrder.forEach((c, i) => {
      let value = this.verbalData(c.name);

      res += `    --${value.nameG}: ${skin[value.nameG]};\n`;
      res += `    --${value.nameBg}: ${skin[value.nameBg]};\n`;
      res += `    --${value.nameBg2}: ${skin[value.nameBg2]};\n`;
      res += `    --${value.nameBg3}: ${skin[value.nameBg3]};\n`;
      res += `    --${value.nameBgHov}: ${skin[value.nameBgHov]};\n`;
      res += `    --${value.nameBg2Hov}: ${skin[value.nameBg2Hov]};\n`;
      res += `    --${value.nameBg3Hov}: ${skin[value.nameBg3Hov]};\n`;
      res += `    --${value.nameTxt}: ${skin[value.nameTxt]};\n`;
      res += `    --${value.nameTxt2}: ${skin[value.nameTxt2]};\n`;
      res += `    --${value.nameTxt3}: ${skin[value.nameTxt3]};\n`;
      res += `    --${value.nameAccent}: ${skin[value.nameAccent]};\n`;
      res += `    --${value.nameAccentTxt}: ${skin[value.nameAccentTxt]};\n`;
      res += `    --${value.nameRGBA}: ${skin[value.nameRGBA]};\n`;
      res += `    --${value.nameRGBA2}: ${skin[value.nameRGBA2]};\n`;
      res += `    --${value.nameRGBA3}: ${skin[value.nameRGBA3]};\n`;

      res += `    --${value.nameRadius}: ${skin[value.nameRadius]}px;\n`;
      res += `    --${value.nameBorder}: ${skin[value.nameBorder]};`;

      if (i !== this.configOrder.length - 1) {
        res += `\n\n`;
      }
    });

    return res;
  }

  modifyKey(key, value) {
    let self = this;
    this.skin[key] = value;
    this.generateTheme();
    this.updateAllControls();
    this.cssCb(this.skin);
    this.appendCssToSkinnerInstanceRoot(this.skin);

    for (let i = 0; i < this.activeEssences.length; i++) {
      let _essence = this.activeEssences[i].name;
      let vd = this.verbalData(_essence);

      const isAccentVisible = tinycolor.isReadable(
        this.skin[vd.nameBg],
        this.skin[vd.nameAccent]
      );
      if (!isAccentVisible) {
        this.essenceGroups[_essence].classList.toggle("state_not_readable");
        this.essenceGroups[
          _essence
        ].title = `Accent of ${_essence} will not be Readable on its Background`;
      }
    }
  }

  appendCssToSkinnerInstanceRoot(c) {
    let css = `
    #skinner_ui_root_id{
    ${this.createCssForSkinnerInstance(c)}
    }`;
    var styleId = "skinner_style_tag";
    let skinnerStyleTag = document.getElementById(styleId);

    if (!skinnerStyleTag) {
      // Create the style element if it doesn't exist
      skinnerStyleTag = document.createElement("style");
      skinnerStyleTag.setAttribute("id", styleId);
      this.skinnerRoot.appendChild(skinnerStyleTag);
    }

    skinnerStyleTag.innerHTML = css;
  }

  verbalData(name) {
    let data = {};
    data.name = name;
    data.nameBg = data.name + "Bg";
    data.nameBg_g = data.nameBg + "_g";
    data.nameG = data.name + "G";
    data.nameRGBA = data.name + "RGBA";
    data.nameRGBA2 = data.name + "RGBA2";
    data.nameRGBA3 = data.name + "RGBA3";
    data.nameG2 = data.nameG + "2";
    data.nameBgHov = data.nameBg + "Hover";
    data.nameBg2 = data.nameBg + "2";
    data.nameBg2Hov = data.nameBg2 + "Hover";
    data.nameBg3 = data.nameBg + "3";
    data.nameBg3Hov = data.nameBg3 + "Hover";

    data.upperCaseName = data.name[0].toUpperCase() + data.name.substring(1);
    data.isName = "is" + data.upperCaseName + "Bg";
    data.isGradient = "is" + data.upperCaseName + "Gradient";
    data.isGradientReversed = data.isGradient + "Reversed";
    data.gradientAngle = data.upperCaseName + "GradientAngle";

    data.isDark = "is" + data.upperCaseName + "BgDark";

    data.nameTxt = data.name + "Txt";
    data.nameTxt2 = data.nameTxt + "2";
    data.nameTxt3 = data.nameTxt + "3";
    data.nameTxtInverse = data.nameTxt + "Inverse";

    data.isCustomTxt = "isCustom" + data.upperCaseName + "Txt";

    data.nameBorder = data.name + "Border";
    data.isCustomBorder = "isCustom" + data.upperCaseName + "Border";

    data.nameAccent = data.name + "Accent";
    data.isCustomAccent = "isCustom" + data.upperCaseName + "Accent";
    data.nameAccentTxt = data.name + "AccentTxt";

    data.nameRadius = data.name + "Radius";

    return data;
  }

  generateTheme() {
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      this.generateColorLogick(_essence);
    }
  }

  generateColorLogick(essence) {
    let _config = this.mergedConfig;
    let _essence = essence;
    let _vd = this.verbalData(_essence);

    if (_essence === "body" || _essence === "accent") {
      this.skin[_vd.isName] = true;
    }

    let isActive = this.skin[_vd.isName];

    if (isActive) {
      this.generateBackgrounds(_essence);
      this.generateGradientss(_essence);
      this.generateTextss(_essence);
      this.generateAccentss(_essence);
      this.generateBorderss(_essence);

      this.skin[_vd.nameTxtInverse] = tinycolor(
        this.skin[_vd.nameTxt]
      ).isLight()
        ? "#262626"
        : "#fff";
    } else {
      let _fbEssence = _config[_essence].fallback.find((f) => {
        let vd = this.verbalData(f);
        return _config[f].editable && this.skin[vd.isName];
      });
      let fbLength = _config[_essence].fallback.length;
      let _vdf = this.verbalData(_fbEssence);
      let variation = _config[_essence].variation;
      this.skin[_vd.nameBg] = this.getFallbackLvl(
        _fbEssence,
        variation,
        fbLength
      );

      console.log(_vd.nameBg, _fbEssence);

      this.generateBackgrounds(_essence);

      this.skin[_vd.isDark] = this.skin[_vdf.isDark];

      this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
      this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
      this.skin[_vd.gradientAngle] = this.skin[_vdf.gradientAngle];

      this.generateGradientss(_essence);

      this.skin[_vd.isCustomTxt] = this.skin[_vdf.isCustomTxt];
      this.skin[_vd.nameTxt] = this.skin[_vdf.nameTxt];
      this.generateTextss(_essence);

      this.skin[_vd.isCustomAccent] = this.skin[_vdf.isCustomAccent];
      this.skin[_vd.nameAccent] = this.skin[_vdf.nameAccent];
      this.generateAccentss(_essence);

      this.skin[_vd.isCustomBorder] = this.skin[_vdf.isCustomBorder];
      this.skin[_vd.nameBorder] = this.skin[_vdf.nameBorder];
      this.generateBorderss(_essence);

      this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
      this.skin[_vd.nameTxtInverse] = tinycolor(
        this.skin[_vd.nameTxt]
      ).isLight()
        ? "#262626"
        : "#fff";
    }
  }

  createFallbackArray(essence) {
    let _essence = essence;
    let fbArr = [];
    let fb = _essence.fallback;

    while (fb) {
      fbArr.push(fb);
      fb = this.mergedConfig[fb].fallback;
    }

    return fbArr;
  }

  saveConfig() {
    this.message("config saved", true);
    let config = {};
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      let verbalData = this.verbalData(_essence);
      config[verbalData.name] = {};
      config[verbalData.name].Background = {
        isActive: this.skin[verbalData.isName],
        color: this.skin[verbalData.nameBg],
        isDark: this.skin[verbalData.isDark],
      };
      if (this.skin[verbalData.isGradient]) {
        config[verbalData.name].Gradient = {
          isActive: this.skin[verbalData.isName],
          color: this.skin[verbalData.nameBg_g],
          angle: this.skin[verbalData.gradientAngle],
        };
      }
      if (this.skin[verbalData.isCustomTxt]) {
        config[verbalData.name].Text = {
          isActive: this.skin[verbalData.isCustomTxt],
          color: this.skin[verbalData.nameTxt],
        };
      }
      if (this.skin[verbalData.isCustomAccent]) {
        config[verbalData.name].Accent = {
          isActive: this.skin[verbalData.isCustomAccent],
          color: this.skin[verbalData.nameAccent],
        };
      }
      if (this.skin[verbalData.isCustomBorder]) {
        config[verbalData.name].Border = {
          isActive: this.skin[verbalData.isCustomBorder],
          color: this.skin[verbalData.nameBorder],
        };
      }
      if (this.skin[verbalData.nameRadius]) {
        config[verbalData.name].borderRadius = this.skin[verbalData.nameRadius];
      }
    }

    this.copyTextToClipboard(config);

    let timeout = null;
    if (!timeout) {
      timeout = window.setTimeout(() => {
        this.message("", false);
        clearTimeout(timeout);
      }, 1000);
    }

    return config;
  }

  copyTextToClipboard(text) {
    let _text = JSON.stringify(text);

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(_text);
      return;
    }
    navigator.clipboard.writeText(_text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  toggleEnabled(coltrol) {
    let disabled = coltrol.classList.contanis("disable");
    disabled
      ? coltrol.classList.remove("disable")
      : coltrol.classList.add("disable");
  }

  controlDisable(control) {
    control.classList.add("skinner_disabled");
  }

  controlEnable(control) {
    control.classList.remove("skinner_disabled");
  }

  updateControlFor(name) {
    let c = this.verbalData(name);
    this.essenceGroups[name].style.setProperty("--bg", this.skin[c.nameBg]);
    this.essenceGroups[name].style.setProperty("--Txt", this.skin[c.nameTxt]);
    this.essenceGroups[name].style.setProperty(
      "--Accent",
      this.skin[c.nameAccent]
    );
    this.essenceGroups[name].style.setProperty(
      "--AccentTxt",
      this.skin[c.nameAccentTxt]
    );

    this.essenceGroups[name].style.setProperty(
      "--Border",
      this.skin[c.nameBorder]
    );

    this.essenceGroups[name].style.setProperty(
      "--Radius",
      this.skin[c.nameRadius]
    );

    let isEssenceActive = this.skin[c.isName];
    this.essenceGroups[name].className = isEssenceActive
      ? "nik_skinner_control_group state_active"
      : "nik_skinner_control_group state_inactive";

    this.skin[c.isName]
      ? this.controlEnable(this[c.nameBg].picker)
      : this.controlDisable(this[c.nameBg].picker);
    this.skin[c.isGradient]
      ? this.controlEnable(this[c.nameBg].picker2)
      : this.controlDisable(this[c.nameBg].picker2);
    this.skin[c.isCustomTxt]
      ? this.controlEnable(this[c.nameBg].picker3)
      : this.controlDisable(this[c.nameBg].picker3);
    this.skin[c.isCustomBorder]
      ? this.controlEnable(this[c.nameBg].borderPckr)
      : this.controlDisable(this[c.nameBg].borderPckr);
    this.skin[c.isCustomAccent]
      ? this.controlEnable(this[c.nameBg].customAccentPckr)
      : this.controlDisable(this[c.nameBg].customAccentPckr);

    this[c.nameBg].radiusInput.disabled = !this.skin[c.isName];

    this[c.nameBg].checkBox2.disabled = !this.skin[c.isName];
    this[c.nameBg].checkBox3.disabled = !this.skin[c.isName];
    this[c.nameBg].borderChb.disabled = !this.skin[c.isName];
    this[c.nameBg].customAccentChb.disabled = !this.skin[c.isName];
    this[c.nameBg].checkBoxIsDark.disabled = !this.skin[c.isName];
    this[c.nameBg].gradientAnglePicker.setDisabled(this.skin[c.isGradient]);

    this[c.nameBg].checkBox.checked = this.skin[c.isName];
    this[c.nameBg].checkBox2.checked = this.skin[c.isGradient];
    this[c.nameBg].checkBoxIsDark.checked = this.skin[c.isDark];
    this[c.nameBg].checkBox3.checked = this.skin[c.isCustomTxt];
    this[c.nameBg].customAccentChb.checked = this.skin[c.isCustomAccent];
    this[c.nameBg].borderChb.checked = this.skin[c.isCustomBorder];

    if (name === "body") {
      this[c.nameBg].checkBox.checked = true;
      this[c.nameBg].checkBox.disabled = true;
    }
    if (name === "accent") {
      this[c.nameBg].checkBox.checked = true;
      this[c.nameBg].checkBox.disabled = true;
    }

    this[c.nameBg].picker.style.background = this.skin[c.nameBg];
    this[c.nameBg].picker2.style.background = this.skin[c.nameBg_g];
    this[c.nameBg].borderPckr.style.background = this.skin[c.nameBorder];
    this[c.nameBg].customAccentPckr.style.background = this.skin[c.nameAccent];
    this[c.nameBg].radiusInput.value = this.skin[c.nameRadius];
    this[c.nameBg].radiusAmount.value = this.skin[c.nameRadius];
  }

  updateAllControls() {
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      if (!this.mergedConfig[_essence].editable) {
        continue;
      }
      this.updateControlFor(_essence);
    }
  }

  createHTML() {
    let _config = this.mergedConfig;
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      if (!_config[_essence].editable) continue;
      let _vd = this.verbalData(_essence);
      let _hiddenControlsArray = _config[_essence].hide;

      this[_vd.nameBg] = this.createControl([
        _essence,
        this.skinnerContainer,
        (e) => {
          this.modifyKey(_vd.isName, e.target.checked);
        },
        (e) => {
          this.modifyKey(_vd.isGradient, e.target.checked);
        },
        (e) => {
          console.log({ e });
          this.modifyKey(_vd.gradientAngle, e.data.angle);
        },
        (e) => {
          this.handlePicker(e, _vd.nameBg, (color) =>
            this.modifyKey(_vd.nameBg, color)
          );
        },
        (e) => {
          this.handlePicker(e, _vd.nameBg_g, (color) =>
            this.modifyKey(_vd.nameBg_g, color)
          );
        },
        (e) => {
          this.modifyKey(_vd.isDark, e.target.checked);
        },
        (e) => {
          this.modifyKey(_vd.isCustomTxt, e.target.checked);
        },
        (e) => {
          this.handlePicker(e, _vd.nameTxt, (color) =>
            this.modifyKey(_vd.nameTxt, color)
          );
        },
        (e) => {
          this.modifyKey(_vd.isCustomAccent, e.target.checked);
        },
        (e) => {
          this.handlePicker(e, _vd.nameAccent, (color) =>
            this.modifyhandlePickerKey(_vd.nameAccent, color)
          );
        },
        (e) => {
          this.modifyKey(_vd.isCustomBorder, e.target.checked);
        },
        (e) => {
          this.handlePicker(e, _vd.nameBorder, (color) =>
            this.modifyKey(_vd.nameBorder, color)
          );
        },
        (e) => {
          this.modifyKey(_vd.nameRadius, e.target.value);
        },
        _hiddenControlsArray,
      ]);
    }
  }

  handlePicker(event, key, onChangeCallback) {
    if ("EyeDropper" in window) {
      const ed = new EyeDropper();
      ed.open()
        .then((color) => {
          if (color) {
            // Trigger the callback with the selected color
            onChangeCallback(color.sRGBHex);
          }
        })
        .catch((error) => {
          console.error("Error using EyeDropper:", error);
        });
    } else {
      console.error("EyeDropper API is not supported in this browser.");
    }
  }

  toggleUi() {
    document.body.classList.toggle("nik_hide_ui");
  }

  createControlsWrapper() {
    const skinnerRoot = this.skinnerRoot;
    skinnerRoot.id = "skinner_ui_root_id";

    const skinnerUITogglerLabel = document.createElement("label");
    skinnerUITogglerLabel.id = "skinner_ui_toggler";
    const skinnerUITogglerImitator = document.createElement("i");
    skinnerUITogglerImitator.className = this.classNames.ico;
    skinnerUITogglerImitator.innerHTML = this.icons.eye;
    this.skinnerUIToggler = document.createElement("input");
    this.skinnerUIToggler.type = "checkbox";
    this.skinnerUIToggler.id = "skinner_ui_toggler";

    skinnerUITogglerLabel.appendChild(this.skinnerUIToggler);

    skinnerUITogglerLabel.appendChild(skinnerUITogglerImitator);

    this.skinnerUIToggler.addEventListener("change", this.toggleUi);
    this.overlay = document.createElement("div");
    this.skinnerUiControls = document.createElement("div");
    this.skinnerUiControls.className = "sk_ui_controls";
    this.overlay.id = "skinner_overlay";
    skinnerRoot.appendChild(this.overlay);
    let toolbox = document.createElement("div");
    toolbox.appendChild(this.skinnerUiControls);
    toolbox.className = "skinner_toolbox";
    let toolboxWrapper = document.createElement("div");
    toolboxWrapper.className = "skinner_toolbox_wrapper";
    let main = document.createElement("div");
    main.className = "nik_skinner_control_wrapper nik_skinner_scrollbar";
    let header = document.createElement("div");
    header.className = "nik_skinner_header_controls";
    toolbox.appendChild(toolboxWrapper);
    this.toolbox = toolbox;
    toolboxWrapper.appendChild(header);

    let tableHeaders = [
      "Background",
      "Gradient",
      "Text",
      "Accent",
      "Border",
      "Radius",
    ];

    tableHeaders.forEach((h, index) => {
      let heading = document.createElement("div");
      let className;
      switch (h) {
        case "name":
          className =
            "nik_skinner_header_control nik_skinner_header_control-name";
          break;
        case "Background":
          className =
            "nik_skinner_header_control nik_skinner_header_control-bg";
          break;
        case "Gradient":
          className =
            "nik_skinner_header_control nik_skinner_header_control-gg";
          break;
        case "Text":
        case "Accent":
        case "Border":
          className =
            "nik_skinner_header_control nik_skinner_header_control-small";
          break;
        case "Radius":
          className =
            "nik_skinner_header_control nik_skinner_header_control-radius";
          break;
        default:
          className = "nik_skinner_header_control";
      }
      heading.className = className;
      heading.innerText = h;
      header.appendChild(heading);
    });

    toolboxWrapper.appendChild(main);
    skinnerRoot.appendChild(toolbox);
    this.toolboxWrapper = toolboxWrapper;
    return main;
  }

  createBtn(name, className) {
    let _class = className || "";
    let btn = document.createElement("button");
    btn.innerText = name;
    btn.className = `skinner_btn ${_class}`;
    let txt = document.createElement("span");
    let icon = document.createElement("i");
    icon.innerHTML = this.icons.download;
    txt.innerText = name;
    btn.append(icon);
    btn.append(txt);

    return btn;
  }

  createIconBtn(className, iconName) {
    let _iconName = iconName || "download";
    let _class = className || "";
    let btn = document.createElement("button");
    let icon = document.createElement("i");
    icon.innerHTML = this.icons[_iconName];
    btn.append(icon);
    btn.className = `skinner_btn ${_class}`;

    return btn;
  }

  createIconBtn(className, iconName) {
    let _iconName = iconName || "download";
    let _class = className || "";
    let btn = document.createElement("button");
    let icon = document.createElement("i");
    icon.innerHTML = this.icons[_iconName];
    btn.append(icon);
    btn.className = `skinner_btn ${_class}`;

    return btn;
  }
  createDownloadBtn(name, className, number) {
    let _dn = "" + name;

    let btn = this.createBtn(_dn, className);

    btn.addEventListener("click", () => {
      this.makeDownloadRequest(_dn, number);
    });
    return btn;
  }

  createDownloadButton() {
    this.btnWrapper = document.createElement("div");
    this.btnWrapper.className = "nik_skinner_download_button_wrapper";

    this.btnWrapperTop = document.createElement("div");
    this.btnWrapperTop.className = "nik_skinner_download_button_wrapper_row";

    this.btnWrapperBottom = document.createElement("div");
    this.btnWrapperBottom.className = "nik_skinner_download_button_wrapper_row";
    this.btnWrapper.appendChild(this.btnWrapperTop);
    this.btnWrapper.appendChild(this.btnWrapperBottom);

    const actionsWrapper = document.createElement("div");
    actionsWrapper.className = "sk_actions_wrapper";

    this.toolboxWrapper.appendChild(actionsWrapper);

    let config = this.cssCb(this.skin);
    let name = config.name;
    let name2 = config.name2;

    let saveConfigBtn = this.createIconBtn("skinner_btn-icon", "copy");

    let loadConfigInput = document.createElement("textarea");
    loadConfigInput.spellcheck = false;
    loadConfigInput.placeholder = "enter copied config";
    loadConfigInput.className = "nik_skinner_input nik_skinner_scrollbar";

    let loadConfigInputWrapper = document.createElement("div");
    loadConfigInputWrapper.className = "nik_skinner_input_wrapper";

    let loadConfigButton = this.createIconBtn("skinner_btn-icon", "recolor");

    loadConfigButton.addEventListener("click", () => {
      let _config = loadConfigInput.value
        ? JSON.parse(loadConfigInput.value)
        : null;

      this.initBasedOnCustomConfig(_config);
      loadConfigInput.value = "";
    });

    saveConfigBtn.addEventListener("click", () => {
      this.saveConfig();
    });

    actionsWrapper.appendChild(saveConfigBtn);
    loadConfigInputWrapper.appendChild(loadConfigInput);
    actionsWrapper.appendChild(loadConfigInputWrapper);
    actionsWrapper.appendChild(loadConfigButton);

    actionsWrapper.appendChild(
      this.createDownloadBtn(name, "skinner_btn-accent")
    );
    if (name2) {
      actionsWrapper.appendChild(
        this.createDownloadBtn(name2, "skinner_btn-accent", 2)
      );
    }

    let customDownloadBtn = document.createElement("button");
    customDownloadBtn.className = "skinner_btn skinner_btn-accent";
    customDownloadBtn.innerText = "custom css";
    customDownloadBtn.addEventListener("click", () => {
      this.makeCustomDownloadRequest();
    });
    actionsWrapper.appendChild(customDownloadBtn);

    // ----- On-demand Custom CSS Download Button End -----

    this.messageWrapper = document.createElement("div");
    this.messageWrapper.className = "nik_skinner_message hide";
    document.body.appendChild(this.messageWrapper);
  }

  async makeCustomDownloadRequest() {
    let css = this.customStyler.createCss();
    var element = document.createElement("a");
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var fileNameSuffix = hours + "-" + minutes;
    element.setAttribute(
      "href",
      "data:text/css;charset=utf-8," + encodeURIComponent(css)
    );
    element.setAttribute(
      "download",
      "sk_custom_css" + "_" + fileNameSuffix + ".css"
    );
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  async makeDownloadRequest(name, number) {
    let css;
    if (number) {
      css = this.cssCb(this.skin)["css" + number];
    } else {
      css = this.cssCb(this.skin).css;
    }

    var element = document.createElement("a");
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var fileNameSuffix = hours + "-" + minutes;
    element.setAttribute(
      "href",
      "data:text/css;charset=utf-8," + encodeURIComponent(css)
    );
    element.setAttribute("download", name + "_" + fileNameSuffix + ".css");
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  addUiThemeSwitcher() {
    let _id = "skinner_ui_switcher";
    let switcherWrapper = document.createElement("label");
    switcherWrapper.className = this.classNames.uiSwitch;
    switcherWrapper.for = _id;
    let inp = document.createElement("input");
    inp.id = _id;
    inp.type = "checkbox";

    let thumb = document.createElement("span");

    let darkColors = this.uiColors.dark;
    let lightColors = this.uiColors.light;

    inp.addEventListener("change", (e) => {
      let uiTheme = e.currentTarget.checked ? darkColors : lightColors;
      this.updateUiPalette(uiTheme);
    });

    switcherWrapper.appendChild(inp);
    switcherWrapper.appendChild(thumb);
    this.skinnerUiControls.appendChild(switcherWrapper);

    // Create the toggle button in the same area as the theme switcher
    let toggleBtn = document.createElement("button");
    toggleBtn.id = "toggleEditorBtn";
    toggleBtn.className = "skinner_btn skinner_btn-icon";
    toggleBtn.innerText = "toggle Editor";

    // Replace the previous document.getElementById('toggleButton') logic with this:
    toggleBtn.addEventListener("click", () => {
      if (this.customStyler) {
        // Toggle the boolean flag
        this.isStylerToggledOn = !this.isStylerToggledOn;
        this.customStyler.toggleStyler();
      }
    });
    this.skinnerUiControls.appendChild(toggleBtn);
    // ----- New Toggle Button End -----
  }

  createCloseButton() {
    this.toolBox = document.querySelector(".skinner_toolbox");
    this.closeBtn = document.createElement("input");
    this.closeBtn.type = "checkbox";
    this.closeBtn.id = "skToggleUi";
    this.closeBtn.className = "skinner_toolbox_toggler";
    this.closeBtnLabel = document.createElement("label");
    this.closeBtnLabel.className = "sk_chb_base";
    this.closeBtnIcon = document.createElement("i");
    this.closeBtnIcon.className = "sk_chb_base_ico";
    this.closeBtnIcon.innerHTML = this.icons.showHide;
    this.closeBtnLabel.htmlFor = "skToggleUi";

    this.closeBtn.addEventListener("change", () => {
      this.toolBox.classList.toggle("skinner_toolbox-hide");
    });
    this.closeBtnLabel.appendChild(this.closeBtn);
    this.closeBtnLabel.appendChild(this.closeBtnIcon);
    let chbWrapper = document.createElement("div");
    chbWrapper.className = "skinner_ui_control_wrapper";
    chbWrapper.appendChild(this.closeBtnLabel);
    this.skinnerUiControls.appendChild(chbWrapper);
  }

  showOverlay() {
    const overlay = this.overlay;
    overlay.style.display = "block";
  }

  hideOverlay() {
    const overlay = this.overlay;
    overlay.style.display = "none";
  }

  createSpan(className, text) {
    const span = document.createElement("span");
    const _className = className || "skinner_txt";
    const _text = text || "provide txt";

    span.className = _className;
    span.innerText = _text;

    return span;
  }

  createColorBox(color, className, callBack) {
    let div = document.createElement("div");
    div.className = className;
    div.style.background = color;
    div.addEventListener("click", callBack);

    return div;
  }

  createControl(params) {
    const [
      label,
      parent,
      checkboxCallback,
      gradientCallback,
      angleChangeCallback,
      pickerCallback,
      picker2Callback,
      isDarkCallback,
      isCustomTxtCb,
      customTxtCb,
      isCustomAccentCb,
      customAccentCb,
      isCustomBorderCb,
      customBorderCb,
      customRadiusCb,
      hideConfigArray,
    ] = params;
    let t = this;
    let verbalData = this.verbalData(label);

    let _label = document.createElement("button");
    _label.className = "nik_skinner_control_collapse_collapser";
    let _labelSpan = document.createElement("span");
    let _labelArrow = document.createElement("div");
    _labelArrow.className = "skinner_ico_arrow";

    _labelSpan.innerText = this.labelsMap[label]
      ? this.labelsMap[label]
      : label;
    _label.appendChild(_labelSpan);
    // _label.appendChild(_labelArrow);

    let pickerMainColor = this.skin[label + "Bg"];
    let pickerGradientColor = this.skin[label + "Bg_g"];
    let pickerTextColor = this.skin[label + "Txt"];
    let pickerBorderColor = this.skin[verbalData.nameBorder];
    let pickerCustomAccentColor = this.skin[verbalData.nameAccent]
      ? this.skin[verbalData.nameAccent]
      : this.skin.accentBg;

    let wrapper = document.createElement("div");
    wrapper.className = "nik_skinner_control_group";
    this.essenceGroups[label] = wrapper;

    let ddContent = document.createElement("div");
    ddContent.className = "nik_skinner_control_collapse_content";

    // _label.addEventListener("click", () => {
    //     _label.classList.toggle("nik_skinner_control_collapse_collapser-open");
    //     ddContent.classList.toggle("nik_skinner_control_collapse_content-show");
    //     _labelArrow.classList.toggle("skinner_ico_arrow-rotated");
    // });
    let isEnabledChb;
    let chb = this.createCheckBox(label);
    isEnabledChb = chb.checkbox;

    const onEnableChange = function (e) {
      checkboxCallback(e);
      t.modifyKey(
        verbalData.nameBg,
        tinycolor(t[verbalData.nameBg].picker.style.background).toHexString()
      );
    };

    isEnabledChb.addEventListener("change", onEnableChange);

    this.eventListeners.push({
      element: isEnabledChb,
      type: "change",
      listener: onEnableChange,
    });

    let labelWrapper = document.createElement("div");
    labelWrapper.className = "skn_controls_row";

    labelWrapper.appendChild(chb.label);
    labelWrapper.appendChild(_label);
    wrapper.appendChild(labelWrapper);
    wrapper.appendChild(ddContent);

    //main color

    let isEnabledControl, isEnabledPckr;
    {
      //isEnabledPckrDiv = this.createDiv("nik_skinner_control_group_picker");
      isEnabledControl = this.createDiv(
        "nik_skinner_checkbox_wrapper state_delay_1"
      );

      ddContent.appendChild(isEnabledControl);
      isEnabledControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.background)
      );

      isEnabledPckr = this.createColorBox(
        pickerMainColor,
        "nik_skinner_control_group_picker",
        pickerCallback
      );
      isEnabledControl.appendChild(isEnabledPckr);
    }

    let isDarkChb;
    {
      let n = label;

      let vb = this.verbalData(n);

      let tintsArr = [
        {
          name: vb.nameBg,
          val: this.skin[vb.nameBg],
        },
        {
          name: vb.nameBg2,
          val: this.skin[vb.nameBg2],
        },
        {
          name: vb.nameBg3,
          val: this.skin[vb.nameBg3],
        },
      ];
      const onDarkChange = function (e) {
        isDarkCallback(e);
      };

      let chb = this.createCheckBox(label + "dark", "variant_tone", tintsArr);
      isDarkChb = chb.checkbox;

      isDarkChb.addEventListener("change", onDarkChange);

      this.eventListeners.push({
        element: isDarkChb,
        type: "change",
        listener: onDarkChange,
      });
      isEnabledControl.appendChild(chb.label);
    }

    //gradient

    let isGradientEnabledControl, isGradientEnabledChb, isGradientEnabledPckr;
    {
      //isGradientEnabledPckrDiv = this.createDiv(
      //    "nik_skinner_control_group_picker"
      //);
      isGradientEnabledControl = this.createDiv(
        "nik_skinner_checkbox_wrapper state_delay_2"
      );
      let chb = this.createCheckBox(label + "_g");
      isGradientEnabledChb = chb.checkbox;
      const onGradientEnableChange = function (e) {
        gradientCallback(e);
      };

      isGradientEnabledChb.addEventListener("change", onGradientEnableChange);
      ddContent.appendChild(isGradientEnabledControl);
      isGradientEnabledControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.gradient)
      );
      isGradientEnabledControl.appendChild(chb.label);
      isGradientEnabledPckr = this.createColorBox(
        pickerGradientColor,
        "nik_skinner_control_group_picker",
        picker2Callback
      );
      isGradientEnabledControl.appendChild(isGradientEnabledPckr);

      this.eventListeners.push({
        element: isGradientEnabledChb,
        type: "change",
        listener: onGradientEnableChange,
      });
    }

    let anglePicker;
    {
      anglePicker = new AnglePicker(isGradientEnabledControl);

      const onAngleChange = function (e) {
        angleChangeCallback(e);
      };

      anglePicker.eventTarget.addEventListener("angleChange", onAngleChange);

      this.eventListeners.push({
        element: anglePicker.eventTarget,
        type: "angleChange",
        listener: onAngleChange,
      });
    }

    //custom text

    let isCustomTextControl, isCustomTextChb, isCustomTextPckr;
    {
      isCustomTextControl = this.createDiv(
        "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small state_delay_3"
      );
      let chb = this.createCheckBox(label + "_text");
      isCustomTextChb = chb.checkbox;

      const onTextEnableChange = function (e) {
        isCustomTxtCb(e);
      };

      isCustomTextChb.addEventListener("change", onTextEnableChange);
      ddContent.appendChild(isCustomTextControl);
      isCustomTextControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.text)
      );
      isCustomTextControl.appendChild(chb.label);
      isCustomTextPckr = this.createColorBox(
        pickerTextColor,
        "nik_skinner_control_group_picker variant_text",
        customTxtCb
      );
      isCustomTextControl.appendChild(isCustomTextPckr);

      this.eventListeners.push({
        element: isCustomTextChb,
        type: "change",
        listener: onTextEnableChange,
      });
    }

    //custom accent

    let customAccentControl, customAccentChb, customAccentPckr;
    if (isCustomAccentCb && customAccentCb) {
      customAccentControl = this.createDiv(
        "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small state_delay_4"
      );
      let chb = this.createCheckBox(label + "_custom_accent");
      customAccentChb = chb.checkbox;
      const onAccentEnableChange = function (e) {
        isCustomAccentCb(e);
      };
      customAccentChb.addEventListener("change", onAccentEnableChange);
      ddContent.appendChild(customAccentControl);
      customAccentControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.accent)
      );
      customAccentControl.appendChild(chb.label);
      customAccentPckr = this.createColorBox(
        pickerCustomAccentColor,
        "nik_skinner_control_group_picker variant_accent",
        customAccentCb
      );
      customAccentControl.appendChild(customAccentPckr);
      this.eventListeners.push({
        element: customAccentChb,
        type: "change",
        listener: onAccentEnableChange,
      });
    }

    //custom border

    let borderControl, borderChb, borderPckr;
    if (isCustomBorderCb && customBorderCb) {
      borderControl = this.createDiv(
        "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small state_delay_5"
      );
      let chb = this.createCheckBox(label + "_border");
      borderChb = chb.checkbox;

      const onBorderEnableChange = function (e) {
        isCustomBorderCb(e);
      };

      borderChb.addEventListener("change", onBorderEnableChange);
      ddContent.appendChild(borderControl);
      borderControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.border)
      );
      borderControl.appendChild(chb.label);
      borderPckr = this.createColorBox(
        pickerBorderColor,
        "nik_skinner_control_group_picker variant_border",
        customBorderCb
      );
      borderControl.appendChild(borderPckr);
      this.eventListeners.push({
        element: borderChb,
        type: "change",
        listener: onBorderEnableChange,
      });
    }

    //custom roundness

    let radiusControl, radiusInput, radiusAmount;
    if (customRadiusCb) {
      radiusControl = this.createDiv(
        "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-range"
      );
      radiusInput = document.createElement("input");
      radiusInput.type = "range";
      radiusInput.min = 0;
      radiusInput.max = 100;
      radiusAmount = document.createElement("input");
      radiusAmount.type = "number";
      radiusAmount.className = "nik_skinner_radius_amount";

      const onRadiusRangeInput = function (e) {
        radiusAmount.value = e.target.value;
        customRadiusCb(e);
      };

      const onRadiusInputInput = function (e) {
        radiusInput.value = e.target.value;
        customRadiusCb(e);
      };

      radiusInput.addEventListener("input", onRadiusRangeInput);

      radiusAmount.addEventListener("input", onRadiusInputInput);
      ddContent.appendChild(radiusControl);
      radiusControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.radius)
      );

      radiusControl.appendChild(radiusInput);
      radiusControl.appendChild(radiusAmount);

      this.eventListeners.push({
        element: radiusInput,
        type: "input",
        listener: onRadiusRangeInput,
      });
      this.eventListeners.push({
        element: radiusAmount,
        type: "input",
        listener: onRadiusInputInput,
      });
    }

    let _hideConfigArray = hideConfigArray || [];

    const configMap = {
      background: isEnabledControl,
      gradient: isGradientEnabledControl,
      text: isCustomTextControl,
      accent: customAccentControl,
      border: borderControl,
      radius: radiusControl,
    };

    parent.appendChild(wrapper);

    _hideConfigArray.forEach((config) => {
      const el = configMap[config];
      if (!el) return console.warn(config + " not found in map");
      el.classList.add("nik-hidden");
    });

    return {
      picker: isEnabledPckr,
      picker2: isGradientEnabledPckr,
      checkBox: isEnabledChb,
      checkBox2: isGradientEnabledChb,
      gradientAnglePicker: anglePicker,
      checkBoxIsDark: isDarkChb,
      checkBox3: isCustomTextChb,
      picker3: isCustomTextPckr,
      customAccentChb: customAccentChb,
      customAccentPckr: customAccentPckr,
      borderChb: borderChb,
      borderPckr: borderPckr,
      radiusInput: radiusInput,
      radiusAmount: radiusAmount,
    };
  }

  createDiv(className) {
    let div = document.createElement("div");
    div.className = className;

    return div;
  }

  createCheckBox(id, cn, tints) {
    let _id = id;
    let _cn = cn || "default";

    let label, icon, checkbox;
    label = document.createElement("label");
    label.className = "skinner_custom_chb_label " + (_cn ? _cn : "");
    label.htmlFor = _id;
    icon = document.createElement("i");
    icon.className = "skinner_custom_chb " + (_cn ? _cn : "");
    if (!tints) {
      icon.innerHTML = this.icons.chb;
    }
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = _id;

    label.appendChild(checkbox);
    label.appendChild(icon);

    if (tints && tints.length > 0) {
      tints.forEach((t, i) => {
        label.style.setProperty(`--bg${i + 1}`, `var(--${t.name})`);
      });
    }

    return {
      label: label,
      checkbox: checkbox,
    };
  }

  message(text, show) {
    let t = this;
    let _text = text || "generic message";
    let _show = show || false;

    if (_show) {
      t.messageWrapper.innerText = _text;
      t.messageWrapper.classList.remove("hide");
    } else {
      t.messageWrapper.classList.add("hide");
    }
  }

  updateUiPalette(colors) {
    this.generateUiPalette(colors);
  }

  // generateUiPalette(colors) {}

  generateUiPalette(colors) {
    const UISkin = {};
    UISkin.order = ["dominant", "accent"];

    //this.uiColors.bg = tinycolor(this.uiColors.bg).darken(80).desaturate(60).toString();
    let step = 4;
    const _vdDominant = this.verbalData("sk_dominant");
    const _vdAccent = this.verbalData("sk_accent");

    const dominantKeyNames = [
      _vdDominant.nameBgHov,
      _vdDominant.nameBg2,
      _vdDominant.nameBg2Hov,
      _vdDominant.nameBg3,
      _vdDominant.nameBg3Hov,
    ];

    let firstDominantBg = colors.bg;
    let isDark = colors.name === "dark" ? true : true;
    UISkin.dominant = {};
    UISkin.dominant[_vdDominant.nameBg] = firstDominantBg;
    dominantKeyNames.forEach((bgName, i) => {
      UISkin.dominant[bgName] = isDark
        ? chroma(firstDominantBg).darken(0.2 * (i + 1))
        : chroma(firstDominantBg).brighten(0.2 * (i + 1));
    });

    const accentKeyNames = [
      _vdAccent.nameBgHov,
      _vdAccent.nameBg2,
      _vdAccent.nameBg2Hov,
      _vdAccent.nameBg3,
      _vdAccent.nameBg3Hov,
    ];

    let firstAccentBg = colors.accent;
    UISkin.accent = {};
    UISkin.accent[_vdAccent.nameBg] = firstAccentBg;
    accentKeyNames.forEach((bgName, i) => {
      UISkin.accent[bgName] = isDark
        ? chroma(firstAccentBg).darken(0.2 * (i + 1))
        : chroma(firstAccentBg).brighten(0.2 * (i + 1));
    });

    const dominantTextKeyNames = [
      _vdDominant.nameTxt,
      _vdDominant.nameTxt2,
      _vdDominant.nameTxt2,
    ];
    let firstDominantTxt = guessVisibleColor(firstDominantBg);
    dominantTextKeyNames.forEach((TxtName, i) => {
      UISkin.dominant[TxtName] = chroma(firstDominantTxt)
        .alpha(1 - (i + 1) * 0.2)
        .css();
    });

    const accentTextKeyNames = [
      _vdAccent.nameTxt,
      _vdAccent.nameTxt2,
      _vdAccent.nameTxt2,
    ];
    let firstAccentTxt = guessVisibleColor(firstAccentBg);
    accentTextKeyNames.forEach((TxtName, i) => {
      UISkin.accent[TxtName] = chroma(firstAccentTxt)
        .alpha(1 - (i + 1) * 0.2)
        .css();
    });

    // let shadow = islight
    //   ? tinycolor(bg).lighten(6).toHexString()
    //   : tinycolor(bg).darken(6).toHexString();

    UISkin.order.forEach((name, i) => {
      let _vd = this.verbalData(`sk_${name}`);
      document.documentElement.style.setProperty(
        `--${_vd.nameBg}`,
        `${UISkin[name][_vd.nameBg]}`
      );
      document.documentElement.style.setProperty(
        `--${_vd.nameBgHov}`,
        `${UISkin[name][_vd.nameBgHov]}`
      );
      document.documentElement.style.setProperty(
        `--${_vd.nameBg2}`,
        `${UISkin[name][_vd.nameBg2]}`
      );
      document.documentElement.style.setProperty(
        `--${_vd.nameBg2Hov}`,
        `${UISkin[name][_vd.nameBg2Hov]}`
      );
      document.documentElement.style.setProperty(
        `--${_vd.nameBg3}`,
        `${UISkin[name][_vd.nameBg3]}`
      );
      document.documentElement.style.setProperty(
        `--${_vd.nameBg3Hov}`,
        `${UISkin[name][_vd.nameBg3Hov]}`
      );

      document.documentElement.style.setProperty(
        `--${_vd.nameTxt}`,
        `${UISkin[name][_vd.nameTxt]}`
      );
      document.documentElement.style.setProperty(
        `--${_vd.nameTxt2}`,
        `${UISkin[name][_vd.nameTxt2]}`
      );
      document.documentElement.style.setProperty(
        `--${_vd.nameTxt3}`,
        `${UISkin[name][_vd.nameTxt3]}`
      );
    });
  }

  addCss() {
    const css = `
:root {
  --sk_zind: 90000000;
  --sk_zind2: calc(var(--sk_zind) + 10);
  --skinnerHeaderHeight: 32px;
  --skinnerHeaderTogglerSize: 50px;
  --skinnerToolboxHeight: 24px;
  --skinnerToolboxFooterHeight: 48px;
  --skinnerBtnHeight: 26px;
  --skinnerToolboxCollapserSize: 42px;
  --control-picker-size: 24px;
  --control-picker-size-border: calc(var(--control-picker-size) - 4px);
  --controls-row-height: 32px;
  --controls-ui-gap: 6px;
  --controls-ui-pad-x: 6px;
  --controls-ui-pad-y: 6px;
}

.sk_path_string_root {
  height: 40px;
  position: relative;
  width: 100%;
  position: absolute;
  top: 4px;
}

.sk_path_string_box {
  width: 100%;
  height: 40px;
  position: relative;
}

.sk_path_string_root > svg {
  position: absolute;
  height: 40px;
  width: 100%;
  top: 0px;
  stroke: var(--sk_accentBg);
  stroke-width: 1px;
  fill: none;
}

.pickr {
  position: relative;
  overflow: visible;
  transform: translateY(0);
}

.pickr * {
  box-sizing: border-box;
  outline: none;
  border: none;
  -webkit-appearance: none;
}

.pickr .pcr-button {
  position: relative;
  height: 35px;
  width: 35px;
  padding: 0.5em;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, sans-serif;
  border-radius: 2px;
  overflow: hidden;
  background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="%2342445A" stroke-width="5px" stroke-linecap="round"><path d="M45,45L5,5"></path><path d="M45,5L5,45"></path></svg>')
    no-repeat 50%;
  background-size: 0;
  transition: all 0.3s;
}

.pickr .pcr-button:before {
  /*background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');*/
  background-size: 0.5em;
  z-index: -1;
  z-index: auto;
}

.pickr .pcr-button:after,
.pickr .pcr-button:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.15em;
}

.pickr .pcr-button:after {
  transition: background 0.3s;
  background: var(--pcr-color);
}

.pickr .pcr-button.clear {
  background-size: 70%;
}

.pickr .pcr-button.clear:before {
  opacity: 0;
}

.pickr .pcr-button.clear:focus {
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.85), 0 0 0 3px var(--pcr-color);
}

.pickr .pcr-button.disabled {
  cursor: not-allowed;
}

.pcr-app *,
.pickr * {
  box-sizing: border-box;
  outline: none;
  border: none;
  -webkit-appearance: none;
}

.pcr-app button.pcr-active,
.pcr-app button:focus,
.pcr-app input.pcr-active,
.pcr-app input:focus,
.pickr button.pcr-active,
.pickr button:focus,
.pickr input.pcr-active,
.pickr input:focus {
  /*box-shadow: 0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px var(--pcr-color)*/
}

.pcr-app .pcr-palette,
.pcr-app .pcr-slider,
.pickr .pcr-palette,
.pickr .pcr-slider {
  transition: box-shadow 0.3s;
}

.pcr-app .pcr-palette:focus,
.pcr-app .pcr-slider:focus,
.pickr .pcr-palette:focus,
.pickr .pcr-slider:focus {
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.85), 0 0 0 3px rgba(0, 0, 0, 0.25);
}

.pcr-app {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  border-radius: 0.1em;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0s 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, sans-serif;
  box-shadow: 0 0.15em 1.5em 0 rgba(0, 0, 0, 0.1), 0 0 1em 0 rgba(0, 0, 0, 0.03);
  left: 0;
  top: 0;
}

.pcr-app.visible {
  transition: opacity 0.3s;
  visibility: visible;
  opacity: 1;
}

.pcr-app .pcr-swatches {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.75em;
}

.pcr-app .pcr-swatches.pcr-last {
  margin: 0;
}

@supports (display: grid) {
  .pcr-app .pcr-swatches {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, 1.75em);
  }
}

.pcr-app .pcr-swatches > button {
  font-size: 1em;
  position: relative;
  width: calc(1.75em - 5px);
  height: calc(1.75em - 5px);
  border-radius: 0.15em;
  cursor: pointer;
  margin: 2.5px;
  flex-shrink: 0;
  justify-self: center;
  transition: all 0.15s;
  overflow: hidden;
  background: transparent;
  z-index: 1;
}

.pcr-app .pcr-swatches > button:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
  background-size: 6px;
  border-radius: 0.15em;
  z-index: -1;
}

.pcr-app .pcr-swatches > button:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--pcr-color);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.15em;
  box-sizing: border-box;
}

.pcr-app .pcr-swatches > button:hover {
  filter: brightness(1.05);
}

.pcr-app .pcr-swatches > button:not(.pcr-active) {
  box-shadow: none;
}

.pcr-app .pcr-interaction {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -0.2em;
}

.pcr-app .pcr-interaction > * {
  margin: 0 0.2em;
}

.pcr-app .pcr-interaction input {
  letter-spacing: 0.07em;
  font-size: 0.75em;
  text-align: center;
  cursor: pointer;
  color: #75797e;
  background: #f1f3f4;
  border-radius: 0.15em;
  transition: all 0.15s;
  padding: 0.45em 0.5em;
  margin-top: 0.75em;
}

.pcr-app .pcr-interaction input:hover {
  filter: brightness(0.975);
}

.pcr-app .pcr-interaction input:focus {
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.85),
    0 0 0 3px rgba(66, 133, 244, 0.75);
}

.pcr-app .pcr-interaction .pcr-result {
  color: #75797e;
  text-align: left;
  flex: 1 1 8em;
  min-width: 8em;
  transition: all 0.2s;
  border-radius: 0.15em;
  background: #f1f3f4;
  cursor: text;
}

.pcr-app .pcr-interaction .pcr-result::-moz-selection {
  background: #4285f4;
  color: #fff;
}

.pcr-app .pcr-interaction .pcr-result::selection {
  background: #4285f4;
  color: #fff;
}

.pcr-app .pcr-interaction .pcr-type.active {
  color: #fff;
  background: #4285f4;
}

.pcr-app .pcr-interaction .pcr-cancel,
.pcr-app .pcr-interaction .pcr-clear,
.pcr-app .pcr-interaction .pcr-save {
  width: auto;
  color: #fff;
}

.pcr-app .pcr-interaction .pcr-cancel:hover,
.pcr-app .pcr-interaction .pcr-clear:hover,
.pcr-app .pcr-interaction .pcr-save:hover {
  filter: brightness(0.925);
}

.pcr-app .pcr-interaction .pcr-save {
  background: #4285f4;
}

.pcr-app .pcr-interaction .pcr-cancel,
.pcr-app .pcr-interaction .pcr-clear {
  background: #f44250;
}

.pcr-app .pcr-interaction .pcr-cancel:focus,
.pcr-app .pcr-interaction .pcr-clear:focus {
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.85),
    0 0 0 3px rgba(244, 66, 80, 0.75);
}

.pcr-app .pcr-selection .pcr-picker {
  position: absolute;
  height: 18px;
  width: 18px;
  border: 2px solid #fff;
  border-radius: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.pcr-app .pcr-selection .pcr-color-chooser,
.pcr-app .pcr-selection .pcr-color-opacity,
.pcr-app .pcr-selection .pcr-color-palette {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  flex-direction: column;
  cursor: grab;
  cursor: -webkit-grab;
}

.pcr-app .pcr-selection .pcr-color-chooser:active,
.pcr-app .pcr-selection .pcr-color-opacity:active,
.pcr-app .pcr-selection .pcr-color-palette:active {
  cursor: grabbing;
  cursor: -webkit-grabbing;
}

.pcr-app[data-theme="classic"] {
  width: 28.5em;
  max-width: 95vw;
  padding: 0.8em;
}

.pcr-app[data-theme="classic"] .pcr-selection {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-preview {
  position: relative;
  z-index: 1;
  width: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 0.75em;
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-preview:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
  background-size: 0.5em;
  border-radius: 0.15em;
  z-index: -1;
}

.pcr-app[data-theme="classic"]
  .pcr-selection
  .pcr-color-preview
  .pcr-last-color {
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  border-radius: 0.15em 0.15em 0 0;
  z-index: 2;
}

.pcr-app[data-theme="classic"]
  .pcr-selection
  .pcr-color-preview
  .pcr-current-color {
  border-radius: 0 0 0.15em 0.15em;
}

.pcr-app[data-theme="classic"]
  .pcr-selection
  .pcr-color-preview
  .pcr-current-color,
.pcr-app[data-theme="classic"]
  .pcr-selection
  .pcr-color-preview
  .pcr-last-color {
  background: var(--pcr-color);
  width: 100%;
  height: 50%;
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-palette {
  width: 100%;
  height: 8em;
  z-index: 1;
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-palette .pcr-palette {
  flex-grow: 1;
  border-radius: 0.15em;
}

.pcr-app[data-theme="classic"]
  .pcr-selection
  .pcr-color-palette
  .pcr-palette:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
  background-size: 0.5em;
  border-radius: 0.15em;
  z-index: -1;
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-chooser,
.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-opacity {
  margin-left: 0.75em;
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-chooser .pcr-picker,
.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-opacity .pcr-picker {
  left: 50%;
  transform: translateX(-50%);
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-chooser .pcr-slider,
.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-opacity .pcr-slider {
  width: 8px;
  flex-grow: 1;
  border-radius: 50em;
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-chooser .pcr-slider {
  background: linear-gradient(180deg, red, #ff0, #0f0, #0ff, #00f, #f0f, red);
}

.pcr-app[data-theme="classic"] .pcr-selection .pcr-color-opacity .pcr-slider {
  background: linear-gradient(180deg, transparent, #000),
    url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
  background-size: 100%, 50%;
}

html,
body {
  height: 100%;
  margin: 0;
}

* {
  box-sizing: border-box;
}

@font-face {
  font-family: "TotoFont";
  src: url("fonts/sportv1/Digitain_Font.eot");
  src: url("fonts/sportv1/Digitain_Font.eot") format("embedded-opentype"),
    url("fonts/sportv1/Digitain_Font.woff") format("woff"),
    url("fonts/sportv1/Digitain_Font.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.sk_actions_wrapper {
  display: flex;
  align-items: center;
  column-gap: 6px;
  padding: 0 8px;
  height: var(--skinnerToolboxFooterHeight);
  background: var(--shadow);
  position: absolute;
  border-top: 1px solid var(--sk_dominantBgHover);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(5px);
}

.nik_root_mobile {
  width: 420px;
  margin: 0 auto;
  border: 10px solid #00aabe;
}

.nik_root_mobile #dm-main-container {
  display: block;
}

#loader {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
}

#loader > div {
  width: 40px;
  height: 40px;
  margin: 4px;
  background-color: rgba(1, 107, 113, 0.9);
  color: #fff;
  font-size: 22px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  animation: loader_letter_animation 2s infinite ease-in-out;
}

#loader > div:nth-child(1) {
  animation-delay: 0s;
}

#loader > div:nth-child(2) {
  animation-delay: 0.1s;
}

#loader > div:nth-child(3) {
  animation-delay: 0.2s;
}

#loader > div:nth-child(4) {
  animation-delay: 0.3s;
}

#loader > div:nth-child(5) {
  animation-delay: 0.4s;
}

#loader > div:nth-child(6) {
  animation-delay: 0.5s;
}

#loader > div:nth-child(7) {
  animation-delay: 0.6s;
}

@keyframes loader_letter_animation {
  0% {
    transform: rotate(0);
    border-radius: 0;
  }

  50% {
    transform: rotate(360deg);
    border-radius: 50%;
  }

  100% {
    transform: rotate(-0);
    border-radius: 0;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
}

body {
  background-color: var(--sk_dominantBg3);
  color: var(--sk_dominantTxt);
  font-family: "Roboto", sans-serif;
}

.nik_skinner_mobile_wrapper > iframe {
  /*height: 800px !important;*/
}

.nik_skinner_header {
    position: fixed;
    top: 0px;
    left: 50%;
    width: auto;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: var(--sk_dominantBg);
    color: var(--sk_dominantTxt);
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: 1px solid var(--sk_dominantBgHover);
        box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.5);
        display: none;
}

.skinner_ico {
  width: 24px;
  height: 24px;
  display: block;
  fill: currentColor;
}

.skinner_ico > svg {
  width: 100%;
  height: 100%;
}

.skinner_ico_burger {
  fill: currentColor;
}

.nik_skinner_versioning {
  font-size: 12px;
}

.nik_skinner_link_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
}

.nik_skinner_link {
  appearance: none;
  text-align: center;
  width: 100%;
  height: var(--skinnerBtnHeight);
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: var(--sk_dominantBgHover);
  color: var(--sk_dominantTxt);
  transition: all 0.314s;
  text-transform: capitalize;
  font-size: 14px;
  position: relative;
  font-weight: 500;
  margin: 2px;
  border-radius: 2px;
  box-shadow: 2px 2px 2px 2px var(--shadow);
  transition: box-shadow 0.2s, background-color 0.2s, color 0.2s;
  text-shadow: 0 1px 3px var(--shadow);
  padding: 0 8px;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  min-width: 80px;
  width: auto;
  justify-content: center;
  flex-shrink: 0;
}

.nik_skinner_link:hover,
.nik_skinner_link-active {
  background-color: var(--sk_accentBg);
  color: var(--sk_accentTxt);
  position: relative;
  z-index: 10;
}

.skinner_toolbox {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  transition: transform 0.5s;
  z-index: var(--sk_zind);
  height: 320px;
  width: auto;
  background-color: var(--sk_dominantBg);
  color: var(--sk_dominantTxt);
  border: 1px solid var(--sk_dominantBgHover);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.5);
}

.pcr-app {
  z-index: var(--sk_zind2);
}

.skinner_toolbox-hide {
  transform: translate(-50%, 100%);
}

.skinner_ico_arrow {
  content: "";
  display: block;
  transition: transform 0.8s;
}

.skinner_ico_arrow-rotated {
  transform: rotate(180deg);
}

.skinner_toolbox_toggler {
  display: block;
  width: var(--skinnerToolboxHeight);
  height: var(--skinnerToolboxHeight);
  color: var(--sk_dominantTxt);
  background: var(--sk_dominantBg);
  position: relative;
  z-index: 10;
  border-radius: 50%;
  transition: transform 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--sk_accentBg);

}

.color_controls_toggle {
  display: flex;
  justify-content: center;
  border: none;
  outline: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: var(--sk_dominantBg);
  color: var(--sk_dominantTxt);
  width: 100px;
  height: 30px;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  transition: all 180ms ease-in-out;
  cursor: pointer;
}

.color_controls_toggle:hover {
  color: var(--sk_accentBg);
}

.skinner_toolbox_wrapper {
  height: 100%;
}

.nik_skinner_control_wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - var(--skinnerToolboxFooterHeight));
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 6px;
  padding-bottom: var(--skinnerToolboxFooterHeight);
}

.skn_controls_row {
  border: 1px solid var(--sk_dominantBg2);
  display: flex;
  padding: 0 var(--controls-ui-pad-x);
  align-items: center;
  column-gap: var(--controls-ui-gap);
  height: var(--controls-row-height);
  background-color: var(--sk_dominantBgHover);
  color: var(--sk_dominantTxt) !important;
  border-radius: 4px;
}

.nik_skinner_control_group {
  --grp_opacity: 0.4;
  --grp_pos: 4px;
  height: var(--controls-row-height);
  display: flex;
  flex-direction: column;
  column-gap: 6px;
  position: relative;
  transition: box-shadow 0.2s;
  box-shadow: -2px 0px 0 0px var(--sk_dominantBg2Hover);
  box-shadow: none;

  flex-direction: row;
  background-color: var(--sk_dominantBg);
  flex-wrap: nowrap;
  margin-bottom: 1px;
  align-items: center;
  border-radius: 4px;
  opacity: 0.5;
}

.nik_skinner_control_group.state_active {
  box-shadow: -5px 0px 0 0px var(--sk_accentBg);
  opacity: 1;
  --grp_opacity: 1;
  --grp_pos: 0;
}

.nik_skinner_control_group_checkbox {
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: all 0.314s;
  margin: 0;
}

.nik_skinner_control_group_checkbox:hover {
  transform: scale(1.1);
}

.nik_skinner_control_group_picker {
  width: var(--control-picker-size);
  height: var(--control-picker-size);
  flex-shrink: 0;
  border: none;
  outline: 0;
  appearance: none;
  -webkit-appearance: none;
  background: #11585d;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.314s;
}

.nik_skinner_control_group_picker.variant_border {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nik_skinner_control_group_picker.variant_border::before {
  content: "";
  background: var(--sk_dominantBg);
  width: var(--control-picker-size-border);
  height: var(--control-picker-size-border);
  flex-shrink: 0;
}

.nik_skinner_control_group_picker.variant_text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  background: var(--bg) !important;
}

.nik_skinner_control_group_picker.variant_accent {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  background: var(--bg) !important;
}

.nik_skinner_control_group_picker.variant_text::before {
  content: "T";
  color: var(--Txt);
}

.nik_skinner_control_group_picker.variant_accent::before {
  content: "A";
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--Accent);
  color: var(--AccentTxt);
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nik_skinner_control_group_picker:hover {
  background: #0f4448;
}

.nik_skinner_control_group_picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.nik_skinner_control_group_picker::-webkit-color-swatch {
  border: 1px solid #11585d;
  border-radius: 50%;
}

.nik_skinner_control_group_picker:disabled {
  opacity: 0.3;
}

.nik_skinner_control_collapse_collapser {
  font-size: 11px;
  text-align: start;
  font-weight: 500;
  flex-shrink: 0;
  position: relative;
  display: flex;
  z-index: 10;
  padding: 0 12px;
  border-radius: 6px;
  width: 70px;
  display: flex;
  flex-grow: 0;
  padding: 0;
  z-index: 10;
  flex-grow: 0;
  flex-shrink: 0;
  min-width: 1px;
  background: transparent;
  border: 0;
}

.nik_skinner_control_collapse_collapser > span {
  flex-grow: 1;
  color: var(--sk_dominantTxt) !important;
}

.nik_skinner_control_collapse_collapser-open {
  background: var(--skinnerToolboxAccent);
  color: var(--skinnerToolboxAccentTxt);
  border-bottom-color: var(--skinnerToolboxAccent);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@keyframes expand {
  0% {
    max-height: 0;
    border: 0;
    padding: 0;
  }

  100% {
    max-height: 0;
  }

  100% {
    max-height: 500px;
  }
}

@keyframes collapse {
  0% {
    max-height: 500px;
  }

  100% {
    max-height: 500px;
  }

  100% {
    max-height: 0;
    border: 0;
    padding: 0;
  }
}

.nik_skinner_control_collapse_content {
  max-height: 0;
  background-color: var(--sk_dominantBg);
  display: flex;
  column-gap: var(--controls-ui-gap);
  flex-direction: row;
  max-height: initial;
  animation: none;
  padding: 0;
  border: 0;
}

.nik_skinner_control_collapse_content-show {
  /*max-height: 600px;*/
  /*animation: expand 0.5s ease-in forwards;*/
}

.skinner_canvas {
  width: 100%;
  min-height: 300px;
  border: 1px solid #000;
}

.skinner_showcase {
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 0 16px;
}

.skinner_btn {
  appearance: none;
  border: 1px solid var(--sk_dominantBg2);
  text-align: center;
  height: var(--skinnerBtnHeight);
  text-decoration: none;
  background-color: var(--sk_dominantBgHover);
  color: var(--sk_dominantTxt2);
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

.skinner_btn-icon {
      width: var(--skinnerBtnHeight);
    height: var(--skinnerBtnHeight);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--sk_dominantBgHover);
    border: 1px solid var(--sk_dominantBg2);
    color: var(--sk_dominantTxt2);
}

.skinner_btn-50 {
  width: 50%;
  flex-shrink: 0;
  border-radius: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.skinner_btn-100 {
  width: 100%;
  flex-shrink: 0;
  border-radius: 0;
  border-radius: 8px;
}

.skinner_btn-s {
  border-radius: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.skinner_btn-l {
  border-radius: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.skinner_btn-50:last-child {
  border-radius: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.skinner_btn:hover {
  background-color: var(--sk_dominantBg2);
}

.skinner_btn-accent {
  background-color: var(--sk_accentBg);
  border-color: var(--sk_accentBg);
  color: var(--sk_accentTxt);
  position: relative;
  padding-inline-start: 6px;
}

.skinner_btn-accent:hover {
  border-color: var(--sk_accentBg);
  background-color: var(--sk_accentBg2);
  color: var(--sk_accentTxt);
}
/* view switchers */
.nik_sport_web_views_switchers_wrapper {
  display: flex;
  align-items: center;
}

.view_switcher_btn {
  display: none;
}

.view_switcher_lbl {
  background-color: #222222;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  height: 24px;
  line-height: 24px;
  width: 100px;
  text-align: center;
  top: 8px;
  z-index: 100;
}

.view_switcher_lbl:hover,
.view_switcher_btn:checked + .view_switcher_lbl {
  background-color: #00aabe;
}

#euviewSwitcher:checked ~ .europeanView {
  display: flex !important;
}

#ppviewSwitcher:checked ~ .paperView {
  display: block !important;
}

#africanviewSwitcher:checked ~ .africanView {
  display: block !important;
}

.nik_skinner_header_controls {
  display: flex;
  align-items: center;
  font-size: 11px;
  padding: var(--controls-ui-pad-y) var(--controls-ui-pad-x);
  color: var(--sk_dominantTxt2);
  z-index: 10;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom: 1px solid var(--sk_dominantBgHover);
  column-gap: 4px;
  height: var(--skinnerToolboxHeight);
}

.nik_skinner_load_config {
  padding: 0 8px;
  height: 30px;
  background-color: var(--sk_dominantBg2);
  color: var(--sk_dominantTxt);
  border-radius: 2px;
  border: 1px solid var(--sk_dominantBgHover);
  outline: 0;
  text-transform: capitalize;
  cursor: pointer;
  margin: 0 8px;
  transition: border-color 0.314s;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-100%, -50%);
}

.nik_skinner_load_config:hover {
  border-color: var(--sk_accentBg);
}

.nik_skinner_header_control {
  width: 120px;
  flex-shrink: 0;
  text-align: center;
  flex-shrink: 0;
}

.nik_skinner_header_control:last-child {
  border: 0;
}

.nik_skinner_header_control-name,
.nik_skinner_header_control-big {
  width: 120px;
}

.nik_skinner_header_control-small {
  width: 64px;
}

.nik_skinner_header_control-bg {
  width: 188px;
}

.nik_skinner_header_control-gg {
  width: 112px;
}

.nik_skinner_header_control-radius {
  width: 160px;
}

.nik_skinner_radius_amount {
  width: 50px;
  font-size: 11px;
  height: 24px;
  font-weight: 500;
  background: var(--sk_dominantBg);
  color: var(--sk_dominantTxt2);
  border-radius: 2px;
  text-align: right;
  border: 0;
  border: 1px solid var(--sk_dominantBg2);
  outline: 0;
  padding: 0 6px;
}

.nik_skinner_header_control_radius {
  width: 200px;
}

.nik_skinner_header_control_name {
  flex-grow: 1;
  min-width: 1px;
  text-align: left !important;
  width: 100px;
}

.nik_skinner_checkbox_wrapper {
  display: flex;
  border: 1px solid var(--sk_dominantBg2);
  height: var(--controls-row-height);
  align-items: center;
  justify-content: center;
  background-color: var(--sk_dominantBgHover);
  flex-shrink: 0;
  position: relative;
  margin: 0;
  flex-shrink: 0;
  border-radius: 0;
  column-gap: 4px;
  padding: 8px;
  border-radius: 4px;
}

.nik_skinner_checkbox_wrapper > .pickr {
  position: absolute;
}

.nik_skinner_checkbox_wrapper:last-child {
  margin: 0;
}

.nik_skinner_checkbox_wrapper.nik_skinner_checkbox_wrapper-range {
  width: 100%;
  justify-content: flex-start;
  padding: 8px;
}

.nik_skinner_control_group_checkbox_wrapper > input {
  display: none;
}

.nik_skinner_control_group_checkbox_wrapper
  > .nik_skinner_control_group_checkbox_imitator {
  background-image: url("../assets/chb_unchecked.svg");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: 20px;
  display: block;
  transition: all 0.1s;
  cursor: pointer;
  position: relative;
}

/*.state_delay_2 {
  transition-delay: 0.1s;
}
.state_delay_3 {
  transition-delay: 0.2s;
}
.state_delay_4 {
  transition-delay: 0.3s;
}
.state_delay_5 {
  transition-delay: 0.4s;
}*/

.nik_skinner_control_group_checkbox_wrapper
  > input:disabled
  + .nik_skinner_control_group_checkbox_imitator {
  opacity: 0.2;
}

.nik_skinner_checkbox_wrapper-controls
  .nik_skinner_control_group_checkbox_wrapper {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

.nik_skinner_scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.nik_skinner_scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.nik_skinner_scrollbar::-webkit-scrollbar-thumb {
  background: var(--sk_dominantBg2);
  border-radius: 2px;
}

/* Handle on hover */
.nik_skinner_scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sk_dominantBg2);
}

.nik_skinner_control_group_range {
  width: 300px;
}

#skinner_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: none;
  z-index: 90;
}

.skinner_ui_toggler_wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 49px;
  height: 39px;
  z-index: 110;
  background-color: var(--sk_dominantBg);
  border: 1px solid var(--sk_dominantBgHover);
  border-right: 0;
  color: var(--sk_dominantTxt);
  border-radius: 5px 0 0 5px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
}

.skinner_ui_toggler_wrapper input {
  display: none;
}

.skinner_ui_toggler_wrapper i {
  cursor: pointer;
}

.nik_hide_ui .skinner_toolbox {
  transform: translate(-50%, calc(100% + 30px));
}

.nik_skinner_select_theme {
  width: 150px;
  line-height: 26px;
  height: 25px;
  background-color: #11585d;
  color: #f3f3f3;
  border-radius: 4px;
  border: 0;
  outline: 0;
  text-transform: uppercase;
  font-weight: bold;
  display: block;
  cursor: pointer;
  padding: 0 10px;
}

.nik_skinner_select_theme_wrapper {
  position: absolute;
  right: 60px;
  top: 10px;
}

#betslip-root-inner {
  left: auto !important;
  right: 0;
  transform: translateX(0) !important;
}

.nik_skinner_download_button_wrapper {
  border-top: 1px solid var(--skinnerToolboxAccent);
  background-color: var(--skinnerToolboxBg3);
  height: var(--skinnerToolboxFooterHeight);
  padding: 12px;
}

.nik_skinner_download_button_wrapper_row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 6px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.nik-hidden > * {
  visibility: hidden;
}

/*range input styling*/
input[type="range"]:disabled {
  opacity: 0.3;
}

input[type="range"] {
  width: calc(100% - 27px);
  margin: 5.8px 0;
  background-color: transparent;
  -webkit-appearance: none;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  background: var(--skinnerShadow);
  border-radius: 0px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  margin-top: -2px;
    width: 12px;
    height: 12px;
    background-color: var(--sk_accentBg);
    border-radius: 7px;
    cursor: pointer;
    -webkit-appearance: none;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: var(--sk_dominantBg);
}

input[type="range"]::-moz-range-track {
  background: var(--sk_dominantBg);
  border: 0.2px solid #010101;
  border-radius: 1.3px;
  width: 100%;
  height: 8.4px;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--sk_dominantBg);
  border: 0.2px solid rgba(0, 0, 0, 0);
  border-radius: 18px;
  cursor: pointer;
}

input[type="range"]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 6.8px 0;
  color: transparent;
  width: 100%;
  height: 8.4px;
  cursor: pointer;
}

input[type="range"]::-ms-fill-lower {
  background: var(--sk_dominantTxt2);
  border: 0.2px solid #010101;
  border-radius: 2.6px;
}

input[type="range"]::-ms-fill-upper {
  background: var(--sk_accentBg);
  border: 0.2px solid #010101;
  border-radius: 2.6px;
}

input[type="range"]::-ms-thumb {
  width: 20px;
  height: 20px;
  background: var(--sk_dominantTxt2);
  border: 0.2px solid rgba(0, 0, 0, 0);
  border-radius: 18px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}

input[type="range"]:focus::-ms-fill-lower {
  background: var(--sk_accentBg);
}

input[type="range"]:focus::-ms-fill-upper {
  background: var(--sk_accentBg);
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align: auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type="range"] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}

/*checkbox*/
.skinner_custom_chb_label input[type="checkbox"] {
  display: none;
}

:root {
  --chbSize: 20px;
  --chbH: var(--chbSize);
  --wrapperChbSize: 42px;
  --chbSizeBorder: 1px;
  --chbBg: var(--sk_dominantBgHover);
  --activeChbBg: var(--sk_AccentBgHover);
}

.skinner_custom_chb {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--skinnerShadow);
  cursor: pointer;
  border: var(--chbSizeBorder) solid var(--sk_dominantBg2);
  border-radius: 2px;
  color: var(--sk_dominantBg);
  transition: background 0.2s;
}

.skinner_custom_chb_label.variant_tone {
  --chbSize: 32px;
  --chbH: 18px;
}

.skinner_custom_chb_label.variant_tone .skinner_custom_chb {
  color: transparent !important;
  border: 0 !important;
  opacity: 1 !important;
  border-radius: 0;
  background: linear-gradient(
    to right,
    var(--bg1) 0%,
    var(--bg1) 33.33%,
    var(--bg2) 33.33%,
    var(--bg2) 66.66%,
    var(--bg3) 66.66%,
    var(--bg3) 100%
  ) !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.skinner_custom_chb_label {
  width: var(--chbSize);
  height: var(--chbH);
  flex-shrink: 0;
}

.skinner_custom_chb_label
  > input[type="checkbox"]:checked
  + .skinner_custom_chb {
  background: var(--sk_accentBg);
  color: var(sk_accentTxt);
  border-color: var(--sk_accentBgHover);
  --stroke_dash_arr: 16;
  --stroke_dash_off: 0;
}

.skinner_custom_chb{
  --stroke_dash_arr: 16;
  --stroke_dash_off: 16;
}

.sk_svg_path_checkbox {
    fill: none;
    stroke: var(sk_accentTxt);
    stroke-width: 2;
    stroke-dasharray: var(--stroke_dash_arr);
    stroke-dashoffset: var(--stroke_dash_off);
    transition: stroke-dashoffset 0.2s;
    transition-delay: 0.1s;
}

/*picker*/
.pickr {
  flex-grow: 1;
  min-width: 1px;
  height: 35px;
}

.pickr .pcr-button {
  overflow: auto;
  width: 100%;
  height: 100%;
  /*border-radius: 6px;*/
}

.pickr .pcr-button:after {
  /*box-shadow: inset -3px 0px 1px 1px rgba(0,0,0,0.3), inset 0px 0px 1px 1px rgba(255,255,255,0.3);
border-radius: 50%;*/
}

.pcr-app {
  background-color: var(--sk_dominantBg);
  border-radius: 6px;
  border: 1px solid var(--sk_dominantTxt3);
}

.pcr-app .pcr-interaction .pcr-result {
  background-color: var(--sk_dominantBgHover);
  color: var(--sk_dominantTxt);
  border-radius: 4px;
}

.pcr-app[data-theme="classic"] {
  width: 19.5em;
}

.nik_skinner_input_wrapper {
  position: relative;
  height: var(--skinnerBtnHeight);
  flex-grow: 1;
  min-width: 1px;
}

.nik_skinner_input {
  margin: 0;
  padding: 0 8px;
  background-color: var(--sk_dominantBg);
  color: var(--sk_dominantTxt2);
  border: 0;
  border-radius: 2px;
  border: 1px solid var(--sk_dominantBg2);
  outline: 0;
  font-size: 11px;
  text-transform: capitalize;
  display: block;
  cursor: pointer;
  transition: height 0.2s;
  resize: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 100%;
  line-height: 32px;
  font-weight: 500;
  overflow: hidden;
  z-index: 80;
}

.nik_skinner_input:focus {
  height: 300px;
  overflow: auto;
}

.nik_skinner_message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--sk_dominantBg);
    border: 1px solid var(--sk_accentBg);
    color: var(--sk_dominantTxt2);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    border-radius: 2px;
    z-index: 12;
    padding: 8px;
    font-size: 12px;
}

.nik_skinner_message.hide {
  display: none;
}

.skinner_main_wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.skinner_main_wrapper-mobile {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-left: 30px;
  padding-right: 30px;
}

.skinner_main_wrapper-mobile .nik_skinner_mobile_iframe_wrapper {
  width: 100%;
  box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to right, var(--sk_dominantBgHover), var(--sk_dominantBg2));
  border-radius: 20px;
  border: 2px solid var(--sk_dominantBg2);
}

.skinner_main_wrapper-mobile .nik_skinner_mobile_iframe_wrapper iframe {
  width: 100%;
}

.skinner_main_wrapper-mobile .color_controls_toggle {
  display: none;
}

.skinner_main_wrapper iframe {
  width: 1920px;
  border: 0px;
  transform: scale(0.5) translate(-50%, -50%);
}

.skinner_main_wrapper.skinner_main_wrapper-mobile iframe {
  width: 100%;
  transform: none;
}

.skinner_ui_switcher {
  width: calc(var(--skinnerToolboxHeight) * 2);
  background-color: var(--sk_dominantBg);
  color: var(--sk_dominantTxt);
  border: 1px solid var(--sk_accentBg);
  border-radius: 16px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--skinnerToolboxHeight);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s;
}

.sk_ui_controls {
    display: flex;
    align-items: center;
    column-gap: 6px;
    position: absolute;
    top: calc(-1* var(--skinnerToolboxHeight) + -12px);
    right: 0;
    z-index: 10;
    height: calc(var(--skinnerToolboxHeight) + 8px);
    padding: 4px 8px;
    background: var(--sk_dominantBg);
    color: var(--sk_dominantTxt2);
    border-radius: 8px;
    border: 1px solid var(--sk_dominantBgHover);
}

.skinner_ui_switcher > i {
  display: relative;
  z-index: 10;
  transition: color 0.1s;
}

.skinner_ui_switcher > input {
  display: none;
}

.skinner_ui_switcher > span {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--sk_accentBg);
  position: absolute;
  left: 2px;
  top: 1px;
  transform: translateX(0);
  transition: background-color 0.1s, transform 0.1s;
}

.skinner_ui_switcher > input:checked ~ span {
  transform: translateX(22px);
}

.skinner_settings_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 6px;
}

.skinner_ui_label_sm {
  width: 100px;
  flex-shrink: 0;
  font-size: 11px;
}

.nik_skinner_control_collapse_collapser > .skinner_ico_arrow {
  display: none;
}

.nik_skinner_checkbox_wrapper.nik_skinner_checkbox_wrapper-small {
  width: 64px;
}

.nik_skinner_checkbox_wrapper.nik_skinner_checkbox_wrapper-range {
  width: 160px;
}

.ap_root {
  --w: 24px;
  width: var(--w);
  height: var(--w);
  border-radius: 50%;
  background: var(--sk_dominantBg);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-shrink: 0;
  cursor: pointer;
}

.disabled.ap_root {
  opacity: 0.5;
  pointer-events: none;
}

.ap_stick {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 1%;
  height: 50%;
  background-color: var(--skinnerToolboxAccent);
  transform-origin: bottom;
}

.ap_angle {
  font-size: 10px;
}

.cms_row{
  display: flex;
  align-items: center;
  padding: 8px;
  column-gap: 8px;
}

.cms_btn {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  flex-shrink: 0;
  border: 0;
  outline: 0;
  height: 26px;
  border-radius: 4px;
  background-color: var(--sk_dominantBg2Hover);
  color: var(--sk_dominantTxt2);
  font-size: 12px;
  font-weight: 500;
  transition: all 0.314s;
  padding: 0 8px;
  column-gap: 4px;
}

.cms_btn:hover {
  background-color: var(--sk_dominantBg2);
  color: var(--sk_dominantTxt);
}

.cms_btn.variant_accent{
    background: var(--sk_accentBg);
  color: var(--sk_accentTxt);
}

.cms_btn.variant_accent:hover{
    background: var(--sk_AccentBgHover);
  color: var(--sk_accentTxt);
}

.skinner_disabled {
  cursor: not-allowed;
  opacity: 0.2;
  pointer-events: none;
}

.skinner_picker_trigger_hide {
  display: none;
}

.pickr {
  width: 0 !important;
  max-width: 0 !important;
  overflow: hidden;
  margin: 0 !important;
  min-width: 0 !important;
  max-width: 35px;
  height: 35px;
  margin: 0 4px;
}

.skinner_main_wrapper iframe {
  width: 100%;
  transform: none;
}

.skinner_main_wrapper-mobile {
  --skinnerToolboxFooterHeight: 100px;
}

.nik_skinner_download_button_wrapper {
  padding: 2px 8px;
}

.nik_skinner_download_button_wrapper_row {
  padding-top: 2px;
  padding-bottom: 2px;
}

.skinner_main_wrapper-mobile > .skinner_toolbox {
  bottom: auto;
  position: relative;
  transform: none;
  left: auto;
  height: calc(100% - 100px);
}

.skinner_main_wrapper-mobile .nik_skinner_mobile_iframe_wrapper {
  width: 30%;
  padding: 24px;
}

.skinner_ui_label_sm {
  display: none;
}


.dg_sport_icons_tiny [class^="dg_icon_"],
.dg_sport_icons_tiny [class*=" dg_icon_"] {
    --imageSize: 20px;
    width: 20px;
    height: 20px;
    line-height: 19px;
    font-size: 29px;
}

.sk_svg{
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5px;
    width: 22px;
    height: 22px;
}
.sk_chb_base{
    cursor: pointer;
}

.sk_chb_base > input {
    display: none;
}

.sk_chb_base .sk_chb_base_ico{
    --activeDisplay: none;
    --passiveDisplay: block;
}

.sk_chb_base > input:checked + .sk_chb_base_ico{
    --activeDisplay: block;
    --passiveDisplay: none;
}

.svg_path_top{
    display: var(--activeDisplay);
}

.svg_path_bot{
    display: var(--activeDisplay);
}

.svg_path_bot_t{
    display: var(--passiveDisplay);
}

.skinner_ui_control_wrapper{
        width: var(--skinnerBtnHeight);
    height: var(--skinnerBtnHeight);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--sk_dominantBgHover);
    border: 1px solid var(--sk_dominantBg2);
    border-radius: 4px;
    color: var(--sk_dominantTxt2);
}

.nik_skinner_control_group{
    position: relative;
}

.nik_skinner_control_group.state_not_readable::after {
    content:'';
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    z-index: 20;
    background: linear-gradient(90deg, rgb(189 24 7 / 17%), rgb(189 24 7 / 0%) 50%);
    pointer-events: none;
}

`;
    this.skinnerUIStyles = document.createElement("style");
    this.skinnerUIStyles.innerHTML = css;
    this.skinnerRoot.appendChild(this.skinnerUIStyles);
    const fontURL = `https://cdn-sp-bn.kertn.net/assets/fonts/sport-ui-icons/style.css?`;
    this.iconsLink = document.createElement("link");
    this.iconsLink.rel = "stylesheet";
    this.iconsLink.href = fontURL;
    document.head.appendChild(this.iconsLink);
  }
}

class AnglePicker {
  constructor(element, radius) {
    this.eventTarget = new EventTarget();
    this.radius = radius || 100;
    this.min = 0;
    this.max = 359;
    this.element = element || document.body;
    this.classNames = {
      root: "ap_root",
      stick: "ap_stick",
      indicator: "ap_angle",
    };

    this.createHTML = this.createHTML.bind(this);
    this.handleRotation = this.handleRotation.bind(this);
    this.setDegreesFromEvent = this.setDegreesFromEvent.bind(this);
    this.roundToMultiple = this.roundToMultiple.bind(this);
    this.clamp = this.clamp.bind(this);

    this.init();
    var self = this;

    this.root.onmousedown = (e) => {
      self.bounds = this.root.getBoundingClientRect();

      self.handleRotation(e);

      const onMouseMove = (event) => {
        self.handleRotation(event);
      };

      document.addEventListener("mousemove", onMouseMove);

      document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        self.root.onmouseup = null;
      };
    };
  }
  init() {
    this.createHTML();
  }

  createHTML() {
    this.root = document.createElement("div");
    this.root.className = this.classNames.root;
    this.stick = document.createElement("div");
    this.stick.className = this.classNames.stick;
    this.indicator = document.createElement("div");
    this.indicator.className = this.classNames.indicator;
    this.indicator.innerText = 0;

    this.root.appendChild(this.stick);
    this.root.appendChild(this.indicator);
    this.element.appendChild(this.root);
  }

  setDisabled(bool) {
    bool
      ? this.root.classList.remove("disabled")
      : this.root.classList.add("disabled");
  }

  handleRotation(event) {
    const self = this;
    let { angle, eventTarget } = this;
    angle = this.setDegreesFromEvent(event);
    this.stick.style.transform = `rotate(${angle}deg)`;
    this.indicator.innerText = angle;
    //this.root.dispatchEvent(self.angleChangeEvent, { angle: self.angle });
    eventTarget.dispatchEvent(
      new MessageEvent("angleChange", { data: { angle } })
    );

    return (this.angle = angle);
  }

  setDegreesFromEvent(event) {
    let opposite = this.bounds.top + this.bounds.height / 2 - event.pageY;

    let adjacent = this.bounds.left + this.bounds.width / 2 - event.pageX;

    let radians = Math.atan(opposite / adjacent);
    let degrees = Math.round(radians * (180 / Math.PI), 10);

    degrees = this.roundToMultiple(degrees - 90);

    if (adjacent < 0 && opposite >= 0) {
      degrees += 180;
    } else if (opposite < 0 && adjacent < 0) {
      degrees -= 180;
    }

    return this.clamp(degrees);
  }

  roundToMultiple(number, multiple) {
    let _multiple = multiple || 1;
    let value = number / _multiple,
      integer = Math.floor(value),
      rest = value - integer;

    return rest > 0.5 ? (integer + 1) * _multiple : integer * _multiple;
  }

  clamp(degrees) {
    if (typeof degrees !== "number") {
      degrees = parseInt(degrees, 10);
      if (isNaN(degrees)) {
        degrees = 0;
      }
    }

    let min = 0,
      max = min + 360;

    while (degrees < min) {
      degrees += 360;
    }
    while (degrees > max) {
      degrees -= 360;
    }

    return degrees;
  }
}

window.colorsCasweb = {
  body: {
    Background: {
      color: "#101010",
    },
    borderRadius: 8,
  },
  accent: {
    Background: {
      color: "#A3D140",
    },
    borderRadius: 8,
  },
  button: {
    Background: {
      color: "#177B17",
    },
  },
  buttonSecondary: {
    Background: {
      color: "#333",
    },
  },
  dominant: {
    Background: {
      color: "#777",
    },
  },
  card: {
    Background: {
      color: "#777",
    },
  },
  game: {
    Background: {
      color: "#777",
    },
  },
  jackpot: {
    Background: {
      color: "#777",
    },
  },
  navbar: {
    Background: {
      color: "#333",
    },
  },
  slider: {
    Background: {
      color: "#000",
    },
  },
  header: {
    Background: {
      color: "#333",
    },
  },
  headerSecondary: {
    Background: {
      color: "#333",
    },
  },
  footer: {
    Background: {
      color: "#333",
    },
  },
  subHeader: {
    Background: {
      color: "#2b2b2b",
    },
  },
  tab: {
    Background: {
      color: "#2b2b2b",
    },
  },
  tabActive: {
    Background: {
      color: "#333",
    },
  },
  input: {
    Background: {
      color: "#333",
    },
  },
  inputSecondary: {
    Background: {
      color: "#2b2b2b",
    },
  },
  tooltip: {
    Background: {
      color: "#2b2b2b",
    },
  },
  filter: {
    Background: {
      color: "#333",
    },
  },
  modal: {
    Background: {
      color: "#333",
    },
  },
  login: {
    Background: {
      color: "#333",
    },
  },
  register: {
    Background: {
      color: "#333",
    },
  },
};

window.colorsSport = {
  body: {
    Background: {
      color: "#111111",
    },
    borderRadius: 8,
  },
  accent: {
    Background: {
      color: "#ffb700",
    },
  },
  dominant: {
    Background: {
      color: "#111111",
    },
  },
  button: {
    Background: {
      color: "#111111",
    },
  },
  buttonSecondary: {
    Background: {
      color: "#111111",
    },
  },
  navbar: {
    Background: {
      color: "#111111",
    },
  },
  slider: {
    Background: {
      color: "#111111",
    },
  },
  header: {
    Background: {
      color: "#111111",
    },
  },
  subHeader: {
    Background: {
      color: "#111111",
    },
  },
  event: {
    Background: {
      color: "#111111",
    },
  },
  eventLive: {
    Background: {
      color: "#111111",
    },
  },
  odd: {
    Background: {
      color: "#111111",
    },
  },
  oddActive: {
    Background: {
      color: "#111111",
    },
  },
  showMore: {
    Background: {
      color: "#111111",
    },
  },
  marketHeader: {
    Background: {
      color: "#111111",
    },
  },
  collapse: {
    Background: {
      color: "#111111",
    },
  },
  tab: {
    Background: {
      color: "#111111",
    },
  },
  tabActive: {
    Background: {
      color: "#111111",
    },
  },
  tabSecondaryActive: {
    Background: {
      color: "#111111",
    },
  },
  menu_1: {
    Background: {
      color: "#111111",
    },
  },
  menu_2: {
    Background: {
      color: "#111111",
    },
  },
  menu_3: {
    Background: {
      color: "#111111",
    },
  },
  input: {
    Background: {
      color: "#111111",
    },
  },
  inputSecondary: {
    Background: {
      color: "#111111",
    },
  },
  filter: {
    Background: {
      color: "#111111",
    },
  },
  tooltip: {
    Background: {
      color: "#111111",
    },
  },
  modal: {
    Background: {
      color: "#111111",
    },
  },
  betSlip: {
    Background: {
      color: "#111111",
    },
  },
  betSlipStake: {
    Background: {
      color: "#111111",
    },
  },
  betSlipInput: {
    Background: {
      color: "#111111",
    },
  },
  betSlipButton: {
    Background: {
      color: "#111111",
    },
  },
  betSlipHeader: {
    Background: {
      color: "#111111",
    },
  },
  betSlipTab: {
    Background: {
      color: "#111111",
    },
  },
  betSlipTabActive: {
    Background: {
      color: "#111111",
    },
  },
  tmLogo: {
    Background: {
      color: "#111111",
    },
  },
};

export { Skinner };
