import Logout from "../../../public/svg/Logout.svg";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import ModalButton from "../ModalButton.component";

type logoutModalType = {
  closeModal(): void;
};

export default function LogoutModal({ closeModal }: logoutModalType) {
  const router = useRouter();

  function logoutHandler() {
    window.localStorage.removeItem("accessToken");
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-6 py-3.5">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="title text-[#333] text-xl font-semibold whitespace-pre-line">
          로그아웃 하시겠어요?
        </div>
        <Logout />
        <div className="description text-[#A5A5A5] text-xs">
          다음에 또 만나요!
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <ModalButton title="확인" completeHandler={() => logoutHandler()} />
        <ModalButton title="취소" type="cancel" completeHandler={closeModal} />
      </div>
    </div>
  );
}
