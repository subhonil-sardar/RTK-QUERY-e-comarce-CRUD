import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import { useAddProductsMutation } from '../services/productsApi';
const ProductForm = () => {
  
    const [product, setProduct] = useState({
        title :  "",
        description :  "",
        price : "",
    });

    const [addProduct] = useAddProductsMutation();

    const handleChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
    });
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        try {
            await addProduct({...product, id : nanoid()});
            setProduct({title: '', description : '', price :'',})
        } catch (error) {
            console.log('Faild to save product',error);
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" name='title' value={product.title} onChange={handleChange} />
            </div>
            <div>
                <label>Price</label>
                <input type="number" name='price' value={product.price} onChange={handleChange} />
            </div>
            <div>
                <label>Description</label>
                <textarea  name='description' value={product.description} onChange={handleChange} />
            </div>
            <div>
            </div>
            <div>
                <button type="submit">Add Product</button>
            </div>
        </form>
    </div>
  )
}

export default ProductForm