import { NextApiRequest, NextApiResponse } from "next";
import sql from "mssql";
import { sqlConfig } from "../../../../database/testDB";
import { Authenciated } from "../../../../database/Authenciated";

export default Authenciated(async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    let pool = await sql.connect(sqlConfig);

    const { id, UsersName, Email, TelNo, Gender, Address, HomeTown } = req.body;
    const sqlQueryUser = `UPDATE tblAccount set UsersName='${UsersName}', Email='${Email}', TelNo='${TelNo}', Gender='${Gender}', Address='${Address}', HomeTown='${HomeTown}'  where id='${id}'`;

    await pool.request().query(sqlQueryUser);
    //res.json(sqlQueryUser)
    res.json("UPDATE SUCCESSFUL");
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
});
