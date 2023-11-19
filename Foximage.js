import React, { useEffect, useState } from 'react';

const API_URL = "https://randomfox.ca/floof/"

// when the foximage component renders (only do this once)
// make a GET https://randomfox.ca/floof/
// set the image in state

function FoxImage() {
  const [image, setImage] = useState(null)
  
  useEffect(() => {
      fetch("https://randomfox.ca/floof/")
        .then(r => r.json())
        .then(data => setImage(data.image))
  }, [])
  
  if (!image) {
      return <h2>Loading...</h2>
  }
  
  return (
    <div>
      <p>Here's a lovely fox for you:</p>
      <img src={image} alt="Random Fox" />
    </div>
  );
}

export default FoxImage