import { MacroProgress } from "./macro-progress"

interface DailyCaloriesCardProps {
  currentCalories: number
  targetCalories: number
  macros: {
    carbs: { current: number; target: number }
    protein: { current: number; target: number }
    fat: { current: number; target: number }
  }
}

export function DailyCaloriesCard({
  currentCalories,
  targetCalories,
  macros,
}: DailyCaloriesCardProps) {
  const caloriesPercentage = Math.min(
    (currentCalories / targetCalories) * 100,
    100
  )

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="space-y-6 sm:space-y-8">
        {/* Calorias totais */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2E3A59]">
              Calorias diárias
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-[#FF8C42]">
                {currentCalories}
              </span>
              <span className="text-base sm:text-lg text-[#6B7280]">
                / {targetCalories} kcal
              </span>
            </div>
          </div>
          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2DD49F] to-[#1FB87D] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${caloriesPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#6B7280]">
              {caloriesPercentage.toFixed(0)}% da meta
            </span>
            <span className="text-sm font-medium text-[#2E3A59]">
              Meta: {targetCalories} kcal
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-100" />

        {/* Macros */}
        <div>
          <h4 className="text-lg font-semibold text-[#2E3A59] mb-4">
            Macronutrientes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MacroProgress
              label="Carboidratos"
              current={macros.carbs.current}
              target={macros.carbs.target}
              color="bg-gradient-to-r from-[#4A90E2] to-[#357ABD]"
            />
            <MacroProgress
              label="Proteína"
              current={macros.protein.current}
              target={macros.protein.target}
              color="bg-gradient-to-r from-[#FF8C42] to-[#E67830]"
            />
            <MacroProgress
              label="Gordura"
              current={macros.fat.current}
              target={macros.fat.target}
              color="bg-gradient-to-r from-[#9B59B6] to-[#8E44AD]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
