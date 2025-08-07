import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './Auth/AuthContext';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { div } from 'motion/react-client';

const UpdateTutorial = () => {
    const [TutorDetail, setTutorDetail] = useState([]);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { id } = location.state || {};
    // console.log(id);



    useEffect(() => {
        fetch(`http://localhost:5000/tutor/${id}`)
            .then(response => response.json())
            .then(data => setTutorDetail(data))
    }, []
    );

    // console.log(TutorDetail)


    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const language = e.target.language.value;
        const price = e.target.price.value;
        const description = e.target.description.value;
        const photoURL = e.target.photo.value;

        const data = {
            name,
            price,
            language,
            description,
            photoURL,
            email

        }
        // console.log(data);
        Swal.fire({
            title: "Do you want update the changes?",
            showDenyButton: true,

            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/UpdateTutorials/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                    .then(data => {
                        Swal.fire("Done", "", "success");
                    })
                    .catch(error => {
                        
                    });
            } else if (result.isDenied) {

            }
        });


        // name
        // reviews
        // price
        // language
        // active_students
        // lessons
        // experience
        // achievements
        // photoURL
    }
    return (
        <div>

<form onSubmit={handleUpdate} className='grid md:grid-cols-2 grid-cols-1 justify-items-center gap-4 my-10 md:mx-auto mx-2  md:w-[45rem] text-center bg-[#fae0c1] md:p-8 p-4 rounded-2xl '>
            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">What is your name?</span>

                </div>
                <input defaultValue={TutorDetail.name} name='name' type="name" placeholder="name" className="input input-bordered w-full  text-white" />
            </div>

            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">Email</span>

                </div>
                <input  name='email' type="email" defaultValue={TutorDetail.email} placeholder="email" className="input input-bordered w-full  text-white" />
            </div>
            <div className="md:col-span-2 w-full ">
                <div className="label">
                    <span className="label-text md:ml-0 text-black">Photo</span>

                </div>
                <input name='photo' type="photo" defaultValue={TutorDetail.photoURL} placeholder="photo url" className="input input-bordered w-full  text-white" />
            </div>
            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">Language</span>

                </div>
                <input name='language' type="language" defaultValue={TutorDetail.language} placeholder="language" className="input input-bordered w-full  text-white" />
            </div>
            <div className='w-full'>
                <div className="label">
                    <span className="label-text text-black">Price</span>

                </div>
                <input name='price' type="price" defaultValue={TutorDetail.price} placeholder="price" className="input input-bordered w-full   text-white" />
            </div>
            <div className="md:col-span-2 w-full ">
                <div className="label">
                    <span className="label-text md:ml-0 ml-16 text-black">Description</span>

                </div>
                <textarea name='description' className="textarea textarea-bordered  w-full  text-white " defaultValue={TutorDetail.description} placeholder="description"></textarea>
            </div>
            <button className='md:col-span-2 btn md:w-full w-full'>Submit</button>



        </form>

        
        </div>

    );
};

export default UpdateTutorial;