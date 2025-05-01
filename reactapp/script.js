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

function arrayNumber(arr) {
  for (let i = 0; i < arr.length; i++) arr[i] = Number(arr[i]);
  return arr;
}

export { displayPrice, displayDate, arrayNumber }