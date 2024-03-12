import { SubmitHandler, useForm, useController } from "react-hook-form";

import { DataUnion } from "./TicketingInfo.component";
import "../../styles/autocomplete.custom.css";
import BasicDateTimePicker from "../../utils/BasicDateTimePicker";

interface IPerformDateField {
  onChange(e: any): void;
  label: string;
  value: string[] | DataUnion;
  className: string;
  date: string;
}

export default function PerformDateField({
  value,
  onChange,
  label,
  className,
  date,
}: IPerformDateField) {
  return (
    <div className="w-full">
      <BasicDateTimePicker
        value={value}
        onChange={onChange}
        label={label}
        className={className}
        date={date}
      />
    </div>
  );
}
