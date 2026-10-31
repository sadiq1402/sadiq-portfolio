import React from "react";
import {contactInfo, socialMediaLinks, greeting} from "../../portfolio";
import "./ContactSection.scss";

const ContactSection = () => (
  <section className="section section--l" id="contact">
    <div className="container contact">
      <h2 className="contact__heading">{contactInfo.heading}</h2>
      <p className="lead contact__subtitle">{contactInfo.subtitle}</p>
      <a className="contact__email measured" href={`mailto:${contactInfo.email}`}>
        {contactInfo.email}
      </a>
      <div className="contact__links">
        <a className="btn" href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="btn" href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="btn" href={greeting.resumeLink} download="Sadiq-Hasan-Resume.pdf">
          Résumé
        </a>
      </div>
    </div>
  </section>
);

export default ContactSection;
