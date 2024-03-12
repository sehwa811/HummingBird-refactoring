import { useEffect, useState } from "react";
import Header from "../header/Header"
import MainConcertsPosts from "@/src/components/home/MainConcertsPosts";
import AllConcertsList from "@/src/components/home/AllConcertsList";
import CarouselPosts from "@/src/components/home/CarouselPosts";
import ArtistsCarousel from "@/src/components/home/ArtistsCarousel";
import AllArtistsList from "@/src/components/home/AllArtistsList";

export default function MainPage() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1000);
      localStorage.setItem("hasVisited", "true");

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showSplash) {
    return (
      <>
        <Header />
        <MainConcertsPosts />
        <AllConcertsList />
        <CarouselPosts />
        <ArtistsCarousel />
        <AllArtistsList />
      </>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <img
        src="/design/CI/Symbol_main.svg"
        className="max-w-full max-h-full fade-out"
        alt="splash"
      />
    </div>
  );
}
