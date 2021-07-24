import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function ChuyenXe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pool = await sql.connect(sqlConfig);
  let result = await pool
    .request()
    .query(
      "select id, thoiGianDiDuKien, thoiGianDenDuKien, thoiGianDiThucTe, thoiGianDenThucTe, status, maTuyenXe, maXe from tblChuyenXe"
    );

  res.json(result.recordset);
});

