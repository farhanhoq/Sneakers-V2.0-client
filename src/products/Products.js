import React, { useState } from 'react';
import ProductCard from '../products/PoductCard';
import BookingModal from '../products/BookingModal';
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';
import { useLoaderData } from 'react-router-dom';

const Products = ({params}) => {

    const [product, setProduct] = useState(null);

    const products  = useLoaderData();


    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
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