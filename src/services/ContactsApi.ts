import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { ContactResponse } from "../types/contact.type";

const URL = "/api/contacts/retrieve-contacts";

export const ContactsApi = {
  getContacts(offset: number, limit: number, search?: string) {
    return api
      .get(`${URL}?offset=${offset}&limit=${limit}&search=${search}`)
      .then(
        ({ data }: AxiosResponse<{ contacts: ContactResponse[] }>) =>
          data.contacts,
      );
  },
};
