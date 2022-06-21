import "../styles/globals.css";
import withUrqlClient from "../utils/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto flex flex-col h-screen justify-between">
      <Header />
      <main className="py-6 flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default withUrqlClient(MyApp);
