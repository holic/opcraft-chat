import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  res.redirect(
    `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2Fopchat.loca.lt%2Fapi%2Fdiscord%2Foauth%2Fredirect&response_type=code&scope=webhook.incoming`
  );
};

export default handler;
