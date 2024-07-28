import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Free_Clothes: 4000,
    CSR: 2400,
  },
  {
    name: "Feb",
    Free_Clothes: 3000,
    CSR: 1398,
  },
  {
    name: "Mar",
    Free_Clothes: 2000,
    CSR: 9800,
  },
  {
    name: "Apr",
    Free_Clothes: 2780,
    CSR: 3908,
  },
  {
    name: "May",
    Free_Clothes: 1890,
    CSR: 4800,
  },
  {
    name: "Jun",
    Free_Clothes: 2390,
    CSR: 3800,
  },
];

const DoubleAreaChart = () => {
  return (
    <ResponsiveContainer height={400} className="w-full">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Free_Clothes"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="CSR"
          stackId="1"
          stroke="#2563eb"
          fill="#2563eb"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DoubleAreaChart;
