import React, { useEffect } from "react";
import useSocketManager from "../../hooks/useSocketManager";
import { motion } from "framer-motion";

export const Debug = () => {
  const { sm } = useSocketManager();
  const card = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };
  const table = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  useEffect(() => {}, []);
  return (
    <main className="h-screen w-full grid grid-cols-3">
      <div className="col-start-2 col-end-3 flex flex-col justify-center items-center p-8">
        <motion.section
          initial="hidden"
          animate="visible"
          transition={{ duration: 5 }}
          variants={table}
          id="game-decks"
          className="flex justify-center gap-4 w-full"
        >
          <motion.div
            variants={card}
            whileHover={{ scale: 1.2 }}
            className="w-16 h-24 rounded-sm bg-red-400"
          />
          <motion.div
            variants={card}
            className="w-16 h-24 rounded-sm bg-sky-400"
          />
        </motion.section>
      </div>
    </main>
  );
};
