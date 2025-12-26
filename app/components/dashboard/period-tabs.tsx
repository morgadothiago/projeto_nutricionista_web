"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PeriodTabsProps {
  onChange?: (period: string) => void
}

export function PeriodTabs({ onChange }: PeriodTabsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("30D")

  const periods = ["7D", "30D", "90D", "Personalizado"]

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    onChange?.(period)
  }

  return (
    <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 w-fit">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => handlePeriodChange(period)}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            selectedPeriod === period
              ? "bg-[#2DD49F] text-white shadow-sm"
              : "text-[#6B7280] hover:text-[#2E3A59]"
          )}
        >
          {period}
        </button>
      ))}
    </div>
  )
}
