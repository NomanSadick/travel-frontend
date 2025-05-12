"use client";
import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ReviewsData } from "@/app/data/ReviewData";


const Slider = dynamic(() => import("react-slick"), { ssr: false });

const ReviewSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280, 
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024, 
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, 
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="mt-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-5xl font-semibold text-center mb-6">
          Customer <span className="text-orange-300">Review</span>
        </h2>

       <div className="w-full overflow-hidden">
       <Slider {...settings}>
          {ReviewsData.map((review) => (
            <div key={review.id} className="md:p-2 px-2 text-justify">
              <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <FaQuoteLeft className="text-gray-100 text-4xl" />
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-gray-700">{review.review}</p>

                <div className="flex items-center mt-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-md border-2 border-blue-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-sm">{review.name}</h3>
                    <p className="text-gray-500 text-sm">{review.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
       </div>
      </div>
    </div>
  );
};

export default ReviewSlider;