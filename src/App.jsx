import { useEffect, useState } from 'react';
import './App.css';
import { useRef } from 'react'; // useRef is always imported from 'react'
import gsap from 'gsap';
import mySkillsData from './components/skills/SkillsData';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workExperiences from './components/work/experiencedata'
import projectsData from './components/projects/projectdata';


// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Import your custom components
import { AboutMe, ContactMe, Gitactivity, Intro, Navbar, ProjectsSection, SkillsSection, WorkExperience } from './Exports';
import Footer from './components/foooter/footer';

function App() {
    // hello ref for the main container (ScrollTrigger trigger)
    const hello = useRef(null); // Initialize with null

    // backgroundCirclesRef must be declared OUTSIDE of useEffect
    // It needs to persist across renders and be accessible by the JSX elements
    const backgroundCirclesRef = useRef([]);

    // useEffect hook to handle GSAP animations and their lifecycle
    useEffect(() => {
        // Ensure the trigger element (hello.current) is available before setting up animations
        if (!hello.current) {
            return;
        }

        // Loop through each background circle and create a GSAP animation
        backgroundCirclesRef.current.forEach((circle, i) => {
            // Ensure the specific circle element exists before animating it
            if (circle) {
                gsap.to(circle, {
                  // y:450,
                     y: (i % 2 === 0 ? 500 : 500), // Move circles in opposite directions
                    x: (i % 3 === 0 ? 100 : -100), // Vary x movement
                    scale: 0.8, // Scale the circles down significantly
                    opacity: 0.4, // Increase opacity subtly
                    ease: "none", // Linear animation progress for scrubbing
                    scrollTrigger: {
                        trigger: hello.current, // The main div is the trigger
                        start: "top top", // Animation starts when the top of 'hello' hits the top of the viewport
                        end: `+=700`, // Animation ends when the bottom of 'hello' is 40% from the bottom of the viewport
                        scrub: true, // Link animation progress to scrollbar
                    }
                });
            }
        });

        // Cleanup function for ScrollTrigger instances
        // This is vital for preventing memory leaks when the component unmounts
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            // Optionally, clear GSAP tweens if needed, but 'kill' for ScrollTrigger is usually enough
            // gsap.killTweensOf(backgroundCirclesRef.current);
        };
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    return (
        // The main container for your app, acting as the ScrollTrigger's trigger
        <div  className='bg-gradient-to-r  from-black  to-black relative  min-h-screen' style={{

        // backgroundImage: `
        //   linear-gradient(to right, black, #111827), /* from-black to-gray-900 */
        //   radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 50%), /* before:bg-[radial...] */
        //   radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%) /* after:bg-[radial...] */
        // `,
        
      }}>
            {/* Background circles container */}
            <div ref={hello} className="absolute h-[400px] inset-0 top-1  z-1 pointer-events-none">
                {/* Each background circle with its ref assignment */}
                {/* The 'el => backgroundCirclesRef.current[index] = el' syntax populates the ref array */}
                <div ref={el => backgroundCirclesRef.current[0] = el} className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div ref={el => backgroundCirclesRef.current[1] = el} className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div ref={el => backgroundCirclesRef.current[2] = el} className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main content components */}
            <Navbar />
            <Intro />
            <AboutMe />
            <SkillsSection skills={mySkillsData}/>
            <WorkExperience workExperiences={workExperiences} />

            <ProjectsSection projectsData={projectsData}/>
            <Gitactivity />
            <ContactMe />
            <Footer/>
            
        </div>
    );
}

export default App;