"use client";

import { useState, useEffect, useCallback } from "react";
import "./certificates.css";

interface Certificate {
  title: string;
  date: string;
  image: string;
  verifyUrl?: string;
}

const issuerGroups: { issuer: string; certs: Certificate[] }[] = [
  {
    issuer: "CS50",
    certs: [
      {
        title: "CS50's Introduction to Programming with Python",
        date: "Dec 2023",
        image: "/assets/certificates/CS50%20-%20CS50%20Python.png",
        verifyUrl:
          "https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python",
      },
      {
        title: "CS50's Introduction to Databases with SQL",
        date: "Dec 2023",
        image: "/assets/certificates/CS50%20-%20CS50%20SQL.png",
        verifyUrl:
          "https://www.edx.org/learn/sql/harvard-university-cs50-s-introduction-to-databases-with-sql",
      },
    ],
  },
  {
    issuer: "Python Institute",
    certs: [
      {
        title: "PCAP – Certified Associate Python Programmer",
        date: "Jul 2022",
        image:
          "/assets/certificates/Python%20Institute%20-%20PCAP%20Certificate.png",
        verifyUrl: "https://pythoninstitute.org/pcap",
      },
      {
        title: "PCEP – Certified Entry-Level Python Programmer",
        date: "Jul 2022",
        image:
          "/assets/certificates/Python%20Institute%20-%20PCEP%20Certificate.png",
        verifyUrl: "https://pythoninstitute.org/pcep",
      },
    ],
  },
  {
    issuer: "HackerRank",
    certs: [
      {
        title: "Software Engineer Intern",
        date: "May 2024",
        image:
          "/assets/certificates/HackerRank%20-%20Software%20Engineer%20Intern.png",
        verifyUrl:
          "https://www.hackerrank.com/skills-verification/software_engineer_intern",
      },
      {
        title: "SQL (Intermediate)",
        date: "Sep 2022",
        image:
          "/assets/certificates/HackerRank%20-%20SQL%20Intermediate.png",
        verifyUrl:
          "https://www.hackerrank.com/skills-verification/sql_intermediate",
      },
      {
        title: "SQL (Basic)",
        date: "Sep 2022",
        image: "/assets/certificates/HackerRank%20-%20SQL%20Basic.png",
        verifyUrl:
          "https://www.hackerrank.com/skills-verification/sql_basic",
      },
      {
        title: "Python (Basic)",
        date: "Sep 2022",
        image:
          "/assets/certificates/HackerRank%20-%20Python%20Basic.png",
        verifyUrl:
          "https://www.hackerrank.com/skills-verification/python_basic",
      },
      {
        title: "CSS",
        date: "Sep 2022",
        image: "/assets/certificates/HackerRank%20-%20CSS.png",
        verifyUrl: "https://www.hackerrank.com/skills-verification/css",
      },
    ],
  },
  {
    issuer: "Awards & Hackathons",
    certs: [
      {
        title: "Hacknovation 2024 — 4th Place Finisher",
        date: "May 2024",
        image:
          "/assets/certificates/Hacknovation%202024%20-%204th%20Place%20Finisher.jpeg",
      },
      {
        title: "Bright Network IEUK 2023: Technology Participant",
        date: "Jul 2023",
        image:
          "/assets/certificates/Bright%20Network%20IEUK%202023%20-%20Technology%20Participant.png",
      },
      {
        title: "Gold Go Herts Award Achiever",
        date: "Jun 2023",
        image:
          "/assets/certificates/Gold%20Go%20Herts%20Award%20Achiever.jpeg",
      },
      {
        title: "High Achiever 21/22 Academic Year",
        date: "Dec 2022",
        image:
          "/assets/certificates/High%20Achiever%2021:22%20Academic%20Year.jpeg",
      },
      {
        title: 'UniHack 2022 "Tech" Winner',
        date: "Dec 2022",
        image:
          "/assets/certificates/UniHack%202022%20Tech%20Winner.png",
      },
      {
        title: '"Code for Good" Hackathon Participant',
        date: "Oct 2022",
        image:
          "/assets/certificates/Code%20for%20Good%20Hackathon%20Participant.jpeg",
      },
      {
        title: "Meta Global Hackathon 2022 — Top 400 Finisher",
        date: "Sep 2022",
        image:
          "/assets/certificates/Meta%20Global%20Hackathon%202022%20-%20Top%20400%20Finisher.jpeg",
      },
    ],
  },
  {
    issuer: "Coursera",
    certs: [
      {
        title: "Version Control",
        date: "Aug 2022",
        image: "/assets/certificates/Coursera%20-%20Version%20Control.png",
        verifyUrl:
          "https://www.coursera.org/learn/introduction-to-version-control",
      },
      {
        title: "Programming with JavaScript",
        date: "Aug 2022",
        image:
          "/assets/certificates/Coursera%20-%20Programming%20with%20JavaScript.png",
        verifyUrl:
          "https://www.coursera.org/learn/programming-with-javascript",
      },
      {
        title: "Introduction to Front-End Development",
        date: "Aug 2022",
        image:
          "/assets/certificates/Coursera%20-%20Introduction%20to%20Fron-End%20Development.png",
        verifyUrl:
          "https://www.coursera.org/learn/introduction-to-front-end-development",
      },
      {
        title: "Learning How to Learn",
        date: "Aug 2022",
        image:
          "/assets/certificates/Coursera%20-%20Learning%20How%20to%20Learn.png",
        verifyUrl: "https://www.coursera.org/learn/learning-how-to-learn",
      },
    ],
  },
  {
    issuer: "FreeCodeCamp",
    certs: [
      {
        title: "Responsive Web Design",
        date: "Oct 2024",
        image:
          "/assets/certificates/FreeCodeCamp%20-%20Responsive%20Web%20Design.png",
        verifyUrl:
          "https://www.freecodecamp.org/learn/2022/responsive-web-design",
      },
    ],
  },
  {
    issuer: "Forage",
    certs: [
      {
        title: "JPMorganChase Software Engineering Virtual Experience",
        date: "Nov 2022",
        image:
          "/assets/certificates/Forage%20-%20JPMorganChase%20Software%20Engineering%20Virtual%20Experience.png",
        verifyUrl: "https://www.theforage.com/simulations",
      },
      {
        title: "Accenture Developer Virtual Experience Program",
        date: "Nov 2022",
        image:
          "/assets/certificates/Forage%20-%20Accenture%20Developer%20Virtual%20Experience%20Program.png",
        verifyUrl: "https://www.theforage.com/simulations",
      },
      {
        title: "Accenture Developer and Technology Virtual Experience Program",
        date: "Nov 2022",
        image:
          "/assets/certificates/Forage%20-%20Accenture%20Developer%20and%20Technology%20Virtual%20Experience%20Program.png",
        verifyUrl: "https://www.theforage.com/simulations",
      },
      {
        title: "Align Technology Software Engineering Virtual Experience Program",
        date: "Nov 2022",
        image:
          "/assets/certificates/Forage%20-%20Align%20Technology%20Software%20Engineering%20Virtual%20Experience%20Program.png",
        verifyUrl: "https://www.theforage.com/simulations",
      },
      {
        title: "JPMorganChase Agile Virtual Experience Program",
        date: "Nov 2022",
        image:
          "/assets/certificates/Forage%20-%20JPMorganChase%20Agile%20Virtual%20Experience%20Program.png",
        verifyUrl: "https://www.theforage.com/simulations",
      },
    ],
  },
  {
    issuer: "LinkedIn Learning",
    certs: [
      {
        title: "How to Have a Great Day at Work With Caroline Webb",
        date: "Nov 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20How%20to%20Have%20a%20Great%20Day%20at%20Work%20With%20Caroline%20Webb.png",
        verifyUrl:
          "https://www.linkedin.com/learning/how-to-have-a-great-day-at-work-with-caroline-webb",
      },
      {
        title: "Programming Foundations: Fundamentals",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Programming%20Foundations%20-%20Fundamentals.png",
        verifyUrl:
          "https://www.linkedin.com/learning/programming-foundations-fundamentals-3",
      },
      {
        title: "Learning Python",
        date: "Sep 2022",
        image: "/assets/certificates/LinkedIn%20-%20Learning%20Python.png",
        verifyUrl:
          "https://www.linkedin.com/learning/learning-python-14393370",
      },
      {
        title: "Introduction to Web Design and Development",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Introduction%20to%20Web%20Design%20and%20Development.png",
        verifyUrl:
          "https://www.linkedin.com/learning/introduction-to-web-design-and-development-14628245",
      },
      {
        title:
          "Microsoft Cloud Fundamentals: SharePoint Online, OneDrive, and Teams",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Microsoft%20Cloud%20Fundamentals%20-%20SharePoint%20Online,%20OneDrive,%20and%20Teams.png",
        verifyUrl:
          "https://www.linkedin.com/learning/microsoft-cloud-fundamentals-sharepoint-online-onedrive-and-teams",
      },
      {
        title: "Digital Accessibility for the Modern Workplace",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Digital%20Accessibility%20for%20the%20Modern%20Workplace.png",
        verifyUrl:
          "https://www.linkedin.com/learning/digital-accessibility-for-the-modern-workplace",
      },
      {
        title: "Zoom Essential Training",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Zoom%20Essential%20Training.png",
        verifyUrl:
          "https://www.linkedin.com/learning/zoom-essential-training",
      },
      {
        title: "Microsoft Teams Tips and Tricks",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Microsoft%20Teams%20Tips%20and%20Tricks.png",
        verifyUrl:
          "https://www.linkedin.com/learning/microsoft-teams-tips-and-tricks-2022",
      },
      {
        title: "Microsoft Planner Essential Training",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Microsoft%20Planner%20Essential%20Training.png",
        verifyUrl:
          "https://www.linkedin.com/learning/microsoft-planner-essential-training-2021",
      },
      {
        title: "SharePoint Online: Managing Documents",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20SharePoint%20Online%20-%20Managing%20Documents.png",
        verifyUrl:
          "https://www.linkedin.com/learning/sharepoint-online-managing-documents",
      },
      {
        title: "Learning OneDrive",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Learning%20OneDrive.png",
        verifyUrl:
          "https://www.linkedin.com/learning/learning-onedrive-2021",
      },
      {
        title: "Learning LinkedIn",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Learning%20LinkedIn.png",
        verifyUrl:
          "https://www.linkedin.com/learning/learning-linkedin-2022/get-started-with-linkedin",
      },
      {
        title:
          "PowerPoint: Eight Easy Ways to Make Your Presentation Stand Out",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20PowerPoint%20-%20Eight%20Easy%20Ways%20to%20Make%20Your%20Presentation%20Stand%20Out.png",
        verifyUrl:
          "https://www.linkedin.com/learning/powerpoint-eight-easy-ways-to-make-your-presentation-stand-out",
      },
      {
        title: "Excel: VLOOKUP and XLOOKUP for Beginners",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Excel%20-%20VLOOKUP%20and%20XLOOKUP%20for%20Beginners.png",
        verifyUrl:
          "https://www.linkedin.com/learning/excel-vlookup-and-xlookup-for-beginners-11690751",
      },
      {
        title: "Introduction to Video Editing",
        date: "Sep 2022",
        image:
          "/assets/certificates/LinkedIn%20-%20Introduction%20to%20Video%20Editing.png",
        verifyUrl:
          "https://www.linkedin.com/learning/introduction-to-video-editing",
      },
    ],
  },
  {
    issuer: "Springpod",
    certs: [
      {
        title: '"Inclusive Futures: Technology" Insight Event',
        date: "Dec 2022",
        image:
          "/assets/certificates/Springpod%20-%20Inclusive%20Futures%20-%20Technology%20Insight%20Event.png",
        verifyUrl: "https://www.springpod.com/",
      },
    ],
  },
];

export default function CertificatesPage() {
  const [modalCert, setModalCert] = useState<Certificate | null>(null);

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
      </div>

      {issuerGroups.map(({ issuer, certs }) => (
        <div key={issuer} className="topic-section">
          <div className="section-header">
            <h2>{issuer}</h2>
          </div>
          <div className="card-grid always-visible">
            {certs.map((cert, i) => (
              <div
                key={i}
                className="hub-card"
                onClick={() => openModal(cert)}
                style={{ cursor: "pointer" }}
              >
                <div className="hub-card-inner">
                  <div className="hub-card-thumb">
                    <div
                      className="hub-card-thumb-img"
                      style={{
                        backgroundImage: `url(${cert.image})`,
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                  <div className="hub-card-content">
                    <h3>
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
                    </h3>
                    <div className="hub-card-meta">
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {modalCert && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
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
            <img src={modalCert.image} alt={modalCert.title} />
            <div className="cert-modal-info">
              <p className="cert-modal-title">{modalCert.title}</p>
              <p className="cert-modal-date">{modalCert.date}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
