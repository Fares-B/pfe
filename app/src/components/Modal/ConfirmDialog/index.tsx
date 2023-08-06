import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const AlertDialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  description,
  onConfirm,
  confirmLabel,
  cancelLabel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {cancelLabel || "ANNULER"}
        </Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmLabel || "CONFIRMER"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
