import { Entry } from "@/interfaces";
import { createContext } from "react";

interface contextProps {
  entries: Entry[];
}

export const EntriesContext = createContext({} as contextProps);
