import React, { useRef } from "react";
import ScrollToTop from "components/utils/ScrollToTop";
import { SnackbarProvider } from "notistack";

import "assets/styles/main.scss";

export default function Layout({ children }) {
  const notistackRef = useRef(null);
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <ScrollToTop>
      <SnackbarProvider
        maxSnack={3}
        ref={notistackRef}
        action={(key) => <div onClick={onClickDismiss(key)}>x</div>}
      >
        {children}
      </SnackbarProvider>
    </ScrollToTop>
  );
}
