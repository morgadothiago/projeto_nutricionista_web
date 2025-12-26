import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface PatientCardProps {
  id: string
  name: string
  lastCheckin: string
  status: "ativo" | "atencao" | "inativo"
}

const statusConfig = {
  ativo: {
    label: "Ativo",
    bgColor: "bg-[#E6F9F0]",
    textColor: "text-[#2DD49F]",
  },
  atencao: {
    label: "Atenção",
    bgColor: "bg-[#FFF3E0]",
    textColor: "text-[#FF8C42]",
  },
  inativo: {
    label: "Inativo",
    bgColor: "bg-gray-100",
    textColor: "text-[#6B7280]",
  },
}

export function PatientCard({ id, name, lastCheckin, status }: PatientCardProps) {
  const config = statusConfig[status]
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <Link
      href={`/dashboard/nutricionista/pacientes/${id}`}
      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-[#2DD49F] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
    >
      {/* Avatar */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#2DD49F] to-[#1FB87D] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <span className="text-white font-bold text-base sm:text-lg">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-[#2E3A59] group-hover:text-[#2DD49F] transition-colors truncate">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B7280] truncate">
          Último check-in: {lastCheckin}
        </p>
      </div>

      {/* Status Badge */}
      <div
        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${config.bgColor} ${config.textColor}`}
      >
        {config.label}
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#2DD49F] group-hover:translate-x-1 transition-all duration-300" />
    </Link>
  )
}
