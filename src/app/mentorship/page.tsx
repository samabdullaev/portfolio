import CardGrid from "@/components/ui/CardGrid";
import HubCard from "@/components/ui/HubCard";

export default function MentorshipPage() {
  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Mentorship</h1>
        <p className="hub-subtitle">Guidance articles from university to career — published on Publink</p>
      </div>

      <CardGrid>
        <HubCard
          href="https://publink.uz/education/universitetingizni-qanchalik-yaxshi-bilasiz"
          title="Universitetingizni qanchalik yaxshi bilasiz?"
          tag="Task 1"
          meta="Mar 18, 2026"
          thumbnail="/assets/mentorship/Publink%20-%20Article%201%20Cover%20Image.jpg"
          external
        />
      </CardGrid>
    </main>
  );
}
