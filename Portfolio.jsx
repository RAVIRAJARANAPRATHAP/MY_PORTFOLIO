import React, { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------- */
const DATA = {
  name: "R Ravirajaranaprathap",
  initials: "RR",
  title: "Aspiring Software Engineer",
  focus: "Python · Java · Databases · Machine Learning",
  tagline:
    "Turning ideas into clean, working code — a Computer Science student building full-stack projects with Python, Flask & JavaScript.",
  location: "Vadodara, Gujarat, India",
  email: "ravirajaravula@gmail.com",
  phone: "9182924310",
  linkedin: "www.linkedin.com/in/rravirajaranaprathap-0a2687244",
  github: "https://github.com/Chintu-460",
  about: [
    "Third-year B.Tech Computer Science (AI & ML specialization) student at Parul University with hands-on experience building Python and Flask-based web applications, working with databases, REST-style data flows, and version control.",
    "Completed the Deloitte Australia Data Analytics Job Simulation, applying structured problem-solving and stakeholder communication to real-world data tasks. Comfortable writing clean code across the stack — HTML/CSS/JS, Python, Java — and eager to bring strong fundamentals and a fast learning curve to a fast-paced, AI-driven engineering team.",
  ],
  skills: [
    { group: "Languages", icon: "</>", items: ["Java", "Python", "JavaScript", "HTML/CSS"] },
    { group: "Frameworks & Libs", icon: "⚙", items: ["Flask", "React", "Chart.js", "RESTful APIs"] },
    { group: "Databases", icon: "▣", items: ["SQL", "SQLite", "Relational DB design"] },
    { group: "Tools", icon: "◈", items: ["Git & GitHub", "Vercel", "VS Code"] },
    { group: "Concepts", icon: "⬡", items: ["OOP", "Data Structures & Algorithms", "Data Analytics"] },
  ],
  education: {
    school: "Parul University",
    degree: "B.Tech, Computer Science & Engineering — AI & ML Specialization",
    period: "Aug 2024 – Apr 2028 (Expected)",
  },
  certifications: [
    {
      name: "Deloitte Australia — Data Analytics Job Simulation",
      issuer: "Forage",
      detail: "Practical exercises in data analysis, insight generation, and stakeholder communication.",
    },
  ],
  projects: [
    {
      title: "Sales & Revenue Analysis Dashboard",
      stack: ["HTML", "CSS", "JavaScript", "Chart.js"],
      description:
        "A self-contained dashboard for tracking sales KPIs — revenue, orders, average order value, profit, growth rate — with live-updating charts, sortable table, and CSV import/export filterable by year, region, and category.",
      link: "https://github.com/Chintu-460",
      featured: true,
      accent: "#3FD8C8",
    },
    {
      title: "File Management Web App",
      stack: ["Python", "Flask", "SQLite"],
      description:
        "A Flask app backed by SQLite, deployed live on Vercel with reusable server-rendered templates.",
      link: "https://github.com/Chintu-460",
      accent: "#A78BFA",
    },
    {
      title: "Attendance Calculator",
      stack: ["HTML", "CSS", "JS"],
      description:
        "Calculates attendance percentage and how many classes can be missed while staying above threshold.",
      link: "https://github.com/Chintu-460",
      accent: "#F472B6",
    },
    {
      title: "Personal Portfolio Website",
      stack: ["HTML", "CSS"],
      description: "An earlier personal site focused on clean layout and semantic HTML.",
      link: "https://github.com/Chintu-460",
      accent: "#60A5FA",
    },
  ],
};

/* ------------------------------------------------------------------
   WEB3FORMS — visit https://web3forms.com, enter ravirajaravula@gmail.com
   and paste your fresh access key below if emails are not arriving
------------------------------------------------------------------- */
const WEB3FORMS_KEY = "b062c25c-26f8-4110-9354-cb7258c535bc";

/* ------------------------------------------------------------------
   DESIGN TOKENS
------------------------------------------------------------------- */
const C = {
  bg: "#05080F",
  surface: "rgba(255,255,255,0.042)",
  border: "rgba(255,255,255,0.09)",
  text: "#F0F4FF",
  muted: "#8B97A8",
  a1: "#3FD8C8",
  a2: "#A78BFA",
  a3: "#F472B6",
};

/* ------------------------------------------------------------------
   HOOKS
------------------------------------------------------------------- */
function useTilt(strength = 10) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const move = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: ny * strength, ry: -nx * strength, gx: (nx + 0.5) * 100, gy: (ny + 0.5) * 100 });
  }, [strength]);
  const leave = useCallback(() => setT({ rx: 0, ry: 0, gx: 50, gy: 50 }), []);
  return [ref, t, move, leave];
}

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); io.unobserve(el); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, v];
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "about", "skills", "projects", "education", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ------------------------------------------------------------------
   COMPONENTS
------------------------------------------------------------------- */
function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, v] = useReveal();
  const map = { up: "translateY(34px)", left: "translateX(-34px)", right: "translateX(34px)" };
  return (
    <div ref={ref} style={{
      transform: v ? "none" : (map[dir] || map.up),
      opacity: v ? 1 : 0,
      transition: `opacity .75s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform .75s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function TiltCard({ children, style = {}, glow = C.a1, className = "" }) {
  const [ref, t, move, leave] = useTilt(9);
  return (
    <div
      ref={ref}
      className={`tc ${className}`}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
        transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: "transform .15s ease-out, box-shadow .4s ease, border-color .4s ease",
        boxShadow: `0 20px 60px -20px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08)`,
        willChange: "transform",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
        background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, ${glow}16 0%, transparent 60%)`,
        transition: "background .15s ease-out",
      }} />
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1, pointerEvents: "none",
        background: `linear-gradient(90deg, transparent, ${glow}55, transparent)`,
      }} />
      {children}
    </div>
  );
}

function Badge({ children, color = C.a1 }) {
  return (
    <span style={{
      fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, fontWeight: 500,
      padding: "4px 11px", borderRadius: 999,
      background: `${color}1A`, border: `1px solid ${color}40`, color,
      display: "inline-block",
    }}>{children}</span>
  );
}

function SHead({ label, title }) {
  return (
    <div style={{ marginBottom: 42 }}>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, letterSpacing: 2.5, color: C.a1, textTransform: "uppercase", marginBottom: 12 }}>
        ⬡ {label}
      </div>
      <h2 style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(2rem,3.5vw,2.9rem)", fontWeight: 500, color: C.text, lineHeight: 1.14 }}>
        {title}
      </h2>
    </div>
  );
}

function Toast({ visible, onClose }) {
  return (
    <div style={{
      position: "fixed", bottom: 30, right: 30, zIndex: 9999,
      transform: visible ? "translateY(0) scale(1)" : "translateY(80px) scale(.92)",
      opacity: visible ? 1 : 0,
      transition: "transform .45s cubic-bezier(.34,1.56,.64,1), opacity .4s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{
        background: "rgba(5,8,15,.93)",
        border: `1px solid ${C.a1}50`,
        backdropFilter: "blur(28px)",
        borderRadius: 16, padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 14,
        boxShadow: `0 0 50px -12px ${C.a1}50, 0 24px 48px -24px rgba(0,0,0,.8)`,
        minWidth: 290,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${C.a1}, ${C.a2})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 19, fontWeight: 700, color: "#05080F",
        }}>✓</div>
        <div>
          <div style={{ color: C.text, fontWeight: 600, fontSize: 14.5 }}>Message sent successfully!</div>
          <div style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>I'll get back to you soon.</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20, marginLeft: "auto", lineHeight: 1 }}>×</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   MAIN
------------------------------------------------------------------- */
export default function Portfolio() {
  const active = useActiveSection();
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState(false);

  const onHeroMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const sendForm = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          replyto: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setToast(true);
        setTimeout(() => setToast(false), 5500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const NAV = [["About", "about"], ["Skills", "skills"], ["Projects", "projects"], ["Education", "education"], ["Contact", "contact"]];
  const ACCENT_COLORS = [C.a1, C.a2, C.a3, "#60A5FA", "#34D399"];

  return (
    <div style={{ fontFamily: "'Inter',-apple-system,sans-serif", background: C.bg, color: C.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        a{color:inherit;text-decoration:none}
        button{font-family:inherit}
        input,textarea{font-family:inherit;width:100%}
        ::selection{background:${C.a1};color:#05080F}
        @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(55px,-70px) scale(1.08)}66%{transform:translate(-35px,45px) scale(.95)}}
        @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-70px,35px) scale(1.06)}66%{transform:translate(45px,-55px) scale(.93)}}
        @keyframes orb3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(35px,65px) scale(.97)}66%{transform:translate(-55px,-25px) scale(1.04)}}
        @keyframes pring{0%{transform:scale(1);opacity:.65}100%{transform:scale(1.55);opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .navbtn{background:none;border:none;color:${C.muted};font-size:13.5px;cursor:pointer;padding:6px 14px;border-radius:999px;transition:background .2s,color .2s}
        .navbtn:hover{color:${C.text};background:rgba(255,255,255,.07)}
        .navbtn.on{color:${C.a1};background:${C.a1}18}
        .tc:hover{border-color:${C.a1}40!important;box-shadow:0 28px 70px -22px rgba(0,0,0,.7),0 0 60px -28px ${C.a1}28!important}
        .chip{font-family:'IBM Plex Mono',monospace;font-size:12px;padding:7px 13px;border-radius:999px;border:1px solid ${C.border};background:transparent;color:${C.muted};cursor:default;display:inline-block;transition:background .25s,color .25s,border-color .25s,transform .25s,box-shadow .25s}
        .chip:hover{background:${C.a1}18;color:${C.a1};border-color:${C.a1}50;transform:translateY(-2px);box-shadow:0 4px 16px -4px ${C.a1}44}
        .ctabtn{border:none;padding:14px 28px;border-radius:999px;font-size:14.5px;font-weight:600;cursor:pointer;transition:transform .25s,box-shadow .25s,opacity .25s;display:inline-flex;align-items:center;gap:8px}
        .ctabtn:hover:not(:disabled){transform:translateY(-2px)}
        .sl{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;border:1px solid ${C.border};color:${C.muted};font-size:13px;transition:all .25s;backdrop-filter:blur(10px);font-family:'IBM Plex Mono',monospace}
        .sl:hover{border-color:${C.a1}55;color:${C.a1};background:${C.a1}12;transform:translateY(-2px)}
        input:focus,textarea:focus{outline:none;border-color:${C.a1}70!important;box-shadow:0 0 0 3px ${C.a1}18}
        @media(max-width:780px){.hm{display:none!important}.cg{grid-template-columns:1fr!important}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      {/* BG ORBS + DOT GRID */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 720, height: 720, borderRadius: "50%", background: `radial-gradient(circle,${C.a1}3e 0%,transparent 65%)`, top: "-14%", left: "-9%", filter: "blur(6px)", animation: "orb1 24s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 620, height: 620, borderRadius: "50%", background: `radial-gradient(circle,${C.a2}38 0%,transparent 65%)`, top: "24%", right: "-11%", filter: "blur(6px)", animation: "orb2 30s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle,${C.a3}2e 0%,transparent 65%)`, bottom: "4%", left: "24%", filter: "blur(6px)", animation: "orb3 36s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.055) 1px,transparent 1px)", backgroundSize: "40px 40px", opacity: .55 }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ NAV ══ */}
        <nav style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 100, display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", background: "rgba(5,8,15,.76)", backdropFilter: "blur(28px) saturate(180%)", WebkitBackdropFilter: "blur(28px) saturate(180%)", border: `1px solid ${C.border}`, borderRadius: 999, boxShadow: "0 8px 40px -12px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.04)" }}>
          <button onClick={() => go("hero")} style={{ fontFamily: "'Newsreader',serif", fontSize: 17, fontWeight: 600, color: C.text, background: "none", border: "none", cursor: "pointer", padding: "4px 14px", borderRadius: 999, marginRight: 6 }}>
            {DATA.initials}
          </button>
          <div className="hm" style={{ width: 1, height: 18, background: C.border, margin: "0 6px" }} />
          {NAV.map(([l, id]) => (
            <button key={id} className={`navbtn hm ${active === id ? "on" : ""}`} onClick={() => go(id)}>{l}</button>
          ))}
        </nav>

        {/* ══ HERO ══ */}
        <section id="hero" ref={heroRef} onMouseMove={onHeroMove} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "10vh 6vw 8vh" }}>
          <div style={{ maxWidth: 820 }}>
            {/* Avatar rings */}
            <div style={{ position: "relative", width: 88, height: 88, marginBottom: 36 }}>
              <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1.5px solid ${C.a1}58`, animation: "pring 2.5s ease-out infinite" }} />
              <div style={{ position: "absolute", inset: -10, borderRadius: "50%", border: `1px solid ${C.a1}28`, animation: "pring 2.5s ease-out .9s infinite" }} />
              <div style={{ width: 88, height: 88, borderRadius: "50%", background: `linear-gradient(135deg,${C.a1},${C.a2})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Newsreader',serif", fontSize: 28, fontWeight: 600, color: "#05080F", position: "relative", zIndex: 1, boxShadow: `0 0 44px -10px ${C.a1}80` }}>
                {DATA.initials}
              </div>
            </div>

            {/* Status */}
            <div style={{ marginBottom: 22 }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, padding: "5px 14px", borderRadius: 999, background: "#0F2E1C", border: "1px solid #1A5C32", color: "#4ADE80", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", display: "inline-block", animation: "pring 1.5s ease-out infinite" }} />
                Open to internships & collaborations
              </span>
            </div>

            {/* Name gradient */}
            <h1 style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(2.6rem,6vw,4.6rem)", fontWeight: 500, lineHeight: 1.06, background: `linear-gradient(135deg,${C.text} 0%,${C.a1} 48%,${C.a2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 18, transform: `translate(${mouse.x * 6}px,${mouse.y * 4}px)`, transition: "transform .25s ease-out" }}>
              {DATA.name}
            </h1>

            <p style={{ fontSize: "clamp(1.1rem,2vw,1.35rem)", color: C.muted, marginBottom: 12, fontWeight: 300 }}>{DATA.title}</p>
            <p style={{ fontSize: 15.5, color: C.muted, maxWidth: 580, lineHeight: 1.78, marginBottom: 36 }}>{DATA.tagline}</p>

            {/* Focus badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {DATA.focus.split(" · ").map(f => <Badge key={f} color={C.a1}>{f}</Badge>)}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <button className="ctabtn" onClick={() => go("projects")} style={{ background: `linear-gradient(135deg,${C.a1},${C.a2})`, color: "#05080F", boxShadow: `0 8px 32px -8px ${C.a1}60` }}>
                View Projects →
              </button>
              <button className="ctabtn" onClick={() => go("contact")} style={{ background: C.surface, color: C.text, border: `1px solid ${C.border}`, backdropFilter: "blur(20px)" }}>
                Get in Touch
              </button>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <a href={DATA.github} target="_blank" rel="noreferrer" className="sl" title="GitHub">GH</a>
              <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="sl" title="LinkedIn">in</a>
              <a href={`mailto:${DATA.email}`} className="sl" title="Email">@</a>
              <span style={{ color: C.muted, fontSize: 13, marginLeft: 8, display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: C.a1 }}>⌖</span>{DATA.location}
              </span>
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" style={{ padding: "10vh 6vw" }}>
          <Reveal><SHead label="About Me" title="Who I Am" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, maxWidth: 1100 }}>
            <Reveal delay={80}>
              <TiltCard style={{ padding: "clamp(24px,4vw,36px)" }} glow={C.a1}>
                <div style={{ fontSize: 28, marginBottom: 18 }}>👨‍💻</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.85, color: C.muted, marginBottom: 18 }}>{DATA.about[0]}</p>
                <p style={{ fontSize: 15.5, lineHeight: 1.85, color: C.muted }}>{DATA.about[1]}</p>
              </TiltCard>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "🎓", label: "University", val: "Parul University, Gujarat" },
                  { icon: "📅", label: "Year", val: "3rd Year B.Tech (AI & ML)" },
                  { icon: "📍", label: "Location", val: DATA.location },
                  { icon: "📬", label: "Email", val: DATA.email },
                ].map(({ icon, label, val }) => (
                  <TiltCard key={label} style={{ padding: "16px 22px" }} glow={C.a2}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 11, background: `${C.a2}1A`, border: `1px solid ${C.a2}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{icon}</div>
                      <div>
                        <div style={{ fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3 }}>{label}</div>
                        <div style={{ fontSize: 14.5, color: C.text, fontWeight: 500 }}>{val}</div>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section id="skills" style={{ padding: "10vh 6vw" }}>
          <Reveal><SHead label="Skills" title="What I Work With" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 20, maxWidth: 1100 }}>
            {DATA.skills.map((g, i) => {
              const c = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <Reveal key={g.group} delay={i * 80}>
                  <TiltCard style={{ padding: 24, height: "100%" }} glow={c}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c}1A`, border: `1px solid ${c}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: c, fontFamily: "'IBM Plex Mono',monospace" }}>{g.icon}</div>
                      <h3 style={{ fontSize: 13, fontWeight: 600, color: c, letterSpacing: .2 }}>{g.group}</h3>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {g.items.map(item => <span key={item} className="chip">{item}</span>)}
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section id="projects" style={{ padding: "10vh 6vw" }}>
          <Reveal><SHead label="Projects" title="Things I've Built" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22, maxWidth: 1100 }}>
            {DATA.projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} style={p.featured ? { gridColumn: "span 2" } : {}}>
                <a href={p.link} target="_blank" rel="noreferrer" style={{ display: "block", height: "100%" }}>
                  <TiltCard className="tc" style={{ padding: p.featured ? 36 : 28, height: "100%" }} glow={p.accent}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.accent},${p.accent}00)`, borderRadius: "20px 20px 0 0" }} />
                    <div style={{ marginBottom: 10, marginTop: p.featured ? 10 : 0 }}>
                      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: p.accent, background: `${p.accent}16`, border: `1px solid ${p.accent}28`, padding: "3px 10px", borderRadius: 999 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "'Newsreader',serif", fontSize: p.featured ? 26 : 20, fontWeight: 600, margin: "0 0 10px", color: C.text }}>{p.title}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {p.stack.map(s => (
                        <span key={s} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, padding: "3px 9px", borderRadius: 999, background: `${p.accent}12`, border: `1px solid ${p.accent}25`, color: p.accent }}>{s}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>{p.description}</p>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>View on GitHub →</span>
                  </TiltCard>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ EDUCATION ══ */}
        <section id="education" style={{ padding: "10vh 6vw" }}>
          <Reveal><SHead label="Education" title="Academic Journey" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22, maxWidth: 1100 }}>
            <Reveal delay={80}>
              <TiltCard style={{ padding: 32 }} glow={C.a1}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 15, background: `${C.a1}15`, border: `1px solid ${C.a1}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🎓</div>
                  <div>
                    <div style={{ fontSize: 10.5, fontFamily: "'IBM Plex Mono',monospace", color: C.a1, marginBottom: 4, letterSpacing: 1.5 }}>UNDERGRADUATE</div>
                    <h3 style={{ fontFamily: "'Newsreader',serif", fontSize: 21, fontWeight: 500, color: C.text }}>{DATA.education.school}</h3>
                  </div>
                </div>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.65, marginBottom: 18 }}>{DATA.education.degree}</p>
                <Badge color={C.a1}>{DATA.education.period}</Badge>
              </TiltCard>
            </Reveal>
            {DATA.certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={160 + i * 80}>
                <TiltCard style={{ padding: 32, height: "100%" }} glow={C.a3}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 15, background: `${C.a3}15`, border: `1px solid ${C.a3}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🏅</div>
                    <div>
                      <div style={{ fontSize: 10.5, fontFamily: "'IBM Plex Mono',monospace", color: C.a3, marginBottom: 4, letterSpacing: 1.5 }}>CERTIFICATION</div>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Issued by {cert.issuer}</h3>
                    </div>
                  </div>
                  <p style={{ fontWeight: 600, fontSize: 15.5, color: C.text, marginBottom: 10 }}>{cert.name}</p>
                  <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.65 }}>{cert.detail}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" style={{ padding: "10vh 6vw 14vh" }}>
          <Reveal><SHead label="Contact" title="Let's Work Together" /></Reveal>
          <div className="cg" style={{ display: "grid", gridTemplateColumns: "1fr 1.45fr", gap: 28, maxWidth: 1100 }}>

            {/* Left info */}
            <Reveal delay={80} dir="left">
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <TiltCard style={{ padding: 28 }} glow={C.a1}>
                  <p style={{ fontSize: 16, lineHeight: 1.82, color: C.muted, marginBottom: 26 }}>
                    I'm open to <strong style={{ color: C.text }}>internships</strong>, <strong style={{ color: C.text }}>junior roles</strong>, and <strong style={{ color: C.text }}>collaborative projects</strong>. I usually reply within a day.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { icon: "📧", label: "Email", val: DATA.email, href: `mailto:${DATA.email}` },
                      { icon: "📞", label: "Phone", val: DATA.phone, href: `tel:${DATA.phone}` },
                      { icon: "🔗", label: "LinkedIn", val: "rravirajaranaprathap", href: DATA.linkedin },
                      { icon: "⚡", label: "GitHub", val: "Chintu-460", href: DATA.github },
                    ].map(({ icon, label, val, href }) => (
                      <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${C.a1}12`, border: `1px solid ${C.a1}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{icon}</div>
                        <div>
                          <div style={{ fontSize: 10.5, color: C.muted, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 14, color: C.text }}>{val}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </TiltCard>
                <TiltCard style={{ padding: "16px 22px" }} glow={C.a2}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>📍</span>
                    <div>
                      <div style={{ fontSize: 10.5, color: C.muted, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>Location</div>
                      <div style={{ fontSize: 14, color: C.text }}>{DATA.location}</div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </Reveal>

            {/* Right form */}
            <Reveal delay={160} dir="right">
              <TiltCard style={{ padding: "clamp(24px,4vw,38px)" }} glow={C.a2}>
                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "44px 20px" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 22px", background: `linear-gradient(135deg,${C.a1},${C.a2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: `0 0 44px -10px ${C.a1}75`, animation: "float 3s ease-in-out infinite", color: "#05080F", fontWeight: 700 }}>✓</div>
                    <h3 style={{ fontFamily: "'Newsreader',serif", fontSize: 26, fontWeight: 500, marginBottom: 12 }}>Message Sent!</h3>
                    <p style={{ color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>Thanks for reaching out. I'll reply within a day.</p>
                    <button className="ctabtn" onClick={() => setStatus("idle")} style={{ background: C.surface, color: C.text, border: `1px solid ${C.border}` }}>
                      Send another →
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontFamily: "'Newsreader',serif", fontSize: 22, fontWeight: 500, marginBottom: 6 }}>Send a Message</h3>
                      <p style={{ color: C.muted, fontSize: 14 }}>Fill in the form and I'll get back to you.</p>
                    </div>
                    <form onSubmit={sendForm} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <div>
                          <label style={{ fontSize: 11.5, color: C.muted, fontFamily: "'IBM Plex Mono',monospace", display: "block", marginBottom: 7 }}>Name *</label>
                          <input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={fs()} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11.5, color: C.muted, fontFamily: "'IBM Plex Mono',monospace", display: "block", marginBottom: 7 }}>Email *</label>
                          <input required type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={fs()} />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: 11.5, color: C.muted, fontFamily: "'IBM Plex Mono',monospace", display: "block", marginBottom: 7 }}>Message *</label>
                        <textarea required rows={6} placeholder="Tell me about your project or opportunity…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...fs(), resize: "vertical" }} />
                      </div>
                      {status === "error" && (
                        <div style={{ padding: "12px 16px", borderRadius: 12, fontSize: 13, color: "#FCA5A5", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)" }}>
                          ⚠ Something went wrong. Email me directly at {DATA.email}
                        </div>
                      )}
                      <button type="submit" className="ctabtn" disabled={status === "sending"} style={{ background: status === "sending" ? C.surface : `linear-gradient(135deg,${C.a1},${C.a2})`, color: status === "sending" ? C.muted : "#05080F", alignSelf: "flex-start", boxShadow: status === "sending" ? "none" : `0 8px 32px -8px ${C.a1}55`, opacity: status === "sending" ? .7 : 1, cursor: status === "sending" ? "default" : "pointer" }}>
                        {status === "sending"
                          ? <><span style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${C.muted}`, borderTopColor: "transparent", display: "inline-block", animation: "spin .8s linear infinite" }} />Sending…</>
                          : "Send Message →"}
                      </button>
                    </form>
                  </>
                )}
              </TiltCard>
            </Reveal>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ padding: "24px 6vw" }}>
          <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${C.border},transparent)`, marginBottom: 24 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <div>
              <span style={{ fontFamily: "'Newsreader',serif", fontSize: 17, fontWeight: 600, marginRight: 14 }}>{DATA.initials}</span>
              <span style={{ color: C.muted, fontSize: 13 }}>© {new Date().getFullYear()} {DATA.name}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={DATA.github} target="_blank" rel="noreferrer" className="sl">GH</a>
              <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="sl">in</a>
              <a href={`mailto:${DATA.email}`} className="sl">@</a>
            </div>
            <span style={{ color: C.muted, fontSize: 13 }}>Built with React ⚡</span>
          </div>
        </footer>
      </div>

      <Toast visible={toast} onClose={() => setToast(false)} />
    </div>
  );
}

function fs() {
  return {
    background: "rgba(255,255,255,.038)",
    border: `1px solid ${C.border}`,
    borderRadius: 12, padding: "12px 14px",
    fontSize: 14, color: C.text,
    transition: "border-color .2s, box-shadow .2s",
    width: "100%",
  };
}
