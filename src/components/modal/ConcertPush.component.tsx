import TicketPush from "../../../public/svg/TicketPush.svg";
import ModalButton from "../ModalButton.component";
import { Dispatch, SetStateAction, useState } from "react";

type concertHeartType = {
  closeModal(): void;
  isAlarmed: boolean;
  // performanceId: number;
  // pushBeforeTime: number;
  setPushBeforeTime: Dispatch<SetStateAction<number>>;
};

export default function ConcertPush({ closeModal, isAlarmed, setPushBeforeTime }: concertHeartType) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  function DateSelectButton({ date }: { date: number }) {
    return (
      <button
        onClick={() => {
          setPushBeforeTime(date * 24);
          if (date === selectedDate) {
            setSelectedDate(null);
          } else {
            setSelectedDate(date);
          }
        }}
        className={`w-full h-9 text-base py-[15px] flex items-center justify-center  rounded-[100px] 
        ${selectedDate === date ? "bg-[#AB74FF] text-white" : "bg-[#F5F7FA] text-[#555555]"}`}
      >
        {date === 0 ? `당일` : `${date}일 전`}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-3.5">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="title text-[#333] text-xl font-semibold whitespace-pre-line text-center">
          {isAlarmed
            ? `알람 신청이\n 해제되었어요!`
            : `언제쯤 알람을\n 전달해드릴까요?`}
        </div>
        <TicketPush />
        <div className="description text-[#A5A5A5] text-xs">
          {isAlarmed
            ? `언제든지 다시 푸시알림을 신청할 수 있어요!`
            : `티켓팅 일정이 다가오면 알려드릴게요!`}
        </div>

        <div className="w-full flex flex-col gap-2.5">
          {[5, 3, 1, 0].map((date) => (
            <DateSelectButton
              key={date}
              date={date}
            />
          ))}
        </div>
        <ModalButton title="확인" completeHandler={closeModal} />
      </div>
    </div>
  );
}
