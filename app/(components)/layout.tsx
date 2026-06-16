"use client"
import { Initialload } from '@/shared/layouts-components/contextapi';
import { ThemeChanger } from '@/shared/redux/action';
import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux';


const Layout = ({ local_varaiable, children }: any) => {

  const customstyles: any = {
    ...(local_varaiable.colorPrimaryRgb !== '' && { '--primary-rgb': local_varaiable.colorPrimaryRgb }),
    ...(local_varaiable.PrimaryRgb !== '' && { '--primary': local_varaiable.PrimaryRgb }),
    ...(local_varaiable.bodyBg !== '' && { '--body-bg': local_varaiable.bodyBg }),
    ...(local_varaiable.darkBg !== '' && { '--dark-bg': local_varaiable.darkBg }),
    ...(local_varaiable.gray !== '' && { '--gray-3': local_varaiable.gray }),
    ...(local_varaiable.inputBorder !== '' && { '--input-border': local_varaiable.inputBorder }),
    ...(local_varaiable.lightRgb !== '' && { '--light': local_varaiable.darkBg })
  };

  const [_lateLoad, setlateLoad] = useState(false);

  
  const theme :any= useContext(Initialload);
  useEffect(() => {
   setlateLoad(true);
  }, []);

  return (
    <div
      dir={local_varaiable.dir}
      className={local_varaiable.class}
      data-header-styles={local_varaiable.dataHeaderStyles}
      data-vertical-style={local_varaiable.dataVerticalStyle}
      data-nav-layout={local_varaiable.dataNavLayout}
      data-menu-styles={local_varaiable.dataMenuStyles}
      data-toggled={local_varaiable.toggled}
      data-nav-style={local_varaiable.dataNavStyle}
      hor-style={local_varaiable.horStyle}
      data-page-style={local_varaiable.dataPageStyle}
      data-width={local_varaiable.dataWidth}
      data-menu-position={local_varaiable.dataMenuPosition}
      data-header-position={local_varaiable.dataHeaderPosition}
      data-icon-overlay={local_varaiable.iconOverlay}
      bg-img={local_varaiable.bgImg}
      icon-text={local_varaiable.iconText}
      style={customstyles} suppressHydrationWarning={false}>
      <div className={`${local_varaiable.body ? local_varaiable.body : ''}`}>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Layout);