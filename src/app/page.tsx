"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MOON_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg";

export default function Page() {
  const { scrollYProgress } = useScroll();

  // Moon + BG (same idea)
  // Reverting Y movement for original desktop feel
  const moonY = useTransform(scrollYProgress, [0, 0.8], [0, 900]); 
  const moonRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const moonScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.98]);

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // 🔥 Har block ka apna illumination
  const personalProjectsOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const personalProjectsFilter = useTransform(scrollYProgress, [0.08, 0.22], [
    "blur(10px) brightness(0.25) saturate(0.6)",
    "blur(0px) brightness(1) saturate(1)",
  ]);

// ⬇️ sirf yeh 2 lines replace karo
const experienceCertOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
const experienceCertFilter = useTransform(scrollYProgress, [0.18, 0.30], [
  "blur(12px) brightness(0.22) saturate(0.55)",
  "blur(0px) brightness(1) saturate(1)",
]);

  const skillsContactOpacity = useTransform(scrollYProgress, [0.36, 0.52], [0, 1]);
  const skillsContactFilter = useTransform(scrollYProgress, [0.36, 0.52], [
    "blur(10px) brightness(0.25) saturate(0.6)",
    "blur(0px) brightness(1) saturate(1)",
  ]);

  const educationAchOpacity = useTransform(scrollYProgress, [0.52, 0.70], [0, 1]);
  const educationAchFilter = useTransform(scrollYProgress, [0.52, 0.70], [
    "blur(10px) brightness(0.25) saturate(0.6)",
    "blur(0px) brightness(1) saturate(1)",
  ]);

  // Moon light mask (same logic)
  const [maskStyle, setMaskStyle] = useState<Record<string, string>>({});
  const viewport = useRef({ w: 0, h: 0 });

  useEffect(() => {
    viewport.current.w = window.innerWidth;
    viewport.current.h = window.innerHeight;

    const unsub = moonY.onChange((val) => updateMask(val));
    updateMask(0);

    const onResize = () => {
      viewport.current.w = window.innerWidth;
      viewport.current.h = window.innerHeight;
      updateMask(moonY.get());
    };
    window.addEventListener("resize", onResize);

    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateMask(moonTranslateYPx: number) {
    const vw = viewport.current.w || window.innerWidth;
    const vh = viewport.current.h || window.innerHeight;
    const moonCenterX = Math.round(vw / 2);
    const topOffset = Math.round(Math.max(90, vh * 0.1));
    const moonCenterY = Math.round(topOffset + moonTranslateYPx);

    // Reverting radii for original desktop mask effect
    const innerRadius = Math.round(Math.max(380, vw * 0.32));
    const falloffRadius = Math.round(Math.max(1100, vw * 0.95));
    const newDimAlpha = 0.65;

    const gradient = `radial-gradient(circle at ${moonCenterX}px ${moonCenterY}px,
      rgba(255,255,255,1) 0px,
      rgba(255,255,255,0.97) ${innerRadius}px,
      rgba(255,255,255,0.9) ${Math.round(innerRadius + (falloffRadius - innerRadius) * 0.35)}px,
      rgba(255,255,255,${newDimAlpha}) ${falloffRadius}px,
      rgba(255,255,255,${newDimAlpha}) ${Math.round(falloffRadius + 80)}px)`;

    setMaskStyle({
      WebkitMaskImage: gradient,
      maskImage: gradient,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "0 0",
      maskPosition: "0 0",
      WebkitMaskMode: "alpha",
      maskMode: "alpha",
    });
  }

  const resume = {  
    name: " Mohammad Zohaib Shah",
    phone: "+92 319 8251617",
    email: "zohaib92shah@gmail.com",
    location: "Karachi, Pakistan",
    objective:
      "Motivated and innovative AI Agent & Software Developer with expertise in automating business tasks and building intelligent solutions. Skilled Full-Stack Developer with a strong command over modern technologies, seeking opportunities to leverage technical proficiency and creativity to develop efficient, scalable, and impactful software solutions.",
    personal: {
      father: "Mohammad Aslam Shah",
      cnic: "41406-7622809-3",
      address: "Liaquatabad, Karachi, Pakistan",
      dob: "25 April 1994",
    },
    skills: [
      "Ai agent N8N Automation",
      "Python",
      "Custom software solutions",
      "HTML, CSS, JavaScript, TypeScript",
      "React.js, Next.js",
      "Tailwind CSS",
      "Oracle EBS XML Reports",
      "Oracle Fusion BIP Reports",
      "SQL / PL/SQL",
      "Communication & Time Management",
    ],
    education: [
      "Bachelor of Commerce (B. Com) — University of Karachi (2015)",
      "Intermediate (Commerce) — BIE Karachi (2013)",
      "Matriculation (Science) — BSE Karachi (2011)",
    ],
    certifications: [
      "Certified AI, Metaverse & Web 3.0 Developer — Governor Sindh IT Initiative (2023–Present)",
      "Oracle Database 11g: SQL Fundamentals I — Orasoft (2016)",
      "Oracle Database 11g: PL/SQL — Orasoft (2016)",
      "Oracle 11g Forms (Fusion Middleware) — Orasoft (2016)",
      "Oracle Reports Developer 11g — Orasoft (2016)",
      "Advanced Diploma in IT — Noor College (2013)",
    ],
    // 👇️ EXPERIENCE DATA UPDATED HERE
    experience: [
      {
        title: "Freelance Software Developer",
        period: "Jan 2025 – Present",
        bullets: [
          "Developed a Gym Management System to automate memberships, attendance, and scheduling.",
          "Built a Billing System to manage invoices, payments, and receipts efficiently.",
          "Created an Installment App to track and manage client installment plans.",
        ],
      },
      {
        title: "Trainee Oracle Developer — Qitech Pvt Ltd.",
        period: "May 2025 – Present",
        bullets: [
          "Created XML Data Templates and integrated with Oracle BI Publisher for automated reporting.",
          "Generated customized Excel and Word reports; improved reporting accuracy.",
          "Worked on data extraction, transformation, and visualization for business analysis.",
        ],
      },
    ],
    // 👆️ END OF EXPERIENCE DATA UPDATE
    projects: [
      "Gym Management System — member registration, fee tracking, attendance.",
      "Billing System — automated billing & receipt generation.",
      "Instalment Payment App — instalment tracking & payment alerts.",
    ],
    achievements: [
      "Completed Next.js Hackathon Project (3rd Hackathon)",
      "Continuous learner in AI and Web Development",
    ],
    languages: ["English (Intermediate)", "Urdu (Fluent)", "Sindhi (Fluent)"],
    pdfPath: "/mnt/data/zohaib_shah (1).pdf",
  };

  /* ---- Typing effects (same as before) ---- */
    const [typedName, setTypedName] = useState("");
    useEffect(() => {
      const full = resume.name;
      let i = 0;
      const id = setInterval(() => {
        setTypedName((s) => s + full.charAt(i));
        i++;
        if (i >= full.length) clearInterval(id);
      }, 70);
      return () => clearInterval(id);
    }, []);

  const roles = [
    "AI Agent",
    "Automation Tasks",
    "n8n Expert",
    "Custom Software Solutions — Full-Stack Developer",
  ];
  const [roleText, setRoleText] = useState("");
  const roleIndexRef = useRef(0);
  const deletingRef = useRef(false);
  useEffect(() => {
    let mounted = true;
    let charIndex = 0;
    const loop = () => {
      if (!mounted) return;
      const currentRole = roles[roleIndexRef.current];
      if (!deletingRef.current) {
        if (charIndex <= currentRole.length) {
          setRoleText(currentRole.slice(0, charIndex));
          charIndex++;
          setTimeout(loop, 80);
        } else {
          setTimeout(() => {
            deletingRef.current = true;
            charIndex = currentRole.length;
            loop();
          }, 1200);
        }
      } else {
        if (charIndex >= 0) {
          setRoleText(currentRole.slice(0, charIndex));
          charIndex--;
          setTimeout(loop, 40);
        } else {
          deletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
          setTimeout(loop, 200);
        }
      }
    };
    loop();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-[400vh] relative bg-transparent text-slate-200 overflow-x-hidden">
      {/* BG */}
      <div className="fixed inset-0 -z-50 overflow-hidden bg-[#00020A]">
        <motion.div style={{ scale: bgScale, y: bgY }} className="relative w-full h-full">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/85" />
        </motion.div>
      </div>

      {/* Moon */}
      <motion.div
        style={{ translateY: moonY, rotate: moonRotate, scale: moonScale }}
        className="fixed left-1/2 -translate-x-1/2 z-30 pointer-events-none top-[10vh] md:top-[8vh]"
      >
        <div
          className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full" // Mobile size adjusted, Desktop restored to 420px
          style={{
            backgroundImage: `url(${MOON_IMG})`,
            backgroundSize: "125%",
            backgroundPosition: "center",
            mixBlendMode: "screen",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
            border: "none",
            clipPath: "circle(50% at 50% 50%)",
          }}
        />
      </motion.div>

      {/* HERO – clear */}
      <div
        className="relative z-40 max-w-6xl mx-auto px-4 md:px-6 pt-28 pb-24" // Mobile px-4, Desktop px-6
        style={{
          ...maskStyle,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <section className="min-h-[68vh] flex flex-col items-center justify-center text-center">
          <h1
            className="text-4xl md:text-7xl font-extrabold tracking-tight" // Mobile 4xl, Desktop 7xl
            style={{ color: "#ffffff", textShadow: "0 0 20px rgba(100,180,230,0.8)" }}
          >
            {typedName}
            <span className="inline-block w-1.5 h-6 md:h-7 align-middle ml-1 bg-sky-200 animate-[blink_1s_steps(2,_start)_infinite]" />
          </h1>

          <p className="mt-3 md:mt-4 text-xl md:text-2xl text-sky-100 font-light h-[2rem] md:h-[2.2rem]">
            <span className="inline-block px-2 py-1 rounded-md bg-black/25 backdrop-blur-sm border border-sky-500/25">
              {roleText}
              <span className="inline-block w-1 h-5 md:h-6 bg-sky-200 ml-1 animate-[blink_1s_steps(2,_start)_infinite]" />
            </span>
          </p>

          <p className="mt-6 md:mt-8 max-w-xl text-slate-200 leading-relaxed text-base md:text-lg px-4 md:px-0"> 
            {resume.objective}
          </p>
        </section>
      </div>

      {/* BLOCK 1: Personal + Projects */}
      <motion.section
        className="relative z-40 max-w-6xl mx-auto px-4 md:px-6 mt-6" // Mobile px-4, Desktop px-6
        style={{
          ...maskStyle,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          opacity: personalProjectsOpacity,
          filter: personalProjectsFilter,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"> {/* Mobile 1 col, Desktop 12 col with gap-10 */}
          <div className="md:col-span-5">
            <InfoCard title="Personal" seed={1}>
              <p className="text-slate-200 space-y-1 text-sm md:text-base"> {/* Text size responsive */}
                <strong>Father:</strong> {resume.personal.father}
                <br />
                <strong>CNIC:</strong> {resume.personal.cnic}
                <br />
                <strong>DOB:</strong> {resume.personal.dob}
                <br />
                <strong>Address:</strong> {resume.personal.address}
              </p>
            </InfoCard>
          </div>
          <div className="hidden md:flex md:col-span-2 justify-center">
            <CenterLine /> {/* Vertical line for desktop */}
          </div>
          <div className="block md:hidden">
            <CenterLineHorizontal /> {/* Horizontal line for mobile */}
          </div>
          <div className="md:col-span-5">
            <InfoCard title="Projects" seed={2}>
              <ul className="text-slate-200 list-disc ml-5 space-y-2 text-sm md:text-base">
                {resume.projects.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 2: Experience + Certifications */}
      <motion.section
        className="relative z-40 max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16" // Mobile mt-12, Desktop mt-16
        style={{
          ...maskStyle,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          opacity: experienceCertOpacity,
          filter: experienceCertFilter,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          {/* 👇️ EXPERIENCE CARD UPDATED HERE */}
          <div className="md:col-span-5">
            <InfoCard title="Experience" seed={3}>
              <div className="space-y-6"> {/* Multiple entries ke beech space */}
                {resume.experience.map((exp, expIndex) => (
                  <div 
                    key={expIndex} 
                    className={`text-slate-200 text-sm md:text-base ${expIndex > 0 ? 'pt-6 border-t border-sky-500/10' : ''}`} // Pehli entry ke baad divider line
                  >
                    <div className="font-medium text-lg text-white">
                      {exp.title}
                    </div>
                    <div className="text-xs md:text-sm text-slate-300">
                      {exp.period}
                    </div>
                    <ul className="list-disc ml-5 mt-3 space-y-2">
                      {exp.bullets.map((b, bulletIndex) => (
                        <li key={bulletIndex}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>
          {/* 👆️ END OF EXPERIENCE CARD UPDATE */}
          
          <div className="hidden md:flex md:col-span-2 justify-center">
            <CenterLine />
          </div>
          <div className="block md:hidden">
            <CenterLineHorizontal />
          </div>
          <div className="md:col-span-5">
            <InfoCard title="Certifications" seed={4}>
              <ul className="text-slate-200 list-disc ml-5 space-y-2 text-sm md:text-base">
                {resume.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 3: Skills + Contact */}
      <motion.section
        className="relative z-40 max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16"
        style={{
          ...maskStyle,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          opacity: skillsContactOpacity,
          filter: skillsContactFilter,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-5">
            <InfoCard title="Skills" seed={5}>
              <ul className="text-slate-200 list-disc ml-5 space-y-2 text-sm md:text-base">
                {resume.skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </InfoCard>
          </div>
          <div className="hidden md:flex md:col-span-2 justify-center">
            <CenterLine />
          </div>
          <div className="block md:hidden">
            <CenterLineHorizontal />
          </div>
          <div className="md:col-span-5">
            <InfoCard title="Contact" seed={6}>
              <p className="text-slate-200 space-y-1 text-sm md:text-base">
                {resume.email}
                <br />
                {resume.phone}
                <br />
                {resume.location}
              </p>
            </InfoCard>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 4: Education + Achievements */}
      <motion.section
        className="relative z-40 max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-20 mb-32"
        style={{
          ...maskStyle,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          opacity: educationAchOpacity,
          filter: educationAchFilter,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-5">
            <InfoCard title="Education" seed={7}>
              <ul className="text-slate-200 list-disc ml-5 space-y-2 text-sm md:text-base">
                {resume.education.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </InfoCard>
          </div>
          <div className="hidden md:flex md:col-span-2 justify-center">
            <CenterLine />
          </div>
          <div className="block md:hidden">
            <CenterLineHorizontal />
          </div>
          <div className="md:col-span-5">
            <InfoCard title="Achievements & Languages" seed={8}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"> {/* Adjusted grid for mobile/desktop */}
                <div>
                  <h4 className="font-semibold text-white mb-3 text-base md:text-lg">
                    Achievements
                  </h4>
                  <ul className="text-slate-200 list-disc ml-5 space-y-2 text-sm md:text-base">
                    {resume.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-base md:text-lg">
                    Languages
                  </h4>
                  <ul className="text-slate-200 list-disc ml-5 space-y-2 text-sm md:text-base">
                    {resume.languages.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </motion.section>

      <Particles />
      <GlobalStyles />
    </main>
  );
}

/* Center line (Vertical - Desktop) */
function CenterLine() {
  return (
    <div
      className="w-px rounded-md h-full"
      style={{
        background:
          "linear-gradient(to bottom, rgba(160,200,255,0.05), rgba(200,230,255,0.30) 30%, rgba(160,200,255,0.05) 70%, transparent)",
      }}
    />
  );
}

/* Center line (Horizontal - Mobile) */
function CenterLineHorizontal() {
    return (
      <div className="my-8 flex justify-center">
        <div 
            className="h-px w-3/4 rounded-md"
            style={{
                background:
                    "linear-gradient(to right, transparent, rgba(200,230,255,0.30) 30%, rgba(200,230,255,0.30) 70%, transparent)",
            }}
        />
      </div>
    );
}

/* Floating water card */
function InfoCard({
  title,
  children,
  seed = 1,
}: {
  title: string;
  children: React.ReactNode;
  seed?: number;
}) {
  // duration + delay thoda random
  const base = 12 + (seed % 6); // 12–17s
  const delay = (seed * 0.93) % 7;

  return (
    <motion.div
      className="rounded-xl md:rounded-2xl p-6 md:p-10 backdrop-blur-md border border-white/6 water-card" // Mobile p-6, Desktop p-10 (Original)
      style={{
        background: "rgba(0, 12, 32, 0.45)",
        boxShadow: "0 22px 65px rgba(0,0,0,0.7)",
      }}
      animate={{
        // yaha float ko zyada mazboot kiya
        y: [0, -18, 10, -12, 0],
        rotate: [0, -1.3, 0.7, -0.4, 0],
      }}
      transition={{
        duration: base,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
    >
      <h3
        className="text-xl md:text-2xl font-bold mb-3 md:mb-4" // Mobile text-xl, Desktop text-2xl
        style={{
          color: "#7ecbff",
          textShadow: "0 0 18px rgba(120,200,255,0.45)",
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </motion.div>
  );
}

/* Particles + GlobalStyles same as pehle wale code me rakho */


/* ====== Particles (stars / bubbles) ====== */

function Particles() {
  const [nodes, setNodes] = useState<any[]>([]);

  const generateNodes = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 1.5 + Math.random() * 4;
      const dur = 10 + Math.random() * 16;
      const delay = Math.random() * 10;
      const glow = `0 0 ${8 + Math.random() * 14}px rgba(120,220,255,${
        0.08 + Math.random() * 0.18
      })`;
      return { key: i, left, top, size, dur, delay, glow };
    });
  };

  useEffect(() => {
    setNodes(generateNodes());
  }, []);

  if (nodes.length === 0) {
    return <div className="pointer-events-none fixed inset-0 -z-35" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-35">
      {nodes.map((n) => (
        <span
          key={n.key}
          style={{
            position: "absolute",
            left: `${n.left}%`,
            top: `${n.top}%`,
            width: n.size,
            height: n.size,
            borderRadius: 99,
            background:
              "radial-gradient(circle, rgba(200,230,255,1), rgba(100,180,230,0.8))",
            boxShadow: n.glow,
            opacity: 0.95,
            transform: "translate3d(0,0,0)",
            animation: `floaty ${n.dur}s ease-in-out ${n.delay}s infinite`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes floaty {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-18px) translateX(8px) scale(1.06);
            opacity: 0.85;
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

/* ====== Global CSS for water shine + cursor ====== */

function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes blink {
        0%,
        49% {
          opacity: 1;
        }
        50%,
        100% {
          opacity: 0;
        }
      }
      .animate-[blink_1s_steps(2,_start)_infinite] {
        animation: blink 1s steps(2, start) infinite;
      }

      .water-card {
        position: relative;
        overflow: hidden;
        transition: box-shadow 350ms ease, background 350ms ease;
      }
      .water-card::before {
        content: "";
        position: absolute;
        inset: -40% -20% -40% -20%;
        background: radial-gradient(
            1200px 400px at 50% 10%,
            rgba(160, 220, 255, 0.12),
            transparent 22%
          ),
          radial-gradient(
            900px 350px at 20% 60%,
            rgba(100, 190, 255, 0.06),
            transparent 26%
          );
        mix-blend-mode: screen;
        animation: waterShift 9s linear infinite;
        opacity: 0.85;
        pointer-events: none;
      }
      .water-card:hover {
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.75);
        background: rgba(0, 20, 60, 0.6);
      }
      @keyframes waterShift {
        0% {
          transform: translate3d(0, 0, 0) rotate(0deg);
        }
        50% {
          transform: translate3d(8%, -5%, 0) rotate(0.4deg);
        }
        100% {
          transform: translate3d(0, 0, 0) rotate(0deg);
        }
      }
    `}</style>
  );
}
