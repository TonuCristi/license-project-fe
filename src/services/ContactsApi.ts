import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  ContactResponse,
  CreateContact,
  EditContact,
} from "../types/contact.type";

const URL = "/api/contacts";

export const ContactsApi = {
  getContacts(search: string) {
    return api
      .get(`${URL}/retrieve-contacts?search=${search}`)
      .then(
        ({ data }: AxiosResponse<{ contacts: ContactResponse[] }>) =>
          data.contacts,
      );
  },
  createContact(contact: CreateContact) {
    return api
      .post(`${URL}/create-contact`, contact)
      .then(
        ({ data }: AxiosResponse<{ contact: ContactResponse }>) => data.contact,
      );
  },
  deleteContact(contactId: string) {
    return api
      .delete(`${URL}/delete-contact/${contactId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  editContact(contactId: string, editedContactChanges: EditContact) {
    return api
      .put(`${URL}/edit-contact/${contactId}`, editedContactChanges)
      .then(
        ({ data }: AxiosResponse<{ contact: ContactResponse }>) => data.contact,
      );
  },
};
