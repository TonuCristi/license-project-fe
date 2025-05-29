import Select from "../../Select";

const typeOptions = [
  { value: "team", text: "Team" },
  { value: "project", text: "Project" },
];

export default function MeetingTypeFilter() {
  return (
    <Select
      name="meetingType"
      placeholder="Select a meeting type"
      options={typeOptions}
    />
  );
}
