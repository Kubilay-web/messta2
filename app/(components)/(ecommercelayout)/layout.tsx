"use client"
import { Ecommercecontext } from '@/shared/contextapi'
import { Ecommerceproducts } from '@/shared/data/apps/ecommers/customer/reduxdata'
import Backtotop from '@/shared/layouts-components/backtotop/backtotop'
import Ecommercefooter from '@/shared/layouts-components/ecommercefooter/ecommercefooter'
import Ecommerceheader from '@/shared/layouts-components/ecommerceheader/ecommerceheader'
import Ecommercesidebar from '@/shared/layouts-components/ecommercesidebar/ecommercesidebar'
import LandingSwitcher from '@/shared/layouts-components/switcher/landing-switcher'
import { ThemeChanger } from '@/shared/redux/action'
import store from '@/shared/redux/store'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { connect } from 'react-redux'

const Layout = ({ children, ThemeChanger }: any) => {
  const [lateLoad, setlateLoad] = useState(false);
  const [productdata, setproductdata] = useState(Ecommerceproducts)
  useEffect(() => {
    productdata

    setlateLoad(true);
    const theme = store.getState().reducer;
    ThemeChanger({

      ...theme,
      "dataNavStyle": "menu-hover",
      "dataNavLayout": "horizontal",
      //   "class": "h-full",
      "dataHeaderStyles": "",
      "dataVerticalStyle": "",
      "bgImg":"",
      "body": "landing-body ecommerce-landing"

    });

    return () => {
      ThemeChanger({
        ...theme,
        "dataNavStyle": "",
        "dataVerticalStyle": "",
        "dataHeaderStyles": "",
        "bgImg":"",
        "dataNavLayout": `${localStorage.mamixlayout == "horizontal" ? "horizontal" : "vertical"}`,
        "body": "",

      });
    };
  }, [productdata]);



  return (
    <Fragment>
      <Ecommercecontext.Provider value={{ productdata, setproductdata }}>
        <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
          <LandingSwitcher />
          <div className='landing-page-wrapper'>
            <Ecommerceheader />
            <Ecommercesidebar />
            <div className='main-content landing-main ecommerce-main'>
              {children}
            </div>
            <Ecommercefooter />
          </div>
          <Backtotop />
        </div>
      </Ecommercecontext.Provider>
    </Fragment>
  )
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state.reducer
});
export default memo(connect(mapStateToProps, { ThemeChanger })(Layout));
