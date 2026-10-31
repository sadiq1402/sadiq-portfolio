import React, {useState} from "react";
import {experience} from "../../portfolio";
import "./ExperienceTabs.scss";

const ExperienceTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experience[activeIndex];

  const onKeyDown = e => {
    const step = {ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1}[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (activeIndex + step + experience.length) % experience.length;
    setActiveIndex(next);
    document.getElementById(`exp-tab-${next}`).focus();
  };

  return (
    <section className="section section--band" id="experience">
      <div className="container exp-grid">
        <div className="exp-side">
          <h2>Experience</h2>
          <div className="exp-tabs" role="tablist" aria-label="Roles" aria-orientation="vertical">
            {experience.map((item, i) => (
              <button
                key={item.role}
                id={`exp-tab-${i}`}
                className={`exp-tab ${i === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={onKeyDown}
                role="tab"
                aria-selected={i === activeIndex}
                aria-controls="exp-panel"
                tabIndex={i === activeIndex ? 0 : -1}
              >
                <span className="exp-tab__role">{item.role}</span>
                <span className="exp-tab__meta">{item.company}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="exp-panel" id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${activeIndex}`}>
          <p className="exp-panel__meta">{active.dateLoc}</p>
          <h3 className="exp-panel__desc">
            {active.role}, {active.company}
          </h3>
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
