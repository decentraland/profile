import { formatFact } from './utils'

describe('when formatting a fact', () => {
  describe('and the fact needs a different format from its original version', () => {
    const birthdate = new Date('1990-01-01')
    it('should return the formatted value', () => {
      expect(formatFact('birthdate', birthdate.getTime())).toBe(birthdate.toLocaleDateString())
    })
  })

  describe('and the fact does not need a different format from its original version', () => {
    const country = 'aCountry'
    it('should return the original value', () => {
      expect(formatFact('country', country)).toBe(country)
    })
  })
})
