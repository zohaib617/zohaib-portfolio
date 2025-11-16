"use client"

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Single-file Next.js page (page.tsx) using Tailwind CSS + Framer Motion
// Dark, professional portfolio for Mohammad Zohaib Shah using resume data.

const titles = [
"Software Developer",
  "Web Developer", 
  "AI Agent",
  "Automation Expert",
];

const sections = [
  {
    id: "hero",
    title: "Hello — I'm Mohammad Zohaib Shah",
    content: (
      <>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="/zs.jpg"
            alt="Mohammad Zohaib"
            className="w-40 h-40 rounded-full border border-neutral-700 shadow-lg object-cover"
          />
          <p className="max-w-2xl leading-relaxed">{`
          I am specialized in Software Developer for business solutions,
             custom software, AI agents, chatbots, automation systems, and Web Developer  in Next.js, React, Tailwind CSS, and Oracle technologies.
           I craft responsive, performant, and accessible web experiences. You can see our work here: www.qitechs.com.`}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">

          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">Python</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">Ai Agents</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">Chat bot</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">N8N</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">Next.js</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">React</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">SQL / PL/SQL</span>
          <span className="px-3 py-1 rounded-full bg-neutral-800/50 backdrop-blur text-sm">Oracle EBS / BIP</span>

        </div>
      </>
    ),
  },
  {
    id: "about",
    title: "About",
    content: (
      <>
        <p className="leading-relaxed max-w-2xl">{`Motivated and detail-oriented Software developer and web developer with experience building responsive interfaces and automated reporting solutions using Oracle BI Publisher and SQL. Strong background in front-end technologies and continuous learning in AI & web3.`}</p>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          <li>B. Com — University of Karachi (2015)</li>
          <li>Oracle Trainings (SQL, PL/SQL, Forms, Reports)</li>
          <li>Certified in AI / Metaverse / Web3 — Governor Sindh IT Initiative (2023)</li>
        </ul>
      </>
    ),
  },
  {
    id: "projects",
    title: "Projects",
    content: (
      <>
        <div className="space-y-4 max-w-2xl">
          <ProjectCard
            title="Gym Management System"
            desc="Member registration, fee tracking & attendance — responsive UI."
          />
          <ProjectCard
            title="Billing System"
            desc="Automated billing & receipt generation for small businesses." 
          />
          <ProjectCard
            title="Instalment Payment App"
            desc="Manages instalments, due dates, and payment alerts." 
          />
        </div>
      </>
    ),
  },
  {
    id: "experience",
    title: "Experience",
    content: (
      <>
<h4 className="font-medium">Freelancer — Software & Automation Expert</h4>
<ul className="mt-3 list-disc list-inside space-y-2">
<li>Developed custom Billing System software including monthly finance reporting dashboards.</li>
<li>Created Gym Management Software for member registration, attendance, and payment tracking.</li>
<li>Built customized business automation tools for small and medium businesses.</li>
</ul>


<h4 className="font-medium mt-6">Trainee Oracle Developer — Qitech Pvt Ltd (May 2025 - Present)</h4>
<ul className="mt-3 list-disc list-inside space-y-2">
<li>Created XML templates and integrated with Oracle BI Publisher for automated reporting.</li>
<li>Generated customized Excel & Word reports, improving business reporting accuracy.</li>
<li>Worked on data ETL and visualization for operational analysis.</li>
</ul>
</>
),
},
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p className="max-w-2xl">{`Phone: +92 319 8251617 • Email: zohaib92shah@gmail.com • Karachi, Pakistan`}</p>
        <div className="mt-6 flex gap-3">
          <a className="px-4 py-2 rounded-md bg-indigo-600/90 hover:bg-indigo-600/70" href="mailto:zohaib92shah@gmail.com">Email Me</a>
          <a
          className="px-4 py-2 rounded-md border border-neutral-700"
          href="/zohaib_shah.pdf"
          download
        >
          Download Resume
        </a>

        </div>
      </>
    ),
  },
];

function ProjectCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 bg-neutral-900/40 border border-neutral-800 rounded-2xl">
      <h5 className="font-semibold">{title}</h5>
      <p className="text-sm mt-1 leading-snug text-neutral-300">{desc}</p>
    </div>
  );
}

export default function Page() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back
  const [titleIndex, setTitleIndex] = useState(0);
  const titleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // cycle titles every 2.2s
    titleTimerRef.current = window.setInterval(() => {
      setTitleIndex((t) => (t + 1) % titles.length);
    }, 2200);
    return () => {
      if (titleTimerRef.current) window.clearInterval(titleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // keyboard navigation
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  function next() {
    setDirection(1);
    setIndex((i) => (i + 1) % sections.length);
  }
  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + sections.length) % sections.length);
  }

  const flipVariants = {
    enter: (dir: number) => ({
      rotateY: dir === 1 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
    center: { rotateY: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ rotateY: dir === 1 ? 90 : -90, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-neutral-100 overflow-hidden">
      {/* background subtle animated grid / noise */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02),_transparent_30%)]" />
      </div>

      <main className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl h-[78vh] perspective-1500">
          {/* Book container */}
          <div className="relative w-full h-full bg-transparent select-none">
            {/* Title strip (name + animated role) */}
            <div className="absolute left-6 top-6 flex items-center gap-4">
              <motion.h1
                key={index} // re-render when section changes so name animation can re-run
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="text-2xl font-bold tracking-tight"
              >
                Mohammad Zohaib
              </motion.h1>

              <div className="overflow-hidden h-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm text-neutral-300"
                  >
                    {titles[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Flip area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-4xl h-[72vh] relative px-8 py-10">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-neutral-900/60 to-neutral-950/60 border border-neutral-800 shadow-2xl" />

                <div className="relative w-full h-full p-8">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={sections[index].id}
                      custom={direction}
                      variants={flipVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="w-full h-full bg-transparent relative rounded-2xl overflow-auto p-6"
                      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    >
                      {/* content */}
                      <div className="flex h-full flex-col">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{sections[index].title}</h2>
                        <div className="mt-2 text-neutral-300 flex-1">{sections[index].content}</div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="text-sm text-neutral-400">{`Page ${index + 1} / ${sections.length}`}</div>
                          <div className="text-xs text-neutral-500">Built with Next.js • Tailwind • Framer Motion</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Prev Arrow */}
            <button
              aria-label="Previous"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 focus:outline-none"
            >
              <Arrow direction="left" />
            </button>

            {/* Next Arrow */}
            <button
              aria-label="Next"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 focus:outline-none"
            >
              <Arrow direction="right" />
            </button>

            {/* Bottom small page-turn hint */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6">
              <div className="text-xs text-neutral-500">Use arrows or ← → to flip</div>
              <div className="flex gap-2 items-center">
                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full ${i === index ? "bg-indigo-500" : "bg-neutral-700/40"}`}
                    aria-label={`Go to ${s.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* small footer */}
      <footer className="absolute bottom-3 left-6 text-xs text-neutral-600">© Mohammad Zohaib Shah — {new Date().getFullYear()}</footer>
    </div>
  );
}

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <div className="w-14 h-14 rounded-full bg-neutral-900/40 border border-neutral-800 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {direction === "right" ? (
          <path d="M8 5l8 7-8 7" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M16 19l-8-7 8-7" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        )}
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
