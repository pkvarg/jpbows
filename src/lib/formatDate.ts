export default function formatDate(isoString: Date) {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = date.getFullYear()

  // Time components
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

// Example usage:
// const formattedDate = formatDate("2025-02-28T07:31:54.018Z");
// console.log(formattedDate); // Output: 28/02/2025
