import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTabState] = useState({
    tab: "",
    company: localStorage.getItem("company")
  });

  function handleClickOpen() {
    setOpen(true);
  }

  const handleChange = event => {
    setTabState({ ...tab, tab: event.target.value });
  };

  function handleCloseAdd() {
    axios
      .post("/tab", {
        name: tab.tab,
        company: tab.company
      })
      .then((window.location.href = "/inventory"))
      .catch(e => console.log(e));
    setOpen(false);
  }
  function handleCloseCancel() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        +
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            id="outlined-name"
            label="Tab Name"
            // className={classes.textField}
            // ref={tabText}
            onChange={handleChange}
            margin="normal"
            value={tab.tab}
            variant="outlined"
            fullWidth="true"
          />
        </DialogContent>

        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                id="add"
                onClick={handleCloseAdd}
                fullWidth="true"
                variant="contained"
                color="primary"
              >
                Add Tab
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                id="cancel"
                onClick={handleCloseCancel}
                fullWidth="true"
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
