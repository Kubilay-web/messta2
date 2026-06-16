import { getMenuItems } from "@/shared/layouts-components/sidebar/nav";
import store from "@/shared/redux/store";


const SwithcerClass = (selector: string): HTMLCollectionOf<Element> => document.getElementsByClassName(selector);

const setMargin = (className: string): void => {
    const elements = SwithcerClass(className);
    for (let element of elements) {
        if (element instanceof HTMLElement) {
            element.style.marginInline = "0px";
        }
    }
};


export const updateTheme = (themeType: any, actionfunction: any,clicked?:any) => {
    const theme = store.getState().reducer;

    const newTheme = {
        ...theme,
        "class": themeType === "dark" ? "dark" : "light",
        "dataHeaderStyles": "transparent",
        "dataMenuStyles": themeType === "dark" ? "dark" : "light",
        "defaultHeaderStyles": '',
        "darkBg": "",
        "bodyBg": "",
        "lightRgb": "",
        "gray": "",
        "inputBorder": "",
    };

    localStorage.setItem(`mamix${themeType}theme`, themeType);
    localStorage.removeItem(`mamix${themeType === "dark" ? "light" : "dark"}theme`);
    
    if (clicked) {
    localStorage.removeItem("mamixMenu");
	localStorage.removeItem("mamixHeader");
	localStorage.removeItem("bodyBg");
    localStorage.removeItem("darkBg");
    localStorage.removeItem("lightRgb");
	localStorage.removeItem("gray");
    }

    actionfunction(newTheme);
};

export const DirectionTheme = (directionType: any, actionfunction: any) => {
    const theme = store.getState().reducer;

    const dirtectionTheme = {
        ...theme,
        "dir": directionType,
    };

    localStorage.setItem(`mamix${directionType}`, directionType);
    localStorage.removeItem(`mamix${directionType === "ltr" ? "rtl" : "ltr"}`);

    actionfunction(dirtectionTheme);
};

export const updateLayout = (layoutType: any, actionfunction: any) => {

    const theme = store.getState().reducer;

    setTimeout(() => {
        const mainContent = SwithcerClass("main-content")[0] as HTMLElement | undefined;
        if (mainContent) {
            mainContent.click();
        }
    }, 100);


    let updatedTheme = {
        ...theme,
        "dataNavLayout": layoutType === "horizontal" ? "horizontal" : "vertical",
        "dataVerticalStyle": layoutType === "vertical" ? "overlay" : "",
        "dataNavStyle": localStorage.mamixnavstyles ? localStorage.mamixnavstyles : "menu-click",
        "toggled": layoutType === "vertical" ? "" : undefined
    };

    localStorage.setItem("mamixlayout", layoutType);
    if (layoutType === "vertical") {
        localStorage.removeItem("mamixverticalstyles");
    } else {
        localStorage.removeItem("mamixverticalstyles");
    }

    setMargin("main-menu");

    actionfunction(updatedTheme);
};
function closeMenu() {
    const closeMenudata = (items: any) => {
        items?.forEach((item: any) => {
            item.active = false;
            closeMenudata(item.children);
        });
    };
    closeMenudata(getMenuItems);
}

export const updateNavStyle = (actionType: any, toggledState: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataNavStyle": actionType,
        "dataVerticalStyle": "",
        "toggled": toggledState,
    });

    localStorage.setItem("mamixnavstyles", actionType);
    localStorage.removeItem("mamixverticalstyles");

    setMargin("main-menu");

    if(actionType === "icon-hover"){
        closeMenu()
    }
};

export const updateWidthStyle = (widthType: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataWidth": widthType,
    });

    localStorage.setItem(`mamix${widthType}`, widthType);
    localStorage.removeItem(`mamix${widthType === "fullwidth" ? "boxed" : "fullwidth"}`);
};

export const updateMenuPosition = (menuPosition: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataMenuPosition": menuPosition,
    });

    localStorage.setItem(`mamixmenu${menuPosition}`, `${menuPosition}Menu`);
    localStorage.removeItem(`mamixmenu${menuPosition === "fixed" ? "scrollable" : "fixed"}`);
};

export const updateHeaderPosition = (headerPosition: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataHeaderPosition": headerPosition,
    });

    localStorage.setItem(`mamixheader${headerPosition}`, `${headerPosition}Header`);
    localStorage.removeItem(`mamixheader${headerPosition === "fixed" ? "scrollable" : "fixed"}`);
};

export const updatePageStyle = (pageStyle: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataPageStyle": pageStyle,
    });

    localStorage.setItem(`mamix${pageStyle}`, pageStyle.charAt(0).toUpperCase() + pageStyle.slice(1));
    ["regular", "classic", "modern"].forEach(style => {
        if (style !== pageStyle) {
            localStorage.removeItem(`mamix${style}`);
        }
    });
};

export const updateBgImage = (imageKey: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "bgImg": imageKey
    });

    localStorage.setItem(imageKey, imageKey);
    for (let i = 1; i <= 5; i++) {
        if (`bgimage${i}` !== imageKey) {
            localStorage.removeItem(`bgimage${i}`);
        }
    }
};

export const updateMenuStyle = (menuStyle: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataMenuStyles": menuStyle,
    });
    localStorage.setItem("mamixMenu", menuStyle);
    localStorage.removeItem("light");
};

export const updateHeaderStyle = (headerStyle: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "defaultHeaderStyles": "",
        "dataHeaderStyles": headerStyle,
    });
    localStorage.setItem("mamixHeader", headerStyle);
    localStorage.removeItem("mamixdefaultHeader");
};

export const updateDefaultHeaderStyle = (headerStyle: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "defaultHeaderStyles": headerStyle,
        "dataHeaderStyles": "",
    });
    localStorage.setItem("mamixdefaultHeader", headerStyle);
    localStorage.removeItem("mamixHeader");
};

export const updatePrimaryColor = (colorRgb: any, Primarycolor: string, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "colorPrimaryRgb": colorRgb,
        "PrimaryRgb": Primarycolor,
    });
    localStorage.setItem("primaryRGB", colorRgb);
    localStorage.setItem("PrimaryRgb", Primarycolor);
    localStorage.removeItem("dynamiccolor")
    
};

export const updateBackgroundColor = (bgColor: any, darkBg: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "bodyBg": bgColor,
        "darkBg": darkBg,
        "lightRgb":darkBg,
        "inputBorder": "rgba(255,255,255,0.1)",
        "gray": "rgba(255,255,255,0.1)",
        "class": "dark",
        "dataMenuStyles": "dark",
        "dataHeaderStyles": "dark",
        "defaultHeaderStyles": "",
    });

    localStorage.setItem('bodyBg', bgColor);
    localStorage.setItem('darkBg', darkBg);
    localStorage.setItem('lightRgb', darkBg);

    // localStorage.removeItem("mamixdefaultHeader");
    localStorage.removeItem("bodyBg");
};

export const updateMenuStyles = (verticalStyle: any, toggled: any, actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataVerticalStyle": verticalStyle,
        "toggled": toggled || "",
        "dataNavStyle": "",
    });
    localStorage.setItem("mamixverticalstyles", verticalStyle);
    localStorage.removeItem("mamixnavstyles");
};
