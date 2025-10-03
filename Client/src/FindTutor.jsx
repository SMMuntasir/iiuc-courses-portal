import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from "framer-motion";
import AuthContext from './Auth/AuthContext';

const FindTutor = () => {
    const { theme } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [param] = useSearchParams();
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    let language = param.get("Language");

    const handleSearch = (e) => {
        e.preventDefault();
        const word = e.target.search.value;
        const searchS = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        Navigate(`/find-tutors?Language=${searchS}`);
    };

    useEffect(() => {
        setLoading(true);
        const url = language
            ? `http://localhost:5000/tutors?Language=${language}`
            : `http://localhost:5000/tutors`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTutors(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setTutors([]);
                setLoading(false);
            });
    }, [language]);

    // Filter tutors based on search term
    const filteredTutors = tutors.filter(tutor =>
        tutor.subject_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.course_teacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.language?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === false 
                ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50' 
                : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        }`}>
            {/* Hero Section with Search */}
            <section className={`relative py-24 ${
                theme === false ? 'bg-white' : 'bg-gray-800'
            }`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-8"
                    >
                        {/* Header */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                                    theme === false 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-blue-900 text-blue-300'
                                }`}
                            >
                                🎯 Find Your Perfect Tutor
                            </motion.div>
                            
                            <h1 className={`text-4xl lg:text-6xl font-bold ${
                                theme === false ? 'text-gray-900' : 'text-white'
                            }`}>
                                {language ? (
                                    <>Explore <span className={`${
                                        theme === false ? 'text-blue-600' : 'text-blue-400'
                                    }`}>{language}</span> Courses</>
                                ) : (
                                    <>Discover Amazing <span className={`${
                                        theme === false ? 'text-blue-600' : 'text-blue-400'
                                    }`}>Courses</span></>
                                )}
                            </h1>
                            
                            <p className={`text-xl max-w-3xl mx-auto ${
                                theme === false ? 'text-gray-600' : 'text-gray-300'
                            }`}>
                                Connect with expert tutors and accelerate your learning journey with personalized courses
                            </p>
                        </div>

                        {/* Enhanced Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="max-w-2xl mx-auto"
                        >
                            <form onSubmit={handleSearch} className="relative">
                                <div className={`flex items-center rounded-2xl shadow-lg transition-all duration-300 ${
                                    theme === false 
                                        ? 'bg-white border-2 border-gray-200 focus-within:border-blue-500 focus-within:shadow-blue-500/25' 
                                        : 'bg-gray-700 border-2 border-gray-600 focus-within:border-blue-400 focus-within:shadow-blue-400/25'
                                }`}>
                                    <div className="flex-1 flex items-center px-6 py-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className={`h-5 w-5 mr-3 ${
                                                theme === false ? 'text-gray-400' : 'text-gray-500'
                                            }`}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                        <input
                                            name="search"
                                            type="text"
                                            className={`flex-1 text-lg bg-transparent outline-none ${
                                                theme === false ? 'text-gray-900 placeholder-gray-400' : 'text-white placeholder-gray-400'
                                            }`}
                                            placeholder="Search courses, topics, or instructors..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`m-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 ${
                                            theme === false
                                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                                                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400'
                                        }`}
                                    >
                                        Search
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Search Statistics */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className={`text-sm ${
                                theme === false ? 'text-gray-500' : 'text-gray-400'
                            }`}
                        >
                            {filteredTutors.length > 0 && (
                                <span>Found {filteredTutors.length} course{filteredTutors.length !== 1 ? 's' : ''}</span>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Courses Grid Section */}
            <section className={`py-24 ${
                theme === false ? 'bg-gradient-to-br from-gray-50 to-blue-50' : 'bg-gradient-to-br from-gray-900 to-gray-800'
            }`}>
                <div className="container mx-auto px-6 lg:px-8">
                    {loading ? (
                        // Loading State
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className={`animate-pulse rounded-3xl p-8 ${
                                    theme === false ? 'bg-white' : 'bg-gray-700'
                                }`}>
                                    <div className={`h-48 rounded-2xl mb-4 ${
                                        theme === false ? 'bg-gray-200' : 'bg-gray-600'
                                    }`}></div>
                                    <div className={`h-6 rounded mb-2 ${
                                        theme === false ? 'bg-gray-200' : 'bg-gray-600'
                                    }`}></div>
                                    <div className={`h-4 rounded mb-4 ${
                                        theme === false ? 'bg-gray-200' : 'bg-gray-600'
                                    }`}></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredTutors.length === 0 ? (
                        // No Results State
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className={`text-2xl font-bold mb-4 ${
                                theme === false ? 'text-gray-900' : 'text-white'
                            }`}>
                                No Courses Found
                            </h3>
                            <p className={`text-lg mb-6 ${
                                theme === false ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                                Try adjusting your search criteria or explore our popular courses below.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => Navigate('/find-tutors')}
                                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                    theme === false
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-blue-500 text-gray-900 hover:bg-blue-400'
                                }`}
                            >
                                Browse All Courses
                            </motion.button>
                        </motion.div>
                    ) : (
                        // Courses Grid
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                            {filteredTutors.map((tutor, index) => (
                                <motion.div
                                    key={tutor._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ 
                                            y: -10,
                                            transition: { type: "spring", stiffness: 300, damping: 25 }
                                        }}
                                        className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                                            theme === false
                                                ? 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-blue-500/10'
                                                : 'bg-gray-800 border border-gray-700 hover:border-blue-400 hover:shadow-blue-500/20'
                                        }`}
                                    >
                                        {/* Course Image */}
                                        <div className="relative overflow-hidden">
                                            <motion.img
                                                src={tutor.photoURL}
                                                alt={tutor.subject_name}
                                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x256?text=Course+Image';
                                                }}
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                            
                                            {/* Price Badge */}
                                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${
                                                theme === false 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-green-900 text-green-300'
                                            }`}>
                                                ${tutor.price || '99'}
                                            </div>
                                        </div>

                                        {/* Course Content */}
                                        <div className="p-6 space-y-4">
                                            {/* Course Title & Instructor */}
                                            <div className="space-y-2">
                                                <h3 className={`text-xl font-bold line-clamp-2 ${
                                                    theme === false ? 'text-gray-900' : 'text-white'
                                                }`}>
                                                    {tutor.subject_name}
                                                </h3>
                                                <p className={`text-sm flex items-center gap-2 ${
                                                    theme === false ? 'text-gray-600' : 'text-gray-400'
                                                }`}>
                                                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                                    By {tutor.course_teacher}
                                                </p>
                                            </div>

                                            {/* Course Stats */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                                                    theme === false ? 'bg-blue-50' : 'bg-gray-700'
                                                }`}>
                                                    <div className="w-6 h-6 flex items-center justify-center">
                                                        <span className="text-blue-500">👥</span>
                                                    </div>
                                                    <span className={`text-xs font-medium ${
                                                        theme === false ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>
                                                        {tutor.students_joined || 0} Students
                                                    </span>
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                                                    theme === false ? 'bg-green-50' : 'bg-gray-700'
                                                }`}>
                                                    <div className="w-6 h-6 flex items-center justify-center">
                                                        <span className="text-green-500">📚</span>
                                                    </div>
                                                    <span className={`text-xs font-medium ${
                                                        theme === false ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>
                                                        {tutor.lessons || 0}+ Lessons
                                                    </span>
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                                                    theme === false ? 'bg-purple-50' : 'bg-gray-700'
                                                }`}>
                                                    <div className="w-6 h-6 flex items-center justify-center">
                                                        <span className="text-purple-500">📝</span>
                                                    </div>
                                                    <span className={`text-xs font-medium ${
                                                        theme === false ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>
                                                        {tutor.assignments || 0}+ Tasks
                                                    </span>
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                                                    theme === false ? 'bg-orange-50' : 'bg-gray-700'
                                                }`}>
                                                    <div className="w-6 h-6 flex items-center justify-center">
                                                        <span className="text-orange-500">🚀</span>
                                                    </div>
                                                    <span className={`text-xs font-medium ${
                                                        theme === false ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>
                                                        {tutor.projects || 0}+ Projects
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Rating & Reviews */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i}>⭐</span>
                                                        ))}
                                                    </div>
                                                    <span className={`text-sm ${
                                                        theme === false ? 'text-gray-600' : 'text-gray-400'
                                                    }`}>
                                                        4.8 ({tutor.reviews || 0} reviews)
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <NavLink to={`/tutor/${tutor._id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`w-full px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
                                                        theme === false
                                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/25'
                                                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-900 hover:from-blue-400 hover:to-cyan-400 shadow-blue-500/25'
                                                    }`}
                                                >
                                                    View Course Details
                                                </motion.button>
                                            </NavLink>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Popular Categories Section */}
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
                        <h2 className={`text-4xl font-bold mb-4 ${
                            theme === false ? 'text-gray-900' : 'text-white'
                        }`}>
                            Popular Categories
                        </h2>
                        <p className={`text-xl ${
                            theme === false ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            Explore trending subjects and find your perfect learning path
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'DSA', icon: '🔢', color: 'blue' },
                            { name: 'OOP', icon: '🏗️', color: 'green' },
                            { name: 'Database', icon: '🗄️', color: 'purple' },
                            { name: 'Networks', icon: '🌐', color: 'cyan' },
                            { name: 'Security', icon: '🔒', color: 'red' },
                            { name: 'AI', icon: '🤖', color: 'orange' }
                        ].map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                onClick={() => Navigate(`/find-tutors?Language=${category.name}`)}
                                className={`cursor-pointer text-center p-6 rounded-2xl transition-all duration-300 ${
                                    theme === false
                                        ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                                        : 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                                }`}
                            >
                                <div className="text-4xl mb-3">{category.icon}</div>
                                <h3 className={`font-semibold ${
                                    theme === false ? 'text-gray-900' : 'text-white'
                                }`}>
                                    {category.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FindTutor;
