import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { Code, Star, Briefcase } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = ({ skills }) => {
  const skillsRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Pin the entire skills section
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top top",
        end: "bottom 40%",
        pin: true,
        pinSpacing: true,
      });

      // 2. Animate the main heading: shrink, move up, fade out
      gsap.fromTo(
        headingRef.current,
        {
          y: 0,
          opacity: 1,
          fontSize: "6rem",
        },
        {
          y: "-40vh",
          fontSize: "3rem",
          opacity: 0.9,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top top",
            end: "bottom center",
            scrub: 0.5,
          },
        }
      );

      // 3. Animate the subtitle: fade in and slide up slightly
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 0,
          opacity: 0,
        },
        {
          y: "-39vh",
          opacity: 1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top top",
            end: "bottom center",
            scrub: 0.5,
          },
        }
      );

      // 4. Animate the skills content wrapper: slide up and fade in
      gsap.fromTo(
        contentRef.current,
        {
          yPercent: 60,
          opacity: 0,
        },
        {
          yPercent: -5,
          opacity: 1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: 0.5,
          },
        }
      );

      // 5. Individual Skill Category and Item Animations
      gsap.from(skillsRef.current.querySelectorAll(".skill-category"), {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(skillsRef.current.querySelectorAll(".skill-item"), {
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden text-white"
    >
      {/* Header Section */}
      <div className="w-full flex flex-col items-center justify-start pt-16 z-20">
        <h2
          ref={headingRef}
          className="skills-heading text-6xl md:text-8xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-teal-200 flex items-center justify-center whitespace-nowrap"
          style={{ willChange: "transform, opacity, font-size" }}
        >
          <Code className="mr-4 text-teal-400" size={60} /> My Skills
        </h2>

        <h3
          ref={subtitleRef}
          className="text-3xl text-center opacity-0 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-600 mt-4"
          style={{ willChange: "transform, opacity" }}
        >
          Real-world experience that shaped my craft.
        </h3>
      </div>

      {/* Content Section */}
      <div
        ref={contentRef}
        className="skills-content-wrapper absolute top-1/4 left-0 w-full py-7 lg:py-20 px-8 z-10"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skills?.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                // MODIFIED CLASSNAME FOR GLOSSY EFFECT
                className="skill-category relative p-6 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200
                                                "
              
  style={{
       
        backgroundColor: "rgba(26, 43, 61, 0.1)", // More transparent base for glossy effect
        border: "2px solid rgba(0, 20, 25, 0.6)", // Slightly transparent border
        color: "white",
        backdropFilter: "blur(15px)", // Apply blur directly to the card for the glossy effect
        textAlign: "center",
        overflow: "hidden",
        backgroundImage: `
          radial-gradient(circle at 15% 85%, rgba(75, 1, 105, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 85% 15%, rgba(22, 27, 12, 0.3) 0%, transparent 60%)
        `, 
      }}>
               

                <h3 className="text-2xl font-semibold text-teal-400 mb-4 flex items-center relative z-10">
                  {IconComponent && (
                    <IconComponent className="mr-2" size={24} />
                  )}
                  {category.title}
                </h3>
                <ul className="space-y-3 text-gray-300 relative z-10">
                  {category.items?.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="skill-item flex items-center"
                    >
                      <span
                        className={`w-2 h-2 ${category.bulletColorClass} rounded-full mr-3 flex-shrink-0`}
                      ></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;