import { LucideIcon } from "lucide-react"

interface SettingsSectionProps {
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  title: string
  subtitle: string
  children: React.ReactNode
}

export function SettingsSection({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  subtitle,
  children,
}: SettingsSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#2E3A59]">{title}</h3>
          <p className="text-sm text-[#6B7280]">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
