import React from "react";
import { Paper, Grid, TextField, Button, IconButton } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { AdminMenu } from "../../../database/AdminMenu";
import DataTable from "../../../components/DataTable";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: 20,
  },
  gridInputHolder: {
    display: "flex",
    justifyContent: "center",
  },
  inputHolder: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    minWidth: 150,
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

export default function Accounts() {
  const classes = useStyles();
  return (
    <div>
      <Breadcrumbs />
      <Paper elevation={3} className={classes.grid}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} className={classes.gridInputHolder}>
            <div className={classes.inputHolder}>
              <Autocomplete
                className={classes.input}
                id="free-solo"
                freeSolo
                options={allUsers.map((option) => option.firstName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                className={classes.button}
              >
                SEARCH
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={5} className={classes.gridButtonHolder}>
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
                <DeleteIcon fontSize="large" />
              </IconButton>
              <IconButton aria-label="refresh" className={classes.icon}>
                <RefreshIcon fontSize="large" />
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
