import { useParams } from "react-router";
import PageTitle from "../components/PageTitle";

export default function ProjectPage() {
  const { projectId } = useParams();

  console.log(projectId);

  return (
    <main className="border-primary scrollbar xs:gap-5 m-auto flex h-full w-full flex-col gap-2 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <PageTitle>Projects</PageTitle>
    </main>
  );
}
