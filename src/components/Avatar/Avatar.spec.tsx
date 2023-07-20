import React from 'react'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../tests/tests'
import Avatar from './Avatar'

describe('Avatar', () => {
  const anAddress = 'anAddress'
  const anotherAddress = 'anotherAddress'
  const avatarName = 'anAvatarName'
  const anotherAvatarName = 'anotherAvatarName'

  let aProfile: Profile
  let anotherProfile: Profile

  beforeEach(() => {
    aProfile = {
      avatars: [{ name: avatarName, ethAddress: anAddress } as Profile['avatars'][0]]
    }
    anotherProfile = {
      avatars: [{ name: anotherAvatarName, ethAddress: anotherAddress } as Profile['avatars'][0]]
    }
  })

  describe('when the user is logged in', () => {
    describe('and the user is checking on its own profile', () => {
      it('should render the avatar and the edit button', async () => {
        const { getByText } = renderWithProviders(<Avatar profileAddress={anAddress} loggedInAddress={anAddress} profile={aProfile} />)
        expect(getByText(t('avatar.edit'))).toBeInTheDocument()
      })
    })

    describe('and the user is checking other profile', () => {
      it('should render the avatar and the edit button', async () => {
        const { queryByText } = renderWithProviders(
          <Avatar profileAddress={anotherAddress} loggedInAddress={anAddress} profile={anotherProfile} />
        )
        expect(queryByText(t('avatar.edit'))).not.toBeInTheDocument()
      })
    })
  })

  describe('when the user is not logged in', () => {
    describe('and the user is checking on a profile', () => {
      it('should not render the avatar and the edit button', async () => {
        const { queryByText } = renderWithProviders(<Avatar profileAddress={anAddress} profile={aProfile} />)
        expect(queryByText(t('avatar.edit'))).not.toBeInTheDocument()
      })
    })
  })
})
