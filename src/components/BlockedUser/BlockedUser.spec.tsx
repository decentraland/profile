import React from 'react'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../tests/tests'
import BlockedUser from './BlockedUser'

describe('BlockedUser', () => {
  let profileAddress: string
  let profile: Profile

  beforeEach(() => {
    profileAddress = '0x0profileAddress'
    profile = {
      avatars: [
        {
          name: 'avatarName'
        }
      ]
    } as Profile
  })

  describe('when the logged user blocked the profile', () => {
    it('should render the ban icon, the title explaining that the logged user blocked the profile, and the description', () => {
      const { getByTestId, getByText } = renderWithProviders(
        <BlockedUser profileAddress={profileAddress} isBlockedByLoggedUser={true} profile={profile} />
      )
      expect(getByTestId('ban')).toBeInTheDocument()
      expect(getByText(t('blocked.blocked_profile_title', { name: profile.avatars[0].name }))).toBeInTheDocument()
      expect(getByText(t('blocked.description'))).toBeInTheDocument()
    })
  })

  describe('when the logged user is blocked by the profile', () => {
    it('should render the ban icon, the title explaining that the logged user is blocked by the profile, and the description', () => {
      const { getByTestId, getByText } = renderWithProviders(
        <BlockedUser profileAddress={profileAddress} isBlockedByLoggedUser={false} profile={profile} />
      )
      expect(getByTestId('ban')).toBeInTheDocument()
      expect(getByText(t('blocked.blocked_logged_user_title', { name: profile.avatars[0].name }))).toBeInTheDocument()
      expect(getByText(t('blocked.description'))).toBeInTheDocument()
    })
  })
})
