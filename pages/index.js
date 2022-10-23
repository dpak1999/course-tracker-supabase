/** @format */

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Account from "../components/Account";
import NavBar from "../components/Navbar";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]);

  return (
    <>
      {session && <NavBar />}
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session && (
          <Auth
            theme="dark"
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            redirectTo="/account"
          />
        )}
      </div>
    </>
  );
};

export default Home;
