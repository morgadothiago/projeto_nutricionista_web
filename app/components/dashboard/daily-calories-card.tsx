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
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="space-y-6">
        {/* Calorias totais */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#2E3A59]">
              Calorias diárias
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#FF8C42]">
                {currentCalories}
              </span>
              <span className="text-sm text-[#6B7280]">
                / {targetCalories} kcal
              </span>
            </div>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2DD49F] rounded-full transition-all duration-500"
              style={{ width: `${caloriesPercentage}%` }}
            />
          </div>
          <div className="text-right">
            <span className="text-xs text-[#6B7280]">
              Meta: {targetCalories} kcal
            </span>
          </div>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MacroProgress
            label="Carboidratos"
            current={macros.carbs.current}
            target={macros.carbs.target}
            color="bg-[#2DD49F]"
          />
          <MacroProgress
            label="Proteína"
            current={macros.protein.current}
            target={macros.protein.target}
            color="bg-[#2DD49F]"
          />
          <MacroProgress
            label="Gordura"
            current={macros.fat.current}
            target={macros.fat.target}
            color="bg-[#2DD49F]"
          />
        </div>
      </div>
    </div>
  )
}
