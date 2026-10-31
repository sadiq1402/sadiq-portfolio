import React from "react";
import {about} from "../../portfolio";
import portrait from "../../assets/images/sadiq-portrait.jpg";
import "./About.scss";

const About = () => (
  <section className="section section--band" id="about">
    <div className="container about__grid">
      <figure className="about__photo">
        <img src={portrait} alt="Sadiq Hasan" width="800" height="1067" loading="lazy" />
      </figure>
      <div className="about__copy">
        <h2 className="about__lead">{about.lead}</h2>
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
