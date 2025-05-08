import PageTitle from "../components/PageTitle";
import CreateTeamButton from "../components/teams/components/CreateTeamButton";

export default function TeamsPage() {
  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <PageTitle>Teams</PageTitle>
      <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
        <div className="border-primary h-8 w-full rounded-xl border-2"></div>
        <CreateTeamButton />
      </div>
    </main>
  );
}
