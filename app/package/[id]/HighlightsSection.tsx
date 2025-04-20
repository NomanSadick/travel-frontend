interface HighlightsSectionProps {
  highlights: { title: string; description: string }[];
}

const HighlightsSection = ({ highlights }: HighlightsSectionProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
      <ul className=" space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index}>
            <p className="font-semibold">{highlight.title}</p>
            <p className="text-gray-600">{highlight.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightsSection;
