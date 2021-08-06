import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function EntranceInfor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pool = await sql.connect(sqlConfig);
  let result = await pool.request()
    .query(`SELECT OD.id, OD.tenODau, V.tenXe, V.soChoNgoi, OD.status, OD.maKhuVuc 
    FROM tblODauXe as OD
    JOIN tblVehicle as V on V.maODauXe = OD.id AND V.AccountID = '${req.body.id}'`);

  res.json(result.recordset);
});
