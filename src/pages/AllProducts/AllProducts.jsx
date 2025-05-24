import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./allProducts.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProduct } from "../../context/productContext";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import WhatsAppButton from "../whatsApp/WhatsaAPP.jsx";

export default function AllProducts() {
  const { addToCart,addToWihsList } = useCart();

const {products,categories,activeCategory,setActiveCategory,getAllProducts}=useProduct()
const user=useSelector((x)=>x.user.user)

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/removeProduct/${id}`);
        if (response.data.success) {
          toast.success("User deleted successfully");
          getAllProducts();
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } else {
          toast.error(response.data.message || "Error deleting user");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };










  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="all-products-page">
      
    <div className="category-tabs">
        <button className={`category-tab ${activeCategory === "all" ? "active" : ""}`} onClick={() => setActiveCategory("all")}>
          All
        </button>
        {categories.map((cat, index) => (
          <button key={index} className={`category-tab ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <div key={i} className="product-card">
            <Link id="Link" to={"/ProductDet/"+product._id}>   

              {product.images && product.images.length > 0 ? (
                <img src={`${process.env.REACT_APP_API_URL}${product.images[0]}`} alt={product.name} className="product-image" />
              )
              :
              (
                <p className="no-image"> No image available.</p>
              )}

              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
 {user?.role === "user" ? (
  <p className="product-price">السعر: <span>${product.price + 700}</span></p>
) : (
  <div className="price-box">
  
    <p className="product-price real-price">
     Base Price: <span>${product.price} EGP</span>
    </p>
      <p className="product-price admin-price">
      Selling Price: <span>${product.price + 700} EGP</span>
    </p>
  </div>
)}              </div>
              </Link>

{(user?.role === "admin" || user?.role === "moderator") && (
  <button className="delete-button btnProduct" onClick={() => deleteProduct(product._id)}>
    Remove 🗑
  </button>
)}
              <button className="btn-wishlist  btnProduct" onClick={() => addToWihsList(product._id)}>add to WishList</button>
    <WhatsAppButton product={product} />

              </div>
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}
      </div>
    </div>
  );
}
