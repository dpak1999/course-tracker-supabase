/** @format */

import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";

const Account = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [website, setWebsite] = useState(null);
  const [name, setName] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

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

  const updatePassword = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        alert("Please confirm password");
        return;
      }
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      console.log({ data, error });

      if (error) throw error;

      alert("Password updated");
    } catch (error) {
      alert("Error updating password");
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    session && getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-6">
          <FormInput name={"Email"} type="text" value={session?.user?.email} />
          <FormInput
            name={"Name"}
            settervalue={setName}
            type="text"
            value={name}
          />
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
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="col-6">
          <FormInput
            name={"Enter new Password"}
            type="password"
            value={password}
            settervalue={setPassword}
          />
          <FormInput
            name={"Confirm new Password"}
            type="password"
            value={confirmPassword}
            settervalue={setConfirmPassword}
          />

          <div>
            <button
              className="btn btn-primary"
              onClick={() => updatePassword()}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
