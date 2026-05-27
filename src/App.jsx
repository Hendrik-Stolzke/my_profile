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

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── BACKGROUND KACHELN ───────────────────────────────────────────────────────
const STATS = [
  {
    value: "M.Sc.",
    label: "Digital Business Engineering",
    sub: "Hochschule Reutlingen · laufend März 2026 - voraussichtlich September 2027",
    icon: "🎓📈",
    color: C.accent,
    colorLight: C.accentLight,
    colorBorder: C.accentBorder,
    hasBachelor: false,
  },
  {
    value: "B.Sc.",
    label: "Angewandte Künstliche Intelligenz",
    sub: "Hochschule Offenburg · abgeschlossen Feb. 2026",
    icon: "🎓✅",
    color: "#7c3aed",
    colorLight: "#f5f3ff",
    colorBorder: "#ddd6fe",
    hasBachelor: true,
  },
  {
    value: "FiSi",
    label: "Fachinformatiker Systemintegration",
    sub: "Ferdinand-von-Steinbeisschule Reutlingen · abgeschlossen Jan. 2022",
    icon: "💻✅",
    color: "#0891b2",
    colorLight: "#ecfeff",
    colorBorder: "#a5f3fc",
    hasBachelor: false,
  },
  {
    value: "Bosch",
    label: "Robert Bosch GmbH – KI im Industrieumfeld",
    sub: "Pflicht-, Freiwilliges Praktikum & Werkstudent · 2024–2025",
    icon: "🏭✅",
    color: "#ED0007",
    colorLight: "#fffbeb",
    colorBorder: "#fde68a",
    hasBachelor: false,
  },
];

// ─── KOMPETENZEN ─────────────────────────────────────────────────────────────
const COMPETENCIES = [
  { icon: "🧠", title: "Angewandte KI", desc: "Computer Vision, Deep Learning, Reinforcement Learning, NLP und Machine Learning - eingesetzt in Projekten." },
  { icon: "⚙️", title: "Industrie-Erfahrung", desc: "Software Entwicklung in der Robert Bosch GmbH mit Fokus auf IT- und KI-Anwendungsfelder." },
  { icon: "📐", title: "Technische Breite", desc: "Von Embedded Systems (Jetson, Raspberry Pi) über Backend (Python, Java, SQL, etc.) bis Mobile (Flutter Dart, React) und Linux Server." },
  { icon: "🎯", title: "Digital Business", desc: "M.Sc.-Studium verbindet KI-Kompetenz mit digitaler Transformation und unternehmerischer Perspektive." },
];

// ─── BÜCHER ──────────────────────────────────────────────────────────────────
const BOOKS = [
  { title: "PyTorch für Deep Learning", author: "O'Reilly", spine: "#C66A2B", buyUrl: "https://www.oreilly.com/library/view/pytorch-fur-deep/9781098125899/" },
  { title: "Think Human", author: "Whalen – Kundenzentriertes UX-Design", spine: "#355C7D", buyUrl: "https://dpunkt.de/produkt/think-human-kundenzentriertes-ux-design/" },
  { title: "Machine Learning für Softwareentwickler", author: "Perrotta", spine: "#5B4B8A", buyUrl: "https://dpunkt.de/produkt/machine-learning-fuer-softwareentwickler/" },
  { title: "Zero to One", author: "Peter Thiel & Blake Masters", spine: "#2F6F6F", buyUrl: "https://campus.de/wirtschaft-gesellschaft/wirtschaftssachbuch/zero-to-one/CAM50160?srsltid=AfmBOorjFevqvsRN9YMRksfEW91vX_8nmUl3b2qjQZBGaB3DEdsV_cRp" },
  { title: "Der Allesverkäufer", author: "Brad Stone – Jeff Bezos & Amazon", spine: "#556B5D", buyUrl: "https://campus.de/wirtschaft-gesellschaft/wirtschaftssachbuch/der-allesverkaeufer/CAM51062?srsltid=AfmBOoqM3EQEJ3nHr830hMzhcqtkYYR693krwlLbk6ITagHSRMa7r8M_" },
];

// ─── PROJEKTE ─────────────────────────────────────────────────────────────────
const TAG_COLORS = { Alle: "#7a84a3", Uni: "#2563eb", Hobby: "#16a34a", Hackathon: "#d97706" };
const TAG_BG = { Uni: "#eff4ff", Hobby: "#f0fdf4", Hackathon: "#fffbeb" };
const TAG_BORDER = { Uni: "#bfcfff", Hobby: "#bbf7d0", Hackathon: "#fde68a" };

const PROJECTS = [
  { title: "PANDA", subtitle: "Production Anomaly Dashboard", desc: "AI-Dashboard zur Erkennung von Produktionsanomalien im industriellen Umfeld – entwickelt im Praktikum bei der Robert Bosch GmbH.", tech: ["Python", "ML", "Dashboard", "Computer Vision"], accent: "#2563eb", tag: "Uni" },
  { title: "YOLO Object Detection", subtitle: "Object Detection", desc: "Objekterkennung auf Bildern mit YOLO-Modellen und Label Studio Dataset.", tech: ["PyTorch", "YOLO", "OpenCV"], accent: "#7c3aed", tag: "Uni" },
  { title: "U-Net Medical Imaging", subtitle: "Medical Imaging", desc: "Segmentierung medizinischer Bilddaten mit Deep Learning.", tech: ["TensorFlow", "U-Net", "Image Segmentation"], accent: "#db2777", tag: "Uni" },
  { title: "ML Trading HMM", subtitle: "Time Series Analysis", desc: "Hidden Markov Model zur Analyse von Marktphasen und Trends.", tech: ["Python", "HMM", "Time Series"], accent: "#d97706", tag: "Uni" },
  { title: "Autonomes RC-Auto", subtitle: "Robotics & Embedded AI", desc: "Umbau eines RC-Autos zu einem autonomen Fahrzeug mit Lidar-Sensor, Kamera und PWM-Motorsteuerung.", tech: ["Python", "Jetson Orin Nano", "Lidar", "PWM", "Computer Vision"], accent: "#16a34a", tag: "Hobby" },
  { title: "Raspberry Pi 5 Wecker", subtitle: "Embedded & AI", desc: "Smarter Wecker mit Screen, Nachrichtenanzeige und KI-gestützter Aktienvorhersage/-empfehlung.", tech: ["Python", "Raspberry Pi 5", "PyQt GUI", "AI"], accent: "#0891b2", tag: "Hobby", github: "Hendrik-Stolzke/Wolf-Python-UI-Wecker" },
  { title: "Autonome Carrera Bahn", subtitle: "Reinforcement Learning", desc: "RL-gesteuerte Carrera-Bahn mit zwei wählbaren KI-Fahrern (PPO & DDPG).", tech: ["Python", "PPO", "DDPG", "Reinforcement Learning"], accent: "#ea580c", tag: "Uni" },
  { title: "KI Dating App", subtitle: "Mobile & Backend", desc: "Flutter-App mit Dell EMC Server-Anbindung für KI-gestütztes Matching und Chatfunktionen.", tech: ["Flutter", "Dart", "Server", "AI Matching"], accent: "#db2777", tag: "Hobby" },
  { title: "Akkubohrer Projekt", subtitle: "Sensor & ML", desc: "Materialerkennung während einer Bohrung anhand von Strom-, Spannungs- und Soundsignalen mit GUI-Visualisierung.", tech: ["Python", "Sensoren", "tkinter", "Signalverarbeitung"], accent: "#b45309", tag: "Uni", github: "Hendrik-Stolzke/Material-Erkennung-ML" },
  { title: "Film/Serien Empfehlung", subtitle: "Recommendation System", desc: "Empfehlungssystem für Filme und Serien mit dem Apriori-Algorithmus und Association Mining.", tech: ["Python", "Apriori", "Association Mining"], accent: "#2563eb", tag: "Uni" },
  { title: "Kartenspiel Ramsch", subtitle: "Client-Server & AI", desc: "Textbasiertes Client-Server-Kartenspiel mit KI-Spieler in Java.", tech: ["Java", "Eclipse", "Client-Server", "KI-Spieler"], accent: "#16a34a", tag: "Uni" },
  { title: "Hackathon Zeitreihe", subtitle: "Predictive Analytics", desc: "Untersuchung und Vorhersage einer Zeitreihe mit dem Random Forest.", tech: ["Python", "Random Forest", "Zeitreihe"], accent: "#d97706", tag: "Uni" },
  { title: "Heart Attack Prediction", subtitle: "Medical AI", desc: "Analyse medizinischer Daten und Vorhersage eines Herzinfarkts mit Gaussian Naive Bayes.", tech: ["Python", "Naive Bayes", "Medical Data"], accent: "#dc2626", tag: "Uni", github: "Hendrik-Stolzke/ML-Heart-Attack" },
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
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle, #c8d0e8 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.4, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "-180px", left: "-180px", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "940px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>

        {/* NAV */}
        <nav style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          padding: "20px 0 0",
          marginBottom: isMobile ? "28px" : "48px",
          gap: isMobile ? "12px" : "0",
        }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(37,99,235,0.28)", flexShrink: 0 }}>
              <span style={{ fontSize: "13px", fontWeight: "800", color: "#fff" }}>HS</span>
            </div>
            <span style={{ fontSize: "14px", fontWeight: "700", color: C.text }}>Hendrik Stolzke</span>
          </motion.div>

          {/* Nav buttons – full width on mobile */}
          <div style={{
            display: "flex",
            gap: "4px",
            ...(isMobile ? { width: "100%" } : {}),
          }}>
            {["Home", "Projekte", "Lebenslauf"].map((item) => (
              <button key={item} onClick={() => setActive(item)} style={{
                background: active === item ? C.accentLight : "transparent",
                border: `1px solid ${active === item ? C.accentBorder : "transparent"}`,
                color: active === item ? C.accent : C.textSoft,
                padding: "7px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.15s",
                flex: isMobile ? 1 : "none",
                textAlign: "center",
              }}>
                {item}
              </button>
            ))}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {active === "Home" && <HomePage key="home" setActive={setActive} isMobile={isMobile} />}
          {active === "Projekte" && <ProjectsPage key="projects" isMobile={isMobile} />}
          {active === "Lebenslauf" && <CVPage key="lebenslauf" isMobile={isMobile} />}
        </AnimatePresence>

        {/* FOOTER */}
        <div style={{
          marginTop: "80px",
          paddingBottom: "32px",
          borderTop: `1px solid ${C.border}`,
          paddingTop: "20px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: "4px",
        }}>
          <span style={{ fontSize: "12px", color: C.textSoft }}>2026 Hendrik Stolzke</span>
          <span style={{ fontSize: "12px", color: C.textSoft }}>Student · M.Sc. Digital Business Engineering</span>
        </div>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setActive, isMobile }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>

      {/* HERO CARD */}
      <div style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: "16px",
        padding: isMobile ? "24px 20px" : "36px 40px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "20px" : "36px",
        alignItems: isMobile ? "center" : "flex-start",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}>
        {/* Avatar */}
        <div style={{
          flexShrink: 0,
          width: isMobile ? "120px" : "200px",
          height: isMobile ? "172px" : "287px",
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${C.border}`,
          background: C.surfaceAlt,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img src="/profile.png" alt="Hendrik Stolzke"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = `linear-gradient(135deg, ${C.accentLight}, #dbeafe)`;
              e.target.parentNode.innerHTML = `<span style="font-size:${isMobile ? "36px" : "56px"};font-weight:800;color:#2563eb">HS</span>`;
            }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, width: isMobile ? "100%" : "auto", textAlign: isMobile ? "center" : "left" }}>
          <h1 style={{ fontSize: isMobile ? "26px" : "clamp(24px, 4.5vw, 36px)", fontWeight: "800", lineHeight: 1.15, marginBottom: "6px", letterSpacing: "-0.025em", color: C.text }}>
            Hendrik Stolzke
          </h1>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#1e64e7", marginBottom: "14px", lineHeight: 1.6 }}>
            <a href="https://www.hhz.de/studium/master/digital-business-engineering" target="_blank" rel="noopener noreferrer"
              style={{ color: "#1e64e7", textDecoration: "none", borderBottom: "1px solid rgba(30,100,231,0.3)" }}>
              M.Sc. Digital Business Engineering
            </a>
            {isMobile ? <br /> : <>&nbsp;·&nbsp;</>}
            <a href="https://www.hs-offenburg.de/studium/bachelor/angewandte-kuenstliche-intelligenz" target="_blank" rel="noopener noreferrer"
              style={{ color: "#1e64e7", textDecoration: "none", borderBottom: "1px solid rgba(30,100,231,0.3)" }}>
              B.Sc. Angewandte KI ✓
            </a>
          </div>

          <p style={{
            fontSize: "13px",
            color: C.textMid,
            lineHeight: 2,
            marginBottom: "20px",
            textAlign: isMobile ? "center" : "left",
          }}>
            Als Student des{" "}
            <span style={{ color: C.primary, fontWeight: 790 }}>Digital Business Engineering</span>{" "}
            und Bachelorand der{" "}
            <span style={{ color: C.primary, fontWeight: 790 }}>Angewandten Künstlichen Intelligenz</span>{" "}
            verbinde ich wissenschaftliches Wissen mit praktischer Erfahrung. Mich begeistert es, reale Herausforderungen mit{" "}
            <span style={{ color: C.primary, fontWeight: 790 }}>intelligenten Lösungen</span>{" "}
            zu lösen und Systeme kontinuierlich weiterzuentwickeln.
          </p>

          <div style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}>
            <button onClick={() => setActive("Projekte")}
              style={{
                flex: isMobile ? "1 1 calc(50% - 4px)" : "none",
                minWidth: isMobile ? "0" : "160px",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${C.accent}, #1d4ed8)`,
                color: "#fff",
                border: "none",
                padding: "11px 20px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,99,235,0.35)"; }}>
              <span>Projekte</span>
              <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
            </button>

            <button onClick={() => setActive("Lebenslauf")}
              style={{
                flex: isMobile ? "1 1 calc(50% - 4px)" : "none",
                minWidth: isMobile ? "0" : "160px",
                justifyContent: "center",
                background: "transparent",
                color: C.textMid,
                border: `1.5px solid ${C.border}`,
                padding: "11px 20px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; e.currentTarget.style.background = C.accentLight; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; e.currentTarget.style.background = "transparent"; }}>
              <span>Lebenslauf</span>
              <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
            </button>

            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
              style={{
                flex: isMobile ? "1 1 100%" : "none",
                minWidth: isMobile ? "0" : "160px",
                justifyContent: "center",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: C.text,
                color: "#fff",
                border: "none",
                padding: "11px 18px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)"; }}>
              <GitHubIcon size={15} /> GitHub
              <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* BILDUNG */}
      <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "10px" }}>Bildung</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "10px",
        marginBottom: "16px",
      }}>
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: isMobile ? "14px 16px" : "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <span style={{ fontSize: isMobile ? "15px" : "18px" }}>{s.icon}</span>
              <span style={{ fontSize: isMobile ? "15px" : "18px", fontWeight: "800", color: s.color }}>{s.value}</span>
            </div>
            <div style={{ fontSize: isMobile ? "11px" : "12px", fontWeight: "700", color: C.text, marginBottom: "3px", lineHeight: 1.4 }}>{s.label}</div>
            <div style={{ fontSize: "10px", color: C.textSoft, lineHeight: 1.45 }}>{s.sub}</div>
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
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
        }}>
          {COMPETENCIES.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.06 }}
              style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: isMobile ? "14px 16px" : "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: isMobile ? "18px" : "20px", marginBottom: "8px" }}>{h.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: C.text, marginBottom: "5px" }}>{h.title}</div>
              <div style={{ fontSize: "11px", color: C.textSoft, lineHeight: 1.65 }}>{h.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* GITHUB STRIP */}
      <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "10px" }}>Github Projekte</div>
      <GitHubStrip isMobile={isMobile} />

      {/* BÜCHER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "12px" }}>Lektüre</div>

        {isMobile ? (
          /* Mobile: nur Liste, keine Bücherrücken */
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            {/* Bücherrücken – horizontal scrollbar auf Mobile */}
            <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", overflowX: "auto", paddingBottom: "8px", marginBottom: "16px" }}>
              {BOOKS.map((b, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} style={{ flexShrink: 0 }}>
                  <a href={b.buyUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
                    <div style={{
                      width: "30px",
                      height: `${88 + (i % 3) * 12}px`,
                      background: b.spine,
                      borderRadius: "3px 2px 2px 3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "2px 2px 6px rgba(0,0,0,0.15), inset -2px 0 4px rgba(0,0,0,0.12)",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", fontSize: "8px", fontWeight: "700", color: "rgba(255,255,255,0.9)", padding: "4px 2px", lineHeight: 1.3, textAlign: "center", maxHeight: "90%", overflow: "hidden" }}>
                        {b.title}
                      </span>
                      <div style={{ position: "absolute", top: 0, left: 0, width: "5px", height: "100%", background: "rgba(255,255,255,0.15)", borderRadius: "3px 0 0 3px" }} />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {BOOKS.map((b, i) => (
                <li key={i} style={{ fontSize: "12px", color: C.textSoft, marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: b.spine, flexShrink: 0, display: "inline-block" }} />
                  <a href={b.buyUrl} target="_blank" rel="noopener noreferrer"
                    style={{ fontWeight: "600", color: C.textMid, textDecoration: "none", flex: 1, minWidth: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = C.accent}
                    onMouseLeave={e => e.currentTarget.style.color = C.textMid}>
                    {b.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* Desktop: original Layout */
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "28px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
              {BOOKS.map((b, i) => (
                <motion.div key={i} whileHover={{ y: -6, transition: { duration: 0.15 } }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <a href={b.buyUrl} target="_blank" rel="noopener noreferrer" title={`${b.title} kaufen`}
                    style={{ display: "block", textDecoration: "none", cursor: "pointer" }}>
                    <div style={{
                      width: "36px", height: `${110 + (i % 3) * 16}px`, background: b.spine,
                      borderRadius: "3px 2px 2px 3px", display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "2px 2px 6px rgba(0,0,0,0.15), inset -2px 0 4px rgba(0,0,0,0.12)",
                      position: "relative", overflow: "hidden", transition: "filter 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.15)"}
                      onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}>
                      <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", fontSize: "9px", fontWeight: "700", color: "rgba(255,255,255,0.9)", padding: "6px 2px", lineHeight: 1.3, textAlign: "center", maxHeight: "90%", overflow: "hidden" }}>
                        {b.title}
                      </span>
                      <div style={{ position: "absolute", top: 0, left: 0, width: "6px", height: "100%", background: "rgba(255,255,255,0.15)", borderRadius: "3px 0 0 3px" }} />
                    </div>
                  </a>
                  <div style={{ marginTop: "8px", width: "36px", textAlign: "center" }}>
                    <div style={{ fontSize: "8px", color: C.textSoft, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60px", transform: "translateX(-12px)" }}>
                      {b.author.split("–")[0].trim()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ width: "100%" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
                {BOOKS.map((b, i) => (
                  <li key={i} style={{ fontSize: "11px", color: C.textSoft, marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: b.spine, flexShrink: 0, display: "inline-block" }} />
                    <a href={b.buyUrl} target="_blank" rel="noopener noreferrer"
                      style={{ fontWeight: "600", color: C.textMid, textDecoration: "none", flexShrink: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = C.accent}
                      onMouseLeave={e => e.currentTarget.style.color = C.textMid}>
                      {b.title}
                    </a>
                    <span style={{ flex: 1, borderBottom: `1px dashed ${C.border}`, margin: "0 6px" }} />
                    <span style={{ flexShrink: 0, color: C.textSoft }}>{b.author}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── GITHUB STRIP ─────────────────────────────────────────────────────────────
function GitHubStrip({ isMobile }) {
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
      style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: isMobile ? "16px" : "20px 24px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <GitHubIcon size={16} />
          <span style={{ fontSize: "13px", fontWeight: "700", color: C.text }}>GitHub · {GITHUB_USER}</span>
        </div>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", color: C.accent, textDecoration: "none", fontWeight: "600", whiteSpace: "nowrap" }}>
          {isMobile ? <ExternalIcon size={14} /> : <>Profil ansehen <ExternalIcon size={12} /></>}
        </a>
      </div>

      {loading ? (
        <div style={{ fontSize: "12px", color: C.textSoft, padding: "8px 0" }}>Lade Repositories…</div>
      ) : repos.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: "10px",
        }}>
          {repos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "12px 14px", background: C.surfaceAlt, borderRadius: "9px", border: `1px solid ${C.border}`, textDecoration: "none", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = C.accentBorder}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px", gap: "4px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: C.accent, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{repo.name}</span>
                <span style={{ fontSize: "11px", color: C.textSoft, display: "flex", alignItems: "center", gap: "3px", flexShrink: 0 }}>⭐ {repo.stargazers_count}</span>
              </div>
              {repo.description && (
                <div style={{ fontSize: "11px", color: C.textSoft, lineHeight: 1.5, marginBottom: "8px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {repo.description}
                </div>
              )}
              {repo.language && (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: langColors[repo.language] || langColors.default, display: "inline-block", flexShrink: 0 }} />
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
function ProjectsPage({ isMobile }) {
  const [filter, setFilter] = useState("Alle");
  const [selected, setSelected] = useState(null);
  const [projectFiles, setProjectFiles] = useState({});

  const tags = ["Alle", "Uni", "Hobby"];
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
    <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
      <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "4px" }}>Portfolio</div>

      {/* PPTX SHOWCASE */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden", marginBottom: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
        <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "8px", background: C.surfaceAlt, flexWrap: "wrap" }}>
          <span>💻</span>
          <span style={{ fontSize: "13px", fontWeight: "700", color: C.text, flex: 1 }}>Präsentation aller Projekte</span>
          <a href="/projects.pptx" download
            style={{ fontSize: "11px", color: C.accent, textDecoration: "none", padding: "3px 10px", borderRadius: "5px", border: `1px solid ${C.accentBorder}`, fontWeight: "600", whiteSpace: "nowrap" }}>
            ↓ Download
          </a>
        </div>
        <iframe
          src="https://view.officeapps.live.com/op/embed.aspx?src=https://hendrik-stolzke.vercel.app/projects.pptx"
          style={{ width: "100%", height: isMobile ? "260px" : "500px", border: "none", display: "block" }}
          title="Präsentation aller Projekte"
        />
      </div>

      {/* FILTER + TITEL */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "flex-end",
        gap: "12px",
        marginBottom: "22px",
      }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: C.text, margin: 0 }}>Projekte ({visible.length})</h2>
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

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "12px",
      }}>
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
    if (f.name.endsWith(".pptx") || f.type.includes("presentation")) return (
      <PptxPreview file={f} />
    );
    if (f.type === "application/pdf") return (
      <div style={{ padding: "10px", background: C.surfaceAlt, borderRadius: "6px", fontSize: "12px", color: C.textMid, display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "20px" }}>📄</span>
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
      style={{ background: C.surface, border: `1px solid ${expanded ? C.accentBorder : C.border}`, borderRadius: "12px", overflow: "hidden", boxShadow: expanded ? "0 4px 16px rgba(37,99,235,0.08)" : "0 1px 3px rgba(0,0,0,0.04)", transition: "box-shadow 0.15s, border-color 0.15s" }}>

      <div style={{ height: "3px", background: p.accent }} />

      <div style={{ padding: "18px 20px" }}>
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
          {p.github && (
            <a href={`https://github.com/${p.github}`} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "5px", background: C.surfaceAlt, color: C.textSoft, border: `1px solid ${C.border}`, fontWeight: "500", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSoft; }}>
              <GitHubIcon size={11} /> GitHub
            </a>
          )}
        </div>

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

function PptxPreview({ file }) {
  const containerRef = useRef();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof PPTX === "undefined") {
      setError(true);
      return;
    }
    try {
      const pptx = new PPTX();
      pptx.fileUrl = file.url;
      pptx.renderFile(containerRef.current);
    } catch {
      setError(true);
    }
  }, [file.url]);

  return (
    <div style={{ borderRadius: "8px", overflow: "hidden", border: `1px solid ${C.border}` }}>
      <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px", background: C.surfaceAlt, borderBottom: `1px solid ${C.border}` }}>
        <span>📊</span>
        <span style={{ fontSize: "12px", fontWeight: "600", color: C.textMid, flex: 1 }}>{file.name}</span>
        <a href={file.url} download={file.name}
          style={{ fontSize: "11px", color: C.accent, textDecoration: "none", padding: "3px 8px", borderRadius: "5px", border: `1px solid ${C.accentBorder}` }}>
          ↓ Download
        </a>
      </div>
      {error ? (
        <div style={{ padding: "16px", fontSize: "12px", color: C.textSoft, textAlign: "center" }}>
          Vorschau nicht verfügbar · <a href={file.url} download={file.name} style={{ color: C.accent, textDecoration: "none" }}>Herunterladen</a>
        </div>
      ) : (
        <div ref={containerRef} style={{ width: "100%", minHeight: "320px", background: C.surface }} />
      )}
    </div>
  );
}

// ─── CV ───────────────────────────────────────────────────────────────────────
function CVPage({ isMobile }) {
  const [lang, setLang] = useState("de");
  const cvFile = lang === "de" ? "/cv.pdf" : "/cv-en.pdf";
  const title = lang === "de" ? "Lebenslauf" : "Resume";

  return (
    <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "flex-end",
        marginBottom: "18px",
        gap: "12px",
      }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textSoft, marginBottom: "4px" }}>Dokument</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: C.text, margin: 0 }}>{title}</h2>
            <div style={{ display: "flex", background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "3px", gap: "2px" }}>
              {["de", "en"].map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "4px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "700", transition: "all 0.15s",
                  background: lang === l ? C.surface : "transparent",
                  color: lang === l ? C.accent : C.textSoft,
                  boxShadow: lang === l ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}>
                  {l === "de" ? "DE" : "EN"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <a href={cvFile} download
          style={{
            background: C.accent,
            color: "#fff",
            textDecoration: "none",
            padding: "9px 20px",
            borderRadius: "9px",
            fontSize: "12px",
            fontWeight: "700",
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            boxShadow: "0 2px 8px rgba(37,99,235,0.22)",
            transition: "opacity 0.15s",
            alignSelf: isMobile ? "flex-start" : "auto",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
          <DownloadIcon size={13} /> PDF herunterladen
        </a>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
        <iframe
          src={`${cvFile}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          title={title}
          style={{ width: "100%", height: isMobile ? "520px" : "820px", border: "none", display: "block" }}
        />
      </div>

      {isMobile && (
        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <a href={cvFile} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "12px", color: C.accent, textDecoration: "none", fontWeight: "600" }}>
            Im Browser öffnen ↗
          </a>
        </div>
      )}
    </motion.div>
  );
}
