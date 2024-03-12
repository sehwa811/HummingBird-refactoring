import { IPerformanceOfArtist } from "@/src/app/artists/[id]/page";
import DateLabel from "./DateLabel.component";
import { ChangeDateFormat } from "@/src/utils/ChangeDateFormat";

export default function PerformanceCard({
  name,
  photo,
  artist_name,
  date,
  performance_id,
}: IPerformanceOfArtist) {
  const displayDate = ChangeDateFormat(date);
  return (
    <div className="h-auto flex flex-col gap-2">
      <img
        className="w-full h-[242px] rounded-[14px]"
        src={photo}
      />
      <div className="w-full px-2.5">
        <p className="text-sm">{name}</p>
        <p className="text-sm text-[#A5A5A5]">{artist_name}</p>
        <div className="flex items-center justify-start gap-1.5">
          <DateLabel label="공연" />
          <p className="text-sm text-[#A5A5A5]">{displayDate}</p>
        </div>
      </div>
    </div>
  );
}
