import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function TuyenXe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pool = await sql.connect(sqlConfig);
  let result = await pool.request()
    .query(`SELECT TX.id, TX.diemBatDau, TX.diemKetThuc, TX.status, count(*) as SLChuyen
    FROM tblTuyenXe as TX
    JOIN tblChuyenXe as CX on CX.maTuyenXe = TX.id
    join tblVehicle as V on V.id = CX.maXe AND V.AccountID = '${req.body.id}'
    GROUP BY TX.id, TX.diemBatDau, TX.diemKetThuc, TX.status`);

  res.json(result.recordset);
});
