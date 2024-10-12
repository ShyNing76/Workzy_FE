// Format date (MM/DD/YYYY)
const convertDateToMMDDYYYY = (dateStr) => {
  // Split the date string by '-'
  let parts = dateStr.split("-");

  let year = parts[0];
  let month = parts[1];
  let day = parts[2];

  // Ensure month and day are two digits
  month = month.length > 1 ? month : "0" + month;
  day = day.length > 1 ? day : "0" + day;

  // Return the formatted date
  return month + "/" + day + "/" + year;
};

// Format date (yyyy/MM/dd) | Input (MM/dd/YYYY)
const convertDateToYYYYMMDD = (dateString) => {
  if (dateString.includes("-")) {
    const [month, day, year] = dateString.split("-");

    return `${year}-${month}-${day}`;
  } else {
    const [month, day, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  }
};

const formatDateTime = (date) => {
  // Get the year, month, day, hour, and minute
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Get the timezone offset in hours (e.g., +07:00 or -07:00)
  const timezoneOffset = date.getTimezoneOffset(); // in minutes
  const absoluteOffset = Math.abs(timezoneOffset);
  const offsetHours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0");
  const offsetMinutes = String(absoluteOffset % 60).padStart(2, "0");
  const timezone = `${
    timezoneOffset <= 0 ? "+" : "-"
  }${offsetHours}:${offsetMinutes}`;

  // Format the date as yyyy_mm_ddThh:mm+07:00
  return `${year}_${month}_${day}T${hours}:${minutes}${timezone}`;
};

export { convertDateToMMDDYYYY, convertDateToYYYYMMDD, formatDateTime };
