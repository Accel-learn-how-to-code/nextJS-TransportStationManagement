import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        path: "/",
      })
    );

    res.json("Log out successful");
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
