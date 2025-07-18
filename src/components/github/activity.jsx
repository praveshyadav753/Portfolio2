import React, { useState, useEffect, useRef } from "react";
import GitHubCalendar from 'react-github-calendar';
import { gsap } from "gsap"; // Import GSAP

// SVG Icons (keeping them as is, they are good!)
const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2V10c0-.2-.1-.5-.3-.6l-1-1c-.2-.2-.5-.3-.8-.3H10c-.3 0-.6.1-.8.3l-1 1c-.2.1-.3.4-.3.6v4.8A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-2.2 0-4-1.8-4-4V7.5A4.5 4.5 0 0 1 9.5 3h5A4.5 4.5 0 0 1 19 7.5V14c0 2.2-1.8 4-4 4"></path>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="M4 12H2"></path>
    <path d="M22 12H20"></path>
    <path d="M17.5 4.5l-1.5 1.5"></path>
    <path d="M6.5 19.5l-1.5 1.5"></path>
    <path d="M17.5 19.5l1.5 1.5"></path>
    <path d="M6.5 4.5l1.5 1.5"></path>
  </svg>
);

const GitForkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-git-fork"
  >
    <circle cx="12" cy="18" r="3"></circle>
    <circle cx="6" cy="6" r="3"></circle>
    <circle cx="18" cy="6" r="3"></circle>
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"></path>
    <path d="M12 15V9"></path>
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-star"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const RepositoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-repository"
  >
    <path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path>
    <path d="M12 2v6"></path>
    <path d="M12 2h4a2 2 0 0 1 2 2v4"></path>
    <path d="M4 6h4"></path>
  </svg>
);

const Gitactivity = () => {
  const [username, setUsername] = useState("NancySri453"); // Default GitHub username
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State for selected year

  // Refs for GSAP animations
  const titleRef = useRef(null);
  const profileRef = useRef(null);
  const statsRef = useRef(null);
  const contributionsRef = useRef(null);
  const reposRef = useRef(null);

  // Function to fetch GitHub data
  const fetchGitHubData = async () => {
    setLoading(true);
    setError(null);
    setUserData(null);
    setRepos([]);

    try {
      // Fetch user data
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) {
        throw new Error(`User not found: ${userResponse.statusText}`);
      }
      const userJson = await userResponse.json();
      setUserData(userJson);

      // Fetch repositories, sorted by pushed_at for recent repos
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=2`
      ); // Get 2 most recent as in original code
      if (!reposResponse.ok) {
        throw new Error(
          `Failed to fetch repositories: ${reposResponse.statusText}`
        );
      }
      const reposJson = await reposResponse.json();
      setRepos(reposJson);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching GitHub data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Generate years for the dropdown
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      // Generate last 5 years including current
      years.push(currentYear - i);
    }
    return years;
  };

  // Fetch data on initial component mount or when username changes
  useEffect(() => {
    fetchGitHubData();
  }, [username]); // Dependency array includes username so it refetches when username changes

  // GSAP Animations
  useEffect(() => {
    if (!loading && userData) {
      // Animate main container and sections
      gsap.fromTo(".main-content-container",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(profileRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.4 }
      );

      gsap.fromTo(statsRef.current.children,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", stagger: 0.2, delay: 0.6 }
      );

      gsap.fromTo(contributionsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
      );

      gsap.fromTo(reposRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1 }
      );

      // Animate repo list items
      gsap.fromTo(".repo-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power1.out", stagger: 0.1, delay: 1.2 }
      );
    }
  }, [loading, userData]); // Rerun animations when data loads

  return (
    <div className="min-h-screen relative p-4 font-inter text-gray-100 overflow-hidden">
      {/* Subtle Blob Backgrounds */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/4 right-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 mx-auto max-w-6xl shadow-2xl rounded-2xl p-6 lg:px-16 md:p-8 bg-gray-900/80 backdrop-blur-sm main-content-container">
        <h1 ref={titleRef} className="text-3xl md:text-4xl font-extrabold text-white mb-6 text-center flex items-center justify-center gap-3">
          <GithubIcon className="w-9 h-9 text-purple-400" /> GitHub Overview
        </h1>

        {error && (
          <div
            className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 text-lg py-10">
            Loading GitHub data...
          </div>
        )}

        {!loading && userData && (
          <>
            {/* User Profile Summary */}
            <div ref={profileRef} className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-800 p-6 rounded-xl mb-8 shadow-lg border border-gray-700 transition-all duration-300 hover:border-purple-500">
              <img
                src={
                  userData.avatar_url ||
                  `https://placehold.co/128x128/333333/dddddd?text=${username
                    .charAt(0)
                    .toUpperCase()}`
                }
                alt={`${username}'s avatar`}
                className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-md transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/128x128/333333/dddddd?text=${username
                    .charAt(0)
                    .toUpperCase()}`;
                }}
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {userData.name || username}
                </h2>
                <p className="text-purple-400 text-lg mb-2">@{username}</p>
                {userData.bio && (
                  <p className="text-gray-300 mb-2">{userData.bio}</p>
                )}
                <div className="flex items-center justify-center md:justify-start gap-4 text-gray-400">
                  {userData.location && (
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin"
                      >
                        <path d="M12 18.7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"></path>
                        <path d="M12 21.7l-4.5-5.5a7.5 7.5 0 0 1 9 0l-4.5 5.5Z"></path>
                      </svg>
                      {userData.location}
                    </span>
                  )}
                  {userData.blog && (
                    <a
                      href={userData.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-teal-400 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-link"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.5 5.5"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L14.5 18.5"></path>
                      </svg>
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Stats and Contributions */}
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Total Repositories */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-700 transition-all duration-300 hover:border-pink-500">
                <RepositoryIcon className="w-10 h-10 text-pink-400 mb-3" />
                <h3 className="text-xl font-semibold text-gray-200">
                  Total Repositories
                </h3>
                <p className="text-4xl font-bold text-pink-500">
                  {userData.public_repos}
                </p>
              </div>

              {/* Followers */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-700 transition-all duration-300 hover:border-teal-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users w-10 h-10 text-teal-400 mb-3"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-200">
                  Followers
                </h3>
                <p className="text-4xl font-bold text-teal-500">
                  {userData.followers}
                </p>
              </div>
            </div>

            {/* Contributions Graph */}
            <div ref={contributionsRef} className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700 transition-all duration-300 hover:border-green-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-3 sm:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bar-chart-2 w-7 h-7 text-green-400"
                  >
                    <line x1="18" x2="18" y1="20" y2="10"></line>
                    <line x1="12" x2="12" y1="20" y2="4"></line>
                    <line x1="6" x2="6" y1="20" y2="14"></line>
                  </svg>
                  Contributions
                </h2>
                <div className="ml-0 sm:ml-3">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-full sm:w-auto p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  >
                    {generateYearOptions().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg mt-3 border-gray-700 p-2">
                <div className="overflow-x-auto flex justify-center">
                  <GitHubCalendar
                    key={`${username}-${selectedYear}`}
                    username={username}
                    year={selectedYear}
                    colorScheme="dark"
                    blockSize={12}
                    blockMargin={3}
                    fontSize={14}
                    theme={{
                      dark: ['#1E1E2C', '#4A0082', '#6A0DAD', '#8A2BE2', '#9932CC'], // Dark background, then shades of purple
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Repositories */}
            <div ref={reposRef} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-yellow-500">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <RepositoryIcon className="w-7 h-7 text-yellow-400" /> Recent Repositories
              </h2>
              {repos.length > 0 ? (
                <ul className="space-y-4">
                  {repos.map((repo) => (
                    <li
                      key={repo.id}
                      className="repo-item bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700 hover:shadow-xl hover:border-purple-600 transition-all duration-200"
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline text-lg font-semibold block mb-1"
                      >
                        {repo.name}
                      </a>
                      <p className="text-gray-300 text-sm mb-2">
                        {repo.description || "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
                        {repo.language && (
                          <span className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-full text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-code"
                            >
                              <polyline points="16 18 22 12 16 6"></polyline>
                              <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitForkIcon className="w-4 h-4 text-blue-500" />
                          {repo.forks_count}
                        </span>
                        <span className="text-gray-500 ml-auto text-xs sm:text-sm">
                          Updated:{" "}
                          {new Date(repo.pushed_at).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No recent repositories found.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gitactivity;