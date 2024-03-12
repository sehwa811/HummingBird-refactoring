import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useForm,
  Controller,
  useController,
} from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export default function DateTime() {
  

  return (
    <>
      <Controller
 
        name="date"
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  format="YYYY.MM.DD HH:mm"
                  label="Date"
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          );
        }}
      />
    </>
  );
}
