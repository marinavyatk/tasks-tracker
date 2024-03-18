import React, { useEffect } from "react";
import TodolistsList from "features/todolistsList/ui/todolistsList";
import LoginForm from "features/loginForm/ui/loginForm";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "app/store";
import { authThunks } from "features/loginForm/model/authReducer";
import SnackBar from "common/components/snackBar";
import Loader from "common/components/loader/loader";
import { useSelector } from "react-redux";
import { selectAppStatus, selectIsInitialized } from "common/selectors";
import { LinearProgress } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const appStatus = useSelector(selectAppStatus);
  useEffect(() => {
    dispatch(authThunks.me());
  }, []);
  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <div className="app">
      {appStatus === "loading" && <LinearProgress sx={{ position: "fixed", left: 0, right: 0, zIndex: 1 }} />}
      <HashRouter>
        <Routes>
          <Route
            path={"/login"}
            element={
              <div className={"loginPage"}>
                <LoginForm />
              </div>
            }
          />
          <Route path={"/"} element={<TodolistsList />} />
        </Routes>
      </HashRouter>
      <SnackBar />
    </div>
  );
}

export default App;
