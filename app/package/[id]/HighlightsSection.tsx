"use client"

import { FaStar } from "react-icons/fa"

interface HighlightsSectionProps {
  highlights: { title: string; description: string }[]
}

const HighlightsSection = ({ highlights }: HighlightsSectionProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
      <ul className="space-y-4">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <FaStar className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-[15px]">{highlight.title}</p>
              <p className="text-gray-700 text-[15px]">{highlight.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HighlightsSection
