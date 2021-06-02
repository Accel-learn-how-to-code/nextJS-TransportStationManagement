import { compare } from "bcrypt";
import cookie from "cookie";
import { sign } from "jsonwebtoken";
import sql from "mssql";
import { NextApiRequest, NextApiResponse } from "next";

import { secret } from "../../../api/secret";
import { sqlConfig } from "../../database/testDB";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .query(`select * from tblAccount where Email = '${req.body.email}'`);

    const person = result.recordset[0];
    compare(req.body.pass, person.pass, function (err, result) {
      if (!err && result) {
        const claims = {
          sub: person.id,
          myPersonEmail: person.Email,
          accountType: person.AccountType,
        };
        const jwt = sign(claims, secret, { expiresIn: "1h" });

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: true,
            //maxAge: 36000,
            path: "/",
          })
        );
        res.json(person.AccountType);
      } else {
        res.json("something wrong here~");
      }
    });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
