import React, { useReducer, FC, ReactNode, useEffect } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";
import { entriesAPI } from "@/apis";

interface Props {
  children: ReactNode;
}

interface entriesState {
  entries: Entry[];
}

const INITIAL_ENTRIES_STATE: entriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, INITIAL_ENTRIES_STATE);

  const refreshEntries = async () => {
    /*
    const resp = await fetch("/api/entries");
    if (resp.status === 200) {
      const data = await resp.json();
      refreshData(data);
    }
    */
    const { data } = await entriesAPI.get("/entries");
    refreshData(data);
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesAPI.post("/entries", { description });
    dispatch({ type: "[Entry] - Add-Entry", payload: data });
  };

  const updateEntry = async (entry: Entry) => {
    try {
      const { data } = await entriesAPI.put(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });
      dispatch({ type: "[Entry] - Update-Entry", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = (entries: Entry[]) => {
    dispatch({ type: "[Entry] - Refresh Data", payload: entries });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
