
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


const blobAnimationCss = `
 
  /* Specific sizes, colors, and blurs based on Tailwind equivalents */
  

  
.blob-base {
    
    animation: blob-animation 7s infinite; /* Equivalent to animate-blob */
  }
  
  .blob-delay-2000 {
    animation-delay: 2s; /* Equivalent to animation-delay-2000 */
  }

  .blob-delay-4000 {
    animation-delay: 4s; /* Equivalent to animation-delay-4000 */
  }

  /* Keyframes for the blob animation */
  @keyframes blob-animation {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 60px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
`;

// 🟡 Contact data at the top
const contactInfo = {
  email: "nansri1905.p@gmail.com",
  phone: "+91 83199 52745",
  location: "Indore, Madhya Pradesh, India",
  socials: [
    {
      icon: FaGithub,
      url: "https://github.com/NancySri453",
      hoverColor: "hover:text-white",
    },
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/in/nancy-srivastava-9742bb213",
      hoverColor: "hover:text-blue-500",
    },
    {
      icon: FaXTwitter,
      url: "", // Empty URL for XTwitter as provided
      hoverColor: "hover:text-blue-400",
    },
  ]
};

// 🟡 Email form handler
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log("Form submitted:", data);
  // Using a simple alert for simulation, consider a custom modal in production
  alert("Message sent! (Simulated)");
  e.target.reset();
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  // Note: rotateX, rotateY, handleMouseMove, handleMouseLeave, handleMouseEnter
  // are present but commented out in your original code's style prop,
  // so they are kept here for completeness but not actively used for rotation
  // unless you uncomment the style properties.
  const rotateX = useTransform(mouseY, [0, 1], [-15, 15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const inViewVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const itemStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // 🟡 Inject the CSS into the document head using useMemo and useEffect
  const styleElement = useMemo(() => {
    const style = document.createElement('style');
    style.textContent = blobAnimationCss;
    return style;
  }, []);

  useEffect(() => {
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styleElement]);

  return (
    <section
      id='contact'
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 bg-gradient-to-b  overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0 bg-[url('/images/dots-grid.svg')] bg-repeat opacity-10"
        style={{ y: yBg }}
      />
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      >
        {/* 🟡 Blob elements with custom classes */}
         <div className="w-96 h-96 bg-purple-600 blob-base rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob base-blob"></div>
        <div className="w-80 h-80 bg-blue-500 blob-base rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="w-72 h-72 bg-teal-500 blob-base rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div> </motion.div>

      <motion.div style={{ y: yContent }} className="relative z-10 w-full max-w-5xl">
        <motion.h2
          variants={inViewVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-5xl  lg:text-7xl font-extrabold text-white text-center mb-16 relative"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Contact Me
          </span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-gray-700 opacity-5 z-0 font-extrabold pointer-events-none select-none">
            REACH OUT
          </span>
        </motion.h2>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          style={{
            // rotateX: isHovering ? rotateX : 0, // Commented out as in original
            // rotateY: isHovering ? rotateY : 0, // Commented out as in original
            // x: isHovering ? 0 : 0, // Commented out as in original
            // y: isHovering ? 0 : 0, // Commented out as in original
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5
          }}
          variants={itemStaggerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-transparent rounded-xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-70"
        >
          {/* Contact Info Left */}
          <motion.div variants={inViewVariants} className="flex flex-col gap-6 text-gray-300 lg:w-1/2">
            <h3 className="text-3xl font-bold text-white mb-4">Let's Connect!</h3>
            <p className="text-lg leading-relaxed">
              Want to hire me, have a question, or just want to say hello? Feel free to reach out. I'd love to hear from you!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-purple-400 text-xl" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-purple-400 transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-purple-400 text-xl" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-purple-400 transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-purple-400 text-xl" />
                <span>{contactInfo.location}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              {contactInfo.socials.map(({ icon: Icon, url, hoverColor }, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${hoverColor} transition-colors`}
                >
                  <Icon size={28} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form Right */}
          <motion.div variants={inViewVariants} className="lg:w-1/2">
            <h3 className="text-3xl font-bold text-white mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                <input type="text" id="name" name="name" required className="w-full p-3 rounded-md text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all duration-300" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Your Email</label>
                <input type="email" id="email" name="email" required className="w-full p-3 rounded-md text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all duration-300" />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea id="message" name="message" rows="5" required className="w-full p-3 rounded-md text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 focus:ring-opacity-50 outline-none resize-y transition-all duration-300"></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message <FaEnvelope className="ml-2" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
