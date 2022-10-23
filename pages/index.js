/** @format */

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          theme="dark"
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
        />
      ) : (
        <p>Authed</p>
      )}
    </div>
  );
};

export default Home;
