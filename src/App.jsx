import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#f8f9fc",
  surface: "#ffffff",
  surfaceAlt: "#f1f3f8",
  border: "#e2e6f0",
  borderStrong: "#c8cfe0",
  text: "#0f1117",
  textMid: "#3d4460",
  textSoft: "#7a84a3",
  accent: "#2563eb",
  accentLight: "#eff4ff",
  accentBorder: "#bfcfff",
  green: "#16a34a",
  greenLight: "#f0fdf4",
  greenBorder: "#bbf7d0",
};

const GITHUB_USER = "Hendrik-Stolzke";

// ─── BACKGROUND KACHELN ───────────────────────────────────────────────────────
const STATS = [
  {
    value: "M.Sc.",
    label: "Digital Business Engineering",
    sub: "Hochschule Reutlingen · laufend",
    icon: "🎓",
    color: C.accent,
    colorLight: C.accentLight,
    colorBorder: C.accentBorder,
    // B.Sc. badge with download
    hasBachelor: false,
  },
  {
    value: "B.Sc.",
    label: "Angewandte Künstliche Intelligenz",
    sub: "Hochschule Reutlingen · abgeschlossen",
    icon: "✅",
    color: "#7c3aed",
    colorLight: "#f5f3ff",
    colorBorder: "#ddd6fe",
    hasBachelor: true,
  },
  {
    value: "FiSi",
    label: "Fachinformatiker Systemintegration",
    sub: "Ausbildung · abgeschlossen Jan. 2022",
    icon: "💻",
    color: "#0891b2",
    colorLight: "#ecfeff",
    colorBorder: "#a5f3fc",
    hasBachelor: false,
  },
  {
    value: "Bosch",
    label: "Robert Bosch GmbH – KI im Industrieumfeld",
    sub: "Pflicht-, Freiwilliges Praktikum & Werkstudent · 2024–2025",
    icon: "🏭",
    color: "#d97706",
    colorLight: "#fffbeb",
    colorBorder: "#fde68a",
    hasBachelor: false,
  },
];

// ─── KOMPETENZEN ─────────────────────────────────────────────────────────────
const COMPETENCIES = [
  { icon: "🔬", title: "Angewandte KI", desc: "Deep Learning, Computer Vision und Reinforcement Learning – eingesetzt in produktionsnahen Projekten, nicht nur im Hörsaal." },
  { icon: "⚙️", title: "Industrie-Erfahrung", desc: "Drei Einsätze bei Robert Bosch GmbH mit Fokus auf KI-Anwendungsfelder im industriellen Umfeld, inklusive PANDA-Entwicklung." },
  { icon: "📐", title: "Technische Breite", desc: "Von Embedded Systems (Jetson, Raspberry Pi) über Backend (Python, Java) bis Mobile (Flutter) – durchgängiges technisches Profil." },
  { icon: "🎯", title: "Digital Business Engineering", desc: "M.Sc.-Studium verbindet KI-Kompetenz mit digitaler Transformation, Prozessdenken und unternehmerischer Perspektive." },
];

// ─── BÜCHER ──────────────────────────────────────────────────────────────────
const BOOKS = [
  { title: "PyTorch für Deep Learning", author: "O'Reilly", spine: "#C66A2B" }, // warmes Terracotta
  { title: "Think Human", author: "Whalen – Kundenzentriertes UX-Design", spine: "#355C7D" }, // muted navy blue
  { title: "Machine Learning für Softwareentwickler", author: "Perrotta", spine: "#5B4B8A" }, // deep violet
  { title: "Zero to One", author: "Peter Thiel & Blake Masters", spine: "#2F6F6F" }, // dark teal
  { title: "Der Allesverkäufer", author: "Brad Stone – Jeff Bezos & Amazon", spine: "#556B5D" }, // muted forest green
];

// ─── PROJEKTE ─────────────────────────────────────────────────────────────────
const TAG_COLORS = { Alle: "#7a84a3", Uni: "#2563eb", Hobby: "#16a34a", Hackathon: "#d97706" };
const TAG_BG = { Uni: "#eff4ff", Hobby: "#f0fdf4", Hackathon: "#fffbeb" };
const TAG_BORDER = { Uni: "#bfcfff", Hobby: "#bbf7d0", Hackathon: "#fde68a" };

const PROJECTS = [
  { title: "PANDA", subtitle: "Production Anomaly Detection", desc: "AI-Dashboard zur Erkennung von Produktionsanomalien im industriellen Umfeld – entwickelt bei Robert Bosch GmbH.", tech: ["Python", "ML", "Dashboard", "Computer Vision"], accent: "#2563eb", tag: "Uni" },
  { title: "YOLO Object Detection", subtitle: "Object Detection", desc: "Objekterkennung auf Bildern mit YOLO-Modellen und Label Studio Dataset.", tech: ["PyTorch", "YOLO", "OpenCV"], accent: "#7c3aed", tag: "Uni" },
  { title: "U-Net Medical Imaging", subtitle: "Medical Imaging", desc: "Segmentierung medizinischer Bilddaten mit Deep Learning.", tech: ["TensorFlow", "U-Net", "Image Segmentation"], accent: "#db2777", tag: "Uni" },
  { title: "ML Trading HMM", subtitle: "Time Series Analysis", desc: "Hidden Markov Model zur Analyse von Marktphasen und Trends.", tech: ["Python", "HMM", "Time Series"], accent: "#d97706", tag: "Uni" },
  { title: "Autonomes RC-Auto", subtitle: "Robotics & Embedded AI", desc: "Umbau eines RC-Autos zu einem autonomen Fahrzeug mit Lidar-Sensor, Kamera und PWM-Motorsteuerung.", tech: ["Python", "Jetson Orin Nano", "Lidar", "PWM", "Computer Vision"], accent: "#16a34a", tag: "Hobby" },
  { title: "Raspberry Pi 5 Wecker", subtitle: "Embedded & AI", desc: "Smarter Wecker mit Screen, Nachrichtenanzeige und KI-gestützter Aktienvorhersage/-empfehlung.", tech: ["Python", "Raspberry Pi 5", "PyQt GUI", "AI"], accent: "#0891b2", tag: "Hobby" },
  { title: "Autonome Carrera Bahn", subtitle: "Reinforcement Learning", desc: "RL-gesteuerte Carrera-Bahn mit zwei wählbaren KI-Fahrern (PPO & DDPG).", tech: ["Python", "PPO", "DDPG", "Reinforcement Learning"], accent: "#ea580c", tag: "Hobby" },
  { title: "KI Dating App", subtitle: "Mobile & Backend", desc: "Flutter-App mit Dell EMC Server-Anbindung für KI-gestütztes Matching und Chatfunktionen.", tech: ["Flutter", "Dart", "Server", "AI Matching"], accent: "#db2777", tag: "Hobby" },
  { title: "Akkubohrer Projekt", subtitle: "Sensor & ML", desc: "Materialerkennung während einer Bohrung anhand von Strom-, Spannungs- und Soundsignalen mit GUI-Visualisierung.", tech: ["Python", "Sensoren", "tkinter", "Signalverarbeitung"], accent: "#b45309", tag: "Hobby" },
  { title: "Film/Serien Empfehlung", subtitle: "Recommendation System", desc: "Empfehlungssystem für Filme und Serien mit dem Apriori-Algorithmus und Association Mining.", tech: ["Python", "Apriori", "Association Mining"], accent: "#2563eb", tag: "Uni" },
  { title: "Kartenspiel Ramsch", subtitle: "Client-Server & AI", desc: "Textbasiertes Client-Server-Kartenspiel mit KI-Spieler in Java.", tech: ["Java", "Eclipse", "Client-Server", "KI-Spieler"], accent: "#16a34a", tag: "Uni" },
  { title: "Hackathon Zeitreihe", subtitle: "Predictive Analytics", desc: "Untersuchung und Vorhersage einer Zeitreihe mit dem Random Forest.", tech: ["Python", "Random Forest", "Zeitreihe"], accent: "#d97706", tag: "Hackathon" },
  { title: "Heart Attack Prediction", subtitle: "Medical AI", desc: "Analyse medizinischer Daten und Vorhersage eines Herzinfarkts mit Gaussian Naive Bayes.", tech: ["Python", "Naive Bayes", "Medical Data"], accent: "#dc2626", tag: "Uni" },
  { title: "Buch/Film Verwaltung", subtitle: "Java Desktop App", desc: "Verwaltungssoftware mit Java Swing GUI, Datenbankanbindung via JDBC und SQL-Abfragen.", tech: ["Java", "Swing GUI", "JDBC", "SQL", "Apache NetBeans"], accent: "#0891b2", tag: "Uni" },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function DownloadIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function UploadIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("Home");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle, #c8d0e8 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.4, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "-180px", left: "-180px", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "940px", margin: "0 auto", padding: "0 24px" }}>

        {/* NAV */}
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 0 0", marginBottom: "48px" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(37,99,235,0.28)" }}>
              <span style={{ fontSize: "13px", fontWeight: "800", color: "#fff" }}>HS</span>
            </div>
            <span style={{ fontSize: "14px", fontWeight: "700", color: C.text }}>Hendrik Stolzke</span>
          </motion.div>
          <div style={{ display: "flex", gap: "4px" }}>
            {["Home", "Projekte", "CV"].map((item) => (
              <button key={item} onClick={() => setActive(item)} style={{
                background: active === item ? C.accentLight : "transparent",
                border: `1px solid ${active === item ? C.accentBorder : "transparent"}`,
                color: active === item ? C.accent : C.textSoft,
                padding: "6px 16px", borderRadius: "8px", cursor: "pointer",
                fontSize: "13px", fontWeight: "600", transition: "all 0.15s",
              }}>
                {item}
              </button>
            ))}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {active === "Home" && <HomePage key="home" setActive={setActive} />}
          {active === "Projekte" && <ProjectsPage key="projects" />}
          {active === "CV" && <CVPage key="cv" />}
        </AnimatePresence>

        {/* FOOTER */}
        <div style={{ marginTop: "80px", paddingBottom: "32px", borderTop: `1px solid ${C.border}`, paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: C.textSoft }}>© 2026 Hendrik Stolzke</span>
          <span style={{ fontSize: "12px", color: C.textSoft }}>Student · M.Sc. Digital Business Engineering</span>
        </div>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setActive }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>

      {/* HERO CARD */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "36px 40px", marginBottom: "16px", display: "flex", gap: "36px", alignItems: "flex-start", flexWrap: "wrap", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
        {/* Avatar */}
        <div style={{ flexShrink: 0, width: "200px", height: "200px", borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.border}`, background: C.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/profile.png" alt="Hendrik Stolzke"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = `linear-gradient(135deg, ${C.accentLight}, #dbeafe)`;
              e.target.parentNode.innerHTML = `<span style="font-size:56px;font-weight:800;color:#2563eb">HS</span>`;
            }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: "240px" }}>
          {/* <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: C.greenLight, border: `1px solid ${C.greenBorder}`, borderRadius: "20px", padding: "4px 13px", marginBottom: "16px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.green, display: "inline-block" }} />
            <span style={{ fontSize: "12px", fontWeight: "600", color: C.green }}>Offen für Werkstudent & Praktikum</span>
          </div> */}

          <h1 style={{ fontSize: "clamp(24px, 4.5vw, 36px)", fontWeight: "800", lineHeight: 1.15, marginBottom: "6px", letterSpacing: "-0.025em", color: C.text }}>
            Hendrik Stolzke
          </h1>
          <div style={{ fontSize: "14px", fontWeight: "600", color: C.accent, marginBottom: "14px" }}>
            M.Sc. Digital Business Engineering &nbsp;·&nbsp; B.Sc. Angewandte KI ✓
          </div>

          <p style={{ fontSize: "14px", color: C.textMid, lineHeight: 1.75, maxWidth: "500px", marginBottom: "24px" }}>
            Ich verbinde fundiertes KI-Wissen mit unternehmerischem Denken –{" "}
            <strong style={{ color: C.text }}>Computer Vision</strong>,{" "}
            <strong style={{ color: C.text }}>Deep Learning</strong> und{" "}
            <strong style={{ color: C.text }}>Full-Stack-Entwicklung</strong>.{" "}
            14+ abgeschlossene Projekte, mehrfache Praxiserfahrung bei Robert Bosch GmbH.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={() => setActive("Projekte")}
              style={{ background: C.accent, color: "#fff", border: "none", padding: "10px 22px", borderRadius: "9px", fontSize: "13px", fontWeight: "700", cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.22)", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
              Projekte ansehen →
            </button>
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: C.surface, color: C.textMid, border: `1.5px solid ${C.border}`, padding: "10px 18px", borderRadius: "9px", fontSize: "13px", fontWeight: "600", textDecoration: "none", transition: "border-color 0.15s, color 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}>
              <GitHubIcon size={15} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* GITHUB STRIP */}
      <GitHubStrip />

      {/* BACKGROUND KACHELN */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px" }}>
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <span style={{ fontSize: "18px" }}>{s.icon}</span>
              <span style={{ fontSize: "18px", fontWeight: "800", color: s.color }}>{s.value}</span>
            </div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: C.text, marginBottom: "3px", lineHeight: 1.4 }}>{s.label}</div>
            <div style={{ fontSize: "11px", color: C.textSoft, lineHeight: 1.45 }}>{s.sub}</div>
            {s.hasBachelor && (
              <a href="/thesis.pdf" download
                style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: s.color, textDecoration: "none", padding: "4px 9px", borderRadius: "6px", background: s.colorLight, border: `1px solid ${s.colorBorder}`, transition: "opacity 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.78"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                <DownloadIcon size={12} /> Bachelorarbeit
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* KOMPETENZEN */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "10px" }}>Profil</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {COMPETENCIES.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.06 }}
              style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{h.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: C.text, marginBottom: "5px" }}>{h.title}</div>
              <div style={{ fontSize: "12px", color: C.textSoft, lineHeight: 1.65 }}>{h.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* BÜCHER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "12px" }}>Lektüre</div>
        <div style={{ display: "flex", gap: "0px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", alignItems: "flex-end", overflowX: "auto" }}>
          {BOOKS.map((b, i) => (
            <motion.div key={i} whileHover={{ y: -6, transition: { duration: 0.15 } }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: i < BOOKS.length - 1 ? "6px" : 0, cursor: "default", flexShrink: 0 }}>
              {/* Book spine */}
              <div style={{
                width: "36px",
                height: `${110 + (i % 3) * 16}px`,
                background: b.spine,
                borderRadius: "3px 2px 2px 3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.15), inset -2px 0 4px rgba(0,0,0,0.12)",
                position: "relative",
                overflow: "hidden",
              }}>
                <span style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  fontSize: "9px",
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.9)",
                  padding: "6px 2px",
                  lineHeight: 1.3,
                  textAlign: "center",
                  maxHeight: "90%",
                  overflow: "hidden",
                }}>
                  {b.title}
                </span>
                {/* Highlight */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "6px", height: "100%", background: "rgba(255,255,255,0.15)", borderRadius: "3px 0 0 3px" }} />
              </div>
              {/* Tooltip on hover handled by title below */}
              <div style={{ marginTop: "8px", width: "36px", textAlign: "center" }}>
                <div style={{ fontSize: "8px", color: C.textSoft, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60px", transform: "translateX(-12px)" }}>
                  {b.author.split("–")[0].trim()}
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ marginLeft: "24px", flex: 1, minWidth: "140px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: C.textMid, marginBottom: "6px" }}>Leseliste</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {BOOKS.map((b, i) => (
                <li key={i} style={{ fontSize: "11px", color: C.textSoft, marginBottom: "4px", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: b.spine, flexShrink: 0, marginTop: "2px", display: "inline-block" }} />
                  <span><strong style={{ color: C.textMid }}>{b.title}</strong> · {b.author}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── GITHUB STRIP ─────────────────────────────────────────────────────────────
function GitHubStrip() {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=6&sort=updated`).then(r => r.json()),
    ]).then(([user, repoList]) => {
      setStats(user);
      setRepos(Array.isArray(repoList) ? repoList.slice(0, 6) : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const langColors = { Python: "#3572A5", JavaScript: "#f1e05a", Java: "#b07219", TypeScript: "#2b7489", Dart: "#00B4AB", "Jupyter Notebook": "#DA5B0B", default: "#8b8b8b" };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
      style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "20px 24px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <GitHubIcon size={16} />
          <span style={{ fontSize: "13px", fontWeight: "700", color: C.text }}>GitHub · {GITHUB_USER}</span>
        </div>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", color: C.accent, textDecoration: "none", fontWeight: "600" }}>
          Profil ansehen <ExternalIcon size={12} />
        </a>
      </div>

      {/* Stats row
      {stats && !loading && (
        <div style={{ display: "flex", gap: "20px", marginBottom: "16px", flexWrap: "wrap" }}>
          {[
            { label: "Repositories", value: stats.public_repos },
            { label: "Follower", value: stats.followers },
            { label: "Following", value: stats.following },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: "800", color: C.accent }}>{s.value}</div>
              <div style={{ fontSize: "11px", color: C.textSoft }}>{s.label}</div>
            </div>
          ))}
          {stats.bio && (
            <div style={{ fontSize: "12px", color: C.textMid, alignSelf: "center", fontStyle: "italic", borderLeft: `2px solid ${C.border}`, paddingLeft: "16px" }}>
              {stats.bio}
            </div>
          )}
        </div>
      )} */}

      {/* Repos grid */}
      {loading ? (
        <div style={{ fontSize: "12px", color: C.textSoft, padding: "8px 0" }}>Lade Repositories…</div>
      ) : repos.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
          {repos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "12px 14px", background: C.surfaceAlt, borderRadius: "9px", border: `1px solid ${C.border}`, textDecoration: "none", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = C.accentBorder}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: C.accent }}>{repo.name}</span>
                <span style={{ fontSize: "11px", color: C.textSoft, display: "flex", alignItems: "center", gap: "3px" }}>⭐ {repo.stargazers_count}</span>
              </div>
              {repo.description && (
                <div style={{ fontSize: "11px", color: C.textSoft, lineHeight: 1.5, marginBottom: "8px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {repo.description}
                </div>
              )}
              {repo.language && (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: langColors[repo.language] || langColors.default, display: "inline-block" }} />
                  <span style={{ fontSize: "10px", color: C.textSoft }}>{repo.language}</span>
                </div>
              )}
            </a>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "12px", color: C.textSoft }}>Keine öffentlichen Repositories gefunden.</div>
      )}
    </motion.div>
  );
}

// ─── PROJEKTE ─────────────────────────────────────────────────────────────────
function ProjectsPage() {
  const [filter, setFilter] = useState("Alle");
  const [selected, setSelected] = useState(null);
  const [projectFiles, setProjectFiles] = useState({});

  const tags = ["Alle", "Uni", "Hobby", "Hackathon"];
  const visible = filter === "Alle" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  function handleFileUpload(projectTitle, files) {
    const newFiles = Array.from(files).map(f => ({
      name: f.name,
      url: URL.createObjectURL(f),
      type: f.type,
      file: f,
    }));
    setProjectFiles(prev => ({
      ...prev,
      [projectTitle]: [...(prev[projectTitle] || []), ...newFiles],
    }));
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "22px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "4px" }}>Portfolio</div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: C.text, margin: 0 }}>Projekte ({visible.length})</h2>
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {tags.map((t) => (
            <button key={t} onClick={() => setFilter(t)} style={{
              background: filter === t ? (t === "Alle" ? C.surfaceAlt : TAG_BG[t]) : "transparent",
              border: `1px solid ${filter === t ? (t === "Alle" ? C.borderStrong : TAG_BORDER[t]) : C.border}`,
              color: filter === t ? TAG_COLORS[t] : C.textSoft,
              padding: "5px 14px", borderRadius: "8px", cursor: "pointer",
              fontSize: "12px", fontWeight: "600", transition: "all 0.15s",
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
        {visible.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i}
            files={projectFiles[p.title] || []}
            onUpload={(files) => handleFileUpload(p.title, files)}
            onSelect={() => setSelected(p.title === selected ? null : p.title)}
            expanded={selected === p.title}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ProjectCard({ p, i, files, onUpload, onSelect, expanded }) {
  const inputRef = useRef();

  function renderPreview(f) {
    if (f.type.startsWith("image/")) return (
      <img src={f.url} alt={f.name} style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "6px", background: C.surfaceAlt }} />
    );
    if (f.type === "application/pdf" || f.type.includes("presentation") || f.name.endsWith(".pptx")) return (
      <div style={{ padding: "10px", background: C.surfaceAlt, borderRadius: "6px", fontSize: "12px", color: C.textMid, display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "20px" }}>{f.name.endsWith(".pptx") ? "📊" : "📄"}</span>
        <div>
          <div style={{ fontWeight: "600" }}>{f.name}</div>
          <a href={f.url} download={f.name} style={{ color: C.accent, fontSize: "11px", textDecoration: "none" }}>Herunterladen</a>
        </div>
      </div>
    );
    return (
      <div style={{ padding: "10px", background: C.surfaceAlt, borderRadius: "6px", fontSize: "12px", color: C.textMid }}>
        📎 {f.name} · <a href={f.url} download={f.name} style={{ color: C.accent, textDecoration: "none" }}>Download</a>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
      style={{ background: C.surface, border: `1px solid ${expanded ? C.accentBorder : C.border}`, borderRadius: "12px", overflow: "hidden", boxShadow: expanded ? "0 4px 16px rgba(37,99,235,0.08)" : "0 1px 3px rgba(0,0,0,0.04)", transition: "box-shadow 0.15s, border-color 0.15s" }}
      whileHover={!expanded ? { y: -3, boxShadow: "0 6px 20px rgba(0,0,0,0.08)", transition: { duration: 0.15 } } : {}}>

      {/* Accent bar */}
      <div style={{ height: "3px", background: p.accent }} />

      <div style={{ padding: "18px 20px" }}>
        {/* Tag badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: C.text, paddingRight: "8px" }}>{p.title}</div>
          <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: TAG_COLORS[p.tag], background: TAG_BG[p.tag], border: `1px solid ${TAG_BORDER[p.tag]}`, padding: "2px 8px", borderRadius: "5px", whiteSpace: "nowrap", flexShrink: 0 }}>{p.tag}</span>
        </div>
        <div style={{ fontSize: "11px", color: p.accent, fontWeight: "600", marginBottom: "10px" }}>{p.subtitle}</div>
        <p style={{ fontSize: "12px", color: C.textMid, lineHeight: 1.65, marginBottom: "12px" }}>{p.desc}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {p.tech.map((t) => (
            <span key={t} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "5px", background: C.surfaceAlt, color: C.textSoft, border: `1px solid ${C.border}`, fontWeight: "500" }}>{t}</span>
          ))}
        </div>

        {/* Action row */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: C.textMid, textDecoration: "none", padding: "5px 10px", borderRadius: "7px", border: `1px solid ${C.border}`, background: C.surfaceAlt, transition: "border-color 0.15s, color 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}>
            <GitHubIcon size={12} /> GitHub
          </a>
          {/* <button onClick={onSelect}
            style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: files.length > 0 ? C.accent : C.textSoft, padding: "5px 10px", borderRadius: "7px", border: `1px solid ${files.length > 0 ? C.accentBorder : C.border}`, background: files.length > 0 ? C.accentLight : C.surfaceAlt, cursor: "pointer", transition: "all 0.15s" }}>
            📎 {files.length > 0 ? `${files.length} Datei${files.length > 1 ? "en" : ""}` : "Dateien"}
          </button>
          <button onClick={() => inputRef.current?.click()}
            style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "600", color: C.textSoft, padding: "5px 10px", borderRadius: "7px", border: `1px solid ${C.border}`, background: C.surfaceAlt, cursor: "pointer" }}>
            <UploadIcon size={11} /> Upload
          </button> */}
          {/* <input ref={inputRef} type="file" multiple accept="image/*,.pdf,.pptx,.ppt,.png,.jpg,.jpeg"
            style={{ display: "none" }} onChange={(e) => onUpload(e.target.files)} /> */}
        </div>

        {/* File previews */}
        <AnimatePresence>
          {expanded && files.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
              {files.map((f, fi) => <div key={fi}>{renderPreview(f)}</div>)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── CV ───────────────────────────────────────────────────────────────────────
function CVPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "4px" }}>Dokument</div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: C.text, margin: 0 }}>Lebenslauf</h2>
        </div>
        <a href="/cv.pdf" download
          style={{ background: C.accent, color: "#fff", textDecoration: "none", padding: "9px 20px", borderRadius: "9px", fontSize: "12px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "7px", boxShadow: "0 2px 8px rgba(37,99,235,0.22)", transition: "opacity 0.15s" }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
          <DownloadIcon size={13} /> PDF herunterladen
        </a>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }}>
        <iframe
          src="/cv.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
          title="Lebenslauf"
          style={{ width: "100%", height: "820px", border: "none", display: "block", pointerEvents: "auto" }}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </motion.div>
  );
}