import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import Router from "next/router";
import React from "react";
import { AdminMenu } from "../../../database/AdminMenu";
import { Authorization } from "../../../database/Authorization";

export default function EntranceInformation({ EntranceInformation }) {
  return (
    <Box>
      <Typography variant="h3">Hello Thông tin ô đậu Adminn</Typography>
      <pre>{JSON.stringify(EntranceInformation, null, 4)}</pre>
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
