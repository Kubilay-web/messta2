"use client";
import { Navbar1, Navbar10, Navbar11, Navbar12, Navbar13, Navbar2, Navbar3, Navbar4, Navbar5, Navbar6, Navbar7, Navbar8, Navbar9 } from "@/shared/data/adavanec-ui/navbardata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
  return (
    <Fragment>

      {/* <!-- Page Header --> */}
      <Seo title="Navbar" />
      <Pageheader Heading="Navbar" breadcrumbs={['Advanced Ui']} currentpage="Navbar" />
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic Mega Menu</h5>
            </div>
            <div className="box-body">
              <Navbar1/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Mega Menu With Hover Event</h5>
            </div>
            <div className="box-body">
            <Navbar2/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Mega Menu Slide Up Animation</h5>
            </div>
            <div className="box-body">
            <Navbar3/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Mega Menu With Auto Close Behavior</h5>
            </div>
            <div className="box-body">
            <Navbar4/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Mega Menu With Columns</h5>
            </div>
            <div className="box-body">
            <Navbar5/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic Navbar</h5>
            </div>
            <div className="box-body">
            <Navbar6/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Navbar With horizontal scroll</h5>
            </div>
            <div className="box-body">
            <Navbar7/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Navbar With collapse</h5>
            </div>
            <div className="box-body">
            <Navbar8/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Navbar Collapse with animation</h5>
            </div>
            <div className="box-body">
            <Navbar9/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Navbar with Image</h5>
            </div>
            <div className="box-body">
            <Navbar10/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Navbar with Alignment</h5>
            </div>
            <div className="box-body">
            <Navbar11/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Navbar with MegaMenu</h5>
            </div>
            <div className="box-body">
            <Navbar12/>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Navbar with Color variants</h5>
            </div>
            <div className="box-body space-y-4">
             <Navbar13/>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End::row-1 --> */}
    </Fragment>
  );
};

export default Navbar;