import { Lightbulb } from "lucide-react"

interface TipOfTheDayProps {
  tip: string
}

export function TipOfTheDay({ tip }: TipOfTheDayProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-[#FF8C42]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#2E3A59] mb-2">Dica do dia</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">{tip}</p>
        </div>
      </div>
    </div>
  )
}
