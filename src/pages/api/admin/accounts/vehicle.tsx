import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function Test(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let pool = await sql.connect(sqlConfig);
    const vehicleId = req.body.vehicleId;

    let vehicle = await pool
      .request()
      .query(
        `select id, tenXe, soChoNgoi, noiDangKy from tblVehicle where id='${vehicleId}'`
      );

    res.json(vehicle.recordset);
  } else {
    res.status(405).json({ message: "We only support GET" });
  }
});
