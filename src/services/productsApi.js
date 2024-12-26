import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath : "productsApi",
    baseQuery : fetchBaseQuery({baseUrl: "http://localhost:3000/"}),
    tagTypes : ['Product'],

    endpoints : (builder) => ({
        getProducts : builder.query({
            query: () => 'products',
            providesTags : (results) => results ? [...results.map(({id}) => ({type : 'Product', id})), {type: 'Product', id : 'LIST'}] : [{type : 'Product', id: 'LIST'}]
        }), 
        deleteProducts : builder.mutation({
            query: (id) => ({
                url : `products/${id}`,
                method : 'DELETE'
            }),
            invalidatesTags :(results, error, id) =>[{type : 'Product', id}],
        }), 
        addProducts : builder.mutation({
            query: (body) => ({
                url : `products/`,
                method : 'POST',
                body,
            }),
            invalidatesTags :[{type : 'Product', id: 'LIST'}],
        }), 
        updateProducts : builder.mutation({
            query: ({id, updatedProduct}) => ({
                url : `products/${id}`,
                method : 'PUT',
                body : updatedProduct,
            }),
            invalidatesTags : (results, error, {id}) =>[{type : 'Product', id}],
        }), 
    }),
});

 export const { useGetProductsQuery, useDeleteProductsMutation, useAddProductsMutation, useUpdateProductsMutation }  = productsApi;

 //npx json-server -p 3000 -w database/db.json