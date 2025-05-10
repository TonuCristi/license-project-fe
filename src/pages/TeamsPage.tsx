import { useContext, useEffect } from "react";

import PageTitle from "../components/PageTitle";
import CreateTeamButton from "../components/teams/components/CreateTeamButton";
import SelectedTeam from "../components/teams/components/SelectedTeam";
import TeamsDropdown from "../components/teams/components/TeamsDropdown";

import { TeamsContext } from "../contexts/TeamsContext";

export default function TeamsPage() {
  const { selectedTeam, setSelectedTeam, setMembers, setPages, setOffset } =
    useContext(TeamsContext);

  useEffect(() => {
    return () => {
      setSelectedTeam(null);
      setMembers([]);
      setPages(0);
      setOffset(0);
    };
  }, [setSelectedTeam, setMembers, setPages, setOffset]);

  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <PageTitle>Teams</PageTitle>
      <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
        <TeamsDropdown />
        <CreateTeamButton />
      </div>
      {selectedTeam && <SelectedTeam />}
    </main>
  );
}
