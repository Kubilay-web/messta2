/* eslint-disable */
import * as React from "react";

const uid = () => Math.random().toString(36).substring(6);

interface IContentLoaderProps extends React.SVGAttributes<SVGElement> {
  animate?: boolean;
  animateBegin?: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  baseUrl?: string;
  foregroundColor?: string;
  foregroundOpacity?: number;
  gradientRatio?: number;
  gradientDirection?: "left-right" | "top-bottom";
  interval?: number;
  rtl?: boolean;
  speed?: number;
  title?: string;
  uniqueKey?: string;
  beforeMask?: JSX.Element;
}

const ForkedContentLoader: React.FC<IContentLoaderProps> = ({
  animate = true,
  animateBegin,
  backgroundColor = "#f5f6f7",
  backgroundOpacity = 1,
  baseUrl = "",
  children,
  foregroundOpacity = 1,
  gradientRatio = 2,
  gradientDirection = "left-right",
  uniqueKey,
  interval = 0.5,
  rtl = false,
  speed = 1.5,
  style = {},
  title = "Loading...",
  beforeMask = null,
  ...props
}) => {
  const fixedId = uniqueKey || uid();
  const idClip = `${fixedId}-diff`;
  const idAria = `${fixedId}-aria`;

  const rtlStyle = rtl ? { transform: "scaleX(-1)" } : null;
  const keyTimes = `0; ${interval}; 1`;
  const dur = `${speed}s`;

  return (
    <svg
      aria-labelledby={idAria}
      role="img"
      style={{ ...style, ...rtlStyle }}
      {...props}
    >
      {title ? <title id={idAria}>{title}</title> : null}
      {beforeMask && React.isValidElement(beforeMask) ? beforeMask : null}
      <rect
        role="presentation"
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath={`url(${baseUrl}#${idClip})`}
        style={{ fill: backgroundColor }}
        opacity="100%"
      >
        <animate
          attributeName="opacity"
          begin={animateBegin}
          dur={dur}
          repeatCount="indefinite"
          keyTimes={keyTimes}
          values={`0.7; 0.3; 0.7`}
        />
      </rect>
      <defs>
        <clipPath id={idClip}>{children}</clipPath>
      </defs>
    </svg>
  );
};

export default ForkedContentLoader;
