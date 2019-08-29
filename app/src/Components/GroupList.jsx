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

import AddGroupPopover from "./AddUpdateGroupPopover";
import { getUrl } from "../utils/api.utils";

const useStyles = makeStyles(() => ({
  root: {
    padding: "64px"
  },
  paper: {
    overflowX: "auto"
  },
  tableRow: {
    cursor: "pointer"
  },
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
  const [selectedGroup, setSelectedGroup] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const url = getUrl();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${url}/groups`);
      setGroups(res.data);
    };

    fetchData();
  }, [url]);

  const deleteGroup = (e, id) => {
    e.stopPropagation();
    axios.delete(`${url}/group/${id}`).then(() => (window.location = "/"));
  };

  const selectGroup = (e, group) => {
    setSelectedGroup(group);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setSelectedGroup({});
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table data-testid="group-table">
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
              <TableRow
                hover
                className={classes.tableRow}
                key={`${group.name}-${group.id}`}
                onClick={e => selectGroup(e, group)}
              >
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
                    onClick={e => deleteGroup(e, group.id)}
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
          handleClose={() => handleClose()}
          selectedGroup={selectedGroup}
        />
      </Paper>
    </div>
  );
};

export default GroupList;
