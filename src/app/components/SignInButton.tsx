'use client'

import { signIn, signOut, useSession } from "next-auth/react";
export default function AuthButtons() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      {session ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </div>
  );
}
