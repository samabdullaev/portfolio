interface CardGridProps {
  children: React.ReactNode;
  alwaysVisible?: boolean;
}

export default function CardGrid({
  children,
  alwaysVisible = false,
}: CardGridProps) {
  return (
    <div className={`card-grid${alwaysVisible ? " always-visible" : ""}`}>
      {children}
    </div>
  );
}
