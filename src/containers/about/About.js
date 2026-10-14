import React from "react";
import {about} from "../../portfolio";
import portrait from "../../assets/images/sadiq-portrait.jpg";
import "./About.scss";

const About = () => (
  <section className="section wrap" id="about">
    <div className="eyebrow">ABOUT</div>
    <div className="about__grid">
      <div className="about__photo reveal">
        <img src={portrait} alt="Sadiq Hasan" />
      </div>
      <div className="reveal">
        <div className="about__lead">{about.lead}</div>
        <div className="about__body">
          {about.paragraphs.map(p => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
