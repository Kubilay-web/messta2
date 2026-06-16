"use client"
import React, { useEffect } from 'react';

const Seo = ({ title }: any) => {

  useEffect(() => {
    document.title = `Mamix - ${title}`
  }, [])

  return (
    <>
    </>
  )
}

export default Seo
