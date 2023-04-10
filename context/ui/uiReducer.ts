interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - is Adding Entry"; payload: boolean }
  | { type: "UI - is Dragging"; payload: boolean };

export const uiReucer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return {
        ...state,
        sidemenuOpen: true,
      };

    case "UI - Close Sidebar":
      return {
        ...state,
        sidemenuOpen: false,
      };

    case "UI - is Adding Entry":
      return {
        ...state,
        isAddingEntry: action.payload,
      };

    case "UI - is Dragging":
      return {
        ...state,
        isDragging: action.payload,
      };

    default:
      return state;
  }
};
