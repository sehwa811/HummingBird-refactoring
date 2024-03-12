import "../../styles/MainPage.css";
import Link from "next/link";
import { IArtistData } from "@/src/components/artists-list/SearchArtists";


type Props = {
  artist: IArtistData;
};

export default function ArtistCard({ artist }: Props) {
  return (
    <Link href={`/artists/${artist.id}`} className='flex flex-col items-center'>
      <div className="w-[108px] h-[108px] rounded-full overflow-hidden">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center">
        {artist?.name && <p className="overflow-ellipsis line-clamp-1">{artist.name}</p>}
        {artist?.genres.length > 0 && <p className="text-sm text-[#A5A5A5] line-clamp-1 overflow-ellipsis">{artist.genres[0].name}</p>}
      </div>
    </Link>
  );
}
