import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Percentage = ({prop, title, dateFrom, dateTo}) => {
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/api/statistic/${prop}`;
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
    plugins: {
      title: {
        display: true,
        text: `Thị phần theo ${title}`,
        font: {
          size: 22,
          family: "Segoe UI"
        },
        padding: {
          top: 10,
          bottom: 5,
        },
        color: '#861043',
        align: 'center'
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "rgb(70,70,70)",          
          font: {
            size: 16,
            family: "Segoe UI",
            style: "italic"
          },
        }
      }
    }
  };

  const viewingData = {
    labels: label,
    datasets: [
      {
        data: data,
        backgroundColor: ['#9E0142', '#F46D43', '#FEE08B', '#ABDDA4', '#3288BD', '#5E4FA2', '#66C2A5', '#E6F598', '#FDAE61', '#D53E4F'],
        hoverOffset: 4
      }
    ]
  }

  return (
    <div className='w-full h-70 box-shadow'>
      <Doughnut options={options} data={viewingData} />
    </div>
  )
}

export default Percentage;