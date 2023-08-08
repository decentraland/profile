import React from 'react'
import { fireEvent } from '@testing-library/react'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { config } from '../../modules/config/config'
import { Avatar } from '../../modules/profile/types'
import { locations } from '../../modules/routing/locations'
import { renderWithProviders } from '../../tests/tests'
import { actionsForNonBlockedTestId, blockedButtonTestId, shareButtonTestId } from './constants'
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
jest.mock('decentraland-dapps/dist/modules/analytics/utils')

const getAnalyticsMock = getAnalytics as jest.Mock

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
        isBlockedByLoggedUser={false}
        hasBlockedLoggedUser={false}
        onViewMore={jest.fn()}
        {...props}
      />
    )
  }

  let aProfile: Profile
  let anotherProfile: Profile
  let renderedComponent: ReturnType<typeof renderProfileInformation>

  beforeEach(() => {
    getAnalyticsMock.mockReturnValue({
      page: jest.fn(),
      track: jest.fn()
    })

    aProfile = {
      avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress } as Avatar]
    }
    anotherProfile = {
      avatars: [{ name: anotherAvatarName, userId: anotherAddress, ethAddress: anotherAddress } as Avatar]
    }
  })

  describe('when the user is logged in', () => {
    describe('and the user is checking on its own profile', () => {
      it('should render the users data', () => {
        const { getByText, getByTestId } = renderProfileInformation({
          profileAddress: anAddress,
          loggedInAddress: anAddress,
          profile: aProfile,
          isSocialClientReady: false
        })
        expect(getByText(avatarName)).toBeInTheDocument()
        expect(getByTestId(anAddress)).toBeInTheDocument()
      })

      it('should render the actions buttons', () => {
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

      it('should not render the blocked button', () => {
        const { queryByTestId } = renderProfileInformation({
          profileAddress: anAddress,
          loggedInAddress: anAddress,
          profile: aProfile,
          isSocialClientReady: false,
          isBlockedByLoggedUser: true,
          hasBlockedLoggedUser: true
        })

        expect(queryByTestId(blockedButtonTestId)).toBeNull()
      })
    })

    describe('and the user is checking other profile', () => {
      describe('and the user is not blocked by the profile nor has blocked it', () => {
        it('should render the other profile data, not the logged in', () => {
          const { queryByText, queryByTestId } = renderProfileInformation({
            profileAddress: anotherAddress,
            loggedInAddress: anAddress,
            profile: anotherProfile,
            isSocialClientReady: false
          })
          expect(queryByText(avatarName)).not.toBeInTheDocument()
          expect(queryByTestId(anAddress)).toBeNull()
          expect(queryByTestId(blockedButtonTestId)).toBeNull()

          expect(queryByText(anotherAvatarName)).toBeInTheDocument()
          expect(queryByTestId(anotherAddress)).toBeInTheDocument()
        })

        it('should render the actions for non-blocked users', () => {
          const { getByTestId } = renderProfileInformation({
            profileAddress: anotherAddress,
            loggedInAddress: anAddress,
            profile: anotherProfile,
            isSocialClientReady: false
          })

          expect(getByTestId(actionsForNonBlockedTestId)).toBeInTheDocument()
        })
      })

      describe('and the user has blocked the profile', () => {
        it('should render some of the other profile data with a button to unblock the profile', () => {
          const { getByTestId, queryByText, queryByTestId } = renderProfileInformation({
            profileAddress: anotherAddress,
            loggedInAddress: anAddress,
            profile: anotherProfile,
            isSocialClientReady: false,
            isBlockedByLoggedUser: true
          })

          expect(queryByText(avatarName)).not.toBeInTheDocument()
          expect(queryByTestId(anAddress)).toBeNull()

          expect(getByTestId(blockedButtonTestId)).toBeInTheDocument()
          expect(queryByText(anotherAvatarName)).toBeInTheDocument()
          expect(queryByTestId(anotherAddress)).toBeInTheDocument()
        })

        it('should not render the actions for non-blocked users', () => {
          const { queryByTestId } = renderProfileInformation({
            profileAddress: anotherAddress,
            loggedInAddress: anAddress,
            profile: anotherProfile,
            isSocialClientReady: false,
            isBlockedByLoggedUser: true
          })

          expect(queryByTestId(actionsForNonBlockedTestId)).toBeNull()
        })
      })

      describe('and the user is blocked by the profile', () => {
        it('should render some of the other profile data', () => {
          const { queryByText, queryByTestId } = renderProfileInformation({
            profileAddress: anotherAddress,
            loggedInAddress: anAddress,
            profile: anotherProfile,
            isSocialClientReady: false,
            hasBlockedLoggedUser: true
          })

          expect(queryByText(avatarName)).not.toBeInTheDocument()
          expect(queryByTestId(anAddress)).toBeNull()
          expect(queryByTestId(blockedButtonTestId)).toBeNull()

          expect(queryByText(anotherAvatarName)).toBeInTheDocument()
          expect(queryByTestId(anotherAddress)).toBeInTheDocument()
        })

        it('should not render the actions for non-blocked users', () => {
          const { queryByTestId } = renderProfileInformation({
            profileAddress: anotherAddress,
            loggedInAddress: anAddress,
            profile: anotherProfile,
            isSocialClientReady: false,
            hasBlockedLoggedUser: true
          })

          expect(queryByTestId(actionsForNonBlockedTestId)).toBeNull()
        })
      })
    })
  })

  describe('when the user is not logged in', () => {
    describe('and the user is checking on a profile', () => {
      it('should render the profile information', () => {
        const { queryByText, queryByTestId } = renderProfileInformation({
          profileAddress: anotherAddress,
          profile: anotherProfile,
          isSocialClientReady: false
        })

        expect(queryByText(anotherAvatarName)).toBeInTheDocument()
        expect(queryByTestId(anotherAddress)).toBeInTheDocument()
      })

      it('should not render the edit button', () => {
        const { queryByText } = renderProfileInformation({ profileAddress: anAddress, profile: aProfile, isSocialClientReady: false })
        expect(queryByText(t('profile_information.edit'))).toBeNull()
      })

      it('should render the share buttons', () => {
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
    it('should not render the view more button', () => {
      const { queryByText } = renderProfileInformation({
        profile: undefined
      })
      expect(queryByText(t('profile_information.view_more'))).toBeNull()
    })
  })

  describe('when the avatar is loaded', () => {
    describe('and the user has nothing to show in the about modal', () => {
      it('should not render the view more button', () => {
        const { queryByText } = renderProfileInformation({
          profile: {
            avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress, description: '' } as Avatar]
          }
        })
        expect(queryByText(t('profile_information.view_more'))).toBeNull()
      })
    })

    describe('and the user has some more information to show in the about modal', () => {
      let profile: Profile

      beforeEach(() => {
        profile = {
          avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress, description: 'An awesome description' } as Avatar]
        }
      })

      describe('and neither the user nor the profile are blocked', () => {
        it('should render the view more button', () => {
          const { getByText } = renderProfileInformation({
            profile
          })
          expect(getByText(t('profile_information.view_more'))).toBeInTheDocument()
        })
      })

      describe('and the user has blocked the profile', () => {
        it('should not render the view more button', () => {
          const { getByTestId, queryByText } = renderProfileInformation({
            profile,
            isBlockedByLoggedUser: true
          })
          expect(queryByText(t('profile_information.view_more'))).toBeNull()
          expect(getByTestId(blockedButtonTestId)).toBeInTheDocument()
        })
      })

      describe('and the user is blocked by the profile', () => {
        it('should not render the view more button', () => {
          const { queryByText } = renderProfileInformation({
            profile,
            hasBlockedLoggedUser: true
          })
          expect(queryByText(t('profile_information.view_more'))).toBeNull()
        })
      })
    })

    describe('and the user has some links', () => {
      let profile: Profile

      beforeEach(() => {
        profile = {
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

      describe('and neither the user nor the profile are blocked', () => {
        describe('and there are less than three links ', () => {
          it('should render the view more button and the icons related to those links', () => {
            const { getByTestId, getByText } = renderProfileInformation({
              profile
            })
            expect(getByText(t('profile_information.view_more'))).toBeInTheDocument()
            expect(getByTestId('twitter')).toBeInTheDocument()
          })
        })

        describe('and there are exactly three links', () => {
          beforeEach(() => {
            profile.avatars[0].links = [
              { title: 'twitter', url: 'https://twitter.com/decentraland' },
              { title: 'facebook', url: 'https://facebook.com/decentraland' },
              { title: 'instagram', url: 'https://instagram.com/decentraland' }
            ]
          })

          it('should render the view more button and the icons related to those 3 links', () => {
            const { getByTestId, getByText } = renderProfileInformation({
              profile
            })
            expect(getByText(t('profile_information.view_more'))).toBeInTheDocument()
            expect(getByTestId('twitter')).toBeInTheDocument()
            expect(getByTestId('facebook')).toBeInTheDocument()
            expect(getByTestId('instagram')).toBeInTheDocument()
          })
        })

        describe('and there are more than three links ', () => {
          beforeEach(() => {
            profile.avatars[0].links = [
              { title: 'twitter', url: 'https://twitter.com/decentraland' },
              { title: 'facebook', url: 'https://facebook.com/decentraland' },
              { title: 'instagram', url: 'https://instagram.com/decentraland' },
              { title: 'github', url: 'https://github.com/decentraland' },
              { title: 'mastodon', url: 'https://mastodon.com/decentraland' }
            ]
          })

          it('should render the view more button and the icons related to the first three links', () => {
            const { getByTestId, getByText } = renderProfileInformation({
              profile
            })
            expect(getByText(t('profile_information.view_more'))).toBeInTheDocument()
            expect(getByTestId('twitter')).toBeInTheDocument()
            expect(getByTestId('facebook')).toBeInTheDocument()
            expect(getByTestId('instagram')).toBeInTheDocument()
          })
        })
      })

      describe('and the user has blocked the profile', () => {
        it('should not render the view more button or the icons related to those links', () => {
          const { getByTestId, queryByTestId, queryByText } = renderProfileInformation({
            profile,
            isBlockedByLoggedUser: true
          })
          expect(queryByText(t('profile_information.view_more'))).toBeNull()
          expect(queryByTestId('twitter')).toBeNull()
          expect(getByTestId(blockedButtonTestId)).toBeInTheDocument()
        })
      })

      describe('and the user is blocked by the profile', () => {
        it('should not render the view more button or the icons related to those links', () => {
          const { queryByTestId, queryByText } = renderProfileInformation({
            profile,
            hasBlockedLoggedUser: true
          })
          expect(queryByText(t('profile_information.view_more'))).toBeNull()
          expect(queryByTestId('twitter')).toBeNull()
        })
      })
    })
  })

  describe('when the share on twitter button is clicked', () => {
    beforeEach(() => {
      renderedComponent = renderProfileInformation({
        profileAddress: anAddress,
        loggedInAddress: anAddress,
        profile: aProfile,
        isSocialClientReady: false
      })
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should open a new page with a twitter message', () => {
      jest.spyOn(window, 'open').mockImplementation(() => null)
      const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${t('profile_information.tw_message')}${PROFILE_URL}${locations.account(anAddress)}`
      )}`

      const { getByTestId, getByText } = renderedComponent
      const dropdownButton = getByTestId(shareButtonTestId)
      const shareItem = getByText(t('profile_information.share_on_tw'))
      expect(dropdownButton).toBeInTheDocument()
      fireEvent.click(dropdownButton)
      fireEvent.click(shareItem)

      jest.runAllTimers()
      expect(window.open).toHaveBeenCalledWith(twitterURL, '_blank,noreferrer')
    })
  })
})
