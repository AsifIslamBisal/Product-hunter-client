import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchProduct = () => {
    axiosPublic.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      })
      .catch(err => {
        console.error('Failed to load product:', err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [axiosPublic, id]);

  const handleUpvote = () => {
    axiosPublic.patch(`/products/upvote/${id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Thank You!',
            text: 'You have voted।',
            timer: 2000,
            showConfirmButton: false,
          });
          fetchProduct();
        }
      });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) return;

    axiosPublic.post(`/reviews/${id}`, { review })
      .then(res => {
        if (res.data.insertedId || res.data.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Review added!',
            timer: 2000,
            showConfirmButton: false,
          });
          setReview('');
          fetchProduct();
        }
      });
  };

  if (!product) {
    return <span className="loading loading-spinner text-warning"></span>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <button onClick={handleUpvote} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            ⬆️ Upvote ({product.upvotes || 0})
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            🚩 Report
          </button>
        </div>

        {product.externalLinks?.website && (
          <a
            href={product.externalLinks.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            Visit Website
          </a>
        )}

        {product.externalLinks?.github && (
          <a
            href={product.externalLinks.github}
            target="_blank"
            rel="noreferrer"
            className="ml-4 text-gray-800 underline"
          >
            GitHub
          </a>
        )}

        {/* Review Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Leave a review</h3>
          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="border rounded p-2 h-24 resize-none"
              placeholder="Write your review..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start"
            >
              Submit Review
            </button>
          </form>

          {/* Show All Reviews */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">All Reviews</h4>
            {reviews.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {reviews.map((rev, idx) => (
                  <li key={idx}>{rev}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">There are no reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
