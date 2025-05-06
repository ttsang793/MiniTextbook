import Today from "../components/statistic/Today";
import TimelimeGraph from "../components/statistic/TimelineGraph";
import Percentage from "../components/statistic/Percentage";
import Top5 from "../components/statistic/Top5";
import OrderOverlay from "../components/statistic/OrderOverlay";
import React, { useState, useRef, useEffect } from 'react';

const AStatistic = () => {
  const loadingRef = useRef(true);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [onOverlay, setOnOverlay] = useState(false);

  useEffect(() => {
    if (loadingRef.current) {
      document.title = "Thống kê | Quản trị MiniTextbook";
      loadingRef.current = false;
    }
  }, []);

  function openOverlay() {
    setOnOverlay(true);
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    setOnOverlay(false);
    document.body.style.overflow = "";
  }

  return (
    <main className="mx-20">
      <OrderOverlay onOverlay={onOverlay} onClick={closeOverlay} />

      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">THỐNG KÊ</h1>
      <hr className="mb-3 border-pink-900" />

      {/* Doanh thu của hôm nay */}
      <Today />
      <hr className="mb-3 border-pink-900" />

      <div className="flex justify-between">
        <h2 className="text-pink-900 font-bold text-2xl italic mb-2">Thống kê theo khoảng thời gian: </h2>

        <div>
          <input type="date" id="date-from" className="border-1 border-zinc-400 px-2 py-1" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />&nbsp;&minus;&nbsp;
          <input type="date" id="date-to" className="border-1 border-zinc-400 px-2 py-1" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>
      
      {/* Doanh thu theo thời gian */}
      <TimelimeGraph dateFrom={dateFrom} dateTo={dateTo} />

      {/* Thị phần môn học, lớp học và bộ sách */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Percentage prop="grade" title="khối" dateFrom={dateFrom} dateTo={dateTo} />
        <Percentage prop="subject" title="môn học" dateFrom={dateFrom} dateTo={dateTo} />
        <Percentage prop="series" title="bộ sách" dateFrom={dateFrom} dateTo={dateTo} />
      </div>

      {/* Top 5 sản phẩm bán chạy nhất và khách hàng đặt nhiều đơn nhất */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6">
        <Top5 prop="top-5-books" title="TOP 5 SÁCH BÁN CHẠY NHẤT" dateFrom={dateFrom} dateTo={dateTo} />
        <Top5 prop="top-5-customers" title="TOP 5 KHÁCH HÀNG MUA NHIỀU NHẤT" dateFrom={dateFrom} dateTo={dateTo} />
      </div>

    </main>
  )
}

export default AStatistic;