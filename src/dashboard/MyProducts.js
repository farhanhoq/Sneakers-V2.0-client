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
            const res = await fetch(`https://server-side-lac.vercel.app/products?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteProduct = product => {
        fetch(`https://server-side-lac.vercel.app/allproducts/${product._id}`, {
            method: 'DELETE'
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
        fetch(`https://server-side-lac.vercel.app/allproducts/advertise/${id}`, {
            method: 'PUT'
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
        <div className='text-red-600 my-20'>
            <p className='text-5xl text-center my-20'>My Products</p>
            <div className="overflow-x-auto">
            <table className="table w-5/6 mx-auto">
                
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
                                    <label onClick={() => handleDeleteProduct(product)}  className="btn btn-sm bg-red-600" bg-red-600>X</label>
                                </td>
                                {
                                    product.status === "Available" &&
                                    <td>
                                        <label onClick={() => handleAdvertise(product._id)} className="btn btn-sm bg-red-600">Advertise</label>
                                    </td>
                                }
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