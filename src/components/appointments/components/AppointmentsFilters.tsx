import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Select from "../../Select";
import Button from "../../Button";

import { appointmentsFiltersSchema } from "../../../schemas/appointmentsFilters.schema";
import { useFetchAppointments } from "../hooks/useFetchAppointments";
import { useFetchAppointmentsFiltersData } from "../hooks/useFetchAppointmentsFiltersData";

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
  const methods = useForm({
    defaultValues: {
      year: "",
      month: "",
      day: "",
    },
    resolver: zodResolver(appointmentsFiltersSchema),
  });
  const { getAppointments } = useFetchAppointments();
  const {
    appointmentsYears,
    isAppointmentsFiltersDataLoading,
    getAppointmentsFiltersData,
  } = useFetchAppointmentsFiltersData();

  const { watch, reset } = methods;

  const yearOptions = appointmentsYears.map((year) => ({
    value: String(year),
    text: String(year),
  }));

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    reset();
  }

  useEffect(() => {
    getAppointmentsFiltersData();
  }, [getAppointmentsFiltersData]);

  useEffect(() => {
    const { unsubscribe } = watch(({ year, month, day }) => {
      getAppointments(year, month, day);
    });

    return () => unsubscribe();
  }, [watch, getAppointments]);

  return (
    <FormProvider {...methods}>
      <form className="grid grid-cols-1 items-end gap-x-3 gap-y-2 sm:grid-cols-2 md:flex md:items-end md:justify-between md:gap-3">
        <InputContainer>
          <Label>Year</Label>
          <Select
            name="year"
            placeholder="Select a year"
            options={yearOptions}
            disabled={isAppointmentsFiltersDataLoading}
          />
        </InputContainer>
        <InputContainer>
          <Label>Month</Label>
          <Select
            name="month"
            placeholder="Select a month"
            options={monthOptions}
            disabled={isAppointmentsFiltersDataLoading}
          />
        </InputContainer>
        <InputContainer>
          <Label>Day</Label>
          <Select
            name="day"
            placeholder="Select a day"
            options={dayOptions}
            disabled={isAppointmentsFiltersDataLoading}
          />
        </InputContainer>
        <Button onClick={handleReset}>Reset</Button>
      </form>
    </FormProvider>
  );
}
