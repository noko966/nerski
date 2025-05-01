window.colors = {
  body: {
    Background: {
      isDark: false,
      color: "#101010",
    },
    borderRadius: 10,
  },
  accent: {
    Background: {
      color: "#FF8600",
    },
  },
  dominant: {
    Background: {
      color: "#353535",
    },
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
  odd: {
    Background: {
      color: "#000",
    },
  },
  oddActive: {
    Background: {
      color: "#ffb700",
    },
  },
  showMore: {
    Background: {
      color: "#666",
    },
  },
  header: {
    Background: {
      color: "#333",
    },
    Gradient: {
      color: "#555",
    },
    Text: {
      color: "#ffb700",
    },
  },
  subHeader: {
    Background: {
      color: "#2b2b2b",
    },
  },
  event: {
    Background: {
      color: "#666",
    },
  },
  menu_1: {
    Background: {
      color: "#666",
    },
  },
  menu_2: {
    Background: {
      color: "#666",
    },
  },
  menu_3: {
    Background: {
      color: "#666",
    },
  },
  modal: {
    Background: {
      color: "#333",
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
  tabSecondaryActive: {
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
  filter: {
    Background: {
      color: "#2b2b2b",
    },
  },
  tooltip: {
    Background: {
      color: "#2b2b2b",
    },
  },
  betSlip: {
    Background: {
      color: "#333",
    },
  },
  betSlipStake: {
    Background: {
      color: "#444",
    },
  },
  betSlipInput: {
    Background: {
      color: "#262626",
    },
  },
  betSlipButton: {
    Background: {
      color: "#1A1A1A",
    },
  },
};

function createCss(c) {
  let css = `
:host,
:root,
:root[data-theme],
#sport-modern-view,
#sport-modern-view[data-theme] {
${createCssString(c)}
}`;

  let results = {
    css: css,
    name: "modern",
  };

  if (window.colorsUpdateTimer) {
    clearTimeout(window.colorsUpdateTimer);
  }

  window.colorsUpdateTimer = setTimeout(setOrUpdateIframeCss, 200, results.css);

  return results;
}
