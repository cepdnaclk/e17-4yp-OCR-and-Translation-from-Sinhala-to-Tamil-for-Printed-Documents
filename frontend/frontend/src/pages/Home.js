import React, { useState, useRef } from "react";
import axios from "axios";
import "./Home.css"; // Import the CSS file
import CircumIcon from "@klarr-agency/circum-icons-react";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [responseText, setResponseText] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setUploadError("");
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setUploadError("");
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setUploadError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image upload response:", response.data);
      setUploadError("");
      setResponseText(JSON.stringify(response.data, null, 2));
      setUploadError(""); // Clear any previous upload errors
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Error uploading image. Please try again later.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedImage(file);
    setUploadError("");
  };

  return (
    <div className="container">
      <div className="header">
        <img className="logo" src="/logo_new.png"></img>
        <button
          className="addbutton"
          style={{ border: "none", background: "none" }}
          onClick={() => fileInputRef.current.click()}
        >
          <CircumIcon name="circle_plus" color="#000" size="100px" />
        </button>
      </div>
      <div className="centered-container">
      <div className="right-side">
          {/* Content for the right side */}
          <img src="/1.png" alt="Description of the image" />
          
        </div>
        <div className="left-side">
          <div
            className="image-container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              <div className="image_preview_container">
                <img
                  className="image-preview"
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  width="200"
                  height="200"
                />
              </div>
            ) : (
              <div className="image-placeholder">Drag and drop image</div>
            )}

            <div className="remove_upload">
              {selectedImage && (
                <button className="button" onClick={handleRemoveImage}>
                  Remove Image
                </button>
              )}

              {selectedImage && (
                <button className="button" onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>

            {!selectedImage && (
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            )}

            {uploadError && <p className="error-message">{uploadError}</p>}
          </div>
        </div>
        {responseText && (
        <div className="response-container">
          <h3>Response Data:</h3>
          <textarea
            className="response-textarea"
            value={responseText}
            readOnly
          />
        </div>
      )}

       
      </div>
    </div>
  );
};

export default Home;
