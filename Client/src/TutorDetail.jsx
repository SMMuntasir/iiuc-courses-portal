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
        fetch('https://iiuc-courses-portal-1.onrender.com/bookedTeacher', {
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


        <div className="card  shadow-xl md:p-16 p-4 ">
            <main className="course-main container mx-auto px-4 py-8">

                {/* 1. Overview */}
                <section className="overview mb-8 flex justify-between">
                    <div>

                        <h1 className="text-3xl font-bold">{tutorT.subject_name}</h1>
                        <p className="mt-2 text-lg">Next Batch: August 26 – Join Now!</p>
                        <div className="benefits flex space-x-4 mt-4">
                            <span>73 Live Classes</span>
                            <span>14 Projects</span>
                            <span>307 Pre‑Recorded Videos</span>
                        </div>
                        {/* <button className="btn-primary mt-4">Enroll Now</button> */}
                    </div>
                    <div className="">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/ftKiHCDVwfA?si=b-OsH2TJvBHRo98n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </section>

                {/* 2. Curriculum Highlights */}
                <section className="curriculum mb-8">
                    <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {/* Live Classes */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">Live Classes</h3>
                            <p>73 live sessions with industry experts to guide your learning journey.</p>
                        </div>

                        {/* Pre-recorded Videos */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">Pre-recorded Videos</h3>
                            <p>Access 307+ on-demand videos to learn at your own pace anytime.</p>
                        </div>

                        {/* Real-life Projects */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">Real-life Projects</h3>
                            <p>Work on 14 hands-on projects to solidify your understanding and build a portfolio.</p>
                        </div>

                        {/* Web Development with Python & Django */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">Python & Django</h3>
                            <p>Master full-stack web development using Python and the Django framework.</p>
                        </div>

                        {/* Frontend with React.js */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">Frontend with React.js</h3>
                            <p>Learn modern frontend development using React and Tailwind CSS.</p>
                        </div>

                        {/* Job Preparation & Freelancing */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">Career Support</h3>
                            <p>Get job interview training, freelancing tips, and marketplace readiness guidance.</p>
                        </div>

                        {/* Version Control with Git & GitHub */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">Git & GitHub</h3>
                            <p>Use Git & GitHub like a pro for version control and collaborative development.</p>
                        </div>

                        {/* Bonus: Data Structures & Algorithms */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">DSA + Coding Practice</h3>
                            <p>Improve problem-solving skills with Data Structures and Algorithm training.</p>
                        </div>

                        {/* Access to CodeMama Platform */}
                        <div className="card p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold mb-2">CodeMama Platform</h3>
                            <p>Practice coding challenges and track progress on Ostad's exclusive CodeMama platform.</p>
                        </div>
                    </div>
                </section>




            </main>
            <div className="mt-6 flex justify-between ">
                <button className="btn btn-primary w-full ring-offset-2 hover:ring-4" onClick={handleBook}>Enroll Now</button>

            </div>

        </div>


    );
};

export default TutorDetail;