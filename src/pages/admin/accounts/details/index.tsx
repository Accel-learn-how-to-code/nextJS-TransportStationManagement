import { AdminMenu } from "../../../../database/AdminMenu";
import Review from "../../../../components/Review";
import { secret } from "../../../../../api/secret";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Title from "../../../../components/Title";
import Router from "next/router";

import axios from "axios";
import { verify } from "jsonwebtoken";
import { DataGrid } from "@material-ui/data-grid";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  noWrap: {
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },
  grid: {
    margin: "auto",
    marginTop: 20,
    padding: 20,
    maxWidth: 700,
  },
  gridButton: {
    marginTop: 15,
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "tenXe", headerName: "Tên xe", width: 150 },
  {
    field: "soChoNgoi",
    headerName: "Số chỗ ngồi",
    type: "number",
    width: 130,
  },
  { field: "noiDangKy", headerName: "Nơi đăng ký", width: 150 },
];

const breadcumbData = [
  {
    path: "/admin",
    pathName: "Home",
  },
  {
    path: "/admin/accounts",
    pathName: "Quản lý tài khoản",
  },
  {
    pathName: "Xem thông tin",
  },
];

export default function UserDetail({ user, vehicle }) {
  const classes = useStyles();

  return (
    <>
      <Breadcrumbs breadcumbData={breadcumbData} />
      <Paper elevation={2} className={classes.grid}>
        <Title>Thông tin người dùng</Title>
        <Review user={user[0]} />
        <Typography variant="h6" gutterBottom>
          Xe của bạn: {vehicle.length}
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={vehicle}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
          />
        </div>

        <Grid
          className={classes.gridButton}
          container
          spacing={1}
          justify="flex-end"
        >
          <Grid item>
            <Button
              variant="outlined"
              type="button"
              //onClick={checkStepForward}
            >
              <Link href={`/admin/accounts`}>
                <div style={{ textDecoration: "none", font: "#000000DE" }}>
                  BACK
                </div>
              </Link>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="button"
              //onClick={checkStepForward}
            >
              <Link href={`/admin/accounts/details/update?id=${user[0].id}`}>
                <div style={{ textDecoration: "none", font: "#000000DE" }}>
                  EDIT
                </div>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
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

  const { user, vehicle } = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin/accounts/detail",
    withCredentials: true,
    headers: {
      Cookie: cookie || null,
      "Content-Type": "application/json",
    },
    data: {
      id,
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

  return { props: { user, vehicle } };
};

UserDetail.AdminMenu = AdminMenu;
