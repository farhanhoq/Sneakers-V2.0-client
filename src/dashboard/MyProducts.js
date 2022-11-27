import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const MyProducts = () => {

    const { user } = useContext(AuthContext);

    const { data: products = [] } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/products?email=${user?.email}`, {
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
            <p className='text-5xl text-center text-primary my-20'>My Appointments</p>
            <div className="overflow-x-auto">
            <table className="table w-5/6 text-primary mx-auto">
                
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Purchase Price</th>
                    <th>Selling Price</th>
                    <th>Staus</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                        
                    {
                        products?.map((product, index) => 
                            <tr>
                                <th>{index+1}</th>
                                <td>{product.pname}</td>
                                <td>{product.pprice}</td>
                                <td>{product.sprice}</td>
                                <td>Available</td>
                                <td>
                                    <label className="btn btn-sm">X</label>
                                </td>
                                <td>
                                    <label className="btn btn-sm">Advertise</label>
                                </td>
                                {/* <td>
                                    {
                                        booking.price && !booking.paid && 
                                        <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary btn-sm'>Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && 
                                        <button className='btn btn-primary'>{booking.price}</button>
                                    }
                                </td> */}
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default MyProducts;