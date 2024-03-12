"use client";

import { useQuery } from "@tanstack/react-query";
import PerformanceCard from "../../artist-detail/PerformanceCard.component";
import { getHeartConcerts } from "@/src/utils/api/bookmarks.api";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Performance } from "../../../types/performance"

export default function HeartPerformances({ sort }: { sort: string }) {
  const router = useRouter();
  const [performanceList, setPerformanceList] = useState<Performance[]>()
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isError, isLoading } = useQuery(
    ["heartConcerts", currentPage, sort],
    () => getHeartConcerts(currentPage, sort),
    { retry: false, refetchOnWindowFocus: false },
  );
  useEffect(() => {
    if (data) {
      setPerformanceList(data.data.performance_list);
    }
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error!</h1>;

  function handlePaginationChange(e: any, value: number) {
    setCurrentPage(value);
    router.push(`pagination/?page=${value}`, undefined);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-2 mt-5">
        {performanceList && performanceList.map((item) => (
          <PerformanceCard
            key={item.name}
            name={item.name}
            photo={item.photo}
            artist_name={item.artist_name}
            date={item.date}
            performance_id={item.performance_id}
          />
        ))}
      </div>
    </div>
  );
}
