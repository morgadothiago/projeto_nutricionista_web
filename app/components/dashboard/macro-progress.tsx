import { cn } from "@/lib/utils"

interface MacroProgressProps {
  label: string
  current: number
  target: number
  color?: string
}

export function MacroProgress({
  label,
  current,
  target,
  color = "bg-[#2DD49F]",
}: MacroProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#6B7280]">{label}</span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-[#FF8C42]">{current}g</span>
        <span className="text-sm text-[#6B7280]">/ {target}g</span>
      </div>
    </div>
  )
}
