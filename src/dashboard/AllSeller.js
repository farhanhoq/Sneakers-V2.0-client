import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';
import toast from "react-hot-toast";

const AllSeller = () => {
    
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
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleteCount > 0) {
                    toast.success(`Buyer ${user.name} has been removed.`)
                    refetch();
                }
            })
    }

    const handleVerifySeller = user => {
        fetch(`http://localhost:5001/users/${user._id}`, {
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
        <div>
            <h2 className='text-5xl text-center text-primary my-20'>Manage Doctors</h2>
            <div className="overflow-x-auto">
                <table className="table w-full text-primary text-center">
                    
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user, i) => 
                                <tr key={user._id}>
                                    {
                                        user.role === "Seller" &&
                                        <>
                                        <th>{i+1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        {
                                            user.isVerified ? 
                                                <td>
                                                    <label className="btn btn-sm">Verified</label>
                                                </td>
                                                :
                                                <td>
                                                    <label onClick={() => handleVerifySeller(user)} className="btn btn-sm">Verify</label>
                                                </td>
                                        }
                                        <td>
                                            <label onClick={() => handleDeleteUser(user)} className="btn btn-sm">X</label>
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

export default AllSeller;