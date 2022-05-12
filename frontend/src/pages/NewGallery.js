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
    <div className='container rounded-xl shade'>
      <h1 className='text-2xl text-gray-800 front-bold'>
        AWS S3에서 사진 불러오기
      </h1>
      <form
        onSubmit={handleSubmit}
        className='text-xl text-gray-800 front-bold mb-5'>
        <label
          htmlFor='picturename'
          className='text-xl text-gray-700 front-bold mb-5'>
          Picture Name:
        </label>
        <input
          className='bg-gray-200 mb-3'
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
      <img src={s3Location} alt={'images-from-s3'} className='image' />
    </div>
  );
};

export default NewGallery;
