import React from "react";
import "./Readings.scss";

// every figure is quoted from experience and projects in portfolio.js
const readings = [
  {value: "1000+", unit: "concurrent interactions", source: "Enterprise AI agents, Vsynergize AI"},
  {value: "500+", unit: "REST endpoints", source: "Multi-role EdTech LMS"},
  {value: "2,100+", unit: "automated tests", source: "Multi-role EdTech LMS"},
  {value: "28", unit: "RLS policy tests in CI", source: "MiloJulo"}
];

const Readings = () => (
  <section className="section readings" aria-labelledby="readings-title">
    <div className="container">
      <h2 className="visually-hidden" id="readings-title">
        In production
      </h2>
      <dl className="readings__grid">
        {readings.map(r => (
          <div className="readings__cell" key={r.unit}>
            <dt className="readings__value measured">{r.value}</dt>
            <dd className="readings__unit">{r.unit}</dd>
            <dd className="readings__source">{r.source}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Readings;
