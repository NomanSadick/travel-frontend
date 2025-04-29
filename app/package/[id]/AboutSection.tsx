"use client";


interface AboutSectionProps {
  description: string;
  days: number;
  nights: number;
}

const AboutSection = ({ description, days, nights, category }: AboutSectionProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">About This Package</h2>
  
      <p>{description}</p>
      <p><span className="text-xl">Category:</span> {category}</p>
      <p className="mt-2 text-gray-500">
        Duration: {days} Days / {nights} Nights
      </p>
    </div>
  );
};

export default AboutSection;
