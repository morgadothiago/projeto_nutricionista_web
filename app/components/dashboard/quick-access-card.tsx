import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickAccessCardProps {
  title: string
  href: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
}

export function QuickAccessCard({
  title,
  href,
  icon: Icon,
  iconColor,
  iconBgColor,
}: QuickAccessCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group">
        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
              iconBgColor
            )}
          >
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
          <h3 className="text-sm font-semibold text-[#2E3A59]">{title}</h3>
        </div>
      </div>
    </Link>
  )
}
