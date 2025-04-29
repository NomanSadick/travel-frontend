"use client";

import Image from "next/image";

interface HeroSectionProps {
  title: string;
  location: string;
  image: string;
}

const HeroSection = ({ title, location, image }: HeroSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
          <p className="text-lg mt-3 text-gray-600">Cities: {location}</p>
        </div>
        <div className="w-full md:w-[600px] h-[350px] relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={image}
            alt="Package Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
