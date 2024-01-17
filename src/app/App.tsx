import React, { useEffect } from "react";

import "./App.css";
import TodolistsList from "features/todolistsList/ui/todolistsList";
import LoginForm from "features/loginForm/ui/loginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRootStateType, useAppDispatch } from "app/store";
import { authThunks } from "features/loginForm/model/authReducer";
import SnackBar from "common/components/snackBar";
import Loader from "common/components/loader/loader";
import { useSelector } from "react-redux";
import { selectAppStatus } from "common/selectors";
import { LinearProgress } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();

  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized);
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
      <SnackBar />
      <BrowserRouter>
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
      </BrowserRouter>

      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "fixed",*/}
      {/*    top: "0",*/}
      {/*    right: "0",*/}
      {/*    width: "650px",*/}
      {/*    height: "650px",*/}
      {/*    marginRight: "-300px",*/}
      {/*    marginTop: "-300px",*/}
      {/*    // backgroundColor: "#1ddecb",*/}
      {/*    backgroundColor: "#1b5e60",*/}
      {/*    // backgroundColor: "#183b3c",*/}
      {/*    filter: "blur(180px)",*/}
      {/*    borderRadius: "300px",*/}
      {/*    zIndex: "-1",*/}
      {/*  }}*/}
      {/*/>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      position: "absolute",*/}
      {/*      bottom: "15%",*/}
      {/*      left: "0",*/}
      {/*      width: "350px",*/}
      {/*      height: "350px",*/}
      {/*      marginLeft: "-200px",*/}
      {/*      // backgroundColor: "#1ddecb",*/}
      {/*      backgroundColor: "#1b5e60",*/}

      {/*      // backgroundColor: "#183b3c",*/}
      {/*      filter: "blur(100px)",*/}
      {/*      borderRadius: "300px",*/}
      {/*      zIndex: "-1",*/}
      {/*    }}*/}
      {/*  />*/}
    </div>
  );
}

export default App;
