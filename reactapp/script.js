function displayPrice(price) {
  try {
    return `${price.toLocaleString("vi-VN")} đ`
  }
  catch {return ""}
}

function displayDate(date) {
  try {
    return date.substring(0, date.indexOf("T"));
  }
  catch {return ""}  
}

function displayDateJS(dateJS) {
  try {
    return dateJS.toLocaleDateString("en-CA");
  }
  catch {return ""}  
}

function dateParse(date) {
  try {
    return new Date(displayDate(date).split("-"));
  }
  catch { return "" }
}

function displayStatus(status) {
  switch (status) {
    case -1: return "Đã hủy";
    case 0: return "Chưa xác nhận";
    case 1: return "Đã xác nhận";
    case 2: return "Đang giao hàng";
    case 3: return "Đã giao hàng";
    case 4: return "Đã nhận hàng";
    default: return "";
  }
}

function arrayNumber(arr) {
  for (let i = 0; i < arr.length; i++) arr[i] = Number(arr[i]);
  return arr;
}

export { displayPrice, displayDate, displayDateJS, dateParse, displayStatus, arrayNumber }