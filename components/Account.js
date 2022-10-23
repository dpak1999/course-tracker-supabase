/** @format */

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

const Account = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [website, setWebsite] = useState(null);

  const getProfile = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select("username,website")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserName(data.username);
        setWebsite(data.website);
      }
    } catch (error) {
      alert("Error loading user data");
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const updates = {
        id: user.id,
        username: userName,
        website,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;

      alert("Profile updated");
    } catch (error) {
      alert("Error updating user data");
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ userName, website })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
