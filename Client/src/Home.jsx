import React, { useContext, useEffect, useState } from 'react';
import homeBg from './assets/Image/home com.jpg';
import homePerson from './assets/Image/Home-person.png';
import DSA from './assets/Icons/dsa.png';
import OOP from './assets/Icons/c++.png';
import ArabI from './assets/Icons/computer_architecture.png';
import ChinaI from './assets/Icons/dbms.png';
import PortugalI from './assets/Icons/c.png';
import RussiaI from './assets/Icons/cyber_securitypng.png';
import FranceI from './assets/Icons/cloud.png';
import JapanI from './assets/Icons/mobile_dev.png';
import GermanI from './assets/Icons/python.png';
import RightArrow from './assets/Icons/right-arrow.png';
import { NavLink } from 'react-router-dom';
import AuthContext from './Auth/AuthContext';
import { animate, motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion"
import service from './assets/Image/AboutService.jpg'
import { view } from 'motion/react-client';
import Button from './button';
import RotatingText from './text animation/RotatingText';


// import './Gallery.css';


// npm run dev

const Home = () => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], ['0turn', '1turn']);
    const smoothedRotate = useSpring(rotate, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const f = (k) => {
            if (Math.abs(k) > 0.5) {
                const docHeight = document.documentElement.offsetHeight;
                const winHeight = window.innerHeight;
                const scrollTarget = 0.5 * (k - Math.sign(k) + 1) * (docHeight - winHeight);
                window.scrollTo(0, scrollTarget);
            }
        };

        f(-1);
        const handleScroll = () => {
            const k = parseFloat(getComputedStyle(document.body).getPropertyValue('--k'));
            f(k);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // return <motion.pre>{count}</motion.pre>

    const { theme, user } = useContext(AuthContext);
    // console.log(user)
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://iiuc-courses-portal-1.onrender.com/tutors')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);
    const tutorF = data.length;

    // Calculate total reviews
    let totalReview = 0;
    const reviewT = data.reduce((totalReview, val) => {
        totalReview = totalReview + val.reviews;

        return totalReview;
    }, totalReview);

    // Unique languages count
    const languageT = [...new Set(data.map(tutor => tutor.language))].length;

    // Motion values
    const tutorMotionValue = useMotionValue(0);
    const reviewMotionValue = useMotionValue(0);
    const languageMotionValue = useMotionValue(0);

    // Animated values
    const tutorZ = useTransform(tutorMotionValue, Math.round);
    const reviewZ = useTransform(reviewMotionValue, Math.round);
    const languageZ = useTransform(languageMotionValue, Math.round);

    const startAnimation = (motionValue, targetValue) => {
        animate(motionValue, targetValue, { duration: 2 });
    };

    console.log([...data.slice(0, 20)])
    const animals = [
        {
            name: "Lion",
            scientific: "Panthera leo",
            img: "https://images.unsplash.com/photo-1583499871880-de841d1ace2a?h=900",
            pos: "47% 35%",
            author: "Clément Roy",
            link: "https://unsplash.com/photos/lion-lying-on-brown-rock-MUeeyzsjiY8"
        },
        {
            name: "Asiatic Elephant",
            scientific: "Elephas maximus",
            img: "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?h=900",
            pos: "75% 65%",
            author: "Alex Azabache",
            link: "https://unsplash.com/photos/shallow-focus-photo-of-black-elephants-hZhhVLLKJQ4"
        },
        {
            name: "Zebra",
            scientific: "Equus quagga",
            img: "https://images.unsplash.com/photo-1577985051160-f2d62d0f3584?h=900",
            pos: "40% 70%",
            author: "Paul Gilmore",
            link: "https://unsplash.com/photos/zebra-1pH7Zz9Y2fM"
        },
        {
            name: "Giraffe",
            scientific: "Giraffa camelopardalis",
            img: "https://images.unsplash.com/photo-1608032071568-d83305e20a97?h=900",
            pos: "50% 30%",
            author: "Alexander Strachan",
            link: "https://unsplash.com/photos/photo-of-giraffe-XpMVAZ5QxZk"
        },
        {
            name: "Cheetah",
            scientific: "Acinonyx jubatus",
            img: "https://images.unsplash.com/photo-1608531973256-f5641c4c2b48?h=900",
            pos: "60% 55%",
            author: "Karl Lee",
            link: "https://unsplash.com/photos/cheetah-portrait-axQ0nV1Jc-8"
        }
    ];


    return (
        <div className='bg-[#fbf8f6]'>
            {/* Banner */}
            <div
                className={`relative w-full h-[26rem] md:h-[31.65rem] bg-cover bg-center`}
                style={{ backgroundImage: `url(${homeBg})` }}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 ${theme == false ? "bg-[#fbf8f6]" : "bg-[#121212]"
                        } opacity-85`}
                ></div>
                {/* {text animation} */}



                {/* Headline */}
                <div>
                    <h1
                        className={`md:ml-20 font-bold leading-snug md:text-5xl text-3xl absolute ${theme == false ? "text-black" : "text-white"} md:top-1/3`}
                    >
                        <span className="flex items-center gap-2">
                            <span className="inline-block">Learn</span>
                            <RotatingText
                                texts={['Object-Oriented Programming', 'Computer Architecture', 'Data Structures and Algorithms', 'Operating Systems','Database Management Systems','Computer Networks']}
                                mainClassName="inline-flex px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </span>
                    </h1>

                </div>

                {/* Content */}
                <div className=" ">
                    <div></div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
                        className="absolute right-0 md:bottom-0  bottom-0"
                    >
                        <img
                            className="w-[40rem] "
                            src={homePerson}
                            alt="Person learning languages"
                            style={{
                                filter: theme == false ? "none" : "brightness(80%)",
                            }}
                        />
                    </motion.div>
                </div>
            </div>
            {/* new */}



            {/* States */}
            <div className={`lg:px-32 px-2 ${theme === false ? 'bg-[#fbf8f6]' : 'bg-[#121212]'} `}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
                    className={`flex flex-col lg:flex-row text-center ${theme === false
                        ? "bg-[#fae0c1] text-[#09050e]"
                        : "bg-[#1e1e1e] text-[#ffffff]"
                        } rounded-xl`}
                >
                    {/* Experience Tutors */}
                    <div className="stat place-items-center">
                        <div className="stat-title">
                            Experience Tutors
                        </div>
                        <motion.div
                            whileInView={() => startAnimation(tutorMotionValue, tutorF)}
                            className="stat-value"
                        >
                            {tutorZ}
                        </motion.div>
                        <div className="stat-desc">From January 1st to February 1st</div>
                    </div>

                    {/* Divider */}
                    <div className="flex md:w-1 md:h-auto h-1 items-center justify-center">
                        <div
                            className={`md:w-1 md:h-[80%] w-[80%] h-1 ${theme === false ? "bg-[#3736368a]" : "bg-[#4a4a4a]"
                                }`}
                        ></div>
                    </div>

                    {/* 5-Star Tutor Reviews */}
                    <div className="stat place-items-center">
                        <div className="stat-title">5 Star Tutor Reviews</div>
                        <motion.div
                            whileInView={() => startAnimation(reviewMotionValue, reviewT)}
                            className="stat-value"
                        >
                            {reviewZ}
                        </motion.div>
                        <div className="stat-desc">↗︎ 40 (2%)</div>
                    </div>

                    {/* Divider */}
                    <div className="flex md:w-1 md:h-auto h-1 items-center justify-center">
                        <div
                            className={`md:w-1 md:h-[80%] w-[80%] h-1 ${theme === false ? "bg-[#3736368a]" : "bg-[#4a4a4a]"
                                }`}
                        ></div>
                    </div>

                    {/* Language Taught */}
                    <div className="stat place-items-center">
                        <div className="stat-title">Language Taught</div>
                        <motion.div
                            whileInView={() => startAnimation(languageMotionValue, languageT)}
                            className="stat-value"
                        >
                            {languageZ}
                        </motion.div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                    {/* Divider */}
                    <div className="flex md:w-1 md:h-auto h-1 items-center justify-center">
                        <div
                            className={`md:w-1 md:h-[80%] w-[80%] h-1 ${theme === false ? "bg-[#3736368a]" : "bg-[#4a4a4a]"
                                }`}
                        ></div>
                    </div>

                    {/* User */}
                    <div className="stat place-items-center">
                        <div className="stat-title">User</div>
                        <motion.div className="stat-value">120000+</motion.div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </motion.div>
            </div>


            {/* Language Taught */}
            <div>
                <h2 className={`text-4xl text-center font-bold ${theme == false ? "text-gray-800 " : "text-gray-200 bg-[#121212]"} `}>
                    Discover Your Language Path
                </h2>
                <div className={`grid lg:grid-cols-3 md:grid-cols-2 gap-3 justify-items-center  lg:px-32 ${theme == false ? "bg-[#f9f9f9]" : "bg-[#121212]"}`}>

                    {/* Language Cards */}
                    {[
                        { name: "DSA", count: "120000", icon: DSA },
                        { name: "OOP", count: "95000", icon: OOP },
                        { name: "Architecture", count: "78000", icon: ArabI },
                        { name: "Database", count: "103000", icon: ChinaI },
                        { name: "Networks", count: "62000", icon: PortugalI },
                        { name: "Security", count: "87000", icon: RussiaI },
                        { name: "Cloud", count: "99000", icon: FranceI },
                        { name: "Mobile Dev", count: "72000", icon: JapanI },
                        { name: "AI", count: "85000", icon: GermanI },
                    ].map((language, index) => (
                        <NavLink key={index} to={`/find-tutors?Language=${language.name}`}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`flex items-center gap-4 p-3 border-2 rounded-2xl w-[20rem] ${theme == false
                                    ? "bg-[#f3ebe5] border-gray-300"
                                    : "bg-[#1E1E1E] border-[#252525]"
                                    }`}
                            >
                                <img className="size-10" src={language.icon} alt={`${language.name} icon`} />
                                <div>
                                    <h1 className={`text-2xl ${theme == false ? "text-gray-800" : "text-gray-200"}`}>
                                        {language.name} Tutor
                                    </h1>
                                    <p className={`${theme == false ? "text-gray-700" : "text-gray-400"}`}>
                                        {language.count} Teachers
                                    </p>
                                </div>
                                <motion.img
                                    className={`size-7 ml-auto ${theme == false ? "" : "rounded-full p-1 bg-white"}`}
                                    src={RightArrow}
                                    alt="Right Arrow"
                                    whileHover={{
                                        x: [0, 5, -5, 5, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.4,
                                    }}
                                />
                            </motion.div>
                        </NavLink>
                    ))}
                </div>
            </div>



            {/* add */}

            <div className={`${theme == false ? "bg-[#f9f9f9]" : "bg-[#121212]"} `}>
                <h1
                    className={`text-center text-4xl  ${theme == false ? "text-gray-800" : "text-gray-200"
                        }`}
                >
                    Meet Our Language Experts
                </h1>
                <div className="carousel-container overflow-hidden w-full h-48 relative">
                    <motion.div
                        className="carousel-track flex w-[4510px]"
                        animate={{
                            x: ["0%", `-100%`],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...data.slice(0, 20), ...data.slice(8, 10), ...data.slice(0, 7)].map(
                            (val, index) => (
                                <div className="carousel-item" key={index}>
                                    <img
                                        className={`${theme == false ? 'border-slate-600' : 'border-slate-400'} size-[185px] object-cover rounded-full mr-5 border-4`}
                                        src={val.photoURL}
                                        alt="Item"

                                    />
                                </div>
                            )
                        )}
                    </motion.div>
                </div>
            </div>


            {/* user review */}


            <div className={`${theme == false ? "bg-gray-100" : "bg-[#121212]"}  lg:px-32 px-2`}>
                <h2
                    className={`text-4xl text-center font-bold ${theme == false ? "text-gray-800" : "text-gray-200"
                        } `}
                >
                    About Our Service
                </h2>
                <div className="container mx-auto grid md:grid-cols-2 grid-cols-1 items-center">
                    {/* Text Content */}
                    <div className="max-w-lg lg:mr-12 text-center lg:text-left">
                        <p
                            className={`text-lg ${theme == false ? "text-gray-600" : "text-gray-400"
                                } mb-6`}
                        >
                            Welcome to <b>TutorNest</b>, your gateway to mastering new languages! Our
                            platform offers interactive lessons, expert tutors, and engaging exercises
                            tailored to your learning style. Whether you're a beginner or looking to refine
                            your skills, we’re here to help you achieve your language goals.
                        </p>
                        <ul className="list-none space-y-3 mb-6">
                            <li
                                className={`${theme == false ? "text-gray-700" : "text-gray-300"
                                    } text-base flex items-center`}
                            >
                                <span
                                    className={`${theme == false ? "text-blue-500" : "text-blue-400"
                                        } text-xl mr-2`}
                                >
                                    🌍
                                </span>{" "}
                                Learn over 10+ languages
                            </li>
                            <li
                                className={`${theme == false ? "text-gray-700" : "text-gray-300"
                                    } text-base flex items-center`}
                            >
                                <span
                                    className={`${theme == false ? "text-blue-500" : "text-blue-400"
                                        } text-xl mr-2`}
                                >
                                    📚
                                </span>{" "}
                                Interactive quizzes and lessons
                            </li>
                            <li
                                className={`${theme == false ? "text-gray-700" : "text-gray-300"
                                    } text-base flex items-center`}
                            >
                                <span
                                    className={`${theme == false ? "text-blue-500" : "text-blue-400"
                                        } text-xl mr-2`}
                                >
                                    🎙️
                                </span>{" "}
                                Practice with native speakers
                            </li>
                            <li
                                className={`${theme == false ? "text-gray-700" : "text-gray-300"
                                    } text-base flex items-center`}
                            >
                                <span
                                    className={`${theme == false ? "text-blue-500" : "text-blue-400"
                                        } text-xl mr-2`}
                                >
                                    🕒
                                </span>{" "}
                                Flexible learning schedules
                            </li>
                        </ul>
                        <button
                            className={`w-full px-6 py-2 ${theme == false
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-blue-700 text-gray-200 hover:bg-blue-600"
                                } rounded-md shadow-md`}
                        >
                            Learn More
                        </button>
                    </div>

                    {/* Image */}
                    <div className="mt-8 lg:mt-0">
                        <img
                            src={service}
                            alt="Language Learning Illustration"
                            className="w-full rounded-lg shadow-lg"
                            style={{
                                boxShadow: theme == false ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "0 4px 8px rgba(0, 0, 0, 0.5)",
                            }}
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;








