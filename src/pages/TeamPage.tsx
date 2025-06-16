import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import DeleteTeamButton from "../components/teams/components/DeleteTeamButton";
import EditTeamButton from "../components/teams/components/EditTeamButton";

import { useTeam } from "../components/teams/hooks/useTeam";

export default function TeamPage() {
  const {
    editTeam,
    deleteTeam,
    team,
    isLoading,
    isEditLoading,
    isDeleteLoading,
  } = useTeam();

  const { name } = team;

  if (isLoading) {
    return (
      <main className="border-primary m-auto flex h-screen w-full flex-col items-center justify-center gap-2 border-x-2 p-2 sm:p-4 lg:w-5xl">
        <Loader />
      </main>
    );
  }

  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-2 overflow-x-hidden overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <div className="flex w-full items-center justify-between gap-2">
        <PageTitle>{`${name} team`}</PageTitle>
        <div className="ml-auto flex items-center gap-2">
          <DeleteTeamButton
            teamId={team.id}
            deleteTeam={deleteTeam}
            isDeleteLoading={isDeleteLoading}
          />
          <EditTeamButton
            team={team}
            editTeam={editTeam}
            isEditLoading={isEditLoading}
          />
        </div>
      </div>
    </main>
  );
}
