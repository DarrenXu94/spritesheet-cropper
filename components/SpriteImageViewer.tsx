import React, { useState } from "react";
import Image from "next/image";

export interface SpriteImageViewerProps {
  imgData;
}

export default function SpriteImageViewer({ imgData }: SpriteImageViewerProps) {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  return (
    <div>
      <Image
        src={imgData}
        width={500}
        height={500 / ratio}
        layout="responsive" // you can use "responsive", "fill" or the default "intrinsic"
        onLoadingComplete={({ naturalWidth, naturalHeight }) =>
          setRatio(naturalWidth / naturalHeight)
        }
      />
    </div>
  );
}
