import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addHostingPlanToFirestore } from "../firebase";
import { Link } from "react-router-dom";

export default function FormDialog({
  open,
  setOpen,
  setDomainName,
  planDetails,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const [inptValue, setInptValue] = React.useState("");
  const submitDialog = () => {
    addHostingPlanToFirestore({ "Domain Name": inptValue, ...planDetails });
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Domain Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To get a domain name, please enter a domain name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="domain"
            label="Domain Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setInptValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
            Cancel
          </Button>
          <Link to="/dashboard">
            <Button variant="contained" onClick={submitDialog}>
              Buy Hosting Plan
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
