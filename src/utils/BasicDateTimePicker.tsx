import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { IPerformDateData } from "../components/admin/TicketingInfo.component";

interface IBasicDateTimePicker {
  label: string;
  onChange(e: any): void;
  value: string[] | IPerformDateData[];
  className: string;
  date: string;
}

export default function BasicDateTimePicker({
  label,
  onChange,
  className,
  date
}: IBasicDateTimePicker) {

  const dateFieldValid = date !== "";
  const dateFormIsValid = dateFieldValid;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: dateFormIsValid ? "black" : "rgba(173, 173, 173, 0.40)",
                borderWidth: "2px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#AB74FF",
              },
            },
          }}
          format="YYYY.MM.DD HH:mm"
          onChange={onChange}
          label={label}
          className={className}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
