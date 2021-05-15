import React from "react";
import { AdminMenu } from "../../../database/AdminMenu";
import DataTable from "../../../components/DataTable.tsx";
export default function Accounts() {
  return <DataTable />;
}
Accounts.AdminMenu = AdminMenu;
