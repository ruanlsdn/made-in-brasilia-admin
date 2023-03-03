import { AxiosError } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iLoginDto } from "../interfaces/iLoginDto";
import { iUser } from "../interfaces/iUser";
import { findUniqueUserRequest, loginRequest } from "../services/api";

type AuthControlContextProps = {
  currentUser: iUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<iUser | null>>;
  signIn: (dto: iLoginDto) => Promise<boolean>;
  signOut: () => void;
};

const AuthControlContext = createContext<AuthControlContextProps>(null!);

type ChildrenProps = {
  children: React.ReactNode;
};

export const AuthControlProvider = ({ children }: ChildrenProps) => {
  const [currentUser, setCurrentUser] = useState<iUser | null>(null);
  const navigate = useNavigate();

  const validateUser = async () => {
    const userId = localStorage.getItem("user");
    if (userId) {
      try {
        const response = await findUniqueUserRequest(userId);
        if (response.status == 200) {
          setCurrentUser(response.data);
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signIn = async (dto: iLoginDto) => {
    try {
      const response = await loginRequest(dto);
      if (response.status == 201) {
        setCurrentUser(response.data);
        localStorage.setItem("user", response.data.id);
        return true;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    }
    return false;
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <AuthControlContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthControlContext.Provider>
  );
};

export const useAuthControlContext = () => useContext(AuthControlContext);
