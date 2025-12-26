"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-[#2E3A59] mb-6">Evolução do Peso</h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-[#6B7280] mb-1">Peso inicial</p>
          <p className="text-2xl font-bold text-[#2E3A59]">{initialWeight} kg</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-[#6B7280] mb-1">Peso atual</p>
          <p className="text-2xl font-bold text-[#2DD49F]">{currentWeight} kg</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-[#6B7280] mb-1">Perdido</p>
          <p className="text-2xl font-bold text-[#2DD49F]">{weightLost} kg</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
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
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: '#2E3A59', fontWeight: 'bold' }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#2DD49F"
              strokeWidth={3}
              dot={{ fill: '#2DD49F', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
