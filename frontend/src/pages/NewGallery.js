import React, { useState, useEffect } from 'react';
import createFormData from '../gallery/createFormData';

const NewGallery = () => {
  const [picturename, setPicturename] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [s3Location, setS3Location] = useState('');

  useEffect(() => {
    document.title = 'You clicked the button';
  }, [s3Location]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('picturename', picturename);
    formData.append('imageFile', imageFile);
    const location = await createFormData(formData);
    setS3Location(location.data.location);
  };

  return (
    <div className='container'>
      <div className='header'>AWS S3에서 사진 불러오기</div>
      <div className='main'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='picturename'>name:</label>
          <input
            name='picturename'
            type='text'
            id='picturename'
            value={picturename}
            onChange={(e) => setPicturename(e.target.value)}
          />
          <input
            type='file'
            name='imageFile'
            accept='image/jpeg, image/jp, image/png'
            onChange={handleFileChange}
          />
          <button>Submit</button>
        </form>
      </div>
      <img className='image-display' src={s3Location} alt={'images From s3'} />
    </div>
  );
};

export default NewGallery;
