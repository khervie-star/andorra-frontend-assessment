import React from 'react';
import {
    Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

interface IChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
}

export const Chart: React.FC<IChartProps> = ({
  data,
  xKey,
  yKey,
  color = "#6366f1",
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          fill={color}
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
