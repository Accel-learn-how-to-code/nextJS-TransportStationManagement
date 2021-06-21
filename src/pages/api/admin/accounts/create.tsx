import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";
import uniqid from "uniqid";

export default Authenciated(async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let pool = await sql.connect(sqlConfig);

    const id = uniqid.time().slice(0, 10);
    const {
      UsersName,
      Email,
      TelNo,
      pass,
      Gender,
      Address,
      HomeTown,
      vehicles,
    } = req.body;

    let vehiclesArr = vehicles.map(x => `('${x.id}', '${x.tenXe}', ${x.soChoNgoi}, N'${x.noiDangKy}', '${id}', '${x.maODauXe}')`).join(",")

    hash(pass, 10, async function (err, hash) {
      const sqlQueryUser =
        "INSERT INTO tblAccount VALUES ('" +
        id +
        "', N'" +
        UsersName +
        "', '" +
        hash +
        "', 'NX', '" +
        Email +
        "', '" +
        TelNo +
        "', '" +
        Gender +
        "', N'" +
        Address +
        "', N'" +
        HomeTown +
        "')";
      
      const sqlQueryVehicle = `INSERT INTO tblVehicle VALUES ${vehiclesArr}`

      await pool.request().query(sqlQueryUser);
      await pool.request().query(sqlQueryVehicle);
      res.json("INSERT SUCCESSFUL");
    });
  } else if (req.method === "GET") {
    let pool = await sql.connect(sqlConfig);
    const oDau = await pool
      .request()
      .query("select id, tenODau from tblODauXe where status = N'Còn trống'");
    res.json(oDau.recordset)
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
});
