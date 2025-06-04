import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  ContactResponse,
  CreateContact,
  EditContact,
} from "../types/contact.type";

const URL = "/api/contacts";

export const ContactsApi = {
  getContacts(search: string, offset: number, perPage: number) {
    return api
      .get(
        `${URL}/retrieve-contacts?search=${encodeURIComponent(search)}&offset=${offset}&perPage=${perPage}`,
      )
      .then(
        ({ data }: AxiosResponse<{ contacts: ContactResponse[] }>) =>
          data.contacts,
      );
  },
  createContact(contact: CreateContact) {
    return api
      .post(`${URL}/create-contact`, contact)
      .then(
        ({
          data,
        }: AxiosResponse<{ newContact: ContactResponse; message: string }>) =>
          data,
      );
  },
  deleteContact(contactId: string) {
    return api
      .delete(`${URL}/delete-contact/${contactId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  editContact(contactId: string, newEditedContact: EditContact) {
    return api.put(`${URL}/edit-contact/${contactId}`, newEditedContact).then(
      ({
        data,
      }: AxiosResponse<{
        editedContact: ContactResponse;
        message: string;
      }>) => data,
    );
  },
};
