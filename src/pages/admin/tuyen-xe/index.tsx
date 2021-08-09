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
import AddIcon from "@material-ui/icons/Add";
import { CheckCircleOutline } from "@material-ui/icons";

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
export default function TuyenXe({ TuyenXe }) {
  const classes = useStyles();
  const [TuyenXeList, setTuyenXeList] = useState(TuyenXe);
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
      pathName: "Quản lý tuyến xe",
    },
  ];

  //tạo data đưa vào data grid
  const approvedTuyenXe = TuyenXeList.filter((x) => x.status === "Đã duyệt");
  const inapprovedTuyenXe = TuyenXeList.filter(
    (x) => x.status === "Chưa duyệt"
  );

  const dataTable = [
    {
      value: "1",
      label: "All",
      data: TuyenXeList,
    },
    {
      value: "2",
      label: "Đã duyệt",
      data: approvedTuyenXe,
    },
    {
      value: "3",
      label: "Chưa duyệt",
      data: inapprovedTuyenXe,
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
    { field: "diemBatDau", headerName: "Điểm bắt đầu", width: 200 },
    { field: "diemKetThuc", headerName: "Điểm kết thúc", width: 200 },
    { field: "SLChuyen", headerName: "Số chuyến", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 200 },
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
    setTuyenXeList(TuyenXe);
    setAlertModel(false);
    console.log("refreshed");
  };

  const searchUsersName = (inputValue) => {
    let searchedData = inputValue
      ? TuyenXeList.filter(
          (x) =>
            x.diemBatDau.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.diemKetThuc.toLowerCase().includes(inputValue.toLowerCase())
        )
      : null;
    searchedData && searchedData.length > 0
      ? (setTuyenXeList(searchedData), setAlertModel(false))
      : (setTuyenXeList(TuyenXe), setAlertModel(true));
  };

  return (
    <Box>
      <Breadcrumbs breadcumbData={breadcumbData} />

      {alertModel ? (
        <div className={classes.alert}>
          <Alert severity="error">
            This is an error alert — <strong>Không tìm thấy Tuyến xe!</strong>
          </Alert>
        </div>
      ) : null}

      <Paper elevation={2} className={classes.grid}>
        <Title>Quản lý Tuyến xe</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={classes.gridInputHolder}>
            <SearchInput searchUsersName={searchUsersName} refesh={refesh} />
          </Grid>

          <Grid item xs={12} sm={7} className={classes.gridButtonHolder}>
            <div className={classes.buttonHolder}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                startIcon={<CheckCircleOutline />}
                style={{
                  marginRight: 10,
                }}
              >
                <div
                  style={{
                    textDecoration: "none",
                    font: "#000000DE",
                  }}
                >
                  Chờ duyệt
                </div>
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
              >
                <div style={{ textDecoration: "none", font: "#000000DE" }}>
                  Add New
                </div>
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
        title="Tuyến xe"
      />
    </Box>
  );
}
TuyenXe.AdminMenu = AdminMenu;

export const getServerSideProps = async (ctx) => {
  //lấy cookie nhưng ở dạng string auth=abc123
  const cookie = ctx.req?.headers.cookie;

  Authorization(ctx);

  const TuyenXe = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin/tuyen-xe",
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
  return { props: { TuyenXe } };
};
