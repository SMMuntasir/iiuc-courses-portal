import React, { useContext, useEffect, useState } from 'react';
import homeBg from './assets/Image/bg-home.jpg';
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
import { animate, motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import service from './assets/Image/AboutService.jpg';
import Button from './button';
import RotatingText from './text animation/RotatingText';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], ['0turn', '1turn']);
    const smoothedRotate = useSpring(rotate, { stiffness: 50, damping: 20 });
    const { theme, user } = useContext(AuthContext);
    const [data, setData] = useState([]);

    // State for animated counters
    const [animatedTutors, setAnimatedTutors] = useState(0);
    const [animatedReviews, setAnimatedReviews] = useState(0);
    const [animatedLanguages, setAnimatedLanguages] = useState(0);

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
            const k = parseFloat(getComputedStyle(document.body).getPropertyValue('--k') || '0');
            f(k);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetch('https://iiuc-courses-portal-3.onrender.com/tutors')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setData(data);
                } else {
                    console.error('Expected array from API, received:', typeof data);
                    setData([]);
                }
            })
            .catch(err => {
                console.error('Error fetching tutors:', err);
                setData([]);
            });
    }, []);
    
    const tutorF = data.length || 0;

    // Calculate total reviews safely
    const reviewT = data.reduce((total, tutor) => {
        const reviews = tutor?.reviews || 0;
        return total + (typeof reviews === 'number' ? reviews : 0);
    }, 0);

    // Unique languages count safely
    const languageT = [...new Set(data.map(tutor => tutor?.language).filter(Boolean))].length || 0;

    // Animation function for counters
    const animateCounter = (setter, targetValue, duration = 2000) => {
        const startTime = Date.now();
        const startValue = 0;

        const updateCounter = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);
            
            setter(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const languages = [
        { name: "DSA", count: "120000", icon: DSA },
        { name: "OOP", count: "95000", icon: OOP },
        { name: "Architecture", count: "78000", icon: ArabI },
        { name: "Database", count: "103000", icon: ChinaI },
        { name: "Networks", count: "62000", icon: PortugalI },
        { name: "Security", count: "87000", icon: RussiaI },
        { name: "Cloud", count: "99000", icon: FranceI },
        { name: "Mobile Dev", count: "72000", icon: JapanI },
        { name: "AI", count: "85000", icon: GermanI },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === false 
                ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50' 
                : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        }`}>
            {/* Hero Section */}
            <section
                className="relative w-full h-screen flex items-center justify-center overflow-hidden"
                style={{ backgroundImage: `url(${homeBg})` }}
            >
                {/* Enhanced Overlay with Gradient */}
                <div className={`absolute inset-0 ${
                    theme === false 
                        ? "bg-gradient-to-r from-white/95 via-blue-50/90 to-cyan-50/85" 
                        : "bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/85"
                }`}></div>

                {/* Hero Content Container */}
                <div className="relative z-10 container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left space-y-8"
                    >
                        {/* Main Headline */}
                        <div className="space-y-4">
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className={`text-lg font-medium tracking-wide ${
                                    theme === false ? 'text-blue-600' : 'text-blue-400'
                                }`}
                            >
                                Welcome to IIUC Academic Portal
                            </motion.p>
                            
                            <h1 className={`font-bold leading-tight ${
                                theme === false ? "text-gray-900" : "text-white"
                            }`}>
                                <span className="text-4xl lg:text-6xl block mb-2">Master</span>
                                <RotatingText
                                    texts={[
                                        'Object-Oriented Programming', 
                                        'Computer Architecture', 
                                        'Data Structures and Algorithms', 
                                        'Operating Systems',
                                        'Database Management Systems',
                                        'Computer Networks'
                                    ]}
                                    mainClassName={`inline-flex px-4 py-2 text-2xl lg:text-4xl font-bold ${
                                        theme === false 
                                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' 
                                            : 'bg-gradient-to-r from-cyan-300 to-blue-400 text-gray-900'
                                    } overflow-hidden justify-center rounded-2xl shadow-xl`}
                                    staggerFrom="last"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-1"
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={2000}
                                />
                                <span className="text-2xl lg:text-4xl block mt-2">with Expert Tutors</span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className={`text-xl leading-relaxed max-w-2xl ${
                                theme === false ? 'text-gray-600' : 'text-gray-300'
                            }`}
                        >
                            Join thousands of students learning computer science fundamentals through 
                            personalized tutoring sessions with industry experts.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button className={`px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                theme === false 
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/25' 
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-900 hover:from-blue-400 hover:to-cyan-400 shadow-blue-500/25'
                            }`}>
                                Find a Tutor
                            </button>
                            <button className={`px-8 py-4 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                theme === false 
                                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400' 
                                    : 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                            }`}>
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "backOut" }}
                        className="relative"
                    >
                        <div className="relative">
                            <img
                                className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
                                src={homePerson}
                                alt="Person learning computer science"
                                style={{
                                    filter: theme === false ? "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))" : "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
                                }}
                            />
                            {/* Decorative Elements */}
                            <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl opacity-60 ${
                                theme === false ? 'bg-blue-400' : 'bg-blue-500'
                            }`}></div>
                            <div className={`absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-xl opacity-40 ${
                                theme === false ? 'bg-cyan-400' : 'bg-cyan-500'
                            }`}></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className={`py-24 ${
                theme === false ? 'bg-white' : 'bg-gray-800'
            }`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        onViewportEnter={() => {
                            animateCounter(setAnimatedTutors, tutorF);
                            animateCounter(setAnimatedReviews, reviewT);
                            animateCounter(setAnimatedLanguages, languageT);
                        }}
                        className={`grid grid-cols-1 lg:grid-cols-4 gap-8 p-12 rounded-3xl shadow-2xl ${
                            theme === false
                                ? "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
                                : "bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600"
                        }`}
                    >
                        {/* Expert Tutors */}
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center space-y-4"
                        >
                            <div className={`text-sm font-semibold uppercase tracking-wider ${
                                theme === false ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                                Expert Tutors
                            </div>
                            <div className={`text-5xl font-bold ${
                                theme === false ? 'text-blue-600' : 'text-blue-400'
                            }`}>
                                {animatedTutors}+
                            </div>
                            <div className={`text-sm ${
                                theme === false ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                Professional educators
                            </div>
                        </motion.div>

                        {/* 5-Star Reviews */}
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center space-y-4"
                        >
                            <div className={`text-sm font-semibold uppercase tracking-wider ${
                                theme === false ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                                5-Star Reviews
                            </div>
                            <div className={`text-5xl font-bold ${
                                theme === false ? 'text-green-600' : 'text-green-400'
                            }`}>
                                {animatedReviews}
                            </div>
                            <div className={`text-sm ${
                                theme === false ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                Happy students
                            </div>
                        </motion.div>

                        {/* Subjects Taught */}
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center space-y-4"
                        >
                            <div className={`text-sm font-semibold uppercase tracking-wider ${
                                theme === false ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                                Subjects
                            </div>
                            <div className={`text-5xl font-bold ${
                                theme === false ? 'text-purple-600' : 'text-purple-400'
                            }`}>
                                {animatedLanguages}+
                            </div>
                            <div className={`text-sm ${
                                theme === false ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                CS topics covered
                            </div>
                        </motion.div>

                        {/* Active Users */}
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center space-y-4"
                        >
                            <div className={`text-sm font-semibold uppercase tracking-wider ${
                                theme === false ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                                Active Users
                            </div>
                            <div className={`text-5xl font-bold ${
                                theme === false ? 'text-orange-600' : 'text-orange-400'
                            }`}>
                                120K+
                            </div>
                            <div className={`text-sm ${
                                theme === false ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                Learning daily
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Subjects Section */}
            <section className={`py-24 ${
                theme === false ? 'bg-gradient-to-br from-gray-50 to-blue-50' : 'bg-gradient-to-br from-gray-900 to-gray-800'
            }`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className={`text-5xl font-bold mb-6 ${
                            theme === false ? "text-gray-900" : "text-white"
                        }`}>
                            Discover Your Learning Path
                        </h2>
                        <p className={`text-xl max-w-3xl mx-auto ${
                            theme === false ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            Choose from our comprehensive computer science curriculum designed by industry experts
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {languages.map((subject, index) => (
                            <NavLink key={index} to={`/find-tutors?Language=${subject.name}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        y: -10,
                                        transition: { type: "spring", stiffness: 300, damping: 25 }
                                    }}
                                    className={`group p-8 rounded-3xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl ${
                                        theme === false
                                            ? "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-blue-500/10"
                                            : "bg-gray-800 border border-gray-700 hover:border-blue-400 hover:shadow-blue-500/20"
                                    }`}
                                >
                                    <div className="flex items-start gap-6">
                                        <div className={`p-4 rounded-2xl transition-colors duration-300 ${
                                            theme === false 
                                                ? 'bg-blue-50 group-hover:bg-blue-100' 
                                                : 'bg-gray-700 group-hover:bg-gray-600'
                                        }`}>
                                            <img 
                                                className="w-12 h-12 object-contain" 
                                                src={subject.icon} 
                                                alt={`${subject.name} icon`} 
                                            />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className={`text-2xl font-bold mb-2 ${
                                                theme === false ? "text-gray-900" : "text-white"
                                            }`}>
                                                {subject.name} Tutoring
                                            </h3>
                                            <p className={`text-lg mb-4 ${
                                                theme === false ? "text-gray-600" : "text-gray-400"
                                            }`}>
                                                {subject.count} Expert Teachers
                                            </p>
                                            <div className={`inline-flex items-center gap-2 text-sm font-semibold ${
                                                theme === false ? 'text-blue-600' : 'text-blue-400'
                                            }`}>
                                                Explore Course
                                                <motion.img
                                                    className="w-4 h-4"
                                                    src={RightArrow}
                                                    alt="Arrow"
                                                    style={{
                                                        filter: theme === false ? 'brightness(0) saturate(100%) invert(26%) sepia(91%) saturate(2073%) hue-rotate(212deg) brightness(94%) contrast(93%)' : 'brightness(0) saturate(100%) invert(60%) sepia(96%) saturate(1169%) hue-rotate(193deg) brightness(99%) contrast(91%)'
                                                    }}
                                                    whileHover={{
                                                        x: [0, 5, 0],
                                                        transition: { repeat: Infinity, duration: 0.8 }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Tutors Carousel */}
            {data.length > 0 && (
                <section className={`py-24 ${
                    theme === false ? 'bg-white' : 'bg-gray-800'
                }`}>
                    <div className="container mx-auto px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className={`text-5xl font-bold mb-6 ${
                                theme === false ? "text-gray-900" : "text-white"
                            }`}>
                                Meet Our Expert Tutors
                            </h2>
                            <p className={`text-xl max-w-3xl mx-auto ${
                                theme === false ? 'text-gray-600' : 'text-gray-300'
                            }`}>
                                Learn from industry professionals with years of teaching experience
                            </p>
                        </motion.div>

                        <div className="overflow-hidden rounded-3xl">
                            <motion.div
                                className="flex"
                                animate={{
                                    x: ["0%", "-100%"],
                                }}
                                transition={{
                                    duration: 40,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                {[...data.slice(0, Math.min(20, data.length)), ...data.slice(0, Math.min(10, data.length))].map(
                                    (tutor, index) => (
                                        <motion.div 
                                            key={`${tutor.id || index}-${index}`}
                                            className="flex-shrink-0 mx-4"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className={`relative p-2 rounded-3xl ${
                                                theme === false ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-gradient-to-br from-gray-700 to-gray-600'
                                            }`}>
                                                <img
                                                    className="w-48 h-48 object-cover rounded-2xl shadow-lg"
                                                    src={tutor.photoURL}
                                                    alt={`${tutor.name || 'Tutor'} profile`}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/200x200?text=Tutor';
                                                    }}
                                                />
                                                {/* Tutor Info Overlay */}
                                                <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-sm ${
                                                    theme === false 
                                                        ? 'bg-white/90 text-gray-900' 
                                                        : 'bg-gray-900/90 text-white'
                                                }`}>
                                                    <p className="font-semibold text-sm truncate">{tutor.name || 'Expert Tutor'}</p>
                                                    <p className="text-xs opacity-75">{tutor.language || 'CS'} Expert</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* About Service Section */}
            <section className={`py-24 ${
                theme === false ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-gradient-to-br from-gray-900 to-gray-800'
            }`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className={`text-5xl font-bold mb-6 ${
                            theme === false ? "text-gray-900" : "text-white"
                        }`}>
                            Why Choose TutorNest?
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <p className={`text-xl leading-relaxed ${
                                    theme === false ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                    Transform your computer science journey with <span className={`font-bold ${
                                        theme === false ? 'text-blue-600' : 'text-blue-400'
                                    }`}>TutorNest</span>. 
                                    Our platform connects you with industry experts who provide personalized, 
                                    interactive learning experiences tailored to your goals.
                                </p>

                                <div className="grid gap-6">
                                    {[
                                        { icon: "🌍", title: "Global Expertise", desc: "Learn from tutors worldwide with diverse industry backgrounds" },
                                        { icon: "🎯", title: "Personalized Learning", desc: "Customized curriculum based on your skill level and goals" },
                                        { icon: "💬", title: "Interactive Sessions", desc: "Real-time coding, whiteboarding, and problem-solving" },
                                        { icon: "⏰", title: "Flexible Scheduling", desc: "Book sessions that fit your busy lifestyle" }
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.6 }}
                                            className={`flex items-start gap-4 p-6 rounded-2xl ${
                                                theme === false 
                                                    ? 'bg-white/50 backdrop-blur-sm border border-white/20' 
                                                    : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/20'
                                            }`}
                                        >
                                            <span className="text-3xl">{feature.icon}</span>
                                            <div>
                                                <h4 className={`text-lg font-semibold mb-1 ${
                                                    theme === false ? 'text-gray-900' : 'text-white'
                                                }`}>
                                                    {feature.title}
                                                </h4>
                                                <p className={`${
                                                    theme === false ? 'text-gray-600' : 'text-gray-400'
                                                }`}>
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg ${
                                    theme === false
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/25'
                                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-900 hover:from-blue-400 hover:to-cyan-400 shadow-blue-500/25'
                                }`}
                            >
                                Start Learning Today
                            </motion.button>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative">
                                <img
                                    src={service}
                                    alt="Online learning experience"
                                    className="w-full rounded-3xl shadow-2xl"
                                />
                                {/* Decorative Elements */}
                                <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-30 ${
                                    theme === false ? 'bg-blue-400' : 'bg-blue-500'
                                }`}></div>
                                <div className={`absolute -bottom-6 -left-6 w-40 h-40 rounded-full blur-2xl opacity-20 ${
                                    theme === false ? 'bg-cyan-400' : 'bg-cyan-500'
                                }`}></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
