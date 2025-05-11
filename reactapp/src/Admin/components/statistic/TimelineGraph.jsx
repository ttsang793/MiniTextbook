import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const TimelimeGraph = ({dateFrom, dateTo}) => {
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/api/statistic/revenue`;
    url = url + (dateFrom === "" ? "" : `?from=${dateFrom}`);
    url = url + (dateTo === "" ? "" : (dateFrom === "" ? `?to=${dateTo}` : `&to=${dateTo}`));

    axios.get(url).then(response => {
      setLabel(response.data.label);
      setData(response.data.data);
    })
  }, [dateFrom, dateTo]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 40,
        bottom: 20
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Doanh thu theo thời gian',
        font: {
          size: 24,
          family: "Segoe UI"
        },
        padding: {
          top: 10,
          bottom: 30
        },
        color: '#861043',
        align: 'center'
      },
      legend: {
        display: false
      }
    },    
    scales: {
      x: {
        display: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#888' // Optional: lighter axis labels
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  const viewingData = {
    labels: label,
    datasets: [
      {
        label: "Doanh thu",
        data: data,
        borderColor: "rgb(70,0,0)",
        tension: 0.4,
      }
    ]
  };

  return (
    <div className='w-full h-80 box-shadow mb-5'>
      <Line options={options} data={viewingData} />
    </div>
  )
}

export default TimelimeGraph;