interface FoodItemProps {
  name: string
  portion: string
  carbs: number
  protein: number
  fat: number
  calories: number
}

export function FoodItem({
  name,
  portion,
  carbs,
  protein,
  fat,
  calories,
}: FoodItemProps) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <h4 className="font-semibold text-[#2E3A59] mb-1">{name}</h4>
        <p className="text-sm text-[#6B7280] mb-2">{portion}</p>
        <div className="flex gap-4 text-xs text-[#6B7280]">
          <span>C: {carbs}g</span>
          <span>P: {protein}g</span>
          <span>G: {fat}g</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold text-[#2E3A59]">{calories} kcal</span>
      </div>
    </div>
  )
}
