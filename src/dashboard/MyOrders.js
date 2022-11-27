import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../context/AuthProvider';
import toast from "react-hot-toast";

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/bookings?email=${user?.email}`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                // }
            });
            const data = await res.json();
            return data;
        }
    })

    const handlePayment = id => {
        fetch(`http://localhost:5001/products/${id}`, {
            method: 'put',
            headers: {
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleteCount > 0) {
                    toast.success(`Payment Done`)
                    refetch();
                }
            })
    }

    return (
        <div>
            <p className='text-5xl text-center text-primary my-20'>My Appointments</p>
            <div className="overflow-x-auto">
            <table className="table w-5/6 text-primary mx-auto">
                
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                        
                    {
                        bookings?.map((booking, index) => 
                            <tr>
                                <th>{index+1}</th>
                                <td>{booking.pname}</td>
                                <td>{booking.sprice}</td>
                                <td>
                                    <label onClick={() => handlePayment(booking.product_id)} className="btn btn-sm">Pay</label>
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

export default MyOrders;