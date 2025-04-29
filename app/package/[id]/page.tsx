"use client";

import { useParams } from "next/navigation";
import { useGetPackageQuery } from "@/features/packages/packageApi";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import HighlightsSection from "./HighlightsSection";
import ItinerarySection from "./ItinerarySection";
import InclusionsExclusionsSection from "./InclusionsExclusionsSection";

interface PackageData {
  title: string;
  location: string;
  image: string;
  description: string;
  days: number;
  nights: number;
  highlights: string[];
  itinerary: string[];
  inclusions: string[];
  exclusions: string[];
}

const PackageDetails = () => {
  const { id } = useParams();
  const packageQuery = useGetPackageQuery<PackageData>(id as string);
  const packageData = packageQuery.data;
  const isLoading = packageQuery.isLoading;
  const error = packageQuery.error;

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error || !packageData) return <div className="p-8">Something went wrong!</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <HeroSection title={packageData.title} location={packageData.location} image={packageData.image}/>
      <AboutSection description={packageData.description} days={packageData.days} nights={packageData.nights} category={packageData.category} />
      <HighlightsSection highlights={packageData.highlights} />
      <ItinerarySection itinerary={packageData.itinerary} />
      <InclusionsExclusionsSection inclusions={packageData.inclusions} exclusions={packageData.exclusions} />
    </div>
  );
};

export default PackageDetails;
