interface Substitution {
  food: string
  alternatives: string
}

interface SubstitutionsCardProps {
  substitutions: Substitution[]
}

export function SubstitutionsCard({ substitutions }: SubstitutionsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-[#2E3A59] mb-4">
        Substituições permitidas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {substitutions.map((sub, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-[#6B7280]">
              <span className="font-medium text-[#2E3A59]">{sub.food}</span>
              {" → "}
              {sub.alternatives}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
