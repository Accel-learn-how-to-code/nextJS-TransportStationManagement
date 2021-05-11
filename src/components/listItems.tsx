import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function mainListItems({items}) {
  return (
    <div>
      {items.map((x, index) => (
        <ListItem key={index} button>
          <ListItemIcon>{x.icon}</ListItemIcon>
          <ListItemText primary={x.name} />
        </ListItem>
      ))}
    </div>
  );
}
