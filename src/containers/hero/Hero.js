import React, {useCallback, useEffect, useState} from "react";
import {greeting} from "../../portfolio";
import "./Hero.scss";

const sources = [
  {score: 0.91, doc: "policy_terms.pdf", ref: "§4.2"},
  {score: 0.87, doc: "claim_48213.json", ref: "status"},
  {score: 0.74, doc: "sla_matrix.csv", ref: "row 12"}
];

const answer =
  "Waiting on the surveyor report, filed 3 days ago. The SLA allows 7, so it's on track.";

const stats = [
  {value: "1000+", label: "concurrent agent sessions"},
  {value: "500+", label: "API endpoints shipped"},
  {value: "IIT Madras", label: "BS, Data Science"}
];

// step: 0 idle → 1 query → 2 retrieve → 3 sources → 4 generate → 5 answer → 6 done
const STEP_DELAYS = [700, 900, 700, 900, 600];

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useTrace = () => {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(6);
      setTyped(answer.length);
      return undefined;
    }
    setStep(0);
    setTyped(0);
    const timers = [];
    let t = 0;
    STEP_DELAYS.forEach((delay, i) => {
      t += delay;
      timers.push(setTimeout(() => setStep(i + 1), t));
    });
    for (let i = 1; i <= answer.length; i++) {
      timers.push(setTimeout(() => setTyped(i), t + i * 22));
    }
    timers.push(setTimeout(() => setStep(6), t + answer.length * 22 + 300));
    return () => timers.forEach(clearTimeout);
  }, [run]);

  const replay = useCallback(() => setRun(r => r + 1), []);
  return {step, typed, replay};
};

const Trace = () => {
  const {step, typed, replay} = useTrace();
  const on = n => (step >= n ? " is-on" : "");

  return (
    <figure className="trace" aria-label="Example retrieval trace from a claim status agent">
      <div className="trace__bar">
        <span className="trace__title">trace / claim-status-agent</span>
        <button className="trace__replay" onClick={replay} disabled={step > 0 && step < 6}>
          {step === 6 ? "↻ replay" : "● running"}
        </button>
      </div>

      <div className="trace__body">
        <div className={"trace__row" + on(1)}>
          <span className="trace__key">query</span>
          <span className="trace__query">"Where is claim #48213 stuck?"</span>
        </div>

        <div className={"trace__row" + on(2)}>
          <span className="trace__key">retrieve</span>
          <span className="trace__meta">top_k=3 · hybrid · 112ms</span>
        </div>

        <ol className="trace__sources">
          {sources.map((s, i) => (
            <li
              key={s.doc}
              className={"trace__source" + on(3)}
              style={{transitionDelay: `${i * 120}ms`}}
            >
              <span className="trace__idx">[{i + 1}]</span>
              <span className="trace__doc">
                {s.doc} <em>{s.ref}</em>
              </span>
              <span className="trace__score">{s.score.toFixed(2)}</span>
              <span className="trace__meter">
                <span style={{transform: `scaleX(${step >= 3 ? s.score : 0})`, transitionDelay: `${i * 120}ms`}} />
              </span>
            </li>
          ))}
        </ol>

        <div className={"trace__row" + on(4)}>
          <span className="trace__key">generate</span>
          <span className="trace__meta">bedrock · grounded · 640ms</span>
        </div>

        <p className={"trace__answer" + on(5)}>
          {answer.slice(0, typed)}
          {step === 6 && (
            <>
              {" "}
              <span className="trace__cite">[2]</span> <span className="trace__cite">[3]</span>
            </>
          )}
          {step === 5 && <span className="trace__caret" aria-hidden="true" />}
        </p>
      </div>

      <figcaption className={"trace__foot" + on(6)}>
        <span>
          <span className="dot" /> 2 sources cited
        </span>
        <span>1.18s total</span>
      </figcaption>
    </figure>
  );
};

const Hero = () => (
  <section className="hero" id="top">
    <div className="hero__grid" />
    <div className="hero__inner">
      <div className="hero__copy">
        <div className="hero__eyebrow hero__in" style={{"--d": "0ms"}}>
          <span className="dot" /> {greeting.taglineLead} · {greeting.location}
        </div>
        <h1 className="hero__name">
          <span className="hero__line">
            <span style={{"--d": "100ms"}}>Sadiq</span>
          </span>
          <span className="hero__line">
            <span style={{"--d": "200ms"}}>Hasan</span>
          </span>
        </h1>
        <p className="hero__tagline hero__in" style={{"--d": "380ms"}}>
          Building Generative AI <b>retrieval and agent systems</b> that hold up in production.
        </p>
        <div className="hero__cta hero__in" style={{"--d": "500ms"}}>
          <a className="pill pill-accent" href="#work">
            See the work →
          </a>
          <a className="pill pill-outline" href="#contact">
            Get in touch
          </a>
        </div>
        <dl className="hero__stats hero__in" style={{"--d": "640ms"}}>
          {stats.map(s => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="hero__visual hero__in" style={{"--d": "300ms"}}>
        <Trace />
      </div>
    </div>
  </section>
);

export default Hero;
