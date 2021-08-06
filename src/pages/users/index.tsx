import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import { verify } from "jsonwebtoken";
import Router from "next/router";
import React from "react";
import { secret } from "../../../api/secret";
import { UsersMenu } from "../../database/UsersMenu";

export default function Users({ userData }) {
  return (
    <Box>
      <Typography variant="h5" component="h6">
        Chào mừng tới trang Quản lý bến xe trung tâm Đà Nẵng
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1">
          Tên người dùng: {`${userData[0].UsersName}`}
        </Typography>
        <Typography variant="subtitle1">
          Email: {`${userData[0].Email}`}
        </Typography>
        <Typography variant="subtitle1">
          Phone: {`${userData[0].TelNo}`}
        </Typography>
        <Typography variant="subtitle1">
          Địa chỉ: {`${userData[0].Address}`}
        </Typography>
        <Typography variant="subtitle1">
          Quê quán: {`${userData[0].HomeTown}`}
        </Typography>
      </Box>
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  //lấy cookie nhưng ở dạng object {auth: abc123}
  const { cookies } = ctx.req;

  var decoded = verify(cookies.auth, secret);

  const userData = await axios({
    method: "GET",
    url: "http://localhost:3000/api/user",
    withCredentials: true,
    headers: {
      Cookie: cookie || null,
      "Content-Type": "application/json",
    },
    data: {
      id: decoded.sub,
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

  return { props: { userData } };
};

Users.UsersMenu = UsersMenu;


