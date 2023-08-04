import React from 'react'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../tests/tests'
import { View } from '../../utils/view'
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
      it('should render the avatar and the edit button', () => {
        const { getByText } = renderWithProviders(<Avatar profileAddress={anAddress} view={View.OWN} profile={aProfile} />)
        expect(getByText(t('avatar.edit'))).toBeInTheDocument()
      })
    })

    describe('and the user is checking other profile', () => {
      it('should not render the avatar and the edit button', () => {
        const { queryByText } = renderWithProviders(<Avatar profileAddress={anotherAddress} view={View.OTHER} profile={anotherProfile} />)
        expect(queryByText(t('avatar.edit'))).not.toBeInTheDocument()
      })
    })
  })

  describe('when the user is not logged in', () => {
    describe('and the user is checking on a profile', () => {
      it('should not render the avatar and the edit button', () => {
        const { queryByText } = renderWithProviders(<Avatar profileAddress={anAddress} view={View.OTHER} profile={aProfile} />)
        expect(queryByText(t('avatar.edit'))).not.toBeInTheDocument()
      })
    })

    describe("and there's no profile for the user", () => {
      it('should not render a message telling the user to edit the avatar', () => {
        const { queryByTestId } = renderWithProviders(<Avatar profileAddress={anAddress} view={View.OTHER} />)
        expect(queryByTestId('avatar-message')).not.toBeInTheDocument()
      })
    })
  })
})
