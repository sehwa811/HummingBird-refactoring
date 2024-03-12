"use client";

import { Dispatch, SetStateAction, useState } from "react";
import ImageButton from "../../../public/svg/ImageButton.svg";

type imageSelectProps = {
  value: File | null | undefined;
  setValue: Dispatch<SetStateAction<File | undefined>>;
};

export default function ImageSelect({ value, setValue }: imageSelectProps) {
  const handleImageOnChange = (e: any): void => {
    const selectedImage = e.target.files[0];
    setValue(selectedImage);
  };

  return (
    <div>
      <div className="w-full flex gap-1">
        <label className="font-semibold">포스터 이미지 첨부</label>
        <p className=" text-[#AB74FF]">*</p>
      </div>
      <div
        className={`w-full border-solid border-t-0 border-y-2 ${
          value ? "border-black" : "border-[rgba(173, 173, 173, 0.40)]"
        } outline-0 p-3 text-[#A5A5A5] text-start`}
      >
        <label htmlFor="input-file" className={`flex justify-between ${value ? "text-[black]" : "text-[#A5A5A5]"}`}>
          {value ? value.name : "이미지 첨부하기"}
          <ImageButton />
        </label>
        <input
          onChange={(e) => handleImageOnChange(e)}
          type="file"
          id="input-file"
          className="hidden"
        />
      </div>
    </div>
  );
}
