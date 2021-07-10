import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GridCellParams, GridColDef } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { verify } from "jsonwebtoken";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { secret } from "../../../../api/secret";
import AlertDialog from "../../../components/AlertDialog";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DataTable from "../../../components/DataTable";
import SearchInput from "../../../components/searchInput";
import Title from "../../../components/Title";
import { AdminMenu } from "../../../database/AdminMenu";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const breadcumbData = [
    {
      path: "/admin",
      pathName: "Home",
    },
    {
      pathName: "Quản lý tài khoản",
    },
  ];

  //tạo data đưa vào data grid
  const Admin = allUsers.filter((x) => x.AccountType === "AD");
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
      label: "Nhà Xe",
      data: NhaXe,
    },
  ];

  const sortModel = [
    {
      field: "id",
      sort: "desc",
    },
  ];

  const handleMenuClick = (event, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser([id]);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick2 = (event, id: string) => {
    setAnchorEl2(event.currentTarget);
    setSelectedUser([id]);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

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
      headerName: " ",
      sortable: false,
      width: 130,
      renderCell: (params: GridCellParams) => (
        <div>
          {params.row.AccountType === "NX" && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              aria-controls="usersMenu"
              aria-haspopup="true"
              onClick={(event) => {
                handleMenuClick(event, params.row.id);
              }}
            >
              Action
            </Button>
          )}

          {params.row.AccountType === "AD" && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              aria-controls="AdminMenu"
              aria-haspopup="true"
              onClick={(event) => {
                handleMenuClick2(event, params.row.id);
              }}
            >
              Action
            </Button>
          )}

          <Menu
            elevation={1}
            id="usersMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href={`/admin/accounts/details?id=${selectedUser}`}>
                <div style={{ textDecoration: "none", font: "#000000DE" }}>
                  Xem chi tiết
                </div>
              </Link>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <Link href={`/admin/accounts/details/update?id=${selectedUser}`}>
                <div style={{ textDecoration: "none", font: "#000000DE" }}>
                  Sửa thông tin
                </div>
              </Link>
            </MenuItem>

            <MenuItem onClick={setDeleteAlertStatus}>Xóa tài khoản</MenuItem>
            <MenuItem onClick={handleMenuClose}>Close</MenuItem>
          </Menu>

          <Menu
            elevation={1}
            id="AdminMenu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleMenuClose2}
          >
            <MenuItem onClick={handleMenuClose2}>
              <Link href={`/admin/accounts/details?id=${selectedUser}`}>
                <div style={{ textDecoration: "none", font: "#000000DE" }}>
                  Xem chi tiết
                </div>
              </Link>
            </MenuItem>

            <MenuItem onClick={handleMenuClose2}>Close</MenuItem>
          </Menu>
        </div>
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

  const setDeleteAlertStatus = () => {
    setDeleteAlert(!deleteAlert);
    setAnchorEl(null);
  };

  const deleteUser = async () => {
    console.log(selectedUser[0]);
    const res = await axios({
      method: "post",
      url: "/api/admin/accounts/delete",
      withCredentials: true,
      data: {
        id: selectedUser[0],
      },
    });

    // Check that our status code is in the 200s,
    // meaning the request was successful.
    if (res.status < 300) {
      router.replace(router.asPath);
    }
  };

  return (
    <div>
      <Breadcrumbs breadcumbData={breadcumbData} />
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
                <Link href={`/admin/accounts/create`}>
                  <div style={{ textDecoration: "none", font: "#000000DE" }}>
                    Add New
                  </div>
                </Link>
              </Button>
              <IconButton
                aria-label="refresh"
                className={classes.icon}
                onClick={refreshData}
              >
                <RefreshIcon fontSize="large" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <DataTable
        dataTable={dataTable}
        dataTableColumns={columns}
        sortModel={sortModel}
        getSelectedValue={getSelectedValue}
      />

      <AlertDialog
        dialogStatus={deleteAlert}
        title={
          "Bạn có muốn xóa người dùng ID: " + `${selectedUser}` + " không?"
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
