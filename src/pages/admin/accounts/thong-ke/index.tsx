import React, { useState } from "react";
import { AdminMenu } from "../../../../database/AdminMenu";
import { secret } from "../../../../../api/secret";
import { verify } from "jsonwebtoken";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { Bar, defaults, Line } from "react-chartjs-2";
import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Title from "../../../../components/Title";
import { Authorization } from "../../../../database/Authorization";
import { GridColDef } from "@material-ui/data-grid";
import DataTable from "../../../../components/DataTable";

const breadcumbData = [
  {
    path: "/admin",
    pathName: "Home",
  },
  {
    pathName: "Thống kê tài khoản",
  },
];

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: 20,
    paddingTop: 20,
    padding: 10,
  },
  totalBox: {
    padding: theme.spacing(1, 2, 4, 2),
    marginBottom: theme.spacing(2),
  },
}));

export default function ThongKe({ users, vehicles }) {
  const classes = useStyles();
  const allUsers = users.recordset || [];
  const [selectedUser, setSelectedUser] = useState([]);
  const vehiclesData = vehicles.recordset || [];

  const Admin = allUsers.filter((x) => x.AccountType === "AD");
  const NhaXe = allUsers.filter((x) => x.AccountType === "NX");
  const CountAdmin = Admin.length;
  const CountNhaXe = NhaXe.length;

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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "UsersName", headerName: "Name", width: 200 },
    { field: "AccountType", headerName: "Type", width: 90 },
    { field: "TelNo", headerName: "Phone", width: 130 },
    { field: "Email", headerName: "Email", width: 250 },
    { field: "Gender", headerName: "Gender", width: 100 },
  ];

  const barChartConfig = {
    labels: ["Admin", "Nhà xe"],
    datasets: [
      {
        label: "# of Accounts",
        data: [CountAdmin, CountNhaXe],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartConfig = {
    labels: vehiclesData.map((x) => x.AccountID),
    datasets: [
      {
        label: "# of Vehicles",
        data: vehiclesData.map((x) => x.SLX),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const getSelectedValue = (selectedValue) => {
    setSelectedUser(selectedValue);
  };

  return (
    <Box>
      <Breadcrumbs breadcumbData={breadcumbData} />

      <Paper elevation={2} className={classes.grid}>
        <Title>Thống kê tài khoản người dùng</Title>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Line
              data={lineChartConfig}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Paper elevation={1}>
              <Box className={classes.totalBox}>
                <Title>Tổng số</Title>
                <Typography component="p" variant="h6">
                  {allUsers.length} tài khoản
                </Typography>
                <Typography color="textSecondary">on 27 July, 2021</Typography>
              </Box>
            </Paper>

            <Paper elevation={1}>
              <Bar
                data={barChartConfig}
                height={400}
                width={600}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  legend: {
                    labels: {
                      fontSize: 25,
                    },
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Box>
          <DataTable
            dataTable={dataTable}
            dataTableColumns={columns}
            sortModel={sortModel}
            getSelectedValue={getSelectedValue}
            title="Tài khoản người dùng"
          />
        </Box>
      </Paper>
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
  //lấy cookie nhưng ở dạng string auth=abc123
  const cookie = ctx.req?.headers.cookie;

  Authorization(ctx);

  const { users, vehicles } = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin/accounts/thong-ke",
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

  return { props: { users, vehicles } };
};
ThongKe.AdminMenu = AdminMenu;
