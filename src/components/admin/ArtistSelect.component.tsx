"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import React, { Dispatch, SetStateAction } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { artistSaveToDb, searchArtists } from "@/src/utils/api/artists.api";

type artistData = {
  id: string;
  name: string;
};

type artistSelectProps = {
  value: artistData | null;
  setValue: Dispatch<SetStateAction<artistData | null>>;
};

export default function ArtistSelect({ value, setValue }: artistSelectProps) {
  const [artistAlphabet, setArtistAlphabet] = useState<string>("");
  const [artistDropdown, setArtistDropdown] = useState<artistData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOnInputChange = (e: any): void => {
    const eventTarget = e.target;
    const value = eventTarget.value;
    setArtistAlphabet(value);
  };
  const saveArtistToDb = useMutation(artistSaveToDb, {
    onSuccess: () => {
      alert("Artist was saved to DB!");
    },
    onError: () => {
      alert("Failed to save the artist to DB!");
    },
  });

  const handleOnChangeArtist = async (
    e: SyntheticEvent,
    value: artistData,
  ): Promise<any> => {
    const eventTarget = e.target as HTMLElement;
    const artistId = value ? value.id : null;
    setValue(value);
    setIsSelected((prev: boolean) => !prev);
    await saveArtistToDb.mutateAsync(value.name);
  };

  const { data, isError, isLoading } = useQuery(
    ["searchArtists", artistAlphabet],
    () => searchArtists(artistAlphabet),
    { retry: false, refetchOnWindowFocus: false },
  );
  useEffect(() => {
    if (data) {
      const rawData = data.data;
      setArtistDropdown(rawData);
    }
  }, [data]);

  return (
    <div>
      <div className="flex gap-1">
        <label className="font-semibold">가수명</label>
        <p className=" text-[#AB74FF]">*</p>
      </div>
      <Autocomplete
        disabled={isOpen}
        autoComplete
        disablePortal
        id="auto-complete"
        options={artistDropdown}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="가수 명을 입력해주세요"
          />
        )}
        onChange={(event, value) => handleOnChangeArtist(event, value!)}
        onInputChange={(e) => handleOnInputChange(e)}
        className={isSelected ? "select-box isSelected" : "select-box"}
      />
    </div>
  );
}
