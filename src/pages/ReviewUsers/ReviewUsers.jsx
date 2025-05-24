import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ReviewUser.css';
import { useSelector } from 'react-redux';

export default function ReviewUsers() {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [editedRating, setEditedRating] = useState(5);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getAllReview();
  }, []);

  async function getAllReview() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getAllReview`);
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch reviews");
      console.error(error);
    }
  }

  async function deleteReview(id) {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteReview/${id}`);
      if (data.success) {
        toast.success("Review deleted successfully");
        getAllReview();
      }
    } catch (error) {
      toast.error("Failed to delete review");
      console.error(error);
    }
  }

  async function handleEdit(id) {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/updateReview/${id}`, {
        comment: editedComment,
        rating: editedRating
      });
      if (data.success) {
        toast.success("Review updated successfully");
        setEditingReviewId(null);
        getAllReview();
      }
    } catch (error) {
      toast.error("Failed to update review");
      console.error(error);
    }
  }

  if (!user) return <p className="loading">Loading user data...</p>;

  return (
    <div className="ReviewUsers">
      <h1 className="titleHome">Testimonials</h1>
      <div className="review-container">
        {reviews.filter(review => review.userId).length === 0 ? (
          <p className="no-reviews">No reviews available at the moment.</p>
        ) : (
          reviews
            .filter(review => review.userId)
            .map((review) => (
              <div className="review-card" key={review._id}>
                {user?.id === review.userId._id && (
                  <div className="actions">
                    <p className='DeleteRev' onClick={() => deleteReview(review._id)}>x</p>
                    <p className='EditRev' onClick={() => {
                      setEditingReviewId(review._id);
                      setEditedComment(review.comment);
                      setEditedRating(review.rating);
                    }}>✏️</p>
                  </div>
                )}

                <img
                  className='user-image'
                  src={
                    review.userId?.image
                      ? review.userId.image.startsWith("http")
                        ? review.userId.image
                        : `${process.env.REACT_APP_API_URL}${review.userId.image}`
                      : `https://ui-avatars.com/api/?name=${review.userId?.name || 'User'}&background=random&color=fff`
                  }
                  alt={review?.name || "User"}
                />

                <h3 className="user-name">{review.userId.name}</h3>

                {editingReviewId === review._id ? (
                  <div className="edit-form">
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                       onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // يمنع إنشاء سطر جديد
          handleEdit(review._id);
        }
      }}
                      rows={3}
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={editedRating}
                      onChange={(e) => setEditedRating(Number(e.target.value))}
                       onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleEdit(review._id);
        }
      }}
                  />
                    <button className='saveEdit' onClick={() => handleEdit(review._id)}>Save</button>
                    <button  className="canelEdit" onClick={() => setEditingReviewId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p className="rating">Rating: {review.rating} ⭐</p>
                    <p className="comment">“{review.comment}”</p>
                  </>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
