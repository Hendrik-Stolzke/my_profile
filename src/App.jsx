import { motion } from "framer-motion";
import { useState } from "react";

export default function Portfolio() {
  const [active, setActive] = useState("home");

  const projects = [
    {
      title: "PANDA – Production Anomaly Detection",
      desc: "AI Dashboard zur Erkennung von Produktionsanomalien im industriellen Umfeld.",
      tech: "Python, ML, Dashboard, Computer Vision",
    },
    {
      title: "YOLO Object Detection",
      desc: "Objekterkennung auf Bildern mit YOLO Modellen und Label Studio Dataset.",
      tech: "PyTorch, YOLO, OpenCV",
    },
    {
      title: "U-Net Medical Imaging",
      desc: "Segmentierung medizinischer Bilddaten mit Deep Learning.",
      tech: "TensorFlow, U-Net, Image Segmentation",
    },
    {
      title: "ML Trading HMM",
      desc: "Hidden Markov Model zur Analyse von Marktphasen und Trends.",
      tech: "Python, HMM, Time Series",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      {/* NAV */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-xl font-bold">Hendrik Stolzke</h1>
        <div className="space-x-4 text-sm text-zinc-400">
          <button onClick={() => setActive("home")}>Home</button>
          <button onClick={() => setActive("projects")}>Projects</button>
          <button onClick={() => setActive("cv")}>CV</button>
        </div>
      </div>

      {/* HERO */}
      {active === "home" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl font-bold mb-4">
            AI & Machine Learning Student
          </h2>
          <p className="text-zinc-400 mb-6">
            Fokus auf Computer Vision, Deep Learning und industrielle KI-Systeme.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setActive("projects")}
              className="bg-white text-black px-4 py-2 rounded"
            >
              View Projects
            </button>
            <button
              onClick={() => setActive("cv")}
              className="border border-white px-4 py-2 rounded"
            >
              Download CV
            </button>
          </div>
        </motion.div>
      )}

      {/* PROJECTS */}
      {active === "projects" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <div
                key={i}
                className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
              >
                <h3 className="font-bold mb-2">{p.title}</h3>
                <p className="text-zinc-400 text-sm mb-2">{p.desc}</p>
                <p className="text-xs text-zinc-500">{p.tech}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CV */}
      {active === "cv" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mb-4">Curriculum Vitae</h2>
          <p className="text-zinc-400 mb-6">
            Download my CV for detailed academic and project experience.
          </p>

          <a
            href="/cv.pdf"
            download
            className="bg-white text-black px-4 py-2 rounded inline-block"
          >
            Download CV
          </a>

          <div className="mt-6 text-sm text-zinc-500">
            Tip: lege deine cv.pdf in den public Ordner deines React Projekts.
          </div>
        </motion.div>
      )}

      {/* FOOTER */}
      <div className="mt-16 text-xs text-zinc-600">
        © 2026 Hendrik Stolzke – AI Portfolio
      </div>
    </div>
  );
}
