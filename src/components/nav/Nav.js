import React, {useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import {greeting, contactInfo} from "../../portfolio";
import "./Nav.scss";

const links = [
  {href: "#work", label: "Work"},
  {href: "#experience", label: "Experience"},
  {href: "#skills", label: "Skills"},
  {href: "#about", label: "About"},
  {href: "#contact", label: "Contact"}
];

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M21 12.5A8.5 8.5 0 1111.5 3 7 7 0 0021 12.5z" />
  </svg>
);

const Nav = () => {
  const {isDark, changeTheme} = useContext(StyleContext);

  return (
    <>
      <div className="banner">
        <p className="container banner__inner">
          <span>Open for full-time roles, contract work and AI/ML advisory.</span>
          <a className="link" href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
        </p>
      </div>
      <nav className="nav" aria-label="Primary">
        <div className="container nav__inner">
          <a className="nav__logo" href="#top">
            {greeting.username}
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
            <a className="btn nav__resume" href={greeting.resumeLink} download="Sadiq-Hasan-Resume.pdf">
              Résumé PDF
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
