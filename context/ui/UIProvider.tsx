import { useReducer, FC, ReactNode } from "react";
import { UIContext, uiReucer } from "./";

interface Props {
  children: ReactNode;
}

interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReucer, UI_INITIAL_STATE);

  const openMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openMenu,
        closeMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
