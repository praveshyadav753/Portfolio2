import React from 'react';
// Removed FontAwesomeIcon and specific icon imports as per your request.

// ProjectCard component
// This component displays a single project card with neon styling.
// It expects the following props:
// - project: An object containing project details (title, description, imageUrl, githubUrl, liveDemoUrl)
const ProjectCard = ({ project }) => {
    // Destructure project properties for easier access
    const { title, description, imageUrl, githubUrl, liveDemoUrl } = project;

    return (
        <>
            {/* Custom styles for the neon effect, applied directly to this component */}
            <style>
                {`
                .neon-card {
                    background-color: #0d0d1a; /* Very dark background for neon to pop */
                    border: 2px solid transparent; /* Start with transparent border */
                    box-shadow:
                        0 0 5px rgba(102, 252, 241, 0.5), /* Cyan inner glow */
                        0 0 15px rgba(102, 252, 241, 0.4), /* Cyan outer glow */
                        0 0 30px rgba(102, 252, 241, 0.3), /* Cyan wider glow */
                        0 0 40px rgba(102, 252, 241, 0.2); /* Cyan even wider glow */
                    transition: all 0.3s ease-in-out;
                }
                .neon-card:hover {
                    border-color: #66fcf1; /* Cyan border on hover */
                    box-shadow:
                        0 0 8px rgba(102, 252, 241, 0.8),
                        0 0 25px rgba(102, 252, 241, 0.6),
                        0 0 50px rgba(102, 252, 241, 0.4),
                        0 0 60px rgba(102, 252, 241, 0.3),
                        0 0 80px rgba(102, 252, 241, 0.2);
                    transform: translateY(-5px) scale(1.02); /* Slight lift and scale */
                }

                .neon-button-primary {
                    background-color: #4a0080; /* Darker purple base */
                    border: 1px solid #8a2be2; /* Blue-violet border */
                    box-shadow: 0 0 5px #8a2be2, 0 0 10px #8a2be2; /* Blue-violet glow */
                    transition: all 0.3s ease-in-out;
                }
                .neon-button-primary:hover {
                    background-color: #6a00b0; /* Lighter purple on hover */
                    box-shadow: 0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2;
                    transform: scale(1.05);
                }

                .neon-button-secondary {
                    background-color: #004d40; /* Darker teal base */
                    border: 1px solid #00c853; /* Green accent border */
                    box-shadow: 0 0 5px #00c853, 0 0 10px #00c853; /* Green glow */
                    transition: all 0.3s ease-in-out;
                }
                .neon-button-secondary:hover {
                    background-color: #00695c; /* Lighter teal on hover */
                    box-shadow: 0 0 10px #00c853, 0 0 20px #00c853, 0 0 30px #00c853;
                    transform: scale(1.05);
                }
                `}
            </style>

            <div
                className="neon-card p-6 flex flex-col rounded-2xl shadow-xl"
            >
                {/* Project Image */}
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 object-cover rounded-xl mb-6 border border-gray-700"
                    // Fallback for image loading errors
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/334155/e2e8f0?text=Image+Not+Found`; }}
                />
                {/* Project Title */}
                <h3 className="text-3xl font-bold mb-3 text-cyan-300">{title}</h3> {/* Adjusted text color for clarity */}
                {/* Project Description */}
                <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                    {description}
                </p>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-auto">
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg shadow-md neon-button-primary"
                    >
                        {/* Using i tag for Font Awesome icon */}
                        <i className="fab fa-github text-lg"></i>
                        <span>GitHub</span>
                    </a>
                    <a
                        href={liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg shadow-md neon-button-secondary"
                    >
                        {/* Using i tag for Font Awesome icon */}
                        <i className="fas fa-external-link-alt text-lg"></i>
                        <span>Live Demo</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default ProjectCard;
