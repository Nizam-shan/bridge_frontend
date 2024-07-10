import { StateProvider } from "@/context/state";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </StateProvider>
  );
}
