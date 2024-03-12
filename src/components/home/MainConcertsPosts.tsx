"use client";

import MainConcertsPost from "@/src/components/home/MainConcertsPost";
import MainPostCard from "@/src/components/home/MainPostCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/src/utils/api/instance";
import { Performance } from "../../types/performance";

export default function MainConcertsPosts() {
  const { data: concertData, isError } = useQuery(
    ["mainConcerts"],
    async () => {
      const response = await instance.get("/performance?size=5&sort=date");
      if (response.status !== 200) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.data;
    },
    { staleTime: Infinity },
  );

  const [mainConcert, setMainConcert] = useState<Performance>();
  useEffect(() => {
    if (concertData?.data?.performance_list?.length > 0) {
      setMainConcert(concertData.data.performance_list[0]);
    }
  }, [concertData]);

  return concertData?.data?.performance_list?.length > 0 ? (
    <section className="pb-4">
      <h1 className="main-post-title">{mainConcert?.name}</h1>
      <h2 className="main-post-artist">{mainConcert?.artist_name}</h2>
      <MainConcertsPost
        onSlideChange={(currentIndex) => {
          setMainConcert(concertData.data.performance_list[currentIndex]);
        }}
      >
        {concertData.data.performance_list.map((concert: Performance) => (
          <MainPostCard post={concert} key={concert.performance_id} /> // 'key' prop 추가, 만약 고유한 'id' 속성이 존재한다고 가정
        ))}
      </MainConcertsPost>
    </section>
  ) : (
    <div>Loading...</div>
  );
}
