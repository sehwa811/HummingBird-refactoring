"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/detailCarousel.css";
import React, { useRef } from "react";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

type Props = {
  children: React.ReactNode;
  showDots?: boolean;
  arrows?: boolean;
  performance: boolean;
};
export default function DetailCarousel({
  children,
  showDots,
  arrows,
  performance,
}: Props) {
  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      arrows={arrows}
      itemClass={
        performance ? "performance-carousel-item" : "album-carousel-item"
      }
      containerClass={
        performance
          ? "performance-carousel-container"
          : "album-carousel-container"
      }
      sliderClass={
        performance ? "performance-carousel-slider" : "album-carousel-slider"
      }
    >
      {children}
    </Carousel>
  );
}
