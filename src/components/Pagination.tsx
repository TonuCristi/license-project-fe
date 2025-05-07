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
    <div className="text-primary flex items-center gap-8 font-semibold">
      <Button
        variant="empty"
        disabled={isLoading}
        onClick={() => setOffset((prev) => (prev === 0 ? prev : prev - 1))}
        className="bg-primary flex h-7 w-7 items-center justify-center rounded-full"
      >
        <HiMiniChevronLeft className="stroke-1 text-xl text-white" />
      </Button>

      <div className="grid grid-cols-[auto_auto_auto] items-center gap-2">
        {offset > 0 && (
          <div className="border-primary flex h-7 w-7 items-center justify-center rounded-full border-2 p-1">
            {offset}
          </div>
        )}
        <div className="bg-primary border-primary flex h-7 w-7 items-center justify-center rounded-full border-2 p-1 text-white">
          {offset + 1}
        </div>
        {offset < pages - 1 && (
          <div className="border-primary flex h-7 w-7 items-center justify-center rounded-full border-2 p-1">
            {offset + 2}
          </div>
        )}
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
  );
}
