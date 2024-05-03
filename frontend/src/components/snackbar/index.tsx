import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addNotification,
  clearNotification,
} from "../../store/slices/userNotificationSlice";

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  let notifications = useAppSelector(
    (state) => state.userNotificationSlice.userNotifications
  );

  useEffect(() => {
    if (notifications.message) {
      setOpen(true);
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    } else {
      setOpen(false);
    }
  }, [notifications]);

  const handleClick = () => {
    dispatch(addNotification({ message: "test" }));
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notifications.message}
        action={action}
      />
    </div>
  );
}
