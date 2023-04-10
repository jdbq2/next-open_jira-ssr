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
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "texto demo 3",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, INITIAL_ENTRIES_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description: description,
      status: "pending",
      createdAt: Date.now(),
    };

    dispatch({ type: "[Entry] - Add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] - Update-Entry", payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
