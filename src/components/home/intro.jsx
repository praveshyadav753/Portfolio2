import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code, Star, Briefcase, User } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


function Intro() { // Renamed function to Intro for consistency and best practices
    const heroRef = useRef(null);
    const backgroundCirclesRef = useRef([]); // Ref for background circles

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial entrance animation
            const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
            heroTl.from(heroRef.current.querySelector('.hero-name'), { y: 50, opacity: 0, duration: 1 })
                .from(heroRef.current.querySelector('.hero-title'), { y: 50, opacity: 0, duration: 1, delay: -0.8 })
                .from(heroRef.current.querySelector('.hero-description'), { opacity: 0, duration: 1, delay: -0.6 })
                .from(heroRef.current.querySelector('.hero-image'), { scale: 0.8, opacity: 0, duration: 1, delay: -0.8, ease: "back.out(1.7)" })
                .from(heroRef.current.querySelectorAll('.hero-social a'), { opacity: 0, y: 20, stagger: 0.2, duration: 0.6, delay: -0.5 });

            // Parallax effects
            // Parallax for the main content block
            gsap.to(heroRef.current.querySelector('.hero-content-wrapper'), {
                y: -190, // Move up slightly as we scroll down
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top", // Start when the top of the section hits the top of the viewport
                    end: "bottom top", // End when the bottom of the section leaves the top of the viewport
                    scrub: true, // Smoothly animate with scroll
                }
            });

            // Parallax for the hero image
            gsap.to(heroRef.current.querySelector('.hero-image'), {
                y: 50, // Move down slightly slower than the scroll
                x: 60, // Move left slightly
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
           

        }, heroRef); // Scope GSAP animations to heroRef

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} id="home" className="hero-content hero-content-wrapper text-gray-100 font-inter antialiased relative h-screen flex items-center justify-center text-center p-8 overflow-hidden">
            {/* Background gradient circles for visual interest */}
            {/* <div className="absolute inset-0 z-0 ">
                <div ref={el => backgroundCirclesRef.current[0] = el} className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div ref={el => backgroundCirclesRef.current[1] = el} className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div ref={el => backgroundCirclesRef.current[2] = el} className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
           </div>  */}

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center md:space-x-12 hero-content-wrapper">
                <div className=" text-center md:text-left mb-8 md:mb-0">
                    <h1 className="hero-name text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                        Hi, I'm <span className="text-teal-400">Nancy Srivastava</span>.
                    </h1>
                    <p className="hero-title text-2xl md:text-4xl font-semibold text-gray-300 mb-6">
                        A Passionate <span className="text-purple-300">Software Engineer</span>.
                    </p>
                    <p className="hero-description text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
                        I build robust and scalable applications with a focus on clean code and exceptional user experiences.
                    </p>
                    <div className="hero-social flex justify-center md:justify-start space-x-6">
                        <a href="https://github.com/NancySri453" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                            <Github size={32} />
                        </a>
                        <a href="linkedin.com/in/nancy-srivastava-9742bb213" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                            <Linkedin size={32} />
                        </a>
                        <a href="mailto:nansri1905@gmail.com" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                            <Mail size={32} />
                        </a>
                    </div>
                </div>
                <div className="hero-image flex-shrink-0 mt-8 md:mt-0">
                    <img
                        src="https://placehold.co/300x300/1a202c/a0aec0?text=Profile"
                        alt="Profile Picture"
                        className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-teal-400 shadow-2xl object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/1a202c/a0aec0?text=Profile"; }}
                    />
                </div>
            </div>
        </section>
    );
};


export default Intro;
