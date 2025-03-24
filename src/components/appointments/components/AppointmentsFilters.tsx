import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Select from "../../Select";
import Button from "../../Button";

import { appointmentsFiltersSchema } from "../../../schemas/appointmentsFilters.schema";

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

type Props = {
  getAppointments: (year?: string, month?: string, day?: string) => void;
};

export default function AppointmentsFilters({ getAppointments }: Props) {
  const methods = useForm({
    defaultValues: {
      year: "",
      month: "",
      day: "",
    },
    resolver: zodResolver(appointmentsFiltersSchema),
  });

  const { watch, reset } = methods;

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    reset();
  }

  useEffect(() => {
    const { unsubscribe } = watch(({ year, month, day }) => {
      getAppointments(year, month, day);
    });

    return () => unsubscribe();
  }, [watch, getAppointments]);

  return (
    <FormProvider {...methods}>
      <form className="flex items-end justify-between gap-3">
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
        <Button onClick={handleReset}>Reset</Button>
      </form>
    </FormProvider>
  );
}
