import { NextApiHandler } from "next";

import { getSession } from "../../../../session/getSession";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession(req, res);
  res.json(session.discord);
};

export default handler;
