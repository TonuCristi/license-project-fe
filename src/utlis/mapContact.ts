import { ContactResponse } from "../types/contact.type";

export function mapContact(contact: ContactResponse) {
  return { id: contact._id, ...contact };
}
