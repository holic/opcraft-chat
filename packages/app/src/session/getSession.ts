import type { IncomingMessage, ServerResponse } from "http";
import { getIronSession, IronSession, IronSessionOptions } from "iron-session";

import { envVar } from "../envVar";

type SessionData = {
  discord?: {
    guildId: string;
    accessToken: string;
    refreshToken: string;
  };
};

type NextSession = IronSession & SessionData;

const sessionConfig: IronSessionOptions = {
  cookieName: "iron-session",
  password: envVar("SESSION_SECRET"),
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSession = async (req: IncomingMessage, res: ServerResponse) => {
  const session = (await getIronSession(
    req,
    res,
    sessionConfig
  )) as NextSession;
  return session;
};
