"use client";

import Link from "next/link";
import ProfileImage from "@/src/components/profile/ProfileImage.component";
import ProfileSetting from "@/src/components/profile/ProfileSetting.component";
import LinkButton from "../../../public/svg/LinkButton.svg";
import { useUser } from "@/src/hooks/useUser";

export default function Profile() {
  const { data, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>isLoding...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  const userInformation = data.data;
  const userId = userInformation?.userId;
  const userNickname = userInformation?.nickname;
  const userProfileImage = userInformation?.profile_image;
  const userRole = userInformation?.role;

  return (
    <div className="flex flex-col items-center justify-items-center p-5">
      <ProfileImage image={userProfileImage} nickName={userNickname} />
      <button className="flex w-full px-5 py-3.5 text-[white] text-base bg-[#AB74FF] justify-between rounded-[14px]">
        <Link href="/profile/bookmarks">좋아요 한 공연 & 아티스트</Link>
        <LinkButton />
      </button>
      <ProfileSetting />
      <button className="text-[#AB74FF] text-base mt-10">
        {userRole === "ADMIN" ? (
          <Link href="/profile/admin">공연 새로 등록하기</Link>
        ) : (
          <></>
        )}
      </button>
    </div>
  );
}
