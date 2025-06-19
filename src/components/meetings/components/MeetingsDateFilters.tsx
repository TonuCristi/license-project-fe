import { SyntheticEvent, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Select from "../../Select";
import Button from "../../Button";

import { useFetchMeetingsYears } from "../hooks/useFetchMeetingsYears";
import { useFetchMeetings } from "../hooks/useFetchMeetings";
import { MeetingsContext } from "../../../contexts/MeetingsContext";
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

export default function MeetingsDateFilters() {
  const {
    meetingsYears,
    setMeetings,
    isLoading: isMeetingsLoading,
  } = useContext(MeetingsContext);
  const { getMeetings } = useFetchMeetings();
  const { watch, reset } = useFormContext();
  const { isLoading: isMeetingYearsLoading } = useFetchMeetingsYears(
    watch("type"),
    watch("state"),
  );

  const yearOptions = meetingsYears.map((year) => ({
    value: String(year),
    text: String(year),
  }));

  function handleResetFilters(e: SyntheticEvent) {
    setMeetings([]);

    e.preventDefault();
    reset({
      type: watch("type"),
      state: watch("state"),
      year: "",
      month: "",
      day: "",
    });
  }

  useEffect(() => {
    const { unsubscribe } = watch(({ type, state, year, month, day }) => {
      if (!(year === "" && month === "" && day === "")) {
        getMeetings(type, state, year, month, day);
      }
    });

    return () => unsubscribe();
  }, [watch, getMeetings]);

  return (
    <form className="grid grid-cols-1 items-end gap-x-3 gap-y-2 sm:grid-cols-2 md:flex md:items-end md:justify-between md:gap-3">
      <InputContainer>
        <Label>Year</Label>
        <Select
          name="year"
          placeholder="Select a year"
          options={yearOptions}
          disabled={isMeetingYearsLoading || isMeetingsLoading}
        />
      </InputContainer>
      {selects.map(({ label, name, placeholder, options }) => (
        <InputContainer key={name}>
          <Label>{label}</Label>
          <Select
            name={name}
            placeholder={placeholder}
            options={options}
            disabled={isMeetingYearsLoading || isMeetingsLoading}
          />
        </InputContainer>
      ))}
      <Button onClick={handleResetFilters}>Reset</Button>
    </form>
  );
}
