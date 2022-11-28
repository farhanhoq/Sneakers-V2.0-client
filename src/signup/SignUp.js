import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../context/AuthProvider';

const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = data => {
        console.log(data)
        createUser(data.email, data.password, data.role)
            .then(res => {
                const user = res.user;
                navigate('/');
                toast("User Created Successfully");
                const userInfo = {
                    displayName: data.name,
                    role: data.role
                }
                updateUser(userInfo)
                    .then(() => { 
                        saveUser(data.name, data.email, data.role)
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => setSignUpError(err.message))
    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch("https://server-side-lac.vercel.app/users", {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {})
    }

    return (
        <div className="h-[800px] flex justify-center items-center">
            <div className='w-96 p-8 border border-secondary'>
                <h2 className="text-xl text-center text-secondary">Sign Up</h2>

                <form onSubmit={handleSubmit(handleSignUp)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Name</span>
                        </label>
                        <input type="text"
                            {...register('name', {
                                required: "Enter Your Full Name"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className='text-error' role="alert">{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">User Type</span>
                        </label>
                        <select type="text"
                            {...register('role')}
                            className="input input-bordered w-full"
                        >
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>
                        <input type="text"
                            {...register('email', {
                                required: "Enter an email"
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text text-black">Password</span>
                        </label>
                        <input type="password"
                            {...register('password', {
                                required: "Give a password",
                                minLength: {value: 10, message: "Password must be 10 to 16 characters long"},
                                maxLength: {value: 16, message: "Password must be 10 to 16 characters long"}
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                    </div>

                    <input type="submit" className='btn btn-accent w-full text-white' value="sign up" />
                    <div>
                        {signUpError && <p className='text-error my-2 text-center font-bold'>{ signUpError }</p>}
                    </div>
                </form>
                <p>Already have an account?   <Link to="/login" className='text-secondary font-bold'>Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full text-secondary'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;