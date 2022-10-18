
export const isInTheFuture = (date: Date) => {
  const today = new Date()
  today.setHours(23, 59, 59, 998)

  return date > today
}

export const compareTwoDates = (date1: Date, date2: Date) => {
 if(date1 > date2) return true
 else return false
}

