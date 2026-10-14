import React from "react";
import {contactInfo, socialMediaLinks, greeting} from "../../portfolio";
import "./ContactSection.scss";

const ContactSection = () => (
  <section className="section wrap" id="contact">
    <div className="eyebrow">LET'S CONNECT</div>
    <h2 className="contact__heading">{contactInfo.heading}</h2>
    <p className="contact__subtitle">{contactInfo.subtitle}</p>
    <a className="contact__email" href={`mailto:${contactInfo.email}`}>
      {contactInfo.email}
    </a>
    <div className="contact__links">
      <a
        className="pill pill-outline"
        href={socialMediaLinks.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </a>
      <a
        className="pill pill-outline"
        href={socialMediaLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn ↗
      </a>
      <a
        className="pill pill-outline"
        href={greeting.resumeLink}
        download="Sadiq-Hasan-Resume.pdf"
      >
        Résumé ↓
      </a>
    </div>
  </section>
);

export default ContactSection;
