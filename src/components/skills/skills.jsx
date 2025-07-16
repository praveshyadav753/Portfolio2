import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { Code, Star, Briefcase } from "lucide-react"; // Import necessary icons
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {Object} SkillItem
 * @property {string} name - The name of the skill.
 */

/**
 * @typedef {Object} SkillCategory
 * @property {string} title - The title of the skill category (e.g., "Frontend").
 * @property {React.ComponentType} icon - The Lucide React icon component for the category.
 * @property {string} bulletColorClass - Tailwind CSS class for the bullet point color (e.g., "bg-purple-400").
 * @property {string[]} items - An array of skill names within this category.
 */

/**
 * SkillsSection component displays a list of skills with GSAP scroll animations.
 * Skills are passed as a prop, allowing for dynamic content.
 *
 * @param {Object} props - The component props.
 * @param {SkillCategory[]} props.skills - An array of skill categories to display.
 */
const SkillsSection = ({ skills }) => {
  const skillsRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null); // Ref for the skills content wrapper

  useEffect(() => {
    // Create a GSAP context to manage animations, ensuring proper cleanup on unmount
    const ctx = gsap.context(() => {
      // 1. Pin the entire skills section until its bottom leaves the viewport
      // This ensures all internal content has time to appear before the next section scrolls up.
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top top",
        // Pin until the bottom of this section hits 40% from the bottom of the viewport
        end: "bottom 40%",
        pin: true,
        pinSpacing: true, // Keep pinSpacing true for smooth transition to next section
      });

      // 2. Animate the heading: shrink, move up, fade out
      gsap.to(headingRef.current, {
        fontSize: "3rem", // Target font size after shrinking
        y: -150, // Move significantly up
        opacity: 0.7, // Fade out almost completely
        duration: 1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top top", // Starts immediately when section pins
          scrub: 0.5, // Smoothly tied to scroll
          end: "bottom center", // Heading animation completes over ~300 pixels of scroll
        },
      });

      // 3. Animate the skills content wrapper: slide up and fade in
      // This animation should occur well within the main section's pinned duration.
      gsap.from(contentRef.current, {
        y: "100%", // Start from below its final position
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top top",
          // This is later than before, ensuring heading has shrunk more
          end: "bottom 35%", // Ends its primary reveal
          scrub: 0.5, // Smoothly scrub the content reveal
        },
      });

      // 4. Individual Skill Category and Item Animations
      // Animate skill categories to fade in and slide up
      gsap.from(skillsRef.current.querySelectorAll(".skill-category"), {
        opacity: 0,
        y: 30,
        stagger: 0.2, // Stagger the animation for each category
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 20%", // Adjusted to appear after contentRef.current starts
          toggleActions: "play none none reverse", // Play on enter, reverse on leave back
        },
      });

      // Animate individual skill items to fade in and scale up
      gsap.from(skillsRef.current.querySelectorAll(".skill-item"), {
        opacity: 0,
        scale: 0.8,
        stagger: 0.05, // Stagger the animation for each item
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 20%", // Adjusted to appear after categories start
          toggleActions: "play none none reverse", // Play on enter, reverse on leave back
        },
      });
    }, skillsRef); // GSAP context scope, ensures animations are reverted on unmount

    // Cleanup function for GSAP context
    return () => ctx.revert();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <section
      id="skills"
      ref={skillsRef}
      // Tailwind CSS classes for full-screen and centering
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-white"
    >
      <h2
        ref={headingRef}
        className="skills-heading text-6xl md:text-8xl font-extrabold text-center z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center whitespace-nowrap"
        style={{ willChange: "transform, opacity, font-size" }} // Optimize for animation performance
      >
        <Code className="mr-4 text-teal-400" size={60} /> My Skills
      </h2>

      {/* The skills content wrapper, initially hidden and positioned at the bottom */}
      <div
        ref={contentRef}
        // Tailwind CSS classes for positioning and initial state
        className="skills-content-wrapper absolute bottom-0 left-0 w-full py-20 px-8 "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Dynamically render skill categories based on the 'skills' prop */}
          {skills.map((category, categoryIndex) => {
            const IconComponent = category.icon; // Get the icon component from the prop
            return (
              <div
                key={categoryIndex} // Use index as key if no unique ID is available
                className="skill-category bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
              >
                <h3 className="text-2xl font-semibold text-teal-400 mb-4 flex items-center">
                  {IconComponent && <IconComponent className="mr-2" size={24} />} {/* Render icon if provided */}
                  {category.title}
                </h3>
                <ul className="space-y-3 text-gray-300">
                  {category.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="skill-item flex items-center">
                      <span className={`w-2 h-2 ${category.bulletColorClass} rounded-full mr-3`}></span>
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

// Example usage of the SkillsSection component:
// This would typically be in your App.js or a parent component.


