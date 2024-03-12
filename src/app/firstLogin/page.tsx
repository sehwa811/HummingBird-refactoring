"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiWithAuth } from "@/src/utils/api/instance";
import NormalButton from "@/src/components/NormalButton.component";

export default function FirstLogin() {
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken.toString());
    }
  }, [searchParams]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
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
      if (nickname) {
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

        if (selectedImage) {
          await updateUserPhoto(selectedImage);
        }

        alert("성공적으로 프로필을 저장했습니다!");
        router.push("/");
      } else {
        return alert("닉네임을 입력해주세요");
      }

    } catch (error) {
      console.error("Error during user update:", error);
    }
  };

  return (
    <div className="bg-black h-screen flex flex-col p-4">
      <div className="flex flex-col my-10 px-2 gap-5">
        <p className="text-white text-2xl font-semibold pr-2.5 pl-2.5 pb-2">
          닉네임을<br></br>설정해주세요
        </p>
        <p className=" text-gray-400 pr-2.5 pl-2.5">
          닉네임은 영어,한글,숫자 포함 8글자까지 가능해요
        </p>
      </div>
      {/*프로필 이미지*/}
      <div className="w-full flex justify-center my-12">
        <button className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative">
          <div className="w-full h-full absolute top-0 left-0">
            <input
              type="file"
              className="opacity-0 absolute cursor-pointer w-24 h-24 rounded-full top-0 left-0"
              onChange={handleFileChange}
            />
            {selectedImage ?
              <div className="pointer-events-none">
                <img
                  src={URL.createObjectURL(selectedImage)}
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
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder=""
          className="mt-2 bg-transparent outline-none border-b-2 border-[#AB74FF] pb-3 text-white text-center w-64 "
          maxLength={8}
        />
        <div className="flex flex-col">
          <p className="text-white text-end translate-x-9">
            {nickname.length}/8
          </p>
          <p className={`text-red-500 mt-2 ${isNicknameAvailable ? 'invisible' : 'visible'}`}>
            이미 사용 중인 닉네임입니다.
          </p>
        </div>
      </div>
      <div className="mt-6 px-10 py-4">
        <NormalButton
          title="시작하기"
          type="complete"
          completeHandler={handleSubmit}
        />
      </div>
    </div>
  );
}
