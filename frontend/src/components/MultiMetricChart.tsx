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
  RadialLinearScale,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';
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
  ArcElement,
  RadialLinearScale
);

interface MultiMetricChartProps {
  data: StatsData;
  sport: string;
}

// Define colors for different metrics
const metricColors = [
  { bg: 'rgba(102, 126, 234, 0.8)', border: 'rgb(102, 126, 234)' },
  { bg: 'rgba(245, 87, 108, 0.8)', border: 'rgb(245, 87, 108)' },
  { bg: 'rgba(79, 172, 254, 0.8)', border: 'rgb(79, 172, 254)' },
  { bg: 'rgba(250, 112, 154, 0.8)', border: 'rgb(250, 112, 154)' },
  { bg: 'rgba(48, 207, 208, 0.8)', border: 'rgb(48, 207, 208)' },
  { bg: 'rgba(118, 75, 162, 0.8)', border: 'rgb(118, 75, 162)' },
  { bg: 'rgba(240, 147, 251, 0.8)', border: 'rgb(240, 147, 251)' },
];

// Sport-specific emojis for visual identification
const sportEmojis: Record<string, string> = {
  Cricket: '🏏',
  Soccer: '⚽',
  Tennis: '🎾',
  F1: '🏎️',
  Basketball: '🏀',
};

const MultiMetricChart: React.FC<MultiMetricChartProps> = ({ data, sport }) => {
  // Extract all numeric columns with their indices
  const getNumericColumns = () => {
    if (!data.table || data.table.rows.length === 0) return [];

    const numericCols: { index: number; header: string; values: number[] }[] = [];

    data.table.headers.forEach((header, idx) => {
      if (idx === 0) return; // Skip first column (labels)

      const values = data.table.rows.map((row) => {
        const value = row[idx];
        const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : Number(value);
        return isNaN(num) ? 0 : num;
      });

      // Check if column has at least some numeric values
      const hasNumericData = values.some((v) => v !== 0);
      if (hasNumericData) {
        numericCols.push({ index: idx, header, values });
      }
    });

    return numericCols;
  };

  // Determine if a metric should use a specific chart type
  const getChartTypeForMetric = (metricName: string): 'bar' | 'line' | 'radar' => {
    const lower = metricName.toLowerCase();

    // Rates, averages, percentages -> Line chart
    if (lower.includes('rate') || lower.includes('average') || lower.includes('%') || lower.includes('avg')) {
      return 'line';
    }

    // Comparison metrics -> Radar chart (if multiple players/teams)
    if (data.table.rows.length <= 5 && lower.includes('comparison')) {
      return 'radar';
    }

    // Default to bar
    return 'bar';
  };

  // Create chart data for a single metric
  const createChartData = (column: { index: number; header: string; values: number[] }, colorIndex: number) => {
    const labels = data.table.rows.map((row) => String(row[0]));
    const color = metricColors[colorIndex % metricColors.length];

    return {
      labels,
      datasets: [
        {
          label: column.header,
          data: column.values,
          backgroundColor: color.bg,
          borderColor: color.border,
          borderWidth: 2,
          tension: 0.3, // For smooth lines
        },
      ],
    };
  };

  // Bar chart options
  const getBarChartOptions = (metricName: string): ChartOptions<'bar'> => ({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
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
        display: true,
        text: metricName,
        font: {
          family: 'Inter',
          size: 16,
          weight: 700,
        },
        color: '#1e293b',
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            return label;
          },
        },
      },
    },
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
  });

  // Line chart options
  const getLineChartOptions = (metricName: string): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
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
        display: true,
        text: metricName,
        font: {
          family: 'Inter',
          size: 16,
          weight: 700,
        },
        color: '#1e293b',
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            return label;
          },
        },
      },
    },
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
  });

  const radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
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
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += new Intl.NumberFormat('en-US').format(context.parsed.r);
            return label;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Inter',
          },
          color: '#64748b',
        },
        grid: {
          color: '#e2e8f0',
        },
      },
    },
  };

  // Create comparison chart with multiple metrics
  const createComparisonChart = (columns: { index: number; header: string; values: number[] }[]) => {
    const labels = data.table.rows.map((row) => String(row[0]));

    const datasets = columns.map((col, idx) => {
      const color = metricColors[idx % metricColors.length];
      return {
        label: col.header,
        data: col.values,
        backgroundColor: color.bg,
        borderColor: color.border,
        borderWidth: 2,
      };
    });

    return { labels, datasets };
  };

  const numericColumns = getNumericColumns();

  if (numericColumns.length === 0) {
    return (
      <div style={{ ...styles.chartContainer, textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>No numeric data available for visualization</p>
      </div>
    );
  }

  const sportEmoji = sportEmojis[sport] || '📊';

  // If we have multiple metrics, show them separately
  if (numericColumns.length > 1 && numericColumns.length <= 6) {
    return (
      <div>
        {/* Multi-metric comparison chart */}
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>{sportEmoji} All Metrics Comparison</h3>
          <Bar data={createComparisonChart(numericColumns)} options={getBarChartOptions('Overall Performance')} />
        </div>

        {/* Individual metric charts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem',
            marginTop: '1.5rem',
          }}
        >
          {numericColumns.map((col, idx) => {
            const chartType = getChartTypeForMetric(col.header);
            const chartData = createChartData(col, idx);

            return (
              <div key={idx} style={styles.chartContainer}>
                {chartType === 'line' ? (
                  <Line data={chartData} options={getLineChartOptions(col.header)} />
                ) : chartType === 'radar' && data.table.rows.length <= 5 ? (
                  <Radar data={chartData} options={radarOptions} />
                ) : (
                  <Bar data={chartData} options={getBarChartOptions(col.header)} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Single metric or too many metrics - show comparison chart only
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{sportEmoji} Visual Analysis</h3>
      <Bar data={createComparisonChart(numericColumns)} options={getBarChartOptions('Statistics Overview')} />
    </div>
  );
};

export default MultiMetricChart;

