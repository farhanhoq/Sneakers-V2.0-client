import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';
import toast from "react-hot-toast";

const AllBuyer = () => {

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

    const handleDeleteUser = user => {
        fetch(`http://localhost:5001/users/${user._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleteCount > 0) {
                    toast.success(`Buyer ${user.name} has been removed.`)
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-20'>
            <h2 className='text-5xl text-center text-red-600 my-20'>All Buyers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full text-red-600 text-center">
                    
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user, i) => 
                                <tr key={user._id}>
                                    {
                                        user.role === "Buyer" &&
                                        <>
                                        <th>{i+1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <label onClick={() => handleDeleteUser(user)} className="btn btn-sm bg-red-600">X</label>
                                        </td>
                                        </>
                                    }
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;