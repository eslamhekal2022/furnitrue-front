import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import './GetFilterCat.css';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function GetFilterCat({ category }) {
  const [data, setdata] = useState([]);

  const user=useSelector((x)=>x.user.user)
  async function getBYCategory() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getProductsCat/${category}`);
    
      if (data.success) {
        setdata(data.data);
        console.log("dataFilterCat", data.data);
      }

    } catch (error) {
      toast.error("An error occurred while fetching the data.");
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    if (category) {
      getBYCategory();
    }
  }, [category]);

  return (
    <div className='GetProductsCat'>
      <div className="ContainerGetProductsCat">
        {data?.map((x, i) => (
          <Link to={`/ProductDet/${x._id}`} className='LinkProductDet' id='Link' key={x._id}>
            <div className='productFilterCat'>
              <img
                src={`${process.env.REACT_APP_API_URL}${x.images[0]}`}
                alt={x.name}
                className="product-image"
              />
              <p>{x.name}</p>
              <p title={x.description}>{x.description.slice(0, 40)}...</p>
 {user?.role === "user" ? (
  <p className="product-price">السعر: <span>${x.price + 700}</span></p>
) : (
  <div className="price-box">
  
    <p className="product-price real-price">
     APrice: <span>${x.price} EGP</span>
    </p>
      <p className="product-price admin-price">
      UPrice: <span>${x.price + 700} EGP</span>
    </p>
  </div>
)}             </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
