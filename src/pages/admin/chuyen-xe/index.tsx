import React from "react";
import { AdminMenu } from "../../../database/AdminMenu";

export default function ChuyenXe() {
  return <div>Hello Chuyen Xe Adminn</div>;
}
ChuyenXe.AdminMenu = AdminMenu;

export const getServerSideProps = async (ctx) => {
  return { props: {} };
};
