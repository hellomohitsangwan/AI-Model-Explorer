import React from 'react'
import axios from 'axios';

const CreatorProductData = async (token) => {
    const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axios.get(`https://procommerce.onrender.com/api/products/myproducts`,config);
      return data;
      
}

export default CreatorProductData
