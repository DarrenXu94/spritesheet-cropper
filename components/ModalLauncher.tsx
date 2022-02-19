import { motion } from "framer-motion";
import React, { useState } from "react";

export interface ModalLauncherProps {
  setModalOpen;
  modalOpen;
}

export default function ModalLauncher({
  setModalOpen,
  modalOpen,
}: ModalLauncherProps) {
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  return (
    <div className="flex items-center ">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="border border-dark-900 rounded-full flex justify-center cursor-pointer"
        style={{ width: "25px" }}
        onClick={() => (modalOpen ? close() : open())}
      >
        ?
      </motion.div>
    </div>
  );
}
