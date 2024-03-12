import TicketPush from "../../../public/svg/TicketPush.svg";
import ModalButton from "../ModalButton.component";

type concertHeartType = {
  closeModal(): void;
  isHearted: boolean;
};

export default function ConcertHeart({ closeModal, isHearted }: concertHeartType) {
  return (
    <div className="flex flex-col gap-6 py-3.5">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="title text-[#333] text-xl font-semibold whitespace-pre-line text-center">
          {isHearted ? `관심있는 공연에서\n 해제되었어요!`: `관심있는 공연으로\n 등록되었어요!`}
        </div>
        <TicketPush />
        <div className="description text-[#A5A5A5] text-xs">
          {isHearted ? `언제든지 다시 좋아요할 수 있어요!`: `관심있는 공연을 한 번에 확인해보세요!`}
        </div>
        <ModalButton title="확인" completeHandler={closeModal} />
      </div>
    </div>
  );
}
