import BirdTicketGroup from "../../../public/svg/BirdTicketGroup.svg";
import ModalButton from "../ModalButton.component";

type artistPushType = {
  closeModal(): void;
  isHearted: boolean;
};

export default function ArtistHeart({
  closeModal,
  isHearted,
}: artistPushType) {
  console.log(isHearted);
  return (
    <div className="flex flex-col gap-6 py-3.5">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="title text-[#333] text-xl font-semibold whitespace-pre-line text-center">
          {isHearted
            ? `관심있는 아티스트에서\n 삭제되었어요!`
            : `관심있는 아티스트에\n 등록되었어요!`}
        </div>
        <BirdTicketGroup />
        <div className="description text-[#A5A5A5] text-xs">
          {isHearted
            ? `언제든 다시 좋아요 할 수 있어요!`
            : `관심있는 아티스트들을 한 번에 확인해보세요!`}
        </div>
        <ModalButton title="확인" completeHandler={closeModal} />
      </div>
    </div>
  );
}
