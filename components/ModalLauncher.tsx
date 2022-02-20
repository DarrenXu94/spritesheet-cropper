import { motion } from "framer-motion";
import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export interface ModalLauncherProps {}

export default function ModalLauncher({}: ModalLauncherProps) {
  const modal = useModal("my-modal");

  const close = () => modal.hide();
  const open = () =>
    modal.show({
      text: (
        <div className="leading-loose">
          <h4 className="text-xl">What is this?</h4>
          <p>
            This is a little project I put together to learn image manipulation
            in the browser.
          </p>
          <br />
          <h4 className="text-xl">How does it work?</h4>
          <p>
            It uses p5.js to create multiple p5 images from one image. The p5
            images are converted into Uint8Arrays of pixels. This Uint8Array is
            then converted into a DataURI using the canvas Image object. The
            DataURI is then converted into a blob and zipped.
          </p>
        </div>
      ),
    });
  return (
    <div className="flex items-center ">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="border border-dark-900 rounded-full flex justify-center cursor-pointer"
        style={{ width: "25px" }}
        onClick={() => (modal.visible ? close() : open())}
      >
        ?
      </motion.div>
    </div>
  );
}
