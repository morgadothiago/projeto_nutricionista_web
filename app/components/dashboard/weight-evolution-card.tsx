"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface WeightEvolutionCardProps {
  initialWeight: number
  currentWeight: number
  weightLost: number
  data: Array<{ date: string; weight: number }>
}

export function WeightEvolutionCard({
  initialWeight,
  currentWeight,
  weightLost,
  data,
}: WeightEvolutionCardProps) {
  const weightChange = weightLost !== 0 ? (weightLost > 0 ? "+" : "") + weightLost : weightLost
  const isLoss = weightLost < 0

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl sm:text-2xl font-bold text-[#2E3A59] mb-6 sm:mb-8">
        Evolução do Peso
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl sm:rounded-2xl hover:shadow-sm transition-shadow duration-200">
          <p className="text-xs sm:text-sm font-medium text-[#6B7280] mb-2">
            Peso inicial
          </p>
          <p className="text-xl sm:text-3xl font-bold text-[#2E3A59]">
            {initialWeight} <span className="text-base sm:text-xl font-semibold">kg</span>
          </p>
        </div>
        <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-[#E6F9F0] to-[#D0F5E5] rounded-xl sm:rounded-2xl hover:shadow-sm transition-shadow duration-200">
          <p className="text-xs sm:text-sm font-medium text-[#1FB87D] mb-2">
            Peso atual
          </p>
          <p className="text-xl sm:text-3xl font-bold text-[#2DD49F]">
            {currentWeight} <span className="text-base sm:text-xl font-semibold">kg</span>
          </p>
        </div>
        <div className={cn(
          "text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:shadow-sm transition-shadow duration-200",
          isLoss
            ? "bg-gradient-to-br from-[#E6F9F0] to-[#D0F5E5]"
            : "bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2]"
        )}>
          <p className={cn(
            "text-xs sm:text-sm font-medium mb-2",
            isLoss ? "text-[#1FB87D]" : "text-[#E67830]"
          )}>
            {isLoss ? "Perdido" : "Ganho"}
          </p>
          <p className={cn(
            "text-xl sm:text-3xl font-bold",
            isLoss ? "text-[#2DD49F]" : "text-[#FF8C42]"
          )}>
            {Math.abs(weightLost)} <span className="text-base sm:text-xl font-semibold">kg</span>
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '12px',
              }}
              labelStyle={{ color: '#2E3A59', fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#2DD49F"
              strokeWidth={3}
              dot={{ fill: '#2DD49F', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, fill: '#1FB87D', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
