import React from "react";
import SigninButton from "./SignInButton";

const Appbar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <SigninButton />
    </header>
  );
};

export default Appbar;
