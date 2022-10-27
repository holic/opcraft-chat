import { NextApiHandler } from "next";

import { envVar } from "../../../../envVar";
import { firstParam } from "../../../../firstParam";
import { getSession } from "../../../../session/getSession";

const handler: NextApiHandler = async (req, res) => {
  const code = firstParam(req.query.code);
  if (!code) {
    throw new Error("No `code` found in query string");
  }
  const guildId = firstParam(req.query.guild_id);
  if (!guildId) {
    throw new Error("No `guild_id` found in query string");
  }
  const session = await getSession(req, res);

  const oauthData = await fetch("https://discordapp.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: envVar("DISCORD_CLIENT_ID"),
      client_secret: envVar("DISCORD_CLIENT_SECRET"),
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: "https://opchat.loca.lt/api/discord/oauth/redirect",
      scope: "webhook.incoming",
    }).toString(),
  }).then((response) => response.json());

  console.log("got oauthData", oauthData);

  if (oauthData.error) {
    throw new Error(`Discord OAuth error: ${oauthData.error}`);
  }

  if (oauthData.access_token && oauthData.refresh_token) {
    session.discord = {
      guildId,
      accessToken: oauthData.access_token,
      refreshToken: oauthData.refresh_token,
    };
    await session.save();
  }

  // TODO: redirect to somewhere useful
  res.redirect("/");
  // res.json({
  //   code,
  //   guildId,
  //   accessToken: session.discord?.accessToken,
  //   refreshToken: session.discord?.refreshToken,
  // });
};

export default handler;
