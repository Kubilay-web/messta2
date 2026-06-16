"use client"
import Link from 'next/link'
import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer mt-auto xl:ps-[15rem]  font-normal font-mont bg-white dark:!bg-bodybg text-defaultsize leading-normal text-[0.813] !border-t !border-defaultborder dark:!border-defaultborder/10 py-4 text-center">
        <div className="container">
          <span className="text-textmuted dark:text-textmuted/50"> Copyright © <span id="year">{new Date().getFullYear()}</span> <Link scroll={false}
            href="#!" className="text-defaulttextcolor font-semibold dark:text-defaulttextcolor">Invenimus</Link>.
            Designed with <span className="bi bi-heart-fill text-danger"></span> by <Link href="#" target='_blank'>
              <span className="font-semibold text-primary underline">Invenimus</span>
            </Link> All
            rights
            reserved
          </span>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer