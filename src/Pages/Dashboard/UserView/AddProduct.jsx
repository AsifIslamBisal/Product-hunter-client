import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [externalLink, setExternalLink] = useState("");

  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productImage || !description) {
      alert("Product Name, Image and Description are required");
      return;
    }

    const formData = {
      productName,
      productImage,
      description,
      ownerName: user.displayname,
      ownerImage: user.image,
      ownerEmail: user.email,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      externalLink,
    };

    console.log(formData);
    alert("Product submitted!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mb-1">
          Product Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          placeholder="Product Name"
        />

        <label className="block font-semibold mb-1">
          Product Image <span className="text-red-600">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setProductImage(e.target.files[0])}
          required
        />
        {productImage && (
          <p className="text-sm mb-4 text-gray-600">
            Selected: {productImage.name}
          </p>
        )}

        <label className="block font-semibold mb-1">
          Description <span className="text-red-600">*</span>
        </label>
        <textarea
          className="w-full border rounded px-3 py-2 mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="Product description"
        />

        
        <fieldset disabled className="mb-4 bg-gray-100 p-3 rounded">
          <legend className="font-semibold mb-2">Owner Info</legend>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2 bg-gray-200"
            value={user.displayname}
            readOnly
          />
          <div className="flex items-center mb-2 space-x-3">
            <input
              type="text"
              className="flex-grow border rounded px-3 py-2 bg-gray-200"
              value={user.image}
              readOnly
            />
          </div>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 bg-gray-200"
            value={user.email}
            readOnly
          />
        </fieldset>

        <label className="block font-semibold mb-1">Tags (comma separated)</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tag1, tag2, tag3"
        />

        <label className="block font-semibold mb-1">External Link</label>
        <input
          type="url"
          className="w-full border rounded px-3 py-2 mb-6"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          placeholder="https://example.com"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
