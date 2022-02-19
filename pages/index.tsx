import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FileUploader } from "../components/FileUploader";
import InputComponent from "../components/InputComponent";
import Modal from "../components/Modal";
import ModalContainer from "../components/ModalContainer";
import ModalLauncher from "../components/ModalLauncher";
import SpriteImageViewer from "../components/SpriteImageViewer";
import SpritesheetCanvas from "../components/SpritesheetCanvas";

const Home: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [rows, setRows] = useState<null | number>(null);
  const [columns, setColumns] = useState<null | number>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const close = () => setModalOpen(false);

  // Temporarily added to avoid uselayouteffect error
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  const onFormSubmit = (form) => {
    setRows(parseInt(form.rows));
    setColumns(parseInt(form.columns));
  };
  return (
    <div className="container mx-auto">
      <Head>
        <title>SpriteSheet Cropper</title>
        <meta
          name="description"
          content="Crop your spritesheet into individual images"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalContainer>
        {modalOpen && (
          <Modal
            text={
              <div className="leading-loose">
                <h4 className="text-xl">What is this?</h4>
                <p>
                  This is a little project I put together to learn image
                  manipulation in the browser.
                </p>
                <br />
                <h4 className="text-xl">How does it work?</h4>
                <p>
                  It uses p5.js to create multiple p5 images from one image. The
                  p5 images are converted into Uint8Arrays of pixels. This
                  Uint8Array is then converted into a DataURI using the canvas
                  Image object. The DataURI is then converted into a blob and
                  zipped.
                </p>
              </div>
            }
            handleClose={close}
          />
        )}
      </ModalContainer>
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl py-4">SpriteSheet Cropper</h1>
          <p className="text-xl">
            Crop your spritesheet into individual images
          </p>
        </div>
        <ModalLauncher modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
      <div className="py-5">
        <FileUploader
          showFiles={true}
          onFileSelect={(file) => {
            const objectURL = URL.createObjectURL(file);
            setSelectedFile(objectURL);
          }}
        />
      </div>
      {selectedFile && (
        <>
          <SpriteImageViewer imgData={selectedFile} />

          <InputComponent onFormSubmit={onFormSubmit} />
        </>
      )}
      {selectedFile && rows && columns && (
        <SpritesheetCanvas
          imgData={selectedFile}
          rowsProp={rows}
          colsProp={columns}
        />
      )}
    </div>
  );
};

export default Home;
