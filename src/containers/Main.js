import React, {useState} from "react";
import Nav from "../components/nav/Nav";
import Hero from "./hero/Hero";
import About from "./about/About";
import SkillsRows from "./skillsRows/SkillsRows";
import ExperienceTabs from "./experienceTabs/ExperienceTabs";
import WorkShowcase from "./workShowcase/WorkShowcase";
import ContactSection from "./contactSection/ContactSection";
import FooterNew from "../components/footerNew/FooterNew";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useScrollReveal} from "../hooks/useScrollReveal";
import "../theme.scss";

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [themeVersion, setThemeVersion] = useState(0);

  useScrollReveal([themeVersion]);

  const changeTheme = () => {
    setIsDark(!isDark);
    setThemeVersion(v => v + 1);
  };

  return (
    <StyleProvider value={{isDark, changeTheme}}>
      <div className={`site ${isDark ? "dark-mode" : ""}`}>
        <Nav />
        <Hero />
        <About />
        <SkillsRows />
        <ExperienceTabs />
        <WorkShowcase />
        <ContactSection />
        <FooterNew />
      </div>
    </StyleProvider>
  );
};

export default Main;
