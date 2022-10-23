/** @format */

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Account from "../components/Account";
import NavBar from "../components/Navbar";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {session && <NavBar />}
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth
            theme="dark"
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
          />
        ) : (
          <Account session={session} />
        )}
      </div>
    </>
  );
};

export default Home;
