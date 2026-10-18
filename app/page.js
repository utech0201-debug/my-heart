"use client";
import { useEffect, useRef, useState } from "react";

// ✏️ Make it yours
const LINES = [
  "Anne, your smile is my favourite sunrise. One look and my whole day glows.",
  "Your jokes could make any bad day surrender. I'd happily lose every argument just to hear you laugh.",
  "Even in the simplest moments, your presence brings the brightest light into my world? Still the most beautiful thing I've ever seen. Yes, even then. 😂",
  "So I built you this little corner of the internet, to ask what my heart keeps whispering.",
];
const LINES_FR = [
  "Anne, ton sourire est mon plus beau lever de soleil. Un seul regard et toute ma journée s’illumine.",
  "Tes blagues feraient capituler n’importe quelle mauvaise journée. Je perdrais volontiers chaque débat juste pour t’entendre rire.",
  "Même dans les moments les plus simples, ta présence apporte la plus belle lumière à mon monde. Tu es toujours la plus belle chose que j’aie jamais vue. Oui, même à cet instant. 😂",
  "Alors j’ai créé ce petit coin d’Internet pour te poser la question que mon cœur me souffle sans cesse.",
];
const SIGNATURE = "Yours, Oscar ❣️";
const SIGNATURE_FR = "À toi, Oscar ❣️";
// 📸 Optional: put a photo of you two in /public and set it, e.g. "/us.jpg"
const PHOTO = "";

const LABELS = ["Not yet", "Are you sure?", "Think again 🥺", "Really?", "Pretty please", "Okay, yes"];
const LABELS_FR = ["Pas encore", "Tu es sûre ?", "Réfléchis encore 🥺", "Vraiment ?", "S’il te plaît", "D’accord, oui"];
const FLOAT = ["💗", "💖", "💕", "✨", "🌸", "🌹"];
const POP = ["💖", "💗", "💍", "✨", "💕", "🌹"];
const rand = (a, b) => a + Math.random() * (b - a);

// 🎵 A music-box lullaby made live in the browser (no audio files needed)
let ac = null, timer = null;
const CH = [[220, 261.63, 329.63, 440], [174.61, 220, 261.63, 349.23], [261.63, 329.63, 392, 523.25], [196, 246.94, 293.66, 392]];
function startMusic() {
  ac = ac || new (window.AudioContext || window.webkitAudioContext)();
  if (ac.state === "suspended") ac.resume();
  let i = 0;
  const play = () => {
    const f = CH[Math.floor(i / 8) % 4][[0, 1, 2, 3, 2, 1, 2, 3][i % 8]] * 2, t = ac.currentTime;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = "triangle"; o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.07, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 1.5); i++;
  };
  clearInterval(timer); play(); timer = setInterval(play, 420);
}
function stopMusic() { clearInterval(timer); timer = null; }

function burst(canvas) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d"), dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.scale(dpr, dpr);
  const G = ["💖", "💗", "💕", "✨", "🌹", "💍", "🎉"], ps = [], end = performance.now() + 2800;
  const shoot = (x, y, c) => { for (let k = 0; k < c; k++) { const a = rand(0, 6.283), s = rand(3, 11); ps.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, g: G[k % G.length], sz: rand(16, 34), life: rand(90, 150), age: 0, r: 0, rot: rand(-0.1, 0.1) }); } };
  shoot(innerWidth / 2, innerHeight * 0.45, 70);
  [500, 1100, 1700].forEach((d) => setTimeout(() => shoot(rand(0.2, 0.8) * innerWidth, rand(0.2, 0.5) * innerHeight, 50), d));
  const tick = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = ps.length - 1; i >= 0; i--) {
      const q = ps[i]; q.age++; q.vy += 0.18; q.vx *= 0.992; q.x += q.vx; q.y += q.vy; q.r += q.rot;
      if (q.age > q.life) { ps.splice(i, 1); continue; }
      ctx.save(); ctx.globalAlpha = 1 - q.age / q.life; ctx.translate(q.x, q.y); ctx.rotate(q.r);
      ctx.font = q.sz + "px serif"; ctx.textAlign = "center"; ctx.fillText(q.g, 0, 0); ctx.restore();
    }
    if (ps.length || performance.now() < end) requestAnimationFrame(tick);
  };
  tick();
}

function Typed({ text, onDone }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setI(text.length); return; }
    const t = setInterval(() => setI((v) => v + 1), 34);
    return () => clearInterval(t);
  }, [text]);
  useEffect(() => { if (i >= text.length) onDone(); }, [i, text, onDone]);
  return (
    <>
      <span className="ghost">{text}</span>
      <span className="typed">
        <span>{text.slice(0, i)}{i < text.length && <b className="caret">♥</b>}</span>
      </span>
    </>
  );
}

function Couple({ love }) {
  return (
    <svg className={"couple" + (love ? " love" : "")} viewBox="0 0 400 420" aria-hidden="true">
      <defs>
        <radialGradient id="mg"><stop offset="0" stopColor="#fff6d8" /><stop offset="1" stopColor="#ffd28a" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="292" cy="120" r="100" fill="url(#mg)" />
      <circle cx="292" cy="120" r="46" fill="#fff4d6" />
      <g transform="translate(0,-24)">
        <path className="beat" d="M200 278 C150 245 168 215 192 232 C197 236 200 241 200 241 C200 241 203 236 208 232 C232 215 250 245 200 278 Z" fill="#ff5c8a" />
      </g>
      <g fill="currentColor">
        <path d="M0 420 L0 376 Q120 346 200 366 Q300 388 400 354 L400 420 Z" />
        <circle cx="178" cy="308" r="19" />
        <path d="M146 388 L150 352 Q152 330 178 328 Q204 330 206 352 L212 388 Z" />
        <ellipse cx="223" cy="316" rx="20" ry="27" />
        <circle cx="220" cy="311" r="17" />
        <path d="M204 354 Q221 330 238 354 L260 388 L194 388 Z" />
      </g>
    </svg>
  );
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("en");
  const isFrench = language === "fr";
  const lines = isFrench ? LINES_FR : LINES;
  const labels = isFrench ? LABELS_FR : LABELS;
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [tries, setTries] = useState(0);
  const [floaters, setFloaters] = useState([]);
  const [stars, setStars] = useState([]);
  const [pops, setPops] = useState([]);
  const [flies, setFlies] = useState([]);
  const [official, setOfficial] = useState(false);
  const [lanterns, setLanterns] = useState([]);
  const [music, setMusic] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hold, setHold] = useState(0);
  const [date, setDate] = useState("");
  const dir = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setHold((h) => Math.max(0, Math.min(100, h + (dir.current > 0 ? 2.2 : -1.6)))), 30);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (hold >= 100 && step === 4) { navigator.vibrate?.(200); dir.current = 0; setStep(2); }
  }, [hold, step]);

  useEffect(() => {
    setFloaters(Array.from({ length: 14 }, (_, k) => ({ g: FLOAT[k % FLOAT.length], left: rand(0, 96), size: rand(14, 34), dur: rand(10, 19), delay: -rand(0, 16) })));
    setStars(Array.from({ length: 34 }, () => ({ left: rand(0, 100), top: rand(0, 100), size: rand(2, 4), dur: rand(2, 5), delay: -rand(0, 5) })));
    setFlies(Array.from({ length: 16 }, () => ({ left: rand(4, 96), top: rand(52, 94), dur: rand(4, 9), delay: -rand(0, 8) })));
    setLanterns(Array.from({ length: 9 }, () => ({ left: rand(4, 94), dur: rand(16, 28), delay: -rand(0, 26), s: rand(0.7, 1.3) })));
    const move = (e) => {
      const r = document.documentElement.style;
      r.setProperty("--ry", (e.clientX / innerWidth - 0.5) * 9 + "deg");
      r.setProperty("--rx", -(e.clientY / innerHeight - 0.5) * 9 + "deg");
    };
    window.addEventListener("pointermove", move);
    // tiny heart burst wherever she taps
    const tap = (e) => {
      for (let k = 0; k < 6; k++) {
        const s = document.createElement("span");
        s.className = "spark"; s.textContent = k % 2 ? "💗" : "✨";
        s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px";
        s.style.setProperty("--dx", rand(-60, 60) + "px"); s.style.setProperty("--dy", rand(-90, -30) + "px");
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 900);
      }
    };
    window.addEventListener("pointerdown", tap);
    return () => { window.removeEventListener("pointerdown", tap); window.removeEventListener("pointermove", move); stopMusic(); };
  }, []);

  const openLetter = () => { setOpen(true); try { startMusic(); setMusic(true); } catch {} setTimeout(() => setStep(1), 1500); };
  const toggleMusic = () => { try { if (music) { stopMusic(); setMusic(false); } else { startMusic(); setMusic(true); } } catch {} };
  const next = () => { if (n < lines.length - 1) { setDone(false); setN(n + 1); } else setStep(4); };
  const celebrate = () => {
    setPops(Array.from({ length: 80 }, (_, k) => ({ g: POP[k % 6], left: rand(0, 100), size: rand(16, 44), dur: rand(3, 7), delay: rand(0, 2.5) })));
    navigator.vibrate?.([80, 60, 80, 60, 200]);
    setDate(new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }));
    setOfficial(false); setStep(3);
    setTimeout(() => { const c = document.getElementById("fx"); if (c) burst(c); }, 50);
    setTimeout(() => setOfficial(true), 2300);
  };
  const hop = () => setPos({ x: rand(-70, 70), y: rand(-40, 40) });
  const notYet = () => { if (tries >= LABELS.length - 1) return celebrate(); setTries(tries + 1); hop(); };

  return (
    <>
      <div id="bg" aria-hidden="true">
        <i className="orb o1" /><i className="orb o2" /><i className="orb o3" />
        <i className="shoot" style={{ "--t": "12%", animationDelay: "1s" }} /><i className="shoot" style={{ "--t": "28%", animationDelay: "6s" }} /><i className="shoot" style={{ "--t": "6%", animationDelay: "11s" }} />
        {PHOTO && <div className="photo" style={{ backgroundImage: `url(${PHOTO})` }} />}
        <Couple love={step === 3} />
        {lanterns.map((l, i) => <i key={i} className="lantern" style={{ left: `${l.left}%`, transform: `scale(${l.s})`, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }} />)}
        {flies.map((f, i) => <b key={`f${i}`} className="fly" style={{ left: `${f.left}%`, top: `${f.top}%`, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }} />)}
        {stars.map((s, i) => <b key={i} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }} />)}
        {floaters.map((f, i) => <span key={i} style={{ left: `${f.left}vw`, fontSize: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}>{f.g}</span>)}
      </div>

      <button onClick={() => setLanguage(isFrench ? "en" : "fr")} aria-label={isFrench ? "Switch to English" : "Traduire en français"} style={{ position: "fixed", top: "16px", right: "16px", zIndex: 20, padding: ".65em 1em", fontSize: ".9rem" }}>{isFrench ? "🇬🇧 English" : "🇫🇷 Traduire en français"}</button>
      <button className="mute" onClick={toggleMusic} aria-label={music ? "Mute music" : "Play music"}>{music ? "🎵" : "🔇"}</button>

      <main>
        {step === 0 && (
          <section className="step">
            <h1 className="name">Anne 💖</h1>
            <p className="sub">{isFrench ? "Une lettre t’attend. Touche le sceau." : "There's a letter for you. Tap the seal."}</p>
            <div className={`env ${open ? "open" : ""}`}>
              <div className="paper"><span>{isFrench ? "Pour Anne 💖" : "For Anne 💖"}</span></div>
              <div className="flap" />
              <button className="seal" onClick={openLetter} aria-label="Open the letter">💌</button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="step">
            <div className="card">
              <p className="line"><Typed key={`${language}-${n}`} text={lines[n]} onDone={() => setDone(true)} /></p>
              <div className="dots">{LINES.map((_, i) => <i key={i} className={i === n ? "on" : ""} />)}</div>
              <button onClick={next} style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}>
                {n === lines.length - 1 ? (isFrench ? "Encore une chose 💖" : "One more thing 💖") : (isFrench ? "Continue" : "Keep going")}
              </button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="step">
            <div className="card">
              <h2 className="ask" style={{ fontSize: "clamp(2rem,9vw,2.8rem)" }}>{isFrench ? "Tiens mon cœur pour découvrir ma question" : "Hold my heart to unlock my question"}</h2>
              <button className="hold" style={{ "--p": hold }} aria-label="Press and hold to fill the heart"
                onPointerDown={() => { dir.current = 1; }} onPointerUp={() => { dir.current = -1; }}
                onPointerLeave={() => { dir.current = -1; }} onPointerCancel={() => { dir.current = -1; }}
                onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (dir.current = 1)} onKeyUp={() => { dir.current = -1; }}
                onContextMenu={(e) => e.preventDefault()}>
                <span style={{ transform: `scale(${1 + hold / 250})` }}>❤️</span>
              </button>
              <p className="sub" style={{ margin: 0 }}>{isFrench ? "Niveau d’amour" : "Love level"} : {Math.round(hold)}%</p>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="step">
            <div className="card">
              <h2 className="ask">{isFrench ? "Anne, veux-tu être ma petite amie ? 💖" : "Anne, will you be my girlfriend? 💖"}</h2>
              <div className="row">
                <button className="yes" onClick={celebrate} style={{ transform: `scale(${1 + tries * 0.16})`, margin: tries * 5 }}>{isFrench ? "Oui 💖" : "Yes 💖"}</button>
                <button className="quiet" onClick={notYet} onPointerEnter={(e) => e.pointerType === "mouse" && tries > 0 && hop()} style={{ transform: `translate(${pos.x}px,${pos.y}px) scale(${Math.max(0.65, 1 - tries * 0.07)})` }}>{labels[tries]}</button>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="step">
            {!official ? (
              <div className="card">
                <p className="line" style={{ minHeight: 0 }}>{isFrench ? "On officialise tout ça… 💞" : "Making it official… 💞"}</p>
                <div className="bar"><i /></div>
              </div>
            ) : (
              <>
                <div className="rings" aria-hidden="true"><i /><i /><i /></div>
                <div className="bigheart" aria-hidden="true">❤️</div>
                <div className="card">
                  <h1 className="name">{isFrench ? "Elle a dit oui ! 🥹" : "She said yes! 🥹"}</h1>
                  <p className="line" style={{ minHeight: 0, marginBottom: ".7em" }}>{isFrench ? "Tu viens de faire de moi la personne la plus heureuse au monde. Je te promets des rires, des aventures et des disputes que je perdrai avec plaisir." : "You just made me the happiest person alive. I promise you laughter, adventures, and arguments I'll happily lose."}</p>
                  <div className="cert">
                    <b>{isFrench ? "Certificat officiel de petite amie" : "Official Girlfriend Certificate"}</b>
                    <span>Anne ❤ Oscar</span>
                    <small>{date} · {isFrench ? "fais une capture d’écran" : "screenshot this"} 📸</small>
                  </div>
                  <p className="sub" style={{ margin: "0 0 .8em" }}>{isFrench ? SIGNATURE_FR : SIGNATURE}</p>
                  <div className="tell">
                    <a className="btn" href="/api/tell?via=sms">{isFrench ? "Écrire à Oscar 💌" : "Text Oscar 💌"}</a>
                    <a className="btn" href="/api/tell?via=wa">{isFrench ? "WhatsApp d’Oscar 💬" : "WhatsApp Oscar 💬"}</a>
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </main>

      <canvas id="fx" aria-hidden="true" />
      {pops.map((p, i) => <span key={i} className="pop" style={{ left: `${p.left}vw`, fontSize: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}>{p.g}</span>)}
    </>
  );
}
