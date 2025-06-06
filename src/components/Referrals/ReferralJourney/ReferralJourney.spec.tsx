import React from 'react'
import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithProviders } from '../../../tests/tests'
import { REFERRAL_REWARD_DESCRIPTION_TEST_ID } from '../ReferralRewardCard/constants'
import { REFERRAL_REWARD_REACHED_TEST_ID } from '../ReferralRewardReached/constants'
import { tiers } from './constants'
import { ReferralJourney } from './ReferralJourney'
import { ANIMATION_DURATION } from './utils'

jest.mock('@mui/system/cssVars/useCurrentColorScheme', () => {
  const mockUseCurrentColorScheme = () => ({
    mode: 'light',
    systemMode: 'light',
    setMode: jest.fn()
  })
  mockUseCurrentColorScheme.default = mockUseCurrentColorScheme
  return mockUseCurrentColorScheme
})

const mockTranslations = {
  title: 'Your Reward Journey',
  invitesAccepted: 'Invites accepted',
  unlock: 'Unlock',
  unlocked: 'Unlocked!',
  reward: 'Reward',
  newItemUnlocked: 'NEW ITEM UNLOCKED'
}

const mockT = jest.fn((key, values) => {
  if (key === 'referral_journey.invites_accepted' && values?.count) {
    return `🤍 ${values.count} ${mockTranslations.invitesAccepted}`
  }
  switch (key) {
    case 'referral_journey.title':
      return mockTranslations.title
    case 'referral_reward_card.unlock':
      return mockTranslations.unlock
    case 'referral_reward_card.unlocked':
      return mockTranslations.unlocked
    case 'referral_reward_reached.reward':
      return mockTranslations.reward
    case 'referral_reward_reached.new_item_unlocked':
      return mockTranslations.newItemUnlocked
    default:
      return key
  }
})

jest.mock('decentraland-dapps/dist/modules/translation/utils', () => ({
  t: mockT
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
    jest.clearAllMocks()
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
      expect(getByRole('heading', { name: mockTranslations.title })).toBeInTheDocument()
      expect(getByText(`🤍 ${invitedUsersAccepted} ${mockTranslations.invitesAccepted}`)).toBeInTheDocument()
    })

    it('should display all reward cards', () => {
      const descriptions = screen.getAllByTestId(REFERRAL_REWARD_DESCRIPTION_TEST_ID)
      expect(descriptions).toHaveLength(tiers.length)
      descriptions.forEach(description => {
        expect(description).toHaveTextContent(mockTranslations.unlock)
      })
    })
  })

  describe('when the user has accepted invites', () => {
    beforeEach(() => {
      invitedUsersAccepted = 25
      renderedComponent = renderReferralJourney(invitedUsersAccepted)
    })

    it('should display the correct number of invites accepted', () => {
      const { getByText } = renderedComponent
      expect(getByText(`🤍 ${invitedUsersAccepted} ${mockTranslations.invitesAccepted}`)).toBeInTheDocument()
    })
  })

  describe('when completing a tier', () => {
    beforeEach(() => {
      invitedUsersAccepted = tiers[1].invitesAccepted
      renderedComponent = renderReferralJourney(invitedUsersAccepted)
    })

    it('should display the reward modal after animation', async () => {
      act(() => {
        jest.advanceTimersByTime(ANIMATION_DURATION)
      })

      const modal = await screen.findByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal)
      expect(modal).toBeInTheDocument()
      expect(screen.getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.title)).toHaveTextContent(mockTranslations.newItemUnlocked)
    })

    describe('and clicking the modal', () => {
      it('should hide the reward modal', async () => {
        act(() => {
          jest.advanceTimersByTime(ANIMATION_DURATION)
        })

        const modal = await screen.findByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal)
        fireEvent.click(modal)

        expect(modal).not.toBeVisible()
      })
    })
  })

  describe('when checking accessibility', () => {
    beforeEach(() => {
      renderedComponent = renderReferralJourney(0)
    })

    it('should have a heading and all reward descriptions visible', () => {
      const { getByRole } = renderedComponent
      expect(getByRole('heading', { name: mockTranslations.title })).toBeInTheDocument()

      const descriptions = screen.getAllByTestId(REFERRAL_REWARD_DESCRIPTION_TEST_ID)
      expect(descriptions).toHaveLength(tiers.length)
      descriptions.forEach(description => {
        expect(description).toHaveTextContent(mockTranslations.unlock)
      })
    })
  })
})
