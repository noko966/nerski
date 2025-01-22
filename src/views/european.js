export default class ViewDemoEuropean {
  constructor(root) {
    this.root = root || document.body;

    this.demo = {
      body: null,
      sidebar: null,
      main: null,
      aside: null,
    };

    this.eventsDataDoomy = [
      {
        homeTeam: "Doomy FC",
        awayTeam: "Gloomy United",
        homeScore: 3,
        awayScore: 2,
        stakes: {
          p1: 1.55,
          x: 3.4,
          p2: 6.0,
        },
      },
      {
        homeTeam: "Spooky Rovers",
        awayTeam: "Creepy Town",
        homeScore: 1,
        awayScore: 1,
        stakes: {
          p1: 2.2,
          x: 2.9,
          p2: 3.5,
        },
      },
      {
        homeTeam: "Monstrous City",
        awayTeam: "Haunted Wanderers",
        homeScore: 4,
        awayScore: 3,
        stakes: {
          p1: 1.9,
          x: 3.1,
          p2: 4.2,
        },
      },
      {
        homeTeam: "Spectral Squad",
        awayTeam: "Eerie Eleven",
        homeScore: 2,
        awayScore: 2,
        stakes: {
          p1: 2.4,
          x: 2.8,
          p2: 3.4,
        },
      },
    ];

    this.sidebarDataDoomy = [
      {
        group: "sport",
        items: [
          { name: "Football", count: 24 },
          { name: "Basketball", count: 15 },
          { name: "Tennis", count: 8 },
          { name: "Cricket", count: 10 },
          { name: "Hockey", count: 7 },
          { name: "Rugby", count: 9 },
          { name: "Baseball", count: 12 },
          { name: "Volleyball", count: 6 },
          { name: "American Football", count: 5 },
          { name: "Golf", count: 3 },
        ],
      },
      {
        group: "country",
        items: [
          { name: "England", count: 12 },
          { name: "Spain", count: 9 },
          { name: "France", count: 6 },
          { name: "Germany", count: 7 },
          { name: "Italy", count: 5 },
          { name: "Brazil", count: 10 },
          { name: "Argentina", count: 4 },
          { name: "Netherlands", count: 5 },
        ],
      },
      {
        group: "champ",
        items: [
          { name: "Premier League" },
          { name: "La Liga" },
          { name: "Bundesliga" },
        ],
      },
    ];
  }

  createSidebarRow(variant) {
    const el = document.createElement("div");
    el.className = "demo_sidebar_row";
    el.setAttribute("data-sk", `sidebar_${variant ? variant : "base"}`);
    return el;
  }

  createIcon(cn) {
    const el = document.createElement("div");
    el.className = `demo_icon ${cn ? cn : null}`;
    return el;
  }

  createText(text, cn) {
    const el = document.createElement("span");
    el.className = `demo_text ${cn ? cn : null}`;
    el.innerText = text || "text doomy";
    return el;
  }

  createListWrapper(cn) {
    const el = document.createElement("div");
    el.className = `demo_list_wrapper ${cn ? cn : null}`;
    return el;
  }

  createEventRow(variant) {
    const el = document.createElement("div");
    el.className = "demo_event_row";
    el.setAttribute("data-sk", `${variant ? variant : "event"}`);
    return el;
  }

  createButton(text) {
    const bw = document.createElement("div");
    bw.className = "demo_widget_input_wrapper";
    const el = document.createElement("button");
    el.className = `demo_button variant_accent`;
    el.innerText = text || "click";
    el.setAttribute("data-sk", "button");
    bw.appendChild(el);
    return bw;
  }

  createButtonSecondary(text) {
    const bw = document.createElement("div");
    bw.className = "demo_widget_input_wrapper";
    const el = document.createElement("button");
    el.className = "demo_button";
    el.innerText = text || "click";
    el.setAttribute("data-sk", "buttonSecondary");
    bw.appendChild(el);
    return bw;
  }

  createStake(text) {
    const el = document.createElement("button");
    el.className = "demo_event_stake";
    el.setAttribute("data-sk", "odd");
    el.innerText = text || "-";
    return el;
  }

  createStakeGroup() {
    const el = document.createElement("div");
    el.className = "demo_event_stake_group";
    return el;
  }

  createEventTeam(text) {
    const el = document.createElement("span");
    el.className = "demo_event_team";
    el.innerText = text || "team_name";
    return el;
  }

  createEventScore(text) {
    const el = document.createElement("span");
    el.className = "demo_event_score";
    el.setAttribute("data-sk-text", "accent");
    el.innerText = text || "0";
    return el;
  }

  createFill() {
    const el = document.createElement("div");
    el.className = "demo_fill";
    return el;
  }

  createHug() {
    const el = document.createElement("div");
    el.className = "demo_hug";
    return el;
  }

  createRow() {
    const el = document.createElement("div");
    el.className = "demo_row";
    return el;
  }

  createCol() {
    const el = document.createElement("div");
    el.className = "demo_col";
    return el;
  }

  createBody() {
    const el = document.createElement("div");
    el.className = "demo_body";
    el.id = "demo_body_unique_id";
    el.setAttribute("data-sk", "body");
    this.generateRandomCircles(10, el);
    return el;
  }

  createSidebar() {
    const el = document.createElement("div");
    el.className = "demo_sidebar_root";
    return el;
  }

  createMain() {
    const el = document.createElement("div");
    el.className = "demo_main_root";
    return el;
  }

  createAside() {
    const el = document.createElement("div");
    el.className = "demo_aside_root";
    return el;
  }

  createEventSubHeader() {
    const el = document.createElement("div");
    el.className = "demo_event_header_sub";
    el.setAttribute("data-sk", "subHeader");

    return el;
  }

  createEventHeader() {
    const el = document.createElement("div");
    el.className = "demo_event_header";
    el.setAttribute("data-sk", "header");

    return el;
  }

  createTabs(tabs) {
    const el = document.createElement("div");
    const _tabs = tabs || [{ n: "tab 1", a: true }, { n: "tab 2" }];
    _tabs.forEach((t) => {
      const tab = document.createElement("button");
      tab.innerText = t.n;
      tab.className = `demo_tab ${t.a && "state_active"}`;
      tab.setAttribute("data-sk", `${t.a ? "tabActive" : "tab"}`);

      el.appendChild(tab);
    });
    el.className = "demo_tabs_row";
    return el;
  }

  createEventWidget(events) {
    const eventRoot = document.createElement("div");
    eventRoot.className = "demo_event_root";

    const eventHeader = this.createEventHeader();
    const ehr = this.createRow();
    const eht = this.createText();
    ehr.appendChild(eht);

    const ehi = this.createIcon();
    const ehi2 = this.createIcon();
    const eventTabs = this.createTabs([
      {
        n: "1",
        a: true,
      },
      {
        n: "2",
      },
      {
        n: "3",
      },
    ]);

    eventHeader.appendChild(ehi);
    eventHeader.appendChild(ehr);
    eventHeader.appendChild(ehi2);
    const eventSubHeader = this.createEventSubHeader();
    const eventListWrapper = this.createListWrapper("variant_event");
    eventListWrapper.setAttribute("data-sk", "event_list");
    events.map((i) => {
      const er = this.createEventRow();
      const ht = this.createEventTeam(i.homeTeam);
      const hs = this.createEventScore(i.homeScore);
      const at = this.createEventTeam(i.awayTeam);
      const as = this.createEventScore(i.awayScore);
      const htr = this.createRow();
      const atr = this.createRow();
      htr.appendChild(hs);
      htr.appendChild(ht);

      atr.appendChild(as);
      atr.appendChild(at);

      const ers = this.createCol();
      ers.appendChild(htr);
      ers.appendChild(atr);

      const ere = this.createRow();

      const sg = this.createStakeGroup();
      const stp1 = this.createStake(i.stakes.p1);
      const stx = this.createStake(i.stakes.x);
      const stp2 = this.createStake(i.stakes.p2);
      sg.appendChild(stp1);
      sg.appendChild(stx);
      sg.appendChild(stp2);
      ere.appendChild(sg);

      er.appendChild(ers);
      er.appendChild(ere);
      eventListWrapper.appendChild(er);
    });

    eventRoot.appendChild(eventTabs);
    const wrapper = document.createElement("div");
    wrapper.className = "demo_widget_wrapper";
    wrapper.setAttribute("data-sk", "widget_wrapper");
    wrapper.appendChild(eventHeader);
    wrapper.appendChild(eventSubHeader);
    wrapper.appendChild(eventListWrapper);
    eventRoot.appendChild(wrapper);
    return eventRoot;
  }

  createInput() {
    const wrapper = document.createElement("div");
    const label = document.createElement("span");
    label.className = "demo_widget_input_label";
    label.innerText = "input label";
    const input = document.createElement("input");
    wrapper.className = "demo_widget_input_wrapper";
    input.className = "demo_widget_input";
    input.type = "text";
    input.value = "type here";
    input.setAttribute("data-sk", "input");
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return wrapper;
  }

  createWidget() {
    const root = document.createElement("div");
    root.className = "demo_widget_root";

    const header = document.createElement("div");
    header.className = "demo_widget_header";
    header.setAttribute("data-sk", "widget_header");

    const headerText = document.createElement("span");
    headerText.className = "demo_widget_header_title";
    headerText.innerText = "widget title";
    const content = document.createElement("div");
    content.className = "demo_widget_content";
    content.setAttribute("data-sk", "dominant");

    content.appendChild(this.createInput());
    content.appendChild(this.createInput());

    const hi = this.createIcon();
    header.appendChild(headerText);
    header.appendChild(hi);
    root.appendChild(header);
    root.appendChild(content);

    return root;
  }

  createBetslip() {
    const root = document.createElement("div");
    root.className = "demo_widget_root";

    const header = document.createElement("div");
    header.className = "demo_widget_header";
    header.setAttribute("data-sk", "widget_header");

    const headerText = document.createElement("span");
    headerText.className = "demo_widget_header_title";
    headerText.innerText = "widget title";
    const content = document.createElement("div");
    content.className = "demo_widget_content";
    content.setAttribute("data-sk", "widget_content");

    content.appendChild(this.createInput());
    content.appendChild(this.createInput());
    content.appendChild(this.createButton("place bet"));
    content.appendChild(this.createButtonSecondary("book a bet"));

    const hi = this.createIcon();
    header.appendChild(headerText);
    header.appendChild(hi);
    root.appendChild(header);
    root.appendChild(content);

    return root;
  }

  generateRandomCircles(count, parent) {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );
    svg.setAttribute("preserveAspectRatio", "none");

    const w = window.innerWidth;
    svg.setAttribute("width", w);
    svg.setAttribute("height", w);

    // path.setAttribute("vector-effect", "non-scaling-stroke");

    // Append the SVG to the container
    parent.appendChild(svg);
    // Get the actual width and height of the SVG container

    // 2. CREATE A <defs> SECTION AND DEFINE A FILTER
    const defs = document.createElementNS(svgNS, "defs");

    // Create a simple drop-shadow filter
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "blr");
    // feGaussianBlur
    const feGaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
    feGaussianBlur.setAttribute("in", "offset");
    feGaussianBlur.setAttribute("stdDeviation", "6");
    feGaussianBlur.setAttribute("result", "blur");
    filter.appendChild(feGaussianBlur);

    // Append filter to defs, and defs to svg
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Create 'count' random circles
    for (let i = 0; i < count; i++) {
      // Create an SVG circle element
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );

      // Generate random position, radius, and color
      const cx = Math.random() * w; // random x in the range [0, svgWidth)
      const cy = Math.random() * w; // random y in the range [0, svgHeight)
      const r = 10 + Math.random() * 30; // radius between 10 and 40
      const fillsArr = [
        "var(--accentBg)",
        "var(--accentBg)",
        "var(--accentBg)",
        "var(--eventBg)",
        "var(--eventBg2)",
      ];

      circle.setAttribute("filter", "url(#blr)");

      let fillIndex = Math.ceil(Math.random() * fillsArr.length);

      // Set circle attributes
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", fillsArr[fillIndex]);

      // Append the circle to our SVG
      svg.appendChild(circle);
    }
  }

  init() {
    this.demo.body = this.createBody();
    this.demo.sidebar = this.createSidebar();
    this.demo.main = this.createMain();
    const mainListWrapper1 = this.createListWrapper();
    const mainListWrapper2 = this.createListWrapper();
    this.demo.aside = this.createAside();
    this.demo.main.appendChild(mainListWrapper1);
    this.demo.main.appendChild(mainListWrapper2);

    this.demo.body.appendChild(this.demo.sidebar);
    this.demo.body.appendChild(this.demo.main);
    this.demo.body.appendChild(this.demo.aside);

    const sidebarListWrapper = this.createListWrapper();
    this.sidebarDataDoomy.forEach((element, index) => {
      const group = document.createElement("div");
      group.className = `demo_sidebar_items_list_group variant_${element.group}`;
      group.setAttribute("data-sk", "sidebar_list");
      element.items.forEach((it, index) => {
        const si = this.createSidebarRow(element.group);

        const sbria = this.createIcon("variant_icon");
        const sbrtf = this.createFill();
        const sbrt = this.createText(it.name);
        const sbrc = this.createText(it.count, "variant_count");
        const sbrie = this.createIcon("variant_arrow");

        si.appendChild(sbria);
        sbrtf.appendChild(sbrt);
        sbrtf.appendChild(sbrc);
        si.appendChild(sbrtf);
        si.appendChild(sbrie);
        group.appendChild(si);
      });
      sidebarListWrapper.appendChild(group);
    });

    const sidebarTabs = this.createTabs();
    this.demo.sidebar.appendChild(sidebarTabs);
    this.demo.sidebar.appendChild(sidebarListWrapper);

    [1, 2, 3].map((i) => {
      const eventRoot = this.createEventWidget(this.eventsDataDoomy);
      mainListWrapper1.appendChild(eventRoot);
    });

    [1, 2, 3].map((i) => {
      const eventRoot = this.createEventWidget(this.eventsDataDoomy);
      mainListWrapper2.appendChild(eventRoot);
    });

    this.root.appendChild(this.demo.body);

    const w1 = this.createWidget();
    const w2 = this.createWidget();

    this.demo.aside.appendChild(w1);
    this.demo.aside.appendChild(w2);
    this.demo.aside.appendChild(this.createBetslip());
  }
}
