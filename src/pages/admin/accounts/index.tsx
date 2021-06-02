import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

import {
  Paper,
  Grid,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";

import { AdminMenu } from "../../../database/AdminMenu";
import DataTable from "../../../components/DataTable";
import Breadcrumbs from "../../../components/Breadcrumbs";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import GetAppIcon from "@material-ui/icons/GetApp";

import SearchInput from "../../../components/searchInput";
import Title from "../../../components/Title";
import { getAllUsers, deleteUsers } from "../../../database/testDB";
import AlertDialog from "../../../components/AlertDialog";

import axios from "axios";
import { ChatSharp } from "@material-ui/icons";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { secret } from "../../../../api/secret";
import { verify } from "jsonwebtoken";
import Link from "next/link";

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
    marginTop: 5,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Accounts({ dataUsers }) {
  const classes = useStyles();
  const router = useRouter();
  const [allUsers, setAllUsers] = useState(dataUsers);
  const [selectedUser, setSelectedUser] = useState([]);
  const [refesh, setRefresh] = useState(false);
  const [alertModel, setAlertModel] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  //tạo data đưa vào data grid
  const Admin = allUsers.filter((x) => x.AccountType === "AD");
  const ChuXe = allUsers.filter((x) => x.AccountType === "CX");
  const NhaXe = allUsers.filter((x) => x.AccountType === "NX");
  const dataTable = [
    {
      value: "1",
      label: "All",
      data: allUsers,
    },
    {
      value: "2",
      label: "Admin",
      data: Admin,
    },
    {
      value: "3",
      label: "Chủ Xe",
      data: ChuXe,
    },
    {
      value: "4",
      label: "Nhà Xe",
      data: NhaXe,
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "UsersName", headerName: "Name", width: 200 },
    { field: "AccountType", headerName: "Type", width: 90 },
    { field: "TelNo", headerName: "Phone", width: 130 },
    { field: "Email", headerName: "Email", width: 250 },
    { field: "Gender", headerName: "Gender", width: 100 },
    //{ field: "DoB", headerName: "Ngày sinh", type: "datetime", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 130,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Button variant="outlined" color="primary" size="small">
            <Link href={`/admin/accounts/details?id=${params.row.id}`}>
              <a style={{ textDecoration: "none" }}>UPDATE</a>
            </Link>
          </Button>
          <IconButton aria-label="delete" onClick={setDeleteAlertStatus}>
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
  ];

  useEffect(() => {
    refreshData();
  }, [dataUsers]);

  const refreshData = () => {
    setRefresh(!refesh);
    setAllUsers(dataUsers);
    setAlertModel(false);
    console.log("refreshed");
  };

  const searchUsersName = (inputValue) => {
    let searchedUsers = inputValue
      ? allUsers.filter((x) =>
          x.UsersName.toLowerCase().includes(inputValue.toLowerCase())
        )
      : null;
    searchedUsers && searchedUsers.length > 0
      ? (setAllUsers(searchedUsers), setAlertModel(false))
      : (setAllUsers(dataUsers), setAlertModel(true));
  };

  const getSelectedValue = (selectedValue) => {
    setSelectedUser(selectedValue);
  };

  const refreshDataServer = () => {
    router.replace(router.asPath);
  };

  const setDeleteAlertStatus = () => {
    setDeleteAlert(!deleteAlert);
  };

  const deleteUser = async () => {
    const res = await axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      url: "/api/admin/accounts/delete",
      data: {
        selectedUser,
      },
    });

    // Check that our status code is in the 200s,
    // meaning the request was successful.
    if (res.status < 300) {
      refreshDataServer();
    }
  };

  return (
    <div>
      <Breadcrumbs />
      {alertModel ? (
        <div className={classes.alert}>
          <Alert severity="error">
            This is an error alert — <strong>Không tìm thấy người dùng!</strong>
          </Alert>
        </div>
      ) : null}
      <Paper elevation={2} className={classes.grid}>
        <Title>Quản lý tài khoản người dùng</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={classes.gridInputHolder}>
            <SearchInput searchUsersName={searchUsersName} refesh={refesh} />
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
              <IconButton
                aria-label="refresh"
                className={classes.icon}
                onClick={refreshData}
              >
                <RefreshIcon fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="delete"
                className={classes.icon}
                onClick={setDeleteAlertStatus}
                //onClick={deleteUser}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <DataTable
        dataTable={dataTable}
        dataTableColumns={columns}
        getSelectedValue={getSelectedValue}
      />

      <AlertDialog
        dialogStatus={deleteAlert}
        title={
          "Bạn có muốn xóa " + `${selectedUser.length}` + " người dùng không?"
        }
        excutedFunction={deleteUser}
      />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  //lấy cookie nhưng ở dạng string auth=abc123
  const cookie = ctx.req?.headers.cookie;
  //lấy cookie nhưng ở dạng object {auth: abc123}
  const { cookies } = ctx.req;

  var decoded = verify(cookies.auth, secret);

  if (decoded.accountType !== "AD" && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "http://localhost:3000/",
    });
    ctx.res?.end();
    return;
  }

  const dataUsers = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin/accounts",
    withCredentials: true,
    headers: {
      Cookie: cookie || null,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response.status === 401 && !ctx.req) {
        Router.replace("/");
        return;
      }

      //server-side
      if (err.response.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
          Location: "/",
        });
        ctx.res?.end();
        return;
      }
    });

  return { props: { dataUsers } };
};

Accounts.AdminMenu = AdminMenu;
