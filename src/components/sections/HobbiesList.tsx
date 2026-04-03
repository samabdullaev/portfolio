const hobbies = [
  { emoji: "✍️", label: "Writing" },
  { emoji: "🚶", label: "Walking" },
  { emoji: "♟️", label: "Playing Chess" },
  { emoji: "🧩", label: "Puzzle Games" },
  { emoji: "🤝", label: "Volunteering" },
  { emoji: "🥋", label: "Taekwondo" },
  { emoji: "🏓", label: "Ping-Pong" },
  { emoji: "✈️", label: "Travelling" },
];

export default function HobbiesList() {
  return (
    <div className="hobbies-list">
      {hobbies.map((item) => (
        <div key={item.label} className="hobby-pill">
          <span className="hobby-emoji">{item.emoji}</span> {item.label}
        </div>
      ))}
    </div>
  );
}
