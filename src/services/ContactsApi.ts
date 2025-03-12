import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { ContactResponse } from "../types/contact.type";

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
};
