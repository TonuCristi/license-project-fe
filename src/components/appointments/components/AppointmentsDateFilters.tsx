import { SyntheticEvent, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Select from "../../Select";
import Button from "../../Button";

import { useFetchAppointments } from "../hooks/useFetchAppointments";
import { useFetchAppointmentsYears } from "../hooks/useFetchAppointmentsYears";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { DAY_OPTIONS, MONTH_OPTIONS } from "../../../constants/filters";

const selects = [
  {
    label: "Month",
    name: "month",
    placeholder: "Select a month",
    options: MONTH_OPTIONS,
  },
  {
    label: "Day",
    name: "day",
    placeholder: "Select a day",
    options: DAY_OPTIONS,
  },
];

export default function AppointmentsDateFilters() {
  const { watch, reset } = useFormContext();
  const { getAppointments } = useFetchAppointments();
  const { isLoading: isAppointmentsYearsLoading } = useFetchAppointmentsYears(
    watch("state"),
  );
  const {
    isLoading: isAppointmentsLoading,
    appointmentsYears,
    setAppointments,
  } = useContext(AppointmentsContext);

  const yearOptions = appointmentsYears.map((year) => ({
    value: String(year),
    text: String(year),
  }));

  function handleReset(e: SyntheticEvent) {
    setAppointments([]);

    e.preventDefault();
    reset({
      state: watch("state"),
      year: "",
      month: "",
      day: "",
    });
  }

  useEffect(() => {
    const { unsubscribe } = watch(({ state, year, month, day }) => {
      if (!(year === "" && month === "" && day === "")) {
        getAppointments(state, year, month, day);
      }
    });

    return () => unsubscribe();
  }, [watch, reset, getAppointments]);

  return (
    <form className="grid grid-cols-1 items-end gap-x-3 gap-y-2 sm:grid-cols-2 md:flex md:items-end md:justify-between md:gap-3">
      <InputContainer>
        <Label>Year</Label>
        <Select
          name="year"
          placeholder="Select a year"
          options={yearOptions}
          disabled={isAppointmentsYearsLoading || isAppointmentsLoading}
        />
      </InputContainer>
      {selects.map(({ label, name, placeholder, options }) => (
        <InputContainer key={name}>
          <Label>{label}</Label>
          <Select
            name={name}
            placeholder={placeholder}
            options={options}
            disabled={isAppointmentsYearsLoading || isAppointmentsLoading}
          />
        </InputContainer>
      ))}
      <Button onClick={handleReset}>Reset</Button>
    </form>
  );
}
