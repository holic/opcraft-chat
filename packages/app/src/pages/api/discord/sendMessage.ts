import { NextApiHandler } from "next";

import { envVar } from "../../../envVar";
import { eris } from "../../../eris";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "OPTIONS": {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(200).end();
      return;
    }
    case "POST": {
      const message = await eris.createMessage(
        envVar("DISCORD_CHANNEL_ID"),
        req.body.message
      );
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json({ message });
      return;
    }
    default: {
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  }
};

export default handler;
