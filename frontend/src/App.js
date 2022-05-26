import React, { useEffect } from 'react';
import NewGallery from './pages/NewGallery';

function App() {
  useEffect(() => {
    document.title = 'Image loading from AWS S3';
  }, []);
  return (
    <>
      <NewGallery />
    </>
  );
}

export default App;
