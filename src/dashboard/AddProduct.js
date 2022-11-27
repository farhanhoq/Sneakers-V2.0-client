import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Loading from '../shared/Loading';
import toast from "react-hot-toast";
import { AuthContext } from '../context/AuthProvider';

const AddProduct = () => {

    const {user} = useContext(AuthContext)

    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_bb_key;

    const navigate = useNavigate();

    const { data: categories, isLoading} = useQuery({
        queryKey: ['cateogry'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5001/categories');
            const data = await res.json();
            return data;
        }
    })

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        email: data.email,
                        pname: data.pname,
                        sprice: data.sprice,
                        pprice: data.pprice,
                        year: data.year,
                        condition: data.condition,
                        number: data.number,
                        location: data.location,
                        category: data.category,
                        description: data.description,
                        image: imgData.data.url
                    }

                    fetch("http://localhost:5001/products", {
                    
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${data.name} is added successfully as ${data.speciality}`);
                            navigate('/myproducts')
                    })
            }
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-6 mx-auto bg-white'>
            <p className='text-5xl text-center text-primary my-20'>Add a New Product</p>

            <form onSubmit={handleSubmit(handleAddProduct)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Seller Name</span>
                        </label>
                        <input type="text"
                            {...register('email', {
                                required: "Your Email"
                            })}
                            defaultValue={user?.email}
                            className="input input-bordered w-full"
                            readOnly
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Product Name</span>
                        </label>
                        <input type="text"
                            {...register('pname', {
                                required: "Enter Product Name"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className='text-error' role="alert">{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Price</span>
                        </label>
                        <input type="text"
                            {...register('sprice', {
                                required: "Enter the price"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Purchase Price</span>
                        </label>
                        <input type="number"
                            {...register('pprice', {
                                required: "Enter the Purchase Price"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.pprice && <p className='text-error' role="alert">{errors.pprice?.message}</p>}
                    </div>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Purchase Year</span>
                        </label>
                        <input type="text"
                            {...register('year', {
                                required: "Enter the Purchase Year"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Condition</span>
                        </label>
                    </div>

                    <select
                        {...register('condition')}
                        className="select input-bordered w-full max-w-xs">
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>
                    </select>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Phone Number</span>
                        </label>
                        <input type="text"
                            {...register('number', {
                                required: "Enter your phone number"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Location</span>
                        </label>
                    </div>

                    <select
                        {...register('location')}
                        className="select input-bordered w-full max-w-xs">
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Rajshahi</option>
                            <option>Barisal</option>
                            <option>Khulna</option>
                            <option>Cumilla</option>
                            <option>Sylhet</option>
                    </select>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Category</span>
                        </label>
                    </div>

                    <select
                        {...register('category')}
                        className="select input-bordered w-full max-w-xs">
                            {
                            categories.map(category => 
                                <option key={category._id} value={category.categoryName}>{category.categoryName}</option>)
                            }
                    </select>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Description</span>
                        </label>
                        <textarea type="text"
                            {...register('description', {
                                required: "Enter the description"
                            })}
                            className="w-full textarea textarea-bordered"
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                
                <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Photo</span>
                        </label>
                        <input type="file"
                            {...register('image', {
                                required: "Photo is required"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.img && <p className='text-error' role="alert">{errors.img?.message}</p>}
                    </div>

                    <input type="submit" className='btn btn-accent w-full text-white' value="Add Product" />
                </form>
        </div>
    );
};

export default AddProduct;