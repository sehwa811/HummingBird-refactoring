"use client";

import TextareaAutosize from "react-textarea-autosize";

import { ChangeEvent, SetStateAction, Dispatch } from "react";

interface ITextBox {
  label: string;
  numberType?: boolean;
  placeholder: string;
  inputText: string | number | string[] | undefined;
  setInputText: Dispatch<SetStateAction<any>>;
  isBorderBox?: boolean;
}

export default function TextBox({
  label,
  numberType,
  setInputText,
  inputText,
  placeholder,
  isBorderBox,
}: ITextBox) {
  const enteredInputTextIsValid = inputText !== "" && inputText !== undefined;
  const formIsValid = enteredInputTextIsValid;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        <label className="font-semibold">{label}</label>
        {isBorderBox ? <></> : <p className=" text-[#AB74FF]">*</p>}
      </div>
      {isBorderBox ? (
        <>
          <TextareaAutosize
            value={inputText}
            placeholder={placeholder}
            className={`border-solid p-3 border-2 outline-0 placeholder:text-[#A5A5A5] ${
              formIsValid
                ? "border-[black]"
                : "border-[rgba(173, 173, 173, 0.40)]"
            }  focus:border-[#AB74FF]`}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setInputText(e.target.value);
              if (typeof inputText == "string" && inputText.length >= 100) {
                const text = e.target.value.slice(0, 100);
                setInputText(text);
              }
            }}
            maxLength={100}
          ></TextareaAutosize>
          <p className="w-full text-end text-[#A5A5A5] pt-1 text-xs">
            {typeof inputText == "string" &&
              `${inputText.replace(/<br\s*\/?>/gm, "\n").length}/100`}
          </p>
        </>
      ) : (
        <>
          <input
            type="text"
            value={inputText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (numberType) {
                setInputText(e.currentTarget.value.replace(/[^0-9]/g, ""));
              } else {
                setInputText(e.currentTarget.value);
              }
            }}
            placeholder={placeholder}
            className={`border-solid border-t-0 border-y-2 ${
              formIsValid
                ? "border-black"
                : "border-[rgba(173, 173, 173, 0.40)]"
            }  focus:border-[#AB74FF] placeholder:text-[#A5A5A5] outline-0 font-normal p-3`}
          />
          {numberType ? (
            <p className="w-full text-end text-[#A5A5A5] pt-1 text-xs">
              한글 없이 숫자만 입력
            </p>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
