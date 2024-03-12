import DetailPageTemplate from "@/src/templates/DetailPageTemplate";
import CustomModal from "../common/CustomModal.component";
import ArtistDetailContents from "./ArtistDetailContents";
import {
  IArtistDetailData,
  IPerformanceOfArtist,
} from "@/src/app/artists/[id]/page";

interface IArtistDetailComponent {
  artistData: IArtistDetailData;
  scheduledPerforms: IPerformanceOfArtist[];
  lastPerforms: IPerformanceOfArtist[];
}

export default function ArtistDetailComponent({
  artistData,
  scheduledPerforms,
  lastPerforms,
}: IArtistDetailComponent) {
  return (
    <>
      <DetailPageTemplate
        artistId={artistData.id}
        isHearted={artistData.hearted}
        isAlarmed={artistData.alarmed}
      >
        <div className="w-full relative z-0">
          {artistData !== undefined ? (
            <div>
              <div className="">
                <img
                  src={artistData.image}
                  className="w-full max-w-[430px] h-auto fixed z-0 "
                  onClick={(e) => {
                    e.stopPropagation();
                    //setPosterModal(true);
                  }}
                />
                <CustomModal isOpen={false}>
                  <img
                    src={artistData.image}
                    alt={`${artistData.name} concert poster`}
                    className="w-full"
                    // onClick={() => setPosterModal(false)}
                  />
                </CustomModal>
                <div className="flex flex-col fixed">
                  <div className="flex">
                    <p className="top-[22px] text-white text-lg font-normal p-6">
                      {artistData?.genres[0]?.name}
                    </p>
                  </div>
                  <p className="fixed top-[340px] text-2xl font-bold text-white pl-6">
                    {artistData.name}
                  </p>
                </div>
              </div>

              <ArtistDetailContents
                topTracks={artistData.topTracks}
                scheduledPerforms={scheduledPerforms}
                lastPerforms={lastPerforms}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </DetailPageTemplate>
    </>
  );
}
