import React, { useState } from "react";
import { Paper, Grid, TextField, Button, IconButton } from "@material-ui/core";
import { Autocomplete, Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { AdminMenu } from "../../../database/AdminMenu";
import DataTable from "../../../components/DataTable";
import Breadcrumbs from "../../../components/Breadcrumbs";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";

import Title from "../../../components/Title";
import Modal from "../../../components/Modal";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: 20,
    paddingTop: 15,
    paddingLeft: 10,
  },
  gridInputHolder: {
    display: "flex",
    justifyContent: "center",
  },
  inputHolder: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  input: {
    flexGrow: 1,
    marginRight: 10,
  },
  gridButtonHolder: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonHolder: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    padding: 10,
    paddingTop: 5,
  },
  button: {
    maxHeight: 40,
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
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

const dataUsers = [
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

export default function Accounts() {
  const classes = useStyles();
  const [allUsers, setAllUsers] = useState(dataUsers);
  const [inputValue, setInputvalue] = useState("");
  const [alertModel, setAlertModel] = useState(false);

  const maleUsers = allUsers.filter((x) => x.gender === "male");
  const femaleUsers = allUsers.filter((x) => x.gender === "female");
  const data = [
    {
      value: "1",
      label: "All",
      data: allUsers,
    },
    {
      value: "2",
      label: "Male",
      data: maleUsers,
    },
    {
      value: "3",
      label: "Female",
      data: femaleUsers,
    },
  ];

  const handleChangeAutocomplete = (event: any, newValue: any) => {
    console.log("2" + newValue);
    setInputvalue(newValue);
  };
  const handleChangeTextField = (event) => {
    console.log("3" + event.target.value);
    setInputvalue(event.target.value);
  };
  const searchUsersName = () => {
    let searchedUsers = inputValue
      ? allUsers.filter((x) =>
          x.firstName.toLowerCase().includes(inputValue.toLowerCase())
        )
      : null;
    // console.log("Button Clicked: " + inputValue);
    // console.log("Object: " + JSON.stringify(searchedUsers));
    // console.log("typeof: " + typeof searchedUsers);
    searchedUsers
      ? (setAllUsers(searchedUsers), setAlertModel(false))
      : (setAllUsers(dataUsers), setAlertModel(true));
  };
  console.log("rendeerr");
  return (
    <div>
      <Breadcrumbs />
      {alertModel ? (
        <div className={classes.alert}>
          <Alert severity="error">
            This is an error alert — <strong>check it out!</strong>
          </Alert>
        </div>
      ) : null}
      <Paper elevation={2} className={classes.grid}>
        <Title>Quản lý tài khoản người dùng</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={classes.gridInputHolder}>
            <div className={classes.inputHolder}>
              {/* <Autocomplete
                className={classes.input}
                id="free-solo"
                options={allUsers.map((option) => option.firstName)}
                onChange={handleChangeAutocomplete}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm"
                    variant="outlined"
                    size="small"
                    onChange={handleChangeTextField}
                  />
                )}
              /> */}
              <TextField
                className={classes.input}
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                value={inputValue}
                onChange={handleChangeTextField}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                className={classes.button}
                onClick={searchUsersName}
              >
                SEARCH
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={7} className={classes.gridButtonHolder}>
            <div className={classes.buttonHolder}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
              >
                Add New
              </Button>
              <IconButton aria-label="delete" className={classes.icon}>
                <GetAppIcon fontSize="large" />
              </IconButton>
              <IconButton aria-label="refresh" className={classes.icon}>
                <RefreshIcon fontSize="large" />
              </IconButton>
              <IconButton aria-label="refresh" className={classes.icon}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <DataTable dataTable={data} dataTableColumns={columns} />
    </div>
  );
}
Accounts.AdminMenu = AdminMenu;
