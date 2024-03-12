import AdminCheck from "../../../public/svg/AdminCheck.svg";
import ModalButton from "../ModalButton.component";

type adminModalType = {
  closeModal(): void;
};

export default function AdminModal({ closeModal }: adminModalType) {
  return (
    <div className="h-full flex flex-col justify-between py-3.5">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="title text-[#333] text-xl font-semibold whitespace-pre-line text-center">
          {`공연 정보가\n 저장되었습니다!`}
        </div>
        <AdminCheck />
      </div>
      <div className="flex flex-col gap-1.5">
        {" "}
        <ModalButton title="확인" completeHandler={closeModal} />
      </div>
    </div>
  );
}
