import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Meeting } from "../types/meeting.type";

type MeetingsContext = {
  meetings: Meeting[];
  meetingsYears: number[];
  isLoading: boolean;
  setMeetings: Dispatch<SetStateAction<Meeting[]>>;
  setMeetingsYears: Dispatch<SetStateAction<number[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const MeetingsContext = createContext<MeetingsContext>({
  meetings: [],
  meetingsYears: [],
  isLoading: false,
  setMeetings: () => undefined,
  setMeetingsYears: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function MeetingsProvider({ children }: Props) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingsYears, setMeetingsYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        meetingsYears,
        isLoading,
        setMeetings,
        setMeetingsYears,
        setIsLoading,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
}
