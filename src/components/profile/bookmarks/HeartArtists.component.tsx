import { getHeartArtists } from "@/src/utils/api/bookmarks.api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ArtistCard from "../../artists-list/ArtistCard";
import { IArtistData } from "../../artists-list/SearchArtists";

export default function HeartArtists() {
  const [artistList, setArtistList] = useState<IArtistData[]>()
  const { data, isError, isLoading } = useQuery(
    ["heartArtists"],
    getHeartArtists,
    { retry: false, refetchOnWindowFocus: false },
  );
  useEffect(() => {
    if (data) {
      console.log(data.data.heartedArtist_list.content)
      setArtistList(data.data.heartedArtist_list.content);
    }
  });

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-5 my-5">
      {artistList?.map(({ image, name, genres, id }) => (
        <ArtistCard
          key={name}
          image={image}
          name={name}
          genres={genres[0].name}
          id={id}
        />
      ))}
    </div>
  );
}
