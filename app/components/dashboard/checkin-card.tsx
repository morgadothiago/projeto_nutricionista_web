interface CheckinCardProps {
  date: string
  weight: number
  waist: number
  hip: number
  bodyFat: number
  notes: string
  isRecent?: boolean
}

export function CheckinCard({
  date,
  weight,
  waist,
  hip,
  bodyFat,
  notes,
  isRecent = false,
}: CheckinCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#2E3A59]">{date}</h3>
        {isRecent && (
          <span className="px-3 py-1 bg-[#E6F9F0] text-[#2DD49F] text-xs font-semibold rounded-full">
            Mais recente
          </span>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-[#6B7280] mb-1">Peso</p>
          <p className="text-xl font-bold text-[#2E3A59]">{weight} kg</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-[#6B7280] mb-1">Cintura</p>
          <p className="text-xl font-bold text-[#2E3A59]">{waist} cm</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-[#6B7280] mb-1">Quadril</p>
          <p className="text-xl font-bold text-[#2E3A59]">{hip} cm</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-[#6B7280] mb-1">% Gordura</p>
          <p className="text-xl font-bold text-[#2E3A59]">{bodyFat}%</p>
        </div>
      </div>

      {/* Notes */}
      <p className="text-sm text-[#6B7280] italic">{notes}</p>
    </div>
  )
}
