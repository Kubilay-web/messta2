import { useState } from 'react';
import store from '@/shared/redux/store';
import { DirectionTheme, updateBackgroundColor,  updateHeaderPosition, updateHeaderStyle, updateLayout, updateMenuPosition, updateMenuStyle, updateNavStyle, updatePageStyle, updatePrimaryColor, updateTheme, updateWidthStyle } from '@/shared/data/switcherdata/switcher-reusable';

export const Dark = (actionfunction: any, _clicked?: any) => updateTheme("dark", actionfunction, _clicked);

export const Light = (actionfunction: any, _clicked?: any) => updateTheme("light", actionfunction, _clicked);

export const Ltr = (actionfunction: any) => DirectionTheme("ltr", actionfunction);

export const Rtl = (actionfunction: any) => DirectionTheme("rtl", actionfunction);

export const HorizontalClick = (actionfunction: any) => updateLayout("horizontal", actionfunction);

export const Vertical = (actionfunction: any) => updateLayout("vertical", actionfunction);

export const Menuclick = (actionfunction: any) => updateNavStyle("menu-click", "menu-click-closed", actionfunction);

export const MenuHover = (actionfunction: any) => updateNavStyle("menu-hover", "menu-hover-closed", actionfunction);

export const IconClick = (actionfunction: any) => updateNavStyle("icon-click", "icon-click-closed", actionfunction);

export const IconHover = (actionfunction: any) => updateNavStyle("icon-hover", "icon-hover-closed", actionfunction);

export const Defaultwidth = (actionfunction: any) => updateWidthStyle("default", actionfunction);

export const Fullwidth = (actionfunction: any) => updateWidthStyle("fullwidth", actionfunction);

export const Boxed = (actionfunction: any) => updateWidthStyle("boxed", actionfunction);

export const FixedMenu = (actionfunction: any) => updateMenuPosition("fixed", actionfunction);

export const scrollMenu = (actionfunction: any) => updateMenuPosition("scrollable", actionfunction);

export const Headerpostionfixed = (actionfunction: any) => updateHeaderPosition("fixed", actionfunction);

export const Headerpostionscroll = (actionfunction: any) => updateHeaderPosition("scrollable", actionfunction);

export const Regular = (actionfunction: any) => updatePageStyle("regular", actionfunction);

export const Classic = (actionfunction: any) => updatePageStyle("classic", actionfunction);

export const Modern = (actionfunction: any) => updatePageStyle("modern", actionfunction);

export const lightMenu = (actionfunction: any, _clicked: string) => updateMenuStyle("light", actionfunction);

export const darkMenu = (actionfunction: any, _clicked: string) => updateMenuStyle("dark", actionfunction);

export const colorMenu = (actionfunction: any, _clicked: string) => updateMenuStyle("color", actionfunction);

export const gradientMenu = (actionfunction: any, _clicked: string) => updateMenuStyle("gradient", actionfunction);

export const transparentMenu = (actionfunction: any, _clicked: string) => updateMenuStyle("transparent", actionfunction);

export const lightHeader = (actionfunction: any, _clicked: string) => updateHeaderStyle("light", actionfunction);

export const darkHeader = (actionfunction: any, _clicked: string) => updateHeaderStyle("dark", actionfunction);

export const colorHeader = (actionfunction: any, _clicked: string) => updateHeaderStyle("color", actionfunction);

export const gradientHeader = (actionfunction: any, _clicked: string) => updateHeaderStyle("gradient", actionfunction);

export const transparentHeader = (actionfunction: any, _clicked: string) => updateHeaderStyle("transparent", actionfunction);

export const primaryColor1 = (actionfunction: any) => updatePrimaryColor("106, 91, 204","106 91 204",  actionfunction);

export const primaryColor2 = (actionfunction: any) => updatePrimaryColor("100, 149, 237","100 149 237",  actionfunction);

export const primaryColor3 = (actionfunction: any) => updatePrimaryColor("0, 123, 167","0 123 167",  actionfunction);

export const primaryColor4 = (actionfunction: any) => updatePrimaryColor("10, 180, 255","10 180 255",  actionfunction);

export const primaryColor5 = (actionfunction: any) => updatePrimaryColor("46, 81, 145","46 81 145",   actionfunction);

export const backgroundColor1 = (actionfunction: any, _clicked: string) => updateBackgroundColor("49 63 141", "54 71 146", actionfunction);

export const backgroundColor2 = (actionfunction: any, _clicked: string) => updateBackgroundColor("46 94 184", "51 102 189", actionfunction);

export const backgroundColor3 = (actionfunction: any, _clicked: string) => updateBackgroundColor("23 74 105", "28 82 110", actionfunction);

export const backgroundColor4 = (actionfunction: any, _clicked: string) => updateBackgroundColor("34 120 174", "39 128 179", actionfunction);

export const backgroundColor5 = (actionfunction: any, _clicked: string) => updateBackgroundColor("12 23 91", "17 31 96", actionfunction);

const addClickListenerToClass = (className: any, callback: any) => {
    const elements = document.getElementsByClassName(className);
    for (let element of elements) {
        element.addEventListener("click", callback);
    }
};

export const Defaultmenu = (actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataVerticalStyle": "overlay",
        "dataNavLayout": "vertical",
        'toggled': ''
    });
    localStorage.removeItem("mamixnavstyles");
    localStorage.setItem("mamixverticalstyles", "default");

};
export const Closedmenu = (actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataVerticalStyle": "closed",
        "toggled": "close-menu-close"
    });
    localStorage.setItem("mamixverticalstyles", "closed");
    localStorage.removeItem("mamixnavstyles");

};



function icontextOpenFn() {
    let html = document.documentElement;
    if (html.getAttribute("data-toggled") === "icon-text-close") {
        html.setAttribute("data-icon-text", "open");
    }
}
function icontextCloseFn() {
    let html = document.documentElement;
    if (html.getAttribute("data-toggled") === "icon-text-close") {
        html.removeAttribute("data-icon-text");
    }
}
export const iconText = (actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataVerticalStyle": "icontext",
        "toggled": "icon-text-close",
        "dataNavStyle": "",
    });
    localStorage.setItem("mamixverticalstyles", "icontext");
    localStorage.removeItem("mamixnavstyles");

    addClickListenerToClass("app-sidebar", icontextOpenFn);
    addClickListenerToClass("main-content", icontextCloseFn);

};

export const iconOverayFn = (actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataVerticalStyle": "overlay",
        "toggled": "icon-overlay-close",
    });
    localStorage.setItem("mamixverticalstyles", "overlay");
    localStorage.removeItem("mamixnavstyles");

    addClickListenerToClass("app-sidebar", DetachedOpenFn);
    addClickListenerToClass("main-content", DetachedCloseFn);

};
function DetachedOpenFn() {
    if (window.innerWidth > 992) {
        let html = document.documentElement;
        if (html.getAttribute('data-toggled') === 'detached-close' || html.getAttribute('data-toggled') === 'icon-overlay-close') {
            html.setAttribute('data-icon-overlay', "open");
        }
    }
}
function DetachedCloseFn() {
    if (window.innerWidth > 992) {
        let html = document.documentElement;
        if (html.getAttribute('data-toggled') === 'detached-close' || html.getAttribute('data-toggled') === 'icon-overlay-close') {
            html.removeAttribute('data-icon-overlay');
        }
    }
}
export const DetachedFn = (actionfunction: any) => {
    const theme = store.getState().reducer
    actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataVerticalStyle": "detached",
        "toggled": "detached-close",
        "dataNavStyle": "",

    })
    localStorage.setItem("mamixverticalstyles", "detached");
    localStorage.removeItem("mamixnavstyles");

    addClickListenerToClass("app-sidebar", DetachedOpenFn);
    addClickListenerToClass("main-content", DetachedCloseFn);
};
export const DoubletFn = (actionfunction: any) => {
    const theme = store.getState().reducer;
    actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataVerticalStyle": "doublemenu",
        "toggled": "double-menu-open",
        "dataNavStyle": "",
    });
    localStorage.setItem("mamixverticalstyles", "doublemenu");
    localStorage.removeItem("mamixnavstyles");

    setTimeout(() => {
        if (!document.querySelector(".main-menu .slide.active ul")) {
            const theme = store.getState().reducer;
            actionfunction(
                {
                    ...theme,
                    "toggled": "double-menu-close",
                }
            );
        }
    }, 100);
};
const ColorPicker = (props: any) => {
    return (
        <div className="color-picker-input">
            <input type="color" {...props} />
        </div>
    )
};
function hexToRgb(hex: any) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
const Themeprimarycolor = ({ actionfunction }: any) => {
	const theme = store.getState().reducer;
	const [state, updateState] = useState("#FFFFFF");

	const handleInput = (e: any) => {
		const rgb = hexToRgb(e.target.value);

		if (rgb !== null) {
			const { r, g, b } = rgb;
			updateState(e.target.value);
			actionfunction({
				...theme,
				"colorPrimaryRgb": `${r} , ${g} , ${b}`,
                "PrimaryRgb": `${r}  ${g}  ${b}`,
			});
			localStorage.setItem("dynamiccolor", `${r} ${g} ${b}`);
		}
	};

	return (
		<div className="Themeprimarycolor theme-container-primary pickr-container-primary">
			<ColorPicker onChange={handleInput} value={state} />
		</div>
	);
};
export default Themeprimarycolor;

export const Themebackgroundcolor = ({ actionfunction }: any) => {
    const theme = store.getState().reducer;
    const [state, updateState] = useState("#FFFFFF");
    const handleInput = (e: any) => {
        const { r, g, b }: any = hexToRgb(e.target.value);
        updateState(e.target.value);
        actionfunction({
            ...theme,
            "bodyBg": `${r}, ${g}, ${b}`,
            "darkBg": `${r + 19}, ${g + 19}, ${b + 19}`,
            "inputBorder": "rgba(255,255,255,0.1)",
            "gray": "rgba(255,255,255,0.1)",
            "lightRgb": `${r + 19}, ${g + 19}, ${b + 19}`,
            "class": "dark",
            "dataMenuStyles": "dark",
            "dataHeaderStyles": "dark",
            "defaultHeaderStyles": "",
        });
        localStorage.setItem("bodyBg", `${r}, ${g}, ${b}`);
        localStorage.setItem("darkBg", `${r + 19}, ${g + 19}, ${b + 19}`);
        localStorage.setItem("mamixHeader", "transparent");
        localStorage.removeItem("mamixMenu");

    };
    return (
        <div className="Themebackgroundcolor">
            <ColorPicker onChange={handleInput} value={state} />
        </div>
    );
};

export const bgImage = (actionfunction: any, img: string | null) => {
    const theme = store.getState().reducer
    actionfunction({
        ...theme,
        "bgImg": img,

    })
    localStorage.setItem("bgImg", img ?? '');
};

export const Reset = (actionfunction: any) => {
    const theme = store.getState().reducer;
    Vertical(actionfunction);
    actionfunction({
        ...theme,
        lang: "en",
        dir: "ltr",
        class: "light",
        dataMenuStyles: "light",
        dataNavLayout: "vertical",
        defaultHeaderStyles: "",
        dataHeaderStyles: "transparent",
        dataVerticalStyle: "overlay",
        StylebodyBg: "107 64 64",
        StyleDarkBg: "93 50 50",
        toggled: "",
        dataNavStyle: "",
        horStyle: "",
        dataPageStyle: "regular",
        dataWidth: "default",
        dataMenuPosition: "fixed",
        dataHeaderPosition: "fixed",
        loader: "disable",
        iconOverlay: "",
        colorPrimaryRgb: "",
        PrimaryRgb:"",
        bodyBg: "",
        darkBg: "",
        inputBorder: "",
        lightRgb: "",
        gray: "",
        bgImg: "",
        iconText: "",
        body: {
            class: ""
        }
    });
    localStorage.clear();
    const icon = document.getElementById("switcher-default-menu") as HTMLInputElement;
    if (icon) {
        icon.checked = true;
    }
};

export const Reset1 = (actionfunction: any) => {
    const theme = store.getState().reducer;
    Vertical(actionfunction);
    actionfunction({
        ...theme,
        lang: "en",
        dir: "ltr",
        class: "light",
        dataMenuStyles: "light",
        dataNavLayout: "horizontal",
        dataHeaderStyles: "",
        dataVerticalStyle: "",
        StylebodyBg: "107 64 64",
        StyleDarkBg: "93 50 50",
        toggled: "",
        dataNavStyle: "menu-hover",
        dataMenuPosition: "fixed",
        iconOverlay: "",
        colorPrimaryRgb: "",
        PrimaryRgb:"",
        bgImg: "",
        iconText: "",

       
    });
    localStorage.clear();
};

export const LocalStorageBackup = (actionfunction: any) => {

    (localStorage.mamixltr) ? Ltr(actionfunction) : "";
    (localStorage.mamixrtl) ? Rtl(actionfunction) : "";
    (localStorage.mamixdarktheme) ? Dark(actionfunction) : "";
    (localStorage.mamixlighttheme) ? Light(actionfunction) : "";
    (localStorage.mamixregular) ? Regular(actionfunction) : "";
    (localStorage.mamixclassic) ? Classic(actionfunction) : "";
    (localStorage.mamixmodern) ? Modern(actionfunction) : "";
    (localStorage.mamixfullwidth) ? Fullwidth(actionfunction) : "";
    (localStorage.mamixboxed) ? Boxed(actionfunction) : "";
    (localStorage.mamixmenufixed) ? FixedMenu(actionfunction) : "";
    (localStorage.mamixmenuscrollable) ? scrollMenu(actionfunction) : "";
    (localStorage.mamixheaderfixed) ? Headerpostionfixed(actionfunction) : "";
    (localStorage.mamixheaderscrollable) ? Headerpostionscroll(actionfunction) : "";

    // (localStorage.mamixloaderenable) ? Enable(actionfunction) : "";
    // (localStorage.mamixloaderdisable) ? Disable(actionfunction) : "";


    (localStorage.mamixnavstyles === "menu-click") ? Menuclick(actionfunction) : '';
    (localStorage.mamixnavstyles === "menu-hover") ? MenuHover(actionfunction) : '';
    (localStorage.mamixnavstyles === "icon-click") ? IconClick(actionfunction) : '';
    (localStorage.mamixnavstyles === "icon-hover") ? IconHover(actionfunction) : '';

    (localStorage.bgImg) ? bgImage(actionfunction, localStorage.bgImg) : '';

    (localStorage.mamixlayout == 'horizontal') && HorizontalClick(actionfunction);
    (localStorage.mamixlayout == 'vertical') && Vertical(actionfunction);
    //primitive 
    if (
        localStorage.getItem("mamixltr") == null ||
        localStorage.getItem("mamixltr") == "ltr"
    )

        // Theme Primary: Colors: Start
        switch (localStorage.primaryRGB) {
            case '106, 91, 204':
                primaryColor1(actionfunction);

                break;
            case '100, 149, 237':
                primaryColor2(actionfunction);

                break;
            case "0, 123, 167":
                primaryColor3(actionfunction);

                break;
            case "10, 180, 255":
                primaryColor4(actionfunction);

                break;
            case "46, 81, 145":
                primaryColor5(actionfunction);

                break;
            default:
                break;
        }
    // Theme Primary: Colors: End

    switch (localStorage.darkBg) {
        case '54 71 146':
            backgroundColor1(actionfunction, "clicked");

            break;
        case '51 102 189':
            backgroundColor2(actionfunction, "clicked");

            break;
        case '28 82 110':
            backgroundColor3(actionfunction, "clicked");

            break;
        case '39 128 179':
            backgroundColor4(actionfunction, "clicked");

            break;
        case '17 31 96':
            backgroundColor5(actionfunction, "clicked");

            break;
        default:
            break;
    }

    //layout
    if (localStorage.mamixverticalstyles) {
        const verticalStyles = localStorage.getItem("mamixverticalstyles");

        switch (verticalStyles) {
            case "default":
                Defaultmenu(actionfunction);
                break;
            case "closed":
                Closedmenu(actionfunction);
                break;
            case "icontext":
                iconText(actionfunction);
                break;
            case "overlay":
                iconOverayFn(actionfunction);
                break;
            case "detached":
                DetachedFn(actionfunction);
                break;
            case "doublemenu":
                DoubletFn(actionfunction);
                break;
        }
    }

    //Theme Primary:
    if (localStorage.dynamiccolor) {
        const theme = store.getState().reducer;
        actionfunction({
            ...theme,
            "colorPrimaryRgb": localStorage.dynamiccolor,
            "PrimaryRgb": localStorage.dynamiccolor,
        });
    }
    //Theme BAckground:
    //Theme BAckground:
    if (localStorage.bodyBg) {
        const theme = store.getState().reducer;
        actionfunction({
            ...theme,
            "bodyBg": localStorage.bodyBg,
            "darkBg": localStorage.darkBg,
            "inputBorder": "rgba(255,255,255,0.1)",
            "gray": "rgba(255,255,255,0.1)",
            "class": "dark",
            "dataMenuStyles": "dark",
            "dataHeaderStyles": "dark",
            "defaultHeaderStyles": "",
        });
        // Dark(actionfunction);
    }
    switch (localStorage.mamixMenu) {
        case 'light':
            lightMenu(actionfunction, "clicked");
            break;
        case 'dark':
            darkMenu(actionfunction, "clicked");

            break;
        case 'color':
            colorMenu(actionfunction, "clicked");

            break;
        case 'gradient':
            gradientMenu(actionfunction, "clicked");

            break;
        case 'transparent':
            transparentMenu(actionfunction, "clicked");

            break;
        default:
            break;
    }
   
    switch (localStorage.mamixHeader) {
        case 'light':
            lightHeader(actionfunction, "clicked");

            break;
        case 'dark':
            darkHeader(actionfunction, "clicked");

            break;
        case 'color':
            colorHeader(actionfunction, "clicked");

            break;
        case 'gradient':
            gradientHeader(actionfunction, "clicked");

            break;
        case 'transparent':
            transparentHeader(actionfunction, "clicked");

            break;
        default:
            break;
    }
};
export const LocalStorageBackup1 = (actionfunction:any) => {

	(localStorage.mamixltr) ? Ltr(actionfunction) : "";
	(localStorage.mamixrtl) ? Rtl(actionfunction) : "";
	(localStorage.mamixdarktheme) ? Dark(actionfunction) : "";
	(localStorage.mamixlighttheme) ? Light(actionfunction) : "";



	//primitive 
	if (
		localStorage.getItem("mamixltr") == null ||
		localStorage.getItem("mamixltr") == "ltr"
	)

		// Theme Primary: Colors: Start
		switch (localStorage.primaryRGB) {
			case "106, 91, 204":
				primaryColor1(actionfunction);

				break;
			case "100, 149, 237":
				primaryColor2(actionfunction);

				break;
			case "0, 123, 167":
				primaryColor3(actionfunction);

				break;
			case "10, 180, 255":
				primaryColor4(actionfunction);

				break;
			case "46, 81, 145":
				primaryColor5(actionfunction);

				break;
			default:
				break;
		}
	// Theme Primary: Colors: End

	switch (localStorage.bodyBg1) {
		case "49, 63, 141":
			backgroundColor1(actionfunction,"clicked");

			break;
		case "46, 94, 184":
			backgroundColor2(actionfunction,"clicked");

			break;
		case "23, 74, 105":
			backgroundColor3(actionfunction,"clicked");

			break;
		case "34, 120, 174":
			backgroundColor4(actionfunction,"clicked");

			break;
		case "12, 23, 91":
			backgroundColor5(actionfunction,"clicked");

			break;
		default:
			break;
	}


	//Theme Primary:
	if (localStorage.dynamiccolor) {
		const theme = store.getState().reducer;
		actionfunction({
			...theme,
			"colorPrimaryRgb": localStorage.dynamiccolor,
            "PrimaryRgb": localStorage.dynamiccolor,
		});
	}
	// Theme BAckground:
	if (localStorage.bodyBg1) {
		const theme = store.getState().reducer;
		actionfunction({
			...theme,
			"bodyBg1": localStorage.bodyBg1,
			"bodyBg2": localStorage.bodyBg2,
			"Light": localStorage.bodyBg2,
			"Formcontrol": localStorage.bodyBg2,
			"inputBorder": "255, 255, 255, 0.1",
			"Graycolor": "255, 255, 255, 0.1",
			"dataThemeMode": "dark",
			"dataHeaderStyles": localStorage.mamixHeader ? localStorage.mamixHeader : localStorage.mamixdarktheme ? "dark" : "dark",
			"dataMenuStyles": "dark",
		});
		// Dark(actionfunction);
	}




};
