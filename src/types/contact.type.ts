import { z } from "zod";
import { contactFormSchema } from "../schemas/contactForm.schema";

export type CreateContact = z.infer<typeof contactFormSchema>;

export type ContactResponse = {
  _id: string;
  name: string;
  phoneNumber: string;
  description: string;
};

export type Contact = {
  id: string;
  name: string;
  phoneNumber: string;
  description: string;
};
