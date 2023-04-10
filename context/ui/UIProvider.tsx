import { useReducer, FC, ReactNode } from "react";
import { UIContext, uiReucer } from "./";

interface Props {
  children: ReactNode;
}

interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReucer, UI_INITIAL_STATE);

  const openMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - is Adding Entry", payload: isAdding });
  };

  const setIsDragging = (isDragging: boolean) => {
    dispatch({ type: "UI - is Dragging", payload: isDragging });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openMenu,
        closeMenu,
        setIsAddingEntry,
        setIsDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
