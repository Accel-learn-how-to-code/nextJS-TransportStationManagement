import { Box, Button, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GridCellParams, GridColDef } from "@material-ui/data-grid";
import { CheckCircleOutline } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
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

export default function ChuyenXe({ ChuyenXe }) {
  const classes = useStyles();
  const [chuyenXeList, setChuyenXeList] = useState(ChuyenXe);
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
      pathName: "Quản lý chuyến xe",
    },
  ];

  //tạo data đưa vào data grid
  const approvedChuyenXe = chuyenXeList.filter((x) => x.status === "Đã duyệt");
  const inapprovedChuyenXe = chuyenXeList.filter(
    (x) => x.status === "Chưa duyệt"
  );

  const dataTable = [
    {
      value: "1",
      label: "All",
      data: chuyenXeList,
    },
    {
      value: "2",
      label: "Đã duyệt",
      data: approvedChuyenXe,
    },
    {
      value: "3",
      label: "Chưa duyệt",
      data: inapprovedChuyenXe,
    },
  ];

  const sortModel = [
    {
      field: "id",
      sort: "desc",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "diemBatDau", headerName: "Nơi bắt đầu", width: 200 },
    { field: "diemKetThuc", headerName: "Nơi kết thúc", width: 200 },
    { field: "maTuyenXe", headerName: "Mã Tuyến", width: 130 },
    { field: "thoiGianDiDuKien", headerName: "Giờ đi", width: 150 },
    { field: "thoiGianDenDuKien", headerName: "Giờ đến", width: 150 },
    { field: "thoiGianDiThucTe", headerName: "Giờ xuất phát", width: 150 },
    { field: "thoiGianDenThucTe", headerName: "Giờ kết thúc", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 130 },
    { field: "maXe", headerName: "Mã Xe", width: 100 },
    {
      field: "Action",
      headerName: " ",
      sortable: false,
      width: 130,
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
    setChuyenXeList(ChuyenXe);
    setAlertModel(false);
    console.log("refreshed");
  };

  const findCommonElements = (arr1, arr2) => {
    // Create an empty object
    let obj = {};

    // Loop through the first array
    for (let i = 0; i < arr1.length; i++) {
      // Check if element from first array
      // already exist in object or not
      if (!obj[arr1[i]]) {
        // If it doesn't exist assign the
        // properties equals to the
        // elements in the array
        const element = arr1[i];
        obj[element] = true;
      }
    }

    // Loop through the second array
    for (let j = 0; j < arr2.length; j++) {
      // Check elements from second array exist
      // in the created object or not
      if (obj[arr2[j]]) {
        return true;
      }
    }
    return false;
  };

  const searchUsersName = (inputValue) => {
    let searchedData = inputValue
      ? chuyenXeList.filter(
          (x) =>
            inputValue.toLowerCase().includes(x.diemBatDau.toLowerCase()) ||
            inputValue.toLowerCase().includes(x.diemKetThuc.toLowerCase()) ||
            inputValue.toLowerCase().includes(x.maTuyenXe.toLowerCase()) ||
            inputValue.toLowerCase().includes(x.maXe.toLowerCase()) ||
            inputValue
              .toLowerCase()
              .includes(x.thoiGianDiDuKien.toLowerCase()) ||
            inputValue.toLowerCase().includes(x.thoiGianDenDuKien.toLowerCase())
        )
      : null;

    searchedData && searchedData.length > 0
      ? (setChuyenXeList(searchedData), setAlertModel(false))
      : (setChuyenXeList(ChuyenXe), setAlertModel(true));
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
        title="Chuyến xe"
      />
    </Box>
  );
}
ChuyenXe.AdminMenu = AdminMenu;

export const getServerSideProps = async (ctx) => {
  //lấy cookie nhưng ở dạng string auth=abc123
  const cookie = ctx.req?.headers.cookie;

  Authorization(ctx);

  const ChuyenXe = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin/chuyen-xe",
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
  return { props: { ChuyenXe } };
};
