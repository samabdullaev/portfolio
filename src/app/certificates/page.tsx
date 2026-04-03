"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "./certificates.css";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl?: string;
  category: string;
}

const certificates: Certificate[] = [
  // CS50
  {
    title: "CS50's Introduction to Programming with Python",
    issuer: "CS50",
    date: "Dec 2023",
    image: "/assets/certificates/CS50%20-%20CS50%20Python.png",
    verifyUrl:
      "https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python",
    category: "CS50",
  },
  {
    title: "CS50's Introduction to Databases with SQL",
    issuer: "CS50",
    date: "Dec 2023",
    image: "/assets/certificates/CS50%20-%20CS50%20SQL.png",
    verifyUrl:
      "https://www.edx.org/learn/sql/harvard-university-cs50-s-introduction-to-databases-with-sql",
    category: "CS50",
  },

  // Python Institute
  {
    title: "PCAP – Certified Associate Python Programmer",
    issuer: "Python Institute",
    date: "Jul 2022",
    image: "/assets/certificates/Python%20Institute%20-%20PCAP%20Certificate.png",
    verifyUrl: "https://pythoninstitute.org/pcap",
    category: "Python Institute",
  },
  {
    title: "PCEP – Certified Entry-Level Python Programmer",
    issuer: "Python Institute",
    date: "Jul 2022",
    image: "/assets/certificates/Python%20Institute%20-%20PCEP%20Certificate.png",
    verifyUrl: "https://pythoninstitute.org/pcep",
    category: "Python Institute",
  },

  // HackerRank
  {
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    date: "May 2024",
    image: "/assets/certificates/HackerRank%20-%20Software%20Engineer%20Intern.png",
    verifyUrl:
      "https://www.hackerrank.com/skills-verification/software_engineer_intern",
    category: "HackerRank",
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "Sep 2022",
    image: "/assets/certificates/HackerRank%20-%20SQL%20Intermediate.png",
    verifyUrl:
      "https://www.hackerrank.com/skills-verification/sql_intermediate",
    category: "HackerRank",
  },
  {
    title: "SQL (Basic)",
    issuer: "HackerRank",
    date: "Sep 2022",
    image: "/assets/certificates/HackerRank%20-%20SQL%20Basic.png",
    verifyUrl: "https://www.hackerrank.com/skills-verification/sql_basic",
    category: "HackerRank",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "Sep 2022",
    image: "/assets/certificates/HackerRank%20-%20Python%20Basic.png",
    verifyUrl: "https://www.hackerrank.com/skills-verification/python_basic",
    category: "HackerRank",
  },
  {
    title: "CSS",
    issuer: "HackerRank",
    date: "Sep 2022",
    image: "/assets/certificates/HackerRank%20-%20CSS.png",
    verifyUrl: "https://www.hackerrank.com/skills-verification/css",
    category: "HackerRank",
  },

  // Awards & Hackathons
  {
    title: "Hacknovation 2024 — 4th Place Finisher",
    issuer: "Awards & Hackathons",
    date: "May 2024",
    image:
      "/assets/certificates/Hacknovation%202024%20-%204th%20Place%20Finisher.jpeg",
    category: "Awards & Hackathons",
  },
  {
    title: "Bright Network IEUK 2023: Technology Participant",
    issuer: "Awards & Hackathons",
    date: "Jul 2023",
    image:
      "/assets/certificates/Bright%20Network%20IEUK%202023%20-%20Technology%20Participant.png",
    category: "Awards & Hackathons",
  },
  {
    title: "Gold Go Herts Award Achiever",
    issuer: "Awards & Hackathons",
    date: "Jun 2023",
    image: "/assets/certificates/Gold%20Go%20Herts%20Award%20Achiever.jpeg",
    category: "Awards & Hackathons",
  },
  {
    title: "High Achiever 21/22 Academic Year",
    issuer: "Awards & Hackathons",
    date: "Dec 2022",
    image:
      "/assets/certificates/High%20Achiever%2021:22%20Academic%20Year.jpeg",
    category: "Awards & Hackathons",
  },
  {
    title: 'UniHack 2022 "Tech" Winner',
    issuer: "Awards & Hackathons",
    date: "Dec 2022",
    image: "/assets/certificates/UniHack%202022%20Tech%20Winner.png",
    category: "Awards & Hackathons",
  },
  {
    title: '"Code for Good" Hackathon Participant',
    issuer: "Awards & Hackathons",
    date: "Oct 2022",
    image:
      "/assets/certificates/Code%20for%20Good%20Hackathon%20Participant.jpeg",
    category: "Awards & Hackathons",
  },
  {
    title: "Meta Global Hackathon 2022 — Top 400 Finisher",
    issuer: "Awards & Hackathons",
    date: "Sep 2022",
    image:
      "/assets/certificates/Meta%20Global%20Hackathon%202022%20-%20Top%20400%20Finisher.jpeg",
    category: "Awards & Hackathons",
  },

  // Coursera
  {
    title: "Version Control",
    issuer: "Coursera",
    date: "Aug 2022",
    image: "/assets/certificates/Coursera%20-%20Version%20Control.png",
    verifyUrl:
      "https://www.coursera.org/learn/introduction-to-version-control",
    category: "Coursera",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Coursera",
    date: "Aug 2022",
    image:
      "/assets/certificates/Coursera%20-%20Programming%20with%20JavaScript.png",
    verifyUrl:
      "https://www.coursera.org/learn/programming-with-javascript",
    category: "Coursera",
  },
  {
    title: "Introduction to Front-End Development",
    issuer: "Coursera",
    date: "Aug 2022",
    image:
      "/assets/certificates/Coursera%20-%20Introduction%20to%20Fron-End%20Development.png",
    verifyUrl:
      "https://www.coursera.org/learn/introduction-to-front-end-development",
    category: "Coursera",
  },
  {
    title: "Learning How to Learn",
    issuer: "Coursera",
    date: "Aug 2022",
    image: "/assets/certificates/Coursera%20-%20Learning%20How%20to%20Learn.png",
    verifyUrl: "https://www.coursera.org/learn/learning-how-to-learn",
    category: "Coursera",
  },

  // FreeCodeCamp
  {
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    date: "Oct 2024",
    image:
      "/assets/certificates/FreeCodeCamp%20-%20Responsive%20Web%20Design.png",
    verifyUrl:
      "https://www.freecodecamp.org/learn/2022/responsive-web-design",
    category: "FreeCodeCamp",
  },

  // Forage
  {
    title: "JPMorganChase Software Engineering Virtual Experience",
    issuer: "Forage",
    date: "Nov 2022",
    image:
      "/assets/certificates/Forage%20-%20JPMorganChase%20Software%20Engineering%20Virtual%20Experience.png",
    verifyUrl: "https://www.theforage.com/simulations",
    category: "Forage",
  },
  {
    title: "Accenture Developer Virtual Experience Program",
    issuer: "Forage",
    date: "Nov 2022",
    image:
      "/assets/certificates/Forage%20-%20Accenture%20Developer%20Virtual%20Experience%20Program.png",
    verifyUrl: "https://www.theforage.com/simulations",
    category: "Forage",
  },
  {
    title: "Accenture Developer and Technology Virtual Experience Program",
    issuer: "Forage",
    date: "Nov 2022",
    image:
      "/assets/certificates/Forage%20-%20Accenture%20Developer%20and%20Technology%20Virtual%20Experience%20Program.png",
    verifyUrl: "https://www.theforage.com/simulations",
    category: "Forage",
  },
  {
    title: "Align Technology Software Engineering Virtual Experience Program",
    issuer: "Forage",
    date: "Nov 2022",
    image:
      "/assets/certificates/Forage%20-%20Align%20Technology%20Software%20Engineering%20Virtual%20Experience%20Program.png",
    verifyUrl: "https://www.theforage.com/simulations",
    category: "Forage",
  },
  {
    title: "JPMorganChase Agile Virtual Experience Program",
    issuer: "Forage",
    date: "Nov 2022",
    image:
      "/assets/certificates/Forage%20-%20JPMorganChase%20Agile%20Virtual%20Experience%20Program.png",
    verifyUrl: "https://www.theforage.com/simulations",
    category: "Forage",
  },

  // LinkedIn Learning
  {
    title: "How to Have a Great Day at Work With Caroline Webb",
    issuer: "LinkedIn Learning",
    date: "Nov 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20How%20to%20Have%20a%20Great%20Day%20at%20Work%20With%20Caroline%20Webb.png",
    verifyUrl:
      "https://www.linkedin.com/learning/how-to-have-a-great-day-at-work-with-caroline-webb",
    category: "LinkedIn Learning",
  },
  {
    title: "Programming Foundations: Fundamentals",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Programming%20Foundations%20-%20Fundamentals.png",
    verifyUrl:
      "https://www.linkedin.com/learning/programming-foundations-fundamentals-3",
    category: "LinkedIn Learning",
  },
  {
    title: "Learning Python",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image: "/assets/certificates/LinkedIn%20-%20Learning%20Python.png",
    verifyUrl:
      "https://www.linkedin.com/learning/learning-python-14393370",
    category: "LinkedIn Learning",
  },
  {
    title: "Introduction to Web Design and Development",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Introduction%20to%20Web%20Design%20and%20Development.png",
    verifyUrl:
      "https://www.linkedin.com/learning/introduction-to-web-design-and-development-14628245",
    category: "LinkedIn Learning",
  },
  {
    title:
      "Microsoft Cloud Fundamentals: SharePoint Online, OneDrive, and Teams",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Microsoft%20Cloud%20Fundamentals%20-%20SharePoint%20Online,%20OneDrive,%20and%20Teams.png",
    verifyUrl:
      "https://www.linkedin.com/learning/microsoft-cloud-fundamentals-sharepoint-online-onedrive-and-teams",
    category: "LinkedIn Learning",
  },
  {
    title: "Digital Accessibility for the Modern Workplace",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Digital%20Accessibility%20for%20the%20Modern%20Workplace.png",
    verifyUrl:
      "https://www.linkedin.com/learning/digital-accessibility-for-the-modern-workplace",
    category: "LinkedIn Learning",
  },
  {
    title: "Zoom Essential Training",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image: "/assets/certificates/LinkedIn%20-%20Zoom%20Essential%20Training.png",
    verifyUrl: "https://www.linkedin.com/learning/zoom-essential-training",
    category: "LinkedIn Learning",
  },
  {
    title: "Microsoft Teams Tips and Tricks",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Microsoft%20Teams%20Tips%20and%20Tricks.png",
    verifyUrl:
      "https://www.linkedin.com/learning/microsoft-teams-tips-and-tricks-2022",
    category: "LinkedIn Learning",
  },
  {
    title: "Microsoft Planner Essential Training",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Microsoft%20Planner%20Essential%20Training.png",
    verifyUrl:
      "https://www.linkedin.com/learning/microsoft-planner-essential-training-2021",
    category: "LinkedIn Learning",
  },
  {
    title: "SharePoint Online: Managing Documents",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20SharePoint%20Online%20-%20Managing%20Documents.png",
    verifyUrl:
      "https://www.linkedin.com/learning/sharepoint-online-managing-documents",
    category: "LinkedIn Learning",
  },
  {
    title: "Learning OneDrive",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image: "/assets/certificates/LinkedIn%20-%20Learning%20OneDrive.png",
    verifyUrl: "https://www.linkedin.com/learning/learning-onedrive-2021",
    category: "LinkedIn Learning",
  },
  {
    title: "Learning LinkedIn",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image: "/assets/certificates/LinkedIn%20-%20Learning%20LinkedIn.png",
    verifyUrl:
      "https://www.linkedin.com/learning/learning-linkedin-2022/get-started-with-linkedin",
    category: "LinkedIn Learning",
  },
  {
    title:
      "PowerPoint: Eight Easy Ways to Make Your Presentation Stand Out",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20PowerPoint%20-%20Eight%20Easy%20Ways%20to%20Make%20Your%20Presentation%20Stand%20Out.png",
    verifyUrl:
      "https://www.linkedin.com/learning/powerpoint-eight-easy-ways-to-make-your-presentation-stand-out",
    category: "LinkedIn Learning",
  },
  {
    title: "Excel: VLOOKUP and XLOOKUP for Beginners",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Excel%20-%20VLOOKUP%20and%20XLOOKUP%20for%20Beginners.png",
    verifyUrl:
      "https://www.linkedin.com/learning/excel-vlookup-and-xlookup-for-beginners-11690751",
    category: "LinkedIn Learning",
  },
  {
    title: "Introduction to Video Editing",
    issuer: "LinkedIn Learning",
    date: "Sep 2022",
    image:
      "/assets/certificates/LinkedIn%20-%20Introduction%20to%20Video%20Editing.png",
    verifyUrl:
      "https://www.linkedin.com/learning/introduction-to-video-editing",
    category: "LinkedIn Learning",
  },

  // Springpod
  {
    title: '"Inclusive Futures: Technology" Insight Event',
    issuer: "Springpod",
    date: "Dec 2022",
    image:
      "/assets/certificates/Springpod%20-%20Inclusive%20Futures%20-%20Technology%20Insight%20Event.png",
    verifyUrl: "https://www.springpod.com/",
    category: "Springpod",
  },
];

const FILTERS = [
  "All",
  "CS50",
  "Python Institute",
  "HackerRank",
  "Awards & Hackathons",
  "Coursera",
  "FreeCodeCamp",
  "Forage",
  "LinkedIn Learning",
  "Springpod",
];

export default function CertificatesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalCert, setModalCert] = useState<Certificate | null>(null);

  const filtered =
    activeFilter === "All"
      ? certificates
      : certificates.filter((c) => c.category === activeFilter);

  const closeModal = useCallback(() => {
    setModalCert(null);
    document.body.style.overflow = "";
  }, []);

  const openModal = (cert: Certificate) => {
    setModalCert(cert);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!modalCert) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalCert, closeModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Certificates</h1>
        <p className="hub-subtitle">
          Certifications and achievements I&apos;ve earned
        </p>
      </div>

      <div className="filter-bar">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`filter-btn${activeFilter === filter ? " active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="cert-grid">
        {filtered.map((cert, i) => (
          <div
            key={`${cert.category}-${i}`}
            className="cert-card"
            onClick={() => openModal(cert)}
          >
            <div className="cert-image">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 500px) 100vw, (max-width: 700px) 50vw, (max-width: 900px) 33vw, 25vw"
                style={{ objectFit: "contain", padding: "12px" }}
              />
            </div>
            <div className="cert-content">
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-title">
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {cert.title}
                  </a>
                ) : (
                  cert.title
                )}
              </p>
              <p className="cert-date">{cert.date}</p>
            </div>
          </div>
        ))}
      </div>

      {modalCert && (
        <div
          className="cert-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="cert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalCert.image} alt={modalCert.title} />
            <div className="cert-modal-info">
              <p className="cert-modal-title">{modalCert.title}</p>
              <p className="cert-modal-date">{modalCert.date}</p>
            </div>
            <button
              className="cert-modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
