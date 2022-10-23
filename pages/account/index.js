/** @format */

import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
import Account from "../../components/Account";
import NavBar from "../../components/Navbar";

const AccountPage = () => {
  const session = useSession();

  return (
    <div>
      <NavBar />
      <Account session={session} />
    </div>
  );
};

export default AccountPage;
