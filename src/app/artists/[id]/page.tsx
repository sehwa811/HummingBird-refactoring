"use client";

import { useQueries, useQuery } from "@tanstack/react-query";

import ArtistDetailContents from "@/src/components/artist-detail/ArtistDetailContents";
import {
  getArtistDetail,
  getPerformanceOfArtist,
} from "@/src/utils/api/artists.api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailPageTemplate from "@/src/templates/DetailPageTemplate";
import { genreType } from "@/src/components/artists-list/SearchArtists";
import CustomModal from "@/src/components/common/CustomModal.component";
import { use } from "react";
import ArtistDetailComponent from "@/src/components/artist-detail/ArtistDetail.component";

export interface ITopTracks {
  id: number;
  name: string;
  albumName: string;
  releaseDate: string;
  albumImage: string;
}

export interface IArtistDetailData {
  artistHearts?: string[];
  id: string;
  name: string;
  image: string;
  genres: genreType[];
  topTracks: ITopTracks[];
  hearted: boolean;
  alarmed: boolean;
}

export interface IPerformanceOfArtist {
  artist_name: string;
  date: string;
  name: string;
  performance_id: number;
  photo: string;
}

async function getArtistDetails(artistId: string): Promise<any> {
  const response = await fetch(
    `http://api.hummingbird.kr:8080/artist/${artistId}`,
  ).then((res) => res.json());
  return response;
  //if (response.status === "SUCCESS") return response.data;
}

export default function ArtistDetail({ id }: { id: string }) {
  const urlParam = useParams<Record<string, string>>();
  const artistId = urlParam!.id;
  const [artistData, setArtistData] = useState<IArtistDetailData>();
  const [scheduledPerforms, setScheduledPerforms] = useState<
    IPerformanceOfArtist[]
  >([]);
  const [lastPerforms, setLastPerforms] = useState<IPerformanceOfArtist[]>([]);
  //const [posterModal, setPosterModal] = useState<boolean>(false);

  const { data, isError, isLoading } = useQuery(
    ["artistsDetail", artistId],
    () => getArtistDetail(artistId),
    { retry: false, refetchOnWindowFocus: false },
  );

  const results = useQueries({
    queries: [
      {
        queryKey: ["artistsDetail", artistId],
        queryFn: () => getArtistDetail(artistId),
        staleTime: Infinity,
      },
      {
        queryKey: ["performanceOfArtist", artistId, true],
        queryFn: () => getPerformanceOfArtist(artistId, true),
        staleTime: Infinity,
      },

      {
        queryKey: ["performanceOfArtist", artistId, false],
        queryFn: () => getPerformanceOfArtist(artistId, false),
        staleTime: Infinity,
      },
    ],
  });

  useEffect(() => {
    const loadingFinishAll = results.some((result) => result.isLoading);
    // loadingFinishAll이 false이면 최종 완료

    if (loadingFinishAll === false) {
      const artistDetailData = results[0]?.data?.data;
      setArtistData(artistDetailData);

      const performanceData = results[1]?.data.data.performance_list;
      setScheduledPerforms(performanceData);

      setLastPerforms(results[2]?.data.data.performance_list);
    }
  }, [results]);

  if (isError) return <h2>Error!</h2>;

  return (
    <>
      {artistData ? (
        <ArtistDetailComponent
          artistData={artistData}
          scheduledPerforms={scheduledPerforms}
          lastPerforms={lastPerforms}
        />
      ) : (
        <div>LOADING....</div>
      )}
    </>
  );
}
