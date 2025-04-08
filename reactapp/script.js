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

export { displayPrice, displayDate }