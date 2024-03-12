"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/MainPage.css";
import React from "react";
import { isDesktopDevice } from "@/src/utils/deviceCheck";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {
  children: React.ReactNode;
  showDots?: boolean;
  arrows?: boolean;
  onSlideChange: (currentIndex: number) => void;
};
type CustomDotProps = {
  onMove?: () => void;
  index?: number;
  onClick?: () => void;
  active: boolean;
};

export default function MainConcertsPost({
  children,
  showDots,
  arrows,
  onSlideChange,
}: Props) {
  const CustomDot = ({ onClick, active }: CustomDotProps) => {
    return (
      <li
        className={active ? "active" : "inactive"}
        // onClick={() => onClick()}
      >
        <div className={active ? "active-dot" : "inactive-dot"}></div>
      </li>
    );
  };

  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      arrows={isDesktopDevice()}
      showDots customDot={<CustomDot active/>}
      itemClass={"main-item"}
      centerMode={true}
      sliderClass={"carousel-list"}
      containerClass={"carousel-container"}
      // infinite={true}
      beforeChange={(currentSlide) => {
        onSlideChange(currentSlide);
      }}
    >
      {children}
    </Carousel>
  );
}
