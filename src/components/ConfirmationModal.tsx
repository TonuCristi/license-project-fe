import Button from "./Button";
import Overlay from "./Overlay";

type Props = {
  children: string;
  onAprove: () => void;
  onReject: () => void;
  isLoading?: boolean;
};

export default function ConfirmationModal({
  children,
  onAprove,
  onReject,
  isLoading,
}: Props) {
  return (
    <Overlay>
      <div className="border-primary flex w-80 flex-col items-center gap-5 rounded-xl border-2 bg-white p-3">
        <p className="font-medium">{children}</p>
        <div className="grid w-full grid-cols-2 gap-3">
          <Button disabled={isLoading} onClick={onAprove}>
            Aprove
          </Button>
          <Button variant="reject" onClick={onReject}>
            Reject
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
