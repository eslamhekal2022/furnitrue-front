import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './wishList.css'; // ملف الستايل الخارجي
import { useCart } from '../../context/CartContext';
import WhatsAppButton from '../whatsApp/WhatsaAPP';

export default function WishList() {

const {wishList,removeWishList,addToCart}=useCart()



  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Favorites list</h2>
      <div className="wishlist-grid">
        {wishList.length === 0 ? (
          <p className="empty-message">No products in favorites</p>
        ) : (
          wishList.map((product) => (
            <div className="wishlist-item" key={product._id}>
              
              <img
                    src={`${process.env.REACT_APP_API_URL}${product.images[0]}`}
                    alt={product.name}
                    className="wishlist-image"
                  />
              <h3 className="wishlist-name">{product.name}</h3>
              <p className="wishlist-price">{product.price} EGP</p>
              <button className="delete-button btnProduct" onClick={() => removeWishList(product._id)}>Remove</button>
    <WhatsAppButton product={product} />

              </div>
          ))
        )}
      </div>
    </div>
  );
}
