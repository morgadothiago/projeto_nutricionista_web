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
    <div className="inline-flex gap-1.5 sm:gap-2 bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => handlePeriodChange(period)}
          className={cn(
            "px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap",
            selectedPeriod === period
              ? "bg-[#2DD49F] text-white shadow-md scale-105"
              : "text-[#6B7280] hover:text-[#2E3A59] hover:bg-gray-50"
          )}
        >
          {period}
        </button>
      ))}
    </div>
  )
}
