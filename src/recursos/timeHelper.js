function getFormatTime(value) {
  if (value) {
    let date = new Date(value);
    const hour = date.toLocaleTimeString().split(":")[0];
    const minutes = date.toLocaleTimeString().split(":")[1];
    let timeAMorPM = date.toLocaleTimeString().split(" ")[1];
    if (!timeAMorPM) {
      timeAMorPM = "";
    }
    return `${hour}:${minutes} ${timeAMorPM}`;
  } else {
    return "00:00";
  }
}
function getFormatFecha(time) {
  if (time) {
    let date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, `;
  } else {
    return "0/0/0";
  }
}
export { getFormatTime, getFormatFecha };
