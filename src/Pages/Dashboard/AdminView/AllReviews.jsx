import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AllReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosPublic.get('/reviews')
      .then(res => {
        console.log('Fetched Reviews:', res.data);
        setReviews(Array.isArray(res.data) ? res.data : []);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [axiosPublic]);

  const handleDelete = (id) => {
    axiosPublic.delete(`/reviews/${id}`)
      .then(() => {
        const filtered = reviews.filter(review => review._id !== id);
        setReviews(filtered);
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Reviews</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Comment</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <tr key={review._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  {/* যদি review.comment না থাকে, তাহলে review.review দেখাবে */}
                  <td className="px-4 py-2 border">{review.comment || review.review || 'No comment'}</td>
                  {/* যদি ইউজার ডাটা না থাকে, তাহলে খালি দেখাবে */}
                  <td className="px-4 py-2 border">{review.user || 'Anonymous'}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
