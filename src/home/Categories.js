import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Loading from '../shared/Loading';

const Categories = () => {

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch("https://server-side-lac.vercel.app/categories");
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
            <div className="">
                <table className="table w-full text-center">

                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                        categories.map(category => 
                            <tr key={category._id}><Link to={`/categories/${category.c_ID}`}>{category.categoryName}</Link></tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
    );
};

export default Categories;