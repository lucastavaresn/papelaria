import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Props } from '../../utils/ChildProps';
import { Snackbar } from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { removeSale } from '../../store/features/saleSlice';

interface ConfirmationModalProps {
  isOpen: boolean;
  item: number;
}

export default function DialogAlert({ isOpen, item }: ConfirmationModalProps) {
  const [open, setOpen] = React.useState(isOpen);
  const [openAlert, setOpenAlert] = React.useState(false);
  const dispatch = useAppDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setOpen(false);
    setOpenAlert(true)
    dispatch(removeSale(item))

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
        message="VENDA REMOVIDA COM SUCESSO"
        key={"topright"}
        />
      </>
    </div>
  );
}

function useEffec(arg0: () => void) {
  throw new Error('Function not implemented.');
}
