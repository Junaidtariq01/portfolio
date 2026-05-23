import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedCounter = ({ targetValue }: { targetValue: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 }); // Removed 'once: true'

  useEffect(() => {
    if (isInView) {
      // Reset count to 0 when entering view
      count.set(0);
      const animation = animate(count, targetValue, {
        duration: 0.8,
        ease: "easeOut",
      });
      return animation.stop;
    } else {
      // Reset when leaving view (optional)
      count.set(0);
    }
  }, [isInView, targetValue, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default AnimatedCounter;
