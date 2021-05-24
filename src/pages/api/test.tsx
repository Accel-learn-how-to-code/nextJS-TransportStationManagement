import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers, deleteUsers } from "../../database/testDB";

export default async function Test(req: NextApiRequest, res: NextApiResponse) {
  const selectedUser = req.body.selectedUser.map(x => `'${x}'`).join()
  await deleteUsers(selectedUser);
  res.status(200).json(req.body.selectedUser)
}
