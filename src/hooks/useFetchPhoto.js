import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useFetchPhoto() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    try {
      let result = await axios("https://picsum.photos/v2/list?limit=30");
         console.log(result.data);
         setPhotos(result.data);
      
    } catch (error) {
         console.log(error);
         setError("Failed to fetch photos");
    } finally {
         setLoading(false)
    }
  }
  useEffect(()=>{
     fetchPhotos();
  },[])
  return {loading, photos, error};
}

export default useFetchPhoto