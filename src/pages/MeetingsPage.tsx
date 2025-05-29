import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import PageTitle from "../components/PageTitle";
import MeetingTypeFilter from "../components/meetings/components/MeetingTypeFilter";
import MeetingsDateFilters from "../components/meetings/components/MeetingsDateFilters";
import MeetingsList from "../components/meetings/components/MeetingsList";

import MeetingsProvider from "../contexts/MeetingsContext";
import { meetingsFiltersSchema } from "../schemas/meetingsFilters.schema";

export default function MeetingsPage() {
  const methods = useForm({
    defaultValues: {
      meetingType: "",
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
        <main className="border-primary m-auto flex h-full w-full flex-col gap-5 overflow-hidden border-x-2 p-2 sm:p-4 lg:w-5xl">
          <div className="flex items-center justify-between gap-4">
            <PageTitle>Meetings</PageTitle>
            <MeetingTypeFilter />
          </div>

          {watch("meetingType") ? (
            <div className="scrollbar flex h-full flex-col gap-3 overflow-y-auto pr-2">
              <MeetingsDateFilters />
              <MeetingsList />
            </div>
          ) : (
            <p>Select a meeting type to see the meetings.</p>
          )}
        </main>
      </FormProvider>
    </MeetingsProvider>
  );
}
