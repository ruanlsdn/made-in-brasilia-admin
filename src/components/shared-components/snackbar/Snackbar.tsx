import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";

const SharedSnackbar = () => {
  const {
    isSnackbarOpen,
    setIsSnackbarOpen,
    snackbarSeverity,
    snackbarMessage,
  } = useApplicationControlContext();
  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SharedSnackbar;
