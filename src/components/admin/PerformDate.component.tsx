"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useState, ChangeEvent, SyntheticEvent } from "react";

import PerformDateField from "@/src/components/admin/PerformDateField.component";
import dayjs from "dayjs";

import AddButton from "../../../public/svg/Addbutton.svg";

type performDateProps = {
  value: string[];
  setValue: Dispatch<SetStateAction<string[]>>;
}

export default function PerformDate({value, setValue}:performDateProps) {
  const handleFieldChange = (index: number, e: any, data: string[]) => {
    const values = [...data];
    const date = e.$d;
    const dateFormat = dayjs(date).format("YYYY-MM-DD HH:mm");
    values[index] = dateFormat;
    setValue(values as string[]);
  };

  const handleAddFields = () => {
    const values = [...value, ""];
    setValue(values);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex gap-1">
        <label className="font-semibold">공연 일자</label>
        <p className=" text-[#AB74FF]">*</p>
      </div>
      {value.map((field, index) => (
        <PerformDateField
          label="공연 날짜와 시간을 입력해주세요"
          value={value}
          key={index}
          date={field}
          className="date"
          onChange={(e) => handleFieldChange(index, e, value)}
        />
      ))}
      <button className="py-3" type="button" onClick={() => handleAddFields()}>
        <AddButton />
      </button>
    </div>
  );
}
