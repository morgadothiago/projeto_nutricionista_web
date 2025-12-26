"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { FoodItem } from "./food-item"

interface FoodItemData {
  name: string
  portion: string
  carbs: number
  protein: number
  fat: number
  calories: number
}

interface MealCardProps {
  time: string
  name: string
  foodCount: number
  calories: number
  foods?: FoodItemData[]
}

export function MealCard({
  time,
  name,
  foodCount,
  calories,
  foods = [],
}: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 hover:bg-gray-50 transition-all duration-300 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Time Badge */}
            <div className="w-14 h-14 rounded-2xl bg-[#2DD49F] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{time}</span>
            </div>

            {/* Meal Info */}
            <div className="text-left">
              <h3 className="text-lg font-bold text-[#2E3A59] mb-1">{name}</h3>
              <p className="text-sm text-[#6B7280]">{foodCount} alimentos</p>
            </div>
          </div>

          {/* Calories and Arrow */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-[#2E3A59]">
              {calories} kcal
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#6B7280] group-hover:text-[#2DD49F] transition-colors" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B7280] group-hover:text-[#2DD49F] transition-colors" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Content - Food Items */}
      {isExpanded && foods.length > 0 && (
        <div className="px-6 pb-6 pt-0">
          <div className="bg-gray-50 rounded-xl p-4">
            {foods.map((food, index) => (
              <FoodItem
                key={index}
                name={food.name}
                portion={food.portion}
                carbs={food.carbs}
                protein={food.protein}
                fat={food.fat}
                calories={food.calories}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
