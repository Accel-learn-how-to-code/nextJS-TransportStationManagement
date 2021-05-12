import React from "react";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
import {
  makeStyles,
  Theme,
  createStyles,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    achorTag: {
      textDecoration: "none",
    },
  })
);

export default function MainListItemsProps({ items }) {
  const classes = useStyles();
  return (
    <div>
      {items.map((x, index) => (
        <Link key={index} href={x.path}>
          <a className={classes.achorTag}>
            <ListItem button>
              <ListItemIcon>{x.icon}</ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItem>
          </a>
        </Link>
      ))}
    </div>
  );
}
