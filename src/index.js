import { Skinner } from "./skinner.js";
// const target = document.getElementsByTagName("sport-latino-view")[0].shadowRoot;
// const target = document.getElementsByTagName("sport-european-view")[0].shadowRoot;
// const target = document.getElementsByTagName("sport-root")[0].shadowRoot;
// const target = document.getElementsByTagName("sport-modern-view")[0].shadowRoot;

// import ViewDemoEuropean from "./views/european.js";

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

const configOrderSport = [
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

function verbalData(name) {
  let data = {};
  data.name = name;
  data.nameBg = data.name + "Bg";
  `.demo_event_stake[data-sk="odd"]`;
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

  return data;
}

function createCssStringSport(skin) {
  let styles = ``;
  let variables = ``;

  configOrderSport.forEach((c, i) => {
    let essence = verbalData(c.name);

    styles += skin[essence.style]
      ? `${essence.selector.repeat(4)} {
      ${skin[essence.style]}\n
    }\n`
      : "";

    variables += `    --${essence.nameG}: ${skin[essence.nameG]};\n`;
    variables += `    --${essence.nameBg}: ${skin[essence.nameBg]};\n`;
    variables += `    --${essence.nameBg2}: ${skin[essence.nameBg2]};\n`;
    variables += `    --${essence.nameBg3}: ${skin[essence.nameBg3]};\n`;
    variables += `    --${essence.nameBgHov}: ${skin[essence.nameBgHov]};\n`;
    variables += `    --${essence.nameBg2Hov}: ${skin[essence.nameBg2Hov]};\n`;
    variables += `    --${essence.nameBg3Hov}: ${skin[essence.nameBg3Hov]};\n`;
    variables += `    --${essence.nameTxt}: ${skin[essence.nameTxt]};\n`;
    variables += `    --${essence.nameTxt2}: ${skin[essence.nameTxt2]};\n`;
    variables += `    --${essence.nameTxt3}: ${skin[essence.nameTxt3]};\n`;
    variables += `    --${essence.nameAccent}: ${skin[essence.nameAccent]};\n`;
    variables += `    --${essence.nameAccentTxt}: ${
      skin[essence.nameAccentTxt]
    };\n`;
    variables += `    --${essence.nameRGBA}: ${skin[essence.nameRGBA]};\n`;
    variables += `    --${essence.nameRGBA2}: ${skin[essence.nameRGBA2]};\n`;
    variables += `    --${essence.nameRGBA3}: ${skin[essence.nameRGBA3]};\n`;
    variables += `    --${essence.name}Shadow: ${
      skin[`${essence.name}Shadow`]
    };\n`;
    variables += `    --${essence.name}ShadowFade: ${
      skin[`${essence.name}ShadowFade`]
    };\n`;
    variables += `    --${essence.nameRadius}: ${
      skin[essence.nameRadius]
    }px;\n`;
    variables += `    --${essence.nameBorder}: ${skin[essence.nameBorder]};`;

    if (i !== configOrderSport.length - 1) {
      variables += `\n`;
    }
  });

  return { styles, variables };
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
      res += `\n`;
    }
  });

  return res;
}
let dd = "";

function createCss(c) {
  const rootSel = false && "#sport-modern-view";

  let css = `
${createCssStringSport(c).styles}
${rootSel ? rootSel : ":host:host:host,:root:root:root"} {
${createCssStringSport(c).variables}
}`;

  let results = {
    css: css,
    name: "tst",
  };

  setOrUpdateIframeCss(css, target);
  dd = results.css;
  return results;
}

function setOrUpdateIframeCss(cssStyle, target) {
  var styleId = "css-as-test-stylesheet";
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
  styleElement.innerHTML = cssStyle;
}

// const demo = new ViewDemoEuropean();
// demo.init();
const target = document.getElementsByTagName("sport-latino-view")[0].shadowRoot;
// const target = document.querySelector(".demo_body").parentElement;
// const target = document.body;

const configTree = {
  body: {
    Background: {
      color: "#111111",
    },
    children: {
      dominant: {
        children: {
          buttonSecondary: {},
          navbar: {},
          header: {
            children: {
              subHeader: {},
              collapse: {},
              marketHeader: {},
            },
          },
          event: {
            children: {
              eventLive: {},
            },
          },
          showMore: {},
          tabActive: {
            children: {
              tab: {
                children: {
                  tabSecondaryActive: {},
                },
              },
            },
          },
          menu_1: {
            children: {
              menu_2: {
                children: {
                  menu_3: {},
                },
              },
            },
          },
          input: {
            children: {
              inputSecondary: {},
            },
          },
          filter: {},
          tooltip: {},
          tmLogo: {},
        },
      },
      slider: {},
      odd: {},
      modal: {},
    },
  },
  accent: {
    children: {
      button: {},
      oddActive: {},
    },
  },
};

const starterConfig = {
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
};

const config = {
  body: {
    Background: {
      color: "#1a1a1a",
    },
    borderRadius: 8,
  },
  accent: {
    Background: {
      color: "#ffb800",
    },
    borderRadius: 8,
  },
};

window.SkinnerInstance = new Skinner(config, null, target);
window.SkinnerInstance.init();
