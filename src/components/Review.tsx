import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  listContainer: {
    margin: "auto",
    maxWidth: 600,
  },
}));

export default function Review({ user }) {
  const classes = useStyles();
  let values = [];
  Object.keys(user).forEach((key) => {
    if (key !== "vehicles") {
      let obj = {};
      obj[key] = user[key];
      values.push(obj);
    }
  });
  const searchRegExp = /"/g;
  return (
    <>
      <List disablePadding className={classes.listContainer}>
        {values.map((element, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText
              primary={`${JSON.stringify(Object.keys(element)[0]).replace(
                searchRegExp,
                ""
              )}:`}
            />

            <Typography variant="subtitle2">
              {JSON.stringify(Object.values(element)[0]).replace(searchRegExp, "")}
            </Typography>
          </ListItem>
        ))}
        {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Loại tài khoản" />
          <Typography variant="subtitle1" className={classes.total}>
            Chủ xe
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
