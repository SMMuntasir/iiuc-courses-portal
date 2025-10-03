import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import AuthContext from './Auth/AuthContext';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { ScrollTimelineExample } from './Animations/ScrollTimelineExample';

const TutorDetail = () => {
    const { user, theme } = useContext(AuthContext);
    const tutorT = useLoaderData();

    const handleBook = (e) => {
        e.preventDefault();

        // Show confirmation dialog first
        Swal.fire({
            title: 'Confirm Enrollment',
            text: `Are you sure you want to enroll in ${tutorT.subject_name} for $${tutorT.price}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: theme === false ? '#2563eb' : '#3b82f6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Enroll Me!',
            cancelButtonText: 'Cancel',
            background: theme === false ? '#ffffff' : '#1f2937',
            color: theme === false ? '#1f2937' : '#ffffff'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    name: tutorT.name,
                    tutorId: tutorT._id,
                    language: tutorT.language,
                    tutorPhoto: tutorT.photoURL,
                    Price: tutorT.price,
                    tutorEmail: tutorT.email,
                    bookedEmail: user.email
                };

                fetch('https://iiuc-courses-portal-3.onrender.com/bookedTeacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: "Enrollment Successful! 🎉",
                        text: "Welcome to the course! Check your email for further details.",
                        icon: "success",
                        background: theme === false ? '#ffffff' : '#1f2937',
                        color: theme === false ? '#1f2937' : '#ffffff',
                        confirmButtonColor: theme === false ? '#2563eb' : '#3b82f6'
                    });
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Enrollment Failed",
                        text: "Something went wrong! Please try again later.",
                        background: theme === false ? '#ffffff' : '#1f2937',
                        color: theme === false ? '#1f2937' : '#ffffff',
                        confirmButtonColor: '#ef4444'
                    });
                });
            }
        });
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === false 
                ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50' 
                : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        }`}>
            {/* Hero Section */}
            <section className={`relative py-24 ${
                theme === false ? 'bg-white' : 'bg-gray-800'
            }`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Course Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                                    theme === false 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-blue-900 text-blue-300'
                                }`}
                            >
                                🎓 Premium Course
                            </motion.div>

                            {/* Course Title */}
                            <div className="space-y-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`text-4xl lg:text-5xl font-bold leading-tight ${
                                        theme === false ? 'text-gray-900' : 'text-white'
                                    }`}
                                >
                                    {tutorT.subject_name}
                                </motion.h1>
                                
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className={`text-xl ${
                                        theme === false ? 'text-gray-600' : 'text-gray-300'
                                    }`}
                                >
                                    Master the fundamentals and advance your career with expert guidance
                                </motion.p>
                            </div>

                            {/* Course Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-3 gap-6"
                            >
                                <div className={`text-center p-4 rounded-2xl ${
                                    theme === false ? 'bg-blue-50' : 'bg-gray-700'
                                }`}>
                                    <div className={`text-2xl font-bold ${
                                        theme === false ? 'text-blue-600' : 'text-blue-400'
                                    }`}>73</div>
                                    <div className={`text-sm ${
                                        theme === false ? 'text-gray-600' : 'text-gray-400'
                                    }`}>Live Classes</div>
                                </div>
                                <div className={`text-center p-4 rounded-2xl ${
                                    theme === false ? 'bg-green-50' : 'bg-gray-700'
                                }`}>
                                    <div className={`text-2xl font-bold ${
                                        theme === false ? 'text-green-600' : 'text-green-400'
                                    }`}>14</div>
                                    <div className={`text-sm ${
                                        theme === false ? 'text-gray-600' : 'text-gray-400'
                                    }`}>Projects</div>
                                </div>
                                <div className={`text-center p-4 rounded-2xl ${
                                    theme === false ? 'bg-purple-50' : 'bg-gray-700'
                                }`}>
                                    <div className={`text-2xl font-bold ${
                                        theme === false ? 'text-purple-600' : 'text-purple-400'
                                    }`}>307</div>
                                    <div className={`text-sm ${
                                        theme === false ? 'text-gray-600' : 'text-gray-400'
                                    }`}>Videos</div>
                                </div>
                            </motion.div>

                            {/* Next Batch Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className={`p-6 rounded-2xl border-2 border-dashed ${
                                    theme === false 
                                        ? 'border-orange-300 bg-orange-50' 
                                        : 'border-orange-400 bg-orange-900/20'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🚀</span>
                                    <div>
                                        <h3 className={`font-bold ${
                                            theme === false ? 'text-orange-800' : 'text-orange-300'
                                        }`}>Next Batch Starting Soon!</h3>
                                        <p className={`text-sm ${
                                            theme === false ? 'text-orange-600' : 'text-orange-400'
                                        }`}>August 26, 2024 – Limited seats available</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Pricing and CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`text-4xl font-bold ${
                                        theme === false ? 'text-gray-900' : 'text-white'
                                    }`}>
                                        ${tutorT.price}
                                    </span>
                                    <span className={`text-lg line-through ${
                                        theme === false ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        ${Math.round(tutorT.price * 1.5)}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        theme === false 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-green-900 text-green-300'
                                    }`}>
                                        33% OFF
                                    </span>
                                </div>
                                
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleBook}
                                    className={`w-full px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-xl ${
                                        theme === false
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/25'
                                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-900 hover:from-blue-400 hover:to-cyan-400 shadow-blue-500/25'
                                    }`}
                                >
                                    Enroll Now - Secure Your Spot
                                </motion.button>
                                
                                <p className={`text-center text-sm ${
                                    theme === false ? 'text-gray-500' : 'text-gray-400'
                                }`}>
                                    💳 30-day money-back guarantee • 📱 Lifetime access
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Video */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                                theme === false ? 'shadow-gray-200' : 'shadow-black/50'
                            }`}>
                                <iframe 
                                    className="w-full h-80 lg:h-96"
                                    src="https://www.youtube.com/embed/ftKiHCDVwfA?si=b-OsH2TJvBHRo98n" 
                                    title="Course Preview" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
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
                </div>
            </section>

            {/* Timeline Section */}
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
                        <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
                            theme === false ? "text-gray-900" : "text-white"
                        }`}>
                            Course Timeline
                        </h2>
                        <p className={`text-xl max-w-3xl mx-auto ${
                            theme === false ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            Follow our structured learning path designed for maximum retention
                        </p>
                    </motion.div>
                    <ScrollTimelineExample />
                </div>
            </section>

            {/* Curriculum Section */}
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
                        <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
                            theme === false ? "text-gray-900" : "text-white"
                        }`}>
                            What You'll Master
                        </h2>
                        <p className={`text-xl max-w-3xl mx-auto ${
                            theme === false ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            Comprehensive curriculum designed by industry experts
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutorT.what_you_will_learn?.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -10,
                                    transition: { type: "spring", stiffness: 300, damping: 25 }
                                }}
                                className={`group p-8 rounded-3xl transition-all duration-300 shadow-lg hover:shadow-2xl ${
                                    theme === false
                                        ? "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:border-blue-300 hover:shadow-blue-500/10"
                                        : "bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-blue-400 hover:shadow-blue-500/20"
                                }`}
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                                    theme === false 
                                        ? 'bg-blue-100 group-hover:bg-blue-200' 
                                        : 'bg-gray-600 group-hover:bg-gray-500'
                                }`}>
                                    <span className="text-2xl">
                                        {index === 0 ? '🎯' : index === 1 ? '💻' : index === 2 ? '🔧' : 
                                         index === 3 ? '📊' : index === 4 ? '🚀' : index === 5 ? '⚡' :
                                         index === 6 ? '🎨' : index === 7 ? '🔒' : '🌟'}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className={`text-xl font-bold ${
                                        theme === false ? "text-gray-900" : "text-white"
                                    }`}>
                                        {item?.[0]?.[0] || `Topic ${index + 1}`}
                                    </h3>
                                    <p className={`text-base leading-relaxed ${
                                        theme === false ? "text-gray-600" : "text-gray-400"
                                    }`}>
                                        {item?.[1]?.[0] || `Learn essential concepts and practical applications for Topic ${index + 1}.`}
                                    </p>
                                </div>

                                {/* Progress Indicator */}
                                <div className="mt-6 flex items-center gap-2">
                                    <div className={`flex-1 h-2 rounded-full ${
                                        theme === false ? 'bg-gray-200' : 'bg-gray-600'
                                    }`}>
                                        <div 
                                            className={`h-full rounded-full transition-all duration-300 ${
                                                theme === false ? 'bg-blue-500' : 'bg-blue-400'
                                            }`}
                                            style={{ width: `${(index + 1) * 11}%` }}
                                        ></div>
                                    </div>
                                    <span className={`text-sm font-medium ${
                                        theme === false ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                        Week {index + 1}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className={`py-24 ${
                theme === false ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-gradient-to-br from-gray-900 to-gray-800'
            }`}>
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <h2 className={`text-4xl lg:text-5xl font-bold ${
                            theme === false ? "text-gray-900" : "text-white"
                        }`}>
                            Ready to Transform Your Career?
                        </h2>
                        
                        <p className={`text-xl ${
                            theme === false ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            Join thousands of successful graduates who have advanced their careers with our expert-led courses.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleBook}
                                className={`px-12 py-4 text-xl font-semibold rounded-2xl transition-all duration-300 shadow-xl ${
                                    theme === false
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/25'
                                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-900 hover:from-blue-400 hover:to-cyan-400 shadow-blue-500/25'
                                }`}
                            >
                                Start Learning Today
                            </motion.button>
                            
                            <div className={`flex items-center gap-2 text-sm ${
                                theme === false ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                <span>⭐ 4.9/5 rating</span>
                                <span>•</span>
                                <span>10,000+ students</span>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
                            {[
                                { icon: '🏆', text: 'Industry Certified' },
                                { icon: '💼', text: 'Job Placement Support' },
                                { icon: '📚', text: 'Lifetime Access' },
                                { icon: '🤝', text: 'Mentor Support' }
                            ].map((badge, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                                        theme === false ? 'bg-white/50 text-gray-700' : 'bg-gray-800/50 text-gray-300'
                                    }`}
                                >
                                    <span>{badge.icon}</span>
                                    <span className="text-sm font-medium">{badge.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default TutorDetail;
