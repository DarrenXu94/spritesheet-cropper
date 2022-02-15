import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FileUploader } from "../components/FileUploader";
import InputComponent from "../components/InputComponent";
import SpriteImageViewer from "../components/SpriteImageViewer";
import SpritesheetCanvas from "../components/SpritesheetCanvas";
import * as url from "../public/adventurer_sprite_sheet_v1.1.png";

const Home: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
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
      <h1 className="text-4xl py-4">SpriteSheet Cropper</h1>
      <p className="text-xl">Crop your spritesheet into individual images</p>
      <div className="py-5">
        <FileUploader
          onFileSelect={(file) => {
            const objectURL = URL.createObjectURL(file);
            setSelectedFile(objectURL);
          }}
        />
      </div>
      {selectedFile && (
        <>
          <SpriteImageViewer imgData={selectedFile} />

          <InputComponent />
        </>
      )}
      {/* {selectedFile && <SpritesheetCanvas imgData={selectedFile} />} */}
    </div>
  );
};

export default Home;
