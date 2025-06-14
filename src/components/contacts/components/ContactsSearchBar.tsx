import { useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchContacts } from "../hooks/useFetchContacts";
import { ContactsContext } from "../../../contexts/ContactsContext";
import { PER_PAGE } from "./Contacts";

export default function ContactsSearchBar() {
  const { getContacts } = useFetchContacts();
  const { setContacts, setOffset } = useContext(ContactsContext);
  const controllerRef = useRef<AbortController>();

  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch(({ search }) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      setOffset(1);
      setContacts([]);
      if (controllerRef.current) {
        getContacts(search, 0, PER_PAGE, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [watch, getContacts, setContacts, setOffset]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search your contact..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
