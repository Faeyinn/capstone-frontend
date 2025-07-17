import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function PageTransition({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98
      }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.6,
                easing: 'ease-in-out'
              }
            }
          : {
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: {
                duration: 0.4,
                easing: 'ease-in-out'
              }
            }
      }
      exit={{
        opacity: 0,
        y: 40,
        scale: 0.95,
        transition: {
          duration: 0.4,
          easing: 'ease-in-out'
        }
      }}
    >
      {children}
    </motion.div>
  );
}
