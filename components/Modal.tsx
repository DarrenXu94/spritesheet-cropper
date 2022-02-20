import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalContainer from "./ModalContainer";

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

export default NiceModal.create(({ text }: { text: any }) => {
  // Use a hook to manage the modal state
  const modal = useModal();

  return (
    <ModalContainer>
      {modal.visible && (
        <Backdrop onClick={() => modal.hide()}>
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
              onClick={() => {
                modal.hide();
              }}
            >
              Close
            </button>
          </motion.div>
        </Backdrop>
      )}
    </ModalContainer>
  );
});
