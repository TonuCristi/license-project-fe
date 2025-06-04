import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";
import Button from "../../Button";
import Select from "../../Select";
import Textarea from "../../Textarea";

import { Appointment, EditAppointment } from "../../../types/appointment.type";
import { useEditAppointment } from "../hooks/useEditAppointment";
import { appointmentFormSchema } from "../../../schemas/appointmentForm.schema";

const inputs = [
  {
    label: "Attendeee",
    id: "attendee",
    name: "attendee",
    placeholder: "Attendee...",
  },
  {
    label: "Attendee phone number",
    id: "attendeePhoneNumber",
    name: "attendeePhoneNumber",
    placeholder: "Attendee phone number...",
  },
  {
    label: "Location",
    id: "location",
    name: "location",
    placeholder: "Location...",
  },
] as const;

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
  appointment: Appointment;
};

export default function EditAppointmentForm({ appointment }: Props) {
  const methods = useForm<EditAppointment>({
    defaultValues: {
      ...appointment,
      date:
        appointment.startTime.split(":")[0] +
        ":" +
        appointment.startTime.split(":")[1],
    },
    resolver: zodResolver(appointmentFormSchema),
  });
  const { editAppointment, isLoading } = useEditAppointment();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<EditAppointment> = (data) => {
    const date = data.date + ":00Z";
    editAppointment(appointment.id, { ...data, date });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary xxs:w-72 absolute top-full right-0 z-50 mt-3 flex w-52 flex-col rounded-xl border-2 bg-white p-3 sm:h-auto sm:w-xl"
      >
        <h2 className="mb-1 text-lg font-medium">Edit appointment</h2>
        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {inputs.map(({ label, id, name, placeholder }) => (
            <InputContainer key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} name={name} placeholder={placeholder} />
              {errors[name] && (
                <Message variant="error">{errors[name].message}</Message>
              )}
            </InputContainer>
          ))}
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
          <div className="sm:col-span-2 sm:row-start-4">
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
        <Button disabled={isLoading}>Save</Button>
      </form>
    </FormProvider>
  );
}
