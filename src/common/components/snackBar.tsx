import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAppError } from "common/selectors";
import { appActions } from "app/appReducer";
import { useAppDispatch } from "app/store";

const SnackBar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const error = useSelector(selectAppError);
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setTimeout(() => {
      dispatch(appActions.setAppError({ error: null }));
    }, 1000);
  };
  if (error === "notShow") return <></>;

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="error"
        sx={{
          width: "100%",
        }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
