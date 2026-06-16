"use client"

import { ThemeChanger } from "@/shared/redux/action"
import Themeprimarycolor, * as switcherdata from "@/shared/data/switcherdata/switcherdata"
import React, { Fragment, useEffect } from 'react'
import { connect } from "react-redux"
import SpkOverlay from "@/shared/@spk-reusable-components/uielements/spk-overlay"
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button"
import Link from "next/link"
const Switcher = ({ local_varaiable, ThemeChanger }: any) => {

  useEffect(() => {
    switcherdata.LocalStorageBackup(ThemeChanger)
  }, [])
  
  return (

    <Fragment>

      <div id="hs-overlay-switcher" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
        <div className="ti-offcanvas-header z-10 relative">
          <h5 className="ti-offcanvas-title">
            Switcher
          </h5>
          <SpkButton buttontype="button"
            customClass="ti-btn flex-shrink-0 !p-0 !mb-0  transition-none text-defaulttextcolor dark:text-defaulttextcolor/80 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white  dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
            Overlay="#hs-overlay-switcher">
            <span className="sr-only">Close modal</span>
            <i className="ri-close-circle-line leading-none text-lg"></i>
          </SpkButton>
        </div>
        <div className="ti-offcanvas-body !p-0 !border-b dark:border-white/10 z-10 relative !h-auto">
          <div className="flex rtl:space-x-reverse" aria-label="Tabs" role="tablist">
            <SpkButton buttontype="button"
              customClass="hs-tab-active:bg-danger/20 w-full !py-2 !px-4 hs-tab-active:border-b-transparent text-[0.813rem] border-0 hs-tab-active:text-danger dark:hs-tab-active:bg-danger/20 dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-danger -mb-px bg-white font-normal text-center  text-defaulttextcolor dark:text-defaulttextcolor/80 rounded-none hover:text-gray-700 dark:bg-bodybg dark:border-white/10  active"
              Id="switcher-item-1" Tab="#switcher-1" Controls="switcher-1" Role="tab">
              Theme Style
            </SpkButton>
            <SpkButton buttontype="button"
              customClass="hs-tab-active:bg-danger/20 w-full !py-2 !px-4 hs-tab-active:border-b-transparent text-[0.813rem] border-0 hs-tab-active:text-danger dark:hs-tab-active:bg-danger/20 dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-danger -mb-px  bg-white font-normal text-center  text-defaulttextcolor dark:text-defaulttextcolor/80 rounded-none hover:text-gray-700 dark:bg-bodybg dark:border-white/10  dark:hover:text-gray-300"
              Id="switcher-item-2" Tab="#switcher-2" Controls="switcher-2" Role="tab">
              Theme Colors
            </SpkButton>
          </div>
        </div>
        <div className="ti-offcanvas-body !p-0 !pb-[20rem]" id="switcher-body">
          <div id="switcher-1" role="tabpanel" aria-labelledby="switcher-item-1" className="">
            <div className="">
              <p className="switcher-style-head">Theme Color Mode:</p>
              <div className="grid grid-cols-3 switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-light-theme" checked={local_varaiable.class !== "dark"} onChange={(_e) => { }} onClick={() => switcherdata.Light(ThemeChanger, "clicked")} />
                  <label htmlFor="switcher-light-theme"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2 font-normal">Light</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-dark-theme" checked={local_varaiable.class == "dark"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Dark(ThemeChanger, "clicked")} />
                  <label htmlFor="switcher-dark-theme"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2 font-normal">Dark</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Directions:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-ltr" checked={local_varaiable.dir == "ltr"} onChange={(_e) => { }}
                    onClick={() => { switcherdata.Ltr(ThemeChanger); }} />
                  <label htmlFor="switcher-ltr" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">LTR</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-rtl" checked={local_varaiable.dir == "rtl"} onChange={(_e) => { }}
                    onClick={() => { switcherdata.Rtl(ThemeChanger); }} />
                  <label htmlFor="switcher-rtl" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">RTL</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Navigation Styles:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="navigation-style" className="ti-form-radio" id="switcher-vertical" checked={local_varaiable.dataNavLayout == "vertical"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Vertical(ThemeChanger)} />
                  <label htmlFor="switcher-vertical"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Vertical</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="navigation-style" className="ti-form-radio" id="switcher-horizontal" checked={local_varaiable.dataNavLayout == "horizontal"} onChange={(_e) => { }}
                    onClick={() => switcherdata.HorizontalClick(ThemeChanger)} />
                  <label htmlFor="switcher-horizontal"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Horizontal</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Navigation Menu Style:</p>
              <div className="grid grid-cols-2 gap-2 switcher-style">
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-menu-click"
                    checked={local_varaiable.dataNavStyle == "menu-click"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Menuclick(ThemeChanger)} />
                  <label htmlFor="switcher-menu-click" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Menu
                    Click</label>
                </div>
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-menu-hover" checked={local_varaiable.dataNavStyle == "menu-hover"} onChange={(_e) => { }}
                    onClick={() => switcherdata.MenuHover(ThemeChanger)} />
                  <label htmlFor="switcher-menu-hover" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Menu
                    Hover</label>
                </div>
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-icon-click" checked={local_varaiable.dataNavStyle == "icon-click"} onChange={(_e) => { }}
                    onClick={() => switcherdata.IconClick(ThemeChanger)} />
                  <label htmlFor="switcher-icon-click" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Icon
                    Click</label>
                </div>
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-icon-hover" checked={local_varaiable.dataNavStyle == "icon-hover"} onChange={(_e) => { }}
                    onClick={() => switcherdata.IconHover(ThemeChanger)} />
                  <label htmlFor="switcher-icon-hover" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Icon
                    Hover</label>
                </div>
              </div>
            </div>
            <div className=" sidemenu-layout-styles">
              <p className="switcher-style-head">Sidemenu Layout Syles:</p>
              <div className="grid grid-cols-2 gap-2 switcher-style">
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-default-menu" defaultChecked onClick={() => switcherdata.Defaultmenu(ThemeChanger)} />
                  <label htmlFor="switcher-default-menu"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal ">Default
                    Menu</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-closed-menu" checked={local_varaiable.dataVerticalStyle == "closed"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Closedmenu(ThemeChanger)} />
                  <label htmlFor="switcher-closed-menu" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal ">
                    Closed
                    Menu</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-icontext-menu" checked={local_varaiable.toggled == "icon-text-close"} onChange={(_e) => { }}
                    onClick={() => switcherdata.iconText(ThemeChanger)} />
                  <label htmlFor="switcher-icontext-menu" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal ">Icon
                    Text</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-icon-overlay" onChange={(_e) => { }} checked={local_varaiable.toggled == "icon-overlay-close"} onClick={() => switcherdata.iconOverayFn(ThemeChanger)} />
                  <label htmlFor="switcher-icon-overlay" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal ">Icon
                    Overlay</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-detached" checked={local_varaiable.toggled == "detached-close"} onChange={(_e) => { }}
                    onClick={() => switcherdata.DetachedFn(ThemeChanger)} />
                  <label htmlFor="switcher-detached"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal ">Detached</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-double-menu" checked={local_varaiable.dataVerticalStyle == "doublemenu"} onChange={(_e) => { }}
                    onClick={() => switcherdata.DoubletFn(ThemeChanger)} />
                  <label htmlFor="switcher-double-menu" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Double
                    Menu</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Page Styles:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex">
                  <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-regular" checked={local_varaiable.dataPageStyle == "regular"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Regular(ThemeChanger)} />
                  <label htmlFor="switcher-regular"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Regular</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-classic" checked={local_varaiable.dataPageStyle == "classic"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Classic(ThemeChanger)} />
                  <label htmlFor="switcher-classic"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Classic</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-modern" checked={local_varaiable.dataPageStyle == "modern"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Modern(ThemeChanger)} />
                  <label htmlFor="switcher-modern"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal"> Modern</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Layout Width Styles:</p>
              <div className="grid grid-cols-12 gap-4 switcher-style">
                <div className="sm:col-span-4 col-span-6">
                  <input type="radio" name="layout-width" className="ti-form-radio" id="switcher-default-width"
                    checked={local_varaiable.dataWidth == "default"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Defaultwidth(ThemeChanger)} />
                  <label htmlFor="switcher-default-width"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Default</label>
                </div>
                <div className="sm:col-span-4 col-span-6">
                  <input type="radio" name="layout-width" className="ti-form-radio" id="switcher-full-width" checked={local_varaiable.dataWidth == "fullwidth"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Fullwidth(ThemeChanger)} />
                  <label htmlFor="switcher-full-width"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">FullWidth</label>
                </div>
                <div className="sm:col-span-4 col-span-6">
                  <input type="radio" name="layout-width" className="ti-form-radio" id="switcher-boxed" checked={local_varaiable.dataWidth == "boxed"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Boxed(ThemeChanger)} />
                  <label htmlFor="switcher-boxed" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Boxed</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Menu Positions:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex">
                  <input type="radio" name="data-menu-positions" className="ti-form-radio" id="switcher-menu-fixed" checked={local_varaiable.dataMenuPosition == "fixed"} onChange={(_e) => { }}
                    onClick={() => switcherdata.FixedMenu(ThemeChanger)} />
                  <label htmlFor="switcher-menu-fixed"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Fixed</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-menu-positions" className="ti-form-radio" id="switcher-menu-scroll" checked={local_varaiable.dataMenuPosition == "scrollable"} onChange={(_e) => { }}
                    onClick={() => switcherdata.scrollMenu(ThemeChanger)} />
                  <label htmlFor="switcher-menu-scroll"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Scrollable </label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Header Positions:</p>
              <div className="grid grid-cols-3 switcher-style">
                <div className="flex">
                  <input type="radio" name="data-header-positions" className="ti-form-radio" id="switcher-header-fixed" checked={local_varaiable.dataHeaderPosition == "fixed"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Headerpostionfixed(ThemeChanger)} />
                  <label htmlFor="switcher-header-fixed" className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">
                    Fixed</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-header-positions" className="ti-form-radio" id="switcher-header-scroll" checked={local_varaiable.dataHeaderPosition == "scrollable"} onChange={(_e) => { }}
                    onClick={() => switcherdata.Headerpostionscroll(ThemeChanger)} />
                  <label htmlFor="switcher-header-scroll"
                    className="text-[0.813rem] text-defaulttextcolor dark:text-defaulttextcolor/80 ms-2  font-normal">Scrollable
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div id="switcher-2" className="hidden" role="tabpanel" aria-labelledby="switcher-item-2">
            <div className="theme-colors">
              <p className="switcher-style-head">Menu Colors:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-white" type="radio" name="menu-colors"
                    id="switcher-menu-light" checked={local_varaiable.dataMenuStyles == "light"} onChange={_e => { }}
                    onClick={() => switcherdata.lightMenu(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Light Menu
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-dark" type="radio" name="menu-colors"
                    id="switcher-menu-dark" checked={local_varaiable.dataMenuStyles == "dark"} onChange={_e => { }}
                    onClick={() => switcherdata.darkMenu(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Dark Menu
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-primary" type="radio" name="menu-colors"
                    id="switcher-menu-primary" checked={local_varaiable.dataMenuStyles == "color"} onChange={_e => { }}
                    onClick={() => switcherdata.colorMenu(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Color Menu
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-gradient" type="radio" name="menu-colors"
                    id="switcher-menu-gradient" checked={local_varaiable.dataMenuStyles == "gradient"} onChange={_e => { }}
                    onClick={() => switcherdata.gradientMenu(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Gradient Menu
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-transparent" type="radio" name="menu-colors"
                    id="switcher-menu-transparent" checked={local_varaiable.dataMenuStyles == "transparent"} onChange={_e => { }}
                    onClick={() => switcherdata.transparentMenu(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs !font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Transparent Menu
                  </span>
                </SpkOverlay>
              </div>
              <div className="px-4 text-textmuted dark:text-textmuted/50 text-[.6875rem]"><b className="me-2 font-normal">Note:</b>If you want to change color Menu
                dynamically
                change from below Theme Primary color picker.</div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Header Colors:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-white !border" type="radio" name="header-colors"
                    id="switcher-header-light" checked={local_varaiable.dataHeaderStyles == "light"} onChange={_e => { }}
                    onClick={() => switcherdata.lightHeader(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Light Header
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-dark" type="radio" name="header-colors"
                    id="switcher-header-dark" checked={local_varaiable.dataHeaderStyles == "dark"} onChange={_e => { }}
                    onClick={() => switcherdata.darkHeader(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Dark Header
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-primary" type="radio" name="header-colors"
                    id="switcher-header-primary" checked={local_varaiable.dataHeaderStyles == "color"} onChange={_e => { }}
                    onClick={() => switcherdata.colorHeader(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Color Header
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-gradient" type="radio" name="header-colors"
                    id="switcher-header-gradient" checked={local_varaiable.dataHeaderStyles == "gradient"} onChange={_e => { }}
                    onClick={() => switcherdata.gradientHeader(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Gradient Header
                  </span>
                </SpkOverlay>
                <SpkOverlay customClass="ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-transparent" type="radio"
                    name="header-colors" id="switcher-header-transparent" checked={local_varaiable.dataHeaderStyles == "transparent"} onChange={_e => { }}
                    onClick={() => switcherdata.transparentHeader(ThemeChanger, "clicked")} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Transparent Header
                  </span>
                </SpkOverlay>
              </div>
              <div className="px-4 text-textmuted dark:text-textmuted/50 text-[.6875rem]"><b className="me-2 !font-normal">Note:</b>If you want to change color
                Header dynamically
                change from below Theme Primary color picker.</div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Theme Primary:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-1" type="radio" name="theme-primary"
                    id="switcher-primary" checked={local_varaiable.PrimaryRgb == "106, 91, 204"} onChange={(_e) => { }}
                    onClick={() => switcherdata.primaryColor1(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-2" type="radio" name="theme-primary"
                    id="switcher-primary1" checked={local_varaiable.PrimaryRgb == "100, 149, 237"} onChange={(_e) => { }}
                    onClick={() => switcherdata.primaryColor2(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-3" type="radio" name="theme-primary"
                    id="switcher-primary2" checked={local_varaiable.PrimaryRgb == "0, 123, 167"} onChange={(_e) => { }}
                    onClick={() => switcherdata.primaryColor3(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-4" type="radio" name="theme-primary"
                    id="switcher-primary3" checked={local_varaiable.PrimaryRgb == "10, 180, 255"} onChange={(_e) => { }}
                    onClick={() => switcherdata.primaryColor4(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-5" type="radio" name="theme-primary"
                    id="switcher-primary4" checked={local_varaiable.PrimaryRgb == "46, 81, 145"} onChange={(_e) => { }}
                    onClick={() => switcherdata.primaryColor5(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select ps-0 mt-1 color-primary-light">
                  <div className='theme-container-primary'>
                    <SpkButton customClass="">nano</SpkButton>
                  </div>
                  <div className='pickr-container-primary'>
                    <div className='pickr'>
                      <SpkButton customClass='pcr-button' onclickfunc={(ele: any) => {
                        if (ele.target.querySelector("input")) {
                          ele.target.querySelector("input").click();
                        }
                      }}>
                        <Themeprimarycolor theme={local_varaiable} actionfunction={ThemeChanger} />
                      </SpkButton>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Theme Background:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-1" type="radio" name="theme-background"
                    id="switcher-background" checked={local_varaiable.bodyBg == "12, 23, 91"}
                    onClick={() => switcherdata.backgroundColor1(ThemeChanger, "clicked")} onChange={(_e) => { }} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-2" type="radio" name="theme-background"
                    id="switcher-background1" checked={local_varaiable.bodyBg == "50, 11, 110"}
                    onClick={() => switcherdata.backgroundColor2(ThemeChanger, "clicked")} onChange={(_e) => { }} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-3" type="radio" name="theme-background"
                    id="switcher-background2" checked={local_varaiable.bodyBg == "8, 81, 113"}
                    onClick={() => switcherdata.backgroundColor3(ThemeChanger, "clicked")} onChange={(_e) => { }} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-4" type="radio" name="theme-background"
                    id="switcher-background3" onClick={() => switcherdata.backgroundColor4(ThemeChanger, "clicked")} onChange={(_e) => { }}
                    checked={local_varaiable.bodyBg == "3, 81, 60"} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-5" type="radio" name="theme-background"
                    id="switcher-background4" onClick={() => switcherdata.backgroundColor5(ThemeChanger, "clicked")} onChange={(_e) => { }}
                    checked={local_varaiable.bodyBg == "73, 78, 1"} />
                </div>
                <div className="ti-form-radio switch-select ps-0 mt-1 color-bg-transparent">
                  <div className='theme-container-background' >
                    <SpkButton customClass="">nano</SpkButton>
                  </div>
                  <div className='pickr-container-background'>
                    <div className='pickr'>
                      <SpkButton customClass='pcr-button' onclickfunc={(ele: any) => {
                        if (ele.target.querySelector("input")) {
                          ele.target.querySelector("input").click();
                        }
                      }}>
                        <switcherdata.Themebackgroundcolor theme={local_varaiable} actionfunction={ThemeChanger} />
                      </SpkButton>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-image theme-colors">
              <p className="switcher-style-head">Menu With Background Image:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse flex-wrap gap-3">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img1" type="radio" name="theme-images" id="switcher-bg-img" checked={local_varaiable.bgImg == "bgimg1"} onChange={(_e) => { }}
                    onClick={() => switcherdata.bgImage(ThemeChanger, 'bgimg1')} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img2" type="radio" name="theme-images" id="switcher-bg-img1" checked={local_varaiable.bgImg == "bgimg2"} onChange={(_e) => { }}
                    onClick={() => switcherdata.bgImage(ThemeChanger, 'bgimg2')} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img3" type="radio" name="theme-images" id="switcher-bg-img2" checked={local_varaiable.bgImg == "bgimg3"} onChange={(_e) => { }}
                    onClick={() => switcherdata.bgImage(ThemeChanger, 'bgimg3')} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img4" type="radio" name="theme-images" id="switcher-bg-img3" checked={local_varaiable.bgImg == "bgimg4"} onChange={(_e) => { }}
                    onClick={() => switcherdata.bgImage(ThemeChanger, 'bgimg4')} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img5" type="radio" name="theme-images" id="switcher-bg-img4" checked={local_varaiable.bgImg == "bgimg5"} onChange={(_e) => { }}
                    onClick={() => switcherdata.bgImage(ThemeChanger, 'bgimg5')} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ti-offcanvas-footer sm:flex justify-between">
          <Link scroll={false} href="#!" id="reset-all" className="ti-btn ti-btn-danger m-1 w-full" onClick={() => switcherdata.Reset(ThemeChanger)}>Reset</Link>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state: {reducer:any}) => ({
  local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Switcher);