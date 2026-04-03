import Link from "next/link";
import CardGrid from "@/components/ui/CardGrid";
import "./reviews.css";

const years = [2025, 2024, 2023, 2022, 2021] as const;

export default function ReviewsPage() {
  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Reviews</h1>
        <p className="hub-subtitle">A look back at each year</p>
      </div>

      <CardGrid>
        {years.map((year) => (
          <div className="hub-card" key={year}>
            <Link href={`/reviews/${year}`}>
              <div className="hub-card-inner">
                <div className="hub-card-thumb">
                  <div className={`hub-card-thumb-img year-${year}`} />
                </div>
                <div className="hub-card-content">
                  <h3>{year}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </CardGrid>
    </main>
  );
}
