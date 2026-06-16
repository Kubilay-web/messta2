"use client";
import React, { type ReactNode, useEffect, useRef, useState } from "react";
import { TinySliderInfo, type TinySliderInstance, tns } from "tiny-slider";
import { type CommonOptions } from "tiny-slider/src/tiny-slider";
import { childrenEqual, objectsEqual } from "./utils";

type TinySliderProps = {
  settings?: CommonOptions;
  onClick?: (slideClicked: any, info: any, event: any) => void;
  onIndexChanged?: (info: any) => void;
  onTransitionStart?: (info: any) => void;
  onTransitionEnd?: (info: any) => void;
  onTouchStart?: (info: any) => void;
  onTouchMove?: (info: any) => void;
  onTouchEnd?: (info: any) => void;
  onInit?: (initialized: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

const TinySlider: React.FC<TinySliderProps> = ({
  settings,
  onClick,
  onIndexChanged,
  onTransitionStart,
  onTransitionEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onInit,
  className,
  style,
  children,
}: TinySliderProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [slider, setSlider] = useState<TinySliderInstance | null>(null);
  const [prevSettings, setPrevSettings] = useState<CommonOptions | undefined>(
    settings
  );
  const [prevChildren, setPrevChildren] = useState<ReactNode | undefined>(
    children
  );
  let dragging = false;
  let count = 0;

  const build = (customSettings: CommonOptions = {}) => {
    if (slider && slider.destroy && slider.rebuild) {
      slider.destroy();
      slider.rebuild();
    } else {
      if (ref.current == null) return;
      const mergedSettings = {
        ...customSettings,
        container: ref.current,
        onInit: () => postInit(),
      };

      setSlider(tns(mergedSettings));

      if (!slider) return;

      if (ref.current) ref.current.className += " tns-item";
    }
  };

  const postInit = (): any => {
    if (!slider) {
      if (count >= 4) {
        return onInit?.(false);
      }
      count++;
      return setTimeout(postInit, 100);
    }
    count = 0;

    const { events } = slider;

    if (events) {
      events.on("transitionStart", (info) => {
        dragging = true;
        onTransitionStart?.(info);
      });

      events.on("transitionEnd", (info) => {
        dragging = false;
        onTransitionEnd?.(info);
      });

      if (onIndexChanged) events.on("indexChanged", onIndexChanged);
      if (onTouchStart) events.on("touchStart", onTouchStart);
      if (onTouchMove) events.on("touchMove", onTouchMove);
      if (onTouchEnd) events.on("touchEnd", onTouchEnd);
    }

    onInit?.(true);
  };

  useEffect(() => {
    build(settings);
  }, [settings]);

  useEffect(() => {
    if (
      !objectsEqual(settings, prevSettings) ||
      !childrenEqual(children, prevChildren)
    ) {
      build(settings);
    }

    setPrevSettings(settings);
    setPrevChildren(children);
  }, [settings, children]);

  useEffect(() => {
    return () => {
      if (slider && slider.destroy) slider.destroy();
    };
  }, []);

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragging || !onClick) return;

    if (!slider) return onClick(null, null, event);

    const info: TinySliderInfo = slider.getInfo();
    const slideClicked = info.slideItems[info.index];

    onClick(slideClicked, info, event);
  };

  return (
    <div ref={ref} onClick={onClickHandler} className={className} style={style}>
      {children}
    </div>
  );
};

export default TinySlider;
