import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function Test(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pool = await sql.connect(sqlConfig);
  let users = await pool
    .request()
    .query(
      "select id, UsersName, AccountType, TelNo, Email, Gender from tblAccount"
    );

  let vehicles = await pool
    .request()
    .query(
      `SELECT AccountID, count(*) AS SLX FROM tblVehicle GROUP BY AccountID`
    );

  res.json({ users, vehicles });
});
