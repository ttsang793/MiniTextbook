const AOrder = () => {
  return (
    <main className="mx-20">
      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">QUẢN LÝ ĐƠN HÀNG</h1>
      <hr className="mb-3 border-pink-900" />

      <table className="text-center w-full">
        <thead>
          <tr className="bg-linear-to-r from-pink-700 to-pink-900">
            <th className="text-pink-50 py-1">ID</th>
            <th className="text-pink-50 py-1">Ngày đặt hàng</th>
            <th className="text-pink-50 py-1">Ngày xác nhận</th>
            <th className="text-pink-50 py-1">Ngày nhận hàng</th>
            <th className="text-pink-50 py-1">Trạng thái</th>
            <th className="text-pink-50 py-1">Tổng</th>
            <th className="text-pink-50 py-1"></th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </main>
  )
}

export default AOrder;