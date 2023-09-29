import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Props } from '../../utils/ChildProps';
import { Snackbar } from '@mui/material';

export default function DialogAlert({title, ... props}: Props) {
  const [open, setOpen] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setOpen(false);
    setOpenAlert(true)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remover"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja remover esta venda?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>Não</Button>
          <Button variant="contained"  color='secondary' onClick={handleCloseConfirm} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
      <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: "right" }}
        open={openAlert}
        message="I love snacks"
        key={"topright"}
        />
      </>
    </div>
  );
}