import React, { useState } from "react";
import axios from "axios";
import { Popover, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px"
  },
  textbox: {
    width: "288px"
  }
}));

const AddGroup = ({ anchorEl, handleClose }) => {
  const classes = useStyles();
  const [group, setGroup] = useState({});

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = e => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/group", {
        ...group
      })
      .then(res => {
        window.location = "/";
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
    >
      <ValidatorForm className={classes.form} onSubmit={() => handleSubmit()}>
        <TextValidator
          id="name"
          label="Name"
          name="name"
          className={classes.textbox}
          value={group.name || ""}
          margin="normal"
          onChange={e => handleChange(e)}
          validators={["required"]}
          errorMessages={[""]}
        />
        <TextValidator
          id="address"
          label="Address"
          name="address"
          className={classes.textbox}
          value={group.address || ""}
          margin="normal"
          onChange={e => handleChange(e)}
          validators={["required"]}
          errorMessages={[""]}
        />
        <TextValidator
          id="city"
          label="City"
          name="city"
          className={classes.textbox}
          value={group.city || ""}
          margin="normal"
          onChange={e => handleChange(e)}
          validators={["required"]}
          errorMessages={[""]}
        />
        <TextValidator
          id="state"
          label="State"
          name="state"
          className={classes.textbox}
          value={group.state || ""}
          margin="normal"
          onChange={e => handleChange(e)}
          validators={["required"]}
          errorMessages={[""]}
        />
        <TextValidator
          id="country"
          label="Country"
          name="country"
          className={classes.textbox}
          value={group.country || ""}
          margin="normal"
          onChange={e => handleChange(e)}
          validators={["required"]}
          errorMessages={[""]}
        />
        <Button
          id="saveBtn"
          className={classes.button}
          type="submit"
          color="primary"
          variant="text"
        >
          Save
        </Button>
      </ValidatorForm>
    </Popover>
  );
};

export default AddGroup;
