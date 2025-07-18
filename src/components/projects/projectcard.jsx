import React from 'react';

const ProjectCard = ({ project }) => {
  const { title, description, imageUrl, githubUrl, liveDemoUrl } = project;

  return (
    <>
      <style>
        {`
          .clean-card {
            background-color: rgba(26, 26, 46, 0.4); /* Semi-transparent dark background */
            border: 1px solid rgba(102, 252, 241, 0.3); /* Subtle teal border */
            border-radius: 1rem; /* rounded-2xl */
            transition: all 0.3s ease-in-out;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(15px); /* Frosted glass effect */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Initial shadow */
          }

          .clean-card:hover {
            transform: translateY(-8px); /* More pronounced lift */
          }

          /* Conic gradient for the rotating border effect */
          .clean-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg at 50% 50%, transparent 270deg, #96FCF1, #8A2BE2); /* Teal to Purple */
            opacity: 1; /* Make it always visible but subtle */
            transition: opacity 0.5s ease-in-out, transform 0.8s ease-in-out;
            z-index: 1;
            animation: rotateBorder 3s linear infinite; /* Slower rotation */
          }

          /* Inner static glossy reflection */
          .clean-card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 1rem; /* Match card border-radius */
            background-image: linear-gradient(to top left, rgba(255, 255, 255, 0.08) 0%, transparent 50%); /* Subtle white sheen */
            pointer-events: none;
            z-index: 10; /* Ensure it's above the rotating border but below content */
          }

          .clean-card .card-content {
            position: relative;
             background-image: 
          radial-gradient(circle at 15% 85%, rgba(90, 1, 15, 0.4) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(22, 27, 12, 0.6) 0%, transparent 60%);
        
            z-index: 2; /* Ensure content is above all pseudo-elements */
            background-color: rgba(26, 26, 46, 0.6); /* Slightly more opaque to hide overflow and provide content background */
            // border-radius: 1rem; /* Match card border-radius */
            /* Ensure content background covers the pseudo-elements at edges */
            -webkit-mask-image: -webkit-radial-gradient(white, black); /* For rounded corners masking */
          }

          @keyframes rotateBorder {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .btn-outline {
            background: none;
            border: 1px solid;
            transition: all 0.3s ease-in-out;
            font-weight: 600;
            padding: 0.5rem 1rem; /* py-2 px-4 */
            border-radius: 0.5rem; /* rounded-lg */
            display: flex;
            align-items: center;
            gap: 0.5rem; /* gap-2 */
          }

          .btn-outline-github {
            border-color: #66FCF1; /* Teal */
            color: #66FCF1; /* Teal */
          }

          .btn-outline-github:hover {
            background-color: #66FCF1; /* Teal */
            color: #1a1a2e;
            box-shadow: 0 0 15px rgba(102, 252, 241, 0.8); /* Stronger teal glow */
          }

          .btn-outline-demo {
            border-color: #8A2BE2; /* Purple */
            color: #8A2BE2; /* Purple */
          }

          .btn-outline-demo:hover {
            background-color: #8A2BE2; /* Purple */
            color: #fff;
           
          }
        `}
      </style>

      <div className="clean-card rounded-2xl overflow-hidden shadow-xl p-0.5 flex flex-col text-white">
        <div className='z-3 bg-black rounded-2xl overflow-clip'>
        {/* Project Image */}
        <div className="h-48 z-3 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/600x400/334155/e2e8f0?text=Image+Not+Found`;
            }}
          />
        </div>

        {/* Card Content */}
        <div className="card-content p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-100 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-4 mb-4">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-outline-github"
              >
                <i className="fab fa-github"></i>
                GitHub
              </a>
            )}
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-outline-demo"
              >
                <i className="fas fa-external-link-alt"></i>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProjectCard;
