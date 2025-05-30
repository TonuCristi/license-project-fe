import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import PageTitle from "../components/PageTitle";
import MeetingsDateFilters from "../components/meetings/components/MeetingsDateFilters";
import MeetingsList from "../components/meetings/components/MeetingsList";
import Select from "../components/Select";

import MeetingsProvider from "../contexts/MeetingsContext";
import { meetingsFiltersSchema } from "../schemas/meetingsFilters.schema";

const typeOptions = [
  { value: "team", text: "Team" },
  { value: "project", text: "Project" },
];

const stateOptions = [
  { value: "finished", text: "Finished" },
  { value: "upcoming", text: "Upcoming" },
];

export default function MeetingsPage() {
  const methods = useForm({
    defaultValues: {
      meetingType: "",
      meetingState: "",
      year: "",
      month: "",
      day: "",
    },
    resolver: zodResolver(meetingsFiltersSchema),
  });

  const { watch } = methods;

  return (
    <MeetingsProvider>
      <FormProvider {...methods}>
        <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-hidden overflow-y-auto border-x-2 p-2 pr-2 sm:p-4 lg:w-5xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="mr-auto">
              <PageTitle>Meetings</PageTitle>
            </div>
            <Select
              name="meetingType"
              placeholder="Select a meeting type"
              options={typeOptions}
            />
            <Select
              name="meetingState"
              placeholder="Select a meeting state"
              options={stateOptions}
            />
          </div>

          {watch("meetingType") && watch("meetingState") ? (
            <div className="flex flex-col gap-3">
              <MeetingsDateFilters />
              {watch("year") ? (
                <MeetingsList />
              ) : (
                <p>Select a year to see the meetings.</p>
              )}
            </div>
          ) : (
            <p>Select the meeting type and state to see the meetings.</p>
          )}
        </main>
      </FormProvider>
    </MeetingsProvider>
  );
}
