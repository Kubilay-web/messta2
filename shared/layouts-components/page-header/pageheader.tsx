"use client"

import Link from 'next/link';
import React, { Fragment } from 'react'

const Pageheader = (props: any) => {
  return (
    <Fragment>
      <div className={`${props.Updated === true ? 'md:flex block items-center justify-between page-header-breadcrumb' : 'my-4 page-header-breadcrumb flex items-center justify-between flex-wrap gap-2'}`}>
        <div>
          {/* Conditionally render the heading based on Updated */}
          {props.Updated !== true && (
            <h1 className="page-title font-medium text-[1.125rem] mb-2">{props.Heading}</h1>
          )}

          {/* Render breadcrumbs */}
          <ol className="breadcrumb flex flex-wrap">
            {props.breadcrumbs.map((label: any,index:any) => (
              <li key={index} className={`breadcrumb-item`} >
                <Link scroll={false} href="#!">
                  {label}
                </Link>
              </li>

            ))}

            <li className="breadcrumb-item !font-medium active" aria-current="page">{props.currentpage}</li>
          </ol>
        </div>

        {props.Updated === true ?
          <p className="mb-0">
            <span className="text-textmuted dark:text-textmuted/50">Updated on </span> Yesterday
          </p>
          :
          <div className="flex items-center flex-wrap">
            <button className="ti-btn ti-btn-soft-primary btn-wave me-2">
              <i className="bx bx-crown align-middle"></i> Plan Upgrade
            </button>
            <button className="ti-btn ti-btn-soft-secondary btn-wave me-0">
              <i className="ri-upload-cloud-line align-middle"></i> Export Report
            </button>
          </div>
        }
      </div>
    </Fragment>
  )
}

export default Pageheader;

