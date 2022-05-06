import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import grey from "@mui/material/colors/grey";

type ButtonColor =
  | "inherit"
  | "secondary"
  | "primary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | undefined;

export interface IConfirmDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  show: boolean;
  title?: string;
  subTitle?: string;
  isLoading?: boolean;
  cancelText?: string;
  confirmText?: string;
  cancelColor?: ButtonColor;
  confirmColor?: ButtonColor;
}

function ConfirmDialog(props: IConfirmDialogProps) {
  const {
    show,
    title = "Please confirm",
    subTitle,
    onCancel,
    onConfirm,
    isLoading = false,
    cancelText = "Cancel",
    confirmText = "Confirm",
    cancelColor = "secondary",
    confirmColor = "error",
  } = props;
  return (
    <Dialog
      onClose={onCancel}
      open={show}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle
        sx={{ fontSize: "1.5rem", borderBottom: `1px solid ${grey[200]}` }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color={cancelColor}
          autoFocus
          disabled={isLoading}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color={confirmColor}
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress color="primary" size="16px" /> : null
          }
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
