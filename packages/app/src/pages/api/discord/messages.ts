import { NextApiHandler } from "next";

import { envVar } from "../../../envVar";
import { eris } from "../../../eris";

const handler: NextApiHandler = async (req, res) => {
  const messages = await eris.getMessages(envVar("DISCORD_CHANNEL_ID"));
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({
    messages: messages
      .filter((message) => message.author.id === envVar("DISCORD_BOT_USER_ID"))
      .sort((a, b) => a.timestamp - b.timestamp),
  });
};

export default handler;
