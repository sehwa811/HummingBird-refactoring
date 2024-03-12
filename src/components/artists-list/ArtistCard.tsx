"use client";

import Link from "next/link";

export interface IArtistCard {
  image: string;
  name: string;
  genres: string;
  id: string;
}

export default function ArtistCard({ image, name, genres, id }: IArtistCard) {
  return (
    <Link
      href={{
        pathname: `/artists/${id}`,
        query: { artistId: id },
      }}
      as={`/artists/${id}`}
    >
      <div className="artist-box flex flex-col gap-2.5">
        <div className="image-card">
          <img className="rounded-full w-[108px] h-[108px] mx-auto" src={image} />
        </div>
        <div className="text-box flex flex-col items-center gap-1">
          <p className="w-full text-xs text-center overflow-hidden">{name}</p>
          <p className="w-fit text-xs text-center text-[#A5A5A5]">{genres}</p>
        </div>
      </div>
    </Link>
  );
}
