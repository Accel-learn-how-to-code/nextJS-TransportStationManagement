import { NextApiRequest, NextApiResponse } from "next";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";
import sql from "mssql";

export default Authenciated(async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const selectedUser = req.body.selectedUser.map((x) => `'${x}'`).join();

    let pool = await sql.connect(sqlConfig);
    const { id } = req.body;
    await pool.request().query(`DELETE FROM tblAccount WHERE id='${id}'`);

    res.status(200).json(`DELETE SUCCESS: ${id}`);
  } catch (error) {
    console.log(error);
  }
});
