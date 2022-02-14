import React from "react";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { useEffect, useState } from "react";

export interface SpritesheetCanvasProps {
  imgData;
}
// Converts a data URI to png. Used to add pngs into the zip
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Converts UInt8 to Data URI. Used for changing p5 image type to a globally usable type
const convertArrayIntoDataUri = (pixelArray) => {
  var canvas = document.createElement("canvas"),
    ctx: any = canvas.getContext("2d");

  canvas.width = 32;
  canvas.height = 32;

  // create imageData object
  var idata = ctx.createImageData(32, 32);

  // set our buffer as source
  idata.data.set(pixelArray);

  // update canvas with new data
  ctx.putImageData(idata, 0, 0);

  var dataUri = canvas.toDataURL(); // produces a PNG file
  return dataUri;
};

const Sketch = dynamic(() => import("react-p5"), {
  ssr: false,
});
let cols = 13;
let rows = 8;
let source;
let w, h;
let tiles: p5Types.Image[] = [];
let tilesPixelArray: Uint8Array[] = [];
let x = 0;

export default function SpritesheetCanvas({ imgData }: SpritesheetCanvasProps) {
  const [pixelArray, setPixelArray] = useState<any>(null);
  const [downloadFile, setDownloadFile] = useState<any>(null);
  useEffect(() => {
    if (pixelArray) {
      const zip = new JSZip();

      for (let [idx, croppedImage] of pixelArray.entries()) {
        const convertedImage = convertArrayIntoDataUri(croppedImage);
        console.log({ idx, convertedImage });
        zip.file(`${idx}.png`, dataURLtoFile(convertedImage, `${idx}.png`));
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        // saveAs(content, "download.zip");
        setDownloadFile(content);
      });
    }
  }, [pixelArray]);
  const setup = (p5: p5Types, canvasParentRef) => {
    p5.createCanvas(source.width, source.height).parent(canvasParentRef);
    p5.image(source, 0, 0);
    w = source.width / cols;
    h = source.height / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * w;
        let y = j * h;
        let img = p5.createImage(w, h);
        img.copy(source, x, y, w, h, 0, 0, w, h);

        tiles.push(img);

        img.loadPixels();
        tilesPixelArray.push(new Uint8Array(img.pixels));
      }
    }
    setPixelArray(tilesPixelArray);
  };
  const draw = (p5: p5Types) => {
    p5.image(source, 0, 0);
  };
  const download = () => {
    saveAs(downloadFile, "download.zip");
  };
  return (
    <div>
      <Sketch
        setup={setup}
        draw={draw}
        preload={(p) => {
          source = p.loadImage(imgData);
        }}
      />
      {downloadFile && (
        <button
          onClick={() => {
            download();
          }}
        >
          Download
        </button>
      )}
    </div>
  );
}
