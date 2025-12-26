interface MealPlanItemProps {
  time: string
  name: string
  items: string[]
}

export function MealPlanItem({ time, name, items }: MealPlanItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
      {/* Time Badge */}
      <div className="w-16 h-10 rounded-lg bg-[#2DD49F] flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-sm">{time}</span>
      </div>

      {/* Meal Details */}
      <div className="flex-1">
        <h4 className="font-bold text-[#2E3A59] mb-2">{name}</h4>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-[#6B7280] flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
