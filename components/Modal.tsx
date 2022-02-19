import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, text }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal bg-light-50 flex flex-col justify-evenly"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div>{text}</div>
        <button
          className="bg-dark-500 text-light-50 p-3 rounded-2xl"
          onClick={handleClose}
        >
          Close
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
