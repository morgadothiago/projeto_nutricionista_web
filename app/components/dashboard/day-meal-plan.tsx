import { MealPlanItem } from "./meal-plan-item"

interface Meal {
  time: string
  name: string
  items: string[]
}

interface DayMealPlanProps {
  dayName: string
  meals: Meal[]
}

export function DayMealPlan({ dayName, meals }: DayMealPlanProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-[#2E3A59] mb-4">{dayName}</h3>
      <div className="space-y-3">
        {meals.map((meal, index) => (
          <MealPlanItem
            key={index}
            time={meal.time}
            name={meal.name}
            items={meal.items}
          />
        ))}
      </div>
    </div>
  )
}
