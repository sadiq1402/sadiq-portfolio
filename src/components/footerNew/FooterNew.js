import React from "react";
import {greeting, socialMediaLinks} from "../../portfolio";
import "./FooterNew.scss";

const FooterNew = () => (
  <footer className="footer-new">
    <div className="container footer-new__inner">
      <p className="footer-new__line">{greeting.title}</p>
      <div className="footer-new__meta">
        <span>
          © {new Date().getFullYear()} {greeting.username}
        </span>
        <span>{greeting.location}, remote worldwide</span>
        <span className="footer-new__links">
          <a className="link" href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="link" href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default FooterNew;
