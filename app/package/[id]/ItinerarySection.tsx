"use client"

import { useState } from "react"
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt } from "react-icons/fa"

interface ItineraryItem {
  day: number
  title: string
  description: string
}

interface ItinerarySectionProps {
  itinerary: ItineraryItem[]
}

const ItinerarySection = ({ itinerary }: ItinerarySectionProps) => {
  const [expandedDays, setExpandedDays] = useState<number[]>(() => {
    // Always start with the first day expanded if it exists
    return itinerary.length > 0 ? [itinerary[0].day] : []
  })

  const toggleDay = (day: number, index: number) => {
    // Don't allow the first item to be collapsed
    if (index === 0) return

    setExpandedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const expandAll = () => {
    setExpandedDays(itinerary.map((item) => item.day))
  }

  const collapseAll = () => {
    // Keep the first day expanded when collapsing all
    setExpandedDays(itinerary.length > 0 ? [itinerary[0].day] : [])
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-teal-800">Itinerary</h2>
        <button
          onClick={expandedDays.length === itinerary.length ? collapseAll : expandAll}
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          {expandedDays.length === itinerary.length ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="space-y-0">
        {itinerary.map((item, index) => {
          const isExpanded = expandedDays.includes(item.day)

          return (
            <div key={index} className="relative">
              {/* Timeline dot and line */}
              <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col items-center">
                <div className="text-teal-600 z-10">
                  <FaMapMarkerAlt size={20} />
                </div>
                {index < itinerary.length - 1 && <div className="w-0.5 bg-gray-200 h-full mt-1"></div>}
              </div>

              {/* Day header */}
              <div className={`ml-10 rounded-md overflow-hidden transition-all duration-200 mb-1`}>
                <div
                  className="bg-blue-50 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDay(item.day, index)}
                >
                  <div className="flex items-center">
                    <span className="text-teal-700 font-semibold mr-2">Day {item.day.toString().padStart(2, "0")}:</span>
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <button className="text-gray-500">
                    {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                  </button>
                </div>

                {/* Day content */}
                {isExpanded && (
                  <div className="bg-white p-4 border border-gray-100 rounded-b-md">
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ItinerarySection
