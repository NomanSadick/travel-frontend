"use client";

interface TimedItem {
  value: string;
  time: string;
}

interface InclusionsExclusionsProps {
  inclusions: TimedItem[];
  exclusions: TimedItem[];
}

const InclusionsExclusionsSection = ({ inclusions, exclusions }: InclusionsExclusionsProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Inclusions & Exclusions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions List */}
        <div>
          <h3 className="font-semibold mb-2">Inclusions</h3>
          <ul className="space-y-2">
            {inclusions.map((item, index) => (
              <li key={index}>
                <p className="font-normal">{item.value}</p>
                {/* <p className="text-gray-600">{item.time}</p> */}
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions List */}
        <div>
          <h3 className="font-semibold mb-2">Exclusions</h3>
          <ul className="space-y-2">
            {exclusions.map((item, index) => (
              <li key={index}>
                <p className="font-normal">{item.value}</p>
                {/* <p className="text-gray-600">{item.time}</p> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusionsSection;
