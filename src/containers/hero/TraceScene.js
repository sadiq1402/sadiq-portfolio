import React, {useContext, useEffect, useRef} from "react";
import * as THREE from "three";
import StyleContext from "../../contexts/StyleContext";
import {readToken} from "../../components/three/readToken";

const QUERY = new THREE.Vector3(-3.1, 0.2, 0);
const ANSWER = new THREE.Vector3(3.1, -0.2, 0);
const DOC_POS = [
  new THREE.Vector3(0, 1.55, -0.6),
  new THREE.Vector3(0.2, 0, 0.9),
  new THREE.Vector3(-0.1, -1.55, -0.3)
];
// the answer cites sources [2] and [3]
const CITED = [false, true, true];

const edgeCurve = (a, b) => {
  const mid = a.clone().lerp(b, 0.5);
  mid.z += 0.8;
  return new THREE.QuadraticBezierCurve3(a, mid, b);
};

const TraceScene = ({step, sources}) => {
  const {isDark} = useContext(StyleContext);
  const mountRef = useRef(null);
  const labelRefs = useRef([]);
  const stepRef = useRef(step);
  const sceneRef = useRef(null);

  stepRef.current = step;

  useEffect(() => {
    const mount = mountRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.4, 8.6);
    const rig = new THREE.Group();
    scene.add(rig);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 5, 6);
    scene.add(key);

    const nodeGeo = new THREE.IcosahedronGeometry(1, 1);
    const makeNode = (pos, size) => {
      const mat = new THREE.MeshStandardMaterial({flatShading: true, roughness: 0.55, metalness: 0.1, transparent: true});
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      mesh.scale.setScalar(size);
      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(nodeGeo),
        new THREE.LineBasicMaterial({transparent: true})
      );
      wire.scale.setScalar(1.18);
      mesh.add(wire);
      rig.add(mesh);
      return {mesh, mat, wire, base: size};
    };

    const query = makeNode(QUERY, 0.42);
    const answer = makeNode(ANSWER, 0.5);
    const docs = DOC_POS.map((p, i) => makeNode(p, 0.22 + sources[i].score * 0.2));

    const makeEdge = (a, b) => {
      const curve = edgeCurve(a, b);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
        new THREE.LineBasicMaterial({transparent: true})
      );
      rig.add(line);
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 12, 12),
        new THREE.MeshBasicMaterial({transparent: true})
      );
      rig.add(pulse);
      return {curve, line, pulse};
    };

    const inEdges = DOC_POS.map(p => makeEdge(QUERY, p));
    const outEdges = DOC_POS.map(p => makeEdge(p, ANSWER));

    // a sparse field of points gives the camera drift something to move against
    const field = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i < 260; i++) {
      pts.push((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 8 - 2);
    }
    field.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const dust = new THREE.Points(field, new THREE.PointsMaterial({size: 0.03, transparent: true, opacity: 0.5}));
    scene.add(dust);

    const colors = {};
    const applyColors = () => {
      const site = mount.closest(".site") || document.documentElement;
      colors.accent = readToken(site, "--color-accent");
      colors.cool = readToken(site, "--color-cool");
      colors.ink = readToken(site, "--color-ink");
      colors.rule = readToken(site, "--color-rule-2");
      colors.muted = readToken(site, "--color-muted");
      query.mat.color.copy(colors.accent);
      query.wire.material.color.copy(colors.accent);
      answer.mat.color.copy(colors.ink);
      answer.wire.material.color.copy(colors.ink);
      docs.forEach(d => {
        d.mat.color.copy(colors.cool);
        d.wire.material.color.copy(colors.cool);
      });
      [...inEdges, ...outEdges].forEach(e => {
        e.line.material.color.copy(colors.rule);
        e.pulse.material.color.copy(colors.cool);
      });
      dust.material.color.copy(colors.muted);
    };
    applyColors();

    const resize = () => {
      const {clientWidth: w, clientHeight: h} = mount;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // pull back on narrow frames so the whole graph stays in view
      camera.position.z = w / h < 1.2 ? 12 : 8.6;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    const pointer = {x: 0, y: 0};
    const onPointer = e => {
      const r = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    if (!reduced) mount.addEventListener("pointermove", onPointer);

    const v = new THREE.Vector3();
    const placeLabels = () => {
      const anchors = [QUERY, ...DOC_POS, ANSWER];
      const {clientWidth: w, clientHeight: h} = mount;
      anchors.forEach((a, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        v.copy(a).applyMatrix4(rig.matrixWorld).project(camera);
        // documents label above their node, query and answer below
        const shift = i >= 1 && i <= 3 ? "calc(-100% - 26px)" : "34px";
        el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, ${shift})`;
      });
    };

    // eases each visual toward the state the current trace step asks for
    const levels = {query: 0, docs: [0, 0, 0], inE: 0, outE: 0, answer: 0};
    const ease = (cur, target, k) => cur + (target - cur) * k;

    const clock = new THREE.Clock();
    let frame = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      const s = stepRef.current;
      const k = reduced ? 1 : 0.08;

      levels.query = ease(levels.query, s >= 1 ? 1 : 0.25, k);
      levels.inE = ease(levels.inE, s >= 2 ? 1 : 0, k);
      levels.docs = levels.docs.map(l => ease(l, s >= 3 ? 1 : 0.15, k));
      levels.outE = ease(levels.outE, s >= 4 ? 1 : 0, k);
      levels.answer = ease(levels.answer, s >= 5 ? 1 : 0.2, k);

      query.mat.opacity = levels.query;
      query.wire.material.opacity = levels.query * 0.6;
      answer.mat.opacity = levels.answer;
      answer.wire.material.opacity = levels.answer * 0.6;
      answer.mesh.scale.setScalar(answer.base * (0.7 + 0.3 * levels.answer));
      docs.forEach((d, i) => {
        d.mat.opacity = levels.docs[i];
        d.wire.material.opacity = levels.docs[i] * 0.6;
        d.mesh.scale.setScalar(d.base * (0.6 + 0.4 * levels.docs[i]));
      });

      inEdges.forEach((e, i) => {
        e.line.material.opacity = 0.2 + levels.inE * 0.6;
        const live = s >= 2 && s < 6 && !reduced;
        e.pulse.visible = live;
        if (live) e.pulse.position.copy(e.curve.getPoint((t * 0.6 + i * 0.22) % 1));
      });
      outEdges.forEach((e, i) => {
        const on = CITED[i] ? levels.outE : levels.outE * 0.15;
        e.line.material.opacity = 0.12 + on * 0.7;
        e.line.material.color.copy(CITED[i] && s >= 4 ? colors.cool : colors.rule);
        const live = CITED[i] && s >= 4 && s < 6 && !reduced;
        e.pulse.visible = live;
        if (live) e.pulse.position.copy(e.curve.getPoint((t * 0.6 + i * 0.3) % 1));
      });

      if (!reduced) {
        rig.rotation.y = ease(rig.rotation.y, Math.sin(t * 0.25) * 0.22 + pointer.x * 0.25, 0.05);
        rig.rotation.x = ease(rig.rotation.x, pointer.y * 0.12, 0.05);
        [query, answer, ...docs].forEach((n, i) => {
          n.mesh.rotation.y = t * 0.3 + i;
          n.mesh.rotation.x = t * 0.15 + i;
        });
        dust.rotation.y = t * 0.02;
      }

      rig.updateMatrixWorld();
      renderer.render(scene, camera);
      placeLabels();
      frame = requestAnimationFrame(tick);
    };
    tick();

    sceneRef.current = {applyColors};

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mount.removeEventListener("pointermove", onPointer);
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, [sources]);

  useEffect(() => {
    // the theme class lands on .site in the same commit, so read tokens after paint
    const id = requestAnimationFrame(() => sceneRef.current && sceneRef.current.applyColors());
    return () => cancelAnimationFrame(id);
  }, [isDark]);

  const on = n => (step >= n ? " is-on" : "");

  return (
    <div className="scene" ref={mountRef}>
      <div className="scene__labels" aria-hidden="true">
        <span className={"scene__label scene__label--query" + on(1)} ref={el => (labelRefs.current[0] = el)}>
          query
        </span>
        {sources.map((s, i) => (
          <span className={"scene__label" + on(3)} key={s.doc} ref={el => (labelRefs.current[i + 1] = el)}>
            [{i + 1}] {s.doc} <em>{s.score.toFixed(2)}</em>
          </span>
        ))}
        <span className={"scene__label scene__label--answer" + on(5)} ref={el => (labelRefs.current[4] = el)}>
          answer
        </span>
      </div>
    </div>
  );
};

export default TraceScene;
