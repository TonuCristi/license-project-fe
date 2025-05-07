import Button from "./Button";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

export default function Pagination() {
  return (
    <div className="text-primary flex items-center gap-8 font-semibold">
      <Button
        variant="empty"
        className="bg-primary flex h-7 w-7 items-center justify-center rounded-full"
      >
        <HiMiniChevronLeft className="stroke-1 text-xl text-white" />
      </Button>

      <div className="flex items-center gap-2">
        <div className="border-primary flex h-7 w-7 items-center justify-center rounded-full border-2 p-1">
          1
        </div>
        <div className="bg-primary border-primary flex h-7 w-7 items-center justify-center rounded-full border-2 p-1 text-white">
          2
        </div>
        <div className="border-primary flex h-7 w-7 items-center justify-center rounded-full border-2 p-1">
          3
        </div>
      </div>

      <Button
        variant="empty"
        className="bg-primary flex h-7 w-7 items-center justify-center rounded-full"
      >
        <HiMiniChevronRight className="stroke-1 text-xl text-white" />
      </Button>
    </div>
  );
}
