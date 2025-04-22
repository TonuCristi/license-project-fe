import Notification from "./Notification";

export default function Notifications() {
  return (
    <div className="border-primary absolute flex h-80 w-80 flex-col gap-2 rounded-lg border-2 bg-blue-50 p-3">
      <h2 className="text-lg font-medium">Notifications</h2>
      <ul className="scrollbar flex h-full flex-col gap-2 overflow-y-auto pr-2">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </ul>
    </div>
  );
}
