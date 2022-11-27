import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';

const AllBuyer = () => {

    const { data: users, isLoading } = useQuery({
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
            <h2 className='text-5xl text-center text-primary my-20'>Manage Doctors</h2>
            <div className="overflow-x-auto">
                <table className="table w-full text-primary text-center">
                    
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
                                            <label className="btn btn-sm">X</label>
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