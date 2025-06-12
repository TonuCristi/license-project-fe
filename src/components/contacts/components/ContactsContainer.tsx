import { ReactNode } from "react";

import ContactsProvider from "../../../contexts/ContactsContext";

type Props = { children: ReactNode };

export default function ContactsContainer({ children }: Props) {
  return (
    <ContactsProvider>
      <div className="border-primary flex h-3/4 w-11/12 flex-col gap-2 overflow-hidden rounded-lg border-2 bg-blue-50 p-2 sm:w-2/3 md:w-1/2 lg:w-md">
        {children}
      </div>
    </ContactsProvider>
  );
}
