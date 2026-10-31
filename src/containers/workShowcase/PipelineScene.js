import React, {useContext, useEffect, useRef} from "react";
import * as THREE from "three";
import StyleContext from "../../contexts/StyleContext";
import {readToken} from "../../components/three/readToken";

const NODES = {
  caller: new THREE.Vector3(-3.4, 0.5, 0),
  stt: new THREE.Vector3(-1.7, 0.5, 0),
  llm: new THREE.Vector3(0, 0.5, 0),
  tts: new THREE.Vector3(1.7, 0.5, 0),
  agentA: new THREE.Vector3(-0.9, -1.5, -0.6),
  agentB: new THREE.Vector3(0.9, -1.5, -0.6)
};
const LABELS = [
  ["caller", "caller"],
  ["stt", "STT"],
  ["llm", "LLM"],
  ["tts", "TTS"],
  ["agentA", "agent"],
  ["agentB", "agent"]
];

const curve = (a, b, lift = 0, depth = 0.5) => {
  const mid = a.clone().lerp(b, 0.5);
  mid.y += lift;
  mid.z += depth;
  return new THREE.QuadraticBezierCurve3(a, mid, b);
};

const PATHS = {
  in: curve(NODES.caller, NODES.stt),
  sttLlm: curve(NODES.stt, NODES.llm),
  llmTts: curve(NODES.llm, NODES.tts),
  reply: curve(NODES.tts, NODES.caller, 2.6, 0.3),
  toA: curve(NODES.llm, NODES.agentA, 0, 0.3),
  toB: curve(NODES.llm, NODES.agentB, 0, 0.3)
};

// one call: [path, start, end, reversed]; the handoff alternates agents each loop
const CYCLE = 6.4;
const legs = handoff => [
  ["in", 0, 0.9],
  ["sttLlm", 0.9, 1.7],
  [handoff, 1.9, 2.6],
  [handoff, 2.8, 3.5, true],
  ["llmTts", 3.7, 4.5],
  ["reply", 4.6, 6.0]
];

const PipelineScene = () => {
  const {isDark} = useContext(StyleContext);
  const mountRef = useRef(null);
  const labelRefs = useRef([]);
  const sceneRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    const rig = new THREE.Group();
    rig.rotation.x = 0.18;
    // the graph spans x -3.4 to 1.7, so centre it on the camera
    rig.position.x = 0.85;
    scene.add(rig);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2, 5, 6);
    scene.add(key);

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const octGeo = new THREE.OctahedronGeometry(1, 0);
    const sphGeo = new THREE.IcosahedronGeometry(1, 1);
    const makeNode = (geo, pos, size) => {
      const mat = new THREE.MeshStandardMaterial({flatShading: true, roughness: 0.5, metalness: 0.1, transparent: true});
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.scale.setScalar(size);
      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({transparent: true}));
      wire.scale.setScalar(1.12);
      mesh.add(wire);
      rig.add(mesh);
      return {mesh, mat, wire, base: size, level: 0.4};
    };

    const nodes = {
      caller: makeNode(sphGeo, NODES.caller, 0.34),
      stt: makeNode(boxGeo, NODES.stt, 0.62),
      llm: makeNode(boxGeo, NODES.llm, 0.78),
      tts: makeNode(boxGeo, NODES.tts, 0.62),
      agentA: makeNode(octGeo, NODES.agentA, 0.36),
      agentB: makeNode(octGeo, NODES.agentB, 0.36)
    };

    const lines = Object.fromEntries(
      Object.entries(PATHS).map(([k, c]) => {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(c.getPoints(48)),
          new THREE.LineBasicMaterial({transparent: true, opacity: 0.5})
        );
        if (k === "toA" || k === "toB") {
          line.material.opacity = 0.3;
        }
        rig.add(line);
        return [k, line];
      })
    );

    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), new THREE.MeshBasicMaterial());
    rig.add(pulse);

    const colors = {};
    const applyColors = () => {
      const site = mount.closest(".site") || document.documentElement;
      colors.accent = readToken(site, "--color-accent");
      colors.cool = readToken(site, "--color-cool");
      colors.ink = readToken(site, "--color-ink");
      colors.rule = readToken(site, "--color-rule-2");
      const paint = (n, c) => {
        n.mat.color.copy(c);
        n.wire.material.color.copy(c);
      };
      paint(nodes.caller, colors.accent);
      ["stt", "llm", "tts"].forEach(k => paint(nodes[k], colors.cool));
      paint(nodes.agentA, colors.ink);
      paint(nodes.agentB, colors.ink);
      Object.values(lines).forEach(l => l.material.color.copy(colors.rule));
    };
    applyColors();

    const resize = () => {
      const {clientWidth: w, clientHeight: h} = mount;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // pull back on narrow frames so caller and TTS both stay in view
      camera.position.set(0, 0.2, w / h < 1.25 ? (8.8 * 1.25) / (w / h) : 8.8);
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
      const {clientWidth: w, clientHeight: h} = mount;
      LABELS.forEach(([key], i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        v.copy(NODES[key]).applyMatrix4(rig.matrixWorld).project(camera);
        const below = key.startsWith("agent") || key === "caller" ? "30px" : `calc(-100% - ${key === "llm" ? 46 : 34}px)`;
        el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, ${below})`;
        el.classList.toggle("is-on", nodes[key].level > 0.7);
      });
    };

    // only spend frames while the case study is on screen
    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const ease = (cur, target, k) => cur + (target - cur) * k;
    const pathEnds = {
      in: ["caller", "stt"],
      sttLlm: ["stt", "llm"],
      toA: ["llm", "agentA"],
      toB: ["llm", "agentB"],
      llmTts: ["llm", "tts"],
      reply: ["tts", "caller"]
    };

    const clock = new THREE.Clock();
    let frame = 0;
    let elapsed = 0;
    const render = () => {
      rig.updateMatrixWorld();
      renderer.render(scene, camera);
      placeLabels();
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const dt = clock.getDelta();
      if (!visible) return;
      elapsed += dt;
      const loop = Math.floor(elapsed / CYCLE);
      const t = elapsed % CYCLE;
      const handoff = loop % 2 ? "toB" : "toA";

      const active = legs(handoff).find(([, a, b]) => t >= a && t < b);
      const targets = Object.fromEntries(Object.keys(nodes).map(k => [k, 0.4]));
      Object.values(lines).forEach(l => l.material.color.copy(colors.rule));

      if (active) {
        const [path, a, b, back] = active;
        const p = (t - a) / (b - a);
        pulse.visible = true;
        pulse.position.copy(PATHS[path].getPoint(back ? 1 - p : p));
        pulse.material.color.copy(path === "in" || path === "reply" ? colors.accent : colors.cool);
        lines[path].material.color.copy(colors.cool);
        const [from, to] = pathEnds[path];
        targets[back ? to : from] = 1;
        targets[back ? from : to] = 0.4 + 0.6 * p;
      } else {
        pulse.visible = false;
      }
      // the agent in play stays lit for its whole handoff
      if (t >= 1.9 && t < 3.5) targets[handoff === "toA" ? "agentA" : "agentB"] = 1;

      Object.entries(nodes).forEach(([k, n], i) => {
        n.level = ease(n.level, targets[k], 0.12);
        n.mat.opacity = 0.35 + 0.65 * n.level;
        n.wire.material.opacity = 0.25 + 0.5 * n.level;
        n.mesh.scale.setScalar(n.base * (0.88 + 0.12 * n.level));
        n.mesh.rotation.y = elapsed * 0.25 + i;
        n.mesh.rotation.x = elapsed * 0.12 + i;
      });

      rig.rotation.y = ease(rig.rotation.y, Math.sin(elapsed * 0.2) * 0.18 + pointer.x * 0.22, 0.05);
      rig.rotation.x = ease(rig.rotation.x, 0.18 + pointer.y * 0.1, 0.05);
      render();
    };

    if (reduced) {
      // a still frame of the handoff, the moment the case study is about
      pulse.visible = false;
      ["llm", "agentA"].forEach(k => {
        nodes[k].level = 1;
        nodes[k].mat.opacity = 1;
      });
      lines.toA.material.color.copy(colors.cool);
      render();
    } else {
      tick();
    }

    sceneRef.current = {
      applyColors: () => {
        applyColors();
        if (reduced) render();
      }
    };

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      mount.removeEventListener("pointermove", onPointer);
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => sceneRef.current && sceneRef.current.applyColors());
    return () => cancelAnimationFrame(id);
  }, [isDark]);

  return (
    <div className="pipeline3d" ref={mountRef}>
      <div className="scene__labels" aria-hidden="true">
        {LABELS.map(([key, text], i) => (
          <span
            key={key}
            className={`scene__label pipeline3d__label pipeline3d__label--${key.replace(/[AB]$/, "")}`}
            ref={el => (labelRefs.current[i] = el)}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PipelineScene;
