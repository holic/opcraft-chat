import * as Eris from "eris";

import { envVar } from "./envVar";

export const eris = new Eris.Client(envVar("DISCORD_BOT_TOKEN"), {
  intents: ["guilds", "guildMessages"],
});
