import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../database/testDB";
import { Authenciated } from "../../../database/Authenciated";

export default Authenciated(async function Test(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pool = await sql.connect(sqlConfig);
  let result = await pool
    .request()
    .query(
      `select id, UsersName, Email, TelNo, Gender, Address, HomeTown from tblAccount where id = '${req.body.id}'`
    );

  res.json(result.recordset);
});