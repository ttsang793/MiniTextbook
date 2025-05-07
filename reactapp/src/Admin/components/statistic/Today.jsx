import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MopedFront, HandArrowDown, ReceiptX, CurrencyCircleDollar } from "@phosphor-icons/react";
import { displayDateJS, displayPrice } from "/script"

const Today = () => {
  const [delivering, setDelivering] = useState(0);
  const [complete, setComplete] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const today = displayDateJS(new Date());

  useEffect(() => {
    axios.get("/admin/statistic/today").then(response => {
      const data = response.data;
      setDelivering(data.delivering);
      setComplete(data.complete);
      setCanceled(data.canceled);
      setRevenue(data.revenue);
    })
  }, []);

  return (
    <>
      <h2 className="text-pink-900 font-bold text-2xl italic mb-2">Thống kê ngày {new Date().toLocaleDateString("fr-FR")}:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_2fr] gap-4 mb-6">
        <a href="/quan-tri/don-hang?status=2" className="box-shadow text-center px-4 py-2 hover:bg-pink-100 duration-150">
          <MopedFront size={64} weight="fill" className="mx-auto" />
          <div className="italic text-lg">Cần vận chuyển</div>
          <div className="text-3xl font-bold text-pink-900">{delivering}</div>
        </a>
        
        <a href={`/quan-tri/don-hang?status=4&dateReceived=${today}`} className="box-shadow text-center px-4 py-2 hover:bg-pink-100 duration-150">
          <HandArrowDown size={64} weight="fill" className="mx-auto" />
          <div className="italic text-lg">Đã vận chuyển</div>
          <div className="text-3xl font-bold text-pink-900">{complete}</div>
        </a>

        <a href={`/quan-tri/don-hang?status=-1&dateCanceled=${today}`} className="box-shadow text-center px-4 py-2 hover:bg-pink-100 duration-150">
          <ReceiptX size={64} weight="fill" className="mx-auto" />
          <div className="italic text-lg">Số đơn bị hủy</div>
          <div className="text-3xl font-bold text-pink-900">{canceled}</div>
        </a>

        <a href={`/quan-tri/don-hang?status=4&dateReceived=${today}`} className="box-shadow text-center px-4 py-2 hover:bg-pink-100 duration-150">
          <CurrencyCircleDollar size={64} weight="fill" className="mx-auto" />
          <div className="italic text-lg">Doanh thu</div>
          <div className="text-3xl font-bold text-pink-900">{displayPrice(revenue)}</div>
        </a>
      </div>
    </>
  )
}

export default Today;