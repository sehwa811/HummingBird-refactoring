"use client";

import ChangeProfile from "@/src/components/profile/setting/ChangeProfile";
import { useUser } from "@/src/hooks/useUser";

export default function Setting() {
  const { data, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>isLoding...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  const userInformation = data!.data;
  //const userId = userInformation?.userId;
  const userNickname = userInformation?.nickname;
  const userProfileImage = userInformation?.profile_image;

  return (
    <div className="pt-10 p-5">
      <section className="flex flex-col gap-2.5">
        <h1 className="text-2xl font-semibold">
          회원정보를<br></br>수정해주세요
        </h1>
        <p className="text-[15px] text-[#A5A5A5]">
          닉네임은 영어,한글,숫자 포함 8글자까지 가능해요
        </p>
      </section>
      <ChangeProfile image={userProfileImage} nickName={userNickname} />
    </div>
  );
}
