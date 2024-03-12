"use client";

import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import dayjs from "dayjs";
import TicketingForm from "@/src/components/admin/TicketingField.component";
import AddButton from "../../../public/svg/Addbutton.svg";

export enum FIELD_TYPES {
  GENERAL_TICKET_FIELD = "general",
  EARLYBIRD_TICKET_FIELD = "earlybird",
  PERFORM_DATE_FIELD = "performdate",
}

export interface IPerformDateData {
  date: string;
}

export interface IFormFieldsData extends IPerformDateData {
  link: string;
  platform: string;
}

export type DataUnion = IFormFieldsData[] | IPerformDateData[];

type ticketingInfoProps = {
  generalField: IFormFieldsData[];
  earlyField: IFormFieldsData[];
  setGeneralField: Dispatch<SetStateAction<IFormFieldsData[]>>;
  setEarlyField: Dispatch<SetStateAction<IFormFieldsData[]>>;
};

export default function TicketingInfo({
  generalField,
  setGeneralField,
  earlyField,
  setEarlyField,
}: ticketingInfoProps) {
  const [performDates, setPerformDates] = useState<IPerformDateData[]>([
    { date: "" },
  ]);

  const handleAddFields = (type: string) => {
    switch (type) {
      case FIELD_TYPES.EARLYBIRD_TICKET_FIELD: {
        const values = [
          ...earlyField,
          { date: "", link: "", platform: "" },
        ];
        setEarlyField(values);
        break;
      }
      case FIELD_TYPES.GENERAL_TICKET_FIELD: {
        const values = [
          ...generalField,
          { date: "", link: "", platform: "" },
        ];
        setGeneralField(values);
        break;
      }
      case FIELD_TYPES.PERFORM_DATE_FIELD: {
        const values = [...performDates, { date: "" }];
        setPerformDates(values);
        break;
      }
      default:
        return;
    }
  };

  const handleFieldChange = (
    type: string,
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | SyntheticEvent | any,
    data: DataUnion,
    fieldName: string,
  ) => {
    const eventTarget = e.target as HTMLElement;
    const values = [...data];
    console.log(data);
    if (fieldName === "link" || fieldName === "platform") {
      const formFieldValues = values as IFormFieldsData[];
      formFieldValues[index][fieldName] = e.target.value;
    } else if (fieldName === "platformText") {
      const formFieldValues = values as IFormFieldsData[];
      formFieldValues[index].platform = eventTarget.innerText;
    } else if (fieldName === "date") {
      const date = e.$d;
      const dateFormat = dayjs(date).format("YYYY-MM-DD HH:mm");
      values[index][fieldName] = dateFormat;
    } else {
      return;
    }

    switch (type) {
      case FIELD_TYPES.GENERAL_TICKET_FIELD:
        setGeneralField(values as IFormFieldsData[]);
        break;
      case FIELD_TYPES.EARLYBIRD_TICKET_FIELD:
        setEarlyField(values as IFormFieldsData[]);
        break;
      case FIELD_TYPES.PERFORM_DATE_FIELD:
        setPerformDates(values as IPerformDateData[]);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex gap-1">
          <p className="text-start font-semibold">일반 티켓팅</p>
          <p className=" text-[#AB74FF]">*</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          {generalField.map((field, index) => (
            <TicketingForm
              key={index}
              value={generalField}
              ticketingLink={field.link}
              setTicketingLink={setGeneralField}
              platform={field.platform}
              date={field.date}
              onChange={(e) =>
                handleFieldChange(
                  FIELD_TYPES.GENERAL_TICKET_FIELD,
                  index,
                  e,
                  generalField,
                  "link",
                )
              }
              calendarOnChange={(e) =>
                handleFieldChange(
                  FIELD_TYPES.GENERAL_TICKET_FIELD,
                  index,
                  e,
                  generalField,
                  "date",
                )
              }
              TicketingSiteOnChange={(e) =>
                handleFieldChange(
                  FIELD_TYPES.GENERAL_TICKET_FIELD,
                  index,
                  e,
                  generalField,
                  "platformText",
                )
              }
            />
          ))}
        </div>
        <button
          className="py-3"
          type="button"
          onClick={() => handleAddFields(FIELD_TYPES.GENERAL_TICKET_FIELD)}
        >
          <AddButton />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p className="w-full text-start font-semibold">얼리버드 티켓팅</p>
        <div className="w-full flex flex-col gap-2">
          {earlyField.map((field, index) => (
            <TicketingForm
              key={index}
              value={earlyField}
              ticketingLink={field.link}
              setTicketingLink={setEarlyField}
              platform={field.platform}
              date={field.date}
              onChange={(e) =>
                handleFieldChange(
                  FIELD_TYPES.EARLYBIRD_TICKET_FIELD,
                  index,
                  e,
                  earlyField,
                  "link",
                )
              }
              calendarOnChange={(e) =>
                handleFieldChange(
                  FIELD_TYPES.EARLYBIRD_TICKET_FIELD,
                  index,
                  e,
                  earlyField,
                  "date",
                )
              }
              TicketingSiteOnChange={(e) =>
                handleFieldChange(
                  FIELD_TYPES.EARLYBIRD_TICKET_FIELD,
                  index,
                  e,
                  earlyField,
                  "platformText",
                )
              }
            />
          ))}
        </div>
        <button
          className="py-3"
          type="button"
          onClick={() => handleAddFields(FIELD_TYPES.EARLYBIRD_TICKET_FIELD)}
        >
          <AddButton />
        </button>
      </div>
    </>
  );
}
