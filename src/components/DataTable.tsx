import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Paper, AppBar, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { DataGrid } from "@material-ui/data-grid";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: 35,
  },
  tabList: {
    background: "#fff",
  },
  tab: {
    color: "#000",
  },
  content: {
    padding: 0,
  },
  dataGrid: {
    height: 400,
    width: "100%",
  },
}));

export default function DataTable({ dataTable, dataTableColumns }) {
  const classes = useStyles();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.paper}>
      <Title>Users Account</Title>
      <TabContext value={value}>
        <AppBar elevation={1} position="static">
          <TabList
            className={classes.tabList}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {dataTable.map((element, index) => (
              <Tab
                key={index}
                className={classes.tab}
                label={element.label}
                value={element.value}
              />
            ))}
          </TabList>
        </AppBar>

        {dataTable.map((element, index) => (
          <TabPanel
            key={index}
            className={classes.content}
            value={element.value}
          >
            <div className={classes.dataGrid}>
              <DataGrid
                rows={element.data}
                columns={dataTableColumns}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </Paper>
  );
}
