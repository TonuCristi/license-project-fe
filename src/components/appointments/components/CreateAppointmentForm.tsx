import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";
import Button from "../../Button";
import Select from "../../Select";
import Textarea from "../../Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointmentSchema } from "../../../schemas/createAppointment.schema";
import { CreateAppointment } from "../../../types/appointment.type";

const inputs = [
  {
    value: "Attendeee",
    id: "attendee",
    name: "attendee",
    placeholder: "Attendee...",
  },
  {
    value: "Attendee phone number",
    id: "attendeePhoneNumber",
    name: "attendeePhoneNumber",
    placeholder: "Attendee phone number...",
  },
  {
    value: "Location",
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
  createAppointment: (appointment: CreateAppointment) => void;
};

export default function CreateAppointmentForm({ createAppointment }: Props) {
  const methods = useForm<CreateAppointment>({
    resolver: zodResolver(createAppointmentSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<CreateAppointment> = (data) => {
    const date = data.date + ":00Z";
    createAppointment({ ...data, date });
    // console.log(date);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary absolute top-full right-0 z-50 mt-3 flex w-[45rem] flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Create appointment</h2>
        <div className="mb-3 grid grid-cols-2 gap-3">
          {inputs.map(({ value, id, name, placeholder }) => (
            <InputContainer key={id}>
              <Label htmlFor={id}>{value}</Label>
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
          <div className="col-span-2 row-start-4">
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
        <Button>Create</Button>
      </form>
    </FormProvider>
  );
}
