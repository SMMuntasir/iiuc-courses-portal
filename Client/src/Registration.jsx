import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import AuthContext from './Auth/AuthContext';
import RegistrationD from './assets/Animaiton/Registration.json';
import { useScroll } from 'motion/react';
const Registration = () => {
    const { createUser } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;
        // console.log(name, email, password, photo);
        const profile = {
            displayName: name,
            photoURL: photo
        }

        createUser(email, password, profile)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
        e.target.reset();
    }
    const [show,setShow]=useState(true)
    return (
        <div>
            <div className="hero  min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    
                    <div className="card  w-full max-w-sm shrink-0 shadow-2xl bg-[#f3c5c5] text-[#09050e]">
                        <form onSubmit={handleSubmit} className="card-body ">
                            <h1 className="card-title pb-4">Registration</h1>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-[#09050e]">Name</span>
                                </label>
                                <input name='name' type="name"  placeholder="name" className="input input-bordered text-white" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-[#09050e]">Email</span>
                                </label>
                                <input name='email' type="email"  placeholder="email" className="input input-bordered text-white" required />
                            </div>
                            <label className="label">
                                    <span className="label-text text-[#09050e]">Password</span>
                                </label>
                            <label className="input input-bordered flex items-center gap-2">
                            
                                <input name='password' type={`${show?'password':'text'}`} className="grow text-white" placeholder="password" />
                                
                                <kbd onClick={()=>setShow(!show)} className="kbd kbd-sm">👁️‍🗨️</kbd>
                            </label>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-[#09050e]">Photo URL</span>
                                </label>
                                <input name='photo' type="photo"  placeholder="photo URL" className="input input-bordered text-white" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary ring-offset-2 hover:ring-4">Registration</button>
                            </div>

                        </form>
                    </div>
                    <div className="text-center lg:text-left md:flex hidden">

                        <Lottie className='w-[27rem] ' animationData={RegistrationD}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;