<div>
      <h2>Image Input</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <h3>Preview:</h3>
          <img src={selectedImage} alt="Selected" width="200" />
        </div>
      )}
    </div>