import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChartComponent = ({ jsonData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (jsonData) {
      const labels = Object.keys(jsonData);
      const data = Object.values(jsonData);

      const chartData = {
        labels: labels,
        datasets: [{
          label: 'Your Exercise Score',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      };

      const chartOptions = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };

      if (chartRef.current) {
        // Destroy existing Chart instance if it exists
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        // Create new Chart instance
        const ctx = chartRef.current.getContext('2d');
        chartRef.current.chart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: chartOptions
        });
      }
    }
  }, [jsonData]);

  return (
    <div style={{ height: '50vh' }}> {/* Set height to 50% of viewport height */}
      <canvas ref={chartRef} id="myChart" style={{ height: '100%' }}></canvas> {/* Set height to 100% of parent container height */}
    </div>
  );
};

export default MyChartComponent;
