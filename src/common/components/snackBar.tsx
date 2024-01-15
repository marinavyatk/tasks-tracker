import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAppError } from "common/selectors";
import { appActions } from "app/appReducer";
import { useAppDispatch } from "app/store";

const SnackBar = () => {
  const error = useSelector(selectAppError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      // Внесите изменения в ваш код обработки ошибки здесь, если необходимо.
      console.log("Handle error:", error);
    }
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(reason);
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppError({ error: null }));
  };
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="error"
        sx={{
          width: "100%",
          // color: "primary.light",
          // backgroundColor: "error.main",
          // "& .MuiAlert-icon": {
          //   "& > svg": {
          //     color: "primary.light",
          //   },
          // },
        }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
