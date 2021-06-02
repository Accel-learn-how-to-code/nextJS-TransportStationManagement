import { NextApiRequest, NextApiResponse } from "next";
import { sqlConfig } from "../../../../database/testDB";
import sql from "mssql";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const selectedUser = req.body.selectedUser.map((x) => `'${x}'`).join();
    let pool = await sql.connect(sqlConfig);
    await pool
      .request()
      .query("DELETE FROM tblAccount WHERE id IN (" + selectedUser + ")");
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(req.body.selectedUser);
}
