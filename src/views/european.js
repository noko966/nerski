export default class ViewDemoEuropean {
  constructor(root) {
    this.root = root || document.body;

    this.demo = {
      body: null,
      sidebar: null,
      main: null,
      aside: null,
    };
  }

  createSidebarRow() {
    const el = document.createElement("div");
    el.className = "demo_sidebar_row";
    return el;
  }

  createIcon() {
    const el = document.createElement("div");
    el.className = "demo_icon";
    return el;
  }

  createText(text) {
    const el = document.createElement("span");
    el.className = "demo_text";
    el.innerText = text || "text doomy";
    return el;
  }

  createListWrapper() {
    const el = document.createElement("div");
    el.className = "demo_list_wrapper";
    return el;
  }

  createEventRow() {
    const el = document.createElement("div");
    el.className = "demo_event_row";
    return el;
  }

  createInput() {
    const el = document.createElement("input");
    el.className = "demo_event_input";
    return el;
  }

  createButton() {
    const el = document.createElement("button");
    el.className = "demo_event_button";
    return el;
  }

  createStake(text) {
    const el = document.createElement("button");
    el.className = "demo_event_stake";
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
    return el;
  }

  createEventHeader() {
    const el = document.createElement("div");
    el.className = "demo_event_header";
    return el;
  }

  createTabs(tabs) {
    const el = document.createElement("div");
    const _tabs = tabs || [{ n: "tab 1", a: true }, { n: "tab 2" }];
    _tabs.forEach((t) => {
      const tab = document.createElement("button");
      tab.innerText = t.n;
      tab.className = `demo_tab ${t.a && "state_active"}`;
      el.appendChild(tab);
    });
    el.className = "demo_tabs_row";
    return el;
  }

  createEventWidget() {
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
    const eventListWrapper = this.createListWrapper();
    [1, 1, 1, 1, 1, 1, 1].map((i) => {
      const er = this.createEventRow();
      const ht = this.createEventTeam();
      const hs = this.createEventScore();
      const at = this.createEventTeam();
      const as = this.createEventScore();
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
      const stp1 = this.createStake();
      const stx = this.createStake();
      const stp2 = this.createStake();
      sg.appendChild(stp1);
      sg.appendChild(stx);
      sg.appendChild(stp2);
      ere.appendChild(sg);

      er.appendChild(ers);
      er.appendChild(ere);
      eventListWrapper.appendChild(er);
    });

    eventRoot.appendChild(eventTabs);
    eventRoot.appendChild(eventHeader);
    eventRoot.appendChild(eventSubHeader);
    eventRoot.appendChild(eventListWrapper);

    return eventRoot;
  }

  init() {
    this.demo.body = this.createBody();
    this.demo.sidebar = this.createSidebar();
    this.demo.main = this.createMain();
    const mainListWrapper = this.createListWrapper();
    this.demo.aside = this.createAside();
    this.demo.main.appendChild(mainListWrapper);

    this.demo.body.appendChild(this.demo.sidebar);
    this.demo.body.appendChild(this.demo.main);
    this.demo.body.appendChild(this.demo.aside);

    const sidebarListWrapper = this.createListWrapper();
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i) => {
      const si = this.createSidebarRow();

      const sbria = this.createIcon();
      const sbrtf = this.createFill();
      const sbrt = this.createText();
      const sbrie = this.createIcon();

      si.appendChild(sbria);
      sbrtf.appendChild(sbrt);
      si.appendChild(sbrtf);
      si.appendChild(sbrie);

      sidebarListWrapper.appendChild(si);
    });
    const sidebarTabs = this.createTabs();
    this.demo.sidebar.appendChild(sidebarTabs);
    this.demo.sidebar.appendChild(sidebarListWrapper);

    [1, 2, 3].map((i) => {
      const eventRoot = this.createEventWidget();
      mainListWrapper.appendChild(eventRoot);
    });

    this.root.appendChild(this.demo.body);
  }
}
