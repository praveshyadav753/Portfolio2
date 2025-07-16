import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFileDownload } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';

// Import tsparticles v3+ specific modules
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import gsap from 'gsap'; // Import GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

const AboutMe = () => {
    const sectionRef = useRef(null); 
    const contentRef = useRef(null); 
    const profileImageRef = useRef(null); 
    const backgroundCirclesRef = useRef([]); 

    // Framer Motion's useScroll for basic parallax on the background motion.div
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"] 
    });

    // Parallax effect for a subtle background movement (Framer Motion)
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    // Opacity fade out for the background elements as you scroll down (Framer Motion)
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // State to manage particles engine initialization
    const [particlesInitReady, setParticlesInitReady] = useState(false);

    // Initialize tsparticles engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); 
        }).then(() => {
            setParticlesInitReady(true); 
        });
    }, []);

    // State to manage profile image loading for a smooth fade-in
    const [profileImageLoaded, setProfileImageLoaded] = useState(false);

    // Animation variants for staggered reveal using Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger children by 0.1 seconds
            },
        },
    };

    // Variants for individual items within the staggered container
    const itemVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
    };

    useEffect(() => {
        // GSAP Context for proper cleanup
        const ctx = gsap.context(() => {
            // Parallax for the main content block
            gsap.to(contentRef.current, {
                y: -150, // Moves up as you scroll down
                skew:50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top", // When the top of the section hits the top of the viewport
                    end: "bottom top", // When the bottom of the section leaves the top of the viewport
                    scrub: true, // Smoothly link animation to scroll position
                }
            });

            // Parallax for the profile image
            gsap.to(profileImageRef.current, {
                y: 100, // Moves down slightly faster than content
                x: -50, // Moves left slightly
                scale: 1.05, // Slightly scales up
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // Parallax for background gradient circles
            backgroundCirclesRef.current.forEach((circle, i) => {
                gsap.to(circle, {
                    y: (i % 2 === 0 ? 200 : -200), // Move circles in opposite vertical directions
                    x: (i % 3 === 0 ? 150 : -150), // Vary horizontal movement
                    scale: 1.5, // Scale them up more
                    opacity: 0.6, // Increase opacity
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            });

        }, sectionRef); // Scope GSAP animations to sectionRef

        return () => ctx.revert(); // Clean up GSAP animations on component unmount
    }, []);


    return (
        <section
            id="about"
            name="about"
            ref={sectionRef} // Assign ref to the section
            className="relative w-full overflow-hidden flex flex-col items-center justify-start py-10 lg:py-16 font-inter text-gray-100 min-h-screen"
        >
            {/* Animated Particles Background (z-index 0 to be behind content) */}
            {particlesInitReady && (
                <div className="absolute inset-0 z-0">
                    <Particles
                        id="tsparticles"
                        options={{
                            fullScreen: { enable: false }, // Particles should not take full screen as we have other content
                            background: {
                                color: { value: "transparent" } // Transparent background as parent handles it
                            },
                            particles: {
                                number: { value: 60, density: { enable: true, area: 800 } },
                                color: { value: "#8854D9" }, // Purple color for particles
                                shape: {
                                    type: "circle",
                                },
                                opacity: {
                                    value: 0.7,
                                    random: false,
                                    anim: { enable: false }
                                },
                                size: {
                                    value: { min: 1, max: 4 },
                                    random: true,
                                    anim: { enable: false }
                                },
                                links: {
                                    enable: true,
                                    distance: 120,
                                    color: "#6C5CE9", // Slightly darker purple for links
                                    opacity: 0.6,
                                    width: 1,
                                },
                                move: {
                                    enable: true,
                                    speed: 1.5,
                                    direction: "none",
                                    random: true,
                                    straight: false,
                                    outModes: {
                                        default: "bounce",
                                    },
                                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                                }
                            },
                            interactivity: {
                                events: {
                                    onHover: {
                                        enable: true,
                                        mode: "repulse", // Particles repel on hover
                                    },
                                    onClick: {
                                        enable: true,
                                        mode: "push", // New particles are pushed on click
                                    },
                                    resize: true,
                                },
                                modes: {
                                    repulse: {
                                        distance: 100,
                                        duration: 0.4,
                                    },
                                    push: {
                                        quantity: 4,
                                    }
                                }
                            },
                            detectRetina: true,
                        }}
                    />
                </div>
            )}

            {/* Parallax Background Elements (z-index 1 for subtle depth) */}
            {/* These are the gradient circles, now animated with GSAP */}
            

            {/* Main Page Title for About Me (z-index 20 to be above backgrounds) */}
            <motion.h2
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 text-3xl lg:text-5xl font-extrabold text-white text-center mb-10 px-4"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-200">
                    About Me
                </span>
            </motion.h2>

            {/* Content Container - Adjusted to sit below the title */}
            <motion.div
                ref={contentRef} // Assign ref for GSAP parallax
                className="relative z-20 flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto px-8 lg:px-16 gap-12 text-center lg:text-left"
                variants={containerVariants}
                initial="hidden"
                whileInView="show" // Animate when the component comes into view
                viewport={{ amount: 0.2, once: true }} // Trigger animation when 20% of component is visible, only once
            >
                {/* Left Column - Avatar & Socials */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center "
                >
                    <div className="relative group mb-8">
                        {/* Animated glowing border effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-slow"></div>
                        <img
                            ref={profileImageRef} // Assign ref for GSAP parallax
                            src="https://placehold.co/300x300/1a202c/a0aec0?text=Profile" // Placeholder image, replace with your actual image path
                            alt="Profile"
                            className={`relative w-48 h-48 lg:w-64 lg:h-64 rounded-full border-4 border-gray-700 object-cover shadow-2xl transition-opacity duration-500 ${profileImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setProfileImageLoaded(true)} // Set state when image loads
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/1a202c/a0aec0?text=Profile Error"; }}
                        />
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-4 mb-8">
                        <motion.a
                            whileHover={{ y: -6, color: '#6C5CE7' }} // Hover animation for icons
                            href="https://github.com/NancySri453" // Replace with your GitHub URL
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <FaGithub size={28} />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -6, color: '#0077B5' }} // LinkedIn blue
                            href="linkedin.com/in/nancy-srivastava-9742bb213" // Replace with your LinkedIn URL
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <FaLinkedin size={28} />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -6, color: '#1DA1F2' }} // Twitter blue
                            href="https://x.com/yourusername" // Replace with your Twitter URL
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <FaTwitter size={28} />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -6, color: '#4CAF50' }} // LeetCode green
                            href="https://leetcode.com/u/yourusername/" // Replace with your LeetCode URL
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <SiLeetcode size={28} />
                        </motion.a>
                    </div>

                    {/* Download Resume Button */}
                    <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(100, 92, 231, 0.4)" }} // Button hover effect
                        whileTap={{ scale: 0.95 }} // Button tap effect
                        href="/your-resume.pdf" // Replace with the actual path to your resume PDF
                        download="Resume_nancy.pdf"
                        className=" whitespace-nowrap px-5 py-4 bg-gradient-to-r from-teal-700 to-purple-600 rounded-full flex items-center justify-center gap-3 text-white font-semibold text-lg shadow-xl transition-all duration-300"
                    >
                        <FaFileDownload size={20} /> Download Resume
                    </motion.a>
                </motion.div>

                {/* Right Column - Text Content */}
                <motion.div
                    variants={containerVariants} // Apply container variants to this right column as well
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.2, once: true }}
                    className="max-w-3xl lg:ml-auto"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl lg:text-5xl font-extrabold text-white mb-2 leading-tight"
                    >
                        Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-200">Nancy</span>
                    </motion.h1>

                    {/* Type Animation for Developer Role */}
                    <motion.div
                        variants={itemVariants}
                        className="text-2xl lg:text-3xl font-light text-gray-300 mb-3 h-12 lg:h-16 flex items-center justify-center lg:justify-start"
                    >
                        <TypeAnimation
                            sequence={[
                                'a Software Engineer.',
                                1500, // wait 1.5s
                                'a Full Stack Developer.',
                                1500,
                                'a Python Developer.',
                                1500,
                                'a Tech Enthusiast.',
                                1500
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-blue-300"
                        />
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg lg:text-md text-gray-300 mb-8 leading-relaxed"
                    >
                        I'm a passionate engineer with **years of experience** in building scalable web applications. My expertise lies in DataScience, Python, springboot, and Databases.
                        I'm deeply committed to writing clean, efficient, and maintainable code,
                        and I thrive on solving complex technical challenges to deliver impactful user experiences.
                    </motion.p>

                    {/* Education Section */}
                    <div className="mb-8 text-left">
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-white mb-6"
                        >
                            Education
                        </motion.h2>
                        <motion.div
                            variants={containerVariants} // Stagger education items
                            initial="hidden"
                            whileInView="show"
                            viewport={{ amount: 0.2, once: true }}
                            className="relative"
                        >
                            {/* Vertical line for timeline effect */}
                            <div className="absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

                            <div className="ml-8 space-y-6">
                                <motion.div
                                    variants={itemVariants} // Apply to individual education item
                                    className="relative group p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                                >
                                    {/* Circle indicator for timeline */}
                                    <div className="absolute -left-10 top-4 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">B-tech in Information Technology</h3>
                                    <p className="text-blue-300">Medicaps University • 2021-2025</p>
                                    <p className="text-gray-400 mt-1">Specialization in Data Science and AI</p>
                                </motion.div>
                                <motion.div
                                    variants={itemVariants} // Apply to individual education item
                                    className="relative group p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                                >
                                    <div className="absolute -left-10 top-4 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">High School </h3>
                                    <p className="text-blue-300">Shri Gujrati Samaj A.M.N • 2019-2021</p>
                                    <p className="text-gray-400 mt-1">Focus on Science and Mathematics</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AboutMe;
