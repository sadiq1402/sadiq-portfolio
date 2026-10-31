import React, {Suspense, lazy, useState} from "react";
import {projects} from "../../portfolio";
import {hasWebGL} from "../../components/three/webgl";
import "./WorkShowcase.scss";

const PipelineScene = lazy(() => import("./PipelineScene"));

const CASE_NAME = "AI Calling Platform";

const Tags = ({tags}) => (
  <ul className="tags" aria-label="Stack">
    {tags.map(tag => (
      <li key={tag}>{tag}</li>
    ))}
  </ul>
);

const ProjectLink = ({project}) =>
  project.link ? (
    <a className="btn work__link" href={project.link}>
      {project.linkLabel || "Read the write-up"}
    </a>
  ) : null;

const Pipeline = () => (
  <ol className="pipeline measured">
    <li>STT</li>
    <li>LLM</li>
    <li>TTS</li>
  </ol>
);

const Case = ({project}) => {
  const [webgl] = useState(hasWebGL);
  return (
    <article className="case" aria-labelledby="case-title">
      <div className="case__copy">
        <p className="case__meta">
          {project.year}, {project.status}
        </p>
        <h3 className="case__name" id="case-title">
          {project.name}
        </h3>
        <p className="lead case__tagline">{project.tagline}</p>
        <p className="case__desc">{project.description}</p>
        <Tags tags={project.tags} />
        <ProjectLink project={project} />
      </div>
      <figure
        className={`case__figure${webgl ? " case__figure--3d" : ""}`}
        aria-label="Call pipeline of the voice agents: caller to STT, LLM and TTS, with the LLM handing sub-tasks to specialized agents mid-call"
      >
        {webgl ? (
          <Suspense fallback={<div className="pipeline3d" />}>
            <PipelineScene />
          </Suspense>
        ) : (
          <Pipeline />
        )}
        <figcaption>
          <strong>{project.mockupHeadline}</strong>
          <span>{project.mockupSub}</span>
        </figcaption>
      </figure>
    </article>
  );
};

const WorkShowcase = () => {
  const caseProject = projects.find(p => p.name === CASE_NAME);
  const rest = projects.filter(p => p !== caseProject);

  return (
    <section className="section section--l" id="work">
      <div className="container">
        <div className="head">
          <h2>Selected work</h2>
        </div>

        {caseProject && <Case project={caseProject} />}

        <ul className="work__index">
          {rest.map(project => (
            <li key={project.name}>
              <details className="work__item">
                <summary>
                  <span className="work__year measured">{project.year}</span>
                  <h3 className="work__name">{project.name}</h3>
                  <span className="work__tagline">{project.tagline}</span>
                  <span className="work__status">{project.status}</span>
                </summary>
                <div className="work__body">
                  <p className="work__headline">
                    {project.mockupHeadline}. {project.mockupSub}
                  </p>
                  <p>{project.description}</p>
                  <Tags tags={project.tags} />
                  <ProjectLink project={project} />
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkShowcase;
