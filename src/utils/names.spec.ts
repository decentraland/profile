import { isNameValid } from './names'

describe('when checking if a name is valid', () => {
  let name: string

  describe('and the name contains invalid characters', () => {
    beforeEach(() => {
      name = '.$%&/()=?¿'
    })

    it('should return false', () => {
      expect(isNameValid(name)).toBe(false)
    })
  })

  describe('and the name does not include invalid characters', () => {
    beforeEach(() => {
      name = 'name'
    })

    describe('and includes the decentraland subdomain', () => {
      beforeEach(() => {
        name = name + '.dcl.eth'
      })

      it('should return true', () => {
        expect(isNameValid(name)).toBe(true)
      })
    })

    describe('and includes another domain', () => {
      beforeEach(() => {
        name = name + '.eth'
      })

      it('should return false', () => {
        expect(isNameValid(name)).toBe(false)
      })
    })

    describe('and includes no domain information', () => {
      it('should return true', () => {
        expect(isNameValid(name)).toBe(true)
      })
    })
  })
})
