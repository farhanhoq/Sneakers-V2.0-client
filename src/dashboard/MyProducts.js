import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../context/AuthProvider';
import toast from "react-hot-toast";
import Loading from '../shared/Loading';

const MyProducts = () => {

    const { user } = useContext(AuthContext);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/products/${user?.email}`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                // }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteProduct = product => {
        fetch(`http://localhost:5001/products/${product._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleteCount > 0) {
                    toast.success(`Doctor ${product.name} has been removed.`)
                    refetch();
                }
            })
    }

    const handleAdvertise = id => {
        fetch(`http://localhost:5001/products/${id}`, {
            method: 'PUT',
            headers: {
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleteCount > 0) {
                    toast.success(`Advertise Done`)
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
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
                                {
                                    product.status === "Sold" ?
                                    <td>Sold</td>
                                    :
                                    <td>Available</td>
                                }
                                <td>
                                    <label onClick={() => handleDeleteProduct(product)}  className="btn btn-sm">X</label>
                                </td>
                                {
                                    product.status === "Available" &&
                                    <td>
                                        <label onClick={() => handleAdvertise(product._id)} className="btn btn-sm">Advertise</label>
                                    </td>
                                }
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