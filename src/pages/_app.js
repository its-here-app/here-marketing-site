import "@/styles/globals.css";
import { motion } from "framer-motion";
export default function App({ Component, pageProps }) {
  return (
    <motion.div
      key={Component}
      initial="pageInitial"
      animate="pageAnimate"
      transition={{ duration: 1.3, ease: [0.23, 1, 0.32,1]}}
      variants={{
        pageInitial: {
          opacity: 0,
          y: 30,
        },
        pageAnimate: {
          opacity: 1,
          y: 0,
        },
      }}
    >
      <Component {...pageProps} />
    </motion.div>
  )
}
