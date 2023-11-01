import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const DragImage = () => {
  const [image, setImage] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    // value: {image},
    // onChange={},
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div id="dragContainer">
      {/* <form onSubmit={}> */}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>drop image here</p>
        ) : (
          <p>drag & drop image here OR click to browse your files</p>
        )}
      </div>
      <div>
        {image.map((file) => {
          return (
            <div>
              <img
                src={file.preview}
                style={{
                  width: "600px",
                  height: "400px",
                  border: "3px solid #CCC",
                }}
                alt="preview"
              />
            </div>
          );
        })}
      </div>
      {/* <button type="submit">submit</button>
			</form> */}
    </div>
  );
};

export default DragImage;
