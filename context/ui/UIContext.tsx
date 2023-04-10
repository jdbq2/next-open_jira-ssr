import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
