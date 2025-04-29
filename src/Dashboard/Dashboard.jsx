import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { Context } from "../Context";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");
  const { userId } = useContext(Context);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const filePreview = URL.createObjectURL(selectedFile);
      setPreviewUrl(filePreview);
    }
  };

  useEffect(() => {
    function getUrls() {
      axios
        .get("http://localhost:4005/api/getImages", {
          params: { user_id: userId },
        })
        .then((res) => {
          setUrls(res.data);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
    getUrls();
  }, [userId]);
  console.log(description, "");

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 800;
          const maxHeight = 800;

          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            } else {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.7
          );
        };

        img.onerror = (error) => reject(error);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      setIsUploading(true);
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append("file", compressedFile, file.name);
      formData.append("user_id", userId);
      formData.append("description", description);

      const response = await axios.post(
        "http://localhost:4005/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedImageUrl(response.data.url);

      // Update the gallery with the new image and description
      setUrls([...urls, { url: response.data.url, description }]);

      // Clear description field after successful upload
      setDescription("");
      setFile(null); // Clear the selected file
      setPreviewUrl(""); // Clear the preview
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
    console.log(description < "in");
  };
  console.log(description, "out");

  function deleteImage(id) {
    axios
      .delete("http://localhost:4005/api/deleteImage", {
        data: { id }, // Send the specific image ID
      })
      .then(() => {
        // Remove the deleted image from the gallery
        setUrls(urls.filter((image) => image.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        alert("Failed to delete image.");
      });
  }
  return (
    <div className="main-content">
      <div className="image-upload-container">
        <div className="upload-section">
          <h1>Image Upload</h1>

          <div className="upload-controls">
            <div className="file-input-container">
              <input
                type="file"
                onChange={handleFileChange}
                id="file-input"
                accept="image/*"
              />
              <label htmlFor="file-input" className="file-input-label">
                Choose File
              </label>
              {file && <span className="file-name">{file.name}</span>}
            </div>
            <div className="description-container">
              <label htmlFor="description" className="description-label">
                Image Description
              </label>
              <textarea
                id="description"
                className="description-input"
                placeholder="Enter a description for your image"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />
            </div>

            <button
              onClick={handleUpload}
              className={`upload-button ${isUploading ? "uploading" : ""}`}
              disabled={!file || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {previewUrl && (
            <div className="preview-section">
              <h2>Preview</h2>
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="preview-image" />
                {description && (
                  <div className="preview-description">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {uploadedImageUrl && (
            <div className="uploaded-section">
              <h2>Uploaded Image</h2>

              <div className="uploaded-container">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="uploaded-image"
                />

                {description && (
                  <div className="uploaded-description">
                    <p>{description}</p>
                  </div>
                )}
                <a
                  href={uploadedImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="image-link"
                >
                  View Full Size
                </a>
              </div>
            </div>
          )}
        </div>

        {urls.length > 0 && (
          <div className="gallery-section">
            <h2>Image Gallery</h2>
            <div className="image-gallery">
              {urls.map((el, index) => (
                <div key={el.id || index} className="gallery-item">
                  {/* Pass el.id */}
                  <img src={el.url} alt={`Uploaded ${index + 1}`} />
                  {el.description && (
                    <div className="gallery-item-description">
                      <p>{el.description}</p>
                    </div>
                  )}
                  <button onClick={() => deleteImage(el.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
