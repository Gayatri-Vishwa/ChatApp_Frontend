import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function ConfirmDeleteDialog({ open, handleClose, deleteHandler }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: "#232533",
          color: "#fff",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          width: "22rem",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#fff",
          fontWeight: 700,
        }}
      >
        Confirm Delete
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          padding:"1rem 1.5rem",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color:"rgba(255,255,255,0.7)",
            fontWeight:600,
          }}
        >
          No
        </Button>

        <Button
          color="error"
          onClick={deleteHandler}
          variant="contained"
          sx={{
            borderRadius:"10px",
            fontWeight:600,
          }}
        >
          Yes
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default ConfirmDeleteDialog;