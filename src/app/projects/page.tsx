import CardGrid from "@/components/ui/CardGrid";
import HubCard from "@/components/ui/HubCard";

const personalProjects = [
  {
    title: "CodeMaster",
    subtitle:
      "An interactive coding platform inspired by Codingbat that helps users practice JavaScript with real-time feedback.",
    thumbnail: "/assets/projects/CodeMaster.jpeg",
    href: "/projects/codemaster",
  },
  {
    title: "Subject Test Platform",
    subtitle:
      "An interactive web app for TDPU students to prepare for exams through quizzes and practice questions.",
    thumbnail: "/assets/projects/Subject%20Test%20Platform.jpeg",
    href: "/projects/subject-test-platform",
  },
  {
    title: "Smart Resume Matcher",
    subtitle:
      "An AI-powered platform that analyzes resumes against job descriptions and provides actionable feedback to improve job application success.",
    thumbnail: "/assets/projects/Smart%20Resume%20Matcher.png",
    href: "/projects/smart-resume-matcher",
  },
  {
    title: "Allmaths",
    subtitle:
      "A web-based learning platform that helps children aged 3–15 learn mathematics through interactive and engaging content.",
    thumbnail: "/assets/projects/AllMaths.png",
    href: "/projects/allmaths",
  },
];

const freelanceProjects = [
  {
    title: "Al Khorezmi Community Centre Website",
    subtitle:
      "A bilingual (English & Uzbek) website for a community centre, providing event schedules, prayer times, and contact information.",
    thumbnail: "/assets/projects/Al%20Khorezmi%20Community%20Centre%20Website.png",
    href: "/projects/al-khorezmi",
  },
  {
    title: "Shirina",
    subtitle:
      "A bilingual website for a local brand selling semi-frozen homemade products, offering SEO optimization and easy content management.",
    thumbnail: "/assets/projects/Shirina.png",
    href: "/projects/shirina",
  },
  {
    title: "Actyble",
    subtitle:
      "A modern, SEO-optimized landing page for a social planning startup, designed to showcase features and drive user signups.",
    thumbnail: "/assets/projects/Actyble.png",
    href: "/projects/actyble",
  },
  {
    title: "Soffin Accounting Firm Website",
    subtitle:
      "A professional, fully responsive website for an accounting firm, built with SvelteKit and Sanity CMS.",
    thumbnail: "/assets/projects/Soffin.png",
    href: "/projects/soffin",
  },
  {
    title: "4Miles",
    subtitle:
      "A website for 4Miles, a community club promoting outdoor activities for a healthier, happier lifestyle.",
    thumbnail: "/assets/projects/4Miles.png",
    href: "/projects/4miles",
  },
  {
    title: "Kinaie Ecom Landing Page",
    subtitle:
      "A responsive, SEO-optimized landing page for an ACCA-approved accounting firm targeting UK eCommerce businesses.",
    thumbnail: "/assets/projects/Kinaie%20Ecom%20Landing%20Page.png",
    href: "/projects/kinaie-ecom",
  },
  {
    title: "Kinaie Growth Landing Page",
    subtitle:
      "A responsive landing page for an ACCA-approved accounting firm, showcasing growth-focused services and driving client engagement.",
    thumbnail: "/assets/projects/Kinaie%20Growth%20Landing%20Page.png",
    href: "/projects/kinaie-growth",
  },
];

const hackathonProjects = [
  {
    title: "JoyBormi",
    subtitle:
      "A cross-platform booking platform that simplifies reservations for various services including restaurants, game clubs, and healthcare facilities.",
    thumbnail: "/assets/projects/JoyBormi.jpeg",
    href: "/projects/joybormi",
  },
  {
    title: "Tech 2",
    subtitle:
      "An accessibility-focused digital solution designed to support non-traditional learners in overcoming digital literacy challenges.",
    thumbnail: "/assets/projects/Tech2.jpeg",
    href: "/projects/tech2",
  },
  {
    title: "Locus",
    subtitle:
      "A mobile app that helps the deafblind community discover accessible venues and organize social meetups.",
    thumbnail: "/assets/projects/Locus.jpeg",
    href: "/projects/locus",
  },
];

export default function ProjectsPage() {
  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Projects</h1>
        <p className="hub-subtitle">
          A collection of personal, freelance, and hackathon projects
        </p>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Personal</h2>
        </div>
        <CardGrid>
          {personalProjects.map((project) => (
            <HubCard
              key={project.href}
              href={project.href}
              title={project.title}
              subtitle={project.subtitle}
              thumbnail={project.thumbnail}
            />
          ))}
        </CardGrid>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Freelance</h2>
        </div>
        <CardGrid>
          {freelanceProjects.map((project) => (
            <HubCard
              key={project.href}
              href={project.href}
              title={project.title}
              subtitle={project.subtitle}
              thumbnail={project.thumbnail}
            />
          ))}
        </CardGrid>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Hackathon</h2>
        </div>
        <CardGrid>
          {hackathonProjects.map((project) => (
            <HubCard
              key={project.href}
              href={project.href}
              title={project.title}
              subtitle={project.subtitle}
              thumbnail={project.thumbnail}
            />
          ))}
        </CardGrid>
      </div>
    </main>
  );
}
