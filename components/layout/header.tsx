import HeaderClient from "./header-client";

import { getSession } from "@/lib/auth";

const Header = async () => {
  const session = await getSession();

  return (
    <HeaderClient
      user={{
        name: session?.username || "Guest",
        avatar:
          session?.avatar ||
          "/default-avatar.png",
      }}
    />
  );
};

export default Header;