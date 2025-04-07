import Appointments from "../components/appointments/components/Appointments";

export default function HomePage() {
  return (
    <main className="flex h-full w-full overflow-hidden">
      <div className="border-primary m-auto h-full w-5xl overflow-hidden border-x-2">
        <Appointments />
      </div>
    </main>
  );
}
