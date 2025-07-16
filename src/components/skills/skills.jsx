import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code, Star, Briefcase, User } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(skillsRef.current.querySelector('.skills-heading'), {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(skillsRef.current.querySelectorAll('.skill-category'), {
        opacity: 0,
        y: 30,
        stagger: 0.4,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(skillsRef.current.querySelectorAll('.skill-item'), {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="  w-full py-20 px-8">
      <h2 className="skills-heading text-4xl md:text-5xl font-bold text-center text-white mb-12 flex items-center justify-center">
        <Code className="mr-4 text-teal-400" size={40} /> My Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Frontend */}
        <div className="skill-category bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4 flex items-center">
            <Star className="mr-2" size={24} /> Frontend
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>React.js</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Next.js</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>JavaScript (ES6+)</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>TypeScript</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>HTML5 & CSS3</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>Tailwind CSS</li>
          </ul>
        </div>

        {/* Backend */}
        <div className="skill-category bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4 flex items-center">
            <Briefcase className="mr-2" size={24} /> Backend
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Node.js</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Express.js</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Python (Django/Flask)</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>RESTful APIs</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>GraphQL</li>
          </ul>
        </div>

        {/* Databases & Tools */}
        <div className="skill-category bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4 flex items-center">
            <Code className="mr-2" size={24} /> Databases & Tools
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>MongoDB</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>PostgreSQL</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Firebase / Firestore</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Git & GitHub</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Docker</li>
            <li className="skill-item flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>AWS / Google Cloud</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default SkillsSection