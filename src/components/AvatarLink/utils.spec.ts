import { getLinkIcon } from './utils'

describe('when getting the icon of a link', () => {
  describe('and the url domain does not have a defined icon in the icons library', () => {
    it('should return the corresponding icon', () => {
      expect(getLinkIcon('https://www.random-domain.org')).toBe('linkify')
    })
  })

  describe.each(['https://www.twitter.com', 'https://www.twitter.com.ar', 'https://www.twitter.org.ar'])(
    'and the url domain has a defined icon in the icons library',
    url => {
      it('should return the corresponding icon', () => {
        expect(getLinkIcon(url)).toBe('twitter')
      })
    }
  )
})
