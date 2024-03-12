import { SyntheticEvent, SetStateAction, Dispatch, ChangeEvent } from "react";

import { ticketPlatformList } from "../../lib/static/ticket-platforms";
import { Autocomplete, TextField } from "@mui/material";

interface ITicketingForm {
  ticketingLink: string;
  setTicketingLink: Dispatch<SetStateAction<any>>;
  platform: string;
  onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
  calendarOnChange(
    value: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void;
  TicketingSiteOnChange?(e: SyntheticEvent<Element, Event>): void;
  value: string[] | IPerformDateData[];
  key: number;
  date: string;
}

import PerformDateField from "./PerformDateField.component";
import { IPerformDateData } from "./TicketingInfo.component";

export default function TicketingForm({
  ticketingLink,
  platform,
  onChange,
  calendarOnChange,
  TicketingSiteOnChange,
  value,
  date,
}: ITicketingForm) {
  const enteredInputTextIsValid = ticketingLink !== "";
  const formIsValid = enteredInputTextIsValid;

  const selectedPlatformIsValid = platform !== "" && platform !== undefined;
  const platformValid = selectedPlatformIsValid;

  const dateFieldValid = date !== "";
  const dateIsValid = dateFieldValid;

  return (
    <div className="w-full">
      <div>
        <div className="">
          <PerformDateField
            label="티켓팅 날짜와 시간을 입력해주세요"
            onChange={calendarOnChange}
            value={value}
            className="date"
            date={date}
          />
        </div>
        <div>
          <Autocomplete
            autoComplete
            id="auto-complete"
            options={ticketPlatformList}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="티켓팅 사이트 명을 입력해주세요"
              />
            )}
            onChange={TicketingSiteOnChange}
            className={platformValid ? "select-box isSelected" : "select-box"}
          />
        </div>
        <div className="flex flex-col">
          <input
            name="link"
            onChange={onChange}
            placeholder="티켓팅 사이트 링크를 입력해주세요"
            className={`border-solid border-t-0 border-y-2 ${
              formIsValid
                ? "border-black"
                : "border-[rgba(173, 173, 173, 0.40)]"
            }  focus:border-[#AB74FF] placeholder:text-[#A5A5A5] outline-0 font-normal p-3`}
          />
        </div>
      </div>
    </div>
  );
}
