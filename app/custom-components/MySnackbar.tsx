'use client';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

export interface MySnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  onClose: () => void;
}

const MySnackbar: React.FC<MySnackbarProps> = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 1200,
  onClose
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={(_, reason) => {
        if (reason === 'clickaway') return;
        onClose();
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          ...(severity === 'success' && {
            backgroundColor: '#DFF0D8', // light green
            color: '#3c763d',           // dark green text
            '& .MuiAlert-icon': {
              color: '#3c763d'         // icon also dark green
            }
          })
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MySnackbar;
