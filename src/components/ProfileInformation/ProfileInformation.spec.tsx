import React from 'react'
import { fireEvent } from '@testing-library/react'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { config } from '../../modules/config/config'
import { Avatar } from '../../modules/profile/types'
import { renderWithProviders } from '../../tests/tests'
import { shareButtonTestId, twitterURL as twitterLink } from './consts'
import ProfileInformation from './ProfileInformation'
import { Props } from './ProfileInformation.types'

const PROFILE_URL = config.get('PROFILE_URL', '')

jest.mock('decentraland-ui/dist/components/Profile/Profile', () => {
  const module = jest.requireActual('decentraland-ui/dist/components/Profile/Profile')
  return {
    ...module,
    Profile: () => <div></div>
  }
})

describe('ProfileInformation', () => {
  const anAddress = 'anAddress'
  const anotherAddress = 'anotherAddress'
  const avatarName = 'anAvatarName'
  const anotherAvatarName = 'anotherAvatarName'

  const renderProfileInformation = (props: Partial<Props> = {}) => {
    return renderWithProviders(
      <ProfileInformation
        profileAddress={anAddress}
        loggedInAddress={undefined}
        isSocialClientReady={false}
        onViewMore={jest.fn()}
        {...props}
      />
    )
  }

  let aProfile: Profile
  let anotherProfile: Profile

  beforeEach(() => {
    aProfile = {
      avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress } as Avatar]
    }
    anotherProfile = {
      avatars: [{ name: anotherAvatarName, userId: anotherAddress, ethAddress: anotherAddress } as Avatar]
    }
  })

  describe('when the user is logged in', () => {
    describe('and the user is checking on its own profile', () => {
      it('should render the users data', async () => {
        const { getByText, getByTestId } = renderProfileInformation({
          profileAddress: anAddress,
          loggedInAddress: anAddress,
          profile: aProfile,
          isSocialClientReady: false
        })
        expect(getByText(avatarName)).toBeInTheDocument()
        expect(getByTestId(anAddress)).toBeInTheDocument()
      })

      it('should render the actions buttons', async () => {
        const { getByTestId, getByText } = renderProfileInformation({
          profileAddress: anAddress,
          loggedInAddress: anAddress,
          profile: aProfile,
          isSocialClientReady: false
        })
        const shareButton = getByTestId(shareButtonTestId)
        fireEvent.click(shareButton)

        expect(getByText(t('profile_information.copy_link'))).toBeInTheDocument()
        expect(getByText(t('profile_information.share_on_tw'))).toBeInTheDocument()
        expect(getByText(t('profile_information.edit'))).toBeInTheDocument()
      })

      it('should open twitter with the correct URL', async () => {
        const { getByTestId, getByRole } = renderProfileInformation({
          profileAddress: anAddress,
          loggedInAddress: anAddress,
          profile: aProfile,
          isSocialClientReady: false
        })

        const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${twitterLink}${encodeURIComponent(`${t('profile_information.tw_message')} ${PROFILE_URL}${anAddress}`)}`
        )}`

        const shareButton = getByTestId(shareButtonTestId)
        fireEvent.click(shareButton)

        const twitterShareButton = getByRole('option', {
          name: t('profile_information.share_on_tw')
        })

        expect(twitterShareButton.hasAttributeNS('href', twitterURL))
      })
    })

    describe('and the user is checking other profile', () => {
      it('should render the other profile data, not the logged in', async () => {
        const { queryByText, queryByTestId } = renderProfileInformation({
          profileAddress: anotherAddress,
          loggedInAddress: anAddress,
          profile: anotherProfile,
          isSocialClientReady: false
        })
        expect(queryByText(avatarName)).not.toBeInTheDocument()
        expect(queryByTestId(anAddress)).toBeNull()

        expect(queryByText(anotherAvatarName)).toBeInTheDocument()
        expect(queryByTestId(anotherAddress)).toBeInTheDocument()
      })
    })
  })

  describe('when the user is not logged in', () => {
    describe('and the user is checking on a profile', () => {
      it('should render the profile information', async () => {
        const { queryByText, queryByTestId } = renderProfileInformation({
          profileAddress: anotherAddress,
          profile: anotherProfile,
          isSocialClientReady: false
        })

        expect(queryByText(anotherAvatarName)).toBeInTheDocument()
        expect(queryByTestId(anotherAddress)).toBeInTheDocument()
      })

      it('should not render the edit button', async () => {
        const { queryByText } = renderProfileInformation({ profileAddress: anAddress, profile: aProfile, isSocialClientReady: false })
        expect(queryByText(t('profile_information.edit'))).toBeNull()
      })

      it('should render the share buttons', async () => {
        const { getByTestId, getByText } = renderProfileInformation({
          profileAddress: anAddress,
          profile: aProfile,
          isSocialClientReady: false
        })
        const shareButton = getByTestId(shareButtonTestId)
        fireEvent.click(shareButton)

        expect(getByText(t('profile_information.copy_link'))).toBeInTheDocument()
        expect(getByText(t('profile_information.share_on_tw'))).toBeInTheDocument()
      })
    })
  })

  describe('when the avatar is not yet loaded', () => {
    it('should not render the view more button', async () => {
      const { queryByText } = renderProfileInformation({
        profile: undefined
      })
      expect(queryByText(t('profile_information.view_more'))).toBeNull()
    })
  })

  describe('when the avatar is loaded', () => {
    describe('and the user has nothing to show in the about modal', () => {
      it('should not render the view more button', async () => {
        const { queryByText } = renderProfileInformation({
          profile: {
            avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress, description: '' } as Avatar]
          }
        })
        expect(queryByText(t('profile_information.view_more'))).toBeNull()
      })
    })

    describe('and the user has some more information to show in the about modal', () => {
      it('should render the view more button', async () => {
        const { getByText } = renderProfileInformation({
          profile: {
            avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress, description: 'An awesome description' } as Avatar]
          }
        })
        expect(getByText(t('profile_information.view_more'))).toBeInTheDocument()
      })
    })

    describe('and the user has some links', () => {
      it('should render the view more button and the icons related to those links', async () => {
        const { getByTestId, getByText } = renderProfileInformation({
          profile: {
            avatars: [
              {
                name: avatarName,
                userId: anAddress,
                ethAddress: anAddress,
                links: [{ title: 'twitter', url: 'https://twitter.com/decentraland' }]
              } as Avatar
            ]
          }
        })
        expect(getByText(t('profile_information.view_more'))).toBeInTheDocument()
        expect(getByTestId('twitter')).toBeInTheDocument()
      })
    })
  })
})
