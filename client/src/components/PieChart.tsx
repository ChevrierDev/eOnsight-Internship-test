import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, TooltipItem } from 'chart.js';
import { PieChartProps } from "../types/index";

Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChart: React.FC<PieChartProps & { className?: string }> = ({ data, className }) => {
  const chartData = {
    labels: ['Good', 'Fair', 'Poor', 'Bad'],
    datasets: [
      {
        label: 'Bridge Status',
        data: [data.Good, data.Fair, data.Poor, data.Bad],
        backgroundColor: ['#F2BF1B', '#F86D1B', '#900C3C', '#581A3F'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white', 
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Distribution of Bridges by Condition',
        color: 'white',
        font: {
          size: 24,
          family: 'Lato, sans-serif',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className={className}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
