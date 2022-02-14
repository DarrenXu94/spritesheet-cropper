import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FileUploader } from "../components/FileUploader";
import SpriteImageViewer from "../components/SpriteImageViewer";
import SpritesheetCanvas from "../components/SpritesheetCanvas";
import * as url from "../public/adventurer_sprite_sheet_v1.1.png";

const Home: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  return (
    <div>
      <Head>
        <title>SpriteSheet Cropper</title>
        <meta
          name="description"
          content="Crop your spritesheet into individual images"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FileUploader
        onFileSelect={(file) => {
          const objectURL = URL.createObjectURL(file);
          setSelectedFile(objectURL);
        }}
      />
      {selectedFile && <SpriteImageViewer imgData={selectedFile} />}
      {/* {selectedFile && <SpritesheetCanvas imgData={selectedFile} />} */}
    </div>
  );
};

export default Home;
