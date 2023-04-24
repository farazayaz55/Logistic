import type { AppType } from "next/app";
import { api } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import "../styles/global.css";
import { type Session } from "next-auth";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);



