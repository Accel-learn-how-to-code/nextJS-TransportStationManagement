import React from "react";
import { AdminMenu } from "../../../database/AdminMenu";
import { getAdmin, getChuXe, getNhaXe } from "../../testDB";

export default function ChuyenXe({ admin, chuXe, nhaXe }) {
  return (
    <div>
      Hello Chuyen Xe Admin 
      <pre>{JSON.stringify(admin, null, 4)}</pre>
      <pre>{JSON.stringify(chuXe, null, 4)}</pre>
      <pre>{JSON.stringify(nhaXe, null, 4)}</pre>
    </div>
  );
}
ChuyenXe.AdminMenu = AdminMenu;

export const getServerSideProps = async (ctx) => {
  const admin = await getAdmin();
  const chuXe = await getChuXe();
  const nhaXe = await getNhaXe();
  return { props: { admin, chuXe, nhaXe } };
};
