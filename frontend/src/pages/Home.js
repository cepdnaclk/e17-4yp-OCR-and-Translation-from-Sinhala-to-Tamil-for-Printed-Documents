import React, { useState, useRef } from "react";
import axios from "axios";
import "./Home.scss"; // Import the CSS file
import CircumIcon from "@klarr-agency/circum-icons-react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

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
    formData.append("uploadedFile", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/upload_file",
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

    <div>
      <div className="container-1">
        <div className="header">
          <div className="leftBox">
            <img className="logo" src="/Logo-1.png" alt="Logo"></img>
            <button
              className="addbutton"
              style={{ border: "none", background: "none" }}
              onClick={() => fileInputRef.current.click()}
            >
              <CircumIcon name="circle_plus" color="#000" size="100px" />
            </button>
          </div>
          <div className="rightBox">
            <h3>
              Our free online translator service allows you to quickly and
              easily convert sinhala text,doc,img and pdf into editable tamil
              text
            </h3>
          </div>
        </div>
        <div className="centered-container">
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
                  accept="*/*"
                  id="fileInput"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              )}

              {uploadError && <p className="error-message">{uploadError}</p>}
            </div>
          </div>
          <div className="right-side">
            {/* Content for the right side */}
            <div className="response-container">
              <h3>Translated Text</h3>
              <textarea
                className="response-textarea"
                value={responseText}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container-2">
        <CardGroup>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title>Use OCR</Card.Title>
              <Card.Text>
                To extract Sinhala text and characters from printed documents.
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title>Translation </Card.Title>
              <Card.Text>
                Translate the extracted Sinala text into Tamil editable text..{" "}
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title>Image,PDF,doc to editable text</Card.Title>
              <Card.Text>
                Extract text from PDF,images,doc and text files without payment
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title>Free service </Card.Title>
              <Card.Text>Accessible to anyone without registration</Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
        </CardGroup>
      </div>
      <div className="container-3">
        <footer className="footer">
          <div className="row">
            <div className="col-md-6">
              <h5>About Us</h5>
              <p>This is and undergraduate project of University Of</p>
            </div>
            <div className="col-md-6">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>
                  <p>Mishel@gmail.com</p>
                </li>
                <li>
                  <p>Odasara@gmail.com</p>
                </li>
                <li>
                  <p>Shazna@gmail.com</p>
                </li>
                <li>
                  <p>Lakindu@gmail.com</p>
                </li>
                {/* Add more navigation links as needed */}
              </ul>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <p>
                &copy; {new Date().getFullYear()} Tamil to Sinhala Online
                Translator. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
