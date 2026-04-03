import Image from "next/image";
import "./about.css";
import ExpandText from "@/components/ui/ExpandText";
import ContributionsGrid from "@/components/sections/ContributionsGrid";
import HobbiesList from "@/components/sections/HobbiesList";

const bioParagraphs = [
  { summary: "I am a Frontend Software Engineer based in the UK, with 2+ years of experience building scalable and user-focused web applications.", expanded: " I have worked with startups and SMEs across ed-tech, e-commerce, and SaaS, helping design and develop fast, accessible, and performance-optimized interfaces." },
  { summary: "I graduated with First Class Honours in Computer Science (Artificial Intelligence) from the University of Hertfordshire, and spent a year at Concordia University in Montreal as part of an exchange program.", expanded: " My academic background, combined with hands-on industry experience, has given me a strong foundation in both engineering principles and real-world product development." },
  { summary: "Over the years, I have worked with technologies including JavaScript, TypeScript, React, Next.js, and modern UI frameworks.", expanded: " I focus on building clean, maintainable code and creating seamless user experiences, with an increasing interest in integrating AI into frontend applications to build smarter and more personalized products." },
  { summary: "I enjoy working on challenging problems and learning by building.", expanded: " I have actively participated in hackathons, placing Top 4 in Hacknovation 2024, winning UniHack 2022, and ranking in the Top 400 globally in the Meta Global Hackathon. Alongside this, I write technical blogs on Medium and LeetCode, and regularly share my learning journey and progress on LinkedIn." },
  { summary: "I'm driven by continuous growth and enjoy working on products that have real impact.", expanded: " My long-term goal is to become a Software Engineer at Google, and I'm consistently working towards that through building, learning, and pushing my limits." },
];

export default function AboutPage() {
  return (
    <section className="hub-page">
      <div className="hub-header">
        <h1>About</h1>
        <p className="hub-subtitle">A bit more about me, what I do, and what I enjoy</p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">About</h2>
        <div className="about-row">
          <div className="about-photo">
            <Image src="/assets/profile.jpeg" alt="Sam Abdullaev" width={380} height={380} />
          </div>
          <div className="about-text">
            {bioParagraphs.map((p, i) => (
              <ExpandText key={i} summary={p.summary} expanded={p.expanded} />
            ))}
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Contributions</h2>
        <ContributionsGrid />
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Hobbies & Activities</h2>
        <HobbiesList />
      </div>
    </section>
  );
}
