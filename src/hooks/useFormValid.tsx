"use client";

import { artistData } from "../app/profile/admin/page";
import { IFormFieldsData } from "../components/admin/TicketingInfo.component";

interface IUseFormValid {
  name: string;
  artist: artistData | null;
  performDate: string[];
  location: string;
  runtime: number | undefined;
  generalFormFields: IFormFieldsData[];
  image: undefined | File;
}

function useFormValid({
  name,
  artist,
  performDate,
  location,
  runtime,
  generalFormFields,
  image,
}: IUseFormValid) {
  const isFormValid =
    name !== "" &&
    artist !== null &&
    performDate[0] !== "" &&
    location !== "" &&
    runtime &&
    runtime !== undefined &&
    generalFormFields[0].link !== "" &&
    image !== undefined;

  const isReadyToUpload = isFormValid;

  return isReadyToUpload;
}

export default useFormValid;
