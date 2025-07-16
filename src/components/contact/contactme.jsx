import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const ContactMe = () => {
    const formRef = useRef(null); // Ref for the contact form for potential future use (e.g., form submission logic)

    // State for form fields (optional, but good for controlled components)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission (placeholder for actual submission logic)
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend service
        // e.g., via fetch API, Axios, or a dedicated form service (Formspree, Netlify Forms etc.)
        console.log('Form submitted:', formData);
        // Display a message to the user instead of alert()
        alert('Thank you for your message! I will get back to you soon.'); // Using simple alert for demonstration, replace with custom modal
        setFormData({ name: '', email: '', message: '' }); // Clear form
    };

    // Animation variants for staggered reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // Variants for individual items within the staggered container
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } },
    };

    return (
        <section
            id="contact"
            className="relative w-full min-h-screen  flex flex-col items-center justify-center py-16 px-4 lg:px-8 font-inter text-gray-100 overflow-hidden"
        >
            {/* Background Particles (assuming tsparticles is initialized globally or in parent) */}
            {/* If you want particles specific to this section, you'd re-initialize tsparticles here */}
            {/* For simplicity and performance, we'll assume the main background particles are sufficient. */}

            <motion.div
                className="max-w-4xl w-full mx-auto bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.2, once: true }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl lg:text-5xl font-extrabold text-center mb-6 lg:mb-10 tracking-wide"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400 drop-shadow-lg">
                        Get in Touch
                    </span>
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-lg lg:text-xl text-gray-300 text-center mb-8 lg:mb-12 max-w-2xl mx-auto"
                >
                    Have a question, a project idea, or just want to say hello? Feel free to reach out!
                </motion.p>

                {/* Contact Form */}
                <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    variants={containerVariants} // Stagger children of the form
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.2, once: true }}
                >
                    <motion.div variants={itemVariants}>
                        <label htmlFor="name" className="block text-gray-300 text-sm font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all duration-200"
                            placeholder="Your Name"
                            required
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all duration-200"
                            placeholder="your.email@example.com"
                            required
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label htmlFor="message" className="block text-gray-300 text-sm font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 resize-y transition-all duration-200"
                            placeholder="Tell me about your project or inquiry..."
                            required
                        ></textarea>
                    </motion.div>

                    <motion.button
                        type="submit"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(108, 92, 231, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center gap-3 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <FaPaperPlane size={20} /> Send Message
                    </motion.button>
                </motion.form>

                {/* Social Media Links & Direct Email */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pt-8 border-t border-gray-700"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.2, once: true }}
                >
                    <motion.a
                        variants={itemVariants}
                        whileHover={{ y: -8, color: '#6C5CE7', scale: 1.1 }}
                        href="https://github.com/yourusername" // Replace with your GitHub URL
                        target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-purple-400 transition-all duration-300"
                        aria-label="GitHub Profile"
                    >
                        <FaGithub size={32} />
                    </motion.a>
                    <motion.a
                        variants={itemVariants}
                        whileHover={{ y: -8, color: '#0077B5', scale: 1.1 }}
                        href="https://linkedin.com/in/yourusername" // Replace with your LinkedIn URL
                        target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-500 transition-all duration-300"
                        aria-label="LinkedIn Profile"
                    >
                        <FaLinkedin size={32} />
                    </motion.a>
                    <motion.a
                        variants={itemVariants}
                        whileHover={{ y: -8, color: '#1DA1F2', scale: 1.1 }}
                        href="https://x.com/yourusername" // Replace with your Twitter URL
                        target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-cyan-400 transition-all duration-300"
                        aria-label="Twitter Profile"
                    >
                        <FaTwitter size={32} />
                    </motion.a>
                    <motion.a
                        variants={itemVariants}
                        whileHover={{ y: -8, color: '#4CAF50', scale: 1.1 }}
                        href="https://leetcode.com/u/yourusername/" // Replace with your LeetCode URL
                        target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-green-400 transition-all duration-300"
                        aria-label="LeetCode Profile"
                    >
                        <SiLeetcode size={32} />
                    </motion.a>
                    <motion.a
                        variants={itemVariants}
                        whileHover={{ y: -8, color: '#F0F0F0', scale: 1.1 }}
                        href="mailto:your_email@example.com" // Replace with your actual email
                        className="text-gray-300 hover:text-gray-100 transition-all duration-300"
                        aria-label="Send an Email"
                    >
                        <FaEnvelope size={32} />
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ContactMe;
