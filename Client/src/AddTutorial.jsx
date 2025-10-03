import React, { useContext } from 'react';
import AuthContext from './Auth/AuthContext';
import Swal from 'sweetalert2';

const AddTutorial = () => {
    const { user } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const language = e.target.language.value;
        const price = e.target.price.value;
        const description = e.target.description.value;
        const photoURL = e.target.photo.value;
        const reviews = 0;
        const active_students = 0;
        const lessons = 0;
        const experience = 0;

        // name
        // reviews
        // price
        // language
        // active_students
        // lessons
        // experience
        // achievements
        // photoURL
        // email


        const data = {
            name,
            reviews,
            price,
            language,
            active_students,
            lessons,
            experience,
            description,
            photoURL,
            email

        }

        fetch('http://localhost:5000/myTutorials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Done",
                    text: "Submitted Successfully",
                    icon: "success",


                });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",

                });
            });
        e.target.reset();
    }
    return (
        <form onSubmit={handleSubmit} className='grid md:grid-cols-2 grid-cols-1 justify-items-center gap-4 my-10 md:mx-auto mx-2  md:w-[45rem] text-center bg-[#fae0c1] md:p-8 p-4 rounded-2xl '>
            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">What is your name?</span>

                </div>
                <input defaultValue={user.displayName} name='name' type="name" placeholder="name" className="input input-bordered w-full  text-white" />
            </div>

            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">Email</span>

                </div>
                <input defaultValue={user.email} name='email' type="email" placeholder="email" className="input input-bordered w-full  text-white" />
            </div>
            <div className="md:col-span-2 w-full ">
                <div className="label">
                    <span className="label-text md:ml-0 text-black">Photo</span>

                </div>
                <input name='photo' type="photo" placeholder="photo url" className="input input-bordered w-full  text-white" />
            </div>
            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">Language</span>

                </div>
                <input name='language' type="language" placeholder="language" className="input input-bordered w-full  text-white" />
            </div>
            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">Price</span>

                </div>
                <input name='price' type="price" placeholder="price" className="input input-bordered w-full   text-white" />
            </div>
            <div className="md:col-span-2 w-full ">
                <div className="label">
                    <span className="label-text md:ml-0 ml-16 text-black">Description</span>

                </div>
                <textarea name='description' className="textarea textarea-bordered  w-full  text-white " placeholder="description"></textarea>
            </div>
            <button className='md:col-span-2 btn md:w-full w-full'>Submit</button>



        </form>
    );
};

export default AddTutorial;