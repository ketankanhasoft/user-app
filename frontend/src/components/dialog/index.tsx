import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
interface Action {
  label: string;
  onClick: () => void;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: React.ReactNode;
  actions: Action[];
}

const ReusableDialog: React.FC<Props> = ({
  open,
  handleClose,
  title,
  content,
  actions,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {title}

        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
          sx={{ float: "right" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            color={action.color || "primary"}
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ReusableDialog;
