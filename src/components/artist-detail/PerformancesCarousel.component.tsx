import { isDesktopDevice } from "@/src/utils/deviceCheck";
import DetailCarousel from "./DetailCarousel.component";
import { IPerformanceOfArtist, ITopTracks } from "@/src/app/artists/[id]/page";
import PerformanceCard from "./PerformanceCard.component";
import Link from "next/link";

export default function PerformancesCarousel({
  performanceData,
}: {
  performanceData: IPerformanceOfArtist[];
}) {
  return (
    <DetailCarousel
      showDots={true}
      arrows={isDesktopDevice()}
      performance={true}
    >
      {performanceData.map(
        ({
          name,
          artist_name,
          performance_id,
          date,
          photo,
        }: IPerformanceOfArtist) => (
          <Link href={`/concerts/${performance_id}`}>
            <PerformanceCard
              name={name}
              artist_name={artist_name}
              date={date}
              photo={photo}
              performance_id={performance_id}
            />
          </Link>
        ),
      )}
    </DetailCarousel>
  );
}
