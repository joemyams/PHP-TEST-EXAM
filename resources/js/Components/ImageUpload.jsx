import React, { useState, useEffect } from 'react';

const ImageUpload = ({ onImageChange, formSubmitted }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (formSubmitted) {
      setSelectedImage(null);
    }
  }, [formSubmitted]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
      onImageChange(file); // Notify parent component about the image change
    }
  };

  return (
    <div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 mb-4"
      />

      {selectedImage && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Preview:</p>
          <img src={selectedImage} alt="Preview" className="mt-2 max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
