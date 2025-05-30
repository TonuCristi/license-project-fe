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
  isLoading: boolean;
  setMeetings: Dispatch<SetStateAction<Meeting[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const MeetingsContext = createContext<MeetingsContext>({
  meetings: [],
  isLoading: false,
  setMeetings: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function MeetingsProvider({ children }: Props) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <MeetingsContext.Provider
      value={{ meetings, isLoading, setMeetings, setIsLoading }}
    >
      {children}
    </MeetingsContext.Provider>
  );
}
