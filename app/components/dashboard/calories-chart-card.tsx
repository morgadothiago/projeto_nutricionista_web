"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface CaloriesChartCardProps {
  data: Array<{ date: string; calories: number }>
  goal: number
}

export function CaloriesChartCard({ data, goal }: CaloriesChartCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-[#2E3A59] mb-6">
        Calorias Ingeridas vs Meta
      </h3>

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
              domain={[0, 'dataMax + 500']}
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
            <ReferenceLine
              y={goal}
              stroke="#2DD49F"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: `Meta: ${goal}`,
                position: 'right',
                fill: '#2DD49F',
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="calories"
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
