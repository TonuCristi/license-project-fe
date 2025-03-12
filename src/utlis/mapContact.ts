import { ContactResponse } from "../types/contact.type";

export function mapContact(contact: ContactResponse) {
  const { _id, ...rest } = contact;
  return { id: contact._id, ...rest };
}
