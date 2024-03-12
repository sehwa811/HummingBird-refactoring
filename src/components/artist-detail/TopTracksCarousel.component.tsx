import { ITopTracks } from "@/src/app/artists/[id]/page";
import AlbumCover from "./AlbumCover.component";
import DetailCarousel from "./DetailCarousel.component";
import { isDesktopDevice } from "@/src/utils/deviceCheck";

export default function TopTracksCarousel({
  topTracks,
}: {
  topTracks: ITopTracks[];
}) {
  return (
    <DetailCarousel showDots={true} arrows={isDesktopDevice()} performance={false}>
      {topTracks.map(({ id, name, albumName, releaseDate, albumImage }: ITopTracks) => (
        <AlbumCover
        key={id}
          id={id}
          name={name}
          albumName={albumName}
          releaseDate={releaseDate}
          albumImage={albumImage}
        />
      ))}
    </DetailCarousel>
  );
}
