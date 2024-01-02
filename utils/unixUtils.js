const ONE_MONTH = 2592000000
const ONE_DAY = 86400000
  
async function calculateFutureDate(numberOfDays,startingDateTimestamp) {
  

  const date = new Date(startingDateTimestamp + numberOfDays * ONE_DAY )
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();

// Create a formatted date string
  const futureDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

  console.log(futureDate)
  return futureDate;
}


async function unixToDateString(unix_timestamp){

    const date = new Date(unix_timestamp)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();

    const dateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    return dateString
}

module.exports={unixToDateString, calculateFutureDate, ONE_DAY}
