import React, { useState } from 'react';
import { useDeleteProductsMutation, useGetProductsQuery } from '../services/productsApi';
import './style.css';
import UpdateForm from './UpdateFrom';

const ProductView = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductsMutation();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const handleCancel = () => {
    setEditingProduct(null); // এডিট মোড বন্ধ
  };

  return (
    <div>
      <h1>List of Products</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && products && products.length > 0 && (
        <section className="products">
          {products.map((product) => (
            <div key={product.id} className="product">
              {editingProduct?.id === product.id ? (
                <UpdateForm product={product} onCancel={handleCancel} />
              ) : (
                <>
                  <h3>{product.title}</h3>
                  <strong>{product.price}</strong>
                  <p>{product.description}</p>
                  <button onClick={() => setEditingProduct(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ProductView;
