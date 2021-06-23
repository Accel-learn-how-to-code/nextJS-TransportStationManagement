import { NextApiRequest, NextApiResponse } from "next";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";
import sql from "mssql";

export default Authenciated(async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    let pool = await sql.connect(sqlConfig);
    await pool.request().query(`DELETE FROM tblVehicle WHERE id='${id}'`);
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(req.body.selectedUser);
});
