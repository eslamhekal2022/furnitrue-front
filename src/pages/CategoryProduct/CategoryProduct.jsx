import React from 'react';
import { useProduct } from '../../context/productContext';
import { Link } from 'react-router-dom';
import './categoryProduct.css';

export default function CategoryProduct() {
  const { productCategory } = useProduct();

  return (
    <section className="featured-categories" dir="rtl">
      <div className="container-featuredCat">
        <h2 className="titleHome"> featured categories</h2>
        <div className="categories-grid">
          {productCategory?.map((x) => (
            <Link
              to={`/GetCategories/${x._id}`}
              className="category-card"
              key={x._id}
              aria-label={`انتقل إلى فئة ${x.category}`}
            >
              <img
                src={`${process.env.REACT_APP_API_URL}${x.images[0]}`}
                alt={x.name}
                className="category-image"
              />
              <div className="category-info">
                <h3>{x.category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
