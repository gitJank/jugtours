import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Delete from "@material-ui/icons/DeleteForever";

import AddGroupPopover from "./AddGroupPopover";

const useStyles = makeStyles(theme => ({
  addButton: {
    width: "100%"
  },
  deleteButton: {
    padding: "6px"
  }
}));

const GroupList = () => {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/api/groups");
    setGroups(res.data);
  };

  const deleteGroup = id => {
    axios
      .delete(`http://localhost:8080/api/group/${id}`)
      .then(() => (window.location = "/"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map(group => (
            <TableRow key={group.name}>
              <TableCell component="th" scope="row">
                {group.name}
              </TableCell>
              <TableCell align="right">{group.address}</TableCell>
              <TableCell align="right">{group.city}</TableCell>
              <TableCell align="right">{group.state}</TableCell>
              <TableCell align="right">{group.country}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  className={classes.deleteButton}
                  onClick={() => deleteGroup(group.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={e => setAnchorEl(e.currentTarget)}
        className={classes.addButton}
      >
        Add New
      </Button>
      <AddGroupPopover
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
      />
    </Paper>
  );
};

export default GroupList;
