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
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#2DD49F] hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-[#2DD49F] flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-lg">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#2E3A59] group-hover:text-[#2DD49F] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-[#6B7280]">Último check-in: {lastCheckin}</p>
      </div>

      {/* Status Badge */}
      <div
        className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}
      >
        {config.label}
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#2DD49F] transition-colors" />
    </Link>
  )
}
