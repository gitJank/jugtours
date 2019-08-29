import React from "react";
import PropTypes from "prop-types";
import { TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/styles";

import { capitalize } from "../utils/string.utils";

const useStyles = makeStyles(() => ({
  textbox: {
    width: "288px"
  }
}));

const TextBox = ({ name, value, handleChange }) => {
  const classes = useStyles();

  return (
    <TextValidator
      id={name}
      label={capitalize(name)}
      name={name}
      className={classes.textbox}
      value={value}
      margin="normal"
      onChange={e => handleChange(e)}
      validators={["required"]}
      errorMessages={[""]}
    />
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

TextBox.defaultProps = {
  value: ""
};

export default TextBox;
