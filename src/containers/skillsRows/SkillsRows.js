import React from "react";
import {skillCategories} from "../../portfolio";
import "./SkillsRows.scss";

const SkillsRows = () => (
  <section className="section wrap" id="skills">
    <div className="eyebrow">WHAT I BUILD WITH</div>
    <div className="reveal">
      {skillCategories.map(cat => (
        <div className="skills-row" key={cat.category}>
          <div className="skills-cat">{cat.category}</div>
          <div className="skills-tags">
            {cat.skills.map(skill => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsRows;
