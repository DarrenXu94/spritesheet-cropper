import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
// const prettyBytes = require("pretty-bytes");
import prettyBytes from "pretty-bytes";

// Todo, error handling

export const FileUploader = ({
  onFileSelect,
  showFiles,
}: {
  onFileSelect;
  showFiles?;
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    onFileSelect(acceptedFiles[0]);
  }, []);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {prettyBytes(file.size)}
    </li>
  ));

  return (
    <section className="container-dropzone">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop a file here</p>
        )}
      </div>
      {showFiles && files.length > 0 && (
        <aside className="pt-2">
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      )}
    </section>
  );
};
