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

export { convertDateToMMDDYYYY, convertDateToYYYYMMDD };
