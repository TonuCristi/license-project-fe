import { z } from "zod";
import { searchBarSchema } from "../schemas/searchBar.schema";

export type SearchBar = z.infer<typeof searchBarSchema>;
