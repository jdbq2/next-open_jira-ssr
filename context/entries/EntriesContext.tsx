import { Entry } from "@/interfaces";
import { createContext } from "react";

interface contextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as contextProps);
