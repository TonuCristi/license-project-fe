import { FormProvider, useForm } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Select from "../../Select";

const yearOptions = [
  { value: "2025", text: "2025" },
  { value: "2026", text: "2026" },
];

const monthOptions = [
  { value: "0", text: "January" },
  { value: "1", text: "February" },
  { value: "2", text: "March" },
  { value: "3", text: "April" },
  { value: "4", text: "May" },
  { value: "5", text: "June" },
  { value: "6", text: "July" },
  { value: "7", text: "August" },
  { value: "8", text: "September" },
  { value: "9", text: "October" },
  { value: "10", text: "November" },
  { value: "11", text: "December" },
];

const dayOptions = [
  { value: "0", text: "Monday" },
  { value: "1", text: "Tuesday" },
  { value: "2", text: "Wednesday" },
  { value: "3", text: "Thrusday" },
  { value: "4", text: "Friday" },
  { value: "5", text: "Saturday" },
  { value: "6", text: "Sunday" },
];

export default function AppointmentsFilters() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="flex items-center justify-between gap-3">
        <InputContainer>
          <Label>Year</Label>
          <Select
            name="year"
            placeholder="Select a year"
            options={yearOptions}
          />
        </InputContainer>
        <InputContainer>
          <Label>Month</Label>
          <Select
            name="month"
            placeholder="Select a month"
            options={monthOptions}
          />
        </InputContainer>
        <InputContainer>
          <Label>Day</Label>
          <Select name="day" placeholder="Select a day" options={dayOptions} />
        </InputContainer>
      </form>
    </FormProvider>
  );
}
