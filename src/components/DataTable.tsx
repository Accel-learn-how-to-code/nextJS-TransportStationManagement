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

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 100 },
  { field: "lastName", headerName: "Last name", width: 100 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
];

const allUsers = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, gender: "male" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    gender: "female",
  },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, gender: "male" },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, gender: "female" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 15,
    gender: "male",
  },
  { id: 6, lastName: "Melisandre", firstName: "Na", age: 150, gender: "male" },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    gender: "female",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    gender: "female",
  },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, gender: "female" },
];
const maleUsers = allUsers.filter((x) => x.gender === "male");
const femaleUsers = allUsers.filter((x) => x.gender === "female");

const dataGrid = [
  {
    value: "1",
    data: allUsers,
  },
  {
    value: "2",
    data: maleUsers,
  },
  {
    value: "3",
    data: femaleUsers,
  },
];

export default function BasicTable() {
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
            <Tab className={classes.tab} label="All" value="1" />
            <Tab className={classes.tab} label="Male" value="2" />
            <Tab className={classes.tab} label="Female" value="3" />
          </TabList>
        </AppBar>

        {dataGrid.map((element, index) => (
          <TabPanel key={index} className={classes.content} value={element.value}>
            <div className={classes.dataGrid}>
              <DataGrid
                rows={element.data}
                columns={columns}
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
