"use client";

import { IPerformanceOfArtist, ITopTracks } from "@/src/app/artists/[id]/page";
import TopTracksCarousel from "./TopTracksCarousel.component";
import PerformancesCarousel from "./PerformancesCarousel.component";

type artistDetailContentsProp = {
  topTracks: ITopTracks[];
  scheduledPerforms: IPerformanceOfArtist[];
  lastPerforms: IPerformanceOfArtist[];
};

export default function ArtistDetailContents({
  topTracks,
  scheduledPerforms,
  lastPerforms,
}: artistDetailContentsProp) {
  return (
    <div className="bg-white w-full top-[22rem] z-10 relative rounded-t-[30px] pt-5 flex flex-col gap-5 pb-16">
      <div>
        <p className="py-5 px-[30px] text-xl font-semibold text-[#191926]">
          대표음악
        </p>
        <TopTracksCarousel topTracks={topTracks} />
      </div>
      <div>
        <p className="py-5 px-[30px] text-xl font-semibold text-[#191926]">
          예정된 공연
        </p>
        {scheduledPerforms.length ? (
          <PerformancesCarousel performanceData={scheduledPerforms} />
        ) : (
          <p className="w-full text-center p-5 text-[#9A9A9A]">
            예정된 공연이 없어요
          </p>
        )}
      </div>
      <div>
        <p className="py-5 px-[30px] text-xl font-semibold text-[#191926]">
          지난 공연
        </p>
        {lastPerforms.length ? (
          <PerformancesCarousel performanceData={lastPerforms} />
        ) : (
          <p className="w-full text-center p-5 text-[#9A9A9A]">
            지난 공연이 없어요
          </p>
        )}
      </div>
    </div>
  );
}
