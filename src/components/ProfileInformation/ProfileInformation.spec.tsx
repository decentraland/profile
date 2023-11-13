import React from 'react'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { config } from '../../modules/config/config'
import { Avatar } from '../../modules/profile/types'
import { locations } from '../../modules/routing/locations'
import { renderWithProviders } from '../../tests/tests'
import { FRIENDS_COUNTER_DATA_TEST_ID } from '../FriendsCounter'
import { MAX_DESCRIPTION_LENGTH, actionsForNonBlockedTestId, blockedButtonTestId, shareButtonTestId, walletTestId } from './constants'
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

  const renderProfileInformation = (props: Partial<Props> = {}, preloadedState = {}) => {
    return renderWithProviders(
      <ProfileInformation
        profileAddress={anAddress}
        loggedInAddress={undefined}
        isSocialClientReady={false}
        isBlockedByLoggedUser={false}
        hasBlockedLoggedUser={false}
        onViewMore={jest.fn()}
        {...props}
      />,
      { preloadedState }
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

  let props: Partial<Props>

  describe('when the user is logged in', () => {
    beforeEach(() => {
      props = {
        loggedInAddress: anAddress
      }
    })

    describe('and the user is checking on its own profile', () => {
      beforeEach(() => {
        props = { ...props, profileAddress: anAddress, profile: aProfile }
      })

      it('should render the users data', () => {
        const { getByText, getByTestId } = renderProfileInformation(props)
        expect(getByText(avatarName)).toBeInTheDocument()
        expect(getByTestId(anAddress)).toBeInTheDocument()
      })

      it('should render the actions buttons', () => {
        const { getByTestId, getByText } = renderProfileInformation(props)
        const shareButton = getByTestId(shareButtonTestId)
        fireEvent.click(shareButton)

        expect(getByText(t('profile_information.copy_link'))).toBeInTheDocument()
        expect(getByText(t('profile_information.share_on_tw'))).toBeInTheDocument()
        expect(getByText(t('profile_information.edit'))).toBeInTheDocument()
      })

      it('should not render the blocked button', () => {
        const { queryByTestId } = renderProfileInformation({ ...props, isBlockedByLoggedUser: true, hasBlockedLoggedUser: true })

        expect(queryByTestId(blockedButtonTestId)).toBeNull()
      })

      it('should render "Share with QR Code" button', () => {
        const { getByTestId, getByText } = renderProfileInformation({ ...props, isBlockedByLoggedUser: true, hasBlockedLoggedUser: true })

        const dropdownButton = getByTestId(shareButtonTestId)
        userEvent.click(dropdownButton)
        expect(getByText(t('profile_information.qr_code_item'))).toBeInTheDocument()
      })

      describe('and the social client is ready', () => {
        beforeEach(() => {
          props = { ...props, isSocialClientReady: true }
        })

        it('should render the friends counter', () => {
          const { getByTestId } = renderProfileInformation(props)

          expect(getByTestId(FRIENDS_COUNTER_DATA_TEST_ID)).toBeInTheDocument()
        })
      })

      describe('and the social client is not ready', () => {
        beforeEach(() => {
          props = { ...props, isSocialClientReady: false }
        })

        it('should not render the friends component', () => {
          const { queryByTestId } = renderProfileInformation(props)

          expect(queryByTestId(FRIENDS_COUNTER_DATA_TEST_ID)).toBeNull()
        })
      })

      describe('and the share on twitter button is clicked', () => {
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

        it('should open a new page with a twitter message to share its own profile', () => {
          jest.spyOn(window, 'open').mockImplementation(() => null)
          const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${t('profile_information.share_my_profile_tw_message')}${PROFILE_URL}${locations.account(anAddress)}`
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

    describe('and the user is checking other profile', () => {
      beforeEach(() => {
        props = { ...props, profileAddress: anotherAddress, profile: anotherProfile }
      })

      describe('and the user is not blocked by the profile nor has blocked it', () => {
        beforeEach(() => {
          props = { ...props, isBlockedByLoggedUser: false, hasBlockedLoggedUser: false }
        })

        it('should render the other profile data, not the logged in', () => {
          const { queryByText, queryByTestId } = renderProfileInformation(props)
          expect(queryByText(avatarName)).not.toBeInTheDocument()
          expect(queryByTestId(anAddress)).toBeNull()
          expect(queryByTestId(blockedButtonTestId)).toBeNull()

          expect(queryByText(anotherAvatarName)).toBeInTheDocument()
          expect(queryByTestId(anotherAddress)).toBeInTheDocument()
        })

        it('should render the actions for non-blocked users', () => {
          const { getByTestId } = renderProfileInformation(props)

          expect(getByTestId(actionsForNonBlockedTestId)).toBeInTheDocument()
        })

        it('should not render "Share with QR Code" button', () => {
          const { getByTestId, queryByText } = renderProfileInformation(props)

          const dropdownButton = getByTestId(shareButtonTestId)
          userEvent.click(dropdownButton)
          expect(queryByText(t('profile_information.qr_code_item'))).not.toBeInTheDocument()
        })
      })

      describe('and the user has blocked the profile', () => {
        beforeEach(() => {
          props = { ...props, isBlockedByLoggedUser: true, hasBlockedLoggedUser: false }
        })

        it('should render some of the other profile data with a button to unblock the profile', () => {
          const { getByTestId, queryByText, queryByTestId } = renderProfileInformation(props)

          expect(queryByText(avatarName)).not.toBeInTheDocument()
          expect(queryByTestId(anAddress)).toBeNull()

          expect(getByTestId(blockedButtonTestId)).toBeInTheDocument()
          expect(queryByText(anotherAvatarName)).toBeInTheDocument()
          expect(queryByTestId(anotherAddress)).toBeInTheDocument()
        })

        it('should not render the actions for non-blocked users', () => {
          const { queryByTestId } = renderProfileInformation(props)

          expect(queryByTestId(actionsForNonBlockedTestId)).toBeNull()
        })
      })

      describe('and the user is blocked by the profile', () => {
        beforeEach(() => {
          props = { ...props, isBlockedByLoggedUser: false, hasBlockedLoggedUser: true }
        })

        it('should render some of the other profile data', () => {
          const { queryByText, queryByTestId } = renderProfileInformation(props)

          expect(queryByText(avatarName)).not.toBeInTheDocument()
          expect(queryByTestId(anAddress)).toBeNull()
          expect(queryByTestId(blockedButtonTestId)).toBeNull()

          expect(queryByText(anotherAvatarName)).toBeInTheDocument()
          expect(queryByTestId(anotherAddress)).toBeInTheDocument()
        })

        it('should not render the actions for non-blocked users', () => {
          const { queryByTestId } = renderProfileInformation(props)

          expect(queryByTestId(actionsForNonBlockedTestId)).toBeNull()
        })
      })

      describe('and the share on twitter button is clicked', () => {
        beforeEach(() => {
          renderedComponent = renderProfileInformation(props)
          jest.useFakeTimers()
        })

        afterEach(() => {
          jest.useRealTimers()
        })

        it('should open a new page with a twitter message to share its own profile', () => {
          jest.spyOn(window, 'open').mockImplementation(() => null)
          const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${t('profile_information.share_others_profile_tw_message')}${PROFILE_URL}${locations.account(anotherAddress)}`
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
      let description: string

      describe('and neither the user has a lengthily description', () => {
        beforeEach(() => {
          description = 'a'.repeat(MAX_DESCRIPTION_LENGTH + 1)
        })

        it('should render the view more button', () => {
          const { queryByText } = renderProfileInformation({
            profile: {
              avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress, description } as Avatar]
            }
          })
          expect(queryByText(t('profile_information.view_more'))).not.toBeNull()
        })
      })

      describe('and the user has a lengthily description', () => {
        beforeEach(() => {
          description = 'a'
        })

        it('should not render the view more button', () => {
          const { queryByText } = renderProfileInformation({
            profile: {
              avatars: [{ name: avatarName, userId: anAddress, ethAddress: anAddress, description } as Avatar]
            }
          })
          expect(queryByText(t('profile_information.view_more'))).not.toBeNull()
        })
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
            const { getByTestId, queryByTestId, getByText } = renderProfileInformation({
              profile
            })
            expect(getByText(t('profile_information.view_more'))).toBeInTheDocument()
            expect(getByTestId('twitter')).toBeInTheDocument()
            expect(getByTestId('facebook')).toBeInTheDocument()
            expect(getByTestId('instagram')).toBeInTheDocument()
            expect(queryByTestId('github')).toBeNull()
            expect(queryByTestId('linkify')).toBeNull()
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

  describe('when the component is rendered', () => {
    beforeEach(() => {
      renderedComponent = renderProfileInformation({
        profileAddress: anAddress,
        isSocialClientReady: false
      })
    })

    it("should show the user's address first and last fourth characters", () => {
      const { getByTestId } = renderedComponent
      expect(getByTestId(walletTestId).textContent).toContain(`${anAddress.slice(0, 6)}...${anAddress.slice(-4)}`)
    })
  })
})
