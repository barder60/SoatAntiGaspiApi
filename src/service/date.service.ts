
export const isInTheFuture = (date: Date) => {
  const today = new Date()
  today.setHours(23, 59, 59, 998)

  return date > today
}

