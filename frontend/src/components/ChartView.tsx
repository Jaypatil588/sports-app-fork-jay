import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { styles } from '../styles/appStyles';
import type { StatsData } from '../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartViewProps {
  data: StatsData;
  chartType?: 'bar' | 'line' | 'pie';
}

const ChartView: React.FC<ChartViewProps> = ({ data, chartType = 'bar' }) => {
  // Prepare chart data from table results
  const prepareChartData = () => {
    if (!data.table || data.table.rows.length === 0) return null;

    const labels = data.table.rows.map((row) => String(row[0]));
    
    // Find the first numeric column (skip the first column which is usually labels)
    const numericColumnIndex = data.table.rows[0].findIndex(
      (cell, idx) => idx > 0 && !isNaN(Number(cell))
    );

    if (numericColumnIndex === -1) return null;

    const values = data.table.rows.map((row) => Number(row[numericColumnIndex]));

    return {
      labels,
      datasets: [
        {
          label: data.table.headers[numericColumnIndex],
          data: values,
          backgroundColor: [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(240, 147, 251, 0.8)',
            'rgba(245, 87, 108, 0.8)',
            'rgba(79, 172, 254, 0.8)',
            'rgba(250, 112, 154, 0.8)',
            'rgba(48, 207, 208, 0.8)',
          ],
          borderColor: [
            'rgb(102, 126, 234)',
            'rgb(118, 75, 162)',
            'rgb(240, 147, 251)',
            'rgb(245, 87, 108)',
            'rgb(79, 172, 254)',
            'rgb(250, 112, 154)',
            'rgb(48, 207, 208)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions: ChartOptions<'bar' | 'line' | 'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter',
            size: 12,
            weight: 600,
          },
          color: '#1e293b',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null && context.parsed.y !== undefined) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            } else if (context.parsed !== null && context.parsed !== undefined) {
              label += new Intl.NumberFormat('en-US').format(context.parsed);
            }
            return label;
          },
        },
      },
    },
    ...(chartType !== 'pie' && {
      scales: {
        x: {
          grid: {
            color: '#e2e8f0',
          },
          ticks: {
            font: {
              family: 'Inter',
            },
            color: '#64748b',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#e2e8f0',
          },
          ticks: {
            font: {
              family: 'Inter',
            },
            color: '#64748b',
          },
        },
      },
    }),
  };

  const chartData = prepareChartData();

  if (!chartData) {
    return (
      <div style={styles.chartContainer}>
        <p style={{ textAlign: 'center', color: '#64748b' }}>
          No numeric data available for chart visualization
        </p>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={chartOptions as ChartOptions<'line'>} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions as ChartOptions<'pie'>} />;
      default:
        return <Bar data={chartData} options={chartOptions as ChartOptions<'bar'>} />;
    }
  };

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>Visual Analysis</h3>
      {renderChart()}
    </div>
  );
};

export default ChartView;

