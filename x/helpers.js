const configOrder = [
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
    inherits: ["dominant", "body"],
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

function createCssString(skin) {
  let res = ``;

  configOrder.forEach((c, i) => {
    let essence = verbalData(c.name);

    res += `    --${essence.nameG}: ${skin[essence.nameG]};\n`;
    res += `    --${essence.nameBg}: ${skin[essence.nameBg]};\n`;
    res += `    --${essence.nameBg2}: ${skin[essence.nameBg2]};\n`;
    res += `    --${essence.nameBg3}: ${skin[essence.nameBg3]};\n`;
    res += `    --${essence.nameBgHov}: ${skin[essence.nameBgHov]};\n`;
    res += `    --${essence.nameBg2Hov}: ${skin[essence.nameBg2Hov]};\n`;
    res += `    --${essence.nameBg3Hov}: ${skin[essence.nameBg3Hov]};\n`;
    res += `    --${essence.nameTxt}: ${skin[essence.nameTxt]};\n`;
    res += `    --${essence.nameTxt2}: ${skin[essence.nameTxt2]};\n`;
    res += `    --${essence.nameTxt3}: ${skin[essence.nameTxt3]};\n`;
    res += `    --${essence.nameAccent}: ${skin[essence.nameAccent]};\n`;
    res += `    --${essence.nameAccentTxt}: ${skin[essence.nameAccentTxt]};\n`;
    res += `    --${essence.nameRGBA}: ${skin[essence.nameRGBA]};\n`;
    res += `    --${essence.nameRGBA2}: ${skin[essence.nameRGBA2]};\n`;
    res += `    --${essence.nameRGBA3}: ${skin[essence.nameRGBA3]};\n`;
    res += `    --${essence.nameRadius}: ${skin[essence.nameRadius]}px;\n`;
    res += `    --${essence.nameBorder}: ${skin[essence.nameBorder]};`;

    if (i !== configOrder.length - 1) {
      res += `\n\n`;
    }
  });

  return res;
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
    name: "signInButton",
    inherits: ["accent"],
  },
  {
    name: "depositButton",
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
  {
    name: "overlay",
    inherits: ["body"],
  },
];
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

function templateFull(upperCaseEssence, essence, skin) {
  let res = "";
  res += `    --cw${upperCaseEssence.nameG}: ${skin[essence.nameG]};\n`;
  res += `    --cw${upperCaseEssence.nameBg}: ${skin[essence.nameBg]};\n`;
  res += `    --cw${upperCaseEssence.nameBg2}: ${skin[essence.nameBg2]};\n`;
  res += `    --cw${upperCaseEssence.nameBg3}: ${skin[essence.nameBg3]};\n`;
  res += `    --cw${upperCaseEssence.nameBgHov}: ${skin[essence.nameBgHov]};\n`;
  res += `    --cw${upperCaseEssence.nameBg2Hov}: ${
    skin[essence.nameBg2Hov]
  };\n`;
  res += `    --cw${upperCaseEssence.nameBg3Hov}: ${
    skin[essence.nameBg3Hov]
  };\n`;
  res += `    --cw${upperCaseEssence.nameTxt}: ${skin[essence.nameTxt]};\n`;
  res += `    --cw${upperCaseEssence.nameTxt2}: ${skin[essence.nameTxt2]};\n`;
  res += `    --cw${upperCaseEssence.nameTxt3}: ${skin[essence.nameTxt3]};\n`;
  res += `    --cw${upperCaseEssence.nameAccent}: ${
    skin[essence.nameAccent]
  };\n`;
  res += `    --cw${upperCaseEssence.nameAccentTxt}: ${
    skin[essence.nameAccentTxt]
  };\n`;
  res += `    --cw${upperCaseEssence.nameRGBA}: ${skin[essence.nameRGBA]};\n`;
  res += `    --cw${upperCaseEssence.nameRGBA2}: ${skin[essence.nameRGBA2]};\n`;
  res += `    --cw${upperCaseEssence.nameRGBA3}: ${skin[essence.nameRGBA3]};\n`;
  res += `    --cw${upperCaseEssence.name}Shadow: ${
    skin[`${essence.name}Shadow`]
  };\n`;
  res += `    --cw${upperCaseEssence.name}ShadowFade: ${
    skin[`${essence.name}ShadowFade`]
  };\n`;
  res += `    --cw${upperCaseEssence.nameRadius}: ${
    skin[essence.nameRadius]
  }px;\n`;
  res += `    --cw${upperCaseEssence.nameBorder}: ${skin[essence.nameBorder]};`;

  return res;
}

function templateOverlay(upperCaseEssence, essence, skin) {
  let res = "";
  res += `    --cw${upperCaseEssence.nameBg}: ${skin[essence.nameBg]};\n`;
  res += `    --cw${upperCaseEssence.nameTxt}: ${skin[essence.nameTxt]};\n`;
  res += `    --cw${upperCaseEssence.nameTxt2}: ${skin[essence.nameTxt2]};\n`;
  res += `    --cw${upperCaseEssence.nameAccent}: ${
    skin[essence.nameAccent]
  };\n`;
  res += `    --cw${upperCaseEssence.nameAccentTxt}: ${
    skin[essence.nameAccentTxt]
  };\n`;
  res += `    --cwOverlayBlur: ${skin.overlayBlur}px;`;

  return res;
}

function createCssStringCasino(skin) {
  let res = ``;

  configOrderCasino.forEach((c, i) => {
    let n = c.name.charAt(0).toUpperCase() + c.name.slice(1);
    let essence = verbalData(n);
    let value = verbalData(c.name);

    if (c.name === "overlay") {
      res += templateOverlay(essence, value, skin);
    } else {
      res += templateFull(essence, value, skin);
    }

    if (i !== configOrderCasino.length - 1) {
      res += `\n\n`;
    }

    res += `\n`;
  });

  return res;
}

function LoginTrigger() {
  alert("Login clicked!");
}

function RegisterTrigger() {
  alert("Register clicked!");
}

function WithdrawalTrigger() {
  alert("Withdraw clicked!");
}

function InitSkinnerOnContentLoad(
  mobileInstance,
  isMobile,
  minHeight,
  variant
) {
  var classNames = {
    root: ".skinner_main_wrapper",
    mobile: "sk_variant_mobile",
  };

  var _isMobile = isMobile || false;
  var _minHeight = minHeight || 846;

  var root = document.querySelector(classNames.root);
  if (_isMobile) {
    document.body.classList.add(classNames.mobile);
    var iframe = root.querySelector("iframe");
    var h = _minHeight ? _minHeight : window.innerHeight - 200;
    iframe.setAttribute("height", h);
  }

  window.mobileInstance = mobileInstance;
  if (variant === "casino") {
    window.SkinnerInstance = new Skinner(
      createCss,
      colorsCasweb,
      null,
      null,
      "casino"
    );
    window.SkinnerInstance.init();
  } else {
    window.SkinnerInstance = new Skinner(createCss, colors, null, null);
    window.SkinnerInstance.init();

    if (window.savedColorsModel && window.savedColorsModel.Colors) {
      setTimeout(
        window.SkinnerInstance.initBasedOnCustomConfig,
        1000,
        window.savedColorsModel.Colors
      );
    }
  }
}

function setOrUpdateIframeCss(cssStyle, target) {
  var styleId = "css-as-test-stylesheet";
  var targetElement =
    target ||
    window?.mobileInstance.configExtractor.appConfig.shadowRoot ||
    window?.mobileInstance?.iframe?.contentDocument.head;
  var styleElement = null;

  if (targetElement) {
    styleElement = targetElement.querySelector(`#${styleId}`);
    if (!styleElement) {
      var styleElement = document.createElement("style");
      styleElement.setAttribute("id", styleId);

      targetElement.appendChild(styleElement);
    }

    styleElement.innerHTML = cssStyle;
  }

  var betslip = window?.mobileInstance.Betslip?.iframe.contentDocument.head;

  if (betslip) {
    var oldStyle = betslip.querySelector(`#${styleId}`);

    if (!oldStyle) {
      oldStyle = styleElement.cloneNode(true);
      betslip.appendChild(oldStyle);
    }

    oldStyle.innerHTML = cssStyle;
  }
}

InitSkinnerOnContentLoad();
