"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import ArtistCard from "./ArtistCard";
import "@/src/styles/ConcertList.css";
import { getArtistsList } from "@/src/utils/api/artists.api";
import { useQuery } from "@tanstack/react-query";

export type genreType = {
  name: string;
};

export interface IArtistData {
  id: string;
  name: string;
  image: string;
  genres: genreType[];
  popularity: number;
  artistHearts?: string[];
}

export default function SearchArtists() {
  const [search, setSearch] = useState<string>("");
  const [artistList, setArtistList] = useState<IArtistData[]>([]);

  // 정렬방식 선택
  const [isPopularSelected, setPopularSelected] = useState(true); // 기본값
  const [isNamingSelected, setNamingSelected] = useState(false);
  const togglePopularFilter = () => {
    setPopularSelected(true);
    setNamingSelected(false);
  };
  const toggleNamingFilter = () => {
    setNamingSelected(true);
    setPopularSelected(false);
  };
  const sortOption = isPopularSelected ? "heartCount,DESC" : "name";

  const { data, isError, isLoading } = useQuery(
    ["artistsData", sortOption],
    () => getArtistsList(sortOption),
    {},
  );

  useEffect(() => {
    if (data) {
      const artistListData = data?.data.content;
      setArtistList(artistListData);
      setDisplayArtists(artistListData.slice(0, 12));
    }
  }, [data, sortOption]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterArtist = artistList.filter((artist) => {
    return artist.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const [displayArtists, setDisplayArtists] = useState<IArtistData[]>([]);
  const numberOfItems = useRef(12);

  useEffect(() => {
    if (filterArtist) {
      if (displayArtists.length === 0) {
        setDisplayArtists(filterArtist.slice(0, numberOfItems.current));
      }
    }
  }, [filterArtist]);

  useEffect(() => {
    setDisplayArtists(filterArtist.slice(0, numberOfItems.current));
  }, [search]);

  const loadMoreData = () => {
    const currentLength = displayArtists.length;
    const moreData = filterArtist.slice(currentLength, currentLength + numberOfItems.current);
    setDisplayArtists(prevConcerts => [...prevConcerts, ...moreData]);
  };
  const isMoreDataAvailable = displayArtists.length < filterArtist.length;

  return (
    <>
      {!isError && !isLoading && data ? (
        <div className="flex flex-col gap-5">
          <div className="bg-[#F5F7FA] rounded-[100px] flex items-center h-11 m-2">
            <input
              onChange={handleOnChange}
              value={search}
              className="flex-grow bg-transparent outline-none ml-5"
              style={{ borderRadius: "100px" }}
            />
            <img src="/design/icon/그레이/search.svg" alt="search_icon" className="mr-3" />
          </div>
          {/*공연 필터 버튼*/}
          <div className="ml-5">
            <button
              className={isPopularSelected ? "filter-button active" : "filter-button"}
              onClick={togglePopularFilter}
            >
              인기 가수
            </button>
            <button
              className={
                isNamingSelected ? "filter-button active" : "filter-button"
              }
              onClick={toggleNamingFilter}
            >
              이름순
            </button>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-3 gap-x-4 gap-y-7 mx-auto">
              {displayArtists.map(({ image, name, genres, id }) => (
                <ArtistCard
                  key={name}
                  image={image}
                  name={name}
                  genres={genres[0]?.name}
                  id={id}
                />
              ))}
            </div>
            {isMoreDataAvailable && (
              <img src="/design/icon/퍼플/down.svg" onClick={loadMoreData} alt="more" />
            )}
          </div>
        </div>
      ) : <div>LOADING...</div>}
    </>
  );
}
