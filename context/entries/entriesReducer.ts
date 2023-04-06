import { Entry } from "@/interfaces";

interface entriesState {
  entries: Entry[];
}

type entriesActionType = { type: "Entries - Add" };

export const entriesReducer = (
  state: entriesState,
  action: entriesActionType
): entriesState => {
  switch (action.type) {
    case "Entries - Add":
      return state;

    default:
      return state;
  }
};
