import React, { createContext, useContext, useState } from "react";
import iCity from "../interfaces/iCity";
import { iPost } from "../interfaces/iPost";
import { iUser } from "../interfaces/iUser";

type DataControlContextProps = {
  refreshCityData: boolean;
  setRefreshCityData: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPostData: boolean;
  setRefreshPostData: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUserData: boolean;
  setRefreshUserData: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCity: iCity | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<iCity | null>>;
  selectedPost: iPost | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<iPost | null>>;
  selectedUser: iUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<iUser | null>>;
};

const DataControlContext = createContext<DataControlContextProps>({
  refreshCityData: false,
  setRefreshCityData: () => {},
  refreshPostData: false,
  setRefreshPostData: () => {},
  refreshUserData: false,
  setRefreshUserData: () => {},
  selectedCity: null,
  setSelectedCity: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
});

type ChildrenProps = {
  children: React.ReactNode;
};

export const DataControlProvider = ({ children }: ChildrenProps) => {
  const [refreshCityData, setRefreshCityData] = useState<boolean>(false);
  const [refreshPostData, setRefreshPostData] = useState<boolean>(false);
  const [refreshUserData, setRefreshUserData] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<iCity | null>(null);
  const [selectedPost, setSelectedPost] = useState<iPost | null>(null);
  const [selectedUser, setSelectedUser] = useState<iUser | null>(null);

  return (
    <DataControlContext.Provider
      value={{
        refreshCityData,
        setRefreshCityData,
        refreshPostData,
        setRefreshPostData,
        refreshUserData,
        setRefreshUserData,
        selectedCity,
        setSelectedCity,
        selectedPost,
        setSelectedPost,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </DataControlContext.Provider>
  );
};

export const useDataControlContext = () => useContext(DataControlContext);
