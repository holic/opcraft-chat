import type { NextPage } from "next";

import { ChatBox } from "../ChatBox";

const HomePage: NextPage = () => {
  return (
    <div className="min-h-screen">
      <ChatBox />
    </div>
  );
};

export default HomePage;
