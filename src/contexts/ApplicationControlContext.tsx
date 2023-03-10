import React, { createContext, useContext, useState } from "react";
import { SlHome } from "react-icons/sl";
import { Links } from "../components/application-components/sidebar/sidebar_data";

type ApplicationControlContextProps = {
  screenSize: number | undefined;
  setScreenSize: React.Dispatch<React.SetStateAction<number | undefined>>;
  searchText: string | null;
  setSearchText: React.Dispatch<React.SetStateAction<string | null>>;
  isSidebarActive: boolean;
  setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  activeRoute: Links;
  setActiveRoute: React.Dispatch<React.SetStateAction<Links>>;
  isSnackbarOpen: boolean;
  setIsSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarMessage: string;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  snackbarSeverity: "success" | "warning" | "error" | undefined;
  setSnackbarSeverity: React.Dispatch<
    React.SetStateAction<"success" | "warning" | "error" | undefined>
  >;
};

const ApplicationControlContext = createContext<ApplicationControlContextProps>(
  null!
);

type ChildrenProps = {
  children: React.ReactNode;
};

export const ApplicationControlProvider = ({ children }: ChildrenProps) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(true);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeRoute, setActiveRoute] = useState<Links>({
    icon: SlHome,
    title: "Bem-vindo",
    description: "Página inicial",
    path: "/home",
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning" | "error" | undefined
  >(undefined);

  return (
    <ApplicationControlContext.Provider
      value={{
        screenSize,
        setScreenSize,
        searchText,
        setSearchText,
        isSidebarActive,
        setIsSidebarActive,
        isModalActive,
        setIsModalActive,
        anchorEl,
        setAnchorEl,
        activeRoute,
        setActiveRoute,
        isSnackbarOpen,
        setIsSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
        snackbarSeverity,
        setSnackbarSeverity,
      }}
    >
      {children}
    </ApplicationControlContext.Provider>
  );
};

export const useApplicationControlContext = () =>
  useContext(ApplicationControlContext);
