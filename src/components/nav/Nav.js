import React, {useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import {greeting} from "../../portfolio";
import "./Nav.scss";

const links = [
  {href: "#about", label: "About"},
  {href: "#skills", label: "Skills"},
  {href: "#experience", label: "Experience"},
  {href: "#work", label: "Work"},
  {href: "#contact", label: "Contact"}
];

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 12.5A8.5 8.5 0 1111.5 3 7 7 0 0021 12.5z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Nav = () => {
  const {isDark, changeTheme} = useContext(StyleContext);

  return (
    <nav className="nav">
      <a className="nav__logo" href="#top">
        {greeting.logoInitials}
      </a>
      <div className="nav__links">
        {links.map(link => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="nav__right">
        <button className="theme-btn" onClick={changeTheme} aria-label="Toggle theme">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
        <a
          className="pill pill-outline nav__resume"
          href={greeting.resumeLink}
          download="Sadiq-Hasan-Resume.pdf"
        >
          Résumé PDF ↓
        </a>
      </div>
    </nav>
  );
};

export default Nav;
