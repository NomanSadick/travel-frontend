"use client";
import { useParams } from "next/navigation";
import { useGetPackageQuery } from "@/features/packages/packageApi";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import HighlightsSection from "./HighlightsSection";
import ItinerarySection from "./ItinerarySection";
import InclusionsExclusionsSection from "./InclusionsExclusionsSection"; // import new section

const PackageDetails = () => {
  const { id } = useParams();
  const { data: packageData, isLoading, error } = useGetPackageQuery(id as string);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Something went wrong!</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <HeroSection title={packageData.title} location={packageData.location} />
      <AboutSection description={packageData.description} days={packageData.days} nights={packageData.nights} />
      
      {/* Highlights Section */}
      <HighlightsSection highlights={packageData.highlights} />

      {/* Itinerary Section */}
      <ItinerarySection itinerary={packageData.itinerary} />

      {/* Inclusions and Exclusions Section */}
      <InclusionsExclusionsSection
        inclusions={packageData.inclusions} // This should be an array of TimedItem[]
        exclusions={packageData.exclusions} // This should be an array of TimedItem[]
      />
    </div>
  );
};

export default PackageDetails;
