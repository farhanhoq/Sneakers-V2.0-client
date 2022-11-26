import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../products/PoductCard';
import BookingModal from '../products/BookingModal';

const Products = () => {

    const products = useLoaderData();

    console.log(products)

    return (
        <div>
            {
                products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                ></ProductCard>)
            }
            {
                products.map(product => <BookingModal
                    key={product._id}
                    product={product}
                ></BookingModal>)}
        </div>
    );
};

export default Products;