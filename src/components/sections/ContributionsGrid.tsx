const contributions = [
  { emoji: "🔗", title: "LinkedIn", description: "Share monthly updates tracking my journey toward becoming a Software Engineer at Google.", url: "https://www.linkedin.com/in/samabdullaev/" },
  { emoji: "🎓", title: "UzTech IT Society (UK)", description: "Organise events, coordinate training, contribute to projects, and lead initiatives.", url: "https://t.me/UzTechUK" },
  { emoji: "💻", title: "GitHub", description: "Build and maintain personal projects to showcase my coding skills.", url: "https://github.com/samabdullaev" },
  { emoji: "📝", title: "Publink", description: "Publish mentorship articles in Uzbek on technology, education, and personal growth.", url: "https://publink.uz/profile/samandar-abdullaev" },
  { emoji: "✍️", title: "Medium", description: "Write blogs on studying abroad, self-improvement, and technology.", url: "https://samabdullaev.medium.com/" },
  { emoji: "🎯", title: "Kompas", description: "Guide school students on university choices and career development.", url: "https://t.me/kompas_17" },
  { emoji: "🧩", title: "LeetCode", description: "Solve coding problems and share solutions in Python, MySQL, and JavaScript.", url: "https://leetcode.com/samabdullaev" },
];

export default function ContributionsGrid() {
  return (
    <div className="contributions-grid">
      {contributions.map((item) => (
        <a
          key={item.title}
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
