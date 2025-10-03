import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AuthContext from './Auth/AuthContext';
import { motion } from "framer-motion"
import Swal from 'sweetalert2';

const MyTutor = () => {
    const { user } = useContext(AuthContext);
    const [bookedTutors, setBookedTutors] = useState([]);
    const handleUpdate = (e) => {
        fetch(`http://localhost:5000/myBookedTeacher?email=${e}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Done",

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

    useEffect(() => {
        fetch(`http://localhost:5000/myBookedTeacher?email=${user.email}`)
            .then(response => response.json())
            .then(data => setBookedTutors(data))
    }, [user.email]);

    // name,image, language,price,and review button

    // console.log("Booked Tutors =", bookedTutors);
    return (

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-20 justify-items-center">
            {
                bookedTutors.map(tutor => (
                    <motion.div
                        key={tutor._id}
                        className="relative lg:w-96 h-[30rem] lg:h-[25rem] bg-base-100 shadow-xl rounded-xl overflow-hidden cursor-pointer mb-5"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        {/* Image */}
                        <motion.img
                            src={tutor.tutorPhoto}
                            alt={tutor.name}
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
                                <h2 className="text-2xl font-bold mb-2">{tutor.name}</h2>
                                <p className="text-lg mb-1">Language: {tutor.language}</p>
                                <p className="text-lg mb-3">Price: {tutor.Price}</p>

                                {/* Details Button */}
                                <motion.button
                                    className="btn btn-primary w-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleUpdate(tutor.tutorEmail)}
                                >
                                    Review
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                ))
            }
        </div>

    );
};

export default MyTutor;