import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateContact from "./components/CreateContact";
import SingleContact from "./components/SingleContact";
import Error404 from "./components/Error404";
import Header from "./components/Header";
import UpdateContact from "./components/UpdateContact";
import { useReducer } from "react";
import { reducer } from "./app/reducer";

import {
  appContext,
  initialState,
} from "./app/context";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <appContext.Provider
        value={[state, dispatch]}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact/create" element={<CreateContact />} />
          <Route path="/contact/:id" element={<SingleContact />} />
          <Route path="/contact/update/:id" element={<UpdateContact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </appContext.Provider>
    </>
  );
};

export const BASE_URL = "http://localhost:4000";

export default App;
