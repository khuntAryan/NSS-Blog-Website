/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion"; // ✅ correct

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ... rest stays same

export const StickyScroll = ({ contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [events, setEvents] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(stored);
  }, []);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = events.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = events.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      animate={{ backgroundColor: "#171717" }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {events.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-kg mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      <div
        style={{ background: "#10b981" }}
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
          contentClassName
        )}
      >
        {events[activeCard]?.description}
      </div>
    </motion.div>
  );
};
