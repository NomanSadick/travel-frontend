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
  image: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the PackageDetails page with the id of the selected package
    router.push(`/packageFilter`);
  };

  return (
    <div
    className="rounded overflow-hidden shadow-lg bg-white flex flex-col justify-between h-full"
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

    <div className="mt-auto px-6 pb-6">
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent parent onClick
          router.push("/packageFilter");
        }}
        className="px-6 py-3 bg-orange-300 text-white rounded-lg hover:bg-orange-500 transition cursor-pointer w-full"
      >
        View All Packages
      </button>
    </div>
  </div>
  );
};

export default Card;
