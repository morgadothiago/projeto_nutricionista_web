import { Info } from "lucide-react"

interface NutritionistNotesProps {
  notes: string
}

export function NutritionistNotes({ notes }: NutritionistNotesProps) {
  return (
    <div className="bg-[#E6F9F0] rounded-2xl p-6 border border-[#2DD49F]/20">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#2DD49F] flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#2E3A59] mb-2">
            Observações do nutricionista
          </h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">{notes}</p>
        </div>
      </div>
    </div>
  )
}
