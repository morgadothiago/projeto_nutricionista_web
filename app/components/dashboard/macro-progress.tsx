import { cn } from "@/lib/utils"

interface MacroProgressProps {
  label: string
  current: number
  target: number
  color?: string
  unit?: string
}

export function MacroProgress({
  label,
  current,
  target,
  color = "bg-[#2DD49F]",
  unit = "g",
}: MacroProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)

  return (
    <div className="space-y-3 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#2E3A59]">{label}</span>
        <span className="text-xs font-medium text-[#6B7280]">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl sm:text-2xl font-bold text-[#2E3A59]">
          {current}{unit}
        </span>
        <span className="text-sm text-[#6B7280]">de {target}{unit}</span>
      </div>
    </div>
  )
}
