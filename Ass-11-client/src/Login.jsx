import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import LoginAnima from './assets/Animaiton/Login.json';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { use } from 'react';
import AuthContext from './Auth/AuthContext';




const Login = () => {
    const { createUserByGoogle, signInUser } = useContext(AuthContext);
    const Navigate = useNavigate();
    const location = useLocation();
    const goTo = location.state || '/';

    const popUp = () => {
        createUserByGoogle()
            .then(result => {
                console.log(result.user);
                Navigate(goTo);
            }).catch(error => {
                console.log(error.message);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                Navigate(goTo);
                e.target.reset();
            }).catch(error => {
                console.log(error.message);
            });

        }
        const [show,setShow]=useState(true);
        // console.log(show)
    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                    <div className="text-center lg:text-left md:flex hidden ">

                        <Lottie className='w-[27rem]' animationData={LoginAnima}></Lottie>
                    </div>
                    <div className="card  w-full max-w-sm shrink-0 shadow-2xl bg-[#fae0c1] text-[#09050e]">
                        <form onSubmit={handleSubmit} className="card-body">
                            <h1 className="card-title pb-4">Login now!</h1>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-[#09050e] ">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered text-white" required />
                            </div>
                            <label className="input input-bordered flex items-center gap-2">
                                <input name='password' type={`${show?'password':'text'}`} className="grow text-white" placeholder="password" />
                                
                                <kbd onClick={()=>setShow(!show)} className="kbd kbd-sm">👁️‍🗨️</kbd>
                            </label>
                            <div className="form-control mt-6 ">
                                <button className="btn btn-primary ring-offset-2 hover:ring-4">Login</button>
                            </div>
                            <div className="divider divider-primary">OR</div>
                            <button onClick={popUp} className="btn btn-primary ring-offset-2 hover:ring-4">Google</button>
                            <NavLink to='/registration'><button className="btn btn-primary w-full ring-offset-2 hover:ring-4">Registration</button></NavLink>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;