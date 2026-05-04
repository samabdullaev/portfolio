interface ContributionItem {
  _key: string;
  emoji: string;
  title: string;
  description: string;
  url: string;
}

export default function ContributionsGrid({ items }: { items: ContributionItem[] }) {
  return (
    <div className="contributions-grid">
      {items.map((item) => (
        <a
          key={item._key}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contribution-card"
        >
          <span className="contribution-emoji">{item.emoji}</span>
          <div className="contribution-info">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
