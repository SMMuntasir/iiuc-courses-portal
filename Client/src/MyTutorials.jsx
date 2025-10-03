import React, { useContext, useEffect, useState } from 'react';
import { use } from 'react';
import AuthContext from './Auth/AuthContext';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion"
import Swal from 'sweetalert2';

const MyTutorials = () => {

    const { user } = useContext(AuthContext);
    const [myTutorials, setMyTutorials] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/myTutorials?email=${user.email}`)
            .then(response => response.json())
            .then(data => setMyTutorials(data))
    }, [myTutorials]);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,

            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {

            if (result.isConfirmed) {
                fetch(`http://localhost:5000/myTutorials/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },


                }).then(response => response.json())
                    .then(data => Swal.fire("Deleted!", "", "success"))
                    .catch(error => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",

                        });
                    });


            } else if (result.isDenied) {

            }
        });

    }

    return (
        //         Name
        //         image
        //     language
        //     price
        //     description
        //     review
        //     delete button
        // update  button

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-20 justify-items-center">
            {
                myTutorials.map(tutorial => (
                    <motion.div
                        key={tutorial._id}
                        className="relative lg:w-96 h-[30rem] lg:h-[25rem] bg-base-100 shadow-xl rounded-xl overflow-hidden cursor-pointer mb-5"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        {/* Image */}
                        <motion.img
                            src={tutorial.photoURL}
                            alt={tutorial.name}
                            className="lg:w-full w-72 lg:h-full h-72 object-cover"
                            initial={{ opacity: 1 }}
                            whileHover={{ opacity: 0.3 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Details Section */}
                        <motion.div
                            className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-80 text-white lg:mt-0 mt-72 lg:opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{tutorial.name}</h2>
                                <p className="text-lg mb-1">Language: {tutorial.language}</p>
                                <p className="text-lg mb-1">Reviews: ⭐⭐⭐⭐ ({tutorial.review})</p>
                                <p className="text-lg mb-3">Price: {tutorial.price}</p>

                                {/* Buttons Section */}
                                <div className="flex gap-4 mt-2">
                                    <NavLink state={{ id: tutorial._id }} to="/update-tutorial" className="w-1/2">
                                        <motion.button
                                            className="btn btn-primary w-full"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            Update
                                        </motion.button>
                                    </NavLink>
                                    <motion.button
                                        className="btn btn-error w-1/2"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDelete(tutorial._id)}
                                    >
                                        Delete
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))
            }
        </div>

    );
};

export default MyTutorials;