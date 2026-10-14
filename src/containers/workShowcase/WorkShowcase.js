import React from "react";
import {projects} from "../../portfolio";
import "./WorkShowcase.scss";

const WorkShowcase = () => (
  <section className="section wrap" id="work">
    <div className="eyebrow">SELECTED WORK</div>

    {projects.map(project => (
      <div className="proj reveal" key={project.name}>
        <div className="mockup">
          <div className="mockup__bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mockup__body">
            <div className="big">
              {project.mockupHeadline.split(/(\d+\+?)/).map((part, i) =>
                /\d/.test(part) ? (
                  <span className="accent-text" key={i}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </div>
            <div className="big sub">{project.mockupSub}</div>
          </div>
        </div>
        <div>
          <div className="proj__meta">
            {project.idx} / {project.year} · {project.status}
          </div>
          <h3 className="proj__name">{project.name}</h3>
          <div className="proj__tagline">{project.tagline}</div>
          <p className="proj__desc">{project.description}</p>
          <div className="proj__tags">
            {project.tags.map(tag => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          {project.link && (
            <a className="pill pill-outline proj__link" href={project.link}>
              Read the write-up →
            </a>
          )}
        </div>
      </div>
    ))}
  </section>
);

export default WorkShowcase;
