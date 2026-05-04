interface HobbyItem {
  _key: string;
  emoji: string;
  label: string;
}

export default function HobbiesList({ items }: { items: HobbyItem[] }) {
  return (
    <div className="hobbies-list">
      {items.map((item) => (
        <div key={item._key} className="hobby-pill">
          <span className="hobby-emoji">{item.emoji}</span> {item.label}
        </div>
      ))}
    </div>
  );
}
