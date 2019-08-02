import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PhotoUpload from "../PhotoUpload";
import { uploadPhoto } from "../../s3";

class FormDialog extends React.Component {
  state = {
    open: false,
    price: "",
    name: "",
    inventory: "",
    desc: "",
    submit: "",
    image: "",
    // isUploading: false,
    // progress: 0,
    imageURL: "",
    resName: "",
    resDesc: "",
    resPrice: "",
    resInventory: "",
    resItems: ""
  };

  handleClickOpen = _ => {
    this.setState({ open: true });
  };
  handleClose = _ => {
    this.setState({ open: false });
  };

  // FUNCTION TO HANDLE NAME INPUT
  handleName = event => {
    this.setState({ name: event.target.value });
  };

  // FUNCTION TO HANDLE PRICE INPUT
  handlePrice = event => {
    this.setState({ price: event.target.value });
  };

  // FUNCTION TO HANDLE INVENTORY INPUT
  handleInventory = event => {
    this.setState({ inventory: event.target.value });
  };

  // FUNCTION TO HANDLE DESCRIPTION INPUT
  handleDescription = event => {
    this.setState({ desc: event.target.value });
  };

  // FUNCTION TO HANDLE PHOTO UPLOAD
  addPhoto = files => {
    // console.log("hello", uploadPhoto(files));
    console.log("hello", files[0]);
  };

  // FUNCTION TO HANDLE SUBMIT / AXIOS POST DATA TO MONGODB
  handleSubmit = event => {
    event.preventDefault();
    const { name, desc, price, inventory } = this.state;
    console.log(
      `name is ${this.state.name} and price is ${
        this.state.price
      } and desc is ${this.state.desc} and inventory is ${this.state.inventory}`
    );
    axios
      .post("/item", { name, desc, price, inventory })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({
      name: "",
      desc: "",
      price: "",
      inventory: ""
    });
  };

  // handleItems = _ => {
  //   console.log("Running search");
  //   axios.get("/item").then(({ data }) => {
  //     this.setState({
  //       name: data.resName,
  //       desc: data.resDesc,
  //       price: data.resPrice,
  //       inventory: data.resInventory
  //       // resItems: data
  //     });
  //   });
  // };
  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          +
          <br />
          Add Item
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <PhotoUpload handleSave={this.addPhoto} />
          {/* <input type="file" onChange={this.addPhoto} /> */}
          <DialogContent>
            Open Camera
            <TextField
              id="outlined-name"
              label="Product Name"
              value={this.state.name}
              onChange={this.handleName}
              margin="normal"
              variant="outlined"
              fullWidth="true"
            />
            {/* <Box
              borderColor="grey.400"
              m={1}
              border={1}
              style={{ height: "10rem" }}
              fullWidth="true"
            /> */}
            <TextField
              id="outlined-name"
              label="Description"
              value={this.state.desc}
              onChange={this.handleDescription}
              margin="normal"
              variant="outlined"
              fullWidth="true"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-name"
                  label="$0.00"
                  value={this.state.price}
                  onChange={this.handlePrice}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-name"
                  label="QTY"
                  value={this.state.inventory}
                  onChange={this.handleInventory}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  // onClick={handleClose}
                  onClick={this.handleSubmit}
                  fullWidth="true"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
              {/* <Grid item xs={6}>
                <Button
                  // onClick={handleClose}
                  onClick={this.handleItems}
                  fullWidth="true"
                  variant="contained"
                  color="primary"
                >
                  Add Item
                </Button>
              </Grid> */}

              <Grid item xs={6}>
                <Button
                  onClick={this.handleClose}
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
}

export default FormDialog;
