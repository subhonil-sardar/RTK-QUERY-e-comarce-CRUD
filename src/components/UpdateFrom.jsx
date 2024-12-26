import React, { useState } from 'react'
import { useUpdateProductsMutation } from '../services/productsApi';
const UpdateFrom = ({product, onCancel}) => {

    const [updatedProduct, setUpdatedProduct ] = useState(product);
    const [updateProduct] = useUpdateProductsMutation();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
       await updateProduct({id: updatedProduct.id, updatedProduct});
        onCancel();
        } catch (error) {
            console.error('Faild to update product :', error)
        }
    }
  return (
    <div>
     <form onSubmit={handleSubmit}>
     <h2>Edit Product</h2>
        <input type="text" placeholder="Title" value={updatedProduct.title} onChange={(e) => setUpdatedProduct({ ...updatedProduct, title : e.target.value})}/>
        <input type="number" placeholder="Price" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price : parseFloat(e.target.value)})} />
        <textarea name="description" cols="30" rows="10" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description : e.target.value})}></textarea>
        <button type='submit'>Save</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
     </form>
    </div>
  )
}

export default UpdateFrom