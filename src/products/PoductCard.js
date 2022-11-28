import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';

const PoductCard = ({ product, setProduct }) => {

    const { email, image, pname, sname, sprice, pprice, year, condition, number, location, description, pdate } = product;

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:5001/users", {
                });
                const data = await res.json();
                return data;
            }
            catch (error) {
                
            }
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div key={product._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src={image} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{pname}</h2>
                    <p>{description}</p>

                    <div className='flex justify-between'>
                        <div>
                            <p>Purchase Price: {pprice}</p>
                            <p>Selling Price: {sprice}</p>
                        </div>

                        <div>
                            <p>Purchase Year: {year}</p>
                            <p>Condition: {condition}</p>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div>
                            <div className="flex">
                                <p>Seller: {sname}</p>
                                {
                                    users.map(user => 
                                        user.email === email && user.isVerified &&
                                        <FontAwesomeIcon icon={ faCertificate} />
                                    )
                                }
                            </div>
                            <p>Contact: {number}</p>
                            <p>Location: {location}</p>
                            <p>Posted: {pdate}</p>
                        </div>

                        {
                            users.map(user => 
                                        user.email === email && user.isVerified &&
                            <div className="card-actions justify-end">
                                <label onClick={() => setProduct(product)} htmlFor="booking-modal" className="btn btn-primary text-white">Book Now</label>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoductCard;