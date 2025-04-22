import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Card = ({
  title,
  description,
  price,
  image,
}: {
  title: string;
  description: string;
  price: number;
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the PackageDetails page with the id of the selected package
    router.push(`/packageFilter`);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
      onClick={handleClick}
    >
      <div>
        <div className="px-6 py-4">
          <Image
            src={image}
            alt={title}
            width={500}
            height={192}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="text-green-500 font-bold">BDT: {price}</span>
        </div>
      </div>
      <div className="m-8 text-center">
        <button
          onClick={() => router.push("/packageFilter")}
          className="px-6 py-3 bg-orange-300 text-white rounded-lg hover:bg-orange-500 transition cursor-pointer"
        >
          View All Packages
        </button>
      </div>
    </div>
  );
};

export default Card;
