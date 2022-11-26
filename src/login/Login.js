import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useForm } from "react-hook-form";

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const handleLogin = data => {
        // console.log(data)
        setLoginError('')
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                navigate(from, { replace: true });
            })
            .catch(err => {
                setLoginError(err.message);
            })
        }

        const handleGoogleSignIn = () => {
            googleSignIn()
            .then(res => {
                navigate('/');
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="h-[800px] flex justify-center items-center">
            <div className='w-96 p-8 border border-secondary'>
                <h2 className="text-xl text-center text-secondary">Login</h2>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>
                        <input type="text"
                            {...register("email", { required: "Email address is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: "Give a valid password",
                                minLength: { value: 10, message: "Your password must be 10 characters long" },
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text text-black text-xs">Forgot Password?</span>
                        </label>
                    </div>
                    <input type="submit" className='btn btn-accent w-full text-white' value="login"/>
                    <div>
                        {loginError && <p className='text-error my-2 text-center font-bold'>{ loginError } <br /> Your Password is Wrong</p>}
                    </div>
                </form>
                <p>New to Doctors Portal?<Link to="/register" className='text-secondary font-bold'>Create an account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full text-secondary' onClick={handleGoogleSignIn}>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;