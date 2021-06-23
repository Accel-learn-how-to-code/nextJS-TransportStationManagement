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
  } else if (req.method === "POST") {
    let pool = await sql.connect(sqlConfig);
    const { id, vehicles } = req.body;

    let vehiclesArr = vehicles
      .map(
        (x) =>
          `('${x.id}', '${x.tenXe}', ${x.soChoNgoi}, N'${x.noiDangKy}', '${id}', '${x.maODauXe}')`
      )
      .join(",");

    const sqlQueryVehicle = `INSERT INTO tblVehicle VALUES ${vehiclesArr}`;
    await pool.request().query(sqlQueryVehicle);

    res.json("INSERT VEHICLE SUCCESSFUL");

  } else if (req.method === "PUT") {
    let pool = await sql.connect(sqlConfig);
    const { id, tenXe, soChoNgoi , noiDangKy, maODauXe } = req.body;

    const sqlQueryVehicle = `UPDATE tblVehicle set tenXe=N'${tenXe}', soChoNgoi='${soChoNgoi}', noiDangKy='${noiDangKy}', maODauXe='${maODauXe}' where id='${id}'`;
    await pool.request().query(sqlQueryVehicle);

    res.json("UPDATE VEHICLE SUCCESSFUL");
    //res.json(sqlQueryVehicle);
  } else {
    res.status(405).json({ message: "Something wrong" });
  }
});
