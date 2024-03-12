import BirdTicketGroup from "../../../public/svg/BirdTicketGroup.svg";
import ModalButton from "../ModalButton.component";

type artistPushType = {
  closeModal(): void;
  isAlarmed: boolean;
  artistId: string;
};

export default function ArtistPush({
  closeModal,
  isAlarmed,
  artistId
}: artistPushType) {
  return (
    <div className="flex flex-col gap-6 py-3.5">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="title text-[#333] text-xl font-semibold whitespace-pre-line text-center">
          {isAlarmed
            ? `아티스트의\n 소식을 더이상 받을 수 없어요 :(`
            : `아티스트의\n 소식을 안내해드릴게요!`}
        </div>
        <BirdTicketGroup />
        <div className="description text-[#A5A5A5] text-xs">
          {isAlarmed
            ? `언제든 다시 알람 신청할 수 있어요!`
            : `공연일정이 업데이트되면 알려드릴게요!`}
        </div>
        <ModalButton title="확인" completeHandler={closeModal} />
      </div>
    </div>
  );
}