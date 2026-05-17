import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NAV_ITEMS = ["Home", "Projects", "CV"];

const PROJECTS = [
  {
    title: "PANDA",
    subtitle: "Production Anomaly Detection",
    desc: "AI-Dashboard zur Erkennung von Produktionsanomalien im industriellen Umfeld.",
    tech: ["Python", "ML", "Dashboard", "Computer Vision"],
    accent: "#4ade80",
  },
  {
    title: "YOLO",
    subtitle: "Object Detection",
    desc: "Objekterkennung auf Bildern mit YOLO-Modellen und Label Studio Dataset.",
    tech: ["PyTorch", "YOLO", "OpenCV"],
    accent: "#60a5fa",
  },
  {
    title: "U-Net",
    subtitle: "Medical Imaging",
    desc: "Segmentierung medizinischer Bilddaten mit Deep Learning.",
    tech: ["TensorFlow", "U-Net", "Image Segmentation"],
    accent: "#f472b6",
  },
  {
    title: "HMM",
    subtitle: "ML Trading",
    desc: "Hidden Markov Model zur Analyse von Marktphasen und Trends.",
    tech: ["Python", "HMM", "Time Series"],
    accent: "#fb923c",
  },
];

const CV_SECTIONS = [
  {
    label: "Bildung",
    entries: [
      {
        title: "B.Sc. Artificial Intelligence",
        org: "Hochschule Reutlingen",
        period: "2023 – heute",
        detail: "Schwerpunkt: Computer Vision & Deep Learning",
      },
      {
        title: "Abitur",
        org: "Gymnasium Muster",
        period: "2023",
        detail: "Allgemeine Hochschulreife",
      },
    ],
  },
  {
    label: "Erfahrung",
    entries: [
      {
        title: "AI Research Intern",
        org: "Industrieunternehmen XY",
        period: "2024",
        detail: "Entwicklung von Anomalieerkennungssystemen mit Python & ML",
      },
      {
        title: "Freelance Developer",
        org: "Eigenständig",
        period: "2023 – heute",
        detail: "Machine Learning Projekte für verschiedene Kunden",
      },
    ],
  },
  {
    label: "Skills",
    entries: [
      {
        title: "Programmierung",
        org: "",
        period: "",
        detail: "Python · PyTorch · TensorFlow · OpenCV · SQL",
      },
      {
        title: "Tools & Frameworks",
        org: "",
        period: "",
        detail: "Docker · Git · Label Studio · Jupyter · FastAPI",
      },
    ],
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("Home");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0c0f",
        color: "#e8e6e1",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* SUBTLE GRID BACKGROUND */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ACCENT GLOW */}
      <div
        style={{
          position: "fixed",
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* NAV */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 0 0",
            marginBottom: "60px",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#4ade80",
            }}
          >
            HS
          </motion.span>

          <div style={{ display: "flex", gap: "8px" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                style={{
                  background: active === item ? "rgba(74,222,128,0.12)" : "transparent",
                  border: active === item ? "1px solid rgba(74,222,128,0.3)" : "1px solid transparent",
                  color: active === item ? "#4ade80" : "#71717a",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s ease",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* PAGES */}
        <AnimatePresence mode="wait">
          {active === "Home" && <HomePage key="home" setActive={setActive} />}
          {active === "Projects" && <ProjectsPage key="projects" />}
          {active === "CV" && <CVPage key="cv" />}
        </AnimatePresence>

        {/* FOOTER */}
        <div
          style={{
            marginTop: "80px",
            paddingBottom: "32px",
            borderTop: "1px solid #1f1f23",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", color: "#3f3f46" }}>
            © 2026 Hendrik Stolzke
          </span>
          <span style={{ fontSize: "12px", color: "#3f3f46" }}>
            AI & Machine Learning
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── HOME ─── */
function HomePage({ setActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
    >
      {/* HERO ROW */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          marginBottom: "64px",
          flexWrap: "wrap",
        }}
      >
        {/* AVATAR */}
        <div
          style={{
            flexShrink: 0,
            width: "180px",
            height: "180px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #27272a",
            background: "#18181b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/profile.png"
            alt="Hendrik Stolzke"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background =
                "linear-gradient(135deg, #18181b, #27272a)";
              e.target.parentNode.innerHTML =
                '<span style="font-size:48px;font-weight:700;color:#4ade80">HS</span>';
            }}
          />
        </div>

        {/* INTRO */}
        <div style={{ flex: 1, minWidth: "240px" }}>
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(26px, 5vw, 42px)",
              fontWeight: "800",
              lineHeight: 1.15,
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            Hendrik Stolzke
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "14px",
              color: "#71717a",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            AI & Machine Learning Student mit Fokus auf{" "}
            <span style={{ color: "#a1a1aa" }}>Computer Vision</span>,{" "}
            <span style={{ color: "#a1a1aa" }}>Deep Learning</span> und{" "}
            <span style={{ color: "#a1a1aa" }}>industrielle KI-Systeme</span>.
          </motion.p>
        </div>
      </div>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "64px" }}
      >
        <button
          onClick={() => setActive("Projects")}
          style={{
            background: "#4ade80",
            color: "#0b0c0f",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "0.04em",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Projekte ansehen →
        </button>
        <button
          onClick={() => setActive("CV")}
          style={{
            background: "transparent",
            color: "#a1a1aa",
            border: "1px solid #27272a",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#4ade80";
            e.target.style.color = "#4ade80";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#27272a";
            e.target.style.color = "#a1a1aa";
          }}
        >
          Lebenslauf
        </button>
      </motion.div>

      {/* QUICK STATS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
        }}
      >
        {[
          { value: "4+", label: "KI-Projekte" },
          { value: "B.Sc.", label: "AI Student" },
          { value: "2026", label: "Verfügbar" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "#111114",
              border: "1px solid #1f1f23",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#4ade80",
                marginBottom: "4px",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "12px", color: "#52525b" }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── PROJECTS ─── */
function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
    >
      <h2
        style={{
          fontSize: "13px",
          fontWeight: "700",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#4ade80",
          marginBottom: "32px",
        }}
      >
        Projekte
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "16px",
        }}
      >
        {PROJECTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: "#0f1011",
              border: "1px solid #1f1f23",
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              transition: "border-color 0.2s, transform 0.2s",
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{ y: -3 }}
          >
            {/* accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: p.accent,
                opacity: 0.7,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: p.accent,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </span>
                <div style={{ fontSize: "12px", color: "#52525b", marginTop: "2px" }}>
                  {p.subtitle}
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "#71717a",
                lineHeight: 1.65,
                marginBottom: "16px",
              }}
            >
              {p.desc}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: "#18181b",
                    color: "#71717a",
                    border: "1px solid #27272a",
                    fontWeight: "500",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── CV ─── */
function CVPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#4ade80",
            margin: 0,
          }}
        >
          Lebenslauf
        </h2>
        <a
          href="/cv.pdf"
          download
          style={{
            background: "#4ade80",
            color: "#0b0c0f",
            textDecoration: "none",
            padding: "8px 18px",
            borderRadius: "7px",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.04em",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          ↓ PDF herunterladen
        </a>
      </div>

      {/* PDF VIEWER */}
      <div
        style={{
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #1f1f23",
          background: "#0f1011",
        }}
      >
        <iframe
          src="/cv.pdf"
          title="Lebenslauf"
          style={{
            width: "100%",
            height: "780px",
            border: "none",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "12px",
          padding: "12px 16px",
          background: "#0f1011",
          border: "1px solid #1a1a1e",
          borderRadius: "8px",
          fontSize: "12px",
          color: "#52525b",
        }}
      >
        💡 Lege deine <code style={{ color: "#71717a" }}>cv.pdf</code> in den{" "}
        <code style={{ color: "#71717a" }}>public/</code>-Ordner deines React-Projekts,
        damit der Lebenslauf hier angezeigt wird.
      </div>
    </motion.div>
  );
}