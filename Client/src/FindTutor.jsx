import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from
    'react-router-dom';
import { motion } from "framer-motion"
import { div } from 'motion/react-client';


const FindTutor = () => {

    const Navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        const word = e.target.search.value;
        const searchS = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        // console.log(searchS);
        Navigate(`/find-tutors?Language=${searchS}`)
    }

    const [param] = useSearchParams();
    let language = param.get("Language");

    // console.log("Outside", language);

    const [tutors, setTutors] = useState([]);
    useEffect(() => {
        // console.log("inside E", language);

        // Use dynamic URL based on language
        const url = language
            ? `https://iiuc-courses-portal-1.onrender.com/tutors?Language=${language}`
            : `https://iiuc-courses-portal-1.onrender.com/tutors`;

        fetch(url)
            .then(response => response.json())
            .then(data => setTutors(data))
            .catch(err => console.log(err));

    }, [language]);




    return (
        <div className='relative'>

            <div className='relative flex justify-center'>
                <form onSubmit={handleSearch} className="input input-bordered flex items-center gap-2 md:w-[35rem]">
                    <input name='search' type="text" className="grow" placeholder="Course" />
                    <button type="submit" className='btn bg-[#404040]'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  md:mx-20 justify-items-center mt-20">

                {
                    tutors.map((tutor) => (
                        <motion.div
                            key={tutor._id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                                type: 'tween'
                            }}
                        >
                            <motion.div
                                className="relative lg:w-96 h-[30rem] lg:h-[25rem] bg-base-100 shadow-xl rounded-xl overflow-hidden cursor-pointer mb-5"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {/* Image */}
                                <motion.img
                                    src={tutor.photoURL}
                                    alt={tutor.name}
                                    className="lg:w-full w-72 lg:h-full h-72 object-cover"
                                    initial={{ opacity: 1 }}
                                    whileHover={{ opacity: 0.3 }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Details Section */}
                                <motion.div
                                    className="absolute inset-0 flex flex-col  justify-end p-4 bg-black bg-opacity-80 text-white lg:mt-0 mt-72 lg:opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className=''>

                                        <h2 className="text-2xl font-bold mb-2">{tutor.subject_name}</h2>
                                        <p className="text-lg mb-1">Lecturer : {tutor.course_teacher}</p>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <button class="btn btn-active btn-neutral min-h-0 h-9"><img src="/src/assets/Icons/join.png" alt="" className='size-5'/>{tutor.students_joined} Joined</button>
                                            <button class="btn btn-active btn-neutral min-h-0 h-9"><img src="/src/assets/Icons/lesson.png" alt="" className='size-5'/>{tutor.lessons}+ Lessons</button>
                                            <button class="btn btn-active btn-neutral min-h-0 h-9"><img src="/src/assets/Icons/assignment.png" alt="" className='size-5'/>{tutor.assignments}+ Assignments</button>
                                            <button class="btn btn-active btn-neutral min-h-0 h-9"><img src="/src/assets/Icons/project-management.png" alt="" className='size-5'/>{tutor.projects}+ Projects</button>
                                        </div>
                                        {/* Details Button */}
                                        <NavLink to={`/tutor/${tutor._id}`}>
                                            <motion.button
                                                className="btn btn-primary w-full"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Details
                                            </motion.button>
                                        </NavLink>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                    ))
                }
            </div>
        </div>



    );
};

export default FindTutor;