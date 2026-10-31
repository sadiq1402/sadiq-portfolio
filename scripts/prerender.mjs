// Writes the portfolio content into build/index.html as plain HTML so crawlers that
// skip JavaScript still see it; React replaces it on mount.
import {readFileSync, writeFileSync} from "fs";

const read = path => readFileSync(new URL(path, import.meta.url), "utf8");

// portfolio.js is ESM with no imports and the package is not "type": "module"
const data = await import("data:text/javascript," + encodeURIComponent(read("../src/portfolio.js")));
const {greeting, socialMediaLinks, about, skillCategories, experience, projects, contactInfo} = data;

const esc = s =>
  String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"})[c]);

const html = `
<div class="seo-static">
  <header>
    <h1>${esc(greeting.username)}</h1>
    <p>${esc(greeting.title)}</p>
    <p>${esc(greeting.location)}</p>
  </header>
  <main>
    <section id="work">
      <h2>Selected work</h2>
      ${projects
        .map(
          p => `<article>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.tagline)}. ${esc(p.year)}, ${esc(p.status)}.</p>
        <p>${esc(p.description)}</p>
        <p>${p.tags.map(esc).join(", ")}</p>
        ${p.link ? `<p><a href="${esc(p.link)}">${esc(p.linkLabel || "Read the write-up")}</a></p>` : ""}
      </article>`
        )
        .join("\n      ")}
    </section>
    <section id="experience">
      <h2>Experience</h2>
      ${experience
        .map(
          e => `<article>
        <h3>${esc(e.role)}, ${esc(e.company)}</h3>
        <p>${esc(e.dateLoc)}</p>
        <ul>${e.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
      </article>`
        )
        .join("\n      ")}
    </section>
    <section id="skills">
      <h2>Stack</h2>
      <dl>${skillCategories.map(c => `<dt>${esc(c.category)}</dt><dd>${c.skills.map(esc).join(", ")}</dd>`).join("")}</dl>
    </section>
    <section id="about">
      <h2>About</h2>
      <p>${esc(about.lead)}</p>
      ${about.paragraphs.map(p => `<p>${esc(p)}</p>`).join("\n      ")}
    </section>
    <section id="contact">
      <h2>${esc(contactInfo.heading)}</h2>
      <p>${esc(contactInfo.subtitle)}</p>
      <p><a href="mailto:${esc(contactInfo.email)}">${esc(contactInfo.email)}</a></p>
      <p><a href="${esc(socialMediaLinks.github)}">GitHub</a> <a href="${esc(socialMediaLinks.linkedin)}">LinkedIn</a> <a href="${esc(greeting.resumeLink)}">Résumé</a></p>
    </section>
  </main>
</div>`;

const indexUrl = new URL("../build/index.html", import.meta.url);
const index = readFileSync(indexUrl, "utf8");
if (!index.includes('<div id="root"></div>')) {
  throw new Error("prerender: empty #root not found in build/index.html");
}
writeFileSync(indexUrl, index.replace('<div id="root"></div>', `<div id="root">${html}</div>`));

const sitemapUrl = new URL("../build/sitemap.xml", import.meta.url);
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  sitemapUrl,
  readFileSync(sitemapUrl, "utf8").replace(/\s*<lastmod>.*?<\/lastmod>/, "").replace("</loc>", `</loc>\n    <lastmod>${today}</lastmod>`)
);

console.log(`prerender: wrote ${projects.length} projects and ${experience.length} roles into build/index.html`);
