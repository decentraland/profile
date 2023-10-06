import { formatWeiToMana, getMinimumValueForFractionDigits } from './mana'

describe("getMinimumValueForFractionDigits", () => {
  it.each([
    { fractionDigits: 2, minimumValue: 0.01 },
    { fractionDigits: 1, minimumValue: 0.1 },
  ])('should return $minimumValue when value is $fractionDigits', ({ fractionDigits, minimumValue }) => {
    expect(getMinimumValueForFractionDigits(fractionDigits)).toEqual(minimumValue)
  })
})

describe('formatWeiToMana', () => {
  it.each([
    { wei: '0', formattedValue: '0' },
    { wei: '1000000000000000000', formattedValue: '1' },
    { wei: '1000000000000000000000', formattedValue: '1K' },
    { wei: '600000000000000000', formattedValue: '0.6' },
    { wei: '633333330000000000', formattedValue: '0.63' }
  ])('should return $formattedValue when value is $wei', ({ wei, formattedValue }) => {
    expect(formatWeiToMana(wei)).toEqual(formattedValue)
  })
})
