import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; // Recommended hook for React


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

 const workExperiences = [
    {
        id: 1,
        title: "Software Engineer",
        company: "InnovateTech Solutions",
        duration: "Jan 2023 - Present",
        location: "Bengaluru, India",
        description: [
            "Developed and maintained scalable backend services using Node.js and Express, improving API response times by 20%.",
            "Implemented new features in a React.js frontend application, enhancing user engagement and reducing bug reports by 15%.",
            "Collaborated with cross-functional teams to define, design, and ship new features.",
            "Contributed to code reviews and mentored junior developers.",
            "Managed and optimized MongoDB databases for high performance.",
        ],
        technologies: ["Node.js", "Express", "React.js", "MongoDB", "AWS", "Docker"],
    },
    {
        id: 2,
        title: "Full Stack Developer Intern",
        company: "NextGen Software",
        duration: "May 2022 - Dec 2022",
        location: "Mumbai, India",
        description: [
            "Assisted in the development of a customer relationship management (CRM) system using Python (Django) and React.",
            "Wrote unit and integration tests to ensure code quality and reliability.",
            "Participated in agile development methodologies, including daily stand-ups and sprint reviews.",
            "Troubleshot and debugged production issues, resolving critical bugs efficiently.",
        ],
        technologies: ["Python", "Django", "React.js", "PostgreSQL", "Git"],
    },
    {
        id: 3,
        title: "Junior Web Developer",
        company: "WebCrafters Studio",
        duration: "Aug 2021 - Apr 2022",
        location: "Pune, India",
        description: [
            "Built responsive static websites for clients using HTML, CSS, and JavaScript.",
            "Optimized website performance, leading to a 10% improvement in page load speed.",
            "Utilized version control (Git) for collaborative development.",
        ],
        technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Figma"],
    },
];

const WorkExperience = () => {
    const sectionRef = useRef(null);
    const experienceRefs = useRef([]);
    experienceRefs.current = []; // Initialize to an empty array

    const addToRefs = (el) => {
        if (el && !experienceRefs.current.includes(el)) {
            experienceRefs.current.push(el);
        }
    };

    useGSAP(() => {
        // Animation for the section title
        gsap.fromTo(".section-title",
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%", // When the top of the section is 80% down the viewport
                toggleActions: "play none none none"
            }}
        );

        // Animate each experience item as it scrolls into view
        experienceRefs.current.forEach((el, index) => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top 75%", // When the top of the experience item is 75% down the viewport
                    end: "bottom 25%",
                    toggleActions: "play none none reverse", // Play on enter, reverse on leave
                    // markers: true, // Uncomment for debugging ScrollTrigger
                }
            });

            timeline
                .fromTo(el,
                    { opacity: 0, y: 50, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                    0 // Start at 0 seconds
                )
                .fromTo(el.querySelector('.experience-header'),
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
                    0.2 // Stagger 0.2 seconds after item animation
                )
                .fromTo(el.querySelector('.experience-details'),
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
                    0.3 // Stagger 0.3 seconds after item animation
                )
                .fromTo(el.querySelector('.experience-description'),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                    0.4 // Stagger 0.4 seconds after item animation
                )
                .fromTo(el.querySelector('.experience-tech'),
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
                    0.5 // Stagger 0.5 seconds after item animation
                );
        });
    }, []); // Empty dependency array means this runs once on mount

    return (
        <section
            id="work-experience"
            ref={sectionRef}
            className="relative w-full min-h-screen  text-gray-100 py-16 px-4 lg:px-8 font-inter overflow-hidden"
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="section-title text-4xl lg:text-5xl font-extrabold text-center mb-12">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
                        Work Experience
                    </span>
                </h2>

                <div className="relative space-y-12">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-700 h-full hidden md:block"></div>

                    {workExperiences.map((job, index) => (
                        <div
                            key={job.id}
                            ref={addToRefs} // Attach ref to each item
                            className={`relative flex flex-col md:flex-row items-start ${
                                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            } justify-center md:justify-between w-full`}
                        >
                            {/* Timeline Dot (for desktop) */}
                            <div className="hidden md:block absolute top-6 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-700 -translate-x-1/2 left-1/2 z-10 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>

                            {/* Job Card */}
                            <div
                                className={`w-full md:w-[calc(50%-30px)] p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700 hover:border-purple-600 transition-all duration-300 transform md:hover:scale-[1.02] ${
                                    index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"
                                }`}
                            >
                                <div className="experience-header mb-2">
                                    <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                                    <p className="text-purple-300 text-lg">{job.company}</p>
                                </div>
                                <div className="experience-details text-gray-400 text-sm mb-4">
                                    <p>{job.duration}</p>
                                    <p>{job.location}</p>
                                </div>
                                <ul className="experience-description list-disc list-inside text-gray-300 text-base mb-4 space-y-1">
                                    {job.description.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                                <div className="experience-tech flex flex-wrap gap-2">
                                    {job.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="bg-purple-700/30 text-purple-200 text-xs px-3 py-1 rounded-full font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;