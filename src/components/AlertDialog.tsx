import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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

  const handleClickOpen = () => {
    setOpen(true);
  };

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
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            optio illum tempora reprehenderit recusandae facilis nulla ipsam
            error impedit magni! Numquam temporibus veritatis cum maxime
            reprehenderit unde atque ipsa eos!
          </DialogContentText>
        </DialogContent> */}
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
