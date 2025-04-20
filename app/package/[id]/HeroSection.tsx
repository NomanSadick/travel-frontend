"use client";
interface HeroSectionProps {
    title: string;
    location: string;
  }
  
  const HeroSection = ({ title, location }: HeroSectionProps) => {
    return (
      <div className="bg-gray-100 p-8 text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg text-gray-600">Cities: {location}</p>
      </div>
    );
  };
  
  export default HeroSection;
  