import { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ThemeChanger } from "@/shared/redux/action";
import SimpleBar from "simplebar-react";
import Menuloop from "./menuloop";
import Link from "next/link";
import store from "@/shared/redux/store";
import { getMenuItems } from "./nav";
import { usePathname } from "next/navigation";
import SpkOverlay from "@/shared/@spk-reusable-components/uielements/spk-overlay";
import Image from "next/image";
import nextConfig from "@/next.config";
import { useSession } from "@/app/SessionProvider";
import SidebarNew from "@/shared/layouts-components/sidebarnew/layouts/sidebar/page";
// import { SchoolUser } from "@/app/(components)/(content-layout)/realestate/actions/auth";

const Sidebar = ({ local_varaiable, ThemeChanger }: any) => {
  let { basePath } = nextConfig;
  const { user } = useSession();

  const [menuitems, setMenuitems] = useState(getMenuItems(user));

  // Aktif ofis (user.agencyId) değişince menüyü yeniden kur ki
  // /crm/agency/<agencyId> gibi dinamik linkler yeni ofise işaret etsin.
  // (Ofis geçişinde router.push ile pathname de değiştiği için aktif/seçili
  //  durumu aşağıdaki pathname effect'i yeniden uygular.)
  useEffect(() => {
    setMenuitems(getMenuItems(user));
  }, [user?.agencyId]);

  // const [menuitems, setMenuitems] = useState([]);

  // useEffect(() => {
  //   if (!user) return;

  //   const fetchData = async () => {
  //     const school = await SchoolUser(user.id);
  //     const items = getMenuItems(user, school);
  //     setMenuitems(items);
  //   };

  //   fetchData();
  // }, [user]);

  function closeMenuFn() {
    const closeMenuRecursively = (items: any) => {
      items?.forEach((item: any) => {
        item.active = false;
        closeMenuRecursively(item.children);
      });
    };
    closeMenuRecursively(getMenuItems);
    setMenuitems((arr: any) => [...arr]);
  }

  const sidebarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const slidesArrow = (selector: any) => document.querySelector(selector);

  const SelectorAll = (selector: any) => document.querySelectorAll(selector);

  useEffect(() => {
    const resizeEventListeners = [
      { event: "resize", handler: menuResizeFn },
      { event: "resize", handler: checkHoriMenu },
    ];
    resizeEventListeners.forEach(({ event, handler }) => {
      window.addEventListener(event, handler);
    });
    const mainContent = slidesArrow(".main-content");
    if (window.innerWidth <= 992) {
      if (mainContent) {
        const theme = store.getState().reducer;
        ThemeChanger({ ...theme, toggled: "close" });
      } else if (
        document.documentElement.getAttribute("data-nav-layout") == "horizontal"
      ) {
        closeMenuFn();
      }
    }
    if (mainContent) {
      mainContent.addEventListener("click", menuClose);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      resizeEventListeners.forEach(({ event, handler }) => {
        window.removeEventListener(event, handler);
      });
      if (mainContent) {
        mainContent.removeEventListener("click", menuClose);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();

  function Onhover() {
    const theme = store.getState().reducer;
    if (
      (theme.toggled == "icon-overlay-close" ||
        theme.toggled == "detached-close") &&
      theme.iconOverlay != "open"
    ) {
      ThemeChanger({ ...theme, iconOverlay: "open" });
    }
  }
  function Outhover() {
    const theme = store.getState().reducer;
    if (
      (theme.toggled == "icon-overlay-close" ||
        theme.toggled == "detached-close") &&
      theme.iconOverlay == "open"
    ) {
      ThemeChanger({ ...theme, iconOverlay: "" });
    }
  }

  const overlayRef: any = useRef(null);

  function menuClose() {
    const theme = store.getState().reducer;

    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }
    if (overlayRef.current) {
      overlayRef.current.classList.remove("active");
    }
    if (
      theme.dataNavLayout === "horizontal" ||
      theme.dataNavStyle === "menu-click" ||
      theme.dataNavStyle === "icon-click"
    ) {
      closeMenuFn();
    }
  }

  const WindowPreSize =
    typeof window !== "undefined" ? [window.innerWidth] : [];
  function menuResizeFn() {
    if (typeof window === "undefined") {
      // Handle the case where window is not available (server-side rendering)
      return;
    }

    WindowPreSize.push(window.innerWidth);
    if (WindowPreSize.length > 2) {
      WindowPreSize.shift();
    }

    const theme = store.getState().reducer;
    const currentWidth = WindowPreSize[WindowPreSize.length - 1];
    const prevWidth = WindowPreSize[WindowPreSize.length - 2];

    if (WindowPreSize.length > 1) {
      if (currentWidth < 992 && prevWidth >= 992) {
        // less than 992;
        ThemeChanger({ ...theme, toggled: "close" });
      }

      if (currentWidth >= 992 && prevWidth < 992) {
        // greater than 992
        ThemeChanger({
          ...theme,
          toggled:
            theme.dataVerticalStyle === "doublemenu" ? "double-menu-open" : "",
        });
      }
    }
  }
  const menuNavRef: any = useRef(null);
  const mainContainerRef: any = useRef(null);

  function checkHoriMenu() {
    const menuNav = menuNavRef.current;
    const mainContainer1 = mainContainerRef.current;

    if (menuNav && mainContainer1) {
      const computedStyle = window.getComputedStyle(menuNav);
      const marginLeftValue = Math.ceil(
        Number(computedStyle.marginLeft.split("px")[0]),
      );
      const marginRightValue = Math.ceil(
        Number(computedStyle.marginRight.split("px")[0]),
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
      } else {
        menuNav.style.marginLeft = "0px";
        menuNav.style.marginRight = "0px";
        menuNav.style.marginInlineStart = "0px";
      }

      const isRtl = document.documentElement.getAttribute("dir") === "rtl";

      if (!isRtl) {
        if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
          if (Math.abs(check) < Math.abs(marginLeftValue)) {
            menuNav.style.marginLeft = -check + "px";
          }
        }
      } else {
        if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
          if (Math.abs(check) < Math.abs(marginRightValue)) {
            menuNav.style.marginRight = -check + "px";
          }
        }
      }
    }
  }

  function switcherArrowFn() {
    // Used to remove is-expanded class and remove class on clicking arrow buttons
    function slideClick() {
      const slide: any = SelectorAll(".slide");
      const slideMenu: any = SelectorAll(".slide-menu");

      slide.forEach((element: any) => {
        if (element.classList.contains("is-expanded")) {
          element.classList.remove("is-expanded");
        }
      });

      slideMenu.forEach((element: any) => {
        if (element.classList.contains("open")) {
          element.classList.remove("open");
          element.style.display = "none";
        }
      });
    }

    slideClick();
  }

  function slideRight() {
    const menuNav: any = slidesArrow(".main-menu");
    const mainContainer1: any = slidesArrow(".main-sidebar");
    const slideRightButton: any = slidesArrow("#slide-right");
    const slideLeftButton: any = slidesArrow("#slide-left");
    const element: any = slidesArrow(".main-menu > .slide.open");
    const element1: any = slidesArrow(".main-menu > .slide.open > ul");
    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(
          window.getComputedStyle(menuNav).marginInlineStart.split("px")[0],
        ),
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0]),
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataVerticalStyle.dir === "rtl")) {
          if (Math.abs(check) > Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineEnd = "0";

            if (
              !(
                Math.abs(check) >
                Math.abs(marginLeftValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);

              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";

            if (slideRightButton) {
              slideRightButton.classList.remove("hidden");
            }
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineEnd = "0";

            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);
              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";
            if (slideLeftButton) {
              slideLeftButton.classList.remove("hidden");
            }
          }
        }
      }

      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
  }

  function slideLeft() {
    const menuNav: any = slidesArrow(".main-menu");
    const mainContainer1: any = slidesArrow(".main-sidebar");
    const slideRightButton: any = slidesArrow("#slide-right");
    const slideLeftButton: any = slidesArrow("#slide-left");
    const element: any = slidesArrow(".main-menu > .slide.open");
    const element1: any = slidesArrow(".main-menu > .slide.open > ul");
    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(
          window.getComputedStyle(menuNav).marginInlineStart.split("px")[0],
        ),
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0]),
      );
      const check: any = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataVerticalStyle.dir === "rtl")) {
          if (Math.abs(check) <= Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineStart = "0px";
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineStart = "0";

            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);

              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";

            if (slideLeftButton) {
              slideLeftButton.classList.remove("hidden");
            }
          }
        }
      }

      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
  }

  const level = 0;
  let hasParent = false;
  let hasParentLevel = 0;

  function setSubmenu(event: any, targetObject: any, MENUITEMS = menuitems) {
    const theme = store.getState().reducer;
    if (!event?.ctrlKey) {
      for (const item of MENUITEMS) {
        if (item === targetObject) {
          item.active = true;
          item.selected = true;
          setMenuAncestorsActive(item);
        } else if (!item.active && !item.selected) {
          item.active = false; // Set active to false for items not matching the target
          item.selected = false; // Set active to false for items not matching the target
        } else {
          removeActiveOtherMenus(item);
        }
        if (item.children && item.children.length > 0) {
          setSubmenu(event, targetObject, item.children);
        }
      }
    }

    setMenuitems((arr: any) => [...arr]);
  }
  function getParentObject(obj: any, childObject: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          typeof obj[key] === "object" &&
          JSON.stringify(obj[key]) === JSON.stringify(childObject)
        ) {
          return obj; // Return the parent object
        }
        if (typeof obj[key] === "object") {
          const parentObject: any = getParentObject(obj[key], childObject);
          if (parentObject !== null) {
            return parentObject;
          }
        }
      }
    }
    return null; // Object not found
  }
  function setMenuAncestorsActive(targetObject: any) {
    const parent = getParentObject(menuitems, targetObject);
    const theme = store.getState().reducer;
    if (parent) {
      if (hasParentLevel > 2) {
        hasParent = true;
      }
      parent.active = true;
      parent.selected = true;
      hasParentLevel += 1;
      setMenuAncestorsActive(parent);
    } else if (!hasParent) {
      if (theme.dataVerticalStyle == "doublemenu") {
        ThemeChanger({ ...theme, toggled: "double-menu-close" });
      }
    }
  }
  function removeActiveOtherMenus(item: any) {
    if (item) {
      if (Array.isArray(item)) {
        for (const val of item) {
          val.active = false;
          val.selected = false;
        }
      }
      item.active = false;
      item.selected = false;

      if (item.children && item.children.length > 0) {
        removeActiveOtherMenus(item.children);
      }
    } else {
    }
  }
  //
  function setMenuUsingUrl(currentPath: any) {
    hasParent = false;
    hasParentLevel = 1;
    // Check current url and trigger the setSidemenu method to active the menu.
    const setSubmenuRecursively = (items: any) => {
      items?.forEach((item: any) => {
        if (item.path == "") {
        } else if (item.path === currentPath) {
          setSubmenu(null, item);
        }
        setSubmenuRecursively(item.children);
      });
    };
    setSubmenuRecursively(menuitems);
  }
  const [previousUrl, setPreviousUrl] = useState("/");

  useEffect(() => {
    const currentPath = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

    if (currentPath !== previousUrl) {
      setMenuUsingUrl(currentPath);
      setPreviousUrl(currentPath);
    }
  }, [pathname]);

  //
  function toggleSidemenu(
    event: any,
    targetObject: any,
    MENUITEMS = menuitems,
  ) {
    const theme = store.getState().reducer;
    let element = event.target;
    if (
      (theme.dataNavStyle != "icon-hover" &&
        theme.dataNavStyle != "menu-hover") ||
      window.innerWidth < 992 ||
      (theme.dataNavLayout != "horizontal" &&
        theme.toggled != "icon-hover-closed" &&
        theme.toggled != "menu-hover-closed")
    ) {
      for (const item of MENUITEMS) {
        if (item === targetObject) {
          if (theme.dataVerticalStyle == "doublemenu" && item.active) {
            return;
          }
          item.active = !item.active;

          if (item.active) {
            closeOtherMenus(MENUITEMS, item);
          } else {
            if (theme.dataVerticalStyle == "doublemenu") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            }
          }
          setAncestorsActive(MENUITEMS, item);
        } else if (!item.active) {
          if (theme.dataVerticalStyle != "doublemenu") {
            item.active = false; // Set active to false for items not matching the target
          }
        }
        if (item.children && item.children.length > 0) {
          toggleSidemenu(event, targetObject, item.children);
        }
      }
      if (targetObject?.children && targetObject.active) {
        if (
          theme.dataVerticalStyle == "doublemenu" &&
          theme.toggled != "double-menu-open"
        ) {
          ThemeChanger({ ...theme, toggled: "double-menu-open" });
        }
      }
      if (
        element &&
        theme.dataNavLayout == "horizontal" &&
        (theme.dataNavStyle == "menu-click" ||
          theme.dataNavStyle == "icon-click")
      ) {
        const listItem = element.closest("li");
        if (listItem) {
          // Find the first sibling <ul> element
          const siblingUL = listItem.querySelector("ul");
          let outterUlWidth = 0;
          let listItemUL = listItem.closest("ul:not(.main-menu)");
          while (listItemUL) {
            listItemUL = listItemUL.parentElement.closest("ul:not(.main-menu)");
            if (listItemUL) {
              outterUlWidth += listItemUL.clientWidth;
            }
          }
          if (siblingUL) {
            // You've found the sibling <ul> element
            let siblingULRect = listItem.getBoundingClientRect();
            if (theme.dir == "rtl") {
              if (
                siblingULRect.left - siblingULRect.width - outterUlWidth + 150 <
                  0 &&
                outterUlWidth < window.innerWidth &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                  window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            } else {
              if (
                outterUlWidth + siblingULRect.right + siblingULRect.width + 50 >
                  window.innerWidth &&
                siblingULRect.right >= 0 &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                  window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            }
          }
          setTimeout(() => {
            let computedValue = siblingUL.getBoundingClientRect();
            if (computedValue.bottom > window.innerHeight) {
              siblingUL.style.height =
                window.innerHeight - computedValue.top - 8 + "px";
              siblingUL.style.overflow = "auto";
            }
          }, 100);
        }
      }
      setMenuitems((arr: any) => [...arr]);
    }
  }

  function setAncestorsActive(MENUITEMS: any, targetObject: any) {
    const theme = store.getState().reducer;
    const parent = findParent(MENUITEMS, targetObject);
    if (parent) {
      parent.active = true;
      if (parent.active) {
        ThemeChanger({ ...theme, toggled: "double-menu-open" });
      }

      setAncestorsActive(MENUITEMS, parent);
    } else {
      if (theme.dataVerticalStyle == "doublemenu") {
        ThemeChanger({ ...theme, toggled: "double-menu-close" });
      }
    }
  }

  function closeOtherMenus(MENUITEMS: any, targetObject: any) {
    for (const item of MENUITEMS) {
      if (item !== targetObject) {
        item.active = false;
        if (item.children && item.children.length > 0) {
          closeOtherMenus(item.children, targetObject);
        }
      }
    }
  }

  function findParent(MENUITEMS: any, targetObject: any) {
    for (const item of MENUITEMS) {
      if (item.children && item.children.includes(targetObject)) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const parent: any = findParent(
          (MENUITEMS = item.children),
          targetObject,
        );
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }
  //
  function HoverToggleInnerMenuFn(event: any, item: any) {
    const theme = store.getState().reducer;
    let element = event.target;
    if (
      element &&
      theme.dataNavLayout == "horizontal" &&
      (theme.dataNavStyle == "menu-hover" || theme.dataNavStyle == "icon-hover")
    ) {
      const listItem = element.closest("li");
      if (listItem) {
        // Find the first sibling <ul> element
        const siblingUL = listItem.querySelector("ul");
        let outterUlWidth = 0;
        let listItemUL = listItem.closest("ul:not(.main-menu)");
        while (listItemUL) {
          listItemUL = listItemUL.parentElement.closest("ul:not(.main-menu)");
          if (listItemUL) {
            outterUlWidth += listItemUL.clientWidth;
          }
        }
        if (siblingUL) {
          // You've found the sibling <ul> element
          let siblingULRect = listItem.getBoundingClientRect();
          if (theme.dir == "rtl") {
            if (
              siblingULRect.left - siblingULRect.width - outterUlWidth + 150 <
                0 &&
              outterUlWidth < window.innerWidth &&
              outterUlWidth + siblingULRect.width + siblingULRect.width <
                window.innerWidth
            ) {
              item.dirchange = true;
            } else {
              item.dirchange = false;
            }
          } else {
            if (
              outterUlWidth + siblingULRect.right + siblingULRect.width + 50 >
                window.innerWidth &&
              siblingULRect.right >= 0 &&
              outterUlWidth + siblingULRect.width + siblingULRect.width <
                window.innerWidth
            ) {
              item.dirchange = true;
            } else {
              item.dirchange = false;
            }
          }
        }
      }
    }
  }

  //to open menu
  const Sideclick = () => {
    if (window.innerWidth > 992) {
      let html = document.documentElement;
      if (html.getAttribute("data-icon-overlay") != "open") {
        html.setAttribute("data-icon-overlay", "open");
      }
    }
  };

  const handleClick = (event: any) => {
    // Your logic here
    event.preventDefault(); // Prevents the default anchor behavior (navigation)
    // ... other logic you want to perform on click
  };

  const localStorageDefined: any = typeof localStorage !== "undefined";
  return (
    <Fragment>
      <div
        id="responsive-overlay"
        ref={overlayRef}
        onClick={() => {
          menuClose();
        }}
      ></div>
      <aside
        ref={sidebarRef}
        className={`app-sidebar ${isSticky ? "sticky-pin" : ""}`}
        id="sidebar"
        onMouseOver={() => Onhover()}
        onMouseLeave={() => Outhover()}
      >
        <div className="main-sidebar-header">
          <div className="header-logo relative">
            {/* <Image
              fill
              src="/assets/images/logo.png"
              alt="logo"
              className="desktop-logo"
            /> */}
            {/* Emlak logosu */}
            <Link href="/sahibinden" className="desktop-logo flex items-center">
              <span className="rounded bg-yellow-400 px-2 py-1 text-lg font-extrabold leading-none text-gray-900">
                emlak
              </span>
            </Link>
            <Image
              fill
              src="/assets/images/logo.png"
              alt="logo"
              className="toggle-logo"
            />
            <Image
              fill
              src="/assets/images/logo.png"
              alt="logo"
              className="desktop-dark"
            />
            <Image
              fill
              src="/assets/images/logo.png"
              alt="logo"
              className="toggle-dark"
            />
            <Image
              fill
              src="/assets/images/logo.png"
              alt="logo"
              className="desktop-white"
            />
            <Image
              fill
              src="/assets/images/logo.png"
              alt="logo"
              className="toggle-white"
            />
          </div>
        </div>
        <SimpleBar
          ref={mainContainerRef}
          className="main-sidebar"
          id="sidebar-scroll"
        >
          <nav className="main-menu-container nav nav-pills flex-column sub-open">
            <div
              className="slide-left"
              id="slide-left"
              onClick={() => {
                slideLeft();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </div>

            {/* <SidebarNew/>  */}
            <ul
              className="main-menu"
              ref={menuNavRef}
              onClick={() => Sideclick()}
            >
              {menuitems.map((levelone: any, index: any) => (
                <Fragment key={index}>
                  <li
                    className={`${levelone.menutitle ? "slide__category" : ""}  
									                ${levelone.type === "link" ? "slide" : ""}
                                                    ${levelone.type === "sub" ? "slide has-sub" : ""} 
													${levelone?.active ? "open" : ""} 
													${levelone?.selected ? "active" : ""}`}
                  >
                    {levelone.menutitle ? (
                      <span className="category-name">
                        {levelone.menutitle}
                      </span>
                    ) : (
                      ""
                    )}
                    {levelone.type === "link" ? (
                      <Link
                        href={levelone.path + "/"}
                        className={`side-menu__item ${levelone.selected ? "active" : ""}`}
                      >
                        {localStorageDefined.mamixlayout === "horizontal" ? (
                          <span className="side-menu__icon">
                            {levelone.icon}
                          </span>
                        ) : localStorageDefined.mamixverticalstyles ===
                          "doublemenu" ? (
                          <div className="">
                            <SpkOverlay
                              customClass={`[--placement:${localStorageDefined.mamixrtl ? "left" : "right"}]`}
                            >
                              <span className="side-menu__icon">
                                {levelone.icon}
                              </span>
                              <span
                                className="hs-tooltip-content  ti-main-tooltip-content !border-black py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                role="tooltip"
                              >
                                {levelone.title}
                              </span>
                            </SpkOverlay>
                          </div>
                        ) : (
                          <span className="side-menu__icon">
                            {levelone.icon}
                          </span>
                        )}
                        <span className="side-menu__label">
                          {levelone.title}{" "}
                          {levelone.badgetxt ? (
                            <span className={levelone.class}>
                              {" "}
                              {levelone.badgetxt}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                    ) : (
                      ""
                    )}

                    {levelone.type === "empty" ? (
                      <Link
                        href="#!"
                        className="side-menu__item"
                        onClick={handleClick}
                      >
                        {levelone.icon}
                        <span className="">
                          {levelone.title}{" "}
                          {levelone.badgetxt ? (
                            <span className={levelone.class}>
                              {levelone.badgetxt}{" "}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                    ) : (
                      ""
                    )}
                    {levelone.type === "sub" ? (
                      <Menuloop
                        MENUITEMS={levelone}
                        level={level + 1}
                        toggleSidemenu={toggleSidemenu}
                        HoverToggleInnerMenuFn={HoverToggleInnerMenuFn}
                      />
                    ) : (
                      ""
                    )}
                  </li>
                </Fragment>
              ))}
            </ul>
            <div
              className="slide-right"
              id="slide-right"
              onClick={() => slideRight()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </nav>
        </SimpleBar>
      </aside>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state.reducer,
});

export default connect(mapStateToProps, { ThemeChanger })(Sidebar);