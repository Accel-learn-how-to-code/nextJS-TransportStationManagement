import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  excutedFunction,
  dialogStatus,
  title,
}) {
  const [open, setOpen] = useState(false);
  const [initialRun, setInitialRun] = useState(1);

  useEffect(() => {
    if (initialRun !== 1) {
      setOpen(true);
    }
    setInitialRun(initialRun + 1);
  }, [dialogStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  const excutePropsFunction = () => {
    excutedFunction();
    setOpen(false);
    setInitialRun(initialRun + 1);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={excutePropsFunction} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
