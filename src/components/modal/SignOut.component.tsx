import Signout from "../../../public/svg/SignOut.svg";
import NormalButton from "../NormalButton.component";
import { useMutation } from "@tanstack/react-query";
import { userSignout } from "@/src/utils/api/userSetting.api";
import { useRouter } from "next/navigation";
import ModalButton from "../ModalButton.component";

type signoutModalType = {
  closeModal(): void;
};

export default function SignOutModal({ closeModal }: signoutModalType) {
  const router = useRouter();
  const createMutation = useMutation(userSignout, {
    onSuccess: () => {
      alert("회원탈퇴 되었습니다 :)");
      router.push("/login");
    },
    onError: () => {
      alert("회원탈퇴 오류");
    },
  });

  const handleSignoutClick = () => {
    createMutation.mutateAsync();
  };

  return (
    <div className="flex flex-col gap-6 py-3.5">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="title text-[#333] text-xl font-semibold whitespace-pre-line">
          회원 탈퇴 하시겠어요?
        </div>
        <Signout />
        <div className="description text-[#A5A5A5] text-xs">
          다음에 또 만나요!
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {" "}
        <ModalButton title="확인" completeHandler={handleSignoutClick} />
        <ModalButton title="취소" type="cancel" completeHandler={closeModal} />
      </div>
    </div>
  );
}
