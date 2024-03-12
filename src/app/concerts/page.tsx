"use client";

import "@/src/styles/ConcertList.css";
import ConcertsList from "@/src/components/concerts/ConcertsList";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Performance } from "../../types/performance";
import instance from "@/src/utils/api/instance";
import PrevBtnTemplate from "@/src/templates/PrevBtnTemplate";

export default function Concerts() {
  // 정렬방식 선택
  const [isDateSelected, setDateSelected] = useState(true); // 기본값
  const [isTicketingSelected, setTicketingSelected] = useState(false);
  const [isPopularitySelected, setPopularitySelected] = useState(false);
  const toggleDateFilter = () => {
    setDateSelected(!isDateSelected);
    setTicketingSelected(false);
    setPopularitySelected(false);
  };
  const toggleTicketingFilter = () => {
    setTicketingSelected(!isTicketingSelected);
    setDateSelected(false);
    setPopularitySelected(false);
  };
  const togglePopularityFilter = () => {
    setPopularitySelected(!isPopularitySelected);
    setDateSelected(false);
    setTicketingSelected(false);
  };
  const sortOption = isDateSelected ? "date" : isTicketingSelected ? "tickeing" : "heart";

  // 데이터 불러오기
  const [performanceList, setPerformanceList] = useState<Performance[]>([]);
  const { data: concertList, isLoading, isError } = useQuery(
    ["concertList", sortOption],
    async () => {
      const response = await instance.get(
        `/performance?size=100&sort=${sortOption}`,
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.data;
    },
    {
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (concertList) {
      const concertListData = concertList?.data?.performance_list;
      setPerformanceList(concertListData);
      setDisplayConcerts(concertListData.slice(0, 6));
    }
  },[concertList]);

  // 검색기능
  const [search, setSearch] = useState<string>("");
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterConcert = (performanceList || []).filter((performance: Performance) => {
    return performance.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  useEffect(() => {
    setDisplayConcerts(filterConcert.slice(0, numberOfItems.current));
  }, [search]);

  // 목록구성
  const [displayConcerts, setDisplayConcerts] = useState<Performance[]>([]);
  const numberOfItems = useRef(6);

  useEffect(() => {
    if (filterConcert) {
      if (displayConcerts.length === 0) {
        setDisplayConcerts(filterConcert.slice(0, numberOfItems.current));
      }
    }
  }, [filterConcert]);



  const loadMoreData = () => {
    const currentLength = displayConcerts.length;
    const moreData = filterConcert.slice(currentLength, currentLength + numberOfItems.current);
    setDisplayConcerts(prevConcerts => [...prevConcerts, ...moreData]);
  };
  const isMoreDataAvailable = displayConcerts.length < filterConcert.length;

  return (
    <PrevBtnTemplate>
      <div className="flex flex-col p-5 gap-5">
        <p className="text-2xl font-semibold pr-2.5 pl-2.5">
          전체 공연을<br></br>확인해보세요
        </p>
        <div className="bg-[#F5F7FA] rounded-[100px] flex items-center h-11">
          <input
            onChange={handleOnChange}
            value={search}
            className="flex-grow bg-transparent  outline-none ml-4"
            style={{ borderRadius: "100px" }}
          />
          <img src="/design/icon/그레이/search.svg" alt="search_icon" className="mr-3" />
        </div>
      </div>
      {/*공연 필터 버튼*/}
      <div className="ml-5">
        <button
          className={isDateSelected ? "filter-button active" : "filter-button"}
          onClick={toggleDateFilter}
        >
          공연 일정
        </button>
        <button
          className={
            isTicketingSelected ? "filter-button active" : "filter-button"
          }
          onClick={toggleTicketingFilter}
        >
          티켓팅 일정
        </button>
        <button
          className={
            isPopularitySelected ? "filter-button active" : "filter-button"
          }
          onClick={togglePopularityFilter}
        >
          인기 공연
        </button>
      </div>
      {/*공연 리스트*/}
      <div className="flex flex-col items-center gap-4">
        <ConcertsList concerts={displayConcerts} />
        {isMoreDataAvailable && (
          <img src="/design/icon/퍼플/down.svg" onClick={loadMoreData} alt="more"/>
        )}
      </div>
    </PrevBtnTemplate>
  );
}
