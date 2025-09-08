import "../styles/globals.css"
import "../styles/custom.css"
import { ToastContainer } from "react-toastify";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}
