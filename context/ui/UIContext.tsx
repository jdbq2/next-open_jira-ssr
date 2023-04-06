import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
