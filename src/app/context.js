import { createContext } from "react";

export const initialState = {
  isLoading: false,
  message:"",
  contacts: [] ,
  contact: {}
};

export const appContext = createContext(null);
