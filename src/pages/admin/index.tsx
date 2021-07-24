import React from "react";
import { AdminMenu } from "../../database/AdminMenu";
import { DataGrid } from "@material-ui/data-grid";
import Router from "next/router";
import { secret } from "../../../api/secret";

import axios from "axios";
import { verify } from "jsonwebtoken";
import { Box, Typography } from "@material-ui/core";

export default function Admin({ adminData }) {
  return (
    <Box>
      <Typography variant="h4">Hello Admin</Typography>
      <pre>{JSON.stringify(adminData, null, 4)}</pre>
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
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

  const adminData = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin",
    withCredentials: true,
    headers: {
      Cookie: cookie || null,
      "Content-Type": "application/json",
    },
    data: {
      email: decoded.myPersonEmail,
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

  return { props: { adminData } };
};

Admin.AdminMenu = AdminMenu;
