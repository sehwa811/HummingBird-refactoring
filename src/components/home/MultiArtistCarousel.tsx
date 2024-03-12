'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../styles/MainPage.css'
import React from "react";

type Props = {
  children: React.ReactNode;
  showDots?: boolean;
  arrows?: boolean;
  itemsCount?: number;
};
export default function MultiArtistCarousel({ children, showDots, arrows, itemsCount = 2 }: Props) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: itemsCount,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemsCount,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: itemsCount,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: itemsCount,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      arrows={arrows}
      itemClass={"px-1.5"}
      // centerMode={true}
    >
      {children}
    </Carousel>
  );
}
