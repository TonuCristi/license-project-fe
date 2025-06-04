import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchContacts } from "../hooks/useFetchContacts";
import { ContactsContext } from "../../../contexts/ContactsContext";

export default function ContactsSearchBar() {
  const { getContacts } = useFetchContacts();
  const { setContacts } = useContext(ContactsContext);

  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch(({ value }) => {
      setContacts([]);
      getContacts(value, 0, 15);
    });

    return () => unsubscribe();
  }, [watch, getContacts, setContacts]);

  return (
    <form className="w-full">
      <Input
        name="value"
        placeholder="Search your contact..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
