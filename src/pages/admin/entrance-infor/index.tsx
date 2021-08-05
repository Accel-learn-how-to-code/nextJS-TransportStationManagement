import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { GridCellParams, GridColDef } from "@material-ui/data-grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DataTable from "../../../components/DataTable";
import SearchInput from "../../../components/searchInput";
import Title from "../../../components/Title";
import { AdminMenu } from "../../../database/AdminMenu";
import { Authorization } from "../../../database/Authorization";

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
export default function EntranceInformation({ EntranceInformation }) {
  const classes = useStyles();
  const [EntranceInformationList, setEntranceInformationList] =
    useState(EntranceInformation);
  const [refesh, setRefresh] = useState(false);
  const [alertModel, setAlertModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const getSelectedValue = (selectedValue) => {
    setSelectedUser(selectedValue);
  };
  const breadcumbData = [
    {
      path: "/admin",
      pathName: "Home",
    },
    {
      pathName: "Quản lý ô đậu",
    },
  ];

  //tạo data đưa vào data grid
  const approvedEntranceInformation = EntranceInformationList.filter(
    (x) => x.status === "Đã đậu"
  );
  const inapprovedEntranceInformation = EntranceInformationList.filter(
    (x) => x.status === "Còn trống"
  );

  const dataTable = [
    {
      value: "1",
      label: "All",
      data: EntranceInformationList,
    },
    {
      value: "2",
      label: "Đã đậu",
      data: approvedEntranceInformation,
    },
    {
      value: "3",
      label: "Còn trống",
      data: inapprovedEntranceInformation,
    },
  ];

  const sortModel = [
    {
      field: "id",
      sort: "desc",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "tenODau", headerName: "Tên ô đậu", width: 150 },
    { field: "tenXe", headerName: "Tên xe", width: 150 },
    { field: "soChoNgoi", headerName: "Số chỗ", width: 150 },
    { field: "AccountID", headerName: "Mã Nhà xe", width: 150 },
    { field: "maKhuVuc", headerName: "Mã khu vực", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 150 },
    {
      field: "Action",
      headerName: " ",
      sortable: false,
      width: 200,
      renderCell: (params: GridCellParams) => (
        <div>
          <Button variant="outlined" color="primary" size="small">
            Action
          </Button>
        </div>
      ),
    },
  ];

  const refreshData = () => {
    setRefresh(!refesh);
    setEntranceInformationList(EntranceInformation);
    setAlertModel(false);
    console.log("refreshed");
  };

  const searchUsersName = (inputValue) => {
    let searchedData = inputValue
      ? EntranceInformationList.filter(
          (x) =>
            x.tenODau.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.tenXe.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.soChoNgoi.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.AccountID.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.maKhuVuc.toLowerCase().includes(inputValue.toLowerCase())
        )
      : null;
    searchedData && searchedData.length > 0
      ? (setEntranceInformationList(searchedData), setAlertModel(false))
      : (setEntranceInformationList(EntranceInformation), setAlertModel(true));
  };

  return (
    <Box>
      <Breadcrumbs breadcumbData={breadcumbData} />

      {alertModel ? (
        <div className={classes.alert}>
          <Alert severity="error">
            This is an error alert — <strong>Không tìm thấy chuyến xe!</strong>
          </Alert>
        </div>
      ) : null}

      <Paper elevation={2} className={classes.grid}>
        <Title>Quản lý chuyến xe</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={classes.gridInputHolder}>
            <SearchInput searchUsersName={searchUsersName} refesh={refesh} />
          </Grid>

          <Grid item xs={12} sm={7} className={classes.gridButtonHolder}>
            <div className={classes.buttonHolder}>
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
        title="Thông tin ô đậu"
      />
    </Box>
  );
}
EntranceInformation.AdminMenu = AdminMenu;

export const getServerSideProps = async (ctx) => {
  //lấy cookie nhưng ở dạng string auth=abc123
  const cookie = ctx.req?.headers.cookie;

  Authorization(ctx);

  const EntranceInformation = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin/entrance-infor",
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
  return { props: { EntranceInformation } };
};
