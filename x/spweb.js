window.colors = {
    body: {
        Background: {
            isDark: false,
            color: "#101010"
        },
        borderRadius: 10
    },
    accent: {
        Background: {
            color: "#FF8600"
        },
    },
    dominant: {
        Background: {
            color: "#353535"
        },
    },
    button: {
        Background: {
            color: "#177B17"
        },
    },
    buttonSecondary: {
        Background: {
            color: "#333"
        },
    },
    odd: {
        Background: {
            color: "#000"
        },
    },
    oddActive: {
        Background: {
            color: "#ffb700"
        },
    },
    showMore: {
        Background: {
            color: "#666"
        },
    },
    header: {
        Background: {
            color: "#333"
        },
        Gradient: {
            color: "#555"
        },
        Text: {
            color: "#ffb700"
        },
    },
    subHeader: {
        Background: {
            color: "#2b2b2b"
        },
    },
    event: {
        Background: {
            color: "#666"
        },
    },
    menu_1: {
        Background: {
            color: "#666"
        },
    },
    menu_2: {
        Background: {
            color: "#666"
        },
    },
    menu_3: {
        Background: {
            color: "#666"
        },
    },
    modal: {
        Background: {
            color: "#333"
        },
    },
    tab: {
        Background: {
            color: "#2b2b2b"
        },
    },
    tabActive: {
        Background: {
            color: "#333"
        },
    },
    tabSecondaryActive: {
        Background: {
            color: "#333"
        },
    },
    input: {
        Background: {
            color: "#333"
        },
    },
    inputSecondary: {
        Background: {
            color: "#2b2b2b"
        },
    },
    filter: {
        Background: {
            color: "#2b2b2b"
        },
    },
    tooltip: {
        Background: {
            color: "#2b2b2b"
        },
    },
    betSlip: {
        Background: {
            color: "#333"
        },
    },
    betSlipStake: {
        Background: {
            color: "#444"
        },
    },
    betSlipInput: {
        Background: {
            color: "#262626"
        },
    },
    betSlipButton: {
        Background: {
            color: "#1A1A1A"
        },
    },
};

function createCss(c) {

    let css = `
    :root,
	:root[data-theme], :host {
        --bodyBg:  ${c.bodyBg};
        --bodyBg2:  ${c.bodyBg2};
        --bodyBg3: ${c.bodyBg3};  
        --bodyBgHover:  ${c.bodyBgHover};
        --bodyBg2Hover:  ${c.bodyBg2Hover};
        --bodyBg3Hover: ${c.bodyBg3Hover};
        --bodyRGBA:  ${c.bodyRGBA};
        --bodyRGBA2:  ${c.bodyRGBA2};
        --bodyRGBA3:  ${c.bodyRGBA3};
        --bodyTxt: ${c.bodyTxt};
        --bodyTxt2: ${c.bodyTxt2};
        --bodyTxt3: ${c.bodyTxt3};
        --bodyAccent: ${c.bodyAccent};
        --bodyAccentTxt: ${c.bodyAccentTxt};
        --bodyBorder:  ${c.bodyBorder};
        --bodyRadius:  ${c.bodyRadius}px;

        --dominantG: ${c.dominantG};
        --dominantRGBA: ${c.dominantRGBA};
        --dominantRGBA2: ${c.dominantRGBA2};
        --dominantRGBA3: ${c.dominantRGBA3};
        --dominantBg: ${c.dominantBg};
        --dominantBg2: ${c.dominantBg2};
        --dominantBg3: ${c.dominantBg3};
        --dominantBgHover: ${c.dominantBgHover};
        --dominantBg2Hover: ${c.dominantBg2Hover};
        --dominantBg3Hover: ${c.dominantBg3Hover};
        --dominantAccent: ${c.dominantAccent};
        --dominantAccentTxt: ${c.dominantAccentTxt};
        --dominantTxt: ${c.dominantTxt};
        --dominantTxt2: ${c.dominantTxt2};
        --dominantTxt3: ${c.dominantTxt3};
        --dominantTxtInverse: ${c.dominantTxtInverse}; 
        --dominantRadius: ${c.dominantRadius}px;
    
        --accentBg: ${c.accentBg};
        --accentBg2:  ${c.accentBg2};
        --accentBg3: ${c.accentBg3};
        --accentBgHover:  ${c.accentBgHover};
        --accentBg2Hover:  ${c.accentBg2Hover};
        --accentBg3Hover:  ${c.accentBg3Hover};
        --accentG: ${c.accentG};
        --accentTxt: ${c.accentTxt};
        --accentTxt2: ${c.accentTxt2};
        --accentTxt3: ${c.accentTxt3};        
      
        --buttonG: ${c.buttonG};
        --buttonBg:  ${c.buttonBg};
        --buttonBg2:  ${c.buttonBg2};
        --buttonBg3:  ${c.buttonBg3};
        --buttonBgHover:  ${c.buttonBgHover};
        --buttonBg2Hover:  ${c.buttonBg2Hover};
        --buttonBg3Hover:  ${c.buttonBg3Hover};
        --buttonTxt: ${c.buttonTxt};
        --buttonTxt2: ${c.buttonTxt2};
        --buttonTxt3: ${c.buttonTxt3};
        --buttonAccent: ${c.buttonAccent};
        --buttonAccentTxt: ${c.buttonAccentTxt};
        --buttonBorder: ${c.buttonBorder};
        --buttonRadius: ${c.buttonRadius}px;

        --buttonSecondaryG: ${c.buttonSecondaryG};
        --buttonSecondaryBg:  ${c.buttonSecondaryBg};
        --buttonSecondaryBg2:  ${c.buttonSecondaryBg2};
        --buttonSecondaryBg3:  ${c.buttonSecondaryBg3};
        --buttonSecondaryBgHover:  ${c.buttonSecondaryBgHover};
        --buttonSecondaryBg2Hover:  ${c.buttonSecondaryBg2Hover};
        --buttonSecondaryBg3Hover:  ${c.buttonSecondaryBg3Hover};
        --buttonSecondaryTxt: ${c.buttonSecondaryTxt};
        --buttonSecondaryTxt2: ${c.buttonSecondaryTxt2};
        --buttonSecondaryTxt3: ${c.buttonSecondaryTxt3};
        --buttonSecondaryAccent: ${c.buttonSecondaryAccent}; 
        --buttonSecondaryAccentTxt: ${c.buttonSecondaryAccentTxt};
        --buttonSecondaryBorder: ${c.buttonSecondaryBorder};
        --buttonSecondaryRadius: ${c.buttonSecondaryRadius}px;

        --inputG: ${c.inputG};
        --inputBg: ${c.inputBg};
        --inputBg2: ${c.inputBg2};
        --inputBg3: ${c.inputBg3}; 
        --inputBgHover: ${c.inputBgHover};
        --inputBg2Hover: ${c.inputBg2Hover};
        --inputBg3Hover: ${c.inputBg3Hover};
        --inputTxt:  ${c.inputTxt};
        --inputTxt2: ${c.inputTxt2};
        --inputTxt3: ${c.inputTxt3};
        --inputAccent: ${c.inputAccent};
        --inputAccentTxt: ${c.inputAccentTxt};
        --inputRadius: ${c.inputRadius}px;        
        --inputBorder: ${c.inputBorder};  

        --inputSecondaryG: ${c.inputSecondaryG};
        --inputSecondaryBg: ${c.inputSecondaryBg};
        --inputSecondaryBg2: ${c.inputSecondaryBg2};
        --inputSecondaryBg3: ${c.inputSecondaryBg3}; 
        --inputSecondaryBgHover: ${c.inputSecondaryBgHover};
        --inputSecondaryBg2Hover: ${c.inputSecondaryBg2Hover};
        --inputSecondaryBg3Hover: ${c.inputSecondaryBg3Hover};
        --inputSecondaryTxt:  ${c.inputSecondaryTxt};
        --inputSecondaryTxt2: ${c.inputSecondaryTxt2};
        --inputSecondaryTxt3: ${c.inputSecondaryTxt3};
        --inputSecondaryAccent: ${c.inputSecondaryAccent};
        --inputSecondaryAccentTxt: ${c.inputSecondaryAccentTxt};
        --inputSecondaryRadius: ${c.inputSecondaryRadius}px;        
        --inputSecondaryBorder: ${c.inputSecondaryBorder};   

        --headerG: ${c.headerG};
        --headerBg: ${c.headerBg};
        --headerBg2: ${c.headerBg2};
        --headerBg3: ${c.headerBg3};
        --headerBgHover: ${c.headerBgHover};
        --headerBg2Hover: ${c.headerBg2Hover};
        --headerBg3Hover: ${c.headerBg3Hover};
        --headerTxt: ${c.headerTxt};
        --headerTxt2: ${c.headerTxt2};
        --headerTxt3: ${c.headerTxt3};
        --headerAccent: ${c.headerAccent};
        --headerAccentTxt: ${c.headerAccentTxt};
        --headerBorder: ${c.headerBorder};
        --headerRadius: ${c.headerRadius}px;

        --subHeaderG: ${c.subHeaderG};
        --subHeaderBg: ${c.subHeaderBg};
        --subHeaderBg2: ${c.subHeaderBg2};
        --subHeaderBg3: ${c.subHeaderBg3};
        --subHeaderBgHover: ${c.subHeaderBgHover};
        --subHeaderBg2Hover: ${c.subHeaderBg2Hover};
        --subHeaderBg3Hover: ${c.subHeaderBg3Hover};
        --subHeaderTxt: ${c.subHeaderTxt};
        --subHeaderTxt2: ${c.subHeaderTxt2};
        --subHeaderTxt3: ${c.subHeaderTxt3};
        --subHeaderAccent: ${c.subHeaderAccent};
        --subHeaderAccentTxt: ${c.subHeaderAccentTxt};
        --subHeaderBorder: ${c.subHeaderBorder};
        --subHeaderRadius: ${c.subHeaderRadius}px;

        --eventG: ${c.eventG};
        --eventBg: ${c.eventBg};
        --eventBg2: ${c.eventBg2};
        --eventBg3: ${c.eventBg3};  
        --eventBgHover: ${c.eventBgHover};
        --eventBg2Hover: ${c.eventBg2Hover};
        --eventBg3Hover: ${c.eventBg3Hover};
        --eventTxt: ${c.eventTxt};
        --eventTxt2: ${c.eventTxt2};
        --eventTxt3: ${c.eventTxt3};
        --eventAccent: ${c.eventAccent};
        --eventAccentTxt: ${c.eventAccentTxt};
        --eventBorder: ${c.eventBorder};
        --eventRadius:  ${c.eventRadius}px;

        --modalG: ${c.modalG};
        --modalBg: ${c.modalBg};
        --modalBg2: ${c.modalBg2};
        --modalBg3: ${c.modalBg3};
        --modalBgHover: ${c.modalBgHover};
        --modalBg2Hover: ${c.modalBg2Hover};
        --modalBg3Hover: ${c.modalBg3Hover};
        --modalTxt: ${c.modalTxt};
        --modalTxt2: ${c.modalTxt2};
        --modalTxt3: ${c.modalTxt3};
        --modalAccent: ${c.modalAccent};
        --modalAccentTxt: ${c.modalAccentTxt};
        --modalRadius: ${c.modalRadius}px;
        --modalBorder: ${c.modalBorder};
 
        --oddG: ${c.oddG};
        --oddBg: ${c.oddBg};
        --oddBg2: ${c.oddBg2};
        --oddBg3: ${c.oddBg3}; 
        --oddBgHover: ${c.oddBgHover};
        --oddBg2Hover: ${c.oddBg2Hover};
        --oddBg3Hover: ${c.oddBg3Hover};
        --oddTxt: ${c.oddTxt};
        --oddTxt2: ${c.oddTxt2};
        --oddTxt3: ${c.oddTxt3};
        --oddAccent: ${c.oddAccent};
        --oddAccentTxt: ${c.oddAccentTxt};
        --oddRadius: ${c.oddRadius}px;
        --oddBorder: ${c.oddBorder};

        --oddActiveG: ${c.oddActiveG};
        --oddActiveBg: ${c.oddActiveBg};
        --oddActiveBg2: ${c.oddActiveBg2};
        --oddActiveBg3: ${c.oddActiveBg3};  
        --oddActiveBgHover: ${c.oddActiveBgHover};
        --oddActiveBg2Hover: ${c.oddActiveBg2Hover};
        --oddActiveBg3Hover: ${c.oddActiveBg3Hover};
        --oddActiveTxt: ${c.oddActiveTxt};
        --oddActiveTxt2: ${c.oddActiveTxt2};
        --oddActiveTxt3: ${c.oddActiveTxt3};
        --oddActiveAccent: ${c.oddActiveAccent};
        --oddActiveAccentTxt: ${c.oddActiveAccentTxt};
        --oddActiveRadius: ${c.oddActiveRadius}px;
        --oddActiveBorder: ${c.oddActiveBorder};
 
        --showMoreG: ${c.showMoreG};
        --showMoreBg: ${c.showMoreBg};
        --showMoreBg2: ${c.showMoreBg2};
        --showMoreBg3: ${c.showMoreBg3}; 
        --showMoreBgHover: ${c.showMoreBgHover};
        --showMoreBg2Hover: ${c.showMoreBg2Hover};
        --showMoreBg3Hover: ${c.showMoreBg3Hover};
        --showMoreTxt: ${c.showMoreTxt};
        --showMoreTxt2: ${c.showMoreTxt2};
        --showMoreTxt3: ${c.showMoreTxt3};
        --showMoreAccent: ${c.showMoreAccent};
        --showMoreAccentTxt: ${c.showMoreAccentTxt};
        --showMoreRadius: ${c.showMoreRadius}px;
        --showMoreBorder: ${c.showMoreBorder};


        --tabG: ${c.tabG};
        --tabBg: ${c.tabBg};
        --tabBg2: ${c.tabBg2};
        --tabBg3: ${c.tabBg3};
        --tabBgHover: ${c.tabBgHover};
        --tabBg2Hover: ${c.tabBg2Hover};
        --tabBg3Hover: ${c.tabBg3Hover};
        --tabTxt: ${c.tabTxt};
        --tabTxt2: ${c.tabTxt2};
        --tabTxt3: ${c.tabTxt3};
        --tabAccent: ${c.tabAccent};
        --tabAccentTxt: ${c.tabAccentTxt};
        --tabRadius: ${c.tabRadius}px;
        --tabBorder: ${c.tabBorder};

        --tabActiveG: ${c.tabActiveG};
        --tabActiveBg: ${c.tabActiveBg};
        --tabActiveBg2: ${c.tabActiveBg2};
        --tabActiveBg3: ${c.tabActiveBg3};
        --tabActiveBgHover: ${c.tabActiveBgHover};
        --tabActiveBg2Hover: ${c.tabActiveBg2Hover};
        --tabActiveBg3Hover: ${c.tabActiveBg3Hover};
        --tabActiveTxt: ${c.tabActiveTxt};
        --tabActiveTxt2: ${c.tabActiveTxt2};
        --tabActiveTxt3: ${c.tabActiveTxt3};
        --tabActiveAccent: ${c.tabActiveAccent};
        --tabActiveAccentTxt: ${c.tabActiveAccentTxt};
        --tabActiveRadius: ${c.tabActiveRadius}px;
        --tabActiveBorder: ${c.tabActiveBorder}; 

        --tabSecondaryActiveG: ${c.tabSecondaryActiveG};
        --tabSecondaryActiveBg: ${c.tabSecondaryActiveBg};
        --tabSecondaryActiveBg2: ${c.tabSecondaryActiveBg2};
        --tabSecondaryActiveBg3: ${c.tabSecondaryActiveBg3};
        --tabSecondaryActiveBgHover: ${c.tabSecondaryActiveBgHover};
        --tabSecondaryActiveBg2Hover: ${c.tabSecondaryActiveBg2Hover};
        --tabSecondaryActiveBg3Hover: ${c.tabSecondaryActiveBg3Hover};
        --tabSecondaryActiveTxt: ${c.tabSecondaryActiveTxt};
        --tabSecondaryActiveTxt2: ${c.tabSecondaryActiveTxt2};
        --tabSecondaryActiveTxt3: ${c.tabSecondaryActiveTxt3};
        --tabSecondaryActiveAccent: ${c.tabSecondaryActiveAccent};
        --tabSecondaryActiveAccentTxt: ${c.tabSecondaryActiveAccentTxt};
        --tabSecondaryActiveRadius: ${c.tabSecondaryActiveRadius}px;
        --tabSecondaryActiveBorder: ${c.tabSecondaryActiveBorder}; 

        --filterG: ${c.filterG};
        --filterBg: ${c.filterBg};
        --filterBg2: ${c.filterBg2};
        --filterBg3: ${c.filterBg3};
        --filterBgHover: ${c.filterBgHover};
        --filterBg2Hover: ${c.filterBg2Hover};
        --filterBg3Hover: ${c.filterBg3Hover};
        --filterTxt: ${c.filterTxt};
        --filterTxt2: ${c.filterTxt2};
        --filterTxt3: ${c.filterTxt3};
        --filterAccent: ${c.filterAccent};
        --filterAccentTxt: ${c.filterAccentTxt};
        --filterRadius: ${c.filterRadius}px;
        --filterBorder: ${c.filterBorder}; 

        --menu_1G: ${c.menu_1G};
        --menu_1Bg: ${c.menu_1Bg};
        --menu_1Bg2: ${c.menu_1Bg2};
        --menu_1Bg3: ${c.menu_1Bg3};
        --menu_1BgHover: ${c.menu_1BgHover};
        --menu_1Bg2Hover: ${c.menu_1Bg2Hover};
        --menu_1Bg3Hover: ${c.menu_1Bg3Hover};
        --menu_1Txt: ${c.menu_1Txt};
        --menu_1Txt2: ${c.menu_1Txt2};
        --menu_1Txt3: ${c.menu_1Txt3};
        --menu_1Accent: ${c.menu_1Accent};
        --menu_1AccentTxt: ${c.menu_1AccentTxt};
        --menu_1Radius: ${c.menu_1Radius}px;
        --menu_1Border: ${c.menu_1Border}; 

        --menu_2G: ${c.menu_2G};
        --menu_2Bg: ${c.menu_2Bg};
        --menu_2Bg2: ${c.menu_2Bg2};
        --menu_2Bg3: ${c.menu_2Bg3};
        --menu_2BgHover: ${c.menu_2BgHover};
        --menu_2Bg2Hover: ${c.menu_2Bg2Hover};
        --menu_2Bg3Hover: ${c.menu_2Bg3Hover};
        --menu_2Txt: ${c.menu_2Txt};
        --menu_2Txt2: ${c.menu_2Txt2};
        --menu_2Txt3: ${c.menu_2Txt3};
        --menu_2Accent: ${c.menu_2Accent};
        --menu_2AccentTxt: ${c.menu_2AccentTxt};
        --menu_2Radius: ${c.menu_2Radius}px;
        --menu_2Border: ${c.menu_2Border}; 

        --menu_3G: ${c.menu_3G};
        --menu_3Bg: ${c.menu_3Bg};
        --menu_3Bg2: ${c.menu_3Bg2};
        --menu_3Bg3: ${c.menu_3Bg3};
        --menu_3BgHover: ${c.menu_3BgHover};
        --menu_3Bg2Hover: ${c.menu_3Bg2Hover};
        --menu_3Bg3Hover: ${c.menu_3Bg3Hover};
        --menu_3Txt: ${c.menu_3Txt};
        --menu_3Txt2: ${c.menu_3Txt2};
        --menu_3Txt3: ${c.menu_3Txt3};
        --menu_3Accent: ${c.menu_3Accent};
        --menu_3AccentTxt: ${c.menu_3AccentTxt};
        --menu_3Radius: ${c.menu_3Radius}px;
        --menu_3Border: ${c.menu_3Border}; 

        --tooltipG: ${c.tooltipG};
        --tooltipBg: ${c.tooltipBg};
        --tooltipBg2: ${c.tooltipBg2};
        --tooltipBg3: ${c.tooltipBg3};
        --tooltipBgHover: ${c.tooltipBgHover};
        --tooltipBg2Hover: ${c.tooltipBg2Hover};
        --tooltipBg3Hover: ${c.tooltipBg3Hover};
        --tooltipTxt: ${c.tooltipTxt};
        --tooltipTxt2: ${c.tooltipTxt2};
        --tooltipTxt3: ${c.tooltipTxt3};
        --tooltipAccent: ${c.tooltipAccent};
        --tooltipAccentTxt: ${c.tooltipAccentTxt};
        --tooltipRadius: ${c.tooltipRadius}px;
        --tooltipBorder: ${c.tooltipBorder}; 

           /* Old betslip */
        --betSlipBg: ${c.betSlipBg};
        --betSlipBg2: ${c.betSlipBg2};
        --betSlipBorder: ${c.betSlipBorder};
        --betSlipTxt: ${c.betSlipTxt};
        --betSlipTxt2: ${c.betSlipTxt2};

        --betSlipStakeG: ${c.betSlipStakeG};
        --betSlipStakeBg: ${c.betSlipStakeBg};
        --betSlipStakeTxt: ${c.betSlipStakeTxt};
        --betSlipStakeTxt2: ${c.betSlipStakeTxt2};

        --betSlipInputG: ${c.betSlipInputG};
        --betSlipInputTxt: ${c.betSlipInputTxt};

        --betSlipButtonG: ${c.betSlipButtonG};
        --betSlipButtonBg2: ${c.betSlipButtonBg2};
        --betSlipButtonTxt: ${c.betSlipButtonTxt};
        --betSlipButtonRadius: ${c.betSlipButtonRadius}px;
        

        --spritePositionX: ${c.menu_1Txt == '#000' ? -24 : 0}px;
    }

    [class^='digi_tournament_']:before, [class*='digi_tournament_']:before {
        background-position-x: var(--spritePositionX) !important;
    }

    .tg_widget_heading_1{
        margin-top: 0;
    }
    .tg__multi_game {
        padding: 0 !important;
    }
    .tg_input::placeholder{
        color: var(--inputTxt2);
    }
    /* - - - - body - - - - */

    body,
    .tg_bg,
    .tg__result_item {
        background-color: var(--bodyBg);
        color: var(--bodyTxt);
    }
    
    .paperView .champ_list:last-child,
    .tg--border-bot-1 {
        border-color:var(--bodyBg);
    }

    .tg--pos_comb_row{
        border-color:var(--modalBorder);
    }

    .tg__one_game,
    .tg__match_item_stake{
        border-color: var(--eventBorder);
    }

    .tg__one_game_score{
        color: var(--eventAccent) !important;
    }

    .tg__submenu__item {
        color: var(--bodyTxt2);
    }
    .tg__submenu__item.active,
    .tg__submenu__item:hover {
        color: var(--bodyTxt);
    }

    #line_tabs .selectorWrapper, 
    #live_tabs_header .selectorWrapper, 
    #line_tabs .tabsWithMarketFilter, 
    #live_tabs_header .tabsWithMarketFilter{
        background-color: var(--bodyBg);
    }
    .tg__btn-action { 
        background: var(--buttonG) !important;
        color: var(--buttonTxt) !important;
    }
    /* - - - - Widget - - - - - */
    .tg__live_list_header {
        background-color: var(--headerG);
        color: var(--headerTxt);
    }

    .tg__multiview_content {
        background-color: var(--eventG);
        color: var(--eventTxt);
    }

    .tg-hero{
        background-color: var(--dominantBg);
        color: var(--dominantTxt);
    }
    .tg-bg_transparent{
        background-color: var(--dominantRGBA2);
        border: 1px solid var(--dominantRGBA3);
        border-radius: var(--dominantRadius);
    }

    /* - - - - Left Menu Level 1 - - - - */
    .tg__left_menu_item--lvl1 {
        background: var(--menu_1G);
        color: var(--menu_1Txt);
        border-color: var(--menu_1Border);
    }

    .tg__left_menu_item--lvl1:hover {
        background: var(--menu_1BgHover);
        color: var(--menu_1Txt);
    }

    .tg__left_menu_item--lvl1 .tg__left_menu_item_text {
        color: var(--menu_1Txt);
    }
    
    .tg__left_menu_item--lvl1  .tg-ico-arrow {
        color: var(--menu_1Txt3);
    }
    
    .ss__step_slider .ss__slider,
    .ss__step_slider .ss__ruller > div {
        background: var(--dominantTxt2);
    }
    
    .ss__step_slider .ss__slider:hover {
        background: var(--accentBg);
    }
    
    .ss__step_slider .ss__ruller > .off {
        background: var(--dominantBg);
    }
    
    /* - - - - Left Menu Level 2 - - - - */
    .tg__left_menu_item--lvl2{
        background: var(--menu_2G);
        color: var(--menu_2Txt);
        border-color: var(--menu_2Border);
    }

    .tg__left_menu_item--lvl2:hover{
        background: var(--menu_2BgHover);
        color: var(--menu_2Txt);
    }

    .tg__left_menu_item--lvl2 .tg__left_menu_item_text{
        color: var(--menu_2Txt);
    }

    .tg__left_menu_item--lvl2  .tg-ico-arrow {
        color: var(--menu_2Txt3);
    }
    
    /* africanView */
    .africanView .SBhead {
        background: var(--headerG);
        color: var(--headerTxt);
    }

    .africanView .gameContentTitle {
        background: var(--bodyBg);
        color: var(--bodyTxt);
    }

    .africanView .champCont{
        background: var(--eventG);
        color: var(--eventTxt);
    }
    
    .africanView .tg_left_tabs {
        background: var(--subHeaderG);
        color: var(--subHeaderTxt2);
        border-bottom-color: var(--accentBg);
    }
    
    .africanView .tg_left_filter_tabs_active {
        color: var(--accentBg);
    }

    /* - - - - Left Menu Level 3 - - - - */
    .tg__left_menu_item--lvl3,
    .tg__list_row_heading{
        background: var(--menu_3G);
        color: var(--menu_3Txt);
        border-color: var(--menu_3Border);
    }
    .live_menu_item_left_header{
        background: var(--subHeaderG);
        color: var(--subHeaderTxt2);
    }
    .live_menu_item_left{
        border-color: var(--menu_3Border);
    }

    .tg__left_menu_item--lvl3 .tg__left_menu_item_text{
        color: var(--menu_3Txt);
    }
    
    .tg__left_menu_item--lvl3  .tg-ico-arrow {
        color: var(--menu_3Txt3);
    }

    .dg_game_tabs{
        padding: 0 var(--headerRadius);
    }
    
    /* - - - - Passive Tab - - - - */
    .tab_selector {
        background: var(--tabG);
        color: var(--tabTxt2);
        border-top-left-radius: var(--tabRadius);
        border-top-right-radius: var(--tabRadius);
    }
    
     .sportLeftPane .tab_selector  {
        background: var(--tabG);
        color: var(--tabTxt);
    } 

    .tg__coupon_tabs_cont {
        padding-top: 2px;
        margin-bottom: 2px;
    }
    .tab_cupon {
        background: var(--tabG);
        color: var(--tabTxt2);
    }

    .tab_cupon.tab_selected,
    .tab_cupon:hover {
        background: var(--tabActiveG);
        color: var(--tabActiveTxt);
    }

    /* - - - - Active Tab - - - - */
    .tab_selector.tab_selector_active,
    .tab_selector:hover,
    .tg_subheader_btn,
    .tg__live_filter_item {
      background: var(--tabActiveG);
      color: var(--tabActiveTxt);
    }

    .tg__live_filter_item.checked {
        background: var(--tabG);
        color: var(--tabTxt);
    }
    
    .sportLeftPane .tab_selector.tab_selector_active, 
    .tg__step_slider,
    .liveFilterContainer {
        background: var(--tabActiveG);
        color: var(--tabActiveTxt);
    }
    
    .tg__step_slider{
        border-color: var(--menu_1Border);
    }

    /* - - - - Header - - - - */
    .gameContentTitle,
    .tg__result_group_heading {
        background: var(--headerG);
        color: var(--headerTxt);
        border-top-left-radius: var(--headerRadius);
        border-top-right-radius: var(--headerRadius);
    }

    .gameContentTitle .tg-ico-arrow{
        color: var(--headerTxt3);
    }
    
    /* africanView */
    .africanView .tg--home2__stakeItem {
        background: var(--tabG);
        color: var(--tabTxt);    
    }
    .africanView .champCont {
        margin: 0px;
    }

    .tg--selected_prem_game{
        border: 0;
    }

    .tg__list_row{
        margin: 0;
        border-top:1px solid var(--bodyBg);
    }
    .ds--myacc-history_list .tg_bet_history_order_row{
        background: var(--menu_1Bg);
        color: var(--menu_1Txt2);
        border-color : var(--menu_1Border);
    }
    .ds--myacc-history_list .tg_bet_history_order_row:nth-child(Odd){
        background: var(--menu_1BgHover);
    }
    .tg_bet_history_order_row .tg-clr-akcent{
        color: var(--accentBg);
    }
    .tg_bet_history_order_row_sub {
        background: var(--menu_3Bg);
        color: var(--menu_3Txt2);
        border-color: var(--menu_3Border);
    }
    .tg_bet_history_order_row_sub:nth-child(Odd) {
        background: var(--menu_3BgHover);
    }
    
    /* - - - - SubHeader - - - - */
    .tg__calendar_header,
    .tg__calendar_cont,
    .tg__res_rus,
    .overViewDataDanel .tg__btn_arrow  {
        background: var(--subHeaderG);
        color: var(--subHeaderTxt);
        border-top-left-radius: var(--subHeaderRadius);
        border-top-right-radius: var(--subHeaderRadius);
    }

    .tg__results_header {
        background: var(--filterBg2);
        color: var(--filterTxt);
    }

    .tg__home_game_heading {
        background: var(--subHeaderG);
        color: var(--subHeaderTxt2);
    }

    /* - - - - Single Game - - - - */
    .tg__one_game,
    .tg__match_item_stake,
    .tg__banner,
    .prematch_event_odds_container,
    .tg__multi_game,
    .live_menu_item_left .tg--left_live_odds,
    .tg__calendar_item,
    .tg_onegame_chb,
    .news_slider .oddsContainer{
        background: var(--eventG);
        color: var(--eventTxt2);
    }

    .dg1{
        background: var(--eventG);
        color: var(--eventTxt2);
        margin-bottom: 0;
        border-bottom: 1px solid var(--eventBorder);
    }

    .tg__one_game:hover{
        background: var(--eventBgHover);
        color: var(--eventTxt2);
    }

    /*popups*/
    .tg_popup_body_static,
    .tg__modal,
    .tg__modal_big,
    .tg__cashout--wrapper{
        background: var(--modalBg);
        color: var(--modalTxt);
        border-radius: var(--modalRadius);
    }
    .tg__modal_header,
    .tg__modal_heading,
    .tg__cashout--header,
    .tg__modal_header-sm{
        background: var(--modalBg2);
        color: var(--modalTxt);
        border-top-left-radius: var(--modalRadius);
        border-top-right-radius: var(--modalRadius);
    }
    .tg__custom-range-slider{
        color: var(--accentBg);
    }
    .tg--close{
        background: var(--bodyBg);
        color: var(--bodyTxt);
    }
    .tg__modal .tg__dropdown_control,
    .tg_popup_body_static .tg__dropdown_control,
    .tg__modal .tg_input,
    .tg_popup_body_static .tg_input,
    .tg__cashout--wrapper .tg_input{
        background: var(--inputSecondaryG);
        color: var(--inputSecondaryTxt);
        border-radius: var(--inputSecondaryRadius);
    }

    .ui--dominant-content {
        border-color: var(--dominantBg2);
        background: var(--dominantBg);
        color: var(--dominantTxt);
    }
    .ui--dominant-header{
        border:0;
        background: var(--dominantG);
        color: var(--dominantTxt);
    }
    .ui-state-default, 
    .ui--dominant-content .ui-state-default, 
    .ui--dominant-header .ui-state-default,
    .ui-datepicker-title select,
    .ui-datepicker .ui-datepicker-prev, .ui-datepicker .ui-datepicker-nex{
        border:0;
        background: var(--bodyBg);
        color: var(--bodyTxt);
    }
    .ui-state-highlight, 
    .ui--dominant-content .ui-state-highlight, 
    .ui--dominant-header .ui-state-highlight,
    .ui-state-active, 
    .ui--dominant-content .ui-state-active, 
    .ui--dominant-header .ui-state-active,
    .ui-datepicker-calendar .ui-state-hover{
        background: var(--accentG);
        color: var(--accentTxt);
    }

    .tg__btn-text{
        background: var(--inputSecondaryG);
        color: var(--inputSecondaryTxt);
    }

    .tg__one_game_team {
        color: var(--eventTxt);
    }
    
    .tg__one_game_col,
    .tg__one_game_icons,
    .tg__one_game .maIcons {
        color: var(--eventTxt2);
    }

    .tg__one_game .tg__home_game_time{
        color: var(--eventTxt3);
    }
    
    .posCombItem {
      background: var(--eventBg);
      color: var(--eventTxt);
    }

    /* - - - - Odd - - - - */
    .l_od,
    .l_od_empty {
        background: var(--oddG);
        color: var(--oddTxt);
        border: 1px solid var(--oddBorder);
        border-radius: var(--oddRadius);
    }

    /* - - - - Show More - - - - */
    .tg__more {
        background: var(--showMoreG);
        color: var(--showMoreTxt);
        border-radius: var(--showMoreRadius);
        border: 1px solid var(--showMoreBorder);
    }

    .tg__more:hover {
        background: var(--showMoreBg2);
        color: var(--showMoreTxt);
        border-radius: var(--showMoreRadius);
        border-color: var(--showMoreBorder);
    }

    /* - - - - Betslip Header - - - - */
    .tg__block_header {
        background: var(--dominantBg2);
        color: var(--dominantTxt);
    }

    /* - - - - Accent - - - - */
    .liveGameSelected .liveSportNamesContainer,
    .tg_widget_text_akcent {
        color: var(--accentBg);
    }

    .left_menu_line_active .tg__left_menu_item_text {
        color: var(--menu_3Accent);
    }


    .tg_sidebar_text_akcent {
        color: var(--menu_1Accent);
    }

    .tg_sidebar_bg_2 .tg_sidebar_text_akcent {
        color: var(--menu_2Accent);
    }

   .tg_sidebar_bg_3 .tg_sidebar_text_akcent {
        color: var(--menu_3Accent);
    }

   .liveGameSelected .tg__left_menu_item--lvl3 .liveSportNamesContainer {
    color: var(--menu_3Accent);
   }
    
    .tg-ico-cheque_redact.tg-clr-akcent2 {
       color: var(--accentBg);
    }
    
    .tg_popup_body_static .tab_selector_active {
        border-bottom: 2px solid var(--accentBg);
    }
    
    .tg-ico-fav.active,
    .tg-ico-fav--active {
        color: var(--accentBg);
    }
    
    .tg__fix_btn.checked, .tg__fix_btn:hover {
        color: var(--accentBg);
    }

    /* - - - - Brand - - - - */
    .l_od:hover,
    .l_od.selectedOdd {
        background: var(--oddActiveG);
        color: var(--oddActiveTxt);
        border-radius: var(--oddActiveRadius);
        border-color: var(--oddActiveBorder);

    }

    .tg__btn-ternary {
        background: var(--buttonG);
        color: var(--buttonTxt);
    }

    .tabSelectorHeading {
        color: var(--bodyAccent);
    }
    
    /* africanView */
    .africanView .tg--home2__stakeItem:hover,
    .africanView .active .tg--home2__stakeItem,
    .africanView .tg--home2__stakeItem.stItem_active {
        background: var(--eventAccent);
        color: var(--eventAccentTxt);
        border-radius: var(--eventRadius);
    }

    /* - - - - BetSlip - - - - */
    .tg__coupon .tg--coupon-bg {
        background: var(--betSlipBg);
        color: var(--betSlipTxt2)
    }  

    .tg--coupon-bg {
        background: var(--dominantBg);
        color: var(--dominantTxt);
    }

    #info_panel_block .selectorWrapper {
        background: var(--dominantBg2);
        color: var(--dominantTxt);
    }
    .tg__info_panel .selectorWrapper {
        background: var(--betSlipBg2);
        color: var(--betSlipTxt);
    }
    .stake_item_panel {
      background: var(--betSlipStakeG);
      color: var(--betSlipStakeTxt2);
      border-color: var(--betSlipBorder);
      border-top: 0;
    }
    .coupon_sport_name_container {
      color: var(--betSlipStakeTxt);
    }
    
    .tg__btn.tg__btn-coupon {
        background: var(--betSlipButtonG);
        color: var(--betSlipButtonTxt);
        border-radius: var(--betSlipButtonRadius);
    }
    
    .tg--cashout-body, .tg__cashout_popup, .booking_number, .betchecker, #bookingBody {
        background: var(--modalG);
        color: var(--modalTxt);
    }

   .bet_generator_wrapper, .scout_panel, #betcheckerWrapper, .player_panel {
        background-color: var(--dominantBg);
        color: var(--dominantTxt);
    }
    
    .tg_coin {
        background: var(--accentBg);
        color: var(--accentTxt);
    }
    
    .tg__match_item_btn {
        background: var(--showMoreG);
        color: var(--showMoreTxt);
    }
    .tg--selected_prem_game .tg__match_item_btn{
        background: var(--accentG);
        color: var(--accentTxt);
    }
     
    .tg__modal_book_bet .tg__border--color-akcent{
        border-color: var(--accentBg);
    }

     .tg__modal_book_bet .tg-clr-akcent{
        color: var(--accentBg);
     }
    
    /* - - - - DropDown - - - - */
    .tg__input,
    .tg__dropdown__item,
    .sportRightPane .tg_input {
        background: var(--inputSecondaryG);
        color: var(--inputSecondaryTxt);
    }
    .sportRightPane .tg_input {
        border-radius: var(--inputSecondaryRadius);
    }
   .sportRightPane .tg_input::placeholder {
        color: var(--inputSecondaryTxt2);
    }
    .tg__search_cont .tg__input{
        background: var(--inputG);
        color: var(--inputTxt);
    }
    .sportRightPaneRow .tg_subheader_btn {
        background: var(--inputG);
        color: var(--inputTxt);
        border-radius: var(--inputRadius);
    }
    .tg__search_cont .tg__input::placeholder{
        color: var(--inputTxt2);
    }
    .tg__search_cont .tg__input-ico{
        color: var(--inputTxt);
    }
    .tg__info_panel .tg_input_coupon_amount {
        background: var(--betSlipInputG);
        color: var(--betSlipInputTxt);
      }

    /* - - - - Input - - - - */
    .tg__input {
      background: var(--inputG);
      color: var(--inputTxt);
      border-radius: var(--inputRadius);
    }

    .tg__btn {
      border-radius: var(--buttonRadius);
    }

    /* - - - - Accent - - - - */
    .liveGameSelected .liveSportNamesContainer,
    .tg_widget_text_akcent,
    .tg__coupon_square,
    .tg__score_box,
    .tg__btn-coupon:hover {
        color: var(--accentBg);
    }

    .tg_score.tg-clr-akcent2 {
        color: var(--accentBg);
    }
    .tg__coupon_square{
       background: var(--betSlipInputG);
    }
    
    .tg__coupon_factor {
       background: var(--betSlipButtonBg2);
       color: var(--betSlipButtonTxt)
    }

    .es__stepped_slider_cont {
        background: var(--subHeaderG);
        color: var(--subHeaderTxt);
    }
    
     .tg__badge_live {
        background-color: var(--dominantBg);
        color: var(--dominantTxt);
       
    }
    
    .tg-ico-date{
        color: var(--filterTxt);
    }
    
    .tg__switch input:checked + .tg__switch_ico {
        background: var(--accentBg);
     }
    
    /* Colors we can't change */
    .tab_selector_active .tg__badge_live {
         background-color: #CB0000;
         color: #fff;
    }
    
    .tg__switch .tg__switch_ico {
        background-color: #999;
    }

    .tg__switch .tg__switch_ico:before {
       background-color: #fff;
    }



    .tg--coupon-container.tg--coupon-single-tab .tab_selector_active {
        background: transparent !important;
        color: var(--modalTxt);
    }

    ${c.makeTournamentBackground ? `
    [class^='digi_tournament_']:before,
    [class*=' digi_tournament_']:before {
    border-radius: 3px;
    border: 2px solid var(--dominantBg3);
    box-sizing: content-box;
    background-repeat: no-repeat;
    background-color: var(--dominantBg2);
    }`
            : ``
        }

  
  .paperView .es__home_bet_header{
    background: var(--headerG);
    color: var(--headerTxt);
  }
  /*paper view odds*/
 .paperView .component_odd_empty,
 .paperView .component_odd,
 .paperView .component_odd.selectedOdd{
     background: var(--oddG);
     color: var(--oddTxt);
 }
 .paperView .component_odd:hover,
 .paperView .component_odd_empty:hover,
 .paperView .EUodds:hover,
 .paperView .EUodds.selectedOdd,
 .paperView .component_odd.selectedOdd {
     background: var(--oddActiveG);
     color: var(--oddActiveTxt);
 }
 .showC {
    background: var(--menu_1G);
    color: var(--menu_1Txt);
 }

/*multi bet of the day skinning*/
.tg__exp_of_day_header,
.es__express_slider_arrow{
	background-color: var(--dominantBg);
	color: var(--dominantTxt2);
}
.es__express_slider_arrow:hover {
	background-color: var(--dominantBg2);
	color: var(--dominantTxt);
}
.tg__exp_of_day_one_game {
	background-color: var(--eventG);
	color: var(--eventTxt2);
	border-bottom: 1px solid var(--eventBorder) !important;
}
.es__total_odd_container .tg-clr-secondary {
	color: var(--eventTxt2);
}

.tg__exp_of_day_one_game .tg-ico,
.digi-pv-multibets-event-name-container {
	color: var(--eventTxt);
}
.es__express_day_odd {
	border-color: var(--eventBorder);
    color: var(--eventTxt2);
}
.es__bonus_odd_container,
.es__express_day_coupon-button-container {
	background-color: var(--eventBg2);
	color: var(--eventTxt2);
}
.es__bonus_odd_container i,
.es__express_day_odd--total{
	color: var(--accentBg);
}
.es__express_day_coupon {
	background-color: var(--eventBg);
	color: var(--eventTxt2);
}
/*multi bet of the day skinning*/


/* Inmutable styles */
.tg__multiview_header,
.tg-hero .sport_count,
.tg__multiview_header .tg__one_game_team{
    color: #ffffff;
}

/*scroll*/
.digi_scroll_dragger{
    background-color: var(--dominantBg3Hover);
}

/*specific tabs*/
.tg_calendar_subtab_wrapper{
    border-bottom: 6px solid var(--tabActiveBg);
}
.tg--calendar-tab{
    border-bottom: 6px solid var(--tabActiveBg);
}
.live_calendar .body_panel {
    height: calc((100%) - 92px);
}

/*scroll*/
.digi_scroll_dragger{
    background-color: var(--dominantBg3Hover);
}

/*stakes event list*/
.tg__match_header{
    background: var(--headerG);
    color: var(--headerTxt2);
    border-bottom: 1px solid var(--headerBorder);
    border-top-left-radius: var(--headerRadius);
    border-top-right-radius: var(--headerRadius);
}
.tg__prematch_header{
    background: var(--headerG);
    color: var(--headerTxt2);
    border-radius: var(--headerRadius);
}
.tg__match_header .tg__teams {
    color: var(--headerTxt);
}
.tg__multibet_heading{
    border-bottom: 1px solid var(--subHeaderBorder);
}
.tg__live_list_header {
    background: var(--headerG);
    color: var(--headerTxt2);
}
.tg__live_list_header .sport_type {
    color: var(--headerTxt);
}
.overviewEventBody{
    background: var(--eventG);
    color: var(--eventTxt2);
}
.tg__score_box{
    background: var(--eventBg2);
    color: var(--accentBg);
}
.overviewEventBody .tg_team_name{
    color: var(--eventTxt);
}
.globalInactiveState{
    background: var(--bodyRGBA);
}

/*Search page*/
.sr-odd{
border: 1px solid var(--oddBorder);
    border-radius: var(--oddRadius);
}
.sr-odd.selected,
.sr-odd:hover {
    border-radius: var(--oddActiveRadius);
    border: 1px solid var(--oddActiveBorder);
}

`;


    let css2 = `
:root {
 --bodyBg:  ${c.bodyBg};
 --bodyRGBA:  ${c.bodyRGBA};
 --bodyTxt: ${c.bodyTxt};
 --bodyTxt2: ${c.bodyTxt2};
 --bodyTxt3: ${c.bodyTxt3};

 --accentBg: ${c.accentBg};

 --dominantG: ${c.dominantG};
 --dominantBg: ${c.dominantBg};
 --dominantBgHover: ${c.dominantBgHover};
 --dominantBg2: ${c.dominantBg2};
 --dominantBg3: ${c.dominantBg3};
 --dominantTxt: ${c.dominantTxt};
 --dominantTxt2: ${c.dominantTxt2};
 --dominantRadius: ${c.dominantRadius}px;

 --menu_1G: ${c.menu_1G};
 --menu_1Bg2: ${c.menu_1Bg2};
 --menu_1Txt: ${c.menu_1Txt};

 --menu_2G: ${c.menu_2G};
 --menu_2Bg2: ${c.menu_2Bg2};
 --menu_2Txt: ${c.menu_2Txt};

 --menu_3G: ${c.menu_3G};

 --headerBG: ${c.headerBG};
 --headerG: ${c.headerG};

    }
    .logo {
        background: url('images/ClientLogo/${c.fileName}/big.png') no-repeat;
        width: 115px;
        height: 36px;
        background-size: contain;
    }
    @media screen and (max-width: 1024px) {
        .logo {
            background: url('images/ClientLogo/${c.fileName}/sm.png') no-repeat;
            width: 30px;
            height: 30px;
            background-size: contain;
        }
    }
    body {
        background-color: var(--bodyBg);
        color: var(--bodyTxt);
    }
    header{ 
        background: var(--headerG);
        box-shadow: 3px 1px 4px rgba(0,0,0,0.3);
    }
    .languages .select-list,
    .langRow{ 
        background-color: var(--dominantBg2);
    }
    .langRow .txt{
        color: var(--dominantTxt2);
    }
    .langRow:hover{ 
        background-color: var(--dominantBg3);
    }
    .languages #selLang > a {
        border-radius: var(--dominantRadius);
    }
    .expandable-list{ 
        background-color: var(--bodyBg);
    }
    .main-col {
       background: var(--dominantBg);
        color: var(--dominantTxt);
    }
    .expandable-list .menuleft .menuleftа {
        background: var(--menu_1G);
        color: var(--menu_1Txt);
    }
    .expandable-list .menuleft .menuleftа:hover{
        background: var(--menu_1Bg2);
    }
    .expandable-list .menuleft ul li a{ 
        background: var(--menu_2G);
        color: var(--menu_2Txt);
    }
    .expandable-list .menuleft ul li a:hover{
        background-color: var(--menu_2Bg2);
    }
    .expandable-list .menuleft ul li.active a{
        background: var(--menu_3G);
    }
    .content-head{ 
        color: var(--accentBg);
    }
    .mob_nav{
        color: var(--dominantTxt2);  
    }
    .subMenu .arrow,
    .languages #selLang > a:after{
        color: var(--dominantTxt2);
    }
`;

    let cssBetslip = `
    :root {
        --bodyBg:  ${c.bodyBg};
        --bodyBg2:  ${c.bodyBg2};
        --bodyBg3: ${c.bodyBg3};  
        --bodyBgHover:  ${c.bodyBgHover};
        --bodyBg2Hover:  ${c.bodyBg2Hover};
        --bodyBg3Hover: ${c.bodyBg3Hover};
        --bodyRGBA:  ${c.bodyRGBA};
        --bodyRGBA2:  ${c.bodyRGBA2};
        --bodyRGBA3:  ${c.bodyRGBA3};
        --bodyTxt: ${c.bodyTxt};
        --bodyTxt2: ${c.bodyTxt2};
        --bodyTxt3: ${c.bodyTxt3};
        --bodyAccent: ${c.bodyAccent};
        --bodyAccentTxt: ${c.bodyAccentTxt};
        --bodyBorder:  ${c.bodyBorder};
        --bodyRadius:  ${c.bodyRadius}px;

        --dominantG: ${c.dominantG};
        --dominantRGBA: ${c.dominantRGBA};
        --dominantRGBA2: ${c.dominantRGBA2};
        --dominantRGBA3: ${c.dominantRGBA3};
        --dominantBg: ${c.dominantBg};
        --dominantBg2: ${c.dominantBg2};
        --dominantBg3: ${c.dominantBg3};
        --dominantBgHover: ${c.dominantBgHover};
        --dominantBg2Hover: ${c.dominantBg2Hover};
        --dominantBg3Hover: ${c.dominantBg3Hover};
        --dominantTxt: ${c.dominantTxt};
        --dominantTxt2: ${c.dominantTxt2};
        --dominantTxt3: ${c.dominantTxt3};
        --dominantTxtInverse: ${c.dominantTxtInverse}; 
        --dominantRadius: ${c.dominantRadius}px;
    
        --accentBg: ${c.accentBg};
        --accentBg2:  ${c.accentBg2};
        --accentBg3: ${c.accentBg3};
        --accentBgHover:  ${c.accentBgHover};
        --accentBg2Hover:  ${c.accentBg2Hover};
        --accentBg3Hover:  ${c.accentBg3Hover};
        --accentG: ${c.accentG};
        --accentTxt: ${c.accentTxt};
        --accentTxt2: ${c.accentTxt2};
        --accentTxt3: ${c.accentTxt3};        
      
        --buttonG: ${c.buttonG};
        --buttonBg:  ${c.buttonBg};
        --buttonBg2:  ${c.buttonBg2};
        --buttonBg3:  ${c.buttonBg3};
        --buttonBgHover:  ${c.buttonBgHover};
        --buttonBg2Hover:  ${c.buttonBg2Hover};
        --buttonBg3Hover:  ${c.buttonBg3Hover};
        --buttonTxt: ${c.buttonTxt};
        --buttonTxt2: ${c.buttonTxt2};
        --buttonTxt3: ${c.buttonTxt3};
        --buttonAccent: ${c.buttonAccent};
        --buttonAccentTxt: ${c.buttonAccentTxt};
        --buttonBorder: ${c.buttonBorder};
        --buttonRadius: ${c.buttonRadius}px;

        --buttonSecondaryG: ${c.buttonSecondaryG};
        --buttonSecondaryBg:  ${c.buttonSecondaryBg};
        --buttonSecondaryBg2:  ${c.buttonSecondaryBg2};
        --buttonSecondaryBg3:  ${c.buttonSecondaryBg3};
        --buttonSecondaryBgHover:  ${c.buttonSecondaryBgHover};
        --buttonSecondaryBg2Hover:  ${c.buttonSecondaryBg2Hover};
        --buttonSecondaryBg3Hover:  ${c.buttonSecondaryBg3Hover};
        --buttonSecondaryTxt: ${c.buttonSecondaryTxt};
        --buttonSecondaryTxt2: ${c.buttonSecondaryTxt2};
        --buttonSecondaryTxt3: ${c.buttonSecondaryTxt3};
        --buttonSecondaryAccent: ${c.buttonSecondaryAccent}; 
        --buttonSecondaryAccentTxt: ${c.buttonSecondaryAccentTxt};
        --buttonSecondaryBorder: ${c.buttonSecondaryBorder};
        --buttonSecondaryRadius: ${c.buttonSecondaryRadius}px;

        --inputG: ${c.inputG};
        --inputBg: ${c.inputBg};
        --inputBg2: ${c.inputBg2};
        --inputBg3: ${c.inputBg3}; 
        --inputBgHover: ${c.inputBgHover};
        --inputBg2Hover: ${c.inputBg2Hover};
        --inputBg3Hover: ${c.inputBg3Hover};
        --inputTxt:  ${c.inputTxt};
        --inputTxt2: ${c.inputTxt2};
        --inputTxt3: ${c.inputTxt3};
        --inputAccent: ${c.inputAccent};
        --inputAccentTxt: ${c.inputAccentTxt};
        --inputRadius: ${c.inputRadius}px;        
        --inputBorder: ${c.inputBorder};  

        --inputSecondaryG: ${c.inputSecondaryG};
        --inputSecondaryBg: ${c.inputSecondaryBg};
        --inputSecondaryBg2: ${c.inputSecondaryBg2};
        --inputSecondaryBg3: ${c.inputSecondaryBg3}; 
        --inputSecondaryBgHover: ${c.inputSecondaryBgHover};
        --inputSecondaryBg2Hover: ${c.inputSecondaryBg2Hover};
        --inputSecondaryBg3Hover: ${c.inputSecondaryBg3Hover};
        --inputSecondaryTxt:  ${c.inputSecondaryTxt};
        --inputSecondaryTxt2: ${c.inputSecondaryTxt2};
        --inputSecondaryTxt3: ${c.inputSecondaryTxt3};
        --inputSecondaryAccent: ${c.inputSecondaryAccent};
        --inputSecondaryAccentTxt: ${c.inputSecondaryAccentTxt};
        --inputSecondaryRadius: ${c.inputSecondaryRadius}px;        
        --inputSecondaryBorder: ${c.inputSecondaryBorder};   

        --headerG: ${c.headerG};
        --headerBg: ${c.headerBg};
        --headerBg2: ${c.headerBg2};
        --headerBg3: ${c.headerBg3};
        --headerBgHover: ${c.headerBgHover};
        --headerBg2Hover: ${c.headerBg2Hover};
        --headerBg3Hover: ${c.headerBg3Hover};
        --headerTxt: ${c.headerTxt};
        --headerTxt2: ${c.headerTxt2};
        --headerTxt3: ${c.headerTxt3};
        --headerAccent: ${c.headerAccent};
        --headerAccentTxt: ${c.headerAccentTxt};
        --headerBorder: ${c.headerBorder};
        --headerRadius: ${c.headerRadius}px;

        --subHeaderG: ${c.subHeaderG};
        --subHeaderBg: ${c.subHeaderBg};
        --subHeaderBg2: ${c.subHeaderBg2};
        --subHeaderBg3: ${c.subHeaderBg3};
        --subHeaderBgHover: ${c.subHeaderBgHover};
        --subHeaderBg2Hover: ${c.subHeaderBg2Hover};
        --subHeaderBg3Hover: ${c.subHeaderBg3Hover};
        --subHeaderTxt: ${c.subHeaderTxt};
        --subHeaderTxt2: ${c.subHeaderTxt2};
        --subHeaderTxt3: ${c.subHeaderTxt3};
        --subHeaderAccent: ${c.subHeaderAccent};
        --subHeaderAccentTxt: ${c.subHeaderAccentTxt};
        --subHeaderBorder: ${c.subHeaderBorder};
        --subHeaderRadius: ${c.subHeaderRadius}px;

        --eventG: ${c.eventG};
        --eventBg: ${c.eventBg};
        --eventBg2: ${c.eventBg2};
        --eventBg3: ${c.eventBg3};  
        --eventBgHover: ${c.eventBgHover};
        --eventBg2Hover: ${c.eventBg2Hover};
        --eventBg3Hover: ${c.eventBg3Hover};
        --eventTxt: ${c.eventTxt};
        --eventTxt2: ${c.eventTxt2};
        --eventTxt3: ${c.eventTxt3};
        --eventAccent: ${c.eventAccent};
        --eventAccentTxt: ${c.eventAccentTxt};
        --eventBorder: ${c.eventBorder};
        --eventRadius:  ${c.eventRadius}px;

        --modalG: ${c.modalG};
        --modalBg: ${c.modalBg};
        --modalBg2: ${c.modalBg2};
        --modalBg3: ${c.modalBg3};
        --modalBgHover: ${c.modalBgHover};
        --modalBg2Hover: ${c.modalBg2Hover};
        --modalBg3Hover: ${c.modalBg3Hover};
        --modalTxt: ${c.modalTxt};
        --modalTxt2: ${c.modalTxt2};
        --modalTxt3: ${c.modalTxt3};
        --modalAccent: ${c.modalAccent};
        --modalAccentTxt: ${c.modalAccentTxt};
        --modalRadius: ${c.modalRadius}px;
        --modalBorder: ${c.modalBorder};
 
        --oddG: ${c.oddG};
        --oddBg: ${c.oddBg};
        --oddBg2: ${c.oddBg2};
        --oddBg3: ${c.oddBg3}; 
        --oddBgHover: ${c.oddBgHover};
        --oddBg2Hover: ${c.oddBg2Hover};
        --oddBg3Hover: ${c.oddBg3Hover};
        --oddTxt: ${c.oddTxt};
        --oddTxt2: ${c.oddTxt2};
        --oddTxt3: ${c.oddTxt3};
        --oddAccent: ${c.oddAccent};
        --oddAccentTxt: ${c.oddAccentTxt};
        --oddRadius: ${c.oddRadius}px;
        --oddBorder: ${c.oddBorder};

        --oddActiveG: ${c.oddActiveG};
        --oddActiveBg: ${c.oddActiveBg};
        --oddActiveBg2: ${c.oddActiveBg2};
        --oddActiveBg3: ${c.oddActiveBg3};  
        --oddActiveBgHover: ${c.oddActiveBgHover};
        --oddActiveBg2Hover: ${c.oddActiveBg2Hover};
        --oddActiveBg3Hover: ${c.oddActiveBg3Hover};
        --oddActiveTxt: ${c.oddActiveTxt};
        --oddActiveTxt2: ${c.oddActiveTxt2};
        --oddActiveTxt3: ${c.oddActiveTxt3};
        --oddActiveAccent: ${c.oddActiveAccent};
        --oddActiveAccentTxt: ${c.oddActiveAccentTxt};
        --oddActiveRadius: ${c.oddActiveRadius}px;
        --oddActiveBorder: ${c.oddActiveBorder};
 
        --showMoreG: ${c.showMoreG};
        --showMoreBg: ${c.showMoreBg};
        --showMoreBg2: ${c.showMoreBg2};
        --showMoreBg3: ${c.showMoreBg3}; 
        --showMoreBgHover: ${c.showMoreBgHover};
        --showMoreBg2Hover: ${c.showMoreBg2Hover};
        --showMoreBg3Hover: ${c.showMoreBg3Hover};
        --showMoreTxt: ${c.showMoreTxt};
        --showMoreTxt2: ${c.showMoreTxt2};
        --showMoreTxt3: ${c.showMoreTxt3};
        --showMoreAccent: ${c.showMoreAccent};
        --showMoreAccentTxt: ${c.showMoreAccentTxt};
        --showMoreRadius: ${c.showMoreRadius}px;
        --showMoreBorder: ${c.showMoreBorder};


        --tabG: ${c.tabG};
        --tabBg: ${c.tabBg};
        --tabBg2: ${c.tabBg2};
        --tabBg3: ${c.tabBg3};
        --tabBgHover: ${c.tabBgHover};
        --tabBg2Hover: ${c.tabBg2Hover};
        --tabBg3Hover: ${c.tabBg3Hover};
        --tabTxt: ${c.tabTxt};
        --tabTxt2: ${c.tabTxt2};
        --tabTxt3: ${c.tabTxt3};
        --tabAccent: ${c.tabAccent};
        --tabAccentTxt: ${c.tabAccentTxt};
        --tabRadius: ${c.tabRadius}px;
        --tabBorder: ${c.tabBorder};

        --tabActiveG: ${c.tabActiveG};
        --tabActiveBg: ${c.tabActiveBg};
        --tabActiveBg2: ${c.tabActiveBg2};
        --tabActiveBg3: ${c.tabActiveBg3};
        --tabActiveBgHover: ${c.tabActiveBgHover};
        --tabActiveBg2Hover: ${c.tabActiveBg2Hover};
        --tabActiveBg3Hover: ${c.tabActiveBg3Hover};
        --tabActiveTxt: ${c.tabActiveTxt};
        --tabActiveTxt2: ${c.tabActiveTxt2};
        --tabActiveTxt3: ${c.tabActiveTxt3};
        --tabActiveAccent: ${c.tabActiveAccent};
        --tabActiveAccentTxt: ${c.tabActiveAccentTxt};
        --tabActiveRadius: ${c.tabActiveRadius}px;
        --tabActiveBorder: ${c.tabActiveBorder}; 

        --tabSecondaryActiveBg: ${c.tabSecondaryActiveBg};
        --tabSecondaryActiveBg2: ${c.tabSecondaryActiveBg2};
        --tabSecondaryActiveBg3: ${c.tabSecondaryActiveBg3};
        --tabSecondaryActiveBgHover: ${c.tabSecondaryActiveBgHover};
        --tabSecondaryActiveBg2Hover: ${c.tabSecondaryActiveBg2Hover};
        --tabSecondaryActiveBg3Hover: ${c.tabSecondaryActiveBg3Hover};
        --tabSecondaryActiveTxt: ${c.tabSecondaryActiveTxt};
        --tabSecondaryActiveTxt2: ${c.tabSecondaryActiveTxt2};
        --tabSecondaryActiveTxt3: ${c.tabSecondaryActiveTxt3};
        --tabSecondaryActiveAccent: ${c.tabSecondaryActiveAccent};
        --tabSecondaryActiveAccentTxt: ${c.tabSecondaryActiveAccentTxt};
        --tabSecondaryActiveRadius: ${c.tabSecondaryActiveRadius}px;
        --tabSecondaryActiveBorder: ${c.tabSecondaryActiveBorder}; 

        --filterG: ${c.filterG};
        --filterBg: ${c.filterBg};
        --filterBg2: ${c.filterBg2};
        --filterBg3: ${c.filterBg3};
        --filterBgHover: ${c.filterBgHover};
        --filterBg2Hover: ${c.filterBg2Hover};
        --filterBg3Hover: ${c.filterBg3Hover};
        --filterTxt: ${c.filterTxt};
        --filterTxt2: ${c.filterTxt2};
        --filterTxt3: ${c.filterTxt3};
        --filterAccent: ${c.filterAccent};
        --filterAccentTxt: ${c.filterAccentTxt};
        --filterRadius: ${c.filterRadius}px;
        --filterBorder: ${c.filterBorder}; 

        --menu_1G: ${c.menu_1G};
        --menu_1Bg: ${c.menu_1Bg};
        --menu_1Bg2: ${c.menu_1Bg2};
        --menu_1Bg3: ${c.menu_1Bg3};
        --menu_1BgHover: ${c.menu_1BgHover};
        --menu_1Bg2Hover: ${c.menu_1Bg2Hover};
        --menu_1Bg3Hover: ${c.menu_1Bg3Hover};
        --menu_1Txt: ${c.menu_1Txt};
        --menu_1Txt2: ${c.menu_1Txt2};
        --menu_1Txt3: ${c.menu_1Txt3};
        --menu_1Accent: ${c.menu_1Accent};
        --menu_1AccentTxt: ${c.menu_1AccentTxt};
        --menu_1Radius: ${c.menu_1Radius}px;
        --menu_1Border: ${c.menu_1Border}; 

        --menu_2G: ${c.menu_2G};
        --menu_2Bg: ${c.menu_2Bg};
        --menu_2Bg2: ${c.menu_2Bg2};
        --menu_2Bg3: ${c.menu_2Bg3};
        --menu_2BgHover: ${c.menu_2BgHover};
        --menu_2Bg2Hover: ${c.menu_2Bg2Hover};
        --menu_2Bg3Hover: ${c.menu_2Bg3Hover};
        --menu_2Txt: ${c.menu_2Txt};
        --menu_2Txt2: ${c.menu_2Txt2};
        --menu_2Txt3: ${c.menu_2Txt3};
        --menu_2Accent: ${c.menu_2Accent};
        --menu_2AccentTxt: ${c.menu_2AccentTxt};
        --menu_2Radius: ${c.menu_2Radius}px;
        --menu_2Border: ${c.menu_2Border}; 

        --menu_3G: ${c.menu_3G};
        --menu_3Bg: ${c.menu_3Bg};
        --menu_3Bg2: ${c.menu_3Bg2};
        --menu_3Bg3: ${c.menu_3Bg3};
        --menu_3BgHover: ${c.menu_3BgHover};
        --menu_3Bg2Hover: ${c.menu_3Bg2Hover};
        --menu_3Bg3Hover: ${c.menu_3Bg3Hover};
        --menu_3Txt: ${c.menu_3Txt};
        --menu_3Txt2: ${c.menu_3Txt2};
        --menu_3Txt3: ${c.menu_3Txt3};
        --menu_3Accent: ${c.menu_3Accent};
        --menu_3AccentTxt: ${c.menu_3AccentTxt};
        --menu_3Radius: ${c.menu_3Radius}px;
        --menu_3Border: ${c.menu_3Border}; 

        --tooltipG: ${c.tooltipG};
        --tooltipBg: ${c.tooltipBg};
        --tooltipBg2: ${c.tooltipBg2};
        --tooltipBg3: ${c.tooltipBg3};
        --tooltipBgHover: ${c.tooltipBgHover};
        --tooltipBg2Hover: ${c.tooltipBg2Hover};
        --tooltipBg3Hover: ${c.tooltipBg3Hover};
        --tooltipTxt: ${c.tooltipTxt};
        --tooltipTxt2: ${c.tooltipTxt2};
        --tooltipTxt3: ${c.tooltipTxt3};
        --tooltipAccent: ${c.tooltipAccent};
        --tooltipAccentTxt: ${c.tooltipAccentTxt};
        --tooltipRadius: ${c.tooltipRadius}px;
        --tooltipBorder: ${c.tooltipBorder}; 

           /* Old betslip */
        --betSlipBg: ${c.betSlipBg};
        --betSlipBg2: ${c.betSlipBg2};
        --betSlipBorder: ${c.betSlipBorder};
        --betSlipTxt: ${c.betSlipTxt};
        --betSlipTxt2: ${c.betSlipTxt2};

        --betSlipStakeG: ${c.betSlipStakeG};
        --betSlipStakeBg: ${c.betSlipStakeBg};
        --betSlipStakeTxt: ${c.betSlipStakeTxt};
        --betSlipStakeTxt2: ${c.betSlipStakeTxt2};

        --betSlipInputG: ${c.betSlipInputG};
        --betSlipInputTxt: ${c.betSlipInputTxt};

        --betSlipButtonG: ${c.betSlipButtonG};
        --betSlipButtonBg2: ${c.betSlipButtonBg2};
        --betSlipButtonTxt: ${c.betSlipButtonTxt};
        --betSlipButtonRadius: ${c.betSlipButtonRadius}px;
        

        --spritePositionX: ${c.MenuLevel_ATxt === `#000` ? -24 : -0}px;
    }`;

    let results = {
        css: css,
        name: "sport web",

        css2: css2,
        name2: "sport rules"
 
    };

    window.SportFrame && SportFrame.setCssAsText(results.css); 
 
    return results;
}