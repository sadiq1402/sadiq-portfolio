import React, {useState} from "react";
import {experience} from "../../portfolio";
import "./ExperienceTabs.scss";

const ExperienceTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experience[activeIndex];

  return (
    <section className="section wrap" id="experience">
      <div className="eyebrow">WHERE I'VE BEEN</div>
      <div className="exp-grid">
        <div className="reveal">
          {experience.map((item, i) => (
            <div
              key={item.role}
              className={`exp-tab ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              onKeyDown={e => e.key === "Enter" && setActiveIndex(i)}
              role="button"
              tabIndex={0}
            >
              <div className="exp-tab__role">
                <span className="dot" />
                {item.role}
              </div>
              <div className="exp-tab__meta">{item.company}</div>
            </div>
          ))}
        </div>
        <div className="exp-panel reveal">
          <div className="exp-panel__meta">{active.dateLoc}</div>
          <div className="exp-panel__desc">
            {active.role} — {active.company}
          </div>
          <ul>
            {active.bullets.map(b => (
              <li key={b.slice(0, 24)}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTabs;
