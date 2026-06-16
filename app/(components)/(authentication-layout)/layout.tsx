"use client"
import PrelineScript from '@/app/PrelineScript';
import LandingSwitcher from '@/shared/layouts-components/switcher/landing-switcher';
import { ThemeChanger } from '@/shared/redux/action';
import { usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useRef } from 'react'
import { connect } from 'react-redux';




const Layout = ({ children,}: any) => {
    const pathName = usePathname()

    const bodyRef = useRef<any>(null);


    useEffect(() => {
        bodyRef.current= document.body

        if (pathName.includes('/basic')) {
            bodyRef.current.classList.add('authentication-background',);
        } else {
            bodyRef.current.classList.remove('authentication-background',);
        }

        if (pathName.includes('/cover')) {
            bodyRef.current.classList.add("bg-white", "dark:!bg-bodybg", "text-defaulttextcolor", "dark:text-defaulttextcolor/80", "text-defaultsize")
        } else {
            bodyRef.current.classList.remove("bg-white", "dark:!bg-bodybg", "text-defaulttextcolor", "dark:text-defaulttextcolor/80", "text-defaultsize")
        }

        if (pathName.includes('/coming-soon') || pathName.includes('/under-maintainance')) {
            bodyRef.current.classList.add('coming-soon-main')
        } else {
            bodyRef.current.classList.remove('coming-soon-main')
        }

        return () => {
            bodyRef.current.classList.remove('authentication-background',);
            bodyRef.current.classList.remove("bg-white", "dark:!bg-bodybg", "text-defaulttextcolor", "dark:text-defaulttextcolor/80", "text-defaultsize");
            bodyRef.current.classList.remove('coming-soon-main');
        };

    }, [pathName]);

    return (
        <Fragment>
            <LandingSwitcher />
            {children}
            <PrelineScript />
        </Fragment>
    )

}


const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
  });
  
  export default connect(mapStateToProps, { ThemeChanger })(Layout);
//export default Layout;