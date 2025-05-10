import { Dispatch, SetStateAction } from "react";

import Button from "./Button";

import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

type Props = {
  isLoading: boolean;
  pages: number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function Pagination({
  isLoading,
  pages,
  offset,
  setOffset,
}: Props) {
  return (
    <div className="text-primary xs:grid-cols-3 xs:gap-4 xs:px-8 grid w-full grid-cols-1 items-center justify-items-center gap-2 font-semibold">
      <div></div>
      <div className="flex items-center gap-8">
        <Button
          variant="empty"
          disabled={isLoading}
          onClick={() => setOffset((prev) => (prev === 0 ? prev : prev - 1))}
          className="bg-primary flex h-7 w-7 items-center justify-center rounded-full"
        >
          <HiMiniChevronLeft className="stroke-1 text-xl text-white" />
        </Button>

        <div className="bg-primary border-primary flex h-7 w-7 items-center justify-center rounded-full border-2 p-1 text-white">
          {offset + 1}
        </div>

        <Button
          variant="empty"
          disabled={isLoading}
          onClick={() =>
            setOffset((prev) => (prev < pages - 1 ? prev + 1 : prev))
          }
          className="bg-primary flex h-7 w-7 items-center justify-center rounded-full"
        >
          <HiMiniChevronRight className="stroke-1 text-xl text-white" />
        </Button>
      </div>
      <div className="xs:justify-self-end">Pages: {pages}</div>
    </div>
  );
}
