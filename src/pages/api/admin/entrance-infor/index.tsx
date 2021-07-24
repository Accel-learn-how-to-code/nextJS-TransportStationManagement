import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function EntranceInfor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pool = await sql.connect(sqlConfig);
  let result = await pool
    .request()
    .query("select id, tenODau, status, maKhuVuc from tblODauXe");

  res.json(result.recordset);
});
