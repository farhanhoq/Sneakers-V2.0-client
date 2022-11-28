import React, { useState } from 'react';
import ProductCard from '../products/PoductCard';
import BookingModal from '../products/BookingModal';
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';
import { useLoaderData } from 'react-router-dom';

const Products = ({params}) => {

    const [product, setProduct] = useState(null);

    const products  = useLoaderData();

    // const { data: products = [], isLoading, refetch } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5001/products/${params.id}`, {
    //             // headers: {
    //             //     authorization: `bearer ${localStorage.getItem('accessToken')}`
    //             // }
    //         });
    //         console.log(res)
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    // if (isLoading) {
    //     return <Loading></Loading>
    // }


    return (
        <div className='grid grid-cols-3 gap-6'>
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