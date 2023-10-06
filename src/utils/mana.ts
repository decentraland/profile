import { formatEther } from 'ethers'

const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export function getMinimumValueForFractionDigits(maximumFractionDigits: number) {
  return Math.pow(10, -maximumFractionDigits)
}

export function formatWeiToMana(wei: string): string {
  const value = Number(formatEther(wei))

  if (value === 0) {
    return '0'
  }

  const fixedValue = value.toLocaleString(undefined, {
    maximumFractionDigits: 2
  })

  if (fixedValue === '0') {
    return getMinimumValueForFractionDigits(2).toString()
  }

  return formatter.format(value)
}
