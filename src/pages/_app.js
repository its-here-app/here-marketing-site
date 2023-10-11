import "@/styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={Component}
          initial="pageInitial"
          animate="pageAnimate"
          // exit="pageExit"
          transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
          variants={{
            pageInitial: {
              opacity: 0,
              y: 30,
            },
            pageAnimate: {
              opacity: 1,
              y: 0,
            },
            pageExit: {
              opacity: 0,
              y: 30,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-GM4MCJ7578" />
      <Script id="google-analytics">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-GM4MCJ7578');
    `}
      </Script>
    </>
  );
}
