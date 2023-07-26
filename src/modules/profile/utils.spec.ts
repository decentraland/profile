import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { getAvatarName } from './utils'

type Avatar = Profile['avatars'][0]

let avatar: Avatar | undefined

describe("when getting an avatar's name", () => {
  describe('and the avatar is undefined', () => {
    beforeEach(() => {
      avatar = undefined
    })

    it('should return default name without last part', () => {
      expect(getAvatarName(avatar)).toEqual({ name: t('profile_information.default_name') })
    })
  })

  describe('and the avatar is defined', () => {
    beforeEach(() => {
      avatar = {
        userId: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
        name: 'aName'
      } as Avatar
    })

    describe('and the name is claimed', () => {
      beforeEach(() => {
        avatar = { ...avatar, hasClaimedName: true } as Avatar
      })

      it("should return the avatar's name without last part", () => {
        expect(getAvatarName(avatar)).toEqual({ name: avatar?.name })
      })
    })

    describe('and the name was not claimed', () => {
      let lastPart: string

      beforeEach(() => {
        avatar = { ...avatar, hasClaimedName: false } as Avatar
        lastPart = `#${avatar?.userId.slice(-4)}`
      })

      describe('and the name has a last part', () => {
        let avatarName: string

        beforeEach(() => {
          avatarName = avatar?.name ?? ''
          avatar = { ...avatar, name: avatarName + lastPart } as Avatar
        })

        it("should return the avatar's name and the last part", () => {
          expect(getAvatarName(avatar)).toEqual({ name: avatarName, lastPart })
        })
      })

      describe('and the name does not have a last part', () => {
        it("should return the avatar's name with the last part", () => {
          expect(getAvatarName(avatar)).toEqual({ name: avatar?.name, lastPart })
        })
      })
    })
  })
})
