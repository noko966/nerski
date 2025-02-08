import guessVisibleColor from "./neuron.js";
var tinycolor = require("tinycolor2");
import chroma from "chroma-js";
import SKPicker from "./modules/picker.js";
import SKStylePicker from "./modules/stylePicker.js";
import { MouseIntersectStyler } from "./CustomStyler.js";

class Skinner {
  constructor(starterConfig, root, variant, patientRoot) {
    this.eventListener = {
      init: [],
      save: [],
      hide: [],
      show: [],
      clear: [],
      gradientchange: [],
      changestop: [],
      cancel: [],
      statechange: [],
    };
    this.root = root || document.body;
    this.ui = {
      colors: {
        dark: {
          name: "dark",
          bg: "#1F2122",
          accent: "#7872E0",
        },
        light: {
          name: "light",
          bg: "#d4d7db",
          accent: "#7872E0",
        },
      },
      icons: {
        moon: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M22.2,16.6c-1.7,3-4.7,5.1-8.1,5.5c-0.5,0.1-1,0.1-1.5,0.1c-6.1,0-11-5-10.9-11.1 c0-3.7,1.9-7.2,5.1-9.2c0.4-0.2,0.9-0.1,1.1,0.3C8,2.4,8,2.7,7.9,3C5.3,7.5,7,13.3,11.5,15.8c1.8,1,3.8,1.4,5.8,1.1 c1.3-0.2,2.6-0.6,3.7-1.4c0.4-0.2,0.9-0.1,1.1,0.2C22.4,16,22.4,16.3,22.2,16.6L22.2,16.6z"/></svg>`,
        chb: `<svg class="sk_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><polyline class="sk_svg_path_checkbox" points="4.5,9.4 8.6,13.6 15.7,6.5 "/></svg>`,
        copy: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_copy" d="M13.5,16.9H9.5c-1.5,0-2.8-1.2-2.8-2.8V8.9c0-1.5,1.2-2.8,2.8-2.8h3.9c1.5,0,2.8,1.2,2.8,2.8v5.3 C16.2,15.7,15,16.9,13.5,16.9z M12.6,4.2c-0.5-0.6-1.3-1-2.1-1H6.5C5,3.1,3.8,4.3,3.8,5.9v5.3c0,0.9,0.4,1.6,1,2.1"/></svg>`,
        download: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_copy" d="M13.1,9.8l-2.7,2.7c-0.1,0.1-0.3,0.1-0.4,0L7.4,9.8 M10.2,4.2v8.2 M4.5,11.5v3.9c0,0.4,0.4,0.8,0.8,0.8h9.3 c0.4,0,0.8-0.4,0.8-0.8v-3.9"/></svg>`,
        saveToDb: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_save" d="M9.8,15.8V9.1 M11.6,10.7l-1.6-1.6C9.9,9,9.7,9,9.5,9.2l-1.6,1.6 M12.7,13c0.4,0.2,0.8,0.3,1.2,0.3 c1.4,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-0.4,0-0.7,0.1-1,0.2c0-2.1-1.6-3.9-3.5-3.9S5.8,6.4,5.8,8.5c-1.2,0.2-2.1,1.2-2.1,2.4 c0,1.4,1.1,2.4,2.4,2.4c0.4,0,0.8-0.1,1.1-0.3"/></svg>`,
        recolor: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><g class="sk_svg_path_load"><path class="st0" d="M10,14.2c1.6,0,2.8-1.3,2.8-2.8S11.4,7.7,10,5.2c-1.4,2.5-2.8,4.6-2.8,6.2S8.4,14.2,10,14.2z"/> <line class="st0" x1="15.7" y1="16.4" x2="4.3" y2="16.4"/><g></svg>`,
        showHide: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="svg_path_top" d="M2.4,9.9c0.6,0,2.9,4.9,7.6,4.9s7-4.9,7.6-4.9"/><path class="svg_path_bot_t" d="M17.6,9.9c-0.6,0-2.9,4.9-7.6,4.9S3,9.9,2.4,9.9 M10,17.5v-1.7 M6.3,14.8l-0.8,1.4 M2.7,13.7l1-0.9 M13.7,14.8 l0.8,1.4 M16.3,12.8l1,0.9"/><path class="svg_path_top" d="M17.6,9.9c-0.6,0-2.9-4.9-7.6-4.9S3,9.9,2.4,9.9 M11.6,9.9c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6 S9.1,8.2,10,8.2S11.6,9,11.6,9.9z"/></svg>`,
        brush: `<svg  class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
  <path d="M21.4,14.1c-0.3-0.3-0.6-0.5-1-0.6l0.4-8.1c0.1-1-0.2-2.1-0.9-2.9c-0.7-0.8-1.7-1.2-2.8-1.2H6.8
    C5.8,1.3,4.7,1.7,4,2.5C3.3,3.3,3,4.3,3.1,5.4l0.4,8.1c-1,0.4-1.8,1.4-1.8,2.6c0,0.7,0.3,1.4,0.8,1.9c0.5,0.5,1.2,0.8,1.9,0.8h4.2
    v0.8c0,1.8,1.5,3.2,3.2,3.2s3.2-1.5,3.2-3.2v-0.8h4.1c1.5,0,2.7-1.1,2.8-2.5C22.3,15.4,22,14.6,21.4,14.1z M5.1,3.5
    c0.4-0.5,1-0.7,1.7-0.7h0.4V7c0,0.4,0.3,0.8,0.8,0.8S8.7,7.4,8.7,7V2.8h2.5V4c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8V2.8h4.4
    c0.6,0,1.2,0.3,1.7,0.7c0.4,0.5,0.6,1.1,0.6,1.7c0,0,0,0,0,0l-0.4,8H5l-0.4-8C4.5,4.6,4.7,4,5.1,3.5z M19.4,17.3h-4.9
    c-0.4,0-0.8,0.3-0.8,0.8v1.5c0,1-0.8,1.8-1.8,1.8s-1.8-0.8-1.8-1.8V18c0-0.4-0.3-0.8-0.8-0.8h-5c-0.3,0-0.6-0.1-0.9-0.4
    c-0.2-0.2-0.4-0.5-0.4-0.9c0-0.6,0.5-1.2,1.1-1.2c0,0,0.1,0,0.1,0h15l0.1,0c0.3,0,0.5,0.1,0.8,0.4c0.3,0.3,0.4,0.6,0.4,1
    C20.7,16.8,20.1,17.3,19.4,17.3z"/>
  </svg>`,
        border: `
      <svg class="sk_border_svg" preserveAspectRatio="none" vector-effect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 649 39" style="enable-background:new 0 0 649 39;" xml:space="preserve">

<path class="tl" d="M308.2,1.5H5.5c-2.2,0-4,1.8-4,4v28c0,2.2,1.8,4,4,4h63.7"/>
<path class="br" d="M580.4,1.5h63.1c2.2,0,4,1.8,4,4v28c0,2.2-1.8,4-4,4H340.8"/>
</svg>`,
      },

      wrapper: null,
      header: null,
      content: null,
      essenceGroups: {},
    };
    this.eventBindings = [];
    this.rootNodes = [];
    this.state = {};
    this.skin = {};

    this.cn = {
      styleId: "sk_style",
    };

    this.essencesArray = [
      {
        name: "body",
        parent: null,
      },
      {
        name: "accent",
        parent: null,
      },
      {
        name: "dominant",
        parent: "body",
      },
      {
        name: "button",
        parent: "accent",
      },
      {
        name: "buttonSecondary",

        parent: "dominant",
      },
      {
        name: "navbar",
        parent: "dominant",
      },
      {
        name: "slider",
        parent: "body",
      },
      {
        name: "header",
        parent: "dominant",
      },
      {
        name: "subHeader",
        parent: "header",
      },
      {
        name: "event",
        parent: "dominant",
      },
      {
        name: "eventLive",
        parent: "dominant",
      },
      {
        name: "odd",
        parent: "body",
      },
      {
        name: "oddActive",
        parent: "accent",
      },
      {
        name: "showMore",
        parent: "dominant",
      },
      {
        name: "marketHeader",
        parent: "header",
      },
      {
        name: "collapse",
        parent: "header",
      },
      {
        name: "tab",
        parent: "tabActive",
      },
      {
        name: "tabActive",
        parent: "dominant",
      },
      {
        name: "tabSecondaryActive",
        parent: "tab",
      },
      {
        name: "menu_1",
        parent: "dominant",
      },
      {
        name: "menu_2",
        parent: "menu_1",
      },
      {
        name: "menu_3",
        parent: "menu_2",
      },
      {
        name: "input",
        parent: "dominant",
      },
      {
        name: "inputSecondary",
        parent: "input",
      },
      {
        name: "filter",
        parent: "dominant",
      },
      {
        name: "tooltip",
        parent: "dominant",
      },
      {
        name: "modal",
        parent: "body",
      },
    ];

    this.configBlueprint = {
      Background: {
        isDark: false,
        isActive: false,
        color: null,
      },
      Gradient: {
        isActive: false,
        angle: 0,
        stops: [],
        color: null,
        type: "linear",
      },
      Text: {
        isActive: false,
        color: null,
      },
      Accent: {
        isActive: false,
        color: null,
      },
      Border: {
        isActive: false,
        color: null,
      },
      borderRadius: 2,
      blur: 4,
    };

    this.essenceSteps = {
      dark: {
        nameBgHov: 3,
        nameBg2: 6,
        nameBg2Hov: 9,
        nameBg3: 12,
        nameBg3Hov: 16,
      },
      light: {
        nameBgHov: 3,
        nameBg2: 7,
        nameBg2Hov: 10,
        nameBg3: 13,
        nameBg3Hov: 16,
      },
      alpha: {
        1: 0.7,
        2: 0.5,
        3: 0.3,
      },
      txt: {
        1: 0.9,
        2: 0.6,
        3: 0.4,
      },
    };

    this.essencesArray.push({
      name: "overlay",
      parent: "body",
    });

    this.tree = this.arrayToTree(this.essencesArray);

    this.tree.forEach((rn) => {
      this.rootNodes.push(rn.name);
    });

    this.state = {};

    this.essencesArray.forEach((essenceObj) => {
      const essenceName = essenceObj.name;

      const userOverrides = starterConfig[essenceName] || {};

      const merged = this.deepMergeObject(this.configBlueprint, userOverrides);

      if (this.rootNodes.includes(essenceName)) {
        merged.Background.isActive = true;
      }

      console.log(merged);

      this.state[essenceName] = merged;
    });
  }

  generateBorderFallback(name) {
    const { isDark, color } = this.state[name].Background;
    const _step = isDark
      ? this.essenceSteps.dark.nameBgHov
      : this.essenceSteps.light.nameBgHov;
    const _color = isDark
      ? tinycolor(color).darken(_step).toHexString()
      : tinycolor(color).lighten(_step).toHexString();
    return _color;
  }

  generateFallbackBackground(fbNode) {
    const _t = this;
    const { isDark, color, isActive } = _t.state[fbNode].Background;
    const _isDark = isDark;
    const _step = _isDark
      ? _t.essenceSteps.dark.nameBgHov
      : _t.essenceSteps.light.nameBgHov;
    const _color = _isDark
      ? tinycolor(color).darken(_step).toHexString()
      : tinycolor(color).lighten(_step).toHexString();
    return {
      color: _color,
      isDark: _isDark,
      isActive: false,
    };
  }

  updateControl(name) {
    const _t = this;
    const { isDark, color, isActive } = _t.state[name].Background;
    const groupObj = _t.ui.essenceGroups[name];

    if (this.rootNodes.includes(name)) {
      groupObj.isActiveCheckboxEl.checked = true;
      groupObj.isActiveCheckboxEl.disabled = true;
    } else {
      groupObj.isActiveCheckboxEl.checked = isActive;
    }

    groupObj.groupEl.classList.toggle("state_active", isActive);
    groupObj.isDarkCheckboxEl.checked = isDark;
    groupObj.colorTriggerEl.style.background = color;

    const colorGradient = _t.skin[`${name}G`];
    const isActiveGradient = _t.state[name].Gradient.isActive;

    groupObj.isActiveGradientCheckboxEl.checked = isActiveGradient;
    groupObj.gradientPickerEl.style.background = colorGradient;

    const isActiveText = _t.state[name].Text.isActive;
    const colorText = _t.state[name].Text.color;

    groupObj.isActiveTextCheckboxEl.checked = isActiveText;
    groupObj.textPickerEl.style.background = colorText;

    const isActiveAccent = _t.state[name].Accent.isActive;
    const colorAccent = _t.state[name].Accent.color;

    groupObj.isActiveAccentCheckboxEl.checked = isActiveAccent;
    groupObj.accentPickerEl.style.background = colorAccent;

    const isActiveBorder = _t.state[name].Border.isActive;
    const colorBorder = _t.state[name].Border.color;

    groupObj.isActiveBorderCheckboxEl.checked = isActiveBorder;
    groupObj.borderPickerEl.style.background = colorBorder;

    const radius = _t.state[name].borderRadius;
    const blur = _t.state[name].blur;

    groupObj.radiusRangeEl.value = radius;
    groupObj.radiusInputEl.value = radius;

    groupObj.blurRangeEl.value = blur;
    groupObj.blurInputEl.value = blur;

    groupObj.isDarkCheckboxEl.disabled = !isActive;
    groupObj.isActiveGradientCheckboxEl.disabled = !isActive;
    groupObj.gradientPickerEl.classList.toggle(
      "state_disabled",
      !isActive || !isActiveGradient
    );
    groupObj.isActiveTextCheckboxEl.disabled = !isActive;
    groupObj.textPickerEl.classList.toggle(
      "state_disabled",
      !isActive || !isActiveText
    );

    groupObj.isActiveAccentCheckboxEl.disabled = !isActive;
    // groupObj.accentPickerEl.disabled = !isActive;
    groupObj.accentPickerEl.classList.toggle(
      "state_disabled",
      !isActive || !isActiveAccent
    );

    groupObj.isActiveBorderCheckboxEl.disabled = !isActive;
    groupObj.borderPickerEl.classList.toggle(
      "state_disabled",
      !isActive || !isActiveBorder
    );

    groupObj.radiusRangeEl.disabled = !isActive;
    groupObj.radiusInputEl.disabled = !isActive;

    groupObj.blurRangeEl.disabled = !isActive;
    groupObj.blurInputEl.disabled = !isActive;
  }

  buildEssenceState(name, parentName) {
    const _t = this;
    const isBackgroundActive = _t.state[name].Background.isActive;
    const isBackgroundDark = _t.state[name].Background.isDark;
    const isTextActive = _t.state[name].Text.isActive;
    const isAccentActive = _t.state[name].Accent.isActive;
    const isBorderActive = _t.state[name].Border.isActive;

    if (isBackgroundActive) {
      const BackgrounColor = _t.state[name].Background.color;

      if (!isTextActive) {
        _t.state[name].Text.color = guessVisibleColor(
          tinycolor(BackgrounColor).toHexString()
        );
      }

      if (!isAccentActive) {
        const oppositeRootName = _t.getOppositeRoot(_t.tree, name);
        _t.state[name].Accent.color =
          _t.state[oppositeRootName.name].Background.color;
      }

      if (!isBorderActive) {
        const border = _t.generateBorderFallback(name);
        _t.state[name].Border.color = border;
      }
    } else {
      const _parentName = parentName;
      _t.state[name].Background = _t.generateFallbackBackground(_parentName);
      if (!isTextActive) {
        _t.state[name].Text.color = _t.state[_parentName].Text.color;
      }
      if (!isAccentActive) {
        _t.state[name].Accent.color = _t.state[_parentName].Accent.color;
      }
      if (!isBorderActive) {
        _t.state[name].Border.color = _t.state[_parentName].Border.color;
      }
      _t.state[name].borderRadius = _t.state[_parentName].borderRadius;
      _t.state[name].blur = _t.state[name].blur;
    }
  }

  syncUiWithState(node) {
    const _t = this;
    _t.updateControl(node);
    if (node.children && node.children.length > 0) {
      node.children.forEach((n) => {
        _t.syncUiWithState(n);
      });
    }
  }

  generateUiPalette(colors) {
    const UISkin = {};
    UISkin.order = ["dominant", "accent"];

    //this.uiColors.bg = tinycolor(this.uiColors.bg).darken(80).desaturate(60).toString();
    let step = 4;
    const _vdd = this.verbalData("sk_dominant");
    const _vda = this.verbalData("sk_accent");

    const bgKeyNames = [
      "nameBgHov",
      "nameBg2",
      "nameBg2Hov",
      "nameBg3",
      "nameBg3Hov",
    ];

    let firstDominantBg = colors.bg;
    let isDark = colors.name === "dark" ? false : false;
    UISkin.dominant = {};
    UISkin.dominant[_vdd.nameBg] = firstDominantBg;
    bgKeyNames.forEach((bgName, i) => {
      UISkin.dominant[_vdd[bgName]] = isDark
        ? tinycolor(firstDominantBg)
            .darken(5 * (i + 1))
            .toHexString()
        : tinycolor(firstDominantBg)
            .brighten(5 * (i + 1))
            .toHexString();
    });
    const firstAccentBg = colors.accent;
    UISkin.accent = {};
    UISkin.accent[_vda.nameBg] = firstAccentBg;
    bgKeyNames.forEach((bgName, i) => {
      UISkin.accent[_vda[bgName]] = tinycolor(firstAccentBg)
        .darken(5 * (i + 1))
        .toHexString();
    });

    const txtKeyNames = ["nameTxt", "nameTxt2", "nameTxt3"];
    let _txtd = guessVisibleColor(firstDominantBg);
    let _txta = guessVisibleColor(firstAccentBg);
    txtKeyNames.forEach((TxtName, i) => {
      UISkin.dominant[_vdd[TxtName]] = tinycolor(_txtd)
        .setAlpha(1 - (i + 1) * 0.2)
        .toHexString();

      UISkin.accent[_vda[TxtName]] = tinycolor(_txta)
        .setAlpha(1 - (i + 1) * 0.2)
        .toHexString();
    });

    const createShadow = (c) => {
      return tinycolor(c).desaturate(10).darken(20).toHexString();
    };

    const createGlass = (c1) => {
      return tinycolor(c1).setAlpha(0.6).toRgbString();
    };

    let accentShadow = createShadow(firstAccentBg);
    let dominantShadow = createShadow(firstDominantBg);

    const dominantGlass = createGlass(firstDominantBg);
    const accentGlass = createGlass(firstAccentBg);

    UISkin.order.forEach((name, i) => {
      let _vd = this.verbalData(`sk_${name}`);
      this.root.style.setProperty(
        `--${_vd.nameBg}`,
        `${UISkin[name][_vd.nameBg]}`
      );
      this.root.style.setProperty(
        `--${_vd.nameBgHov}`,
        `${UISkin[name][_vd.nameBgHov]}`
      );
      this.root.style.setProperty(
        `--${_vd.nameBg2}`,
        `${UISkin[name][_vd.nameBg2]}`
      );
      this.root.style.setProperty(
        `--${_vd.nameBg2Hov}`,
        `${UISkin[name][_vd.nameBg2Hov]}`
      );
      this.root.style.setProperty(
        `--${_vd.nameBg3}`,
        `${UISkin[name][_vd.nameBg3]}`
      );
      this.root.style.setProperty(
        `--${_vd.nameBg3Hov}`,
        `${UISkin[name][_vd.nameBg3Hov]}`
      );

      this.root.style.setProperty(
        `--${_vd.nameTxt}`,
        `${UISkin[name][_vd.nameTxt]}`
      );
      this.root.style.setProperty(
        `--${_vd.nameTxt2}`,
        `${UISkin[name][_vd.nameTxt2]}`
      );
      this.root.style.setProperty(
        `--${_vd.nameTxt3}`,
        `${UISkin[name][_vd.nameTxt3]}`
      );
      this.root.style.setProperty(`--${_vd.name}Shadow`, `${dominantShadow}`);
      this.root.style.setProperty(`--${_vd.name}Glass`, `${dominantGlass}`);
    });
  }

  updateEssenceState(name, prop, key, newVal) {
    const t = this;
    if (!key) {
      t.state[name][prop] = newVal;
    } else {
      t.state[name][prop][key] = newVal;
    }

    console.log(t.state[name]);

    // this.emit("statechange", {
    //   name,
    //   newValue: newVal,
    // });
  }

  deepMergeObject(targetObject = {}, sourceObject = {}) {
    const _t = this;
    // clone the source and target objects to avoid the mutation
    const copyTargetObject = JSON.parse(JSON.stringify(targetObject));
    const copySourceObject = JSON.parse(JSON.stringify(sourceObject));
    // Iterating through all the keys of source object
    Object.keys(copySourceObject).forEach((key) => {
      if (
        typeof copySourceObject[key] === "object" &&
        !Array.isArray(copySourceObject[key])
      ) {
        // If property has nested object, call the function recursively
        copyTargetObject[key] = _t.deepMergeObject(
          copyTargetObject[key],
          copySourceObject[key]
        );
      } else {
        // else merge the object source to target
        copyTargetObject[key] = copySourceObject[key];
      }
    });

    return copyTargetObject;
  }

  bindEvents() {
    const _t = this;
    _t.eventBindings;
    // .push
    // _t.on("init", () => {
    //   // console.log("Initialized");

    //   _t.on("statechange", ({ essenceName, newValue }) => {
    //     console.log(
    //       "State changed for essence:",
    //       essenceName,
    //       " => ",
    //       newValue
    //     );
    //   });
    // }),
    // ();
  }

  getRootNode(rootNodes, childName) {
    const node = this.findNodeByName(rootNodes, childName);
    if (!node) return null;

    if (node.parent === null) {
      return node;
    }

    return this._climbUp(rootNodes, node);
  }

  _climbUp(rootNodes, node) {
    if (node.parent === null) {
      return node;
    }
    const parentNode = this.findNodeByName(rootNodes, node.parent);
    if (!parentNode) {
      return node;
    }
    return this._climbUp(rootNodes, parentNode);
  }

  getOppositeRoot(rootNodes, childName) {
    const root = this.getRootNode(rootNodes, childName);
    if (!root) return null;

    let oppositeName;
    if (root.name === "body") {
      oppositeName = "accent";
    } else if (root.name === "accent") {
      oppositeName = "body";
    } else {
      return null;
    }

    return this.findNodeByName(rootNodes, oppositeName);
  }

  findNodeByName(rootNodes, name) {
    for (const node of rootNodes) {
      if (node.name === name) return node;

      if (node.children && node.children.length > 0) {
        const found = this.findNodeByName(node.children, name);
        if (found) return found;
      }
    }
    return null;
  }

  traverseFromNode(node, callback) {
    const t = this;
    callback(node);

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        this.traverseFromNode(child, callback);
      }
    }
  }

  on(event, cb) {
    this.eventListener[event].push(cb);
    return this;
  }

  off(event, cb) {
    const callBacks = this.eventListener[event] || [];
    const index = callBacks.indexOf(cb);
    if (~index) {
      callBacks.splice(index, 1);
    }
    return this;
  }

  emit(event, ...args) {
    this.eventListener[event].forEach((cb) => cb(...args, this));
  }

  verbalData(name) {
    let data = {};
    data.name = name;
    data.nameBg = data.name + "Bg";

    data.selector = `[data-sk="${data.name}"]`;
    data.style = data.nameBg + "Style";
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
    data.gradientType = data.upperCaseName + "GradientType";

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
    data.nameBlur = data.name + "Blur";

    return data;
  }

  init() {
    this.addStyle();
    this.buildUI();
    this.bindEvents();
    this.tree.forEach((rn) => {
      this.rebuild(rn.name);
    });
    this.generateUiPalette(this.ui.colors["light"]);
    // this.emit("init");
  }

  getShadeStep(color, isDark, index) {
    const _t = this;
    const _step = isDark
      ? _t.essenceSteps.dark[index]
      : _t.essenceSteps.light[index];
    return isDark
      ? tinycolor(color).darken(_step).toHexString()
      : tinycolor(color).lighten(_step).toHexString();
  }

  createBackgrounds(name) {
    const _t = this;
    const _name = name;
    const _vd = _t.verbalData(_name);
    const BackgroundState = _t.state[_name].Background;
    const _color = BackgroundState.color;
    _t.skin[_vd.nameBg] = _color;
    const _isDark = BackgroundState.isDark;
    const backgrounds = [
      "nameBgHov",
      "nameBg2",
      "nameBg2Hov",
      "nameBg3",
      "nameBg3Hov",
    ];

    backgrounds.forEach((b) => {
      _t.skin[_vd[b]] = _t.getShadeStep(_color, _isDark, b);
    });
  }

  createGradients(name) {
    const _t = this;
    const _name = name;
    const _vd = _t.verbalData(_name);
    const BackgroundState = _t.state[_name].Background;
    const GradientState = _t.state[_name].Gradient;
    const angle = GradientState.angle;
    const type = GradientState.type;

    if (GradientState.isActive) {
      const stops =
        GradientState.stops && GradientState.stops.length > 0
          ? GradientState.stops
          : [_t.skin[_vd.nameBg], _t.skin[_vd.nameBg3]];
      GradientState.stops = stops;
      let str = "";
      const stopsString = stops.map((s) => s).join(", ");
      if (type === "linear") {
        str = `linear-gradient(${angle}deg, ${stopsString})`;
      } else if (type === "radial") {
        str = `radial-gradient(circle at 50% 50%, ${stopsString})`;
      } else if (type === "conic") {
        str = `conic-gradient(from 90deg at 50% 50%, ${stopsString})`;
      }
      _t.skin[_vd.nameG] = str;
    } else {
      const _color = BackgroundState.color;
      _t.skin[_vd.nameG] = _color;
    }
  }

  createTexts(name) {
    const _t = this;
    const _name = name;
    const _vd = _t.verbalData(_name);
    const TextState = _t.state[_name].Text;
    const BackgroundState = _t.state[_name].Background;
    let { isActive, color } = TextState;
    let bg = BackgroundState.color;

    _t.skin[_vd.nameTxt] = color;

    _t.skin[_vd.nameTxt2] = tinycolor
      .mix(_t.skin[_vd.nameTxt], bg, 30)
      .toHexString();

    _t.skin[_vd.nameTxt3] = tinycolor
      .mix(_t.skin[_vd.nameTxt], bg, 50)
      .toHexString();
  }

  createAccents(name) {
    const _t = this;
    const _name = name;
    const _vd = _t.verbalData(_name);
    const AccentState = _t.state[_name].Accent;
    let { isActive, color } = AccentState;
    _t.skin[_vd.nameAccent] = color;
    _t.skin[_vd.nameAccentTxt] = guessVisibleColor(
      tinycolor(color).toHexString()
    );
  }

  createBorders(name) {
    const _t = this;
    const _name = name;
    const _vd = _t.verbalData(_name);
    const BorderState = _t.state[_name].Border;
    let { isActive, color } = BorderState;

    _t.skin[_vd.nameBorder] = color;
  }

  createRadius(name) {
    const _t = this;
    const _name = name;
    const _vd = _t.verbalData(_name);
    const BorderState = _t.state[_name].borderRadius;
    _t.skin[_vd.nameRadius] = BorderState;
  }

  createBlur(name) {
    const _t = this;
    const _name = name;
    const _vd = _t.verbalData(_name);
    const blurState = _t.state[_name].blur;
    _t.skin[_vd.nameBlur] = blurState;
  }

  updateSkin(name) {
    const _t = this;
    _t.createBackgrounds(name);
    _t.createGradients(name);
    _t.createTexts(name);
    _t.createAccents(name);
    _t.createBorders(name);
    _t.createRadius(name);
    _t.createBlur(name);
  }

  buildSkin(node) {
    const _t = this;
    _t.updateSkin(node);
    if (node.children && node.children.length > 0) {
      node.children.forEach((n) => {
        _t.buildSkin(n);
      });
    }
  }

  updateOverlayCSS(name) {
    const _t = this;

    const _vd = _t.verbalData(name);
    const _id = `sk_style_elem_${name}`;
    let style = document.getElementById(_id);
    if (!style) {
      style = document.createElement("style");
      style.id = _id;
      _t.root.appendChild(style);
    }

    const backgrounds = ["nameBg", "nameBgHov"];
    let css = "";
    backgrounds.forEach((bg) => {
      css += `--${_vd[bg]}: ${_t.skin[_vd[bg]]};\n`;
    });

    const texts = ["nameTxt", "nameTxt2"];

    texts.forEach((txt) => {
      css += `--${_vd[txt]}: ${_t.skin[_vd[txt]]};\n`;
    });

    css += `--${_vd.nameAccent}: ${_t.skin[_vd.nameAccent]};\n`;
    css += `--${_vd.nameAccentTxt}: ${_t.skin[_vd.nameAccentTxt]};\n`;

    css += `--${_vd.nameBlur}: ${_t.skin[_vd.nameBlur]}px;\n`;

    style.innerHTML = _t.wrapInRootTag(":root", css);

    this.state[name].css = css;
  }

  updateCSS(name) {
    const _t = this;

    const _vd = _t.verbalData(name);
    const _id = `sk_style_elem_${name}`;
    let style = document.getElementById(_id);
    if (!style) {
      style = document.createElement("style");
      style.id = _id;
      _t.root.appendChild(style);
    }

    const backgrounds = [
      "nameBg",
      "nameBgHov",
      "nameBg2",
      "nameBg2Hov",
      "nameBg3",
      "nameBg3Hov",
    ];
    let css = "";
    backgrounds.forEach((bg) => {
      css += `--${_vd[bg]}: ${_t.skin[_vd[bg]]};\n`;
    });

    css += `--${_vd.nameG}: ${_t.skin[_vd.nameG]};\n`;

    const texts = ["nameTxt", "nameTxt2", "nameTxt3"];

    texts.forEach((txt) => {
      css += `--${_vd[txt]}: ${_t.skin[_vd[txt]]};\n`;
    });

    css += `--${_vd.nameAccent}: ${_t.skin[_vd.nameAccent]};\n`;
    css += `--${_vd.nameAccentTxt}: ${_t.skin[_vd.nameAccentTxt]};\n`;

    css += `--${_vd.nameBorder}: ${_t.skin[_vd.nameBorder]};\n`;
    css += `--${_vd.nameRadius}: ${_t.skin[_vd.nameRadius]}px;\n`;

    style.innerHTML = _t.wrapInRootTag(":root", css);

    this.state[name].css = css;
  }

  wrapInRootTag(tag, css) {
    const _tag = tag || ":root";

    return `${_tag}{\n${css}}`;
  }

  build(name) {
    const _t = this;
    const node = _t.findNodeByName(_t.tree, name);

    _t.buildEssenceState(name, node.parent);
    _t.updateControl(name);
    _t.updateSkin(name);
    if (name === "overlay") {
      _t.updateOverlayCSS(name);
    } else {
      _t.updateCSS(name);
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((n) => {
        _t.build(n.name);
      });
    }
  }

  rebuild(name) {
    const _t = this;
    const node = _t.findNodeByName(_t.tree, name);

    _t.buildEssenceState(name, node.parent);
    _t.updateControl(name);
    _t.updateSkin(name);
    if (name === "overlay") {
      _t.updateOverlayCSS(name);
    } else {
      _t.updateCSS(name);
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((n) => {
        _t.rebuild(n.name);
      });
    }
  }

  arrayToTree = (arr = []) => {
    const map = {};
    const res = [];

    for (let i = 0; i < arr.length; i++) {
      map[arr[i].name] = i;
      arr[i].children = [];
    }

    for (let i = 0; i < arr.length; i++) {
      const node = arr[i];
      if (node.parent) {
        arr[map[node.parent]].children.push(node);
      } else {
        res.push(node);
      }
    }

    return res;
  };

  createCheckBox(id, cn) {
    const _id = id;
    const _cn = cn || "default";

    const label = document.createElement("label");
    label.className = "sk_chb_label " + (_cn ? _cn : "");
    const icon = document.createElement("i");
    icon.className = "sk_chb";
    icon.innerHTML = this.ui.icons.chb;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = _id;

    label.appendChild(checkbox);
    label.appendChild(icon);

    return {
      el: label,
      chb: checkbox,
    };
  }

  createBackgrounPicker(name, type) {
    const _type = type;
    const _t = this;
    const backgroundPickerEl = document.createElement("div");
    backgroundPickerEl.className = "sk_picker_trigger";

    backgroundPickerEl.addEventListener("click", (evt) => {
      const color = _t.state[name].Background.color;
      _t.handlePicker(evt, color, _type, (newColor) => {
        _t.updateEssenceState(name, "Background", "color", newColor);
        this.build(name);
      });
    });

    return backgroundPickerEl;
  }

  createTextPicker(name) {
    const _t = this;
    const textPickerEl = document.createElement("div");
    textPickerEl.className = "sk_picker_trigger";

    textPickerEl.addEventListener("click", (evt) => {
      const color = _t.state[name].Text.color;
      _t.handlePicker(evt, color, "color", (newColor) => {
        _t.updateEssenceState(name, "Text", "color", newColor);
        this.build(name);
      });
    });

    return textPickerEl;
  }

  createGradientPicker(name) {
    const _t = this;
    const gradientPickerEl = document.createElement("div");
    gradientPickerEl.className = "sk_picker_trigger";

    gradientPickerEl.addEventListener("click", (evt) => {
      _t.handleGradientPicker(evt, name, (data) => {
        _t.updateEssenceState(name, "Gradient", "angle", data.angle);
        _t.updateEssenceState(name, "Gradient", "stops", data.stops);
        _t.updateEssenceState(name, "Gradient", "type", data.type);
        this.build(name);
      });
    });

    return gradientPickerEl;
  }

  createBorderPicker(name) {
    const _t = this;
    const borderPickerEl = document.createElement("div");
    borderPickerEl.className = "sk_picker_trigger";

    borderPickerEl.addEventListener("click", (evt) => {
      const color = _t.state[name].Border.color;
      _t.handlePicker(evt, color, "color", (newColor) => {
        _t.updateEssenceState(name, "Border", "color", newColor);
        this.build(name);
      });
    });

    return borderPickerEl;
  }

  createSliderControl(name, prop) {
    const _prop = prop || "borderRadius";
    const _t = this;
    let _control, range, input;
    _control = document.createElement("div");
    _control.className = `sk_checkbox_wrapper sk_checkbox_wrapper-range variant_${prop}`;

    range = document.createElement("input");
    range.type = "range";
    range.min = 0;
    range.max = 100;
    input = document.createElement("input");
    input.type = "number";
    input.className = "sk_input_text";

    input.addEventListener("input", (e) => {
      input.value = e.target.value;
      _t.updateEssenceState(name, _prop, null, e.target.value);
      _t.build(name);
    });
    range.addEventListener("input", (e) => {
      range.value = e.target.value;
      _t.updateEssenceState(name, _prop, null, e.target.value);
      _t.build(name);
    });

    const label = document.createElement("div");
    label.className = "sk_label_sm";
    // _control.appendChild(label);

    _control.appendChild(range);
    _control.appendChild(input);

    return {
      el: _control,
      inputEl: input,
      rangeEl: range,
    };
  }

  createAccentPicker(name) {
    const _t = this;
    const accentPickerEl = document.createElement("div");
    accentPickerEl.className = "sk_picker_trigger";

    accentPickerEl.addEventListener("click", (evt) => {
      const color = _t.state[name].Accent.color;
      _t.handlePicker(evt, color, "color", (newColor) => {
        _t.updateEssenceState(name, "Accent", "color", newColor);
        this.build(name);
      });
    });

    return accentPickerEl;
  }

  createWrapper(cn) {
    const _cn = cn || "";
    const root = document.createElement("div");
    root.className = `sk_checkbox_wrapper ${_cn && `variant_${_cn}`}`;
    return root;
  }

  createEssenceCheckbox(name, prop, key) {
    const _t = this;
    const chbRef = _t.createCheckBox(`${name}${prop}${key}`);
    // chbRef.chb.checked = !!this.state[name][prop].isActive;

    chbRef.chb.addEventListener("change", (e) => {
      const newActiveVal = e.target.checked;
      _t.updateEssenceState(name, prop, key, newActiveVal);
      const bg = _t.state[name][prop].color;
      _t.updateEssenceState(name, prop, "color", bg);
      _t.build(name);
    });

    return chbRef;
  }

  createEssenceGroupCheckbox(name) {
    const _t = this;
    const chbRef = _t.createCheckBox(`Is${name}EssenceGroupActive`);
    // chbRef.chb.checked = !!this.state[name][prop].isActive;

    chbRef.chb.addEventListener("change", (e) => {
      const newActiveVal = e.target.checked;
      _t.updateEssenceState(name, "Background", "isActive", newActiveVal);
      _t.build(name);
    });

    return chbRef;
  }

  createTintCheckbox(name) {
    const prop = "isDark";
    const chbRef = this.createCheckBox(`${name}${prop}`);
    // chbRef.chb.checked = !!this.state[name].Background.isDark;

    chbRef.chb.addEventListener("change", (e) => {
      const newActiveVal = e.target.checked;

      this.updateEssenceState(name, "Background", prop, newActiveVal);
      this.build(name);
    });

    return chbRef;
  }

  createSwitch() {
    const lbl = document.createElement("label");
    lbl.className = "sk_switch_root";
    const switchEl = document.createElement("input");
    switchEl.type = "checkbox";
    switchEl.className = "sk_switch_input";
    const ic = document.createElement("i");
    ic.className = "sk_switch_imitator";

    lbl.appendChild(switchEl);
    lbl.appendChild(ic);

    return lbl;
  }

  createButton(label, icon) {
    const _t = this;
    const buttonEl = document.createElement("div");
    buttonEl.className = "sk_btn";
    const lbl = document.createElement("span");
    lbl.innerText = label;

    if (icon) {
      const ic = document.createElement("i");
      ic.innerHTML = _t.ui.icons[icon];
      buttonEl.appendChild(ic);
    }
    buttonEl.appendChild(lbl);

    return buttonEl;
  }

  addStringAnim() {
    const stringWrapper = document.createElement("div");
    stringWrapper.className = "sk_path_string_root";
    const svgNS = "http://www.w3.org/2000/svg";
    const box = document.createElement("div");
    box.className = "sk_path_string_box";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );

    var path = document.createElementNS(svgNS, "path");
    path.setAttribute("vector-effect", "non-scaling-stroke");
    svg.setAttribute("preserveAspectRatio", "none");
    const defs = document.createElementNS(svgNS, "defs");
    svg.appendChild(path);
    svg.appendChild(defs);

    const linearGradient = document.createElementNS(svgNS, "linearGradient");
    linearGradient.setAttribute("id", "strokeGradient");
    linearGradient.setAttribute("gradientUnits", "userSpaceOnUse");

    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("x2", "100%");
    linearGradient.setAttribute("y2", "0%");

    const colors = [
      "#FF637C",
      "#8144CD",
      "#7872E0",
      "#56A9E2",
      "#D2F58D",
      "#FFD76B",
      "#FF637C",
    ];

    // Distribute offsets evenly (0% to 100%)
    colors.forEach((color, index) => {
      const stop = document.createElementNS(svgNS, "stop");
      const offset = (index / (colors.length - 1)) * 100;
      stop.setAttribute("offset", offset + "%");
      stop.setAttribute("stop-color", color);
      linearGradient.appendChild(stop);
    });

    // 5. Append the gradient to defs
    defs.appendChild(linearGradient);

    stringWrapper.appendChild(svg);
    stringWrapper.appendChild(box);

    this.ui.root.appendChild(stringWrapper);

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

    path.setAttribute("stroke", "url(#strokeGradient)");
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

  isOverlay(name) {
    return name === "overlay";
  }

  buildUI() {
    this.ui.root = document.createElement("div");
    this.ui.root.className = "sk_root";
    this.ui.header = document.createElement("div");
    this.ui.header.className = "sk_header";
    this.ui.content = document.createElement("div");
    this.ui.content.className = "sk_content sk_scrollbar";

    this.ui.toolsPanel = document.createElement("div");
    this.ui.toolsPanel.className = "sk_tools_root";

    this.ui.themeTrigger = this.createSwitch();
    this.ui.collapseTrigger = this.createSwitch();

    this.ui.toolsPanel.appendChild(this.ui.themeTrigger);
    this.ui.toolsPanel.appendChild(this.ui.collapseTrigger);

    this.root.appendChild(this.ui.root);
    this.ui.root.appendChild(this.ui.header);
    this.ui.root.appendChild(this.ui.content);
    this.ui.root.appendChild(this.ui.toolsPanel);

    const editables = [
      "essence",
      "background",
      "gradient",
      "text",
      "accent",
      "border",
      "radius",
    ];

    editables.forEach((e) => {
      const label = document.createElement("div");
      label.className = `sk_header_label variant-${e}`;
      label.innerText = e;
      this.ui.header.appendChild(label);
    });

    this.essencesArray.forEach((essenceObj) => {
      const name = essenceObj.name;
      const essenceState = this.state[name];
      const group = document.createElement("div");
      group.className = "sk_control_group";
      this.isOverlay(name) && group.classList.add("variant_overlay");
      const svgBorder = document.createElement("div");
      svgBorder.className = "sk_border_svg_wrapper";
      svgBorder.innerHTML = this.ui.icons.border;

      svgBorder;
      const groupLabel = document.createElement("span");
      groupLabel.className = "sk_control_group_label";

      groupLabel.innerText = name;
      const groupChild1 = document.createElement("div");
      groupChild1.className = "sk_checkbox_wrapper";
      const groupChild2 = document.createElement("div");
      groupChild2.className = "sk_checkbox_wrapper";

      group.append(svgBorder);

      if (essenceState.Background && essenceState.Background.isActive) {
        group.classList.add("state_active");
      }
      const pickerType = this.isOverlay(name) ? "opacity" : "color";

      const backgroundPickerEl = this.createBackgrounPicker(name, pickerType);
      const gradientPickerEl = this.createGradientPicker(name);
      const textPickerEl = this.createTextPicker(name);
      const accentPickerEl = this.createAccentPicker(name);
      const borderPickerEl = this.createBorderPicker(name);

      const gradientGroupWrapper = this.createWrapper("gradient");
      const textGroupWrapper = this.createWrapper("text");
      const accentGroupWrapper = this.createWrapper("accent");
      const borderGroupWrapper = this.createWrapper("border");

      const chbRef = this.createEssenceGroupCheckbox(name);
      const chbIsDarkRef = this.createTintCheckbox(name);
      const isGradientActiveRef = this.createEssenceCheckbox(
        name,
        `Gradient`,
        "isActive"
      );
      const isTextActiveRef = this.createEssenceCheckbox(
        name,
        `Text`,
        "isActive"
      );
      const chbAccentRef = this.createEssenceCheckbox(
        name,
        "Accent",
        "isActive"
      );
      const chbBorderRef = this.createEssenceCheckbox(
        name,
        "Border",
        "isActive"
      );

      groupChild1.appendChild(chbRef.el);
      groupChild1.appendChild(groupLabel);
      groupChild2.appendChild(backgroundPickerEl);
      groupChild2.appendChild(chbIsDarkRef.el);
      const radiusGroupWrapper = this.createSliderControl(name, "borderRadius");
      const blurGroupWrapper = this.createSliderControl(name, "blur");

      gradientGroupWrapper.appendChild(isGradientActiveRef.el);
      gradientGroupWrapper.appendChild(gradientPickerEl);
      textGroupWrapper.appendChild(isTextActiveRef.el);
      textGroupWrapper.appendChild(textPickerEl);
      accentGroupWrapper.appendChild(chbAccentRef.el);
      accentGroupWrapper.appendChild(accentPickerEl);
      borderGroupWrapper.appendChild(chbBorderRef.el);
      borderGroupWrapper.appendChild(borderPickerEl);

      group.appendChild(groupChild1);
      group.appendChild(groupChild2);
      group.appendChild(gradientGroupWrapper);
      group.appendChild(textGroupWrapper);
      group.appendChild(accentGroupWrapper);
      group.appendChild(borderGroupWrapper);
      group.appendChild(radiusGroupWrapper.el);
      group.appendChild(blurGroupWrapper.el);

      this.ui.content.appendChild(group);

      this.ui.essenceGroups[name] = {
        groupEl: group,
        isActiveCheckboxEl: chbRef.chb,
        isDarkCheckboxEl: chbIsDarkRef.chb,
        colorTriggerEl: backgroundPickerEl,
        isActiveGradientCheckboxEl: isGradientActiveRef.chb,
        gradientPickerEl: gradientPickerEl,
        isActiveTextCheckboxEl: isTextActiveRef.chb,
        textPickerEl: textPickerEl,
        isActiveAccentCheckboxEl: chbAccentRef.chb,
        accentPickerEl: accentPickerEl,
        isActiveBorderCheckboxEl: chbBorderRef.chb,
        borderPickerEl: borderPickerEl,
        radiusRangeEl: radiusGroupWrapper.rangeEl,
        radiusInputEl: radiusGroupWrapper.inputEl,
        blurRangeEl: blurGroupWrapper.rangeEl,
        blurInputEl: blurGroupWrapper.inputEl,
      };
    });

    this.ui.footer = document.createElement("div");
    this.ui.footer.className = "sk_actions_wrapper";

    this.ui.root.appendChild(this.ui.footer);

    this.ui.saveTrigger = this.createButton("save", "download");

    this.ui.loadTrigger = this.createButton("load", "download");

    this.ui.downloadTrigger = this.createButton("variables", "download");
    this.ui.downloadTrigger.addEventListener("click", () =>
      this.makeDownloadRequest("sport")
    );
    this.ui.footer.appendChild(this.ui.downloadTrigger);
    this.ui.footer.appendChild(this.ui.saveTrigger);
    this.ui.footer.appendChild(this.ui.loadTrigger);

    this.addStringAnim();
  }

  async makeDownloadRequest(name, number) {
    const _t = this;
    let css = "";

    _t.essencesArray.forEach((essenceObj) => {
      css += _t.state[essenceObj.name].css;
    });

    const wrappedInRoot = _t.wrapInRootTag(":root", css);

    var element = document.createElement("a");
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var fileNameSuffix = hours + "-" + minutes;
    element.setAttribute(
      "href",
      "data:text/css;charset=utf-8," + encodeURIComponent(wrappedInRoot)
    );
    element.setAttribute("download", name + "_" + fileNameSuffix + ".css");
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

  // updateEssenceUI(name) {
  //   this.ui.essenceGroups[name].className =
  // }

  addStyle() {
    const css = `
:root {
  --sk_zind: 90000000;
  --sk_zind2: calc(var(--sk_zind) + 10);
  --skinnerHeaderHeight: 32px;
  --skinnerHeaderTogglerSize: 50px;
  --skinnerToolboxHeight: 28px;
  --skinnerToolboxFooterHeight: 48px;
  --skinnerBtnHeight: 28px;
  --skinnerToolboxCollapserSize: 42px;
  --control-picker-size: 28px;
  --control-picker-size-border: calc(var(--control-picker-size) - 4px);
  --controls-row-height: 34px;
  --controls-ui-gap: 6px;
  --controls-ui-pad-x: 6px;
  --controls-ui-pad-y: 6px;
  --sk_grad_rainbow: linear-gradient(90deg, #FF637C, #8144CD, #7872E0, #56A9E2, #D2F58D, #FFD76B, #FF637C);
  --sk_rainbow_1: #FF637C;
  --sk_rainbow_2: #8144CD;
  --sk_rainbow_3: #7872E0;
  --sk_rainbow_4: #56A9E2;
  --sk_rainbow_5: #D2F58D;
  --sk_rainbow_6: #FFD76B;
}

.sk_path_string_root {
  height: 40px;
  position: relative;
  width: 100%;
  position: absolute;
  top: 10px;
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
  stroke-width: 2px;
  fill: none;
}

html,
body {
  height: 100%;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.sk_actions_wrapper {
  display: flex;
  align-items: center;
  column-gap: 6px;
  padding: 0 8px;
  height: var(--skinnerToolboxFooterHeight);
  background: var(--sk_dominantGlass);
  position: absolute;
  border-top: 1px solid var(--sk_dominantBg3Hover);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
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
  background-color: var(--sk_dominantBg);
  color: var(--sk_dominantTxt);
  font-family: "Roboto", sans-serif;
}

.sk_header {
  width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: var(--sk_dominantBg2);
    color: var(--sk_dominantTxt);
    border-bottom: 1px solid var(--sk_dominantBgHover);
    height: 30px;
    padding: 0 12px;
    column-gap: 6px;
    font-size: 11px;
}

.sk_header_label {
    width: 66px;
    flex-shrink: 0;
}

.sk_header_label.variant-essence{
    width: 118px;
    display: flex;
    align-items: center;
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

.sk_root {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  transition: transform 0.5s;
  z-index: var(--sk_zind);
  height: 320px;
  width: auto;
  color: var(--sk_dominantTxt);
  border: 1px solid var(--sk_dominantBgHover);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.5);
  background: var(--sk_dominantBg);
}

.sk_tools_root{
  background: var(--sk_dominantBg);
    color: var(--sk_dominantTxt);
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 100px;
    transform: translateX(calc(100% + 12px));
    border-radius: 4px;
    border: 1px solid var(--sk_dominantBg2);
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 6px;
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

.sk_content {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - var(--skinnerToolboxFooterHeight));
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 6px;
  padding-bottom: var(--skinnerToolboxFooterHeight);
}

.skn_controls_row {
  border: 1px solid var(--sk_dominantBg3Hover);
    display: flex;
    padding: 0 var(--controls-ui-pad-x);
    align-items: center;
    column-gap: var(--controls-ui-gap);
    height: var(--controls-row-height);
    background-color: var(--sk_dominantBg2);
    color: var(--sk_dominantTxt) !important;
    border-radius: 4px;
}

.sk_control_group {
--blur: none;
--radius: flex;
--border: flex;
--gradient: flex;
--tl: 60;
--br: 60;
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
  flex-wrap: nowrap;
  margin-bottom: 1px;
  align-items: center;
  border-radius: 4px;
  opacity: 0.5;
}

.sk_control_group.variant_overlay{
    --blur: flex;
    --radius: none;
    --border: none;
    --gradient: none;
}

.sk_control_group_label{
  font-size: 11px;
  width: 80px;
  text-transform: capitalize;
  flex-shrink: 0;
}

.sk_control_group.state_active {
--tl: -267;
--br: 385;
  /*box-shadow: -5px 0px 0 0px var(--sk_accentBg);*/
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

.sk_picker_trigger {
  width: var(--control-picker-size);
  height: var(--control-picker-size);
  flex-shrink: 0;
  border: none;
  outline: 0;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.314s;
  border: 1px solid var(--sk_dominantBg3Hover);
  position: relative;
  overflow: hidden;
}

.sk_picker_trigger.state_disabled{
    pointer-events: none;
    opacity: 0.2;
}

.sk_border_svg_wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    background: var(--sk_dominantBg);
    border-radius: 4px;
    overflow: hidden;
}

.sk_border_svg{
fill: none;
stroke-width: 6px;
stroke: url(#strokeGradient);
width: 100%;
height: 100%;
}

.sk_border_svg > .tl{
    transition: stroke-dashoffset 0.5s;
    stroke-dasharray: 60 406;
    stroke-dashoffset: var(--tl);
}

.sk_border_svg > .br{
  transition: stroke-dashoffset 0.5s;
    stroke-dasharray: 60 406;
    stroke-dashoffset: var(--br);
}

.sk_picker_trigger::before{
    content: " ";
    width: 10px;
    height: 10px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%) rotate(45deg);
}

.nik_skinner_control_group_picker {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nik_skinner_control_group_picker.variant_bg {
  background: var(--bg) !important;
}

.nik_skinner_control_group_picker.variant_border {
  background: var(--border) !important;
}

.nik_skinner_control_group_picker.variant_text {
  background: var(--txt) !important;
}

.nik_skinner_control_group_picker.variant_accent {
  background: var(--acc) !important;
}

.nik_skinner_control_group_picker:hover {
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

.sk_btn {
  appearance: none;
  border: 1px solid var(--sk_dominantBg2Hover);
  text-align: center;
  height: var(--skinnerBtnHeight);
  text-decoration: none;
  background-color: var(--sk_dominantBg2);
  color: var(--sk_dominantTxt);
  fill: var(--sk_dominantTxt2);
  display: block;
  text-transform: capitalize;
  font-size: 12px;
  position: relative;
  font-weight: 700;
  padding: 0 6px;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 4px;
}

.sk_btn.state_active{
    background: conic-gradient(from 90deg at 50% 50%, #FF637C, #8144CD, #7872E0, #56A9E2, #D2F58D, #FFD76B, #FF637C);
    color: #fff;
}

.sk_btn.variant_icon {
    width: var(--skinnerBtnHeight);
    height: var(--skinnerBtnHeight);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sk_dominantTxt2);
}

.sk_btn:hover {
  background-color: var(--sk_dominantBg2);
}

.sk_btn.variant_cta {
  background-color: var(--sk_accentBg);
  border-color: var(--sk_accentBg2);
  color: var(--sk_accentTxt);
  position: relative;
}

.sk_btn.variant_cta:hover {
  border-color: var(--sk_accentBg);
  background-color: var(--sk_accentBg);
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
  font-size: 12px;
  padding: var(--controls-ui-pad-y) var(--controls-ui-pad-x);
  color: var(--sk_dominantTxt2);
  background: var(--sk_dominantBg2Hover);
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

.sk_input_text {
  width: 50px;
  font-size: 11px;
  height: 28px;
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

.sk_checkbox_wrapper {
  display: flex;
  border: 1px solid var(--sk_dominantBg3Hover);
  height: var(--controls-row-height);
  align-items: center;
  justify-content: center;
  background-color: var(--sk_dominantBg2);
  flex-shrink: 0;
  position: relative;
  margin: 0;
  flex-shrink: 0;
  border-radius: 0;
  column-gap: 4px;
  padding: 2px 4px;
  border-radius: 4px;
}

.sk_checkbox_wrapper.variant_blur{
  display: var(--blur);
}
.sk_checkbox_wrapper.variant_borderRadius{
  display: var(--radius);
}
.sk_checkbox_wrapper.variant_gradient{
  display: var(--gradient);
}
.sk_checkbox_wrapper.variant_border{
  display: var(--border);
}

.sk_style_trigger{
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
    border: 1px solid var(--sk_dominantBg3Hover);
    position: relative;
    overflow: hidden;
}

.sk_checkbox_wrapper > .pickr {
  position: absolute;
}

.sk_checkbox_wrapper:last-child {
  margin: 0;
}

.sk_checkbox_wrapper.sk_checkbox_wrapper-range {
  width: 100%;
  justify-content: flex-start;
  padding: 2px 4px;
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

.sk_checkbox_wrapper-controls
  .nik_skinner_control_group_checkbox_wrapper {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

.sk_scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.sk_scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sk_scrollbar::-webkit-scrollbar-thumb {
  background: var(--sk_dominantBg2);
  border-radius: 2px;
}

/* Handle on hover */
.sk_scrollbar::-webkit-scrollbar-thumb:hover {
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

.sk_hide_ui .skinner_toolbox {
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
  background: var(--sk_dominantBg);
    border: 1px solid var(--sk_dominantBg3);
  border-radius: 2px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
      margin-top: -6px;
    width: 18px;
    height: 18px;
    background-color: var(--sk_dominantBg);
    border: 1px solid var(--sk_dominantBg2);
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    box-shadow: inset 0 0 0px 2px var(--sk_dominantTxt);

}


input[type="range"]::-moz-range-track {
  background: var(--sk_dominantBg);
  border: 0.2px solid #010101;
  border-radius: 1.3px;
  width: 100%;
  height: 8px;
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

.sk_switch_root {
  position: relative;
}

.sk_switch_input{
  display: none;
} 

.sk_switch_root > .sk_switch_input + .sk_switch_imitator {
--trackBg: var(--sk_dominantShadow);
--thumbBg: var(--sk_dominantBg2);
  --tr: 0;
}

.sk_switch_root > .sk_switch_input:checked + .sk_switch_imitator {
--trackBg: var(--sk_accentBg);
--thumbBg: var(--sk_accentTxt);
  --tr: 16px;
}

.sk_switch_imitator {
  width: 36px;
  height: 20px;
  background-color: var(--trackBg);
  flex-shrink: 0;
  display: block;
  position: relative;
  border-radius: 12px;
}

.sk_switch_imitator::before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: var(--thumbBg);
  border: 2px solid var(--trackBg);
  flex-shrink: 0;
  display: block;
  transform: translate(var(--tr));
  border-radius: 50%;
  transition: all 0.2s;
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
.sk_chb_label input[type="checkbox"] {
  display: none;
}

:root {
  --chbSize: 24px;
  --chbH: var(--chbSize);
  --wrapperChbSize: 42px;
  --chbSizeBorder: 1px;
  --chbBg: var(--sk_dominantBgHover);
  --activeChbBg: var(--sk_AccentBgHover);
}

.sk_chb {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--sk_dominantBg);
  cursor: pointer;
  border: var(--chbSizeBorder) solid var(--sk_dominantBg2);
  border-radius: 4px;
  color: var(--sk_dominantBg);
  transition: background 0.2s;
}

.sk_chb_label.variant_tone {
  --chbSize: 32px;
  --chbH: 18px;
}

.sk_chb_label.variant_tone .sk_chb {
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

.sk_chb_label {
  width: var(--chbSize);
  height: var(--chbH);
  flex-shrink: 0;
}

.sk_chb_label
  > input[type="checkbox"]:checked
  + .sk_chb {
  background: var(--sk_accentBg);
  color: var(--sk_accentTxt);
  border-color: var(--sk_accentBgHover);
  --stroke_dash_arr: 16;
  --stroke_dash_off: 0;
}

.sk_chb{
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
  border: 1px solid var(--sk_dominantBg3Hover);
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
  line-height: 26px;
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
  width: calc(var(--skinnerToolboxHeight) + 10px);
  background-color: var(--sk_dominantBg);
  color: var(--sk_dominantTxt);
  border: 2px solid var(--sk_accentBg);
  border-radius: 16px;
  padding: 0px;
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
    background: var(--sk_dominantBg2);
    color: var(--sk_dominantTxt2);
    border-radius: 4px;
    border: 1px solid var(--sk_dominantBg3);
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
  top: 2px;
  transform: translateX(0);
  transition: background-color 0.2s, transform 0.1s;
}

.skinner_ui_switcher > input:checked ~ span {
  transform: translateX(10px);
}

.skinner_settings_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 6px;
}

.sk_label_sm {
  width: 100px;
  flex-shrink: 0;
  font-size: 11px;
}

.nik_skinner_control_collapse_collapser > .skinner_ico_arrow {
  display: none;
}

.sk_checkbox_wrapper.sk_checkbox_wrapper-small {
  width: 64px;
}

.sk_checkbox_wrapper.sk_checkbox_wrapper-range {
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
    background-color: var(--sk_dominantBg3);
    border: 1px solid var(--sk_dominantBg3Hover);
    border-radius: 4px;
    color: var(--sk_dominantTxt2);
    box-shadow: 0px 0px 0px 1px var(--sk_dominantShadow);
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
    this.styles = document.createElement("style");
    this.styles.id = this.cn.styleId;
    this.styles.innerHTML = css;
    this.root.appendChild(this.styles);
  }
}

export { Skinner };
