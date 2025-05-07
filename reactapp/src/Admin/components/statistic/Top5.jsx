import axios from "axios"
import React, { useState, useEffect } from 'react';

const Top5 = ({prop, post, title, dateFrom, dateTo}) => {  
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/admin/statistic/${prop}`;
    url = url + (dateFrom === "" ? "" : `?from=${dateFrom}`);
    url = url + (dateTo === "" ? "" : (dateFrom === "" ? `?to=${dateTo}` : `&to=${dateTo}`));

    axios.get(url).then(response => {
      setLabel(response.data.label);
      setData(response.data.data);
    })
  }, [dateFrom, dateTo]);

  return (
    <div className="box-shadow">
      <h3 className="text-center text-xl font-bold text-pink-900 my-2">{title}</h3>

      <ol className="mx-2 mb-4">
        {
          label.map((l, i) =>
            (i + 1 < 4) ? (
              <li className="flex gap-x-2 items-center justify-between bg-pink-200 px-2 py-1" key={prop + "_" + (i + 1)}>
                <span className="bg-pink-700 text-white rounded-full px-3 py-1">{i + 1}</span>
                <p className="text-left flex-1">{l}</p>
      
                <a href={`/quan-tri/don-hang?${post}=${data[i]}`} className="bg-pink-900 text-pink-50 hover:bg-pink-800 duration-150 cursor-pointer px-2 py-1">
                  Xem đơn hàng
                </a>
              </li>
            ) : (
              <li className="flex gap-x-2 items-center justify-between px-2 py-1" key={prop + "_" + (i + 1)}>
                <span className="bg-pink-200 rounded-full px-3 py-1">{i + 1}</span>
                <p className="text-left flex-1">{l}</p>

                <a href={`/quan-tri/don-hang?${post}=${data[i]}`} className="bg-pink-900 text-pink-50 hover:bg-pink-800 duration-150 cursor-pointer px-2 py-1">
                  Xem đơn hàng
                </a>
              </li>
            )
          )
        }
      </ol>
    </div>
  )

}

export default Top5