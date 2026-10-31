import React from "react";
import {skillCategories} from "../../portfolio";
import "./SkillsRows.scss";

const SkillsRows = () => (
  <section className="section section--l" id="skills">
    <div className="container skills">
      <h2>Stack</h2>
      <dl className="skills__rows">
        {skillCategories.map(cat => (
          <div className="skills-row" key={cat.category}>
            <dt className="skills-cat">{cat.category}</dt>
            <dd className="skills-tags">
              <ul>
                {cat.skills.map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default SkillsRows;
