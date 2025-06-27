import React from 'react'
import { fireEvent, act, cleanup } from '@testing-library/react'
import { setReferralEmailRequest } from '../../../modules/referrals/actions'
import { renderWithProviders } from '../../../tests/tests'
import { REFERRAL_REWARD_CARD_TEST_ID, REFERRAL_REWARD_IMAGE_TEST_ID } from '../ReferralRewardCard/constants'
import { REFERRAL_REWARD_REACHED_TEST_ID } from '../ReferralRewardReached/constants'
import { REFERRAL_JOURNEY_TEST_ID, TIERS } from './constants'
import { ReferralJourney } from './ReferralJourney'
import { ANIMATION_DURATION } from './utils'
import { ReferralJourneyProps } from './ReferralJourney.types'

// Mock scrollIntoView
const mockScrollIntoView = jest.fn()
Element.prototype.scrollIntoView = mockScrollIntoView

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

  const mockOnSetReferralEmail = Object.assign(jest.fn(), {
    type: 'setReferralEmailRequest',
    match: jest.fn()
  }) as unknown as typeof setReferralEmailRequest

  const renderReferralJourney = (props: Partial<ReferralJourneyProps>) => {
    return renderWithProviders(
      <ReferralJourney invitedUsersAccepted={invitedUsersAccepted} onSetReferralEmail={mockOnSetReferralEmail} {...props} />
    )
  }

  beforeEach(() => {
    invitedUsersAccepted = 0
    jest.useFakeTimers()
    jest.clearAllMocks()
    mockScrollIntoView.mockClear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.resetAllMocks()
    cleanup()
  })

  describe('when rendering the component', () => {
    beforeEach(() => {
      renderedComponent = renderReferralJourney({ invitedUsersAccepted })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should display the title and subtitle and display all reward cards', () => {
      const { getByTestId, getAllByTestId } = renderedComponent
      expect(getByTestId(REFERRAL_JOURNEY_TEST_ID.title)).toBeInTheDocument()
      expect(getByTestId(REFERRAL_JOURNEY_TEST_ID.subtitle)).toBeInTheDocument()

      const rewardCards = getAllByTestId(REFERRAL_REWARD_CARD_TEST_ID)
      expect(rewardCards).toHaveLength(TIERS.length)
      rewardCards.forEach(rewardCard => {
        expect(rewardCard).toBeInTheDocument()
      })
    })
  })

  // TODO: Fix this test
  describe.skip('when the user has accepted invites', () => {
    beforeEach(() => {
      invitedUsersAccepted = 25
      renderedComponent = renderReferralJourney({ invitedUsersAccepted })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should display the correct number of invites accepted', () => {
      const { getByTestId } = renderedComponent
      expect(getByTestId(REFERRAL_JOURNEY_TEST_ID.subtitle)).toHaveTextContent(
        `🤍 ${invitedUsersAccepted} ${mockTranslations.invitesAccepted}`
      )
    })
  })

  // TODO: Fix this test
  describe.skip('when completing a tier', () => {
    beforeEach(() => {
      invitedUsersAccepted = TIERS[1].invitesAccepted
      renderedComponent = renderReferralJourney({ invitedUsersAccepted })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should display the reward modal after animation', async () => {
      const { getByTestId } = renderedComponent
      await act(async () => jest.advanceTimersByTime(ANIMATION_DURATION))

      expect(getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal)).toBeInTheDocument()
    })

    describe('and clicking the modal', () => {
      it('should hide the reward modal', async () => {
        await act(async () => jest.advanceTimersByTime(ANIMATION_DURATION))

        const { getByTestId } = renderedComponent
        expect(getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.title)).toBeInTheDocument()

        fireEvent.click(getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.modal))

        expect(getByTestId(REFERRAL_REWARD_REACHED_TEST_ID.title)).not.toBeInTheDocument()
      })
    })
  })

  // TODO: Fix this test
  describe.skip('when checking accessibility', () => {
    beforeEach(() => {
      renderedComponent = renderReferralJourney({ invitedUsersAccepted: 0 })
    })

    afterEach(() => {
      renderedComponent.unmount()
      cleanup()
    })

    it('should have a heading and all reward image visible', () => {
      const { getByTestId, getAllByTestId } = renderedComponent
      expect(getByTestId(REFERRAL_JOURNEY_TEST_ID.title)).toBeInTheDocument()

      const images = getAllByTestId(REFERRAL_REWARD_IMAGE_TEST_ID)
      expect(images).toHaveLength(TIERS.length)
      images.forEach(image => {
        expect(image).toBeInTheDocument()
      })
    })
  })
})
