"use client";

import PostCard from "@/src/components/home/PostCard";
import "../../styles/MainPage.css";
import MultiCarousel from "@/src/components/home/MultiCarousel";
import { useQuery } from "@tanstack/react-query";
import instance from "@/src/utils/api/instance";
import { isDesktopDevice } from "@/src/utils/deviceCheck";

export default function CarouselPosts() {
  const { data: popularConcerts, isLoading, isError } = useQuery(
    ["popularConcerts"],
    async () => {
      const response = await instance.get("/performance?size=5&sort=heart");
      if (response.status !== 200) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.data.data.performance_list;
    },
    { staleTime: Infinity },
  );


  return (
    <section className="my-10 ml-2">
      <div className="carouselTitleContainer">
        <h1 className="cardsTitle">{"인기있는 공연"}</h1>
      </div>
      {popularConcerts &&
        <MultiCarousel showDots={true} arrows={isDesktopDevice()}>
          {popularConcerts.map((post: any) => (
            <PostCard key={post.name} post={post} />
          ))}
        </MultiCarousel>
      }
    </section>
  );
}
