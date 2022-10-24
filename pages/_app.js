/** @format */

import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Head from "next/head";
import ToastContainer from "react-toastify";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />

      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
