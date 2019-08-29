import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  },
  buttonArea: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "8px"
  }
}));

const AddUpdateGroupPopover = ({ anchorEl, handleClose, selectedGroup }) => {
  const classes = useStyles();
  const [group, setGroup] = useState({});
  const open = Boolean(anchorEl);

  useEffect(() => {
    setGroup({ ...selectedGroup });
  }, [selectedGroup]);

  const handleChange = e => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const res = group.id
      ? await axios.put(`http://jugtours.cfapps.io/api/group/${group.id}`, {
          ...group
        })
      : await axios.post("http://jugtours.cfapps.io/api/group", { ...group });

    res.data ? (window.location = "/") : console.log("SUBMIT ERROR: ", res);
  };

  return (
    <Popover
      id={open ? "simple-popover" : undefined}
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
        <div className={classes.buttonArea}>
          <Button
            id="cancelBtn"
            className={classes.button}
            onClick={() => handleClose()}
            color="primary"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            id="saveBtn"
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </div>
      </ValidatorForm>
    </Popover>
  );
};

AddUpdateGroupPopover.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object.isRequired
};

AddUpdateGroupPopover.defaultProps = {
  anchorEl: null
};

export default AddUpdateGroupPopover;
