import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const MyProduct = () => {
  const { user } = useAuth();
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products?email=${user.email}`);
        const data = await res.json();
        setMyProducts(data);
      } catch (error) {
        console.error("Failed to fetch my products:", error);
      }
    };

    if (user?.email) {
      fetchMyProducts();
    }
  }, [user?.email]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {myProducts.length === 0 ? (
        <p>No products added by you yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Tags</th>
                <th className="border px-4 py-2">Upvotes</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">
                    <img src={product.imageURL || "https://via.placeholder.com/80"} alt={product.productName} className="w-20 h-20 object-cover" />
                  </td>
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">{product.tags?.join(", ")}</td>
                  <td className="border px-4 py-2">{product.upvotes || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProduct;
