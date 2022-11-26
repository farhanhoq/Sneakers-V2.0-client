import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';

const PoductCard = ({ product }) => {

    return (
        <div className='grid grid-cols-3 gap-6'>
            <div key={product._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.pname}</h2>
                    <p>{product.location}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoductCard;