import Eris from "eris";
import { useQuery } from "wagmi";

import { PendingIcon } from "./PendingIcon";
import { useIsMounted } from "./useIsMounted";

export const ChatBox = () => {
  const isMounted = useIsMounted();
  const sessionQuery = useQuery(
    ["discordSession"],
    () => fetch("/api/discord/oauth/token").then((response) => response.json()),
    { enabled: isMounted }
  );

  if (!isMounted) return null;

  if (sessionQuery.isLoading) {
    return <PendingIcon />;
  }

  const discordSession = sessionQuery.data;
  if (!discordSession) {
    // TODO: redirect to auth flow
    throw new Error("No Discord session data found, not yet authorized?");
  }

  const client = new Eris.Client(discordSession.accessToken);
  client.on("ready", () => {
    console.log("Client ready!");
  });

  return (
    <div className="container mx-auto py-8">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Chat"
          className="p-2 border rounded w-full"
          autoFocus
        />
      </form>
    </div>
  );
};
