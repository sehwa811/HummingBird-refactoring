import { ChangeDateFormat } from "@/src/utils/ChangeDateFormat";

interface IAlbumcover {
  id: number;
  name: string;
  albumName: string;
  releaseDate: string;
  albumImage: string;
}

export default function AlbumCover({
  id,
  name,
  albumName,
  releaseDate,
  albumImage
}: IAlbumcover) {
  const displayDate = ChangeDateFormat(releaseDate);
  return (
    <div className="w-168px h-217px flex flex-col gap-2">
      <img
        className="w-42 h-42 rounded-3xl"
        src={albumImage}
      />
      <div>
        <p className="px-2.5 text-sm text-[#191926] font-medium">{name}</p>
        <p className="px-2.5 text-xs text-[#A5A5A5]">{displayDate}</p>
      </div>
    </div>
  );
}
