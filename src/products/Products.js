import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../products/PoductCard';
import BookingModal from '../products/BookingModal';

const Products = () => {

    const products = useLoaderData();

    const [product, setProduct] = useState(null);

    return (
        <div>
            {
                products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    setProduct={setProduct}
                ></ProductCard>)
            }
            {
                product &&
                <BookingModal
                    product={product}
                    setProduct={setProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default Products;