"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { IUserProfile } from "../ProfileImage.component";
import NormalButton from "../../NormalButton.component";
import { apiWithAuth } from "@/src/utils/api/instance";
import { useRouter } from "next/navigation";

export default function ChangeProfile({ image, nickName }: IUserProfile) {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>(nickName);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean>(true);
  const [prevNickname, setPrevNickname] = useState<string>(nickName); // 이전 닉네임 상태 추가

  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [displayImage, setDisplayImage] = useState<string | null>(image);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setDisplayImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    setPrevNickname(nickName); // 이전 닉네임
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (nickname.length >= 8) {
      const text = e.target.value.slice(0, 8);
      setNickname(text);
    }
  };

  const updateUserNickname = async (nickname: string) => {
    try {
      const response = await apiWithAuth().patch("/user/nickname", { nickname });
      if (response.status !== 200) {
        throw new Error("Failed to update user nickname: " + response.statusText);
      }
      return response.data;
    } catch (error: any) {
      throw new Error("Error during user nickname update: " + error.message);
    }
  };

  const updateUserPhoto = async (selectedImage: File) => {
    try {
      let formData = new FormData();
      formData.append("profileImage", selectedImage);

      const response = await apiWithAuth().put("/user/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to update user photo: " + response.statusText);
      }
      return response.data;
    } catch (error: any) {
      throw new Error("Error during user photo update: " + error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      if (prevNickname !== nickname) {
        const response = await apiWithAuth().get(`/nickname-check?nickname=${nickname}`);
        if (response.status === 200) {
          const isAvailable = !response.data.data;
          setIsNicknameAvailable(isAvailable);
          if (isAvailable) {
            await updateUserNickname(nickname);
          } else {
            return;
          }
        } else {
          throw new Error("Network response was not ok " + response.statusText);
        }
      }

      if (selectedImage) {
        await updateUserPhoto(selectedImage);
      }

      alert("성공적으로 프로필을 변경했습니다!");
      router.push("/profile");
    } catch (error) {
      console.error("Error during user update:", error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-16 gap-16">
      <div className="w-full flex justify-center mb-6">
        <button className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative">
          <div className="w-full h-full absolute top-0 left-0">
            <input
              type="file"
              className="opacity-0 absolute cursor-pointer w-24 h-24 rounded-full top-0 left-0"
              onChange={handleFileChange}
            />
            {displayImage ?
              <div className="pointer-events-none">
                <img
                  src={displayImage}
                  alt="profile"
                  className="absolute w-24 h-24 rounded-full top-0 left-0 brightness-75"
                />
                <img
                  src="/design/icon/화이트/camera.svg"
                  alt="camera"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1"
                />
              </div>
              :
              <img
                src="/design/icon/네이비/camera.svg"
                alt="camera"
                className="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            }
          </div>
        </button>
      </div>
      <div>
        <input
          type="text"
          className={`border-solid border-t-0 border-y-2  border-black placeholder:text-[#A5A5A5] outline-0 font-normal p-3 text-center`}
          value={nickname}
          onChange={handleInputChange}
        />
        <p className="w-full text-end text-[#A5A5A5] pt-1 text-xs">
          {typeof nickname == "string" &&
            `${nickname.replace(/<br\s*\/?>/gm, "\n").length}/8`}
        </p>
        {!isNicknameAvailable && (
          <p className="text-red-500 mt-2">이미 사용 중인 닉네임입니다.</p>
        )}
      </div>
      <section className="w-full flex flex-col gap-2.5">
        <NormalButton
          title="완료"
          type="complete"
          completeHandler={handleSubmit}
        />
        <NormalButton title="취소" type="cancel" />
      </section>
    </section>
  );
}
