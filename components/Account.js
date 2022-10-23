/** @format */

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";

const Account = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [website, setWebsite] = useState(null);
  const [name, setName] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  const getProfile = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select("username,website,name,profile_pic_url")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserName(data.username);
        setWebsite(data.website);
        setName(data.name);
        setProfilePicUrl(data.profile_pic_url);
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
        name,
        profile_pic_url: profilePicUrl,
        updated_at: new Date().toISOString(),
      };

      await supabase.auth
        .updateUser({ password: "87654321" })
        .then((res) => console.log(res));
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
      <FormInput name={"Email"} type="text" value={session.user.email} />
      <FormInput name={"Name"} settervalue={setName} type="text" value={name} />
      <FormInput
        name={"Username"}
        settervalue={setUserName}
        type="text"
        value={userName}
      />
      <FormInput
        name={"Profile Picture URL"}
        settervalue={setProfilePicUrl}
        type="text"
        value={profilePicUrl}
      />
      <FormInput
        name={"Website"}
        settervalue={setWebsite}
        type="website"
        value={website}
      />

      <div>
        <button
          className="btn btn-primary"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
        <button
          className="btn btn-danger ms-3"
          onClick={() => supabase.auth.signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
