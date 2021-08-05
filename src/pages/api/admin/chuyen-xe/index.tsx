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
      `select CX.id, TX.diemBatDau, TX.diemKetThuc, CX.maTuyenXe, CX.thoiGianDiDuKien, CX.thoiGianDenDuKien, CX.thoiGianDiThucTe, CX.thoiGianDenThucTe, CX.status, CX.maXe 
      from tblChuyenXe as CX
      join tblTuyenXe as TX on TX.id = CX.maTuyenXe`
    );

  res.json(result.recordset);
});

