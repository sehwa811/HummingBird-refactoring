import Link from "next/link";
import { useState } from "react";
import CustomModal from "../common/CustomModal.component";
import SignOutModal from "../modal/SignOut.component";
import LogoutModal from "../modal/Logout.component";

export default function ProfileSetting() {
  const [logoutIsClicked, setLogoutIsClicked] = useState<boolean>(false);
  const [signoutIsClicked, setSignoutIsClicked] = useState<boolean>(false);

  return (
    <div className="w-full bg-[#F5EFFF] flex flex-col rounded-[14px] my-5">
      <Link href="/profile/setting">
        <button className="text-start text-base text-[#AB74FF] p-5">
          회원 정보 수정
        </button>
      </Link>
      <button
        className="text-start text-base text-[#AB74FF] p-5"
        onClick={() => setLogoutIsClicked(true)}
      >
        로그아웃
      </button>
      <CustomModal isOpen={logoutIsClicked}>
        <LogoutModal closeModal={() => setLogoutIsClicked(false)} />
      </CustomModal>
      <button
        className="text-start text-base  text-[#A5A5A5] p-5"
        onClick={() => setSignoutIsClicked(true)}
      >
        회원 탈퇴
      </button>
      <CustomModal isOpen={signoutIsClicked}>
        <SignOutModal closeModal={() => setSignoutIsClicked(false)} />
      </CustomModal>
    </div>
  );
}
