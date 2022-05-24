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
    <>
      <h1 className='bg-indigo-500 text-center p-4 text-4xl text-white'>
        AWS S3에서 사진 불러오기
      </h1>
      <form onSubmit={handleSubmit} className='flex justify-center mt-8'>
        <label
          htmlFor='formFile'
          className='form-label inline-block mr-4 font-extrabold text-2xl text-gray-700'>
          Picture Name:
        </label>
        <input
          className=' text-2xl border-2 bg-indigo-200 mr-5'
          name='picturename'
          type='text'
          id='picturename'
          value={picturename}
          onChange={(e) => setPicturename(e.target.value)}
        />
        <input
          className='form-control
            block
            w-50
            mr-5
            px-5
            py-1.5
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          type='file'
          name='imageFile'
          accept='image/jpeg, image/jp, image/png'
          onChange={handleFileChange}
        />
        <button className='w-25 p-2 border-2 bg-indigo-500 border-indigo-400 border-solid rounded-2xl  text-2xl text-white font-bold'>
          Submit
        </button>
      </form>
      <img src={s3Location} alt='' className='text-center mt-10 mx-auto' />
    </>
  );
};

export default NewGallery;
