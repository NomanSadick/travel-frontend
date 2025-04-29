"use client";

interface AboutSectionProps {
  description: string;
  days: number;
  nights: number;
  category: string;
}

const AboutSection = ({
  description,
  days,
  nights,
  category,
}: AboutSectionProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">About This Package</h2>

      <p>{description}</p>
      <div className="flex justify-baseline items-center gap-4 mt-4">
        <p>
          <span className="text-xl">Category:</span> {category}
        </p>
        <p className="mt-2 text-gray-500">
          Duration: {days} Days / {nights} Nights
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
