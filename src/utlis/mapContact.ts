import { ContactResponse } from "../types/contact.type";

export function mapContact(contact: ContactResponse) {
  const { _id: id, ...rest } = contact;
  return { id, ...rest };
}
