
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import nextConfig from '@/next.config';

const Loader = () => {
  let { basePath } = nextConfig;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoadingState = () => {
      setLoading(false);
    };
    handleLoadingState();
  }, []);

  return loading ? (
    <div id="loader" className="loader">
      <Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/media/loader.svg`} alt="Loading..." />
    </div>
  ) : null;
};

export default Loader;
