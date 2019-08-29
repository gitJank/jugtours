import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Popover, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm } from "react-material-ui-form-validator";

import TextBox from "./TextBox";
import { getUrl } from "../utils/api.utils";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px"
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
    const url = getUrl();

    const res = group.id
      ? await axios.put(`${url}/group/${group.id}`, {
          ...group
        })
      : await axios.post(`${url}/group`, { ...group });

    res.data ? (window.location = "/") : console.log("SUBMIT ERROR: ", res);
  };

  const { name, address, city, state, country } = group;

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
        <TextBox name="name" value={name} handleChange={handleChange} />
        <TextBox name="address" value={address} handleChange={handleChange} />
        <TextBox name="city" value={city} handleChange={handleChange} />
        <TextBox name="state" value={state} handleChange={handleChange} />
        <TextBox name="country" value={country} handleChange={handleChange} />
        <div className={classes.buttonArea}>
          <Button
            id="cancel-btn"
            className={classes.button}
            onClick={() => handleClose()}
            color="primary"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            id="save-btn"
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
