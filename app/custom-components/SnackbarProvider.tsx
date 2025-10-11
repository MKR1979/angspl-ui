'use client';
import React, { createContext, useContext, useState } from 'react';
import { AlertColor } from '@mui/material';
import MySnackbar from './MySnackbar';

// Function type to show snackbar
type ShowSnackbarFn = (msg: string, severity?: AlertColor) => void;

// Create context with default no-op function
const SnackbarContext = createContext<ShowSnackbarFn>(() => {});

// Custom hook to use in components
export const useSnackbar = () => useContext(SnackbarContext);

// Main provider component
export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  // This function can be called globally to trigger snackbar
  const showSnackbar: ShowSnackbarFn = (msg, sev = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <MySnackbar
        open={open}
        message={message}
        severity={severity}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      />
    </SnackbarContext.Provider>
  );
};
