import "../styles/globals.css";
import type { AppProps } from "next/app";
import "windi.css";
import NiceModal from "@ebay/nice-modal-react";
import Modal from "../components/Modal";
NiceModal.register("my-modal", Modal);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NiceModal.Provider>
      <Component {...pageProps} />
    </NiceModal.Provider>
  );
}

export default MyApp;
