import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Home.scss'; // Import the CSS file
import CircumIcon from '@klarr-agency/circum-icons-react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import logo from '../Images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLanguage,
  faFileAlt,
  faImages,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [responseText, setResponseText] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setUploadError('');
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setUploadError('');
    setResponseText('');
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setUploadError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('uploadedFile', selectedImage);

    try {
      const response = await axios.post(
        'http://localhost:4000/api/upload_file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Image upload response:', response.data);
      setUploadError('');
      setResponseText(JSON.stringify(response.data, null, 2));
      setUploadError(''); // Clear any previous upload errors
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Error uploading image. Please try again later.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedImage(file);
    setUploadError('');
  };

  return (
    <div className="page">
      <div className="container-1">
        <div className="header">
          <div className="logo-row">
            <img className="logo" src={logo} alt="Logo" />
          </div>
          <div className="text-row">
            <h1>SINHALA TAMIL ONLINE TRANSLATOR</h1>
          </div>
        </div>

        <div className="description">
          <h6>
            Effortlessly translate Sinhala to Tamil, converting text, documents,
            images, and PDFs into an editable format—all for free.
          </h6>
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
                <div className="image-placeholder">Drag and drop file</div>
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
        <div className="uses-heading">
          <h2>Explore Features of Sinhala Tamil Online Translator</h2>
        </div>
        <div className="cards-container">
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title className="cardTitle">
                <div className="icon">
                  <FontAwesomeIcon icon={faFileAlt} />
                </div>
                OCR Text Extraction
              </Card.Title>
              <Card.Text className="cardText">
                Use Optical Character Recognition (OCR) technology to
                effortlessly extract Sinhala text and characters from printed
                documents.
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title className="cardTitle">
                <div className="icon">
                  <FontAwesomeIcon icon={faLanguage} />
                </div>
                Sinhala to Tamil Translation
              </Card.Title>
              <Card.Text className="cardText">
                Effortlessly translate Sinhala to Tamil with our user-friendly
                tool. Enjoy accurate and efficient language conversion, making
                communication across these languages simple and accessible.
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title className="cardTitle">
                <div className="icon">
                  <FontAwesomeIcon icon={faImages} />
                </div>
                Format Versatility
              </Card.Title>
              <Card.Text className="cardText">
                Enjoy flexibility in translation with support for various
                formats.Plain text, documents (including .txt, .md, .log, .doc,
                .docx), images (including .tif, .tiff, .jpg, .jpeg, .png), or
                PDFs (scanned or searchable, single or multi-pages)
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title className="cardTitle">
                <div className="icon">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </div>
                Free Translation Services
              </Card.Title>
              <Card.Text className="cardText">
                Experience cost-free language translation services, breaking
                down barriers and making language transformation accessible to
                all without any financial constraints.
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
        </div>
      </div>
      <div className="container-3">
        <footer className="footer">
          <div className="row">
            <div className="col">
              <h5>About Us</h5>
              <p>
                This is and undergraduate project of University Of Peradeniya
              </p>
            </div>

            <ul className="list-unstyled">
              <h5>Contact Us</h5>

              <p>
                Mishel@gmail.com || Odasara@gmail.com || Shazna@gmail.com ||
                Lakindu@gmail.com
              </p>

              {/* Add more navigation links as needed */}
            </ul>
          </div>
          <hr />
          <div className="row">
            <div className="col">
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
