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
    <Link href={href} className="group">
      <div className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer h-full">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div
            className={cn(
              "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
              iconBgColor
            )}
          >
            <Icon className={cn("w-7 h-7 sm:w-8 sm:h-8", iconColor)} />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-[#2E3A59] text-center">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}
