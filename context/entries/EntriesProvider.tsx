import React, { useReducer, FC, ReactNode } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";

interface Props {
  children: ReactNode;
}

interface entriesState {
  entries: Entry[];
}

const INITIAL_ENTRIES_STATE: entriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "texto demo 1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "texto demo 2",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "texto demo 3",
      status: "pending",
      createdAt: Date.now(),
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, INITIAL_ENTRIES_STATE);
  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
