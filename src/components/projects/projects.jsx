import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Correct import for ScrollTrigger
import ProjectCard from './projectcard'; // Assuming ProjectCard.js is in the same directory

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define project data to be used by the RadialProjectList
// In a real application, this data might come from an API or a parent component.
const projectsData = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features user authentication, product management, and secure payment processing.",
        imageUrl: "https://placehold.co/600x400/FF00FF/FFFFFF?text=E-commerce+Platform", // Neon Pink
        githubUrl: "https://github.com/yourusername/ecommerce-platform",
        liveDemoUrl: "https://live-ecommerce.yourdomain.com"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A responsive web application for managing tasks and projects, featuring drag-and-drop functionality and real-time updates using Firebase.",
        imageUrl: "https://placehold.co/600x400/00FFFF/000000?text=Task+Manager+App", // Neon Cyan
        githubUrl: "https://github.com/yourusername/task-manager-app",
        liveDemoUrl: "https://task-manager.yourdomain.com"
    },
    {
        id: 3,
        title: "AI Chatbot Interface",
        description: "An interactive AI chatbot interface developed with Python (Flask backend) and React (frontend), leveraging natural language processing for dynamic conversations.",
        imageUrl: "https://placehold.co/600x400/FFFF00/000000?text=AI+Chatbot+Interface", // Neon Yellow
        githubUrl: "https://github.com/yourusername/ai-chatbot",
        liveDemoUrl: "https://chatbot.yourdomain.com"
    },
    {
        id: 4,
        title: "Personal Blog & CMS",
        description: "A content management system (CMS) and personal blog built with Next.js and headless CMS (Strapi). Optimized for SEO and fast loading times.",
        imageUrl: "https://placehold.co/600x400/00FF00/000000?text=Personal+Blog", // Neon Green
        githubUrl: "https://github.com/yourusername/personal-blog",
        liveDemoUrl: "https://blog.yourdomain.com"
    },
    {
        id: 5,
        title: "Weather Dashboard",
        description: "A real-time weather dashboard fetching data from a public API, displaying current conditions and forecasts with interactive charts.",
        imageUrl: "https://placehold.co/600x400/FF6600/FFFFFF?text=Weather+Dashboard", // Neon Orange
        githubUrl: "https://github.com/yourusername/weather-dashboard",
        liveDemoUrl: "https://weather.yourdomain.com"
    },
    {
        id: 6,
        title: "Recipe Finder App",
        description: "An application that allows users to search for recipes based on ingredients, dietary restrictions, and cuisine type, using an external recipe API.",
        imageUrl: "https://placehold.co/600x400/9900FF/FFFFFF?text=Recipe+Finder", // Neon Purple
        githubUrl: "https://github.com/yourusername/recipe-finder",
        liveDemoUrl: "https://recipes.yourdomain.com"
    }
];

const RadialProjectList = () => { 
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const totalCards = projectsData.length; // Use internal projectsData

  useEffect(() => {
    // Ensure GSAP and ScrollTrigger are available
    if (!gsap || !ScrollTrigger) {
      console.error("GSAP or ScrollTrigger not loaded.");
      return;
    }

    // Define the ellipse dimensions and center point for the radial layout
    const radiusX = 500; // Horizontal radius of the ellipse
    const radiusY = 600; // Vertical radius of the ellipse
    // Center the ellipse horizontally in the viewport
    const centerX = window.innerWidth / 2;
    // Position the center of the ellipse lower on the page, so cards start from below
    const centerY = window.innerHeight * 1.4;

    // Calculate the angular gap between each card for even distribution
    const angleGap = (Math.PI * 2) / totalCards;

    // Set initial positions for each card using GSAP's .set()
    cardRefs.current.forEach((card, i) => {
      // Calculate the angle for the current card
      // - Math.PI / 2 makes the first card start at the top of the ellipse
      const angle = i * angleGap - Math.PI / 2;
      // Calculate X and Y coordinates on the ellipse
      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);

      // Apply initial positioning and styling using GSAP
      gsap.set(card, {
        x, // X position
        y, // Y position
        transform: 'translate(-50%, -50%)', // Center the card element
        position: 'absolute', // Enable absolute positioning
        // Optional: initial opacity and scale for a fade-in effect with the scroll
        opacity: 0.8,
        scale: 0.8
      });
    });

    // Create a GSAP timeline linked to ScrollTrigger for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // The element that triggers the animation
        start: 'top top', // Animation starts when the top of the trigger hits the top of the viewport
        end: '+=2000', // Animation lasts for 2000 pixels of scroll
        scrub: true, // Smoothly link animation progress to scroll position
        pin: true, // Pin the trigger element in place while the animation runs
        anticipatePin: 1, // Pre-render pinning to avoid jumpiness
      
      },
    });

    // Animate each card along the ellipse path
    cardRefs.current.forEach((card, i) => {
      const baseAngle = i * angleGap; // Base angle for each card

      tl.to(card, {
        // onUpdate function to continuously calculate and update card positions
        onUpdate: function () {
          // Get the current progress of the timeline (0 to 1)
          const progress = tl.progress();
          // Calculate the new angle based on scroll progress
          // progress * Math.PI * 2 makes cards complete a full rotation
          const angle = baseAngle + progress * Math.PI * 2 - Math.PI / 2;
          // Recalculate X and Y based on the new angle
          const x = centerX + radiusX * Math.cos(angle);
          const y = centerY + radiusY * Math.sin(angle);

          // Update card position and also scale/opacity for a dynamic effect
          gsap.set(card, {
            x,
            y,
            // Scale cards based on their position (closer to center = larger)
            scale: 0.8 + (1 - Math.abs(Math.sin(angle))) * 0.4, // Scale between 0.8 and 1.2
            // Adjust opacity based on position (more visible when closer to center)
            opacity: 0.5 + (1 - Math.abs(Math.sin(angle))) * 0.5
          });

          // Optional: Z-index for layering, making cards in front appear on top
          // This creates a sense of depth as they rotate
          const zIndex = Math.round(100 * (1 - Math.abs(Math.sin(angle))));
          gsap.set(card, { zIndex });
        },
        duration: 1, // Duration of this specific tween within the timeline
        ease: 'none', // Linear ease for smooth, consistent rotation
      }, 0); // Start all card animations at the beginning of the timeline
    });

    // Clean up ScrollTrigger instances on component unmount
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [totalCards]); // Re-run effect if totalCards changes

  return (
    <div className="w-full min-h-screen">
      {/* Scroll-animated section */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-[#0f172a]" // Dark background for neon effect
      >
        {/* Map through projectsData to render ProjectCard components */}
        {projectsData.map((project, index) => (
          <div
            key={project.id} // Use project.id for unique key
            ref={(el) => (cardRefs.current[index] = el)} // Assign ref to each card container
            className="w-[340px] h-[420px]" // Fixed dimensions for the card container
          >
            {/* Render ProjectCard, passing the individual project object */}
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadialProjectList;
