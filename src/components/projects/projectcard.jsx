import React from 'react';

const ProjectCard = ({ project }) => {
  const { title, description, imageUrl, githubUrl, liveDemoUrl } = project;

  return (
    <>
      <style>
        {`
          .clean-card {
            background-color: #1a1a2e;
            border: 1px solid #334155;
            transition: all 0.3s ease-in-out;
            position: relative;
            overflow: hidden;
          }

          .clean-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }

          .clean-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg at 50% 50%, transparent 270deg, #66FCF1, #8A2BE2);
            opacity: 0;
            transition: opacity 0.5s ease-in-out, transform 0.8s ease-in-out;
            z-index: 0;
            animation: rotateBorder 4s linear infinite; /* Add animation */
          }

          .clean-card:hover::before {
            opacity: 1;
            transform: rotate(360deg);
          }

          .clean-card .card-content {
            position: relative;
            z-index: 1; /* Ensure content is above the border */
            background-color: #1a1a2e; /* Match card background to hide overflow */
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
          }

          .btn-outline-github {
            border-color: #66FCF1;
            color: #66FCF1;
          }

          .btn-outline-github:hover {
            background-color: #66FCF1;
            color: #1a1a2e;
            box-shadow: 0 0 10px rgba(102, 252, 241, 0.6);
          }

          .btn-outline-demo {
            border-color: #8A2BE2;
            color: #8A2BE2;
          }

          .btn-outline-demo:hover {
            background-color: #8A2BE2;
            color: #fff;
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.6);
          }
        `}
      </style>

      <div className="clean-card rounded-2xl overflow-hidden shadow-xl flex flex-col text-white">
        {/* Project Image */}
        <div className="h-48 w-full overflow-hidden">
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
                className="btn-outline btn-outline-github py-2 px-4 rounded-lg flex items-center gap-2"
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
                className="btn-outline btn-outline-demo py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <i className="fas fa-external-link-alt"></i>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;