import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function MainListItemsProps({ items }) {
  const classes = useStyles();
  return (
    <div>
      {items.map((x, index) => (
        <Link key={index} href={x.path}>
          <ListItem button>
            <ListItemIcon>{x.icon}</ListItemIcon>
            <ListItemText primary={x.name} />
          </ListItem>
        </Link>
      ))}
    </div>
  );
}
