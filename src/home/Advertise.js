import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useQuery } from "@tanstack/react-query";

const Advertise = () => {

    const { user } = useContext(AuthContext);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/allproducts`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                // }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            {
                products.map(product => 
                    product.advertised &&

                    <div className="carousel w-full">
                        <div id="slide1" className="carousel-item relative w-full">
                        <img src={product.image} className="w-full" alt=""/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle">
                            ❮
                            </a>
                            <a href="#slide2" className="btn btn-circle">
                            ❯
                            </a>
                        </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full">
                        <img src={product.image} className="w-full" alt=""/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">
                            ❮
                            </a>
                            <a href="#slide3" className="btn btn-circle">
                            ❯
                            </a>
                        </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full">
                        <img src="https://placeimg.com/800/200/arch" className="w-full" alt=""/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">
                            ❮
                            </a>
                            <a href="#slide4" className="btn btn-circle">
                            ❯
                            </a>
                        </div>
                        </div>
                        <div id="slide4" className="carousel-item relative w-full">
                        <img src="https://placeimg.com/800/200/arch" className="w-full" alt=""/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle">
                            ❮
                            </a>
                            <a href="#slide1" className="btn btn-circle">
                            ❯
                            </a>
                        </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Advertise;