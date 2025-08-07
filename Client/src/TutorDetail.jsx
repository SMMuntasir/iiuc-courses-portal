import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import AuthContext from './Auth/AuthContext';
import { div } from 'motion/react-client';
import Swal from 'sweetalert2'

const TutorDetail = () => {
    const { user } = useContext(AuthContext);
    const tutorT = useLoaderData();
    // console.log("Tutor Details =", tutorT);
    // const handleMessage = () => {
    //     console.log("hi")
    // }
    const schedule = [{
        day: {
            date: "19/2/2024"
        }
    }]

    const handleBook = (e) => {
        e.preventDefault();


        // tutorId(this id will be _id of  tutor)
        // Image
        // language
        // Pirce
        // tutorEmail(who add this tutorial)
        // email(who logged in)


        const data = {
            name: tutorT.name,
            tutorId: tutorT._id,
            language: tutorT.language,
            tutorPhoto: tutorT.photoURL,
            Price: tutorT.price,
            tutorEmail: tutorT.email,
            bookedEmail: user.email
        }
        // console.log(data);
        fetch('http://localhost:5000/bookedTeacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Done",
                    text: "Successfully Booked",
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
    }
    return (


        <div className="card  shadow-xl md:p-16 p-4 rounded-lg lg:mx-40 my-10 md:mx-16 mx-2">
            <div className="md:flex md:flex-row flex flex-col  ">
                <div className='relative rounded-full'>

                    <img
                        src={tutorT.photoURL}
                        alt="TutorT"
                        className="md:size-72 size-56  rounded-full ring-[5px] ring-offset-2 md:mx-0 mx-auto  ring-blue-950 object-cover lg:ml-10 "
                    />
                    <span className="size-10 text-center border-2 absolute bottom-10 right-0 bg-[#615f5f] p-1 text-white rounded-full">
                        Hi
                    </span>
                </div>
                <div className="lg:ml-20 md:ml-14 mt-10">
                    <h1 className="text-4xl font-bold text-blue-700">{tutorT.name}</h1>
                    <p className="text-gray-500 text-xl">Language : {tutorT.language}</p>
                </div>
            </div>
            <h2 className="text-3xl font-semibold mt-14">Details</h2>
            <div className="grid md:grid-cols-2 gap-3 grid-cols-1  mt-6  ">
                <div className='flex flex-col'>
                    <h2 className="text-2xl font-semibold bg-slate-500 rounded-md py-1 px-2   ">Language</h2>
                    <p className='mt-2 text-xl'> {tutorT.language}</p>
                    <h2 className="text-2xl font-semibold bg-slate-500 rounded-md py-1 px-2 mt-4">Experience</h2>
                    <p className='mt-2 text-xl'> {tutorT.experience}</p>
                    {tutorT.achievements ? <div>
                        <h2 className="text-2xl font-semibold bg-slate-500 rounded-md py-1 px-2 ">Achievements</h2>
                        <p> {tutorT.achievements}</p>
                    </div> : null
                    }
                    <h2 className="text-2xl font-semibold bg-slate-500 rounded-md py-1 px-2 mt-4">Active Students</h2>
                    <p className='mt-2 text-xl '>{tutorT.active_students}</p>
                </div>
                <div className='flex flex-col '>
                    <h2 className="text-2xl font-semibold bg-slate-500 rounded-md py-1 px-2  ">Lessons</h2>
                    <p className='mt-2 text-xl'> {tutorT.lessons}</p>
                    <h2 className="text-2xl font-semibold bg-slate-500 rounded-md py-1 px-2 mt-4">Price</h2>
                    <p className='mt-2 text-xl'> ${tutorT.price}</p>
                    <h2 className="text-2xl font-semibold bg-slate-500 rounded-md py-1 px-2 mt-4">Reviews</h2>
                    <p className='mt-2 text-xl'>{tutorT.reviews} Reviews</p>
                </div>

            </div>
            <div className="mt-6 ">

                <div className="flex items-center">
                    {/* <p className="text-yellow-500">{tutorT.reviews}</p> */}

                </div>
            </div>
            <div className="mt-6 flex justify-between ">
                <button className="btn btn-primary w-full ring-offset-2 hover:ring-4" onClick={handleBook}>Book </button>

            </div>

        </div>


    );
};

export default TutorDetail;