/** @format */

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardPage from "./dashboard";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          theme="dark"
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          redirectTo="/dashboard"
        />
      ) : (
        <DashboardPage session={session} />
      )}
    </div>
  );
};

export default Home;
