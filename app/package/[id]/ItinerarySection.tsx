interface ItinerarySectionProps {
    itinerary: { day: number; title: string; description: string }[];
  }
  
  const ItinerarySection = ({ itinerary }: ItinerarySectionProps) => {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
        <div className="space-y-6">
          {itinerary.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded shadow">
              <h3 className="text-lg font-bold text-orange-600">Day {item.day}: {item.title}</h3>
              <p className="text-gray-700 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ItinerarySection;
  