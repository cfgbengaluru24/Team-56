import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc, deleteDoc, query, where, getDocs, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../fbconfig';
import crossIcon from '../../assets/cross_icon.png'; // Import the cross icon
import { Circles } from 'react-loader-spinner'; // Import the loader component
import './HomePic.css'; // Using module.css for scoped styles

const HomePic = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false); // State for loading spinner during upload
  const [loadingDelete, setLoadingDelete] = useState(false); // State for loading spinner during delete

  const imagesRef = collection(db, 'images');
  const [images, loading, error] = useCollectionData(imagesRef, { idField: 'id' });

  useEffect(() => {
    if (images) {
      setImageUrls(images.map(image => image.url));
    }
  }, [images]);

  const onDrop = acceptedFiles => {
    setFiles(acceptedFiles);
    setLoadingUpload(true); // Show the loading spinner

    acceptedFiles.forEach(async file => {
      const storageRef = ref(storage, `/images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      await addDoc(imagesRef, { url });
      setLoadingUpload(false); // Hide the loading spinner after upload
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDelete = async (url) => {
    try {
      setLoadingDelete(true); // Show the loading spinner
      // Delete the image from Firebase Storage
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);

      // Query Firestore to find the document with the matching URL
      const q = query(imagesRef, where('url', '==', url));
      const querySnapshot = await getDocs(q);

      // Delete the document from Firestore
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(db, 'images', docSnapshot.id);
        await deleteDoc(docRef);
      });

      // Remove the deleted image URL from the state
      setImageUrls(prevUrls => prevUrls.filter(imageUrl => imageUrl !== url));
      setLoadingDelete(false); // Hide the loading spinner after delete
    } catch (error) {
      console.error("Error deleting image: ", error);
      setLoadingDelete(false); // Hide the loading spinner on error
    }
  };

  return (
    <div className="home-pic-container">
      <div className="home-pic-upload-area" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {loadingUpload && (
        <div className="home-pic-loading">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading-indicator"
          />
        </div>
      )}
      <div className="home-pic-image-list">
        {loadingDelete && (
          <div className="home-pic-loading">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="loading-indicator"
            />
          </div>
        )}
        {images &&
          images.map((image, index) => (
            <div className="home-pic-image-wrapper" key={index}>
              <img className="home-pic-image" src={image.url} alt={`Uploaded pic ${index + 1}`} />
              <img
                className="home-pic-delete-icon"
                src={crossIcon}
                alt="Delete"
                onClick={() => handleDelete(image.url)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePic;
