import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function Test(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pool = await sql.connect(sqlConfig);
  let result = await pool
    .request()
    .query(
      "select id, UsersName, AccountType, TelNo, Email, Gender from tblAccount"
    );

  res.json(result.recordset);
});
