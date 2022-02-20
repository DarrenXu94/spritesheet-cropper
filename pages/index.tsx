import NiceModal from "@ebay/nice-modal-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FileUploader } from "../components/FileUploader";
import InputComponent from "../components/InputComponent";
import ModalLauncher from "../components/ModalLauncher";
import SpriteImageViewer from "../components/SpriteImageViewer";
import SpritesheetCanvas from "../components/SpritesheetCanvas";

const Home: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [rows, setRows] = useState<null | number>(null);
  const [columns, setColumns] = useState<null | number>(null);

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

      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl py-4">SpriteSheet Cropper</h1>
          <p className="text-xl">
            Crop your spritesheet into individual images
          </p>
        </div>
        <ModalLauncher />
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
