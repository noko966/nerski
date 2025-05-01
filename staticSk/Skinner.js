class Skinner {
  constructor(cssCb, starterConfig, header, root, variant) {
    this.variant = variant || "sport";
    this.pickers = [];
    this.eventListeners = [];
    this.header =
      document.querySelector(header) ||
      document.querySelector(".nik_skinner_header");
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
    this.domEventBindings = [];
    this.icons = {
      burger: `<svg width="22" height="18" viewBox="0 0 22 18"><path d="M20.6 0H1.39995C0.737209 0 0.199951 0.537258 0.199951 1.2V2.4C0.199951 3.06274 0.737209 3.6 1.39995 3.6H20.6C21.2627 3.6 21.8 3.06274 21.8 2.4V1.2C21.8 0.537258 21.2627 0 20.6 0Z" /><path d="M20.6 7.2H1.39995C0.737209 7.2 0.199951 7.73726 0.199951 8.4V9.6C0.199951 10.2627 0.737209 10.8 1.39995 10.8H20.6C21.2627 10.8 21.8 10.2627 21.8 9.6V8.4C21.8 7.73726 21.2627 7.2 20.6 7.2Z" /><path d="M20.6 14.4H1.39995C0.737209 14.4 0.199951 14.9373 0.199951 15.6V16.8C0.199951 17.4627 0.737209 18 1.39995 18H20.6C21.2627 18 21.8 17.4627 21.8 16.8V15.6C21.8 14.9373 21.2627 14.4 20.6 14.4Z"/></svg>`,
      load: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17.3px" height="17.8px" viewBox="0 0 17.3 17.8" style="overflow:visible;enable-background:new 0 0 17.3 17.8;" xml:space="preserve"><path d="M8.6,0C8,0,7.5,0.5,7.5,1.2l0,0v8.2L6,7.9C5.6,7.4,4.9,7.4,4.4,7.8C3.9,8.2,3.9,8.9,4.3,9.4c0,0,0,0,0,0 l2.5,2.5l0,0c1,1,2.6,1,3.6,0c0,0,0,0,0,0l2.4-2.4c0.5-0.4,0.5-1.1,0.1-1.6c-0.4-0.5-1.2-0.5-1.6-0.1c0,0,0,0,0,0L9.8,9.3V1.2 C9.8,0.5,9.3,0,8.6,0L8.6,0L8.6,0z"/><path d="M17.3,12.7c0-0.6-0.5-1.2-1.1-1.2c-0.6,0-1.2,0.5-1.2,1.1c0,0,0,0.1,0,0.1v1.7l0,0 c0,0.6-0.5,1.2-1.2,1.2l0,0H3.5c-0.6,0-1.2-0.5-1.2-1.2l0,0v-1.7c0-0.6-0.5-1.2-1.1-1.2c-0.6,0-1.2,0.5-1.2,1.1c0,0,0,0.1,0,0.1v1.7 l0,0c0,1.9,1.5,3.5,3.5,3.5l0,0h10.4c1.9,0,3.5-1.5,3.5-3.5l0,0L17.3,12.7z"/></svg>`,
      eye: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M12,6.1c-4.1,0-7.7,2.2-10.4,5.8c-0.2,0.3-0.2,0.7,0,1c2.7,3.6,6.4,5.8,10.4,5.8s7.7-2.2,10.4-5.8 c0.2-0.3,0.2-0.7,0-1C19.7,8.3,16.1,6.1,12,6.1z M12.3,16.9c-2.5,0.2-4.6-1.7-4.7-4.2s1.7-4.6,4.2-4.7c2.5-0.2,4.6,1.7,4.7,4.2 c0,0.2,0,0.4,0,0.6C16.3,14.9,14.5,16.7,12.3,16.9z M12.2,14.8c-1.3,0.1-2.5-0.9-2.5-2.2c-0.1-1.3,0.9-2.5,2.2-2.5 c1.3-0.1,2.5,0.9,2.5,2.2c0,0.1,0,0.2,0,0.3C14.3,13.8,13.4,14.7,12.2,14.8L12.2,14.8z"/></svg>`,
      sun: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M18.3,12c0,3.5-2.8,6.3-6.3,6.3S5.7,15.5,5.7,12c0-3.5,2.8-6.3,6.3-6.3C15.5,5.7,18.3,8.5,18.3,12L18.3,12" /> <path d="M12.9,3.9V1.2c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0,0,0,0,0v2.7c0,0.5,0.4,0.9,0.9,0.9 C12.5,4.8,12.9,4.4,12.9,3.9C12.9,3.9,12.9,3.9,12.9,3.9z"/> <path d="M12.9,22.8v-2.7c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0,0,0,0,0v2.7c0,0.5,0.4,0.9,0.9,0.9 C12.5,23.7,12.9,23.3,12.9,22.8z"/> <path id="Path_41477" d="M22.8,11.1h-2.7c-0.5,0-0.9,0.4-0.9,0.9c0,0.5,0.4,0.9,0.9,0.9c0,0,0,0,0,0h2.7c0.5,0,0.9-0.4,0.9-0.9 C23.7,11.5,23.3,11.1,22.8,11.1z"/><path d="M1.2,12.9h2.7c0.5,0,0.9-0.4,0.9-0.9c0-0.5-0.4-0.9-0.9-0.9c0,0,0,0,0,0H1.2c-0.5,0-0.9,0.4-0.9,0.9 C0.3,12.5,0.7,12.9,1.2,12.9C1.2,12.9,1.2,12.9,1.2,12.9z"/><path d="M5,3.7c-0.4-0.3-0.9-0.3-1.3,0C3.4,4.1,3.4,4.7,3.7,5l1.9,1.9c0.4,0.3,0.9,0.3,1.3,0c0.3-0.3,0.3-0.9,0-1.2 L5,3.7z"/> <path id="Path_41480" d="M20.3,19l-1.9-1.9c-0.4-0.3-0.9-0.3-1.3,0c-0.3,0.3-0.3,0.9,0,1.2l1.9,1.9c0.4,0.3,0.9,0.3,1.3,0 C20.6,19.9,20.6,19.3,20.3,19L20.3,19z"/> <path id="Path_41481" d="M20.3,3.7c-0.4-0.4-0.9-0.4-1.3,0l-1.9,1.9c-0.4,0.3-0.4,0.9,0,1.3c0.3,0.4,0.9,0.4,1.3,0c0,0,0,0,0,0 L20.3,5C20.6,4.7,20.6,4.1,20.3,3.7z"/><path d="M3.7,20.3c0.4,0.4,0.9,0.4,1.3,0l1.9-1.9c0.3-0.4,0.3-0.9,0-1.3c-0.3-0.3-0.9-0.3-1.2,0L3.7,19 C3.4,19.3,3.4,19.9,3.7,20.3z"/></svg>`,
      moon: `<svg class="sk_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
  <path  d="M9,2.5v1 M9,14.5v1 M3.5,9h-1 M5.1,12.9l-0.7,0.7 M5.1,5.1L4.4,4.4 M9,5.5c-0.9,0-1.8,0.4-2.5,1
c-0.7,0.7-1,1.5-1,2.5s0.4,1.8,1,2.5c0.7,0.7,1.5,1,2.5,1V5.5z M14.5,9h1 M12.9,12.9l0.7,0.7 M12.9,5.1l0.7-0.7"/></svg>`,
      chb: `<svg class="sk_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><polyline class="sk_svg_path_checkbox" points="4.5,9.4 8.6,13.6 15.7,6.5 "/></svg>`,
      copy: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_copy" d="M13.5,16.9H9.5c-1.5,0-2.8-1.2-2.8-2.8V8.9c0-1.5,1.2-2.8,2.8-2.8h3.9c1.5,0,2.8,1.2,2.8,2.8v5.3 C16.2,15.7,15,16.9,13.5,16.9z M12.6,4.2c-0.5-0.6-1.3-1-2.1-1H6.5C5,3.1,3.8,4.3,3.8,5.9v5.3c0,0.9,0.4,1.6,1,2.1"/></svg>`,
      download: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_copy" d="M13.1,9.8l-2.7,2.7c-0.1,0.1-0.3,0.1-0.4,0L7.4,9.8 M10.2,4.2v8.2 M4.5,11.5v3.9c0,0.4,0.4,0.8,0.8,0.8h9.3 c0.4,0,0.8-0.4,0.8-0.8v-3.9"/></svg>`,
      saveToDb: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><path class="sk_svg_path_save" d="M9.8,15.8V9.1 M11.6,10.7l-1.6-1.6C9.9,9,9.7,9,9.5,9.2l-1.6,1.6 M12.7,13c0.4,0.2,0.8,0.3,1.2,0.3 c1.4,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-0.4,0-0.7,0.1-1,0.2c0-2.1-1.6-3.9-3.5-3.9S5.8,6.4,5.8,8.5c-1.2,0.2-2.1,1.2-2.1,2.4 c0,1.4,1.1,2.4,2.4,2.4c0.4,0,0.8-0.1,1.1-0.3"/></svg>`,
      recolor: `<svg class="sk_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><g class="sk_svg_path_load"><path class="st0" d="M10,14.2c1.6,0,2.8-1.3,2.8-2.8S11.4,7.7,10,5.2c-1.4,2.5-2.8,4.6-2.8,6.2S8.4,14.2,10,14.2z"/> <line class="st0" x1="15.7" y1="16.4" x2="4.3" y2="16.4"/><g></svg>`,
      showHide: `<svg class="sk_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">

<path d="M7.5,13.5h8c0.6,0,1-0.4,1-1v-8c0-0.6-0.4-1-1-1h-8c-0.6,0-1,0.4-1,1v8C6.5,13.1,6.9,13.5,7.5,13.5z M13.5,16.5
h-9c-0.3,0-0.5-0.1-0.7-0.3c-0.2-0.2-0.3-0.4-0.3-0.7v-9 M12.5,10.5h-3v-3 M9.5,10.5l4-4"/>
</svg>`,
    };

    this.skinnerContainer = this.createControlsWrapper();

    this.essenceGroups = {};

    this.uiColors = {
      dark: {
        name: "dark",
        dominant: "#2f2f2f",
        button: "#282828",
        accent: "#00aabe",
      },
      light: {
        name: "light",
        dominant: "#d4d7db",
        button: "#282828",
        accent: "#00aabe",
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

    this.configOrder.push({
      name: "overlay",
      inherits: ["body"],
    });

    this.cssCb = cssCb;
    this.skin = {};
    this.isUIVisible = true;
    this.version = "6.0.0";

    this._config = starterConfig || {};

    this._config.overlay = {};

    this.activeEssences = this.configOrder.filter((c) => {
      return this._config[c.name];
    });

    this.localStorage = {};

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

    this.swatches = this.fillSwatches();
    this.gradientSwatches = this.fillGradientSwatches();

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

    this.stylerState = {
      isRunning: false,
      editableElements: [],
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

    _mergedConfig.overlay.Background.color = tinycolor(
      _mergedConfig.overlay.Background.color
    )
      .setAlpha(0.5)
      .toRgbString();
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
      //this.skin[_vb.nameG] = `linear-gradient(${this.skin[_vb.gradientAngle]}deg, ${this.skin[_vb.nameBg_g]} 0%, ${this.skin[_vb.nameBg]} 100%)`;
      this.skin[_vb.nameG] = this.skin[_vb.nameBg_g];
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

        //this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
        //this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
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

        this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
      }
    }
    this.skin.overlayBlur = 4;
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
      self[verbalData.nameBg].picker3.style.background =
        self.skin[verbalData.nameTxt];
      self[verbalData.nameBg].borderPckr.style.background =
        self.skin[verbalData.nameBorder];
      self[verbalData.nameBg].customAccentPckr.style.background =
        self.skin[verbalData.nameAccent];
      timeoutId = setTimeout(apply);
    })();
  }

  init() {
    this.createHTML();
    // this.addSettingsWrapper();
    this.addVersioning();
    this.generateTheme();
    this.generateUiPalette(this.uiColors.light);
    this.addUiThemeSwitcher();
    this.addUiCollapseSwitcher();
    this.updateAllControls();
    this.createDownloadButton();
    this.addStringAnim();
    this.cssCb(this.skin);
    this.appendCssToSkinnerInstanceRoot(this.skin);
  }

  addSettingsWrapper() {
    this.settingsWrapper = document.createElement("Div");
    this.settingsWrapper.className = this.classNames.settingsWrapper;
    let headerNav = this.header.querySelector(".nik_skinner_link_wrapper");
    this.header.insertBefore(this.settingsWrapper, headerNav);
  }

  addVersioning() {
    let vDiv = document.createElement("Div");
    vDiv.className = "nik_skinner_versioning";
    vDiv.innerText = "V " + this.version;
    this.skinnerUiControls.appendChild(vDiv);
  }
  createSwitch(lbl, i) {
    const _lbl = document.createElement("label");
    _lbl.className = "sk_switch_root";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "sk_switch_input";
    const ic = document.createElement("i");
    ic.className = "sk_switch_imitator";

    const icon = document.createElement("i");
    icon.className = "sk_switch_icon";
    icon.innerHTML = this.icons[i] || this.icons["chb"];

    _lbl.appendChild(input);
    _lbl.appendChild(icon);

    return { el: _lbl, chb: input };
  }

  addUiThemeSwitcher() {
    let _id = "skinner_ui_switcher";

    const themeSwitcher = this.createSwitch("theme", "moon");
    this.addDomListener(themeSwitcher.chb, "change", (e) => {
      let uiTheme = e.currentTarget.checked
        ? this.uiColors["dark"]
        : this.uiColors["light"];
      this.updateUiPalette(uiTheme);
    });

    this.skinnerUiControls.appendChild(themeSwitcher.el);
  }

  addUiCollapseSwitcher() {
    const collapseSwitcher = this.createSwitch("theme", "showHide");
    this.addDomListener(collapseSwitcher.chb, "change", (e) => {
      this.toolBox.classList.toggle("state_collapsed");
    });

    this.skinnerUiControls.appendChild(collapseSwitcher.el);
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

      if (i !== configOrderCasino.length - 1) {
        res += `\n\n`;
      }
    });

    return res;
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
      } else {
        this.essenceGroups[_essence].title = "";
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

    const overlayBg = tinycolor(this.skin.overlayBg);
    const alpha = overlayBg.getAlpha();

    if (alpha >= 0.1 && alpha <= 0.6) {
      this.skin.overlayBg = overlayBg.setAlpha(alpha).toRgbString();
    } else {
      this.skin.overlayBg = overlayBg.setAlpha(0.6).toRgbString();
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

      //this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
      //this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
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
      ? "sk_control_group state_active"
      : "sk_control_group";

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
    const sliderProperty = this.isOverlay(name)
      ? this.skin.overlayBlur
      : this.skin[c.nameRadius];
    this[c.nameBg].radiusInput.value = sliderProperty;
    this[c.nameBg].radiusAmount.value = sliderProperty;
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

  fillGradientSwatches() {
    let res = [];

    const baseColors = [
      "#247FBB",
      "#6a399b",
      "#dedede",
      "#F06B6A",
      "#DEB666",
      "#ffb01c",
      "#22DB7A",
      this.skin.bodyBg,
      this.skin.accentBg,
    ];
    const midStop = 22;

    baseColors.forEach((bc) => {
      const hsl = tinycolor(bc).toHsl();
      const slices = 30;
      const part = 360 / slices;
      hsl.h = (hsl.h - part) % 360;
      hsl.l = hsl.l - 0.1;

      const shade = tinycolor(hsl).toHexString();
      res.push(
        `linear-gradient(0deg, ${bc} 0%, ${shade} ${midStop}%, ${bc} 100%)`
      );
    });

    return res;
  }

  fillSwatches() {
    const baseColors = [
      "#4A5268",
      "#125231",
      "#3999D9",
      "#B188DA",
      "#F06B6A",
      "#FECB63",
    ];

    const tintSteps = [10, 20, 30];

    const swatches = [];

    baseColors.forEach((bc) => {
      let base = tinycolor(bc);
      swatches.push(base.toHexString());
      for (const t of tintSteps) {
        swatches.push(base.clone().darken(t).toHexString());
      }
    });

    return [...new Set(swatches)];
  }

  createPickerAndTrigger(parent, color, opacity) {
    const swatches = this.swatches;

    let _triggerEl = document.createElement("div");
    _triggerEl.className = "skinner_picker_trigger_hide";
    parent.appendChild(_triggerEl);

    let _picker = GPickr.Pickr.create({
      el: _triggerEl,
      theme: "nano",
      comparison: false,
      container: this.skinnerRoot,
      default: color,
      swatches: swatches,
      components: {
        preview: false,
        hue: true,
        opacity: opacity,
        interaction: {
          input: true,
          save: false,
        },
      },
    });

    return _picker;
  }

  isOverlay(name) {
    return name === "overlay";
  }

  createHTML() {
    const fontURL = `https://cdn-sp-bn.kertn.net/assets/fonts/sport-ui-icons/style.css?${Math.random()}`;
    this.iconsLink = document.createElement("link");
    this.iconsLink.rel = "stylesheet";
    this.iconsLink.href = fontURL;
    document.head.insertBefore(this.iconsLink, document.head.firstChild);
    let _config = this.mergedConfig;
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      if (!_config[_essence].editable) continue;
      let _vd = this.verbalData(_essence);
      let _hiddenControlsArray = _config[_essence].hide;

      const sliderProperty = this.isOverlay(_essence)
        ? "overlayBlur"
        : _vd.nameRadius;

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
          const opacity = this.isOverlay(_essence);
          const currentColor = this.skin[_vd.nameBg];
          this.handlePicker(e, currentColor, opacity, (color) =>
            this.modifyKey(_vd.nameBg, color.toHEXA().toString())
          );
        },
        (e) => {
          this.handleGPicker(e, _essence, (instance) =>
            this.modifyKey(_vd.nameBg_g, instance.getGradient())
          );
        },
        (e) => {
          this.modifyKey(_vd.isDark, e.target.checked);
        },
        (e) => {
          this.modifyKey(_vd.isCustomTxt, e.target.checked);
        },
        (e) => {
          const currentColor = this.skin[_vd.nameTxt];
          this.handlePicker(e, currentColor, false, (color) =>
            this.modifyKey(_vd.nameTxt, color.toHEXA().toString())
          );
        },
        (e) => {
          this.modifyKey(_vd.isCustomAccent, e.target.checked);
        },
        (e) => {
          const currentColor = this.skin[_vd.nameAccent];
          this.handlePicker(e, currentColor, false, (color) =>
            this.modifyKey(_vd.nameAccent, color.toHEXA().toString())
          );
        },
        (e) => {
          this.modifyKey(_vd.isCustomBorder, e.target.checked);
        },
        (e) => {
          const currentColor = this.skin[_vd.nameBorder];
          this.handlePicker(e, currentColor, false, (color) =>
            this.modifyKey(_vd.nameBorder, color.toHEXA().toString())
          );
        },
        (e) => {
          this.modifyKey(sliderProperty, e.target.value);
        },
        _hiddenControlsArray,
      ]);
    }
  }

  saveColorsForPicker() {
    return ["#f00", "#ff0", "#0ff", "#f00"];
  }

  handlePicker1(event, color, mode, onChangeCallback) {
    const _t = this;
    if (_t.pickerInstance) {
      console.log("A picker is already open. Please close it first.");
      return;
    }

    // Extract the current color from your state
    const currentColor = color;

    const x = event.clientX;
    const y = event.clientY;

    const localSolids = _t.saveColorsForPicker();

    const SKPickerInstance = new Pickern({
      default: currentColor,
      mode: mode,
      localSolids,
      container: this.skinnerRoot,
    });
    SKPickerInstance.init();
    SKPickerInstance.show(x, y);

    _t.pickerInstance = SKPickerInstance;

    SKPickerInstance.on("change", (color, source, instance) => {
      onChangeCallback(color);
    });

    SKPickerInstance.on("hide", (source, instance) => {
      instance.destroy();
      _t.pickerInstance = null;
    });
  }

  destroy() {
    this.domEventBindings.forEach(({ element, eventType, handler }) => {
      element.removeEventListener(eventType, handler);
    });
    this.domEventBindings = [];

    if (this.ui.root && this.root.contains(this.ui.root)) {
      this.root.removeChild(this.ui.root);
    }

    if (this.customStyler && this.customStyler.isRunning) {
      this.customStyler.stop();
    }
  }

  handlePicker(event, currentColor, opacity, onChangeCallback) {
    let picker = this.createPickerAndTrigger(
      event.target.parentElement,
      currentColor,
      opacity
    );

    picker.show();

    picker.on("change", (color, source, instance) => {
      onChangeCallback(color);
    });

    picker.on("hide", (instance) => {
      instance.destroyAndRemove();
      this.removePicker(instance);
    });

    this.pickers.push(picker);
  }

  handleGPicker(event, essence, onChangeCallback) {
    const _vd = this.verbalData(essence);
    const colorStops = [
      [this.skin[_vd.nameBg], 0],
      [this.skin[_vd.nameBg3], 1],
    ];
    const currectGradient = this.skin[_vd.nameBg_g];

    const parent = event.target.parentElement;
    let _triggerEl = document.createElement("div");
    _triggerEl.className = "skinner_picker_trigger_hide";
    parent.appendChild(_triggerEl);

    const gpickr = new GPickr({
      el: this.skinnerRoot,
      gradient: currectGradient,
      stops: colorStops,
      swatches: this.swatches,
      gradientSwatches: this.gradientSwatches,
    });

    const x = event.clientX;
    const y = event.clientY;
    gpickr.show(x, y);

    gpickr.on("change", (color, source, instance) => {
      onChangeCallback(color);
    });

    gpickr.on("hide", (instance) => {
      instance.destroy();
      this.removePicker(instance);
    });

    this.pickers.push(gpickr);
  }

  removePicker(instance) {
    this.pickers = this.pickers.filter((p) => p !== instance);
  }

  destroyPickers() {
    this.pickers.forEach((picker) => picker.destroyAndRemove());
    this.pickers = []; // Clear the array
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
    toolbox.className = "sk_root";
    let toolboxWrapper = document.createElement("div");
    toolboxWrapper.className = "skinner_toolbox_wrapper";
    let main = document.createElement("div");
    main.className = "sk_content sk_scrollbar";
    let header = document.createElement("div");
    header.className = "sk_header";
    toolbox.appendChild(toolboxWrapper);
    toolboxWrapper.appendChild(header);
    this.toolBox = toolbox;
    let tableHeaders = [
      "name",
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
          className = "sk_header_label variant-essence";
          break;
        case "Background":
          className = "sk_header_label variant-background";
          break;
        case "Gradient":
          className = "sk_header_label variant-gradient";
          break;
        case "Text":
          className = "sk_header_label variant-text";
          break;
        case "Accent":
          className = "sk_header_label variant-accent";
          break;
        case "Border":
          className = "sk_header_label variant-border";
          break;
        case "Radius":
          className = "sk_header_label variant-radius";
          break;
        default:
          className = "sk_header_label";
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

    var pathMask = document.createElementNS(svgNS, "path");
    var path = document.createElementNS(svgNS, "path");
    var mask = document.createElementNS(svgNS, "mask");
    mask.setAttribute("id", "mask_id");
    mask.setAttribute("maskUnits", "objectBoundingBox");
    //mask.setAttribute("maskContentUnits", "userSpaceOnUse");

    path.setAttribute("vector-effect", "non-scaling-stroke");
    svg.setAttribute("preserveAspectRatio", "none");
    const defs = document.createElementNS(svgNS, "defs");
    svg.appendChild(mask);
    mask.appendChild(pathMask);
    svg.appendChild(defs);
    svg.appendChild(path);

    const linearGradient = document.createElementNS(svgNS, "linearGradient");
    linearGradient.setAttribute("id", "strokeGradient");
    linearGradient.setAttribute("gradientUnits", "userSpaceOnUse");

    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("x2", "100%");
    linearGradient.setAttribute("y2", "0%");

    //const colors = [
    //    "#FF637C",
    //    "#FFD76B",
    //    "#D2F58D",
    //    "#FF637C",
    //    "#D2F58D",
    //    "#FFD76B",
    //    "#FF637C",
    //];
    const colors = [
      "#18aabd",
      "#00abef",
      "#72a0ff",
      "#d585ff",
      "#de8bff",
      "#86b7ff",
      "#05d3ff",
      "#20e5ff",
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

    this.toolboxWrapper.appendChild(stringWrapper);

    let progress = 0;
    let width = 800;
    let time = Math.PI / 2;
    let x = 0.4;
    let reqId = null;

    svg.setAttribute("viewBox", `0 0 ${width} 40`);

    const setPath = (progress) => {
      const p = `M-4 0 -4 20 Q${width * x} ${20 + progress}, ${width + 4} 20 ${
        width + 4
      } 0 ${width + 4} 0`;
      pathMask.setAttribute("d", p);
      path.setAttribute("d", p);
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

    this.addDomListener(box, "mouseenter", manageMouseEnter);
    this.addDomListener(box, "mousemove", manageMouseMove);
    this.addDomListener(box, "mouseleave", manageMouseLeave);

    setPath(progress);
  }

  addDomListener(element, eventType, handler) {
    element.addEventListener(eventType, handler);
    this.domEventBindings.push({ element, eventType, handler });
  }

  createBtn(name, className) {
    let _class = className || "";
    let btn = document.createElement("button");
    let txt = document.createElement("span");
    let icon = document.createElement("i");
    icon.innerHTML = this.icons.download;
    txt.innerText = name;
    btn.append(icon);
    btn.append(txt);
    btn.className = `sk_btn ${_class}`;

    return btn;
  }

  createIconBtn(className, iconName) {
    let _iconName = iconName || "download";
    let _class = className || "";
    let btn = document.createElement("button");
    let icon = document.createElement("i");
    icon.innerHTML = this.icons[_iconName];
    btn.append(icon);
    btn.className = `sk_btn ${_class}`;

    return btn;
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

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "sk_input_wrapper";

    this.toolboxWrapper.appendChild(actionsWrapper);

    let config = this.cssCb(this.skin);
    let name = config.name;
    let name2 = config.name2;

    let saveConfigBtn = this.createIconBtn("skinner_btn-icon", "copy");

    let loadConfigInput = document.createElement("textarea");
    loadConfigInput.spellcheck = false;
    loadConfigInput.placeholder = "enter copied config";
    loadConfigInput.className = "sk_input_config sk_scrollbar";

    let loadConfigInputWrapper = document.createElement("div");
    loadConfigInputWrapper.className = "sk_config_root";

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
    loadConfigInputWrapper.appendChild(inputWrapper);
    inputWrapper.appendChild(loadConfigInput);
    actionsWrapper.appendChild(loadConfigInputWrapper);
    actionsWrapper.appendChild(loadConfigButton);

    actionsWrapper.appendChild(this.createDownloadBtn(name, "variant_cta"));
    if (name2) {
      actionsWrapper.appendChild(
        this.createDownloadBtn(name2, "variant_cta", 2)
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
    wrapper.className = "sk_control_group";
    this.essenceGroups[label] = wrapper;

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
    labelWrapper.className = "sk_checkbox_wrapper variant_name";

    labelWrapper.appendChild(chb.label);
    labelWrapper.appendChild(_label);
    wrapper.appendChild(labelWrapper);

    //main color

    let isEnabledControl, isEnabledPckr;
    {
      //isEnabledPckrDiv = this.createDiv("nik_skinner_control_group_picker");
      isEnabledControl = this.createDiv(
        "sk_checkbox_wrapper variant_two_items"
      );

      wrapper.appendChild(isEnabledControl);
      isEnabledControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.background)
      );

      isEnabledPckr = this.createColorBox(
        pickerMainColor,
        "sk_picker_trigger ",
        pickerCallback
      );
      isEnabledControl.appendChild(isEnabledPckr);
    }

    let isDarkChb;
    {
      let vb = this.verbalData(label);

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
      const onDarkChange = function (e) {
        isDarkCallback(e);
      };

      let chb = this.createCheckBox(label + "dark", "");
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
        "sk_checkbox_wrapper variant_two_items"
      );
      let chb = this.createCheckBox(label + "_g");
      isGradientEnabledChb = chb.checkbox;
      const onGradientEnableChange = function (e) {
        gradientCallback(e);
      };

      isGradientEnabledChb.addEventListener("change", onGradientEnableChange);
      wrapper.appendChild(isGradientEnabledControl);
      isGradientEnabledControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.gradient)
      );
      isGradientEnabledControl.appendChild(chb.label);
      isGradientEnabledPckr = this.createColorBox(
        pickerGradientColor,
        "sk_picker_trigger",
        picker2Callback
      );
      isGradientEnabledControl.appendChild(isGradientEnabledPckr);

      this.eventListeners.push({
        element: isGradientEnabledChb,
        type: "change",
        listener: onGradientEnableChange,
      });
    }

    //custom text

    let isCustomTextControl, isCustomTextChb, isCustomTextPckr;
    {
      isCustomTextControl = this.createDiv(
        "sk_checkbox_wrapper variant_two_items"
      );
      let chb = this.createCheckBox(label + "_text");
      isCustomTextChb = chb.checkbox;

      const onTextEnableChange = function (e) {
        isCustomTxtCb(e);
      };

      isCustomTextChb.addEventListener("change", onTextEnableChange);
      wrapper.appendChild(isCustomTextControl);
      isCustomTextControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.text)
      );
      isCustomTextControl.appendChild(chb.label);
      isCustomTextPckr = this.createColorBox(
        pickerTextColor,
        "sk_picker_trigger variant_text",
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
        "sk_checkbox_wrapper variant_two_items"
      );
      let chb = this.createCheckBox(label + "_custom_accent");
      customAccentChb = chb.checkbox;
      const onAccentEnableChange = function (e) {
        isCustomAccentCb(e);
      };
      customAccentChb.addEventListener("change", onAccentEnableChange);
      wrapper.appendChild(customAccentControl);
      customAccentControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.accent)
      );
      customAccentControl.appendChild(chb.label);
      customAccentPckr = this.createColorBox(
        pickerCustomAccentColor,
        "sk_picker_trigger variant_accent",
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
      borderControl = this.createDiv("sk_checkbox_wrapper variant_two_items");
      let chb = this.createCheckBox(label + "_border");
      borderChb = chb.checkbox;

      const onBorderEnableChange = function (e) {
        isCustomBorderCb(e);
      };

      borderChb.addEventListener("change", onBorderEnableChange);
      wrapper.appendChild(borderControl);
      borderControl.appendChild(
        this.createSpan(this.classNames.uiLabelSm, this.labelsMap.border)
      );
      borderControl.appendChild(chb.label);
      borderPckr = this.createColorBox(
        pickerBorderColor,
        "sk_picker_trigger variant_border",
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
        "sk_checkbox_wrapper sk_checkbox_wrapper-range variant_borderRadius"
      );
      radiusInput = document.createElement("input");
      radiusInput.type = "range";
      radiusInput.min = 0;
      radiusInput.max = 100;
      radiusAmount = document.createElement("input");
      radiusAmount.type = "number";
      radiusAmount.className = "sk_input_text";

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
      wrapper.appendChild(radiusControl);
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
    label.className = "sk_chb_label " + (_cn ? _cn : "");
    label.htmlFor = _id;
    icon = document.createElement("i");
    icon.className = "sk_chb " + (_cn ? _cn : "");
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
    const UISkin = {};
    UISkin.order = ["dominant", "accent", "button"];

    const bgKeyNames = [
      "nameBgHov",
      "nameBg2",
      "nameBg2Hov",
      "nameBg3",
      "nameBg3Hov",
    ];

    const txtKeyNames = ["nameTxt", "nameTxt2", "nameTxt3"];

    const createShadow = (c) => {
      return tinycolor(c).desaturate(2).darken(20).toHexString();
    };

    const createGlass = (c1, alpha) => {
      return tinycolor(c1)
        .setAlpha(alpha || 0.5)
        .toRgbString();
    };

    UISkin.order.forEach((name, i) => {
      const _vd = this.verbalData(name);
      UISkin[name] = {};
      const bg = colors[name];
      UISkin[name][_vd.nameBg] = bg;
      bgKeyNames.forEach((bgName, i) => {
        UISkin[name][_vd[bgName]] = tinycolor(bg)
          .lighten(3 * (i + 1))
          .toHexString();
      });
      const txt = guessVisibleColor(bg);

      txtKeyNames.forEach((txtName, i) => {
        console.log();

        UISkin[name][_vd[txtName]] = tinycolor(txt)
          .setAlpha(1 - (i + 1) * 0.15)
          .toRgbString();
      });

      UISkin[name][`${_vd.name}Shadow`] = createShadow(bg);
      UISkin[name][`${_vd.name}Glass`] = createGlass(0.5);
      UISkin[name][`${_vd.name}Glass2`] = createGlass(0.1);
    });
    const uiPrefix = "--sk_";
    UISkin.order.forEach((name, i) => {
      let _vd = this.verbalData(`${name}`);
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameBg}`,
        `${UISkin[name][_vd.nameBg]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameBgHov}`,
        `${UISkin[name][_vd.nameBgHov]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameBg2}`,
        `${UISkin[name][_vd.nameBg2]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameBg2Hov}`,
        `${UISkin[name][_vd.nameBg2Hov]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameBg3}`,
        `${UISkin[name][_vd.nameBg3]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameBg3Hov}`,
        `${UISkin[name][_vd.nameBg3Hov]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameTxt}`,
        `${UISkin[name][_vd.nameTxt]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameTxt2}`,
        `${UISkin[name][_vd.nameTxt2]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.nameTxt3}`,
        `${UISkin[name][_vd.nameTxt3]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.name}Shadow`,
        `${UISkin[name][`${_vd.name}Shadow`]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.name}Glass`,
        `${UISkin[name][`${_vd.name}Glass`]}`
      );
      this.skinnerRoot.style.setProperty(
        `${uiPrefix}${_vd.name}Glass2`,
        `${UISkin[name][`${_vd.name}Glass2`]}`
      );
    });
  }

  stylerInit() {}

  stylerStart() {}

  stylerClick() {}

  stylerHover(evt) {
    if (this.stylerState.isRunning) {
      evt.preventDefault();
      evt.stopPropagation();
      const path = evt.composedPath();
      const hoveredElement = path.find(
        (el) => el.matches && el.matches("[data-sk]")
      );
      if (hoveredElement) {
        let target = hoveredElement;
        let uniqueClass = target.getAttribute("data-sk");
        //let specificCn = this.generateCssPath(hoveredElement);
        let className = `[data-sk="${uniqueClass}"]`;
        let css = this.stylerHoverCss(className);
        this.stylerInjectHoverCss(css);

        const cleanup = () => {
          this.stylerInjectHoverCss("");
          target.removeEventListener("mouseleave", handleMouseOut);
        };

        const handleMouseOut = () => {
          cleanup();
        };

        target.addEventListener("mouseleave", handleMouseOut);
      }
    }
  }

  injectStyle(css) {
    const _id = "sk_custom_styler_injected";
    let styleElement = document.getElementById(_id);
    if (this.patientRoot instanceof ShadowRoot) {
      styleElement = this.patientRoot.querySelector(`#${styleId}`);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.setAttribute("id", _id);
        this.patientRoot.appendChild(styleElement);
      }
    } else {
      // Otherwise, assume the target is `document`
      styleElement = document.getElementById(_id);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.setAttribute("id", _id);
        document.head.appendChild(styleElement);
      }
    }

    this.injectedStyle = styleElement;
    this.injectedStyle.innerHTML = css;
  }

  stylerHoverCss(cn) {
    const colors = [
      "#FF637C",
      "#8144CD",
      "#7872E0",
      "#56A9E2",
      "#D2F58D",
      "#FFD76B",
    ];

    const bandSize = 16;
    const stops = [];

    colors.forEach((color, i) => {
      const start = i * 2 * bandSize;
      const mid = start + bandSize;
      const end = mid + bandSize;

      stops.push(
        `var(--sk_dominantBg) ${start}px`,
        `var(--sk_dominantBg) ${mid}px`,
        `${color} ${mid}px`,
        `${color} ${end}px`
      );
    });

    const gradientStops = stops.join(", ");

    const repeatingGradient = `repeating-linear-gradient(45deg, ${gradientStops})`;

    let css = `
@keyframes sk_custom_hover_anim {
from{
  background-position: 0 0;
}
to{
  background-position: 50% 0;
}
}


${cn}{
background-image: ${repeatingGradient} !important;
color: var(--dominantTxt) !important;
background-size: 200% 200%;
animation-duration: 10s;
animation-direction: normal;
animation-iteration-count: 88;
animation-name: sk_custom_hover_anim;
animation-timing-function: linear;
}
${cn}:nth-child(even){
animation-direction: reverse;
}

${cn} > * {
  opacity: 0.8;
}
`;

    return css;
  }
}
