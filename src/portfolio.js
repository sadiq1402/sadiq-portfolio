/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Sadiq Hasan",
  title: "Hi all, I'm Sadiq",
  subTitle: emoji(
    "A passionate AI & Voice Agent Developer 🚀 with experience building production-grade AI voice systems, telephony solutions, and machine learning applications. Currently pursuing Data Science at IIT Madras."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1r4jQRPn5nRjl2VZ1B7i_F3RXLRE_uClN/view?usp=sharing",
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/sadiq1402",
  linkedin: "https://www.linkedin.com/in/sadiq-hasan-in",
  gmail: "eth.sadiq@gmail.com",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "AI/VOICE AGENT DEVELOPER & DATA SCIENTIST",
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

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "vuejs",
      fontAwesomeClassname: "fab fa-vuejs"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "git",
      fontAwesomeClassname: "fab fa-git-alt"
    }
  ],
  display: true
};

// Education Section

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

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "AI & Voice Agents",
      progressPercentage: "85%"
    },
    {
      Stack: "Backend/Cloud (AWS)",
      progressPercentage: "80%"
    },
    {
      Stack: "Data Science/ML",
      progressPercentage: "75%"
    }
  ],
  displayCodersrank: false
};

// Work experience section

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

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "false",
  display: false
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "AI PROJECTS I HAVE BUILT",
  projects: [
    {
      image: require("./assets/images/annamaiLogo.jpg"),
      projectName: "PRAGATI-AI",
      projectDesc: "AI model to help farmers improve crop yield through Pollination monitoring using Generative AI and ML techniques",
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
      projectDesc: "Production-grade AI voice agent capable of handling 1000+ concurrent calls with real-time speech processing and intent handling",
      footerLink: []
    },
    {
      image: require("./assets/images/vsynergizeLogo.jpg"),
      projectName: "Insurance Claim Status AI Agent",
      projectDesc: "AI agent that interacts with insurers, retrieves claim details, and generates structured AI summaries using AWS Bedrock",
      footerLink: []
    }
  ],
  display: true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [],
  display: false
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "false",
  blogs: [],
  display: false
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [],
  display: false
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  podcast: [],
  display: false
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+91-8553809556",
  email_address: "eth.sadiq@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter",
  display: false
};

const isHireable = true; // Open for opportunities

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
