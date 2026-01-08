import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

const illustration = {
  animated: true
};

const greeting = {
  username: "Sadiq Hasan",
  title: "Hi, I'm Sadiq",
  subTitle: emoji(
    "AI & Voice Agent Developer 🚀 building production-grade AI voice systems, telephony solutions, and machine learning applications. Currently pursuing Data Science at IIT Madras."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1r4jQRPn5nRjl2VZ1B7i_F3RXLRE_uClN/view?usp=sharing",
  displayGreeting: true
};

const socialMediaLinks = {
  github: "https://github.com/sadiq1402",
  linkedin: "https://www.linkedin.com/in/sadiq-hasan-in",
  gmail: "eth.sadiq@gmail.com",
  display: true
};

const skillsSection = {
  title: "What I Do",
  subTitle: "AI & VOICE AGENT DEVELOPER | CLOUD ARCHITECT | DATA SCIENTIST",
  skills: [
    emoji(
      "⚡ Design and develop production-grade AI voice agents for real-world telephony systems"
    ),
    emoji(
      "⚡ Build scalable serverless architectures on AWS (Lambda, API Gateway, SQS, Bedrock)"
    ),
    emoji(
      "⚡ Implement real-time speech-to-text processing and LLM integration for conversational AI"
    )
  ],

  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "TypeScript",
      fontAwesomeClassname: "fab fa-js-square"
    },
    {
      skillName: "Node.js",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "React",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "Vue.js",
      fontAwesomeClassname: "fab fa-vuejs"
    },
    {
      skillName: "Flask",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "AWS",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "PostgreSQL",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "SQL",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git-alt"
    },
    {
      skillName: "HTML5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "CSS3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "Vim",
      fontAwesomeClassname: "fas fa-terminal"
    },
    {
      skillName: "Lua",
      fontAwesomeClassname: "fas fa-code"
    },
    {
      skillName: "ExpressJs",
      fontAwesomeClassname: "fas fa-server"
    },
    {
      skillName: "Machine Learning",
      fontAwesomeClassname: "fas fa-brain"
    }
  ],
  display: true
};

const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Indian Institute of Technology, Madras",
      logo: require("./assets/images/iitmLogo.png"),
      subHeader: "Bachelor's of Science in Data Science",
      duration: "September 2022 - March 2026",
      desc: "CGPA: 7.41/10",
      descBullets: []
    }
  ]
};

const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "AI & Voice Agents",
      progressPercentage: "85%"
    },
    {
      Stack: "Backend & Cloud (AWS)",
      progressPercentage: "80%"
    },
    {
      Stack: "Data Science & ML",
      progressPercentage: "75%"
    }
  ],
  displayCodersrank: false
};

const workExperiences = {
  display: true,
  experience: [
    {
      role: "Node.js Developer Intern",
      company: "Vsynergize AI",
      companylogo: require("./assets/images/vsynergizeLogo.jpg"),
      date: "Aug 2025 – Present",
      desc: "AI Voice & Telephony Systems",
      descBullets: [
        "Built Virtual Receptionist AI Agent handling 1000+ concurrent calls with real-time speech processing",
        "Developed Insurance Claim Status AI Agent with structured AI summaries using AWS Bedrock",
        "Integrated real-time speech-to-text using AssemblyAI for conversational understanding",
        "Architected serverless system on AWS (Lambda, API Gateway, SQS)"
      ]
    },
    {
      role: "Gen AI Research Intern",
      company: "Annam AI (IIT Ropar)",
      companylogo: require("./assets/images/annamaiLogo.jpg"),
      date: "May 2025 – July 2025",
      desc: "Developed PRAGATI-AI model for agricultural pollination monitoring",
      descBullets: [
        "Applied Generative AI techniques with Python, Scikit-learn, TensorFlow",
        "Collaborated on data preprocessing, model development, and research documentation"
      ]
    }
  ]
};

const openSource = {
  showGithubProfile: "false",
  display: false
};

const bigProjects = {
  title: "Projects",
  subtitle: "AI SYSTEMS I'VE BUILT",
  projects: [
    {
      image: require("./assets/images/annamaiLogo.jpg"),
      projectName: "PRAGATI-AI",
      projectDesc:
        "AI model to help farmers improve crop yield through Pollination monitoring using Generative AI and ML techniques",
      footerLink: [
        {
          name: "View Demo",
          url: "https://pragati-ai.streamlit.app/"
        }
      ]
    },
    {
      image: require("./assets/images/vsynergizeLogo.jpg"),
      projectName: "Virtual Receptionist AI Agent",
      projectDesc:
        "Production-grade AI voice agent handling 1000+ concurrent calls with real-time speech processing and intent handling",
      footerLink: []
    },
    {
      image: require("./assets/images/vsynergizeLogo.jpg"),
      projectName: "Insurance Claim Status AI Agent",
      projectDesc:
        "AI agent that interacts with insurers, retrieves claim details, and generates structured AI summaries using AWS Bedrock",
      footerLink: []
    }
  ],
  display: true
};

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆"),
  subtitle: "Achievements and certifications",
  achievementsCards: [],
  display: false
};

const blogSection = {
  title: "Blogs",
  subtitle: "Technical writing and insights",
  displayMediumBlogs: "false",
  blogs: [],
  display: false
};

const talkSection = {
  title: "Talks",
  subtitle: emoji("Presentations and speaking engagements"),
  talks: [],
  display: false
};

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "Conversations about technology",
  podcast: [],
  display: false
};

const resumeSection = {
  title: "Resume",
  subtitle: "Download my resume",
  display: true
};

const contactInfo = {
  title: emoji("Get In Touch ☎️"),
  subtitle:
    "Have a project in mind or want to discuss AI solutions? Feel free to reach out.",
  number: "+91-8553809556",
  email_address: "eth.sadiq@gmail.com"
};

const twitterDetails = {
  userName: "twitter",
  display: false
};

const isHireable = true;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
