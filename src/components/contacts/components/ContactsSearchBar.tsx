import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchContacts } from "../hooks/useFetchContacts";
import { ContactsContext } from "../../../contexts/ContactsContext";

type Props = {
  setOffset: Dispatch<SetStateAction<number>>;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
};

export default function ContactsSearchBar({
  setOffset,
  setIsSearching,
}: Props) {
  const { getContacts } = useFetchContacts();
  const { setContacts } = useContext(ContactsContext);
  const controllerRef = useRef<AbortController>();

  const { watch } = useFormContext();

  useEffect(() => {
    controllerRef.current = new AbortController();
  }, []);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    console.log(controllerRef.current);

    const { unsubscribe } = watch(({ value }) => {
      setOffset(1);
      setContacts([]);
      setIsSearching(true);
      if (controllerRef.current) {
        getContacts(value, 0, 15, controllerRef.current);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [watch, getContacts, setContacts, setOffset, setIsSearching]);

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
