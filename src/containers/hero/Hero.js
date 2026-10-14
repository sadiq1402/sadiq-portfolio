import React from "react";
import {greeting} from "../../portfolio";
import "./Hero.scss";

const Hero = () => (
  <section className="hero" id="top">
    <div className="hero__grid" />
    <div className="hero__inner">
      <div className="eyebrow">{greeting.location.toUpperCase()}</div>
      <h1 className="hero__name">
        Sadiq
        <br />
        Hasan
      </h1>
      <p className="hero__tagline">
        <b>{greeting.taglineLead}</b> {greeting.taglineRest}
      </p>
      <div className="hero__cta">
        <a className="pill pill-accent" href="#work">
          See the work →
        </a>
        <a className="pill pill-outline" href="#contact">
          Get in touch
        </a>
      </div>
      <div className="hero__ticker">
        <span className="chip">
          <span className="dot" /> LLM Orchestration
        </span>
        <span className="chip">
          <span className="dot" /> RAG Pipelines
        </span>
        <span className="chip">
          <span className="dot" /> AWS Bedrock
        </span>
        <span className="chip">
          <span className="dot" /> Prompt Engineering
        </span>
      </div>
    </div>
  </section>
);

export default Hero;
