import React from 'react'
import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithProviders } from '../../../tests/tests'
import { tiers } from './constants'
import { ReferralJourney } from './ReferralJourney'

jest.mock('../ReferralRewardReached', () => ({
  ReferralRewardReached: jest.fn(({ reward, open, onClick }) =>
    open ? (
      <div data-testid="reward-modal">
        <span>{reward.description}</span>
        <button onClick={onClick}>Close</button>
      </div>
    ) : null
  )
}))

jest.mock('../ReferralRewardCard', () => ({
  ReferralRewardCard: jest.fn(({ description }) => <div>{description}</div>)
}))

describe('ReferralJourney', () => {
  let invitedUsersAccepted: number
  let renderedComponent: ReturnType<typeof renderReferralJourney>

  const renderReferralJourney = (invitedUsersAccepted: number) => {
    return renderWithProviders(<ReferralJourney invitedUsersAccepted={invitedUsersAccepted} />)
  }

  beforeEach(() => {
    invitedUsersAccepted = 0
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  describe('when rendering the component', () => {
    beforeEach(() => {
      renderedComponent = renderReferralJourney(invitedUsersAccepted)
    })

    it('should display the title and subtitle', () => {
      const { getByRole, getByText } = renderedComponent
      expect(getByRole('heading', { name: /reward journey/i })).toBeInTheDocument()
      expect(getByText(/invites accepted/i)).toBeInTheDocument()
    })

    it('should display all reward cards', () => {
      const { getByText } = renderedComponent
      tiers.forEach(tier => {
        expect(getByText(tier.description)).toBeInTheDocument()
      })
    })
  })

  describe('when the user has accepted invites', () => {
    beforeEach(() => {
      invitedUsersAccepted = 25
      renderedComponent = renderReferralJourney(invitedUsersAccepted)
    })

    it('should mark completed steps with check icons', () => {
      const { getAllByTestId } = renderedComponent
      const checks = getAllByTestId('CheckRoundedIcon')
      expect(checks.length).toBe(tiers.filter(tier => invitedUsersAccepted >= tier.invitesAccepted).length)
    })
  })

  describe('when completing a tier', () => {
    beforeEach(() => {
      invitedUsersAccepted = tiers[1].invitesAccepted
      renderedComponent = renderReferralJourney(invitedUsersAccepted)
    })

    it('should display the reward modal after animation', () => {
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(screen.getByTestId('reward-modal')).toBeInTheDocument()
    })

    describe('and clicking the close button', () => {
      it('should hide the reward modal', () => {
        act(() => {
          jest.advanceTimersByTime(1000)
        })
        fireEvent.click(screen.getByText('Close'))
        expect(screen.queryByTestId('reward-modal')).not.toBeInTheDocument()
      })
    })
  })

  describe('when checking accessibility', () => {
    beforeEach(() => {
      renderedComponent = renderReferralJourney(0)
    })

    it('should have a heading and all reward descriptions visible', () => {
      const { getByRole, getByText } = renderedComponent
      expect(getByRole('heading', { name: /reward journey/i })).toBeInTheDocument()
      tiers.forEach(tier => {
        expect(getByText(tier.description)).toBeInTheDocument()
      })
    })
  })
})
