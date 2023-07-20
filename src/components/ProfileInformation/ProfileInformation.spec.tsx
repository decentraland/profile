import React from 'react'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { renderWithProviders } from '../../tests/tests'
import ProfileInformation from './ProfileInformation'

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
