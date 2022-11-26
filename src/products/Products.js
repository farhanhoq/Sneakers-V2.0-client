import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../products/PoductCard';
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
        </div>
    );
};

export default Products;