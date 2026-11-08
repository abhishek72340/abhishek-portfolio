export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface BlogItem {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  url: string;
  tags: string[];
}

export const PORTFOLIO_DATA = {
  name: "Abhishek Singh Rana",
  shortName: "Abhishek",
  surname: "Rana",
  title: "Software Engineer",
  yearsOfExperience: "3+",
  tagline: "Building modern web experiences with precision & craft.",
  bio: "Software Engineer with 3 years of hands-on experience building high-performance web systems, intuitive digital products, and production Next.js & React architectures. Focused on turning complex technical challenges into clean, accessible, and delightful interfaces.",
  email: "abhisingh.72340@gmail.com",
  location: "Hyderabad, Telangana, India",
  profileImage: "/profile.jpeg",
  stats: [
    { label: "Years of Experience", value: "3+", detail: "Production Engineering" },
    { label: "Projects Completed", value: "20+", detail: "Web & Full-Stack Apps" },
    { label: "Client & Team Satisfaction", value: "100%", detail: "Reliability & Quality" },
    { label: "DSA Problems Solved", value: "100+", detail: "LeetCode & Problem Solving" },
  ],
  socials: {
    github: "https://github.com/abhishek72340",
    linkedin: "https://www.linkedin.com/in/abhishek-singh-rana-6354a9180/",
    leetcode: "https://leetcode.com/u/user1557Uf/",
    hashnode: "https://hashnode.com/@abhishek72340",
  },
  skills: [
    {
      category: "Frontend Engineering",
      skills: ["React.js", "Next.js 15", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      category: "State & Interactive Graphics",
      skills: ["Redux Toolkit", "Three.js & WebGL", "React Three Fiber (R3F)", "Framer Motion", "ReactFlow"],
    },
    {
      category: "Backend & Systems",
      skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "Prisma"],
    },
    {
      category: "DevOps & Tooling",
      skills: ["Docker", "Git", "GitHub", "Bitbucket", "Vercel", "Turbopack", "CI/CD Pipelines"],
    },
    {
      category: "Core Computer Science",
      skills: ["Data Structures & Algorithms", "System Architecture", "Object-Oriented Programming", "Design Patterns"],
    },
  ],
  experiences: [
    {
      id: "zetexa",
      role: "MTS-1 (Member of Technical Staff)",
      company: "Zetexa Global",
      location: "Hyderabad, Telangana, India",
      type: "On-site",
      period: "Present",
      description: "Architecting and building production Next.js 15 and TypeScript web platforms with modern UI principles, optimal rendering performance, and high reliability.",
      achievements: [
        "Spearheaded scalable frontend architecture using Next.js 15 App Router, React Server Components, and TypeScript.",
        "Engineered reusable design system components with Tailwind CSS ensuring pixel-perfect responsiveness across mobile and desktop.",
        "Optimized Core Web Vitals resulting in 40% reduction in First Contentful Paint (FCP) and smoother client-side transitions.",
      ],
      techStack: ["Next.js 15", "React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "REST APIs"],
    },
    {
      id: "98thpercentile",
      role: "Frontend Developer",
      company: "98thPercentile",
      location: "Hyderabad, Telangana, India",
      type: "On-site",
      period: "2023 — 2024",
      description: "Engineered interactive educational web platforms, user dashboards, and dynamic UI systems using React.js, Next.js, and Redux Toolkit.",
      achievements: [
        "Developed high-traffic student and instructor dashboards handling thousands of concurrent daily users.",
        "Implemented real-time classroom modules, interactive testing engines, and state management using Redux Toolkit.",
        "Collaborated with backend engineers to define robust API contracts, authentication flows, and error-handling strategies.",
      ],
      techStack: ["React.js", "Next.js", "JavaScript", "Redux Toolkit", "CSS3 / Tailwind", "REST APIs"],
    },
    {
      id: "braincells",
      role: "Frontend Developer (Internship)",
      company: "BrainCells",
      location: "Pune Division, Maharashtra, India",
      type: "Remote",
      period: "2022 — 2023",
      description: "Built responsive web modules, interactive user flows, and modern Next.js/TypeScript frontend applications.",
      achievements: [
        "Constructed client-facing web pages and responsive UI elements with high fidelity to Figma prototypes.",
        "Assisted in migrating legacy components to modern modular React patterns and functional components with hooks.",
      ],
      techStack: ["React.js", "TypeScript", "HTML5", "CSS3", "Git"],
    },
  ] as ExperienceItem[],
  projects: [
    {
      id: "dressup",
      title: "DressUp Fashion E-Commerce",
      category: "Full Stack & E-Commerce",
      tagline: "Interactive fashion shopping platform with rich filtering and instant checkout.",
      description: "A feature-rich fashion shopping web application built with React.js featuring authentication, multi-criteria sorting (price, category, rating), cart management, wishlist, and responsive checkout flows.",
      techStack: ["React.js", "JavaScript", "Tailwind CSS", "Mockbee Auth", "Context API"],
      liveUrl: "https://dressup-shop.netlify.app/",
      githubUrl: "https://github.com/abhishek72340/dressup-shop",
      featured: true,
    },
    {
      id: "aura",
      title: "Aura Web Experience",
      category: "WebGL & Creative Engineering",
      tagline: "High-performance interactive 3D digital product showcase.",
      description: "A luxury digital presentation built with Next.js 15 and Three.js featuring fluid animations, ambient lighting, physics-driven interactions, and smooth viewport transitions.",
      techStack: ["Next.js 15", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://aura-delta-hazel.vercel.app/",
      githubUrl: "https://github.com/abhishek72340",
      featured: true,
    },
    {
      id: "media-recorder",
      title: "Media Recorder Suite",
      category: "Browser Web APIs & Utility",
      tagline: "Web tool for screen recording, webcam capture, and audio downloads.",
      description: "A browser-based utility application enabling users to record screen activities, webcam video, and microphone audio streams with real-time preview and immediate local download.",
      techStack: ["React.js", "MediaRecorder API", "JavaScript", "Tailwind CSS"],
      liveUrl: "https://media-recorder11.netlify.app/",
      githubUrl: "https://github.com/abhishek72340/media-recorder",
      featured: true,
    },
    {
      id: "mental-up",
      title: "Mental-UP Activity & Quiz App",
      category: "Interactive Engine",
      tagline: "Cognitive training and quiz platform with real-time score tracking.",
      description: "An interactive educational activity and cognitive quiz platform built with dynamic question sets, timed challenges, customizable themes, and immediate feedback analytics.",
      techStack: ["React.js", "Custom Hooks", "JavaScript", "CSS3"],
      liveUrl: "https://activity-app1.netlify.app/",
      githubUrl: "https://github.com/abhishek72340/activity-app",
      featured: true,
    },
    {
      id: "flow-builder",
      title: "Chatbot Flow Builder",
      category: "Visual Node Graph Tool",
      tagline: "Visual interface for constructing and orchestrating conversational chatbot trees.",
      description: "An intuitive web interface for building, connecting, and editing complex chatbot decision trees, custom message triggers, and logic nodes on an infinite draggable canvas.",
      techStack: ["React.js", "ReactFlow", "JavaScript", "Styled Components"],
      liveUrl: "https://github.com/abhishek72340",
      githubUrl: "https://github.com/abhishek72340",
      featured: true,
    },
  ] as Project[],
  blogs: [
    {
      id: "promises",
      title: "Promises: How to Handle Asynchronous Code in JavaScript",
      date: "March 12, 2023",
      readTime: "5 min read",
      category: "JavaScript",
      summary: "Comprehensive breakdown of JavaScript asynchronous execution, Promises, the event loop microtask queue, Promise.all, Promise.race, and clean async/await syntax.",
      url: "https://abhishek72340.hashnode.dev/promises-and-its-types",
      tags: ["JavaScript", "Async", "Promises", "Event Loop"],
    },
    {
      id: "nullish-coalescing",
      title: "Nullish Coalescing & Optional Chaining in Modern JavaScript",
      date: "February 24, 2023",
      readTime: "4 min read",
      category: "Modern ES6+",
      summary: "Deep dive into ES2020 nullish coalescing (??) vs logical OR (||), optional chaining (?.) navigation, and eliminating runtime TypeError exceptions.",
      url: "https://abhishek72340.hashnode.dev/nullish-coalescing-optional-chaining",
      tags: ["ES2020", "JavaScript", "Clean Code"],
    },
    {
      id: "loose-vs-strict-equality",
      title: "Loose Equality (==) vs Strict Equality (===) in JavaScript",
      date: "February 13, 2023",
      readTime: "4 min read",
      category: "Fundamentals",
      summary: "Understanding type coercion, implicit casting rules, and abstract equality comparison algorithms inside JavaScript V8 runtime engines.",
      url: "https://abhishek72340.hashnode.dev/difference-between-in-javascript",
      tags: ["JavaScript", "Type Coercion", "Fundamentals"],
    },
    {
      id: "blockchain-web3",
      title: "Blockchain Technology & Web3 Architecture",
      date: "September 29, 2022",
      readTime: "6 min read",
      category: "Architecture",
      summary: "Introduction to distributed ledger systems, cryptographic hashing, consensus algorithms, peer-to-peer networks, and smart contract fundamentals.",
      url: "https://abhishek72340.hashnode.dev/blockchain-technology",
      tags: ["Blockchain", "Web3", "Distributed Systems"],
    },
  ] as BlogItem[],
};

