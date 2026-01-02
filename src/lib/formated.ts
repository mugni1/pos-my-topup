export const formatRupiah = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '') // Hapus semua karakter non-digit
    const numberValue = parseInt(cleanValue || '0', 10) // Konversi ke number
    return new Intl.NumberFormat('id-ID').format(numberValue) // Format ke Rupiah
}
export const parseRupiah = (formattedValue: string): number => {
    return parseInt(formattedValue.replace(/\./g, ''), 10) || 0
}