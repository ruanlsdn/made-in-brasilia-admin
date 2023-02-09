import React, { createContext, useContext, useState } from "react";
import { SlHome } from "react-icons/sl";
import { Links, SidebarData } from "../components/sidebar/sidebar_data";

type DataControllContextProps = {
  refreshCityData: boolean;
  setRefreshCityData: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPostData: boolean;
  setRefreshPostData: React.Dispatch<React.SetStateAction<boolean>>;
};

const DataControllContext = createContext<DataControllContextProps>({
  refreshCityData: false,
  setRefreshCityData: () => {},
  refreshPostData: false,
  setRefreshPostData: () => {},
});

type ChildrenProps = {
  children: React.ReactNode;
};

export const DataControllContextProvider = ({ children }: ChildrenProps) => {
  const [refreshCityData, setRefreshCityData] = useState<boolean>(false);
  const [refreshPostData, setRefreshPostData] = useState<boolean>(false);

  return (
    <DataControllContext.Provider
      value={{
        refreshCityData,
        setRefreshCityData,
        refreshPostData,
        setRefreshPostData,
      }}
    >
      {children}
    </DataControllContext.Provider>
  );
};

export const useDataControllContext = () => useContext(DataControllContext);
