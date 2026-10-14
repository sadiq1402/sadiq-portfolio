# Resume source

`resume.tex` is the LaTeX source. To recompile after editing:

```bash
tectonic resume.tex
cp resume.pdf ../public/resume.pdf
```

Requires [tectonic](https://tectonic-typesetting.github.io/) (`sudo pacman -S tectonic` on Arch).

The header links to `https://sadiq-ai.dev/cv` rather than the bare domain — that
path 307-redirects to `/` (see `vercel.json`) so visits coming from this resume
are distinguishable from organic/search traffic in analytics.
