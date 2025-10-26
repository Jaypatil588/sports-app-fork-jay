import React from 'react';
import { styles } from '../styles/appStyles';
import type { StatsData } from '../types';

interface ResultsTableProps {
  data: StatsData;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  if (!data.table || data.table.rows.length === 0) return null;

  return (
    <div>
      <h3 style={styles.chartTitle}>Detailed Statistics</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            {data.table.headers.map((header, index) => (
              <th key={index} style={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.table.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{ transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={styles.td}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;

