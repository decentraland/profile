import React from 'react'
import { fireEvent } from '@testing-library/react'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { config } from '../../modules/config/config'
import { renderWithProviders } from '../../tests/tests'
import { shareButtonTestId, twitterURL as twitterLink } from './consts'
import ProfileInformation from './ProfileInformation'

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
      it('should render the users data', async () => {
        const { getByText, getByTestId } = renderWithProviders(
          <ProfileInformation profileAddress={anAddress} loggedInAddress={anAddress} profile={aProfile} />
        )
        expect(getByText(avatarName)).toBeInTheDocument()
        expect(getByTestId(anAddress)).toBeInTheDocument()
      })

      it('should render the actions buttons', async () => {
        const { getByTestId, getByText } = renderWithProviders(
          <ProfileInformation profileAddress={anAddress} loggedInAddress={anAddress} profile={aProfile} />
        )
        const shareButton = getByTestId(shareButtonTestId)
        fireEvent.click(shareButton)

        expect(getByText(t('profile_information.copy_link'))).toBeInTheDocument()
        expect(getByText(t('profile_information.share_on_tw'))).toBeInTheDocument()
      })

      it('should open twitter with the correct URL', async () => {
        const { getByTestId, getByRole } = renderWithProviders(
          <ProfileInformation profileAddress={anAddress} loggedInAddress={anAddress} profile={aProfile} />
        )

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
        const { queryByText, queryByTestId } = renderWithProviders(
          <ProfileInformation profileAddress={anotherAddress} loggedInAddress={anAddress} profile={anotherProfile} />
        )
        expect(queryByText(avatarName)).not.toBeInTheDocument()
        expect(queryByTestId(anAddress)).toBeNull()

        expect(queryByText(anotherAvatarName)).toBeInTheDocument()
        expect(queryByTestId(anotherAddress)).toBeInTheDocument()
      })
    })
  })

  describe('when the user is not logged in', () => {
    describe('and the user is checking on a profile', () => {
      it('should not render the avatar and the edit button', async () => {
        const { queryByText, queryByTestId } = renderWithProviders(<ProfileInformation profileAddress={anAddress} profile={aProfile} />)
        expect(queryByText(avatarName)).toBeInTheDocument()
        expect(queryByTestId(anAddress)).toBeInTheDocument()
      })
    })
  })
})
