import guessVisibleColor from "./neuron.js";
var tinycolor = require("tinycolor2");
import Pickr from "@simonwep/pickr";

function verbalDataCasino(name) {
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

const configOrderCasino = [
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
    variation: 5,
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

function verbalData(name) {
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

function createCssStringCasino(skin) {
  let res = ``;

  configOrderCasino.forEach((c, i) => {
    let n = c.name.charAt(0).toUpperCase() + c.name.slice(1);
    let essence = verbalData(n);
    let value = verbalData(c.name);

    res += `    --cw${essence.nameG}: ${skin[value.nameG]};\n`;
    res += `    --cw${essence.nameBg}: ${skin[value.nameBg]};\n`;
    res += `    --cw${essence.nameBg2}: ${skin[value.nameBg2]};\n`;
    res += `    --cw${essence.nameBg3}: ${skin[value.nameBg3]};\n`;
    res += `    --cw${essence.nameBgHov}: ${skin[value.nameBgHov]};\n`;
    res += `    --cw${essence.nameBg2Hov}: ${skin[value.nameBg2Hov]};\n`;
    res += `    --cw${essence.nameBg3Hov}: ${skin[value.nameBg3Hov]};\n`;
    res += `    --cw${essence.nameTxt}: ${skin[value.nameTxt]};\n`;
    res += `    --cw${essence.nameTxt2}: ${skin[value.nameTxt2]};\n`;
    res += `    --cw${essence.nameTxt3}: ${skin[value.nameTxt3]};\n`;
    res += `    --cw${essence.nameAccent}: ${skin[value.nameAccent]};\n`;
    res += `    --cw${essence.nameAccentTxt}: ${skin[value.nameAccentTxt]};\n`;
    res += `    --cw${essence.nameRGBA}: ${skin[value.nameRGBA]};\n`;
    res += `    --cw${essence.nameRGBA2}: ${skin[value.nameRGBA2]};\n`;
    res += `    --cw${essence.nameRGBA3}: ${skin[value.nameRGBA3]};\n`;
    res += `    --cw${essence.name}Shadow: ${skin[`${value.name}Shadow`]};\n`;
    res += `    --cw${essence.name}ShadowFade: ${
      skin[`${value.name}ShadowFade`]
    };\n`;
    res += `    --cw${essence.nameRadius}: ${skin[value.nameRadius]}px;\n`;
    res += `    --cw${essence.nameBorder}: ${skin[value.nameBorder]};`;

    if (i !== configOrderCasino.length - 1) {
      res += `\n\n`;
    }
  });

  return res;
}
var dd = "";
function createCss(c) {
  let css = `
        :root{
        ${createCssStringCasino(c)}
        }`;

  let results = {
    css: css,
    name: "casWeb",
  };

  let target = document.getElementById("sk_css_selector");
  setOrUpdateIframeCss(css, target);
  //style.innerHTML = css;
  dd = results.css;
  return results;
}

function setOrUpdateIframeCss(cssStyle, target) {
  var styleId = "css-as-test-stylesheet";
  var styleElement = document.getElementById(styleId);

  if (!styleElement) {
    // Create the style element if it doesn't exist
    styleElement = document.createElement("style");
    styleElement.setAttribute("id", styleId);
    document.head.appendChild(styleElement);
  }

  // Update the inner HTML of the style element with the new CSS
  styleElement.innerHTML = cssStyle;
}

class Skinner {
  constructor(cssCb, starterConfig, header, root, variant) {
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
      burger: `<svg width="22" height="18" viewBox="0 0 22 18"><path d="M20.6 0H1.39995C0.737209 0 0.199951 0.537258 0.199951 1.2V2.4C0.199951 3.06274 0.737209 3.6 1.39995 3.6H20.6C21.2627 3.6 21.8 3.06274 21.8 2.4V1.2C21.8 0.537258 21.2627 0 20.6 0Z" /><path d="M20.6 7.2H1.39995C0.737209 7.2 0.199951 7.73726 0.199951 8.4V9.6C0.199951 10.2627 0.737209 10.8 1.39995 10.8H20.6C21.2627 10.8 21.8 10.2627 21.8 9.6V8.4C21.8 7.73726 21.2627 7.2 20.6 7.2Z" /><path d="M20.6 14.4H1.39995C0.737209 14.4 0.199951 14.9373 0.199951 15.6V16.8C0.199951 17.4627 0.737209 18 1.39995 18H20.6C21.2627 18 21.8 17.4627 21.8 16.8V15.6C21.8 14.9373 21.2627 14.4 20.6 14.4Z"/></svg>`,
      save: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M4.7,24.1h14.7c2.4,0,4.4-2,4.4-4.4V7.7c0-1-0.4-1.9-1.1-2.6l-3.5-3.5c-0.7-0.7-1.6-1.1-2.6-1.1H4.7 c-2.4,0-4.4,2-4.4,4.4v14.7C0.3,22.1,2.2,24.1,4.7,24.1L4.7,24.1z M3.2,5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0h5.9v4.9L9,6.9l0,0 C8.5,6.4,7.8,6.3,7.2,6.7C6.5,7.1,6.3,8,6.7,8.7c0.1,0.1,0.1,0.2,0.2,0.2l2.2,2.2l0,0c1.6,1.6,4.2,1.6,5.8,0c0,0,0,0,0,0l2.2-2.2 l0,0c0.6-0.6,0.6-1.5,0-2.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.6-0.4-1.4-0.3-1.9,0.2l-1.5,1.5V3.5h3.1c0.2,0,0.4,0.1,0.5,0.2l3.5,3.5 c0.1,0.1,0.2,0.3,0.2,0.5v11.9c0,0.8-0.7,1.5-1.5,1.5c0,0,0,0,0,0H4.7c-0.8,0-1.5-0.7-1.5-1.5c0,0,0,0,0,0V5z"/> <path d="M8,18.2H16c0.8,0,1.4-0.7,1.4-1.5c0-0.8-0.6-1.4-1.4-1.4H8c-0.8,0-1.4,0.7-1.4,1.5 C6.6,17.5,7.2,18.2,8,18.2z"/> </svg>`,
      load: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17.3px" height="17.8px" viewBox="0 0 17.3 17.8" style="overflow:visible;enable-background:new 0 0 17.3 17.8;" xml:space="preserve"><path d="M8.6,0C8,0,7.5,0.5,7.5,1.2l0,0v8.2L6,7.9C5.6,7.4,4.9,7.4,4.4,7.8C3.9,8.2,3.9,8.9,4.3,9.4c0,0,0,0,0,0 l2.5,2.5l0,0c1,1,2.6,1,3.6,0c0,0,0,0,0,0l2.4-2.4c0.5-0.4,0.5-1.1,0.1-1.6c-0.4-0.5-1.2-0.5-1.6-0.1c0,0,0,0,0,0L9.8,9.3V1.2 C9.8,0.5,9.3,0,8.6,0L8.6,0L8.6,0z"/><path d="M17.3,12.7c0-0.6-0.5-1.2-1.1-1.2c-0.6,0-1.2,0.5-1.2,1.1c0,0,0,0.1,0,0.1v1.7l0,0 c0,0.6-0.5,1.2-1.2,1.2l0,0H3.5c-0.6,0-1.2-0.5-1.2-1.2l0,0v-1.7c0-0.6-0.5-1.2-1.1-1.2c-0.6,0-1.2,0.5-1.2,1.1c0,0,0,0.1,0,0.1v1.7 l0,0c0,1.9,1.5,3.5,3.5,3.5l0,0h10.4c1.9,0,3.5-1.5,3.5-3.5l0,0L17.3,12.7z"/></svg>`,
      eye: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M12,6.1c-4.1,0-7.7,2.2-10.4,5.8c-0.2,0.3-0.2,0.7,0,1c2.7,3.6,6.4,5.8,10.4,5.8s7.7-2.2,10.4-5.8 c0.2-0.3,0.2-0.7,0-1C19.7,8.3,16.1,6.1,12,6.1z M12.3,16.9c-2.5,0.2-4.6-1.7-4.7-4.2s1.7-4.6,4.2-4.7c2.5-0.2,4.6,1.7,4.7,4.2 c0,0.2,0,0.4,0,0.6C16.3,14.9,14.5,16.7,12.3,16.9z M12.2,14.8c-1.3,0.1-2.5-0.9-2.5-2.2c-0.1-1.3,0.9-2.5,2.2-2.5 c1.3-0.1,2.5,0.9,2.5,2.2c0,0.1,0,0.2,0,0.3C14.3,13.8,13.4,14.7,12.2,14.8L12.2,14.8z"/></svg>`,
      sun: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M18.3,12c0,3.5-2.8,6.3-6.3,6.3S5.7,15.5,5.7,12c0-3.5,2.8-6.3,6.3-6.3C15.5,5.7,18.3,8.5,18.3,12L18.3,12" /> <path d="M12.9,3.9V1.2c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0,0,0,0,0v2.7c0,0.5,0.4,0.9,0.9,0.9 C12.5,4.8,12.9,4.4,12.9,3.9C12.9,3.9,12.9,3.9,12.9,3.9z"/> <path d="M12.9,22.8v-2.7c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0,0,0,0,0v2.7c0,0.5,0.4,0.9,0.9,0.9 C12.5,23.7,12.9,23.3,12.9,22.8z"/> <path id="Path_41477" d="M22.8,11.1h-2.7c-0.5,0-0.9,0.4-0.9,0.9c0,0.5,0.4,0.9,0.9,0.9c0,0,0,0,0,0h2.7c0.5,0,0.9-0.4,0.9-0.9 C23.7,11.5,23.3,11.1,22.8,11.1z"/><path d="M1.2,12.9h2.7c0.5,0,0.9-0.4,0.9-0.9c0-0.5-0.4-0.9-0.9-0.9c0,0,0,0,0,0H1.2c-0.5,0-0.9,0.4-0.9,0.9 C0.3,12.5,0.7,12.9,1.2,12.9C1.2,12.9,1.2,12.9,1.2,12.9z"/><path d="M5,3.7c-0.4-0.3-0.9-0.3-1.3,0C3.4,4.1,3.4,4.7,3.7,5l1.9,1.9c0.4,0.3,0.9,0.3,1.3,0c0.3-0.3,0.3-0.9,0-1.2 L5,3.7z"/> <path id="Path_41480" d="M20.3,19l-1.9-1.9c-0.4-0.3-0.9-0.3-1.3,0c-0.3,0.3-0.3,0.9,0,1.2l1.9,1.9c0.4,0.3,0.9,0.3,1.3,0 C20.6,19.9,20.6,19.3,20.3,19L20.3,19z"/> <path id="Path_41481" d="M20.3,3.7c-0.4-0.4-0.9-0.4-1.3,0l-1.9,1.9c-0.4,0.3-0.4,0.9,0,1.3c0.3,0.4,0.9,0.4,1.3,0c0,0,0,0,0,0 L20.3,5C20.6,4.7,20.6,4.1,20.3,3.7z"/><path d="M3.7,20.3c0.4,0.4,0.9,0.4,1.3,0l1.9-1.9c0.3-0.4,0.3-0.9,0-1.3c-0.3-0.3-0.9-0.3-1.2,0L3.7,19 C3.4,19.3,3.4,19.9,3.7,20.3z"/></svg>`,
      moon: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M22.2,16.6c-1.7,3-4.7,5.1-8.1,5.5c-0.5,0.1-1,0.1-1.5,0.1c-6.1,0-11-5-10.9-11.1 c0-3.7,1.9-7.2,5.1-9.2c0.4-0.2,0.9-0.1,1.1,0.3C8,2.4,8,2.7,7.9,3C5.3,7.5,7,13.3,11.5,15.8c1.8,1,3.8,1.4,5.8,1.1 c1.3-0.2,2.6-0.6,3.7-1.4c0.4-0.2,0.9-0.1,1.1,0.2C22.4,16,22.4,16.3,22.2,16.6L22.2,16.6z"/> </svg>`,
    };

    this.skinnerContainer = this.createControlsWrapper();

    this.essenceGroups = {};

    this.uiColors = {
      dark: {
        bg: "#222f3e",
        accent: "#ee5253",
      },
      light: {
        bg: "#fff",
        accent: "#10ac84",
      },
    };

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
          variation: 5,
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
          variation: 5,
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
          variation: 5,
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
          variation: 5,
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

    /* 
        dark 
        {
        bg: 0,
        bgHov: 4
        bg2: 6
        bg2Hov: 10
        bg3: 14
        bg3Hov: 18
        }

        light 
        {
        bg: 0,
        bgHov: 5
        bg2: 7
        bg2Hov: 11
        bg3: 15
        bg3Hov: 19
        }
        */

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

  generateBackgrounds(essence) {
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

    if (this.variant === "casino") {
      /* 
        dark 
        {
        bg: 0,
        bgHov: 4
        bg2: 6
        bg2Hov: 10
        bg3: 14
        bg3Hov: 18
        }

        light 
        {
        bg: 0,
        bgHov: 5
        bg2: 7
        bg2Hov: 11
        bg3: 15
        bg3Hov: 19
        }
        */

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
    }

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
      let mixTint = _isDark ? "#fff" : "#000";
      this.skin[`${_vb.name}Shadow`] = tinycolor
        .mix(mixTint, this.skin[_vb.nameBg], 60)
        .setAlpha(this.defaults.alpha.bg)
        .toRgbString();
      this.skin[`${_vb.name}ShadowFade`] = tinycolor
        .mix(mixTint, this.skin[_vb.nameBg], 60)
        .setAlpha(0)
        .toRgbString();
    }
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
      this.skin[_vb.nameBorder] = this.skin.bodyBg;
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
    this.addUiThemeSwitcher();
    this.updateAllControls();
    this.createDownloadButton();
    this.createCloseButton();
    this.addStringAnim();
    this.cssCb(this.skin);
  }

  destroy() {
    document.body.removeChild(this.overlay);
    document.body.removeChild(this.toolbox);
    document.body.removeChild(this.header);
    document.body.removeChild(this.messageWrapper);
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
      progress += movementY * 0.1;
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

  addUiThemeSwitcher() {
    let _id = "skinner_ui_switcher";
    let switcherWrapper = document.createElement("label");
    switcherWrapper.className = this.classNames.uiSwitch;
    switcherWrapper.for = _id;
    let inp = document.createElement("input");
    inp.id = _id;
    inp.type = "checkbox";
    let lightIco = document.createElement("i");
    lightIco.className = this.classNames.ico;
    lightIco.innerHTML = this.icons.sun;
    let darkIco = document.createElement("i");
    darkIco.className = this.classNames.ico;
    darkIco.innerHTML = this.icons.moon;

    let thumb = document.createElement("span");

    let darkColors = this.uiColors.dark;
    let lightColors = this.uiColors.light;

    inp.addEventListener("change", (e) => {
      let uiTheme = e.currentTarget.checked ? darkColors : lightColors;
      this.updateUiPalette(uiTheme);
    });
    switcherWrapper.appendChild(inp);
    switcherWrapper.appendChild(lightIco);
    switcherWrapper.appendChild(darkIco);
    switcherWrapper.appendChild(thumb);

    this.settingsWrapper.appendChild(switcherWrapper);
  }

  prerogative(name) {
    return name === "body" || name === "accent" ? true : false;
  }

  modifyKey(key, value) {
    let self = this;
    this.skin[key] = value;
    this.generateTheme();
    this.updateAllControls();
    this.cssCb(this.skin);

    var isAccentReadableOnBody = tinycolor.isReadable(
      this.skin["bodyBg"],
      this.skin["accentBg"],
      {}
    );
    console.log(isAccentReadableOnBody);
    if (!isAccentReadableOnBody) {
      self.message(
        "'Accent' color is not readable on 'Body' color try to make it brighter",
        true
      );
      let timeout = null;
      if (!timeout) {
        timeout = window.setTimeout(() => {
          self.message("", false);
          clearTimeout(timeout);
        }, 3000);
      }
    }
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
          let picker = this.createPickerAndTrigger(
            e.target.parentElement,
            this.skin[_vd.nameBg]
          );
          picker.show();
          picker.on("change", (color, source, instance) => {
            this.modifyKey(_vd.nameBg, color.toHEXA().toString());
          });
          picker.on("hide", (instance) => {
            instance.destroyAndRemove();
          });
        },
        (e) => {
          let picker = this.createPickerAndTrigger(
            e.target.parentElement,
            this.skin[_vd.nameBg_g]
          );
          picker.show();
          picker.on("change", (color, source, instance) => {
            this.modifyKey(_vd.nameBg_g, color.toHEXA().toString());
          });
          picker.on("hide", (instance) => {
            instance.destroyAndRemove();
          });
        },
        (e) => {
          this.modifyKey(_vd.isDark, e.target.checked);
        },
        (e) => {
          this.modifyKey(_vd.isCustomTxt, e.target.checked);
        },
        (e) => {
          let picker = this.createPickerAndTrigger(
            e.target.parentElement,
            this.skin[_vd.nameTxt]
          );
          picker.show();
          picker.on("change", (color, source, instance) => {
            this.modifyKey(_vd.nameTxt, color.toHEXA().toString());
          });
          picker.on("hide", (instance) => {
            instance.destroyAndRemove();
          });
        },
        (e) => {
          this.modifyKey(_vd.isCustomAccent, e.target.checked);
        },
        (e) => {
          let picker = this.createPickerAndTrigger(
            e.target.parentElement,
            this.skin[_vd.nameAccent]
          );
          picker.show();
          picker.on("change", (color, source, instance) => {
            this.modifyKey(_vd.nameAccent, color.toHEXA().toString());
          });
          picker.on("hide", (instance) => {
            instance.destroyAndRemove();
          });
        },
        (e) => {
          this.modifyKey(_vd.isCustomBorder, e.target.checked);
        },
        (e) => {
          let picker = this.createPickerAndTrigger(
            e.target.parentElement,
            this.skin[_vd.nameBorder]
          );
          picker.show();
          picker.on("change", (color, source, instance) => {
            this.modifyKey(_vd.nameBorder, color.toHEXA().toString());
          });
          picker.on("hide", (instance) => {
            instance.destroyAndRemove();
          });
        },
        (e) => {
          this.modifyKey(_vd.nameRadius, e.target.value);
        },
        _hiddenControlsArray,
      ]);
    }
  }

  toggleUi() {
    document.body.classList.toggle("nik_hide_ui");
  }

  createControlsWrapper() {
    const skinnerRoot = this.skinnerRoot;
    const skinnerUITogglerWrapper = document.createElement("div");
    skinnerUITogglerWrapper.className = "skinner_ui_toggler_wrapper";
    const skinnerUITogglerLabel = document.createElement("label");
    skinnerUITogglerLabel.id = "skinner_ui_toggler";
    const skinnerUITogglerImitator = document.createElement("i");
    skinnerUITogglerImitator.className = this.classNames.ico;
    skinnerUITogglerImitator.innerHTML = this.icons.eye;
    this.skinnerUIToggler = document.createElement("input");
    this.skinnerUIToggler.type = "checkbox";
    this.skinnerUIToggler.id = "skinner_ui_toggler";

    skinnerUITogglerWrapper.appendChild(skinnerUITogglerLabel);
    skinnerUITogglerLabel.appendChild(this.skinnerUIToggler);

    skinnerUITogglerLabel.appendChild(skinnerUITogglerImitator);
    this.header.appendChild(skinnerUITogglerWrapper);

    this.skinnerUIToggler.addEventListener("change", this.toggleUi);
    this.overlay = document.createElement("div");
    this.overlay.id = "skinner_overlay";
    skinnerRoot.appendChild(this.overlay);
    let toolbox = document.createElement("div");
    toolbox.className = "skinner_toolbox";
    let toolboxWrapper = document.createElement("div");
    toolboxWrapper.className = "skinner_toolbox_wrapper";
    let main = document.createElement("div");
    main.className = "nik_skinner_control_wrapper nik_skinner_scrollbar";
    let header = document.createElement("div");
    header.className = "nik_skinner_header_controls";
    this.toolbox = toolbox;
    toolbox.appendChild(toolboxWrapper);

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

    return btn;
  }

  createDownloadBtn(name, className, number) {
    let _dn = "download " + name;
    let i = document.createElement("i");
    i.className = "dg_icon_24_download";
    let s = document.createElement("span");
    s.innerText = "download css";
    s.className = "";
    let btn = document.createElement("button");
    btn.className = `skinner_btn ${className}`;
    btn.appendChild(i);
    btn.appendChild(s);
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

    let saveConfigBtn = this.createBtn("", "skinner_btn-icon");
    let saveIcoWrapper = document.createElement("i");
    saveIcoWrapper.className = "dg_icon_24_copy";
    saveConfigBtn.appendChild(saveIcoWrapper);

    let loadConfigInput = document.createElement("textarea");
    loadConfigInput.spellcheck = false;
    loadConfigInput.placeholder = "enter copied config";
    loadConfigInput.className = "nik_skinner_input nik_skinner_scrollbar";

    let loadConfigInputWrapper = document.createElement("div");
    loadConfigInputWrapper.className = "nik_skinner_input_wrapper";

    let loadConfigButton = this.createBtn("", "skinner_btn-icon");
    let loadIcoWrapper = document.createElement("i");
    loadIcoWrapper.className = "dg_icon_reload";
    loadConfigButton.appendChild(loadIcoWrapper);

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
        this.createDownloadBtn(
          name2,
          `${this.classNames.btn50} skinner_btn-accent`,
          2
        )
      );
    }

    this.messageWrapper = document.createElement("div");
    this.messageWrapper.className = "nik_skinner_message hide";
    document.body.appendChild(this.messageWrapper);
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

  createCloseButton() {
    this.toolBox = document.querySelector(".skinner_toolbox");
    this.closeBtn = document.createElement("button");
    let arrow = document.createElement("div");
    this.closeBtn.className = "skinner_toolbox_toggler";
    arrow.className = "dg_icon_angle_bottom";

    this.closeBtn.addEventListener("click", () => {
      this.toolBox.classList.toggle("skinner_toolbox-hide");
      arrow.classList.toggle("skinner_ico_arrow-rotated");
    });
    this.closeBtn.appendChild(arrow);
    this.toolBox.appendChild(this.closeBtn);
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
    isEnabledChb.addEventListener("change", function (e) {
      checkboxCallback(e);
      t.modifyKey(
        verbalData.nameBg,
        tinycolor(t[verbalData.nameBg].picker.style.background).toHexString()
      );
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
      let n = label.charAt(0).toUpperCase() + label.slice(1);

      let vb = this.verbalData(n);

      let tintsArr = [
        {
          name: vb.nameBg,
          val: this.skin[verbalData.nameBg],
        },
        {
          name: vb.nameBg2,
          val: this.skin[verbalData.nameBg2],
        },
        {
          name: vb.nameBg3,
          val: this.skin[verbalData.nameBg3],
        },
      ];
      let chb = this.createCheckBox(label + "dark", "variant_tone", tintsArr);
      isDarkChb = chb.checkbox;

      isDarkChb.addEventListener("change", isDarkCallback);
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
      isGradientEnabledChb.addEventListener("change", gradientCallback);
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
    }

    let anglePicker;
    {
      anglePicker = new AnglePicker(isGradientEnabledControl);
      anglePicker.eventTarget.addEventListener(
        "angleChange",
        angleChangeCallback
      );
    }

    //custom text

    let isCustomTextControl, isCustomTextChb, isCustomTextPckr;
    {
      isCustomTextControl = this.createDiv(
        "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small state_delay_3"
      );
      let chb = this.createCheckBox(label + "_text");
      isCustomTextChb = chb.checkbox;
      isCustomTextChb.addEventListener("change", isCustomTxtCb);
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
    }

    //custom accent

    let customAccentControl, customAccentChb, customAccentPckr;
    if (isCustomAccentCb && customAccentCb) {
      customAccentControl = this.createDiv(
        "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small state_delay_4"
      );
      let chb = this.createCheckBox(label + "_custom_accent");
      customAccentChb = chb.checkbox;
      customAccentChb.addEventListener("change", isCustomAccentCb);
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
    }

    //custom border

    let borderControl, borderChb, borderPckr;
    if (isCustomBorderCb && customBorderCb) {
      borderControl = this.createDiv(
        "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small state_delay_5"
      );
      let chb = this.createCheckBox(label + "_border");
      borderChb = chb.checkbox;
      borderChb.addEventListener("change", isCustomBorderCb);
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
      radiusInput.addEventListener("input", function (e) {
        radiusAmount.value = e.target.value;
        customRadiusCb(e);
      });

      radiusAmount.addEventListener("input", function (e) {
        // Update range input with the number input's value
        radiusInput.value = e.target.value;
        customRadiusCb(e);
      });
      ddContent.appendChild(radiusControl);
      radiusControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.radius)
      );

      radiusControl.appendChild(radiusInput);
      radiusControl.appendChild(radiusAmount);
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
    icon.className = "skinner_custom_chb dg_icon_check " + (_cn ? _cn : "");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = _id;

    label.appendChild(checkbox);
    label.appendChild(icon);

    if (tints && tints.length > 0) {
      tints.forEach((t, i) => {
        label.style.setProperty(`--bg${i + 1}`, `var(--cw${t.name})`);
      });
    }

    return {
      label: label,
      checkbox: checkbox,
    };
  }

  createPicker(el, defaultColor, callback) {
    let picker = Pickr.create({
      el: el,
      theme: "classic",
      comparison: false,
      default: defaultColor,
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

    picker.on("change", (color, source, instance) => {
      callback(color);
    });
    picker.on("show", this.showOverlay);
    picker.on("hide", this.hideOverlay);

    return picker;
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

  generateUiPalette(colors) {
    //this.uiColors.bg = tinycolor(this.uiColors.bg).darken(80).desaturate(60).toString();
    let step = 4;

    let bg = colors.bg;
    let islight = tinycolor(bg).isLight;

    let bg2 = islight
      ? tinycolor(bg).darken(step).toHexString()
      : tinycolor(bg).lighten(step).toHexString();
    let bg3 = islight
      ? tinycolor(bg2).darken(step).toHexString()
      : tinycolor(bg2).lighten(step).toHexString();
    let bg4 = islight
      ? tinycolor(bg3).darken(step).toHexString()
      : tinycolor(bg3).lighten(step).toHexString();
    let bg5 = islight
      ? tinycolor(bg4).darken(step).toHexString()
      : tinycolor(bg4).lighten(step).toHexString();
    let bg6 = islight
      ? tinycolor(bg5).darken(step).toHexString()
      : tinycolor(bg5).lighten(step).toHexString();

    let accent = tinycolor(colors.accent).lighten(step).toHexString();
    let accent2 = tinycolor(accent).lighten(step).toHexString();
    let accent3 = tinycolor(accent2).lighten(step).toHexString();
    let accentL = tinycolor(accent)
      .lighten(step * 2)
      .toHexString();
    let accentD = tinycolor(accent)
      .darken(step * 2)
      .toHexString();

    let txt = tinycolor(guessVisibleColor(bg)).setAlpha(0.8).toRgbString();
    let txt2 = tinycolor(guessVisibleColor(bg)).setAlpha(0.7).toRgbString();
    let accentTxt = tinycolor(guessVisibleColor(accent))
      .setAlpha(0.8)
      .toRgbString();

    let shadow = tinycolor(bg).setAlpha(0.3).toRgbString();

    document.documentElement.style.setProperty("--skinnerBg", bg);
    document.documentElement.style.setProperty("--skinnerBg2", bg2);
    document.documentElement.style.setProperty("--skinnerBg3", bg3);
    document.documentElement.style.setProperty("--skinnerBg4", bg4);
    document.documentElement.style.setProperty("--skinnerBg5", bg5);
    document.documentElement.style.setProperty("--skinnerBg6", bg6);
    document.documentElement.style.setProperty("--skinnerToolboxBg", bg4);
    document.documentElement.style.setProperty("--skinnerToolboxBg2", bg5);
    document.documentElement.style.setProperty("--skinnerToolboxBg3", bg6);

    document.documentElement.style.setProperty("--skinnerTxt", txt);
    document.documentElement.style.setProperty("--skinnerTxt2", txt2);

    document.documentElement.style.setProperty("--skinnerToolboxTxt", txt);
    document.documentElement.style.setProperty("--shadow", shadow);

    document.documentElement.style.setProperty("--skinnerAccentLight", accentL);
    document.documentElement.style.setProperty("--skinnerAccentDark", accentD);

    document.documentElement.style.setProperty("--skinnerAccent", accent);
    document.documentElement.style.setProperty("--skinnerAccent2", accent2);
    document.documentElement.style.setProperty(
      "--skinnerToolboxAccent",
      accent
    );
    document.documentElement.style.setProperty(
      "--skinnerToolboxAccentHover",
      accent2
    );

    document.documentElement.style.setProperty("--skinnerAccentTxt", accentTxt);
  }

  addCss() {
    const css = `
        :root{
        --sk_zind: 1000000;
        --sk_zind2: calc(var(--sk_zind) + 10);
        --skinnerHeaderHeight: 32px;
        --skinnerHeaderTogglerSize: 50px;
        --skinnerToolboxHeight: 24px;
        --skinnerToolboxFooterHeight: 48px;
        --skinnerBtnHeight: 32px;
        --skinnerToolboxCollapserSize: 42px;
        --control-picker-size: 24px;
        --control-picker-size-border: calc(var(--control-picker-size) - 4px);
        --controls-row-height: 32px;
        --controls-ui-gap: 6px;
        --controls-ui-pad-x: 6px;
        --controls-ui-pad-y: 6px;
        }

        .sk_path_string_root{
        height: 40px;
      position: relative;
      width: 100%;
      position: absolute;
      top: 5px;
        }

        .sk_path_string_box{
        width: 100%;
        height: 40px;
        position: relative;
        }

        .sk_path_string_root > svg{
        position: absolute;
        height: 40px;
        width: 100%;
        top: 0px;
        stroke: var(--skinnerAccent);
        stroke-width: 1px;
        fill: none;
        }

.pickr {
    position: relative;
    overflow: visible;
    transform: translateY(0)
}

.pickr * {
    box-sizing: border-box;
    outline: none;
    border: none;
    -webkit-appearance: none
}

.pickr .pcr-button {
    position: relative;
    height: 35px;
    width: 35px;
    padding: .5em;
    cursor: pointer;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
    border-radius: 2px;
    overflow:hidden;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="%2342445A" stroke-width="5px" stroke-linecap="round"><path d="M45,45L5,5"></path><path d="M45,5L5,45"></path></svg>') no-repeat 50%;
    background-size: 0;
    transition: all .3s
}

.pickr .pcr-button:before {
    /*background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');*/
    background-size: .5em;
    z-index: -1;
    z-index: auto
}

.pickr .pcr-button:after, .pickr .pcr-button:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: .15em
}

.pickr .pcr-button:after {
    transition: background .3s;
    background: var(--pcr-color)
}

.pickr .pcr-button.clear {
    background-size: 70%
}

.pickr .pcr-button.clear:before {
    opacity: 0
}

.pickr .pcr-button.clear:focus {
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px var(--pcr-color)
}

.pickr .pcr-button.disabled {
    cursor: not-allowed
}

.pcr-app *, .pickr * {
    box-sizing: border-box;
    outline: none;
    border: none;
    -webkit-appearance: none
}

.pcr-app button.pcr-active, .pcr-app button:focus, .pcr-app input.pcr-active, .pcr-app input:focus, .pickr button.pcr-active, .pickr button:focus, .pickr input.pcr-active, .pickr input:focus {
    /*box-shadow: 0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px var(--pcr-color)*/
}

.pcr-app .pcr-palette, .pcr-app .pcr-slider, .pickr .pcr-palette, .pickr .pcr-slider {
    transition: box-shadow .3s
}

.pcr-app .pcr-palette:focus, .pcr-app .pcr-slider:focus, .pickr .pcr-palette:focus, .pickr .pcr-slider:focus {
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px rgba(0,0,0,.25)
}

.pcr-app {
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 10000;
    border-radius: .1em;
    background: #fff;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s,visibility 0s .3s;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
    box-shadow: 0 .15em 1.5em 0 rgba(0,0,0,.1),0 0 1em 0 rgba(0,0,0,.03);
    left: 0;
    top: 0
}

.pcr-app.visible {
    transition: opacity .3s;
    visibility: visible;
    opacity: 1
}

.pcr-app .pcr-swatches {
    display: flex;
    flex-wrap: wrap;
    margin-top: .75em
}

.pcr-app .pcr-swatches.pcr-last {
    margin: 0
}

@supports (display:grid) {
    .pcr-app .pcr-swatches {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fit,1.75em)
    }
}

.pcr-app .pcr-swatches > button {
    font-size: 1em;
    position: relative;
    width: calc(1.75em - 5px);
    height: calc(1.75em - 5px);
    border-radius: .15em;
    cursor: pointer;
    margin: 2.5px;
    flex-shrink: 0;
    justify-self: center;
    transition: all .15s;
    overflow: hidden;
    background: transparent;
    z-index: 1
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
    border-radius: .15em;
    z-index: -1
}

.pcr-app .pcr-swatches > button:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--pcr-color);
    border: 1px solid rgba(0,0,0,.05);
    border-radius: .15em;
    box-sizing: border-box
}

.pcr-app .pcr-swatches > button:hover {
    filter: brightness(1.05)
}

.pcr-app .pcr-swatches > button:not(.pcr-active) {
    box-shadow: none
}

.pcr-app .pcr-interaction {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 -.2em
}

.pcr-app .pcr-interaction > * {
    margin: 0 .2em
}

.pcr-app .pcr-interaction input {
    letter-spacing: .07em;
    font-size: .75em;
    text-align: center;
    cursor: pointer;
    color: #75797e;
    background: #f1f3f4;
    border-radius: .15em;
    transition: all .15s;
    padding: .45em .5em;
    margin-top: .75em
}

.pcr-app .pcr-interaction input:hover {
    filter: brightness(.975)
}

.pcr-app .pcr-interaction input:focus {
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px rgba(66,133,244,.75)
}

.pcr-app .pcr-interaction .pcr-result {
    color: #75797e;
    text-align: left;
    flex: 1 1 8em;
    min-width: 8em;
    transition: all .2s;
    border-radius: .15em;
    background: #f1f3f4;
    cursor: text
}

.pcr-app .pcr-interaction .pcr-result::-moz-selection {
    background: #4285f4;
    color: #fff
}

.pcr-app .pcr-interaction .pcr-result::selection {
    background: #4285f4;
    color: #fff
}

.pcr-app .pcr-interaction .pcr-type.active {
    color: #fff;
    background: #4285f4
}

.pcr-app .pcr-interaction .pcr-cancel, .pcr-app .pcr-interaction .pcr-clear, .pcr-app .pcr-interaction .pcr-save {
    width: auto;
    color: #fff
}

.pcr-app .pcr-interaction .pcr-cancel:hover, .pcr-app .pcr-interaction .pcr-clear:hover, .pcr-app .pcr-interaction .pcr-save:hover {
    filter: brightness(.925)
}

.pcr-app .pcr-interaction .pcr-save {
    background: #4285f4
}

.pcr-app .pcr-interaction .pcr-cancel, .pcr-app .pcr-interaction .pcr-clear {
    background: #f44250
}

.pcr-app .pcr-interaction .pcr-cancel:focus, .pcr-app .pcr-interaction .pcr-clear:focus {
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px rgba(244,66,80,.75)
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
    user-select: none
}

.pcr-app .pcr-selection .pcr-color-chooser, .pcr-app .pcr-selection .pcr-color-opacity, .pcr-app .pcr-selection .pcr-color-palette {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    flex-direction: column;
    cursor: grab;
    cursor: -webkit-grab
}

.pcr-app .pcr-selection .pcr-color-chooser:active, .pcr-app .pcr-selection .pcr-color-opacity:active, .pcr-app .pcr-selection .pcr-color-palette:active {
    cursor: grabbing;
    cursor: -webkit-grabbing
}

.pcr-app[data-theme=classic] {
    width: 28.5em;
    max-width: 95vw;
    padding: .8em
}

.pcr-app[data-theme=classic] .pcr-selection {
    display: flex;
    justify-content: space-between;
    flex-grow: 1
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-preview {
    position: relative;
    z-index: 1;
    width: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: .75em
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-preview:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: .5em;
    border-radius: .15em;
    z-index: -1
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-preview .pcr-last-color {
    cursor: pointer;
    transition: background-color .3s,box-shadow .3s;
    border-radius: .15em .15em 0 0;
    z-index: 2
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-preview .pcr-current-color {
    border-radius: 0 0 .15em .15em
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-preview .pcr-current-color, .pcr-app[data-theme=classic] .pcr-selection .pcr-color-preview .pcr-last-color {
    background: var(--pcr-color);
    width: 100%;
    height: 50%
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-palette {
    width: 100%;
    height: 8em;
    z-index: 1
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-palette .pcr-palette {
    flex-grow: 1;
    border-radius: .15em
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-palette .pcr-palette:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: .5em;
    border-radius: .15em;
    z-index: -1
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-chooser, .pcr-app[data-theme=classic] .pcr-selection .pcr-color-opacity {
    margin-left: .75em
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-chooser .pcr-picker, .pcr-app[data-theme=classic] .pcr-selection .pcr-color-opacity .pcr-picker {
    left: 50%;
    transform: translateX(-50%)
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-chooser .pcr-slider, .pcr-app[data-theme=classic] .pcr-selection .pcr-color-opacity .pcr-slider {
    width: 8px;
    flex-grow: 1;
    border-radius: 50em
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-chooser .pcr-slider {
    background: linear-gradient(180deg,red,#ff0,#0f0,#0ff,#00f,#f0f,red)
}

.pcr-app[data-theme=classic] .pcr-selection .pcr-color-opacity .pcr-slider {
    background: linear-gradient(180deg,transparent,#000),url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: 100%,50%
}


html, body {
    height: 100%;
    margin: 0;
}

* {
    box-sizing: border-box;
}

@font-face {
    font-family: 'TotoFont';
    src: url('fonts/sportv1/Digitain_Font.eot');
    src: url('fonts/sportv1/Digitain_Font.eot') format('embedded-opentype'), url('fonts/sportv1/Digitain_Font.woff') format('woff'), url('fonts/sportv1/Digitain_Font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.sk_actions_wrapper {
    display: flex;
    align-items: center;
    column-gap: 6px;
    padding: 0 8px;
    height: var(--skinnerToolboxFooterHeight);
    background: var(--skinnerBg2);
    position: absolute;
    border-top: 1px solid var(--skinnerBg);
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.2);
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
    background-color: var(--skinnerBg);
    color: var(--skinnerTxt);
    font-family: 'Roboto', sans-serif;
}

.nik_skinner_mobile_wrapper > iframe {
    /*height: 800px !important;*/
}

.nik_skinner_header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    transform: translateY(0);
    height: var(--skinnerHeaderHeight);
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--skinnerBg);
    color: var(--skinnerTxt);
    border-bottom: 1px solid var(--skinnerAccent);
    transform: translateX(-100%);
    transition: transform 0.6s;
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
    background-color: var(--skinnerBg);
    color: var(--skinnerAccent);
    font-size: 14px;
    padding: 2px 4px;
    border: 1px solid var(--skinnerBg2);
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 1.7px;
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
    background-color: var(--skinnerBg2);
    color: var(--skinnerTxt);
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
        background-color: var(--skinnerAccent);
        color: var(--skinnerAccentTxt);
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
    background-color: var(--skinnerBg);
    color: var(--skinnerTxt);
    border: 1px solid var(--skinnerBg2);
    border-top-color: var(--skinnerAccent);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.pcr-app {
    z-index: var(--sk_zind2);
}

.skinner_toolbox-hide {
       transform: translate(-50%, calc(100% - 24px));
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
    color: var(--skinnerTxt);
    background: inherit;
    position: absolute;
    z-index: 10;
    transition: color 0.5s, transform 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 0;
    right:0;
    top: 0;
}

.color_controls_toggle {
    display: flex;
    justify-content: center;
    border: none;
    outline: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: var(--skinnerToolboxBg);
    color: var(--skinnerToolboxTxt);
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
        color: var(--skinnerToolboxAccent);
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

.skn_controls_row{
border: 1px solid var(--skinnerBg3);
            display: flex;
    padding: 0 var(--controls-ui-pad-x);
    align-items: center;
    column-gap: var(--controls-ui-gap);
    height: var(--controls-row-height);
    background-color: var(--skinnerBg2);
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
        box-shadow: -2px 0px 0 0px var(--skinnerBg4);
    box-shadow: none;
    
        flex-direction: row;
        background-color: var(--skinnerBg);
        flex-wrap: nowrap;
        margin-bottom: 1px;
        align-items: center;
            border-radius: 4px;
            opacity: 0.5;
}

.nik_skinner_control_group.state_active {
    box-shadow: -5px 0px 0 0px var(--skinnerAccent);
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

.nik_skinner_control_group_picker.variant_border{
        display: flex;
    align-items: center;
    justify-content: center;
    
}

.nik_skinner_control_group_picker.variant_border::before{
        content: "";
        background: var(--skinnerBg);
        width: var(--control-picker-size-border);
        height: var(--control-picker-size-border);
        flex-shrink: 0;
}

.nik_skinner_control_group_picker.variant_text{
        display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
        background: var(--bg) !important;
    
}

.nik_skinner_control_group_picker.variant_accent{
        display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    background: var(--bg) !important;
}

.nik_skinner_control_group_picker.variant_text::before{
        content: "T";
        color: var(--Txt);
}

.nik_skinner_control_group_picker.variant_accent::before{
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
    background-color: var(--skinnerBg);
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
    border: 1px solid var(--skinnerBg3);
    text-align: center;
    height: var(--skinnerBtnHeight);
    text-decoration: none;
    background-color: var(--skinnerBg3);
    color: var(--skinnerTxt2);
    display: block;
    transition: all 0.2s;
    text-transform: capitalize;
    font-size: 12px;
    position: relative;
    font-weight: 500;
    padding: 0 12px;
    border-radius: 4px;
    transition: all 0.5s;
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 4px;
}

.skinner_btn-icon{
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--skinnerBg2);
    border: 1px solid var(--skinnerBg3);
    border-top-color: var(--skinnerBg);
    border-bottom-color: var(--skinnerBg6);
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.2);
    color: var(--skinnerTxt2); 
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
    background-color: var(--skinnerToolboxBg3);
    border-color: var(--skinnerToolboxBg2);
    position: relative;
    z-index: 10;
}

.skinner_btn-accent {
    background-color: var(--skinnerAccent);
    border-color: var(--skinnerAccentDark);
    border-top-color: var(--skinnerAccentLight);
    color: var(--skinnerAccentTxt);
    position: relative;
    padding-inline-start: 6px;
}

    .skinner_btn-accent:hover {
    border-color:  var(--skinnerAccent);
        background-color: var(--skinnerAccent2);
        color: var(--skinnerAccentTxt);
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
    color: var(--skinnerTxt2);
    z-index: 10;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom: 1px solid var(--skinnerBg2);
        column-gap: 4px;
}

.nik_skinner_load_config {
    padding: 0 8px;
    height: 30px;
    background-color: var(--skinnerBg3);
    color: var(--skinnerTxt);
    border-radius: 2px;
    border: 1px solid var(--skinnerBg2);
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
        border-color: var(--skinnerAccent);
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
    background: var(--skinnerBg);
    color: var(--skinnerTxt2);
    border-radius: 0px;
    text-align: right;
    border: 0;
    border: 1px solid var(--skinnerBg3);
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
    border: 1px solid var(--skinnerBg3);
    height: var(--controls-row-height);
    align-items: center;
    justify-content: center;
    background-color: var(--skinnerBg2);
    flex-shrink: 0;
    position: relative;
    margin: 0;
    flex-shrink: 0;
    border-radius: 0;
    column-gap: 4px;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.05s cubic-bezier(0.53, 1.14, 0.83, 1.21);
    
    transform: translateY(var(--grp_pos));
}

.nik_skinner_checkbox_wrapper > .pickr{
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

.nik_skinner_control_group_checkbox_wrapper > .nik_skinner_control_group_checkbox_imitator {
    background-image: url('../assets/chb_unchecked.svg');
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


.state_delay_2{
    transition-delay: 0.1s;
}
    .state_delay_3{
    transition-delay: 0.2s;
}
    .state_delay_4{
    transition-delay: 0.3s;
}

.state_delay_5{
    transition-delay: 0.4s;
}


.nik_skinner_control_group_checkbox_wrapper > input:not([disabled]) + .nik_skinner_control_group_checkbox_imitator:hover {
    // transform: scale(1.1);
}

.nik_skinner_control_group_checkbox_wrapper > input:disabled + .nik_skinner_control_group_checkbox_imitator {
    opacity: 0.2;
}

.nik_skinner_control_group_checkbox_wrapper > input:checked + .nik_skinner_control_group_checkbox_imitator {
    background-image: url('../assets/chb_checked.svg');
}

.nik_skinner_control_group_checkbox_wrapper.nik_skinner_control_group_checkbox_wrapper-invert > input:checked + .nik_skinner_control_group_checkbox_imitator {
    background-image: url('../assets/chb_checked_reverse.svg');
}

.nik_skinner_checkbox_wrapper-controls .nik_skinner_control_group_checkbox_wrapper {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
}

/* width */
.nik_skinner_scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

/* Track */
.nik_skinner_scrollbar::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.1);
}

/* Handle */
.nik_skinner_scrollbar::-webkit-scrollbar-thumb {
    background: var(--skinnerBg3);
    border-radius: 2px;
}

    /* Handle on hover */
    .nik_skinner_scrollbar::-webkit-scrollbar-thumb:hover {
        background: var(--skinnerBg3);
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
    /*background-color: rgba(0,0,0,0.2);
    backdrop-filter: blur(2px);*/
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
    background-color: var(--skinnerBg);
    border: 1px solid var(--skinnerBg2);
    border-right: 0;
    color: var(--skinnerTxt);
    border-radius: 5px 0 0 5px;
    box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.314s;
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
input[type=range]:disabled {
    opacity: 0.3;
}

input[type=range] {
    width: calc(100% - 27px);
    margin: 5.8px 0;
    background-color: transparent;
    -webkit-appearance: none;
}

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        background: var(--skinnerTxt);
        border-radius: 0px;
        width: 100%;
        height: 2px;
        cursor: pointer;
    }

    input[type=range]::-webkit-slider-thumb {
        margin-top: -8px;
    width: 8px;
    height: 18px;
    background-color: var(--skinnerBg6);
    border-radius: 2px;
    cursor: pointer;
    -webkit-appearance: none;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: var(--skinnerAccent);
    }

    input[type=range]::-moz-range-track {
        background: var(--skinnerTxt2);
        border: 0.2px solid #010101;
        border-radius: 1.3px;
        width: 100%;
        height: 8.4px;
        cursor: pointer;
    }

    input[type=range]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: var(--skinnerAccent);
        border: 0.2px solid rgba(0, 0, 0, 0);
        border-radius: 18px;
        cursor: pointer;
    }

    input[type=range]::-ms-track {
        background: transparent;
        border-color: transparent;
        border-width: 6.8px 0;
        color: transparent;
        width: 100%;
        height: 8.4px;
        cursor: pointer;
    }

    input[type=range]::-ms-fill-lower {
        background: var(--skinnerTxt2);
        border: 0.2px solid #010101;
        border-radius: 2.6px;
    }

    input[type=range]::-ms-fill-upper {
        background: var(--skinnerAccent);
        border: 0.2px solid #010101;
        border-radius: 2.6px;
    }

    input[type=range]::-ms-thumb {
        width: 20px;
        height: 20px;
        background: var(--skinnerTxt2);
        border: 0.2px solid rgba(0, 0, 0, 0);
        border-radius: 18px;
        cursor: pointer;
        margin-top: 0px;
        /*Needed to keep the Edge thumb centred*/
    }

    input[type=range]:focus::-ms-fill-lower {
        background: var(--skinnerAccent);
    }

    input[type=range]:focus::-ms-fill-upper {
        background: var(--skinnerAccent);
    }
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align:auto) {
    /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
    input[type=range] {
        margin: 0;
        /*Edge starts the margin from the thumb, not the track as other browsers do*/
    }
}

/*checkbox*/
.skinner_custom_chb_label input[type='checkbox'] {
    display: none;
}

:root {
    --chbSize: 20px;
    --chbH: var(--chbSize);
    --wrapperChbSize: 42px;
    --chbSizeBorder: 1px;
    --chbBg: var(--skinnerBg2);
    --activeChbBg: var(--skinnerAccent2);
}

.skinner_custom_chb {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--skinnerBg);
    cursor: pointer;
    border: var(--chbSizeBorder) solid var(--skinnerBg3);
    border-radius: 2px;
    color:  var(--skinnerBg); 
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
    background: linear-gradient(to right, var(--bg1) 0%, var(--bg1) 33.33%, var(--bg2) 33.33%, var(--bg2) 66.66%, var(--bg3) 66.66%, var(--bg3) 100%) !important;
}


/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.skinner_custom_chb_label {
    width: var(--chbSize);
    height: var(--chbH);
    flex-shrink: 0;
    

}


.skinner_custom_chb_label > input[type='checkbox']:checked + .skinner_custom_chb {
    background: var(--skinnerAccent);
    color:  var(--skinnerAccentTxt); 
    border-color: var(--skinnerToolboxAccentHover);
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
    background-color: var(--skinnerBg);
    border-radius: 6px;
    border: 1px solid var(--skinnerTxt3);
}

    .pcr-app .pcr-interaction .pcr-result {
        background-color: var(--skinnerBg2);
        color: var(--skinnerTxt);
        border-radius: 4px;
    }

    .pcr-app[data-theme=classic] {
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
    background-color: var(--skinnerBg);
    color: var(--skinnerTxt2);
    border: 0;
    border-radius: 2px;
    border: 1px solid var(--skinnerBg3);
    outline: 0;
    font-size: 11px;
    text-transform: capitalize;
    display: block;
    cursor: pointer;
    transition: all 0.314s;
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
    background-color: var(--skinnerBg);
    border: 1px solid var(--skinnerAccent);
    color: var(--skinnerTxt2);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    border-radius: 10px;
    z-index: 12;
    padding: 10px;
    box-shadow: 0 1px 9px 3px var(--shadow);
    letter-spacing: 1.3px;
    backdrop-filter: blur(1px);
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
        background: linear-gradient( to right,var(--skinnerBg2),var(--skinnerBg3));
        border-radius: 20px;
        border: 2px solid var(--skinnerBg3);
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
    transform: scale(0.5) translate(-50%, -50%)
}

.skinner_main_wrapper.skinner_main_wrapper-mobile iframe {
    width: 100%;
    transform: none;
}

.skinner_ui_switcher {
    width: 70px;
    background-color: var(--skinnerBg);
    color: var(--skinnerTxt);
    border: 2px solid var(--skinnerAccent);
    border-radius: 35px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

    .skinner_ui_switcher > i {
        display: relative;
        z-index: 10;
        transition: color 0.3s;
    }

    .skinner_ui_switcher > input {
        display: none;
    }

    .skinner_ui_switcher > span {
        content: '';
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: var(--skinnerAccent);
        position: absolute;
        left: -1px;
        top: -1px;
        transform: translateX(0);
        transition: background-color 0.3s, transform 0.3s;
    }

    .skinner_ui_switcher > input:checked ~ span {
        transform: translateX(32px);
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
    background: var(--skinnerBg);
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

.cms_btn {
    appearance: none;
    border: 0;
    outline: 0;
    min-width: 80px;
    height: 36px;
    border-radius: 4px;
    background: var(--skinnerAccent);
    color: var(--skinnerAccentTxt);
    font-size: 14px;
    font-weight: 500;
    transition: all 0.314s;
    padding: 10px 25px;
}

    .cms_btn:hover {
        background: var(--skinnerAccent2);
        color: var(--skinnerAccentTxt);
    }

.skinner_disabled {
    cursor: not-allowed;
    opacity: 0.2;
    pointer-events: none;
    
}

.skinner_picker_trigger_hide{
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

        `;
    const skinnerUIStyles = document.createElement("style");
    skinnerUIStyles.innerHTML = css;
    this.skinnerRoot.appendChild(skinnerUIStyles);
    const fontURL = `https://cdn-sp.totogaming.am/assets/fonts/sport-ui-icons/style.css?`;
    const iconsLink = document.createElement("link");
    iconsLink.rel = "stylesheet";
    iconsLink.href = fontURL;
    document.head.appendChild(iconsLink);
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
      color: "#FF8600",
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

export default function init() {
  window.SkinnerInstance = new Skinner(
    createCss,
    colorsCasweb,
    null,
    null,
    "casino"
  );
  window.SkinnerInstance.init();
}
