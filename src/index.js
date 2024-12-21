import { Skinner } from "./main.js";
const target = document.getElementsByTagName("sport-latino-view")[0].shadowRoot;
// const target = document;

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

function createPreview() {
  if (isPreviewInitialized) return;
  isPreviewInitialized = true;
  let style = `
  .sk_demo_essence_root{
    color: var(--skinnerTxt);
    border-radius: var(--radius);
    border: 2px solid var(--skinnerBg);
    background: var(--skinnerBg4);
    padding: 12px 24px;
    width: calc((100% - 48px) / 4);
    position: relative;
    overflow: hidden;
  }
    .sk_demo_essence_root::before,
    .sk_demo_essence_root::after {
    content: '';
    --size: 600px;
    position: absolute;
    width: var(--size);
    display: block;
    background: var(--accentBg);
    height: var(--size);
    border-radius: 50%;
    filter: blur(36px);
    z-index: 1;
    opacity: 0.5;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
}
    .sk_demo_essence_root::after {
    --size: 1300px;
    left: auto;
    top: auto;
    background: var(--bodyBg);
    transform: translate(50%, 50%);
    bottom: 0;
    right: 0;
    opacity: 1;
}
    .sk_demo_value_wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 20px;
        position: relative;
    z-index: 3;

  }
  .sk_demo_root{
    --card_width: 60px;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 16px;
  }
  .sk_demo_essence_tint{
    font-size: 12px;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    column-gap: 10px;
  --sk_blob_size: 48px;
  --sk_blob_radius: 24px;
  }  

  .sk_demo_essence_text_tints_wrapper{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 12px;
  }

  .sk_demo_essence_text_tints_wrapper > .sk_demo_essence_tint .sk_demo_blob,
  .sk_demo_essence_text_tints_wrapper > .sk_demo_essence_tint .sk_demo_val{
      --txt: var(--bg1);
  }

  .sk_demo_essence_tint_text{
  padding: 6px;
    font-size: 12px;
    width: 100%;
    height: auto;
  }

  
  .sk_demo_essence_tint.variant_0 {
    --Bg: var(--bg1);
  }
  .sk_demo_essence_tint.variant_1 {
    --Bg: var(--bg2);
  }
    .sk_demo_essence_tint.variant_2 {
    --Bg: var(--bg3);
  }
    .sk_demo_essence_tint.variant_3 {
    --Bg: var(--bg4);
  }
    .sk_demo_essence_tint.variant_4 {
    --Bg: var(--bg5);
  }
    .sk_demo_essence_tint.variant_5 {
    --Bg: var(--bg6);
  }
    .sk_demo_essence_title {
        margin: 0;
    font-size: 19px;
    text-align: center;
    color: var(--skinnerTxt);
    margin-bottom: 20px;
    position: relative;
    z-index: 4;
    }

    .sk_demo_essence_tint_text{
            padding: 8px;
    font-size: 12px;
    }

    .sk_demo_essence_tint_text .sk_demo_key{
      --txt2: var(--bg2);
    }
      .sk_demo_essence_tint_text .sk_demo_val{
      --txt: var(--bg1);
    }

    .sk_demo_blob{
            flex-grow: 1;
    min-width: 1px;
    height: var(--sk_blob_size);
    border-radius: var(--sk_blob_radius);
    background: var(--Bg);
    color: var(--txt);
    border: 2px solid var(--txt);
    display: flex
;
    align-items: center;
    justify-content: flex-start;
    padding: 0 16px;
    font-size: 13px;
    font-weight: 300;
    }

    .sk_demo_val{
        flex-shrink: 0;
    width: 80px;
    height: var(--sk_blob_size);
    border-radius: var(--sk_blob_radius);
    background: var(--Bg);
    border: 2px solid var(--txt);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    }

    .sk_demo_essence_accent{
          --Bg: var(--ab);
          --txt: var(--at);
    }

    .sk_demo_essence_text {
        display: flex;
      flex-direction: column;
    }
    .sk_demo_essence_tint.variant_T1{
    --Bg: var(--txt);
    }
    .sk_demo_essence_tint.variant_T2{
    --Bg: var(--txt2);
    }
    .sk_demo_essence_tint.variant_T3{
    --Bg: var(--txt3);
    }
    .sk_demo_key_val_root {
        display: flex;
        align-items: center;
        column-gap: 4px;
        height: 24px;
    }
    .sk_demo_val {
        color: var(--txt);
        font-weight: 500;
    }  
  `;

  const demoStyle = document.createElement("style");
  demoStyle.innerHTML = style;
  demoStyle.id = "sk_demo_style";

  document.body.appendChild(demoStyle);

  const demoRoot = document.createElement("div");
  demoRoot.className = "sk_demo_root";
  demoRoot.id = "sk_demo_root";

  function createKeyVal(key, val) {
    const root = document.createElement("div");
    const k = document.createElement("span");
    const v = document.createElement("span");
    root.className = "sk_demo_key_val_root";
    k.className = "sk_demo_key";
    v.className = "sk_demo_val";
    k.innerText = key;
    v.innerText = val;
    root.appendChild(k);
    root.appendChild(v);

    return root;
  }

  configOrderSport.forEach((c, i) => {
    let _vd = verbalData(c.name);
    const essenceRoot = document.createElement("div");
    essenceRoot.className = "sk_demo_essence_root";

    const essenceRootTitle = document.createElement("h3");
    essenceRootTitle.className = "sk_demo_essence_title";
    essenceRootTitle.innerText = c.name;
    essenceRoot.style.setProperty("--bgG", `var(--${_vd.nameG})`);
    essenceRoot.style.setProperty("--bg1", `var(--${_vd.nameBg})`);
    essenceRoot.style.setProperty("--bg2", `var(--${_vd.nameBgHov})`);
    essenceRoot.style.setProperty("--bg3", `var(--${_vd.nameBg2})`);
    essenceRoot.style.setProperty("--bg4", `var(--${_vd.nameBg2Hov})`);
    essenceRoot.style.setProperty("--bg5", `var(--${_vd.nameBg3})`);
    essenceRoot.style.setProperty("--bg6", `var(--${_vd.nameBg3Hov})`);
    essenceRoot.style.setProperty("--txt", `var(--${_vd.nameTxt})`);
    essenceRoot.style.setProperty("--txt2", `var(--${_vd.nameTxt2})`);
    essenceRoot.style.setProperty("--txt3", `var(--${_vd.nameTxt3})`);
    essenceRoot.style.setProperty("--radius", `var(--${_vd.nameRadius})`);
    essenceRoot.style.setProperty("--shadow", `var(--${_vd.name}Shadow)`);
    essenceRoot.style.setProperty("--ab", `var(--${_vd.nameAccent})`);
    essenceRoot.style.setProperty("--at", `var(--${_vd.nameAccentTxt})`);

    essenceRoot.appendChild(essenceRootTitle);

    const tintsArr = [
      "nameBg",
      "nameBgHov",
      "nameBg2",
      "nameBg2Hov",
      "nameBg3",
      "nameBg3Hov",
    ];

    let wrapper = document.createElement("div");
    wrapper.className = "sk_demo_value_wrapper";
    for (i = 0; i < tintsArr.length; i++) {
      const essenceTint = document.createElement("div");
      essenceTint.className = `sk_demo_essence_tint variant_${i}`;
      const hexVal = window.SkinnerInstance.skin[_vd[tintsArr[i]]];

      const b = document.createElement("div");
      const v = document.createElement("span");
      b.innerText = _vd[tintsArr[i]];
      v.innerText = hexVal;
      essenceTint.appendChild(b);
      essenceTint.appendChild(v);
      b.className = "sk_demo_blob";
      v.className = "sk_demo_val";

      wrapper.appendChild(essenceTint);
    }
    const essenceText = document.createElement("div");
    essenceText.className = `sk_demo_essence_text_tints_wrapper`;
    const essenceTintText1 = document.createElement("div");
    const essenceTintText2 = document.createElement("div");
    const essenceTintText3 = document.createElement("div");

    const Txt1HexVal = window.SkinnerInstance.skin[_vd["nameTxt"]];

    const tb1 = document.createElement("div");
    const tv1 = document.createElement("span");
    tb1.innerText = _vd["nameTxt"];
    tv1.innerText = Txt1HexVal;
    tb1.className = "sk_demo_blob";
    tv1.className = "sk_demo_val";
    essenceTintText1.appendChild(tb1);
    essenceTintText1.appendChild(tv1);

    const Txt2HexVal = window.SkinnerInstance.skin[_vd["nameTxt2"]];

    const tb2 = document.createElement("div");
    const tv2 = document.createElement("span");
    tb2.innerText = _vd["nameTxt2"];
    tv2.innerText = Txt2HexVal;
    tb2.className = "sk_demo_blob";
    tv2.className = "sk_demo_val";
    essenceTintText2.appendChild(tb2);
    essenceTintText2.appendChild(tv2);

    const Txt3HexVal = window.SkinnerInstance.skin[_vd["nameTxt3"]];
    const tb3 = document.createElement("div");
    const tv3 = document.createElement("span");
    tb3.innerText = _vd["nameTxt3"];
    tv3.innerText = Txt3HexVal;
    tb3.className = "sk_demo_blob";
    tv3.className = "sk_demo_val";
    essenceTintText3.appendChild(tb3);
    essenceTintText3.appendChild(tv3);

    essenceTintText1.className = `sk_demo_essence_tint variant_T1`;
    essenceTintText2.className = `sk_demo_essence_tint variant_T2`;
    essenceTintText3.className = `sk_demo_essence_tint variant_T3`;
    essenceText.appendChild(essenceTintText1);
    essenceText.appendChild(essenceTintText2);
    essenceText.appendChild(essenceTintText3);

    const essenceAccent = document.createElement("div");
    essenceAccent.className = `sk_demo_essence_accent sk_demo_essence_tint `;

    const ab2 = document.createElement("div");
    const av2 = document.createElement("span");
    ab2.innerText = _vd["nameTxt2"];
    av2.innerText = Txt2HexVal;
    ab2.className = "sk_demo_blob";
    av2.className = "sk_demo_val";
    essenceAccent.appendChild(ab2);
    essenceAccent.appendChild(av2);

    wrapper.appendChild(essenceText);
    wrapper.appendChild(essenceAccent);
    essenceRoot.appendChild(wrapper);

    demoRoot.appendChild(essenceRoot);
  });
  document.body.appendChild(demoRoot);
}

function destroyPreview() {
  const demoStyle = document.getElementById("sk_demo_style");
  const demoRoot = document.getElementById("sk_demo_root");

  if (demoStyle) demoStyle.remove();
  if (demoRoot) demoRoot.remove();

  isPreviewInitialized = false;
}

function createCssStringSport(skin) {
  let res = ``;

  configOrderSport.forEach((c, i) => {
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
    res += `    --${essence.name}Shadow: ${skin[`${essence.name}Shadow`]};\n`;
    res += `    --${essence.name}ShadowFade: ${
      skin[`${essence.name}ShadowFade`]
    };\n`;
    res += `    --${essence.nameRadius}: ${skin[essence.nameRadius]}px;\n`;
    res += `    --${essence.nameBorder}: ${skin[essence.nameBorder]};`;

    if (i !== configOrderSport.length - 1) {
      res += `\n\n`;
    }
  });

  return res;
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
let dd = "";

let isPreviewInitialized = false;
function createCss(c) {
  let css = `
  :host:host:host,
:root:root:root {
  ${createCssStringSport(c)}
}`;

  let results = {
    css: css,
    name: "casWeb",
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
// Check if init and destroy are already defined in the global scope
if (!window.Skinner) {
  window.Skinner = Skinner;
} else {
  console.warn("window.skinner already exists!");
}

function init() {
  if (window.SkinnerInstance) {
    console.warn("SkinnerInstance already exists!");
    return;
  }

  window.SkinnerInstance = new Skinner(
    createCss,
    colorsSport,
    null,
    null,
    "sport",
    target
  );
  window.SkinnerInstance.init();
  console.log("SkinnerInstance initialized");
}

function destroy() {
  if (!window.SkinnerInstance) {
    console.warn("No SkinnerInstance to destroy");
    return;
  }

  if (typeof window.SkinnerInstance.destroy === "function") {
    window.SkinnerInstance.destroy(); // Call destroy method if it exists
  }

  delete window.SkinnerInstance; // Remove the instance from the global object
  console.log("SkinnerInstance destroyed");
}

// Add event listener for keydown event to trigger init on pressing "s"
// and destroy SkinnerInstance on pressing "d"
window.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.key === "A") {
    // Trigger init function
    init();
  } else if (event.key === "q" || event.key === "Q") {
    // Trigger destroy function
    destroy();
  } else if (event.key === "p" || event.key === "P") {
    // Trigger destroy function
    createPreview();
  } else if (event.key === "o" || event.key === "O") {
    // Trigger destroy function
    destroyPreview();
  }
});
