import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Paper, AppBar, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function DataTable({
  dataTable,
  dataTableColumns,
  getSelectedValue,
}) {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [select, setSelection] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const giveSelectedValue = (newSelection) => {
    getSelectedValue(newSelection.selectionModel);
  };

  const giveSelectedValueToParent = () => {
    getSelectedValue(select);
  };

  return (
    <Paper className={classes.paper}>
      <Title>Users Account</Title>
      <TabContext value={value}>
        <AppBar elevation={2} position="static">
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
                // pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                components={{
                  Toolbar: CustomToolbar,
                }}
                onSelectionModelChange={giveSelectedValue}
              />
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </Paper>
  );
}
