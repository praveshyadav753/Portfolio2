/**
 * @typedef {Object} WorkExperienceItem
 * @property {number} id - Unique identifier for the experience.
 * @property {string} title - Job title.
 * @property {string} company - Company name.
 * @property {string} duration - Duration of the employment.
 * @property {string} location - Location of the job.
 * @property {string[]} description - Array of bullet points describing responsibilities and achievements.
 * @property {string[]} technologies - Array of technologies used.
 */

/**
 * An array of professional work experience items.
 * @type {WorkExperienceItem[]}
 */
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
export default  workExperiences