import React from "react";
import { AdminMenu } from "../../database/AdminMenu";
import { DataGrid } from "@material-ui/data-grid";
import Router from "next/router";
import { secret } from "../../../api/secret";

import axios from "axios";
import { verify } from "jsonwebtoken";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "thoiGianDiDuKien",
    headerName: "Date ",
    width: 160,
    type: "date",
  },
  {
    field: "thoiGianDenDuKien",
    headerName: "Date ",
    width: 160,
    type: "date",
  },
  {
    field: "thoiGianDiThucTe",
    headerName: "Date ",
    width: 160,
    type: "date",
  },
  {
    field: "thoiGianDenThucTe",
    headerName: "Date ",
    width: 160,
    type: "date",
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, date: "2000 12 02 êr" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    date: "2000 12 03",
  },
];

export default function Admin({ data }) {

  const test = JSON.parse(data[0].chiTietLichTrinh)
  return (
    <div>
      <p>
        {JSON.stringify(test)}
      </p>
      <ul>
        {test.map((x) => (
          <li>
            {x.destination}: + {x.time}
          </li>
        ))}
      </ul>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
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

  const data = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin",
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

  return { props: { data } };
};

Admin.AdminMenu = AdminMenu;
