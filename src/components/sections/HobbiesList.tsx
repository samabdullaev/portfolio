interface HobbyItem {
  _key: string;
  emoji: string;
  label: string;
}

export default function HobbiesList({ items }: { items: HobbyItem[] }) {
  return (
    <div className="flex flex-wrap gap-2.5 max-sm:gap-2">
      {items.map((item) => (
        <div
          key={item._key}
          className="hobby-pill inline-flex items-center gap-2 text-sm font-medium text-text bg-card border border-border py-2.5 px-5 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-hover max-sm:py-2 max-sm:px-4"
        >
          <span className="text-lg">{item.emoji}</span> {item.label}
        </div>
      ))}
    </div>
  );
}
