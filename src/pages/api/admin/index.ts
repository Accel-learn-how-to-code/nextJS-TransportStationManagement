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
      "select id, thoiGianDiDuKien, thoiGianDenDuKien, thoiGianDiThucTe, thoiGianDenThucTe, chiTietLichTrinh, status, maTuyenXe, maXe from tblChuyenXe"
    );

  res.json(result.recordset);
});
