import Link from "next/link";
import "../../styles/ConcertList.css";
import { Performance } from "../../types/performance";
import DateLabel from "@/src/components/artist-detail/DateLabel.component";
import { getWeekday } from "@/src/utils/common/dateUtils";

type Props = { concert: Performance };

export default function ConcertList({ concert }: Props) {

  return (
    <Link href={`/concerts/${concert.performance_id}`} className='flex flex-col'>
      <img
        src={concert.photo}
        alt={`${concert.name} poster`}
        className="poster-image mb-2 mx-auto"
      />
      <div className="concert-detail px-1">
        <p className="text-sm line-clamp-2 overflow-ellipsis">{concert.name}</p>
        <p className="text-sm text-[#A5A5A5]">{concert.artist_name}</p>
        <div className="flex items-center justifconcerty-start gap-1.5">
          <DateLabel label="공연" />
          <p className="text-sm text-[#A5A5A5]">
            {concert.date.split(' ')[0].replace(/-/g, '.')} {getWeekday(concert.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
