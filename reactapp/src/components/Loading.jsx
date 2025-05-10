const Loading = () => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex items-center justify-center">
      <div className="text-center">
        <img src="/mt-logo.png" alt="Mini Textbook logo" className="h-20 mx-auto animate-bounce" />
        Đang tải dữ liệu...
      </div>
    </div>
  )
}

export default Loading;