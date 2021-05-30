import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    hash(req.body.password, 10, async function(err, hash) {
      res.json(hash);
    });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}