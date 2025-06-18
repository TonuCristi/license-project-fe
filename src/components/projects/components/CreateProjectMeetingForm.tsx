import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";
import Button from "../../Button";
import Select from "../../Select";
import Textarea from "../../Textarea";

import { meetingFormSchema } from "../../../schemas/meetingForm.schema";
import { CreateMeeting } from "../../../types/meeting.type";
import { useCreateProjectMeeting } from "../hooks/useCreateProjectMeeting";

const durationOptions = [
  { value: "1", text: "1" },
  { value: "2", text: "2" },
  { value: "3", text: "3" },
  { value: "4", text: "4" },
  { value: "5", text: "5" },
  { value: "6", text: "6" },
  { value: "7", text: "7" },
  { value: "8", text: "8" },
  { value: "9", text: "9" },
  { value: "10", text: "10" },
  { value: "11", text: "11" },
  { value: "12", text: "12" },
  { value: "13", text: "13" },
  { value: "14", text: "14" },
];

type Props = {
  projectId: string;
};

export default function CreateProjectMeetingForm({ projectId }: Props) {
  const methods = useForm<CreateMeeting>({
    defaultValues: {
      date: "",
      duration: "",
      note: "",
    },
    resolver: zodResolver(meetingFormSchema),
  });
  const { createProjectMeeting, isLoading } = useCreateProjectMeeting();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<CreateMeeting> = (data) => {
    const date = data.date + ":00Z";
    createProjectMeeting(projectId, { ...data, date });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary xxs:w-72 absolute top-full right-0 z-50 mt-3 flex h-96 w-full flex-col rounded-xl border-2 bg-white p-3 sm:h-auto sm:w-xl"
      >
        <h2 className="mb-1 text-lg font-medium">Create meeting</h2>
        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InputContainer>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="datetime-local"
              placeholder="Date..."
            />
            {errors.date && (
              <Message variant="error">{errors.date.message}</Message>
            )}
          </InputContainer>
          <InputContainer>
            <Label>Duration</Label>
            <Select
              name="duration"
              placeholder="Select the duration"
              options={durationOptions}
            />
            {errors.duration && (
              <Message variant="error">{errors.duration.message}</Message>
            )}
          </InputContainer>
          <div className="sm:col-span-2">
            <InputContainer>
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Note..."
                className="scrollbar"
              />
              {errors.note && (
                <Message variant="error">{errors.note.message}</Message>
              )}
            </InputContainer>
          </div>
        </div>
        <Button disabled={isLoading}>Create</Button>
      </form>
    </FormProvider>
  );
}
