import "../../styles/MainPage.css";
import { IArtistData } from "@/src/components/artists-list/SearchArtists";
import { isDesktopDevice } from "@/src/utils/deviceCheck";
import ArtistCard from "@/src/components/home/ArtistCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/src/utils/api/instance";
import MultiArtistCarousel from "@/src/components/home/MultiArtistCarousel";

export default function ArtistsCarousel() {
  const [artistList, setArtistList] = useState<IArtistData[]>([]);
  const fetchArtists = async () => {
    const response = await instance.get("/artist?sort=heartCount,ASC");
    if (response.status !== 200) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.data;
  };

  const { data, isError, isLoading } = useQuery(
    ["artistsData"],
    fetchArtists,
    { retry: false, refetchOnWindowFocus: false },
  );
  useEffect(() => {
    if (data) {
      const artistListData = data.data.content;
      if (artistListData) {
        setArtistList(artistListData);
      }
    }
  }, [data]);

  return (
    <section className="ml-2">
      <div className="carouselTitleContainer">
        <h1 className="cardsTitle">{"인기있는 아티스트"}</h1>
      </div>
      <div className="py-3">
        <MultiArtistCarousel showDots={true} arrows={isDesktopDevice()} itemsCount={3.2}>
          {artistList.slice(0, 5).map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </MultiArtistCarousel>
      </div>
    </section>
  );
}
