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
    .query(
      `select id, tenXe, soChoNgoi, noiDangKy, maODauXe from tblVehicle where AccountID='${req.body.id}'`
    );

  res.json(result.recordset);
});
