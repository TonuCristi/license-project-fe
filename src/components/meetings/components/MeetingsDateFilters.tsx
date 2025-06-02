import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Select from "../../Select";
import Button from "../../Button";

import { useFetchMeetingsYears } from "../hooks/useFetchMeetingsYears";
import { useFetchMeetings } from "../hooks/useFetchMeetings";
import { MeetingsContext } from "../../../contexts/MeetingsContext";

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

const selects = [
  {
    label: "Month",
    name: "month",
    placeholder: "Select a month",
    options: monthOptions,
  },
  {
    label: "Day",
    name: "day",
    placeholder: "Select a day",
    options: dayOptions,
  },
];

export default function MeetingsDateFilters() {
  const { watch, reset } = useFormContext();
  const { isLoading: isMeetingYearsLoading } = useFetchMeetingsYears(
    watch("meetingType"),
    watch("meetingState"),
  );
  const { getMeetings } = useFetchMeetings();
  const {
    meetingsYears,
    setMeetings,
    isLoading: isMeetingsLoading,
  } = useContext(MeetingsContext);

  const yearOptions = meetingsYears.map((year) => ({
    value: String(year),
    text: String(year),
  }));

  function handleResetFilters(e: React.MouseEvent<HTMLButtonElement>) {
    setMeetings([]);

    e.preventDefault();
    reset({
      meetingType: watch("meetingType"),
      meetingState: watch("meetingState"),
      year: "",
      month: "",
      day: "",
    });
  }

  useEffect(() => {
    const { unsubscribe } = watch(
      ({ meetingType, meetingState, year, month, day }) => {
        if (!(year === "" && month === "" && day === "")) {
          getMeetings(meetingType, meetingState, year, month, day);
        }
      },
    );

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
