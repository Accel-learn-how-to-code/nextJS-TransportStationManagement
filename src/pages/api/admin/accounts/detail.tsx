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
    const id = req.body.id;
    let user = await pool
      .request()
      .query(
        `select id, UsersName, AccountType, TelNo, Email, Address, HomeTown from tblAccount where id='${id}'`
      );

    let vehicle = await pool
      .request()
      .query(
        `select id, tenXe, soChoNgoi, noiDangKy from tblVehicle where AccountID='${id}'`
      );

    res.json({user: user.recordset, vehicle: vehicle.recordset});
  } else {
    res.status(405).json({ message: "We only support GET" });
  }
});
