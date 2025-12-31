export const formatDateToLocale = (rawDate: string) => {
    const raw = new Date(rawDate)
    const year = raw.getFullYear()
    const month = (raw.getMonth() + 1).toString().padStart(2, '0')
    const date = raw.getDate().toString().padStart(2, '0')
    const hour = raw.getHours().toString().padStart(2, '0')
    const minute = raw.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${date} ${hour}:${minute}`
}