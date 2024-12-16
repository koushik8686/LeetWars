
"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store  from '../store/store';
interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return <Provider store={store}> <SessionProvider>{props.children}</SessionProvider> </Provider>;
};

export default Providers;
    