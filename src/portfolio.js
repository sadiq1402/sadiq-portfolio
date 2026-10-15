const greeting = {
  username: "Sadiq Hasan",
  logoInitials: "SH",
  location: "Chennai, India",
  title: "AI Engineer building Generative AI retrieval and agent systems that hold up in production.",
  taglineLead: "AI Engineer",
  taglineRest:
    "building Generative AI retrieval and agent systems that hold up in production.",
  resumeLink: "/resume.pdf"
};

const socialMediaLinks = {
  github: "https://github.com/sadiq1402",
  linkedin: "https://www.linkedin.com/in/sadiq-hasan-in",
  gmail: "eth.sadiq@gmail.com",
  phone: "+91 85538 09556"
};

const about = {
  lead:
    "I build Generative AI systems — RAG pipelines, LLM agents, and the serverless infra that keeps them running at scale.",
  paragraphs: [
    "AI Engineer with production experience designing and shipping Generative AI and LLM-powered applications in Python. Undergraduate from IIT Madras.",
    "Right now I'm building production AI agents at Vsynergize AI — prompt engineering, multi-provider LLM orchestration, and RAG-style retrieval pipelines on AWS Bedrock for real enterprise workflows.",
    "Before that, I was a Generative AI Research Intern at Annam AI (IIT Ropar), building PRAGATI-AI to help farmers improve crop yield through pollination monitoring."
  ]
};

const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL"]
  },
  {
    category: "Generative AI & LLMs",
    skills: [
      "LLM Integration",
      "Prompt Engineering",
      "RAG",
      "Multi-Provider Orchestration",
      "OpenAI API",
      "AWS Bedrock",
      "AI Agents & Chatbots",
      "Voice AI"
    ]
  },
  {
    category: "Machine Learning",
    skills: ["Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Feature Engineering"]
  },
  {
    category: "Backend & APIs",
    skills: ["FastAPI", "Node.js", "Express.js", "REST APIs", "WebSockets", "Microservices"]
  },
  {
    category: "Cloud & MLOps",
    skills: ["AWS Lambda", "API Gateway", "SQS", "S3", "ECS", "Docker", "CI/CD"]
  },
  {
    category: "Databases & Tools",
    skills: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Git", "GitHub", "Linux"]
  }
];

const educationInfo = {
  schoolName: "Indian Institute of Technology, Madras",
  subHeader: "Bachelor of Science in Data Science",
  duration: "Sept 2022 – March 2026",
  note:
    "Coursework: Deep Learning, Machine Learning, Data Visualization, Managerial Economics. CGPA: 7.27/10"
};

const experience = [
  {
    role: "AI Engineer",
    company: "Vsynergize AI",
    dateLoc: "Aug 2025 – Present · Remote",
    bullets: [
      "Build and deploy production-grade Generative AI and LLM-powered agents in Python for enterprise workflows, serving 1000+ concurrent interactions at low latency.",
      "Design prompt engineering strategies and multi-provider LLM orchestration to optimize accuracy, tone and reliability across use cases.",
      "Develop retrieval-and-summarization (RAG-style) pipelines on AWS Bedrock for transcript intelligence and structured AI summaries.",
      "Engineered an Insurance Claim Status AI Agent that retrieves insurer data and generates structured, LLM-driven summaries.",
      "Architect scalable REST APIs and event-driven microservices with FastAPI, AWS Lambda, API Gateway, SQS and Redis.",
      "Integrate real-time speech and conversational understanding (AssemblyAI, LiveKit, Plivo) into LLM workflows powering enterprise chatbots and telephony."
    ]
  },
  {
    role: "Generative AI Research Intern",
    company: "Annam AI, IIT Ropar",
    dateLoc: "May 2025 – Jul 2025",
    bullets: [
      "Built PRAGATI-AI, a Generative AI model helping farmers improve crop yield through pollination monitoring.",
      "Applied Generative AI and machine learning in Python (Scikit-learn, TensorFlow) for model development and evaluation.",
      "Owned data preprocessing, model development and research documentation across the project lifecycle."
    ]
  }
];

const projects = [
  {
    idx: "01",
    year: "2025",
    status: "Production",
    name: "Enterprise AI Agents",
    tagline: "Multi-provider LLM orchestration for Vsynergize AI",
    description:
      "Production-grade Generative AI agents in Python for enterprise workflows — prompt engineering and multi-provider LLM orchestration tuned for accuracy, tone and reliability.",
    mockupHeadline: "Serving 1000+ concurrent interactions",
    mockupSub: "without dropping latency.",
    tags: ["Python", "FastAPI", "AWS Bedrock"],
    link: null
  },
  {
    idx: "02",
    year: "2025",
    status: "Production",
    name: "AI Calling Platform",
    tagline: "Browser-based voice calling with real-time AI pipelines",
    description:
      "Built core AI features for a browser-based calling platform — outbound and inbound voice agents (real-time STT → LLM → TTS) supporting any number of configurable campaigns, with multi-agent handoff that routes complex sub-tasks to specialized agents mid-call. Plus a live AI call copilot that coaches human agents with RAG-grounded, citation-backed suggestions, call transcription and sentiment analysis, and AI-scored LinkedIn lead sourcing. 90K+ lines of code, 400+ automated tests.",
    mockupHeadline: "Specialized agents hand off mid-call",
    mockupSub: "Complex sub-tasks routed to the right agent, live.",
    tags: ["LiveKit", "Plivo", "AWS Bedrock", "RAG"],
    link: null
  },
  {
    idx: "03",
    year: "2025",
    status: "Production",
    name: "Multi-Role EdTech LMS Platform",
    tagline: "Backend lead on a production learning management system",
    description:
      "Led backend development of a multi-role learning platform serving Admins, Faculty, Students and Parents — 500+ REST endpoints across 90K+ lines of async Python, with dual-gateway subscription billing (Razorpay and Stripe, webhook-verified) and 2,100+ automated tests, deployed serverless on AWS Lambda.",
    mockupHeadline: "500+ endpoints, 5 user roles",
    mockupSub: "Razorpay + Stripe billing, webhook-verified.",
    tags: ["FastAPI", "PostgreSQL", "Razorpay/Stripe"],
    link: null
  },
  {
    idx: "04",
    year: "2025",
    status: "Production",
    name: "Insurance Claim Status Agent",
    tagline: "Structured LLM summaries via AWS Bedrock",
    description:
      "An agent that retrieves insurer data and generates structured, LLM-driven summaries to automate customer interactions.",
    mockupHeadline: "Claim status, summarized",
    mockupSub: "RAG-style retrieval over insurer data.",
    tags: ["AWS Bedrock", "RAG", "Lambda"],
    link: null
  },
  {
    idx: "05",
    year: "2025",
    status: "Research — Annam AI, IIT Ropar",
    name: "PRAGATI-AI",
    tagline: "Generative AI for agricultural pollination monitoring",
    description:
      "Applied Generative AI and ML (Scikit-learn, TensorFlow) to help farmers improve crop yield through pollination monitoring.",
    mockupHeadline: "Helping farmers with PRAGATI-AI",
    mockupSub: "Pollination monitoring via Generative AI.",
    tags: ["Python", "Scikit-learn", "TensorFlow"],
    link: "https://pragati-ai.streamlit.app/"
  },
  {
    idx: "06",
    year: "2026",
    status: "Solo project — pre-launch beta",
    name: "MiloJulo",
    tagline: "Intent-first social discovery app for Pune",
    description:
      "Solo-built end-to-end: a React Native mobile app on a Supabase backend (Postgres, RLS, Realtime) with Cloudflare R2 media storage. Security-first by design — every table default-deny RLS, 28 automated policy tests in CI before every migration. 11K+ lines of TypeScript across 10 feature areas, 17 migrations, 2,800+ lines of SQL.",
    mockupHeadline: "Every table default-deny RLS",
    mockupSub: "28 automated policy tests run in CI.",
    tags: ["React Native", "Supabase", "PostgreSQL RLS"],
    link: null
  }
];

const contactInfo = {
  heading: "Let's build something.",
  subtitle:
    "Open for full-time roles, contract work and AI/ML advisory. The fastest way to reach me is email — I answer all of them.",
  email: "eth.sadiq@gmail.com",
  phone: "+91 85538 09556"
};

const isHireable = true;

export {
  greeting,
  socialMediaLinks,
  about,
  skillCategories,
  educationInfo,
  experience,
  projects,
  contactInfo,
  isHireable
};
