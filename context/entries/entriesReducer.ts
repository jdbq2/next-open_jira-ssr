import { Entry } from "@/interfaces";

interface entriesState {
  entries: Entry[];
}

type entriesActionType =
  | { type: "[Entry] - Add-Entry"; payload: Entry }
  | { type: "[Entry] - Update-Entry"; payload: Entry }
  | { type: "[Entry] - Refresh Data"; payload: Entry[] };

export const entriesReducer = (
  state: entriesState,
  action: entriesActionType
): entriesState => {
  switch (action.type) {
    case "[Entry] - Add-Entry":
      return { ...state, entries: [...state.entries, action.payload] };
    case "[Entry] - Update-Entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "[Entry] - Refresh Data":
      return { ...state, entries: [...action.payload] };
    default:
      return state;
  }
};
