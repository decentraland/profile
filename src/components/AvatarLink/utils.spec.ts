import { getLinkIcon } from './utils'

describe('when getting the icon of a link', () => {
  describe('and the url domain does not have a defined icon in the icons library', () => {
    it('should return the corresponding icon', () => {
      expect(getLinkIcon('https://www.random-domain.org')).toBe('linkify')
    })
  })

  describe('and the url domain has a defined icon in the icons library', () => {
    it('should return the corresponding icon', () => {
      // TODO: what about this? expect(getLinkIcon('https://www.twitter.com.ar')).toBe('linkify')
      expect(getLinkIcon('https://www.twitter.com')).toBe('twitter')
    })
  })
})
