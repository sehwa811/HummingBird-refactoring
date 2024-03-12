"use client";

import React, { FormEvent, useState } from "react";
import { artistSaveToDb } from "@/src/utils/api/artists.api";
import { useMutation } from "@tanstack/react-query";

import { IFormFieldsData } from "@/src/components/admin/TicketingInfo.component";
import ArtistSelect from "@/src/components/admin/ArtistSelect.component";
import PerformDate from "@/src/components/admin/PerformDate.component";
import TicketingInfo from "@/src/components/admin/TicketingInfo.component";
import ImageSelect from "@/src/components/admin/ImageSelect.component";
import { postPerformance } from "@/src/utils/api/admin.api";
import TextBox from "@/src/components/admin/TextBox";
import useFormValid from "@/src/hooks/useFormValid";

import "../../../styles/textInputForm.css";
import CustomModal from "@/src/components/common/CustomModal.component";
import AdminModal from "@/src/components/modal/Admin.component";

export interface ITextForm {
  name: string;
  location: string;
  description?: string;
  runtime: number;
}

export interface IOtherForm {
  artistName: string;
  performDate: string[];
  regularTicketing: IFormFieldsData[];
  earlybirdTicketing?: IFormFieldsData[];
  image: File | null;
}

export type IForm = ITextForm & IOtherForm;

export type artistData = {
  id: string;
  name: string;
};

export default function Temporary() {
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<artistData | null>(null);
  const [location, setLocation] = useState<string>("");
  const [runtime, setRuntime] = useState<number | undefined>();
  const [description, setDescription] = useState<string>("");
  const [performDate, setPerformDate] = useState<string[]>([""]);
  const [generalFormFields, setGeneralFormFields] = useState<IFormFieldsData[]>(
    [{ date: "", link: "", platform: "" }],
  );
  const [earlybirdFormFields, setEarlybirdFormFields] = useState<
    IFormFieldsData[]
  >([{ date: "", link: "", platform: "" }]);
  const [image, setImage] = useState<File | undefined>();
  const isReadyToUpload = useFormValid({
    name,
    artist,
    performDate,
    location,
    runtime,
    generalFormFields,
    image,
  });
  const [postSuccessAlert, setPostSuccessAlert] = useState<boolean>(false);

  const performanceUpload = useMutation(postPerformance, {
    onSuccess: () => {
      setPostSuccessAlert(true);
    },
  });

  const saveArtistToDb = useMutation(artistSaveToDb, {
    onSuccess: () => {
      alert("Artist was saved to DB!");
    },
    onError: () => {
      alert("Failed to save the artist to DB!");
    },
  });

  const handleOnSubmit = async (e: FormEvent) => {
    const formData: FormData = new FormData();
    const performBlob = new Blob(
      [
        JSON.stringify({
          artist_name: artist!.name,
          name: name,
          date: performDate,
          location: location,
          runtime: runtime,
          description: description,
          regular_ticketing: generalFormFields,
          earlybird_ticketing: earlybirdFormFields,
        }),
      ],
      { type: "application/json" },
    );
    formData.append("performance", performBlob);

    if (image) {
      formData.append("photo", image);
    }

    e.preventDefault();
    await performanceUpload.mutateAsync(formData);
    await saveArtistToDb.mutateAsync(artist && artist.id);
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <p className="text-2xl font-semibold p-2.5">
          공연 정보를<br></br>입력해주세요
        </p>
        <p className="text-[#A5A5A5] text-sm p-2.5">*는 필수항목 입니다.</p>
      </div>
      <form className="flex flex-col gap-10" onSubmit={handleOnSubmit}>
        <TextBox
          label="공연 명"
          setInputText={setName}
          inputText={name}
          placeholder="공연 명을 입력해주세요"
        />
        <ArtistSelect value={artist} setValue={setArtist} />
        <PerformDate value={performDate} setValue={setPerformDate} />
        <TextBox
          label="위치"
          inputText={location}
          setInputText={setLocation}
          placeholder="공연 위치를 입력해주세요"
        />
        <TextBox
          numberType
          label="공연 시간 (분 단위)"
          inputText={runtime}
          setInputText={setRuntime}
          placeholder="공연 시간을 입력해주세요 (예시: 120)"
        />
        <TextBox
          label="공연 설명"
          inputText={description}
          setInputText={setDescription}
          placeholder="공연 설명을 입력해주세요"
          isBorderBox
        />
        <TicketingInfo
          generalField={generalFormFields}
          setGeneralField={setGeneralFormFields}
          earlyField={earlybirdFormFields}
          setEarlyField={setEarlybirdFormFields}
        />
        <ImageSelect value={image} setValue={setImage} />
        <button
          type="submit"
          className={`w-full text-base py-4 text-white rounded-[6.25rem] ${
            isReadyToUpload ? "bg-[#AB74FF]" : "bg-[#A5A5A5]"
          }`}
        >
          업로드 하기
        </button>
        <CustomModal isOpen={postSuccessAlert}>
          <AdminModal closeModal={() => setPostSuccessAlert(false)} />
        </CustomModal>
      </form>
    </div>
  );
}
