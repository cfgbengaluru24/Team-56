import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";
import { HiArrowNarrowDown } from "react-icons/hi";
import { Button, Box } from "@mui/material";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PocDashboard = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  // Callback function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      toast.success('File uploaded successfully');
    };
    reader.onerror = () => {
      toast.error('Error reading file');
    };
    reader.readAsDataURL(file);
  }, []);

  // Function to process the uploaded image
  const processImage = () => {
    if (!uploadedImage) return;

    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // OpenCV processing
      const src = cv.imread(canvas);
      const dst = new cv.Mat();
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
      cv.threshold(dst, dst, 120, 200, cv.THRESH_BINARY);
      cv.imshow("outputCanvas", dst);

      src.delete();
      dst.delete();

      setProcessedImage(canvas.toDataURL());
    };
    img.onerror = () => {
      toast.error('Error processing image');
    };
  };

  const sendImageToServer = async (image) => {
    const response = await fetch("http://localhost:8080/api/upload", {
      method: "POST",
      body: JSON.stringify({ image: image }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  };

  useEffect(() => {
    if (uploadedImage) {
      sendImageToServer(uploadedImage);
    }
  }, [uploadedImage]);

  // Dropzone configuration
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-full h-full"
      >
        <input {...getInputProps()} />
        <button
          onClick={open}
          className="flex items-center justify-center bg-blue-700 text-white rounded-full p-8 shadow-lg hover:bg-blue-300 transition duration-300"
        >
          <FaCamera className="text-4xl" />
        </button>
          <button
            onClick={open}
            className="flex items-center justify-center text-white rounded-full p-8 shadow-lg hover:bg-80 transition duration-300"
            style={{ backgroundColor: '#9a65338c' }}
          >
            <FaCamera className="text-4xl" />
          </button>
      </div>
      {uploadedImage && (
        <div className="text-center">
          <h2 className="text-xl font-semibold w-4/5 h-fit">Original Image</h2>
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="mt-2 border-2 border-gray-300 rounded-lg w-72 h-96"
          />
        </div>
      )}
    </div>
  );
};

export default PocDashboard;
